// All of these packages are dependencies of "codemirror" package version >= 6;
import {
  startCompletion,
  closeCompletion,
  completionStatus
  // currentCompletions (could use this if we could get currentCompletionsFrom as well)
} from "@codemirror/autocomplete";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

import { initEditorSupportEffect } from "./cypher-state-definitions";
import {
  getStatePositionAbsolute,
  getStateEditorSupport,
  getStateLineCount,
  getStateValue,
  getStateLength,
  getStatePosition,
  getStatePositionForAny
} from "./cypher-state-selectors";
import {
  fixColors,
  syntaxCSS,
  focusListener,
  cypherLanguage,
  getReadableExtensions,
  getReadOnlyExtensions,
  getPlaceholderExtensions,
  getThemeExtensions,
  getLineNumbersExtensions,
  getAutocompleteExtensions,
  getLineWrappingExtensions,
  getHistoryExtensions,
  getLintExtensions
} from "./cypher-extensions";
import { THEME_LIGHT, defaultLineNumberFormatter, defaultAutocompleteTriggerStrings } from "./constants";

const VALUE_KEY = "change";
const FOCUS_KEY = "focus";
const BLUR_KEY = "blur";
const SCROLL_KEY = "scroll";
const POSITION_KEY = "position";
const AUTOCOMPLETE_KEY = "autocomplete";
const LINE_CLICK_KEY = "lineclick";

export const getExtensions = (
  options = {},
  {
    lintConf = new Compartment(),
    autocompleteConf = new Compartment(),
    readableConf = new Compartment(),
    readOnlyConf = new Compartment(),
    showLinesConf = new Compartment(),
    lineWrappingConf = new Compartment(),
    historyConf = new Compartment(),
    placeholderConf = new Compartment(),
    themeConf = new Compartment(),
    onLineNumberClicked = () => {},
    onFocusChanged = () => {}
  } = {}
) => {
  const combinedOptions = { ...defaultOptions, ...options };
  const {
    autocomplete,
    autocompleteCloseOnBlur,
    history,
    lineNumberFormatter,
    lineNumbers,
    lineWrapping,
    lint,
    placeholder,
    readOnly,
    readOnlyCursor,
    theme
  } = combinedOptions;

  return [
    cypherLanguage(),
    lintConf.of(getLintExtensions({ readOnly, lint })),
    autocompleteConf.of(
      getAutocompleteExtensions({
        readOnly,
        autocomplete,
        autocompleteCloseOnBlur
      })
    ),
    showLinesConf.of(
      getLineNumbersExtensions({
        lineNumbers,
        lineNumberFormatter,
        onLineNumberClicked
      })
    ),
    lineWrappingConf.of(getLineWrappingExtensions({ lineWrapping })),
    historyConf.of(getHistoryExtensions({ history })),
    readableConf.of(getReadableExtensions({ readOnly, readOnlyCursor })),
    placeholderConf.of(getPlaceholderExtensions({ placeholder })),
    syntaxCSS,
    themeConf.of(getThemeExtensions({ theme })),
    readOnlyConf.of(getReadOnlyExtensions({ readOnly, readOnlyCursor })),
    focusListener({ onFocusChanged })
  ];
};

const defaultOptions = {
  autocomplete: true,
  autocompleteOpen: false,
  autocompleteCloseOnBlur: true,
  autocompleteSchema: undefined,
  autocompleteTriggerStrings: defaultAutocompleteTriggerStrings,
  autofocus: true,
  history: true,
  lineNumberFormatter: defaultLineNumberFormatter,
  lineNumbers: true,
  lineWrapping: false,
  lint: true,
  placeholder: undefined,
  position: undefined,
  readOnly: false,
  readOnlyCursor: false,
  theme: THEME_LIGHT,
  updateSyntaxHighlighting: true,
  value: "",
  preExtensions: [],
  postExtensions: []
};

export function createCypherEditor(parentDOMElement, options = {}) {
  const combinedOptions = { ...defaultOptions, ...options };
  const {
    autocompleteSchema,
    autofocus,
    position,
    updateSyntaxHighlighting,
    value,
    preExtensions,
    postExtensions
  } = combinedOptions;
  let {
    autocomplete,
    autocompleteOpen,
    autocompleteCloseOnBlur,
    autocompleteTriggerStrings,
    lineNumberFormatter,
    lineNumbers,
    lineWrapping,
    lint,
    placeholder,
    readOnly,
    readOnlyCursor,
    history
  } = combinedOptions;

  const eventListenerTypeMap = {};

  const onLineNumberClicked = (line, event) => {
    if (eventListenerTypeMap[LINE_CLICK_KEY] !== undefined) {
      eventListenerTypeMap[LINE_CLICK_KEY].forEach((listener) => {
        listener(line, event);
      });
    }
  };

  const onPositionChanged = (positionObject) => {
    if (eventListenerTypeMap[POSITION_KEY] !== undefined) {
      eventListenerTypeMap[POSITION_KEY].forEach((listener) => {
        listener(positionObject);
      });
    }
  };

  const onAutocompleteChanged = (newAutocompleteOpen, from, options) => {
    autocompleteOpen = newAutocompleteOpen;
    if (eventListenerTypeMap[AUTOCOMPLETE_KEY] !== undefined) {
      eventListenerTypeMap[AUTOCOMPLETE_KEY].forEach((listener) => {
        listener(autocompleteOpen, from, options);
      });
    }
  };

  const onFocusChanged = (focused) => {
    const key = focused ? FOCUS_KEY : BLUR_KEY;
    if (eventListenerTypeMap[key] !== undefined) {
      eventListenerTypeMap[key].forEach((listener) => {
        listener(focused);
      });
    }
  };

  const onScrollChanged = (editor) => {
    if (eventListenerTypeMap[SCROLL_KEY] !== undefined) {
      const {
        scrollTop,
        clientHeight,
        scrollHeight,
        scrollLeft,
        clientWidth,
        scrollWidth
      } = editor.scrollDOM;

      eventListenerTypeMap[SCROLL_KEY].forEach((listener) => {
        listener({
          scrollTop,
          clientHeight,
          scrollHeight,
          scrollLeft,
          clientWidth,
          scrollWidth
        });
      });
    }
  };

  const updateListener = EditorView.updateListener.of((v) => {
    if (v.docChanged) {
      onValueChanged(getStateValue(v.state), v.changes);
      onPositionChanged(getStatePosition(v.state));
    } else if (v.selectionSet) {
      const oldPosition = getStatePositionAbsolute(v.startState);
      const newPosition = getStatePositionAbsolute(v.state);
      if (oldPosition !== newPosition) {
        onPositionChanged(getStatePosition(v.state));
      }
    }
    const startStatus = completionStatus(v.startState);
    const endStatus = completionStatus(v.state);
    if (startStatus !== "active" && endStatus === "active") {
      const { transactions } = v;

      const autocompleteResults = [];

      for (let transaction of transactions) {
        const { effects } = transaction;
        if (effects) {
          for (let effect of effects) {
            const { value: values } = effect;
            if (values) {
              for (let value of values) {
                const { result } = value;
                if (result && typeof result === "object") {
                  const { from, options } = result;
                  if (from !== undefined && options !== undefined) {
                    autocompleteResults.push({ from, options });
                  }
                }
              }
            }
          }
        }
      }
      if (autocompleteResults.length > 0) {
        if (autocompleteResults.length > 1) {
          console.error(
            "multiple autocomplete results found in update transactions"
          );
        }
        const { from, options } = autocompleteResults[0];
        onAutocompleteChanged(true, from, options);
      }
    } else if (startStatus !== null && endStatus === null) {
      onAutocompleteChanged(false);
    }
  });

  const preConf = new Compartment();
  const lintConf = new Compartment();
  const autocompleteConf = new Compartment();
  const readableConf = new Compartment();
  const readOnlyConf = new Compartment();
  const showLinesConf = new Compartment();
  const lineWrappingConf = new Compartment();
  const historyConf = new Compartment();
  const placeholderConf = new Compartment();
  const themeConf = new Compartment();
  const postConf = new Compartment();

  const initialState = EditorState.create({
    doc: value,
    extensions: [
      preConf.of(preExtensions),
      ...getExtensions(combinedOptions, {
        lintConf,
        autocompleteConf,
        readableConf,
        readOnlyConf,
        showLinesConf,
        lineWrappingConf,
        historyConf,
        placeholderConf,
        themeConf,
        postConf,
        onLineNumberClicked,
        onFocusChanged
      }),
      updateListener,
      postConf.of(postExtensions)
    ]
  });

  let editor = new EditorView({
    parent: parentDOMElement,
    state: initialState
  });
  editor.version = 1;
  editor.newContentVersion = function newContentVersion() {
    this.version += 1;
    return this.version;
  };
  editor.newContentVersion.bind(editor);
  editor.dispatch({ effects: [initEditorSupportEffect] });
  const editorSupport = getStateEditorSupport(editor.state);
  editorSupport.update(value);

  const getPositionForValue = (positionValue) =>
    getStatePositionForAny(editor.state, positionValue);

  const setPosition = (positionParam, scrollIntoView = true) => {
    const positionObject = getPositionForValue(positionParam);
    if (positionObject) {
      const { position } = positionObject;
      editor.dispatch(
        editor.state.update({ scrollIntoView, selection: { anchor: position } })
      );
    }
  };

  const showAutocomplete = () => {
    startCompletion(editor);
  };

  const hideAutocomplete = () => {
    closeCompletion(editor);
  };

  if (position !== undefined) {
    setPosition(position);
  }
  if (autocompleteSchema !== undefined) {
    editorSupport.setSchema(autocompleteSchema);
  }
  if (autocompleteOpen === true) {
    showAutocomplete();
  }

  if (autofocus) {
    editor.contentDOM.focus();
  }

  editor.scrollDOM.addEventListener("scroll", () => {
    onScrollChanged(editor);
  });

  const on = (type, listener) => {
    if (eventListenerTypeMap[type] === undefined) {
      eventListenerTypeMap[type] = [];
    }
    eventListenerTypeMap[type].push(listener);
  };

  const off = (type, listener) => {
    if (eventListenerTypeMap[type] !== undefined) {
      const listeners = eventListenerTypeMap[type];
      const index = listeners.findIndex((l) => l === listener);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
      if (eventListenerTypeMap[type].length === 0) {
        delete eventListenerTypeMap[type];
      }
    }
  };

  const setPreExtensions = (preExtensions) => {
    editor.dispatch({
      effects: preConf.reconfigure(preExtensions)
    });
  };

  const setPostExtensions = (postExtensions) => {
    editor.dispatch({
      effects: postConf.reconfigure(postExtensions)
    });
  };

  const onValueChanged = (value, changes) => {
    if (autocomplete && Array.isArray(autocompleteTriggerStrings)) {
      let changedText = [];
      changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
        changedText = inserted.text;
      });

      if (changedText.length > 0 && changedText.length <= 2) {
        const text = changedText[0];
        if (autocompleteTriggerStrings.indexOf(text) !== -1) {
          showAutocomplete();
        } else if (changedText.length === 2) {
          const longerText = text + changedText[1];
          if (autocompleteTriggerStrings.indexOf(longerText) !== -1) {
            showAutocomplete();
          }
        }
      }
    }

    if (eventListenerTypeMap[VALUE_KEY] !== undefined) {
      eventListenerTypeMap[VALUE_KEY].forEach((listener) => {
        listener(value, changes);
      });
    }
  };

  const setValue = (value, updateSyntaxHighlighting = true) => {
    const update = editor.state.update({
      changes: { from: 0, to: getStateLength(editor.state), insert: value }
    });
    editor.update([update]);
    if (updateSyntaxHighlighting !== false) {
      const version = editor.newContentVersion();
      const editorSupport = getStateEditorSupport(editor.state);
      editorSupport.update(value, version);

      fixColors(editor, editorSupport);
    }
  };

  const setHistory = (newHistory) => {
    history = newHistory;
    editor.dispatch({
      effects: historyConf.reconfigure(getHistoryExtensions({ history }))
    });
  };

  const clearHistory = () => {
    editor.dispatch({
      effects: historyConf.reconfigure([])
    });
    editor.dispatch({
      effects: historyConf.reconfigure(getHistoryExtensions({ history }))
    });
  };

  const setLineNumbers = (newLineNumbers) => {
    lineNumbers = newLineNumbers;
    editor.dispatch({
      effects: showLinesConf.reconfigure(
        getLineNumbersExtensions({
          lineNumbers,
          lineNumberFormatter,
          onLineNumberClicked
        })
      )
    });
  };

  const setLineNumberFormatter = (
    newLineNumberFormatter = defaultLineNumberFormatter
  ) => {
    lineNumberFormatter = newLineNumberFormatter;
    editor.dispatch({
      effects: showLinesConf.reconfigure(
        getLineNumbersExtensions({
          lineNumbers,
          lineNumberFormatter,
          onLineNumberClicked
        })
      )
    });
  };

  const setReadOnly = (newReadOnly) => {
    readOnly = newReadOnly;
    editor.dispatch({
      effects: [
        readableConf.reconfigure(
          getReadableExtensions({ readOnly, readOnlyCursor })
        ),
        readOnlyConf.reconfigure(
          getReadOnlyExtensions({ readOnly, readOnlyCursor })
        ),
        autocompleteConf.reconfigure(
          getAutocompleteExtensions({
            readOnly,
            autocomplete,
            autocompleteCloseOnBlur
          })
        ),
        lintConf.reconfigure(getLintExtensions({ readOnly, lint }))
      ]
    });
  };

  const setReadOnlyCursor = (newReadOnlyCursor) => {
    readOnlyCursor = newReadOnlyCursor;
    editor.dispatch({
      effects: [
        readableConf.reconfigure(
          getReadableExtensions({ readOnly, readOnlyCursor })
        ),
        readOnlyConf.reconfigure(
          getReadOnlyExtensions({ readOnly, readOnlyCursor })
        )
      ]
    });
  };

  const setPlaceholder = (newPlaceholder) => {
    placeholder = newPlaceholder;
    editor.dispatch({
      effects: [
        placeholderConf.reconfigure(getPlaceholderExtensions({ placeholder }))
      ]
    });
  };

  const setLineWrapping = (newLineWrapping) => {
    lineWrapping = newLineWrapping;
    editor.dispatch({
      effects: [
        lineWrappingConf.reconfigure(
          getLineWrappingExtensions({ lineWrapping })
        )
      ]
    });
  };

  const setAutocomplete = (newAutocomplete) => {
    autocomplete = newAutocomplete;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        getAutocompleteExtensions({
          readOnly,
          autocomplete,
          autocompleteCloseOnBlur
        })
      )
    });
  };

  const setAutocompleteCloseOnBlur = (newAutocompleteCloseOnBlur) => {
    autocompleteCloseOnBlur = newAutocompleteCloseOnBlur;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        getAutocompleteExtensions({
          readOnly,
          autocomplete,
          autocompleteCloseOnBlur
        })
      )
    });
  };

  const setAutocompleteTriggerStrings = (newAutocompleteTriggerStrings) => {
    autocompleteTriggerStrings = newAutocompleteTriggerStrings;
  };

  const setLint = (newLint) => {
    lint = newLint;
    editor.dispatch({
      effects: lintConf.reconfigure(getLintExtensions({ readOnly, lint }))
    });
  };

  const getPosition = () => {
    return getStatePosition(editor.state);
  };

  const getLineCount = () => {
    return editor ? getStateLineCount(editor.state) : 0;
  };

  const setAutocompleteSchema = (schema) => {
    editorSupport.setSchema(schema);
    if (autocompleteOpen) {
      showAutocomplete();
    }
  };

  const setTheme = (theme) => {
    editor.dispatch({
      effects: themeConf.reconfigure(getThemeExtensions({ theme }))
    });
  };

  const focus = () => {
    editor && editor.focus();
  };

  const destroy = () => {
    editor && editor.destroy();
  };

  const setAutocompleteOpen = (open) => {
    if (open) {
      showAutocomplete();
    } else {
      hideAutocomplete();
    }
  };

  const editorAPI = {
    clearHistory,
    destroy,
    focus,
    getLineCount,
    getPosition,
    getPositionForValue,
    setAutocomplete,
    setAutocompleteCloseOnBlur,
    setAutocompleteOpen,
    setAutocompleteSchema,
    setAutocompleteTriggerStrings,
    setHistory,
    setLineNumberFormatter,
    setLineNumbers,
    setLineWrapping,
    setLint,
    setPlaceholder,
    setPosition,
    setReadOnly,
    setReadOnlyCursor,
    setTheme,
    setValue,

    on,
    off,
    setPreExtensions,
    setPostExtensions,
    codemirror: editor,
    editorSupport
  };

  if (updateSyntaxHighlighting !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(value, version);

    fixColors(editor, editorSupport);
  }

  return {
    editor: editorAPI
  };
}
