// All of these packages are dependencies of "codemirror" package version >= 6;
import {
  autocompletion as autocompletionExtension,
  completionKeymap,
  startCompletion,
  closeCompletion,
  completionStatus,
  currentCompletions
} from "@codemirror/autocomplete";
import {
  history as historyExtension,
  defaultKeymap,
  historyKeymap
} from "@codemirror/commands";
import {
  StreamLanguage,
  indentOnInput,
  foldKeymap,
  syntaxHighlighting,
  HighlightStyle
} from "@codemirror/language";
import { lintKeymap, linter as linterExtension } from "@codemirror/lint";
import { searchKeymap } from "@codemirror/search";
import {
  EditorState,
  StateEffect,
  StateField,
  Compartment
} from "@codemirror/state";
import {
  EditorView,
  Decoration,
  lineNumbers as lineNumbersExtension,
  drawSelection as drawSelectionExtension,
  rectangularSelection as rectangularSelectionExtension,
  crosshairCursor as crosshairCursorExtension,
  keymap,
  placeholder as placeholderExtension
} from "@codemirror/view";
import { tags } from "@lezer/highlight";

import { CypherEditorSupport, TreeUtils } from "cypher-editor-support";

import { cypher } from "./cypher";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

const isNumber = (v) =>
  v !== undefined &&
  (typeof v === "number" || v instanceof Number) &&
  isFinite(v);
const isInteger = (v) => isNumber(v) && v % 1 === 0;

const getGlobalPositionForValue = (view, positionValue) => {
  let position = null;
  if (isInteger(positionValue) && positionValue >= 0) {
    position = positionValue;
  } else if (typeof positionValue === "object" && positionValue) {
    const { line, column, position: maybePosition } = positionValue;
    if (isInteger(maybePosition) && maybePosition >= 0) {
      position = maybePosition;
    } else if (
      isInteger(line) &&
      line >= 1 &&
      isInteger(column) &&
      column >= 0
    ) {
      const lineCount = view.state.doc.lines;
      if (line <= lineCount) {
        const lineObject = view.state.doc.line(line);
        if (lineObject) {
          const { from, to } = lineObject;
          if (isInteger(from) && isInteger(to) && column <= to - from) {
            position = from + column;
          }
        }
      }
    }
  }
  if (position !== null) {
    if (position <= view.state.doc.length) {
      const lineObject = view.state.doc.lineAt(position);
      if (lineObject) {
        const { number: line, from: lineStart, to: lineEnd } = lineObject;
        const column = position - lineStart;
        if (lineStart + column <= lineEnd) {
          position = {
            line,
            column,
            position
          };
        } else {
          position = null;
        }
      } else {
        position = null;
      }
    } else {
      position = null;
    }
  }
  return position;
};

const getPositionFromState = (state) => {
  const { from, to, head, anchor } = state.selection.main;
  const position = head;
  const { number: line, from: lineStart } = state.doc.lineAt(position);
  const column = position - lineStart;
  return { line, column, position };
};

const addTypeMarker = StateEffect.define();
const clearTypeMarkers = StateEffect.define();

const typeMarkerField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(typeMarkers, tr) {
    typeMarkers = typeMarkers.map(tr.changes);
    for (let e of tr.effects) {
      if (e.is(clearTypeMarkers)) {
        typeMarkers = typeMarkers.filter(() => false);
      } else if (e.is(addTypeMarker)) {
        if (e.value.from !== e.value.to) {
          typeMarkers = typeMarkers.update({
            add: [
              Decoration.mark({ class: "cm-p-" + e.value.type }).range(
                e.value.from,
                e.value.to
              )
            ]
          });
        }
      }
    }
    return typeMarkers;
  },
  provide: (f) => EditorView.decorations.from(f)
});

const typeMarkerTheme = EditorView.baseTheme({
  // ".cm-underline": { textDecoration: "underline 3px red" }
});

export function typeMarkerFromTo(view, options = {}) {
  let effects = [addTypeMarker.of(options)];

  if (!view.state.field(typeMarkerField, false)) {
    effects.push(
      StateEffect.appendConfig.of([typeMarkerField, typeMarkerTheme])
    );
  }
  view.dispatch({ effects });
  return true;
}

function fixColors(view, editorSupport) {
  view.dispatch(clearTypeMarkers.of());
  if (editorSupport.parseTree == null) {
    return;
  }

  editorSupport.applyHighlighthing((element, type) => {
    const { start: from, stop: to } = TreeUtils.getPosition(element) || {
      start: 0,
      stop: 0
    };
    typeMarkerFromTo(view, { from, to: to + 1, type });
  });
}

const editorSupportField = StateField.define({
  create() {
    return new CypherEditorSupport();
  },
  update(editorSupport, tr) {
    return editorSupport;
  }
});

function editorSupportInit(view) {
  if (!view.state.field(editorSupportField, false)) {
    const effects = [StateEffect.appendConfig.of([editorSupportField])];
    view.dispatch({ effects });
    return true;
  }
}

export const cypherLinter = ({
  delay = 750,
  showErrors = true,
  ...otherOptions
} = {}) => [
  linterExtension(
    (view) => {
      const editorSupport = getEditorSupport(view.state); // view.editorSupport;
      if (!editorSupport) return [];
      const version = view.newContentVersion();
      editorSupport.update(view.state.doc.toString(), version);

      fixColors(view, editorSupport);

      return ((showErrors && editorSupport.parseErrors) || []).map(
        ({ msg, start, stop }) => {
          return {
            severity: "error",
            from: start,
            to: stop + 1,
            message: msg
          };
        }
      );
    },
    { ...otherOptions, delay }
  )
];

const getEditorSupport = (state) => state.field(editorSupportField, false);

const cypherCompletions = (context) => {
  const editorSupport = getEditorSupport(context.state);
  editorSupport.update(context.state.doc.toString());

  const { line, column } = editorSupport.positionConverter.toRelative(
    context.pos
  );
  const completion = editorSupport.getCompletion(line, column, true);
  const { items, from, to } = completion;
  const completions = items.map(({ type, view, postfix }) => ({
    type,
    label: view,
    detail: postfix
  }));
  let word = context.matchBefore(/\w*/);
  let cypherCompletions = null;
  if (!(word.from == word.to && !context.explicit)) {
    cypherCompletions = {
      //from: word.from,
      from: context.state.doc.line(from.line).from + from.column,
      options: completions,
      filter: false,
      getMatch: () => []
    };
  }
  return cypherCompletions;
};

export const cypherCompletion = ({
  activateOnTyping = false,
  closeOnBlur = true
} = {}) => [
  autocompletionExtension({
    activateOnTyping,
    closeOnBlur,
    override: [cypherCompletions]
  })
];

const darkExtensions = [
  EditorView.theme({}, { dark: true }),
  EditorView.editorAttributes.of({ class: "cm-dark" })
];

const syntaxStyles = [
  { tag: tags.comment, class: "cm-comment" },
  { tag: tags.variableName, class: "cm-variable" },
  {
    tag: [tags.string, tags.special(tags.brace)],
    class: "cm-string"
  },
  { tag: tags.number, class: "cm-number" },
  { tag: tags.keyword, class: "cm-keyword" },
  { tag: tags.operator, class: "cm-operator" }
];

const syntaxStyle = HighlightStyle.define(syntaxStyles);
export const syntaxCSS = [syntaxHighlighting(syntaxStyle)];

export const cypherLineNumbers = ({
  lineNumberFormatter,
  onLineNumberClicked = () => {}
}) => [
  lineNumbersExtension({
    formatNumber: (number, state) =>
      lineNumberFormatter(number, state.doc.lines, state),
    domEventHandlers: {
      click(view, lineObject, event) {
        const { line } = getGlobalPositionForValue(view, lineObject.from) || {};
        onLineNumberClicked(line, event);
        return true;
      }
    }
  })
];

export const focusListener = ({ onFocusChanged = () => {} }) => [
  EditorView.domEventHandlers({
    focus: () => {
      onFocusChanged(true);
    },
    blur: () => {
      onFocusChanged(false);
    }
  })
];

export const cypherLanguage = () => [StreamLanguage.define(cypher)];

const VALUE_KEY = "change";
const FOCUS_KEY = "focus";
const BLUR_KEY = "blur";
const SCROLL_KEY = "scroll";
const POSITION_KEY = "position";
const AUTOCOMPLETE_KEY = "autocomplete";
const LINE_CLICK_KEY = "lineclick";

const historyExtensions = [historyExtension()];

const readableExtensions = [
  drawSelectionExtension(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  rectangularSelectionExtension(),
  crosshairCursorExtension(),
  keymap.of([
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap
  ])
];

const readOnlyExtensions = [EditorState.readOnly.of(true)];

const readOnlyNoCursorExtensions = [
  EditorState.readOnly.of(true),
  EditorView.editable.of(false)
];

const lineWrappingExtensions = [EditorView.lineWrapping];

const useLintExtensions = [cypherLinter()];

const useNoLintExtensions = [cypherLinter({ showErrors: false })];

const useAutocompleteExtensions = [cypherCompletion()];

const useStickyAutocompleteExtensions = [
  cypherCompletion({ closeOnBlur: false })
];

const defaultLineNumberFormatter = (line, lineCount) => {
  if (lineCount === 1) {
    return "$";
  } else {
    return line;
  }
};

const defaultAutocompleteTriggerStrings = [
  ".",
  ":",
  "[]",
  "()",
  "{}",
  "[",
  "(",
  "{",
  "$"
];

const getReadableExtensions = ({ readOnly, readOnlyCursor }) =>
  !readOnly || readOnlyCursor ? readableExtensions : [];

const getReadOnlyExtensions = ({ readOnly, readOnlyCursor }) =>
  readOnly
    ? readOnlyCursor
      ? readOnlyExtensions
      : readOnlyNoCursorExtensions
    : [];

const getPlaceholderExtensions = ({ placeholder }) =>
  placeholder !== undefined ? [placeholderExtension(placeholder)] : [];

const getThemeExtensions = ({ theme }) =>
  theme === THEME_DARK ? darkExtensions : [];

const getLineNumbersExtensions = ({
  lineNumbers,
  lineNumberFormatter,
  onLineNumberClicked
}) =>
  lineNumbers
    ? [cypherLineNumbers({ lineNumberFormatter, onLineNumberClicked })]
    : [];

const getAutocompleteExtensions = ({
  readOnly,
  autocomplete,
  autocompleteCloseOnBlur
}) =>
  readOnly === false && autocomplete
    ? !autocompleteCloseOnBlur
      ? useStickyAutocompleteExtensions
      : useAutocompleteExtensions
    : [];

const getLineWrappingExtensions = ({ lineWrapping }) =>
  lineWrapping ? lineWrappingExtensions : [];

const getHistoryExtensions = ({ history }) =>
  history ? historyExtensions : [];

const getLintExtensions = ({ readOnly, lint }) =>
  readOnly === false && lint ? useLintExtensions : useNoLintExtensions;

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
      onValueChanged(v.state.doc.toString(), v.changes);
      onPositionChanged(getPositionFromState(v.state));
    } else if (v.selectionSet) {
      const oldPosition = getPositionFromState(v.startState);
      const newPosition = getPositionFromState(v.state);
      if (oldPosition.position !== newPosition.position) {
        onPositionChanged(getPositionFromState(v.state));
      }
    }
    const startStatus = completionStatus(v.startState);
    const endStatus = completionStatus(v.state);
    if (startStatus !== "active" && endStatus === "active") {
      // TODO any need to check autocomplete or autocompleteOpen here?
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
  // TODO cm6 vs cm5 - need to clearHistory?

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
  editorSupportInit(editor);
  const editorSupport = getEditorSupport(editor.state);
  editorSupport.update(value);

  const getPositionForValue = (positionValue) =>
    getGlobalPositionForValue(editor, positionValue);

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
      changes: { from: 0, to: editor.state.doc.length, insert: value }
    });
    editor.update([update]);
    if (updateSyntaxHighlighting !== false) {
      const version = editor.newContentVersion();
      const editorSupport = getEditorSupport(editor.state);
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
    return getPositionFromState(editor.state);
  };

  const getLineCount = () => {
    return editor ? editor.state.doc.lines : 0;
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
