// All of these packages are dependencies of "codemirror" package version >= 6;
import {
  startCompletion,
  closeCompletion,
  completionStatus
  // currentCompletions (could use this if we could get currentCompletionsFrom as well)
} from "@codemirror/autocomplete";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import {
  defaultLineNumberFormatter,
  defaultOptions as baseDefaultOptions,
  createEventHandlers,
  positionNewToOld,
  positionOldToNew
} from "cypher-codemirror-base";

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
  domListener,
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

export * from "./cypher-extensions";

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
    onLineNumberClick = () => {},
    onFocusChanged = () => {},
    onScrollChanged = () => {},
    onKeyDown = () => {}
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
    domListener({ onFocusChanged, onScrollChanged, onKeyDown }),
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
        onLineNumberClick
      })
    ),
    lineWrappingConf.of(getLineWrappingExtensions({ lineWrapping })),
    historyConf.of(getHistoryExtensions({ history })),
    readableConf.of(getReadableExtensions({ readOnly, readOnlyCursor })),
    placeholderConf.of(getPlaceholderExtensions({ placeholder })),
    syntaxCSS,
    themeConf.of(getThemeExtensions({ theme })),
    readOnlyConf.of(getReadOnlyExtensions({ readOnly, readOnlyCursor }))
  ];
};

const defaultOptions = {
  ...baseDefaultOptions,
  preExtensions: [],
  postExtensions: []
};

export const getDefaultOptions = () => ({ ...defaultOptions });

export function createCypherEditor(parentDOMElement, options = {}) {
  const combinedOptions = { ...defaultOptions, ...options };
  const {
    autocompleteSchema,
    autofocus,
    position,
    parseOnSetValue,
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

  const {
    on: onValueChanged,
    off: offValueChanged,
    fire: fireValueChanged
  } = createEventHandlers();

  const {
    on: onFocusChanged,
    off: offFocusChanged,
    fire: fireFocusChanged
  } = createEventHandlers();

  const {
    on: onScrollChanged,
    off: offScrollChanged,
    fire: fireScrollChanged
  } = createEventHandlers();

  const {
    on: onPositioChanged,
    off: offPositionChanged,
    fire: firePositionChanged
  } = createEventHandlers();

  const {
    on: onAutocompleteChanged,
    off: offAutocompleteChanged,
    fire: fireAutocompleteChanged
  } = createEventHandlers();

  const {
    on: onLineNumberClick,
    off: offLineNumberClick,
    fire: fireLineNumberClick
  } = createEventHandlers();

  const {
    on: onKeyDown,
    off: offKeyDown,
    fire: fireKeyDown
  } = createEventHandlers();

  const lineNumberClick = (line, event) => {
    fireLineNumberClick(line, event);
  };

  const keyDown = (event) => {
    fireKeyDown(event);
  };

  const positionChanged = (positionObject) => {
    firePositionChanged(positionOldToNew(positionObject));
  };

  const autocompleteChanged = (newAutocompleteOpen, from, options) => {
    autocompleteOpen = newAutocompleteOpen;
    fireAutocompleteChanged(autocompleteOpen, from, options);
  };

  const focusChanged = (focused) => {
    fireFocusChanged(focused);
  };

  const scrollChanged = (scrollInfo) => {
    fireScrollChanged(scrollInfo);
  };

  const updateListener = EditorView.updateListener.of((v) => {
    if (v.docChanged) {
      valueChanged(getStateValue(v.state), v.changes);
      positionChanged(getStatePosition(v.state));
    } else if (v.selectionSet) {
      const oldPosition = getStatePositionAbsolute(v.startState);
      const newPosition = getStatePositionAbsolute(v.state);
      if (oldPosition !== newPosition) {
        positionChanged(getStatePosition(v.state));
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
        autocompleteChanged(true, from, options);
      }
    } else if (startStatus !== null && endStatus === null) {
      autocompleteChanged(false);
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
        onLineNumberClick: lineNumberClick,
        onFocusChanged: focusChanged,
        onScrollChanged: scrollChanged,
        onKeyDown: keyDown
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
    getStatePositionForAny(editor.state, positionNewToOld(positionValue));

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

  const valueChanged = (value, changes) => {
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

    fireValueChanged(value, changes);
  };

  const setValue = (value, parseOnSetValueParam = parseOnSetValue) => {
    const update = editor.state.update({
      changes: { from: 0, to: getStateLength(editor.state), insert: value }
    });
    editor.update([update]);
    if (parseOnSetValueParam !== false) {
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
          onLineNumberClick: lineNumberClick
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
          onLineNumberClick: lineNumberClick
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
    return positionOldToNew(getStatePosition(editor.state));
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

    onAutocompleteChanged,
    offAutocompleteChanged,
    onFocusChanged,
    offFocusChanged,
    onKeyDown,
    offKeyDown,
    onLineNumberClick,
    offLineNumberClick,
    onPositioChanged,
    offPositionChanged,
    onScrollChanged,
    offScrollChanged,
    onValueChanged,
    offValueChanged,

    setPreExtensions,
    setPostExtensions,
    codemirror: editor,
    editorSupport
  };

  if (parseOnSetValue !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(value, version);

    fixColors(editor, editorSupport);
  }

  return {
    editor: editorAPI
  };
}
