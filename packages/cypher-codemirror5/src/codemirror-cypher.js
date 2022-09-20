/*
 * Copyright (c) 2002-2017 "Neo Technology,"
 * Network Engine for Objects in Lund AB [http://neotechnology.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import codemirror from "codemirror";
import { CypherEditorSupport, TreeUtils } from "cypher-editor-support";
import "./codemirror-cypher-mode";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const INNER_THEME_LIGHT = "cypher";
const INNER_THEME_DARK = "cypher cypher-dark";
const THEME_MAP = {
  [THEME_LIGHT]: INNER_THEME_LIGHT,
  [THEME_DARK]: INNER_THEME_DARK
};

function translatePosition(from, to) {
  return {
    from: { line: from.line - 1, ch: from.column },
    to: { line: to.line - 1, ch: to.column }
  };
}

function getPosition(element, editorSupport) {
  const { start, stop } = TreeUtils.getPosition(element) || {
    start: 0,
    stop: 0
  };
  const from = editorSupport.positionConverter.toRelative(start);
  const to = editorSupport.positionConverter.toRelative(stop + 1);
  return translatePosition(from, to);
}

function fixColors(editor, editorSupport) {
  const markers = editor.cypherMarkers;

  markers.forEach((m) => m.clear());
  if (editorSupport.parseTree == null) {
    return;
  }

  editorSupport.applyHighlighthing((element, type) => {
    const { from, to } = getPosition(element, editorSupport);
    markers.push(
      editor.markText(from, to, {
        className: `cm-p-${type}`
      })
    );
  });
}

codemirror.registerHelper("lint", "cypher", (text, options, editor) => {
  const editorSupport = editor.editorSupport;
  if (!editorSupport) return [];
  const version = editor.newContentVersion();
  editorSupport.update(text, version);

  fixColors(editor, editorSupport);

  return ((editor.lint !== false && editorSupport.parseErrors) || []).map(
    ({ line, col, msg }) => ({
      severity: "error",
      from: {
        line: line - 1,
        ch: Math.min(editor.getLine(line - 1).length - 1, col)
      },
      to: { line, ch: 0 },
      message: msg
    })
  );
});

codemirror.registerHelper("hint", "cypher", (editor) => {
  const editorSupport = editor.editorSupport;
  if (
    !editorSupport ||
    editor.autocomplete === false ||
    editor.forceAutocompleteClose === true
  ) {
    return { list: [] };
  }
  editorSupport.update(editor.getValue());

  const { line, ch } = editor.getCursor();
  const { items, from, to } = editorSupport.getCompletion(line + 1, ch);
  const { line: fromLine, column: fromColumn } = from;
  const fromPosition = editor.indexFromPos({
    line: fromLine - 1,
    ch: fromColumn
  });

  const position = translatePosition(from, to);
  const render = (element, self, data) => {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML += `<b>${data.displayText}</b>${
      data.postfix ? data.postfix : ""
    }`;
  };

  const data = {
    list: items.map(({ type, view, content, postfix }) => ({
      text: content,
      displayText: view,
      className: `cm-hint-${type}`,
      type,
      postfix,
      render
    })),
    ...position
  };

  const CM = editor.constructor;
  CM.on(
    data,
    "shown",
    CM.signal.bind(editor, editor, "hint-shown", {
      options: items,
      from: fromPosition
    })
  );
  return data;
});

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

const defaultCodemirrorOptions = {
  autoCloseBrackets: {
    explode: ""
  },
  // autofocus: true,
  extraKeys: {
    "Ctrl-Space": "autocomplete"
  },
  gutters: ["cypher-hints"],
  hintOptions: {
    completeSingle: false,
    closeOnUnfocus: false,
    alignWithWord: true,
    async: true
  },
  // lineNumbers: true,
  // lineWrapping: false,
  // lint: true,
  mode: "cypher",
  // placeholder: undefined
  smartIndent: false
  // theme: theme
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
  theme: THEME_LIGHT,
  updateSyntaxHighlighting: true,
  value: "",

  codemirrorOptions: {
    ...defaultCodemirrorOptions
  }
};

export function createCypherEditor(parentDOMElement, options = {}) {
  const editorSupport = new CypherEditorSupport();

  const combinedOptions = { ...defaultOptions, ...options };

  const {
    autocomplete,
    autocompleteSchema,
    autofocus,
    history,
    lineNumberFormatter,
    lineWrapping,
    lint,
    placeholder,
    position,
    readOnly,
    theme,
    updateSyntaxHighlighting,
    value,
    codemirrorOptions
  } = combinedOptions;

  let lineFormatter;
  let {
    autocompleteOpen,
    autocompleteCloseOnBlur,
    autocompleteTriggerStrings,
    lineNumbers
  } = combinedOptions;
  const baseHintOptions = codemirrorOptions.hintOptions || {};

  const combinedCodemirrorOptions = {
    ...codemirrorOptions,
    autofocus,
    hintOptions: {
      ...baseHintOptions,
      closeOnUnfocus: autocompleteCloseOnBlur
    },
    lineNumberFormatter: (line) => (lineFormatter ? lineFormatter(line) : line),
    lineNumbers,
    lineWrapping,
    lint,
    placeholder,
    readOnly,
    theme: THEME_MAP[theme],
    undoDepth: history ? 200 : 0,
    value
  };
  if (!lineNumbers) {
    combinedCodemirrorOptions.gutters = false;
  }

  const editor = codemirror(parentDOMElement, combinedCodemirrorOptions);
  editor.cypherMarkers = [];
  editor.editorSupport = editorSupport;
  editor.version = 1;
  editor.newContentVersion = function newContentVersion() {
    this.version += 1;
    return this.version;
  };
  editor.newContentVersion.bind(editor);
  editor.lint = lint;
  editor.autocomplete = autocomplete;
  editor.forceAutocompleteClose = false;

  const onLineNumberClicked = (cm, lineIndex, _, event) => {
    lineNumberClickedListeners.forEach((listener) => {
      listener(lineIndex + 1, event);
    });
  };
  editor.on("gutterClick", onLineNumberClicked);

  const setPosition = (position) => {
    const positionObject = getPositionForValue(position);
    if (positionObject) {
      const { line, column } = positionObject;
      const { line: currentLineIndex, ch } = editor.getCursor();
      const currentLine = currentLineIndex + 1;
      const currentColumn = ch;
      if (line < currentLine) {
        const steps = currentLine - line;
        for (let i = 0; i < steps; i++) {
          editor.execCommand("goLineUp");
        }
      } else if (line > currentLine) {
        const steps = line - currentLine;
        for (let i = 0; i < steps; i++) {
          editor.execCommand("goLineDown");
        }
      }
      if (column < currentColumn) {
        const steps = currentColumn - column;
        for (let i = 0; i < steps; i++) {
          editor.execCommand("goCharLeft");
        }
      } else if (column > currentColumn) {
        const steps = column - currentColumn;
        for (let i = 0; i < steps; i++) {
          editor.execCommand("goCharRight");
        }
      }
    }
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
      } else if (
        isInteger(line) &&
        line >= 1 &&
        isInteger(column) &&
        column >= 0
      ) {
        const lineIndex = editor.indexFromPos({ line: line - 1, ch: column });
        if (lineIndex >= 0) {
          const positionFromLineIndex = editor.posFromIndex(lineIndex);
          const { line: newLineIndex, ch } = positionFromLineIndex;
          if (newLineIndex === line - 1 && ch === column) {
            position = lineIndex;
          }
        }
      }
    }
    if (position !== null) {
      const { line: lineIndex, ch } = editor.posFromIndex(position);
      const lineObject = editor.doc.lineInfo(lineIndex);
      if (lineObject) {
        const { text = "" } = lineObject;
        const lineStart = editor.indexFromPos({ line: lineIndex, ch: 0 });
        const lineEnd = lineStart + text.length;
        const line = lineIndex + 1;
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
    }
    return position;
  };

  const showAutocomplete = () => {
    editor.execCommand("autocomplete");
  };

  const hideAutocomplete = () => {
    editor.forceAutocompleteClose = true;
    editor.execCommand("autocomplete");
    editor.forceAutocompleteClose = false;
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

  const valueChanged = (doc, changed) => {
    valueChangedListeners.forEach((listener) => {
      listener(doc, changed);
    });
    if (
      editor.autocomplete &&
      Array.isArray(autocompleteTriggerStrings) &&
      changed.origin !== "setValue" &&
      changed.text.length > 0 &&
      changed.text.length <= 2
    ) {
      const text = changed.text[0];
      if (autocompleteTriggerStrings.indexOf(text) !== -1) {
        showAutocomplete();
      } else if (changed.text.length === 2) {
        const longerText = text + changed.text[1];
        if (autocompleteTriggerStrings.indexOf(longerText) !== -1) {
          showAutocomplete();
        }
      }
    }
  };
  editor.on("change", valueChanged);

  lineFormatter = (line) => {
    return lineNumberFormatter(line, getLineCount(), editor);
  };

  const valueChangedListeners = [];
  const positionChangedListeners = [];
  const autocompleteChangedListeners = [];
  const lineNumberClickedListeners = [];
  const focusListeners = [];
  const blurListeners = [];
  const scrollChangedListeners = [];

  const getPosition = () => {
    const { line: lineIndex, ch } = editor.getCursor();
    const position = editor.indexFromPos(editor.getCursor());
    return { line: lineIndex + 1, column: ch, position };
  };

  const setHistory = (history) => {
    editor.setOption("undoDepth", history ? 200 : 0);
  };

  const clearHistory = () => {
    editor.clearHistory();
  };

  const positionChanged = (positionObject) => {
    positionChangedListeners.forEach((listener) => {
      listener(positionObject);
    });
  };

  const autocompleteChanged = (newAutocompleteOpen, from, options) => {
    autocompleteOpen = newAutocompleteOpen;
    autocompleteChangedListeners.forEach((listener) => {
      listener(autocompleteOpen, from, options);
    });
  };

  let scrollListener;
  let focusListener;
  let blurListener;

  const onScrollChanged = (cm) => {
    const scrollInfo = cm.getScrollInfo();
    const { top, clientHeight, height, left, clientWidth, width } = scrollInfo;
    const newScrollInfo = {
      scrollTop: top,
      clientHeight,
      scrollHeight: height,
      scrollLeft: left,
      clientWidth,
      scrollWidth: width
    };
    scrollChangedListeners.forEach((listener) => {
      listener(newScrollInfo);
    });
  };

  let mounted = autofocus !== true;

  const onFocus = () => {
    if (mounted) {
      focusListeners.forEach((listener) => {
        listener();
      });
    } else {
      mounted = true;
    }
  };

  const onBlur = () => {
    blurListeners.forEach((listener) => {
      listener();
    });
  };

  const on = (type, listener) => {
    if (type === "change") {
      valueChangedListeners.push(listener);
    } else if (type === "position") {
      positionChangedListeners.push(listener);
    } else if (type === "autocomplete") {
      autocompleteChangedListeners.push(listener);
    } else if (type === "lineclick") {
      lineNumberClickedListeners.push(listener);
    } else if (type === "scroll") {
      if (!scrollListener) {
        scrollListener = onScrollChanged;
        editor.on(type, scrollListener);
      }
      scrollChangedListeners.push(listener);
    } else if (type === "focus") {
      if (!focusListener) {
        focusListener = onFocus;
        editor.on(type, focusListener);
      }
      focusListeners.push(listener);
    } else if (type === "blur") {
      if (!blurListener) {
        blurListener = onBlur;
        editor.on("blur", blurListener);
      }
      blurListeners.push(listener);
    }
  };

  const removeListener = (listeners, listener) => {
    const index = listeners.findIndex((l) => l === listener);
    if (index >= 0) {
      listeners.splice(index, 1);
    }
  };

  const off = (type, listener) => {
    if (type === "change") {
      removeListener(valueChangedListeners, listener);
    } else if (type === "position") {
      removeListener(positionChangedListeners, listener);
    } else if (type === "autocomplete") {
      removeListener(autocompleteChangedListeners, listener);
    } else if (type === "lineclick") {
      removeListener(lineNumberClickedListeners, listener);
    } else if (type === "scroll") {
      removeListener(scrollChangedListeners, listener);
      if (scrollChangedListeners.length === 0 && scrollListener) {
        editor.off(type, scrollListener);
        scrollListener = undefined;
      }
    } else if (type === "focus") {
      removeListener(focusListeners, listener);
      if (focusListeners.length === 0 && focusListener) {
        editor.off(type, focusListener);
        focusListener = undefined;
      }
    } else if (type === "blur") {
      removeListener(blurListeners, listener);
      if (blurListeners.length === 0 && focusListener) {
        editor.off(type, blurListener);
        blurListener = undefined;
      }
    } else {
      editor.off(type, listener);
    }
  };

  editor.on("cursorActivity", (e) => {
    const cursor = e.doc.getCursor();
    const line = cursor.line + 1;
    const column = cursor.ch;
    const position = editorSupport.positionConverter.toAbsolute(line, column);
    positionChanged({ line, column, position });
  });

  // this is used instead of: editor.on("startCompletion", (editor) => {});
  editor.on("hint-shown", ({ from, options }) => {
    if (editor.autocomplete) {
      autocompleteChanged(true, from, options);
    }
  });

  editor.on("endCompletion", (editor) => {
    if (editor.autocomplete) {
      autocompleteChanged(false);
    }
  });

  const setValue = (value, updateSyntaxHighlighting = true) => {
    editor.setValue(value);
    if (updateSyntaxHighlighting !== false) {
      const version = editor.newContentVersion();
      editorSupport.update(value, version);

      fixColors(editor, editorSupport);
    }
  };

  const setReadOnly = (readOnly) => {
    editor.setOption("readOnly", readOnly);
  };

  const setPlaceholder = (placeholder) => {
    editor.setOption("placeholder", placeholder);
  };

  const setLineWrapping = (lineWrapping) => {
    editor.setOption("lineWrapping", lineWrapping);
  };

  const setLineNumbers = (lineNumbers) => {
    editor.setOption("lineNumbers", lineNumbers);
    if (lineNumbers) {
      editor.setOption("gutters", combinedCodemirrorOptions.gutters);
    } else {
      editor.setOption("gutters", false);
    }
  };

  const setLineNumberFormatter = (lineFormat = defaultLineNumberFormatter) => {
    const lineNumberFormatter = (line) =>
      lineFormat(line, getLineCount(), editor);
    editor.setOption("lineNumberFormatter", lineNumberFormatter);
  };

  const setAutocomplete = (autocomplete) => {
    editor.autocomplete = autocomplete;
  };

  const setAutocompleteCloseOnBlur = (newAutocompleteCloseOnBlur) => {
    autocompleteCloseOnBlur = newAutocompleteCloseOnBlur;
    editor.setOption("hintOptions", {
      ...baseHintOptions,
      closeOnUnfocus: autocompleteCloseOnBlur
    });
  };

  const setAutocompleteTriggerStrings = (newAutocompleteTriggerStrings) => {
    autocompleteTriggerStrings = newAutocompleteTriggerStrings;
  };

  const setLint = (lint) => {
    editor.lint = lint;
  };

  const getLineCount = () => {
    return editor ? editor.lineCount() : 0;
  };

  const setAutocompleteSchema = (schema) => {
    editorSupport.setSchema(schema);
    if (autocompleteOpen) {
      showAutocomplete();
    }
  };

  const focus = () => {
    editor && editor.focus();
  };

  const destroy = () => {
    // TODO - check if cm 5 has any thing that should be called here
    // should the mode be unregistered or something?
  };

  const setTheme = (theme) => {
    if (editor) {
      const innerTheme = THEME_MAP[theme];
      editor.setOption("theme", innerTheme);
    }
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
    setTheme,
    setValue,

    on,
    off,
    codemirror: editor,
    editorSupport
  };

  if (updateSyntaxHighlighting !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(value, version);

    fixColors(editor, editorSupport);
  }

  return { editor: editorAPI };
}
