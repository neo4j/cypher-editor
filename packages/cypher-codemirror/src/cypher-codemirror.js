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
  placeholder
} from "@codemirror/view";
import { tags } from "@lezer/highlight";

import { CypherEditorSupport, TreeUtils } from "cypher-editor-support";

import { cypher } from "./cypher";

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

export const cypherLineNumbers = ({ lineNumberFormatter }) => [
  lineNumbers({
    formatNumber: (number, state) =>
      lineNumberFormatter(number, state.doc.lines, state)
  })
];

export const cypherLanguage = () => [StreamLanguage.define(cypher)];

const VALUE_KEY = "change";
const FOCUS_KEY = "focus";
const BLUR_KEY = "blur";
const SCROLL_KEY = "scroll";
const POSITION_KEY = "position";
const AUTOCOMPLETE_KEY = "autocomplete";

const readableExtensions = [
  history(),
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

const defaultAutocompleteSticky = false;

export const getExtensions = (
  {
    autocomplete,
    autocompleteSticky,
    lint,
    lineNumbers = true,
    lineNumberFormatter = defaultLineNumberFormatter,
    readOnly = false,
    placeholder: placeholderText
  } = {},
  {
    lintConf = new Compartment(),
    autocompleteConf = new Compartment(),
    readableConf = new Compartment(),
    readOnlyConf = new Compartment(),
    showLinesConf = new Compartment()
  } = {}
) => {
  return [
    cypherLanguage(),
    lintConf.of(lint ? useLintExtensions : useNoLintExtensions),
    autocompleteConf.of(
      readOnly === false && autocomplete
        ? autocompleteSticky
          ? useStickyAutocompleteExtensions
          : useAutocompleteExtensions
        : []
    ),
    showLinesConf.of(
      lineNumbers ? [cypherLineNumbers({ lineNumberFormatter })] : []
    ),
    readableConf.of(readOnly !== "nocursor" ? readableExtensions : []),
    ...(placeholderText ? [placeholder(placeholderText)] : []),
    readOnlyConf.of(readOnly !== false ? readOnlyExtensions : [])
  ];
};

export function createCypherEditor(
  parentDOMElement,
  {
    text = "",
    extensions,
    updateSyntaxHighlighting = true,
    autocompleteTriggerStrings:
      initialAutocompleteTriggerStrings = defaultAutocompleteTriggerStrings,
    autofocus = true,
    ...options
  } = {}
) {
  let theme = "light"; // TODO pass this in via options, and make it a compartment toggle thing in cm 6.
  let autocompleteTriggerStrings = initialAutocompleteTriggerStrings;
  let autocompleteOpen = false;

  const eventListenerTypeMap = {};

  const onPositionChanged = (positionObject) => {
    if (eventListenerTypeMap[POSITION_KEY] !== undefined) {
      eventListenerTypeMap[POSITION_KEY].forEach((listener) => {
        listener(positionObject);
      });
    }
  };

  const onAutocompleteChanged = (newAutocompleteOpen) => {
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
    const scrollRect = editor.scrollDOM.getBoundingClientRect();
    const contentRect = editor.contentDOM.getBoundingClientRect();
    if (eventListenerTypeMap[SCROLL_KEY] !== undefined) {
      eventListenerTypeMap[SCROLL_KEY].forEach((listener) => {
        listener({ scrollRect, contentRect });
      });
    }
  };

  let settingValue = false;

  const getPositionFromState = (state) => {
    const { from, to, head, anchor } = state.selection.main;
    const position = head;
    const { number: line, from: lineStart } = state.doc.lineAt(position);
    const column = position - lineStart;
    return { line, column, position };
  };

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
      onAutocompleteChanged(end);
    }
  });

  const lintConf = new Compartment();
  const autocompleteConf = new Compartment();
  const readableConf = new Compartment();
  const readOnlyConf = new Compartment();
  const showLinesConf = new Compartment();

  extensions = [
    ...(extensions
      ? extensions
      : [
          ...getExtensions(options, {
            lintConf,
            autocompleteConf,
            readableConf,
            readOnlyConf,
            showLinesConf
          }),
          theme === "light" ? lightTheme : darkTheme
        ]),
    updateListener,
    autocompleteListener
  ];

  const initialState = EditorState.create({
    doc: text,
    extensions: extensions
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
          editor.showAutoComplete();
        } else if (changedText.length === 2) {
          const longerText = text + changedText[1];
          if (autocompleteTriggerStrings.indexOf(longerText) !== -1) {
            editor.showAutoComplete();
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

  const goToPosition = (position, scrollIntoView = true) => {
    // TODO TEMP
    // const value = 202;
    // const value = { line: 1, column: 500 };
    // const value = { line: 99, column: 0 };
    // const values = [0, 202, {}, { line: -1, column: -1 }, { line: 2, column: 3 }, { line: 1, column: 500 }, { line: 99, column: 0 }, 890, 891, 892];
    // for (let value of values) {
    //   const tempPosition = getPositionForValue(value);
    //   console.log('getPositionForValue temp result: ', value, tempPosition);
    // }
    
    if (typeof position === "object" && position) {
      const { line, column } = position;
      position = editor.state.doc.line(line).from + column;
    }
    editor.dispatch(
      editor.state.update({ scrollIntoView, selection: { anchor: position } })
    );
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

  if (autofocus) {
    editor.contentDOM.focus();
  }

  if (options.readOnly === "nocursor") {
    editor.contentDOM.setAttribute("contenteditable", "false");
  }

  editor.contentDOM.addEventListener("blur", () => {
    onFocusChanged(false);
  });

  editor.contentDOM.addEventListener("focus", () => {
    onFocusChanged(true);
  });

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

  let autocomplete = options.autocomplete || true;
  let autocompleteSticky = options.autocompleteSticky || false;

  let lint = options.lint || true;
  let readOnly = options.readOnly || false;
  let lineNumbers = options.lineNumbers || true;
  let lineNumberFormatter =
    options.lineNumberFormatter || defaultLineNumberFormatter;

  const setLineNumbers = (newLineNumbers) => {
    lineNumbers = newLineNumbers;
    editor.dispatch({
      effects: showLinesConf.reconfigure(
        lineNumbers ? [cypherLineNumbers({ lineNumberFormatter })] : []
      )
    });
  };

  const setLineNumberFormatter = (
    newLineNumberFormatter = defaultLineNumberFormatter
  ) => {
    lineNumberFormatter = newLineNumberFormatter;
    editor.dispatch({
      effects: showLinesConf.reconfigure(
        lineNumbers ? [cypherLineNumbers({ lineNumberFormatter })] : []
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

  const setAutocomplete = (newAutocomplete) => {
    autocomplete = newAutocomplete;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        readOnly === false && autocomplete
          ? autocompleteSticky
            ? useStickyAutocompleteExtensions
            : useAutocompleteExtensions
          : []
      )
    });
  };

  const setAutocompleteSticky = (newAutocompleteSticky) => {
    autocompleteSticky = newAutocompleteSticky;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        readOnly === false && autocomplete
          ? autocompleteSticky
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

  const isNumber = (v) =>
    v !== undefined &&
    (typeof v === "number" || v instanceof Number) &&
    isFinite(v);
  const isInteger = (v) => isNumber(v) && v % 1 === 0;

  const getPositionForValue = (positionValue) => {
    let position = null;
    if (isInteger(positionValue) && positionValue >= 0) {
      position = positionValue;
    } else if (typeof positionValue === "object" && positionValue) {
      const { line, column, position: maybePosition } = positionValue;
      if (isInteger(maybePosition) && maybePosition >= 0) {
        position = maybePosition;
      } else if (isInteger(line) && line >= 1 && isInteger(column) && column >= 0) {
        const lineCount = editor.state.doc.lines;
        if (line <= lineCount) {
          const lineObject = editor.state.doc.line(line);
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
      if (position <= editor.state.doc.length) {
        const lineObject = editor.state.doc.lineAt(position);
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

  const getLineCount = () => {
    return editor.state.doc.lines;
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

  editor.goToPosition = goToPosition;
  editor.setValue = setValue;
  editor.on = on;
  editor.off = off;
  editor.showAutoComplete = showAutoComplete;
  editor.setReadOnly = setReadOnly;
  editor.setLineNumbers = setLineNumbers;
  editor.setLineNumberFormatter = setLineNumberFormatter;
  editor.getPosition = getPosition;
  editor.getPositionForValue = getPositionForValue;
  editor.setAutocomplete = setAutocomplete;
  editor.setAutocompleteSticky = setAutocompleteSticky;
  editor.setAutocompleteTriggerStrings = setAutocompleteTriggerStrings;
  editor.setLint = setLint;
  editor.getLineCount = getLineCount;
  editor.setSchema = setSchema;
  // editor.setDarkTheme = setDarkTheme;
  // editor.setLightTheme = setLightTheme;

  if (updateSyntaxHighlighting !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(text, version);

    fixColors(editor, editorSupport);
  }

  return {
    editor,
    editorSupport
  };
}
