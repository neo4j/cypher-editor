// All of these packages are dependencies of "codemirror" package version >= 6;
import {
  autocompletion,
  completionKeymap,
  startCompletion,
  completionStatus
} from "@codemirror/autocomplete";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import {
  StreamLanguage,
  indentOnInput,
  foldKeymap,
  syntaxHighlighting,
  HighlightStyle
} from "@codemirror/language";
import { lintKeymap, linter } from "@codemirror/lint";
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
  lineNumbers,
  drawSelection,
  rectangularSelection,
  crosshairCursor,
  keymap,
  placeholder as placeholderExtension
} from "@codemirror/view";
import { tags } from "@lezer/highlight";

import { CypherEditorSupport, TreeUtils } from "cypher-editor-support";

import { cypher } from "./cypher";

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
  linter(
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
  const completions = items.map(({ type, view }) => ({ type, label: view }));
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
  autocompletion({
    activateOnTyping,
    closeOnBlur,
    override: [cypherCompletions]
  })
];

const lightSyntaxStyles = [
  { tag: tags.comment, color: "#93a1a1", class: "cm-comment" },
  { tag: tags.variableName, color: "#0080ff", class: "cm-variable" },
  {
    tag: [tags.string, tags.special(tags.brace)],
    color: "#b58900",
    class: "cm-string"
  },
  { tag: tags.number, color: "#2aa198", class: "cm-number" },
  { tag: tags.bool, color: "#5c6166" },
  { tag: tags.null, color: "#5c6166" },
  { tag: tags.keyword, color: "#859900", class: "cm-keyword" },
  { tag: tags.operator, color: "#5c6166", class: "cm-operator" },
  { tag: tags.className, color: "#5c6166" },
  { tag: tags.definition(tags.typeName), color: "#5c6166" },
  { tag: tags.typeName, color: "#5c6166" },
  { tag: tags.angleBracket, color: "#5c6166" },
  { tag: tags.tagName, color: "#5c6166" },
  { tag: tags.attributeName, color: "#5c6166" }
];

const darkSyntaxStyles = [
  { tag: tags.comment, color: "#586e75", class: "cm-comment" },
  { tag: tags.variableName, color: "#0080ff", class: "cm-variable" },
  {
    tag: [tags.string, tags.special(tags.brace)],
    color: "#b58900",
    class: "cm-string"
  },
  { tag: tags.number, color: "#2aa198", class: "cm-number" },
  { tag: tags.bool, color: "#5c6166" },
  { tag: tags.null, color: "#5c6166" },
  { tag: tags.keyword, color: "#859900", class: "cm-keyword" },
  { tag: tags.operator, color: "#5c6166", class: "cm-operator" },
  { tag: tags.className, color: "#5c6166" },
  { tag: tags.definition(tags.typeName), color: "#5c6166" },
  { tag: tags.typeName, color: "#5c6166" },
  { tag: tags.angleBracket, color: "#5c6166" },
  { tag: tags.tagName, color: "#5c6166" },
  { tag: tags.attributeName, color: "#5c6166" }
];

const lightSyntaxStyle = HighlightStyle.define(lightSyntaxStyles);
const lightTheme = [syntaxHighlighting(lightSyntaxStyle)];

const darkSyntaxStyle = HighlightStyle.define(darkSyntaxStyles);
const darkTheme = [syntaxHighlighting(darkSyntaxStyle)];

export const cypherLineNumbers = ({
  lineNumberFormatter,
  onLineNumberClicked = () => {}
}) => [
  lineNumbers({
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

export const cypherLanguage = () => [StreamLanguage.define(cypher)];

const VALUE_KEY = "change";
const FOCUS_KEY = "focus";
const BLUR_KEY = "blur";
const SCROLL_KEY = "scroll";
const POSITION_KEY = "position";
const AUTOCOMPLETE_KEY = "autocomplete";
const LINE_CLICK_KEY = "lineclick";

const historyExtensions = [history()];

const readableExtensions = [
  drawSelection(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  rectangularSelection(),
  crosshairCursor(),
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

export const getExtensions = (
  {
    autocomplete,
    autocompleteCloseOnBlur,
    lint,
    lineNumbers = true,
    lineWrapping = false,
    lineNumberFormatter = defaultLineNumberFormatter,
    readOnly = false,
    placeholder: placeholderText
  } = {},
  {
    lintConf = new Compartment(),
    autocompleteConf = new Compartment(),
    readableConf = new Compartment(),
    readOnlyConf = new Compartment(),
    showLinesConf = new Compartment(),
    lineWrappingConf = new Compartment(),
    historyConf = new Compartment(),
    placeholderConf = new Compartment(),
    onLineNumberClicked = () => {}
  } = {}
) => {
  return [
    cypherLanguage(),
    lintConf.of(lint ? useLintExtensions : useNoLintExtensions),
    autocompleteConf.of(
      readOnly === false && autocomplete
        ? !autocompleteCloseOnBlur
          ? useStickyAutocompleteExtensions
          : useAutocompleteExtensions
        : []
    ),
    showLinesConf.of(
      lineNumbers
        ? [cypherLineNumbers({ lineNumberFormatter, onLineNumberClicked })]
        : []
    ),
    lineWrappingConf.of(lineWrapping ? lineWrappingExtensions : []),
    historyConf.of(historyExtensions),
    readableConf.of(readOnly !== "nocursor" ? readableExtensions : []),
    placeholderConf.of(
      placeholderText !== undefined
        ? [placeholderExtension(placeholderText)]
        : []
    ),
    readOnlyConf.of(readOnly !== false ? readOnlyExtensions : [])
  ];
};

const defaultOptions = {
  updateSyntaxHighlighting: true,
  text: "",
  autocompleteTriggerStrings: defaultAutocompleteTriggerStrings,
  autocomplete: true,
  autocompleteCloseOnBlur: true,
  placeholder: undefined,
  autofocus: true,
  theme: "light",
  lineNumbers: true,
  lineWrapping: false,
  lineNumberFormatter: defaultLineNumberFormatter,
  lint: true,
  readOnly: false
};

export function createCypherEditor(parentDOMElement, options = {}) {
  const combinedOptions = { ...defaultOptions, ...options };
  // TODO investigate passing theme to getExtensions, and make it a compartment toggle thing in cm 6.
  const { updateSyntaxHighlighting, autofocus, text, extensions } =
    combinedOptions;
  let {
    theme,
    autocompleteTriggerStrings,
    autocomplete,
    autocompleteCloseOnBlur,
    placeholder,
    lineNumbers,
    lineWrapping,
    lineNumberFormatter,
    lint,
    readOnly
  } = combinedOptions;
  let autocompleteOpen = false;

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

  const onAutocompleteOpenChanged = (newAutocompleteOpen) => {
    autocompleteOpen = newAutocompleteOpen;
    if (eventListenerTypeMap[AUTOCOMPLETE_KEY] !== undefined) {
      eventListenerTypeMap[AUTOCOMPLETE_KEY].forEach((listener) => {
        listener(autocompleteOpen);
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

  let settingValue = false;

  const updateListener = EditorView.updateListener.of((v) => {
    if (v.docChanged && !settingValue) {
      onValueChanged(v.state.doc.toString(), v.changes);
    }
    if (v.selectionSet) {
      onPositionChanged(getPositionFromState(v.state));
    }
  });

  const autocompleteListener = EditorState.changeFilter.of((v) => {
    const start = completionStatus(v.startState) !== null;
    const end = completionStatus(v.state) !== null;
    if (start !== end) {
      onAutocompleteOpenChanged(end);
    }
  });

  const lintConf = new Compartment();
  const autocompleteConf = new Compartment();
  const readableConf = new Compartment();
  const readOnlyConf = new Compartment();
  const showLinesConf = new Compartment();
  const lineWrappingConf = new Compartment();
  const historyConf = new Compartment();
  const placeholderConf = new Compartment();

  const stateExtensions = [
    ...(extensions
      ? extensions
      : [
          ...getExtensions(options, {
            lintConf,
            autocompleteConf,
            readableConf,
            readOnlyConf,
            showLinesConf,
            lineWrappingConf,
            historyConf,
            placeholderConf,
            onLineNumberClicked
          }),
          theme === "light" ? lightTheme : darkTheme
        ]),
    updateListener,
    autocompleteListener
  ];

  const initialState = EditorState.create({
    doc: text,
    extensions: stateExtensions
  });

  let editor = new EditorView({
    parent: parentDOMElement,
    state: initialState
  });

  const onValueChanged = (value, changes) => {
    if (autocomplete && Array.isArray(autocompleteTriggerStrings)) {
      let changedText = [];
      changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
        changedText = inserted.text;
      });

      if (changedText.length > 0 && changedText.length <= 2) {
        const text = changedText[0];
        if (autocompleteTriggerStrings.indexOf(text) !== -1) {
          showAutoComplete();
        } else if (changedText.length === 2) {
          const longerText = text + changedText[1];
          if (autocompleteTriggerStrings.indexOf(longerText) !== -1) {
            showAutoComplete();
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
    settingValue = true;
    const update = editor.state.update({
      changes: { from: 0, to: editor.state.doc.length, insert: value }
    });
    editor.update([update]);
    settingValue = false;
    if (updateSyntaxHighlighting !== false) {
      const version = editor.newContentVersion();
      const editorSupport = getEditorSupport(editor.state);
      editorSupport.update(value, version);

      fixColors(editor, editorSupport);
    }
  };

  const goToPosition = (positionParam, scrollIntoView = true) => {
    const positionObject = getPositionForValue(positionParam);
    if (positionObject) {
      const { position } = positionObject;
      editor.dispatch(
        editor.state.update({ scrollIntoView, selection: { anchor: position } })
      );
    }
  };

  editor.version = 1;
  editor.newContentVersion = function newContentVersion() {
    this.version += 1;
    return this.version;
  };
  editor.newContentVersion.bind(editor);
  editorSupportInit(editor);
  const editorSupport = getEditorSupport(editor.state);
  editor.editorSupport = editorSupport;

  if (readOnly === "nocursor") {
    editor.contentDOM.setAttribute("contenteditable", "false");
  }

  editor.contentDOM.addEventListener("blur", () => {
    onFocusChanged(false);
  });

  editor.contentDOM.addEventListener("focus", () => {
    onFocusChanged(true);
  });

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

  const showAutoComplete = () => {
    startCompletion(editor);
  };

  const clearHistory = () => {
    editor.dispatch({
      effects: historyConf.reconfigure([])
    });
    editor.dispatch({
      effects: historyConf.reconfigure(historyExtensions)
    });
  };

  const setLineNumbers = (newLineNumbers) => {
    lineNumbers = newLineNumbers;
    editor.dispatch({
      effects: showLinesConf.reconfigure(
        lineNumbers
          ? [cypherLineNumbers({ lineNumberFormatter, onLineNumberClicked })]
          : []
      )
    });
  };

  const setLineNumberFormatter = (
    newLineNumberFormatter = defaultLineNumberFormatter
  ) => {
    lineNumberFormatter = newLineNumberFormatter;
    editor.dispatch({
      effects: showLinesConf.reconfigure(
        lineNumbers
          ? [cypherLineNumbers({ lineNumberFormatter, onLineNumberClicked })]
          : []
      )
    });
  };

  const setReadOnly = (newReadOnly) => {
    readOnly = newReadOnly;
    editor.contentDOM.setAttribute(
      "contenteditable",
      readOnly === "nocursor" ? "false" : "true"
    );
    editor.dispatch({
      effects: [
        readableConf.reconfigure(
          readOnly !== "nocursor" ? readableExtensions : []
        ),
        readOnlyConf.reconfigure(readOnly !== false ? readOnlyExtensions : []),
        autocompleteConf.reconfigure(
          readOnly === false && autocomplete ? useAutocompleteExtensions : []
        ),
        lintConf.reconfigure(
          readOnly === false && lint ? useLintExtensions : useNoLintExtensions
        )
      ]
    });
  };

  const setPlaceholder = (newPlaceholder) => {
    placeholder = newPlaceholder;
    editor.dispatch({
      effects: [
        placeholderConf.reconfigure(
          placeholder !== undefined ? [placeholderExtension(placeholder)] : []
        )
      ]
    });
  };

  const setLineWrapping = (newLineWrapping) => {
    lineWrapping = newLineWrapping;
    editor.dispatch({
      effects: [
        lineWrappingConf.reconfigure(lineWrapping ? lineWrappingExtensions : [])
      ]
    });
  };

  const setAutocomplete = (newAutocomplete) => {
    autocomplete = newAutocomplete;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        readOnly === false && autocomplete
          ? !autocompleteCloseOnBlur
            ? useStickyAutocompleteExtensions
            : useAutocompleteExtensions
          : []
      )
    });
  };

  const setAutocompleteCloseOnBlur = (newAutocompleteCloseOnBlur) => {
    autocompleteCloseOnBlur = newAutocompleteCloseOnBlur;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        readOnly === false && autocomplete
          ? autocompleteCloseOnBlur
            ? useStickyAutocompleteExtensions
            : useAutocompleteExtensions
          : []
      )
    });
  };

  const setAutocompleteTriggerStrings = (newAutocompleteTriggerStrings) => {
    autocompleteTriggerStrings = newAutocompleteTriggerStrings;
  };

  const setLint = (newLint) => {
    lint = newLint;
    editor.dispatch({
      effects: lintConf.reconfigure(
        readOnly === false && lint ? useLintExtensions : useNoLintExtensions
      )
    });
  };

  const getPosition = () => {
    return getPositionFromState(editor.state);
  };

  const getPositionForValue = (positionValue) =>
    getGlobalPositionForValue(editor, positionValue);

  const getLineCount = () => {
    return editor ? editor.state.doc.lines : 0;
  };

  const setSchema = (schema) => {
    editorSupport.setSchema(schema);
    if (autocompleteOpen) {
      showAutoComplete();
    }
  };

  // const setDarkTheme = () => {
  //   if (theme !== 'dark') {
  //     theme = 'dark';
  //     editor.dispatch({
  //       reconfigure: {
  //         full: getExtensions(theme)
  //       }
  //     });
  //   }
  // };

  // const setLightTheme = () => {
  //   if (theme !== 'light') {
  //     theme = 'light';
  //     editor.dispatch({
  //       reconfigure: {
  //         full: getExtensions(theme)
  //       }
  //     });
  //   }
  // };

  const focus = () => {
    editor && editor.focus();
  };

  const destroy = () => {
    editor && editor.destroy();
  };

  const editorAPI = {
    focus,
    destroy,
    clearHistory,
    goToPosition,
    showAutoComplete,
    setValue,
    setReadOnly,
    setPlaceholder,
    setLineWrapping,
    setLineNumbers,
    setLineNumberFormatter,
    getPosition,
    getPositionForValue,
    setAutocomplete,
    setAutocompleteCloseOnBlur,
    setAutocompleteTriggerStrings,
    setLint,
    getLineCount,
    setSchema,
    on,
    off,
    codemirror: editor,
    editorSupport
  };

  if (updateSyntaxHighlighting !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(text, version);

    fixColors(editor, editorSupport);
  }

  return {
    editor: editorAPI
  };
}
