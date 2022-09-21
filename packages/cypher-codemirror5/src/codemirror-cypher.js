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
import {
  THEME_LIGHT,
  THEME_DARK,
  defaultOptions as baseDefaultOptions,
  defaultLineNumberFormatter,
  createEventHandlers
} from "cypher-codemirror-base";
import { CypherEditorSupport, TreeUtils } from "cypher-editor-support";
import "./codemirror-cypher-mode";

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

function getPositionForElement(element, editorSupport) {
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
    const { from, to } = getPositionForElement(element, editorSupport);
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

export const defaultCodemirrorOptions = {
  // options overriden by top level options are commented out
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
  ...baseDefaultOptions,
  codemirrorOptions: {
    ...defaultCodemirrorOptions
  }
};

export const getDefaultOptions = () => ({
  ...defaultOptions,
  codemirrorOptions: {
    ...defaultCodemirrorOptions
  }
});

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
    lineNumbers,
    readOnly,
    readOnlyCursor
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
    readOnly: readOnly ? (!readOnlyCursor ? "nocursor" : true) : false,
    theme: THEME_MAP[theme],
    undoDepth: history ? 200 : 0,
    value
  };
  if (!lineNumbers) {
    combinedCodemirrorOptions.gutters = false;
  }

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
    on: onLineNumberClicked,
    off: offLineNumberClicked,
    fire: fireLineNumberClicked
  } = createEventHandlers();

  const {
    on: onKeyDown,
    off: offKeyDown,
    fire: fireKeyDown
  } = createEventHandlers();

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

  const lineNumberClicked = (cm, lineIndex, _, event) => {
    fireLineNumberClicked(lineIndex + 1, event);
  };
  editor.on("gutterClick", lineNumberClicked);

  // TODO POSITION - Only used for export, and setting the initial position
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

  // TODO POSITION - Only used for export & setPosition
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
    fireValueChanged(doc, changed);
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
  // change is triggered BEFORE dom update, "changes" is triggered AFTER dom update
  editor.on("change", valueChanged);

  lineFormatter = (line) => {
    return lineNumberFormatter(line, getLineCount(), editor);
  };

  // TODO POSITION - Only used for export
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
    // TODO POSITION - This is where all position events are dispatched
    firePositionChanged(positionObject);
  };

  const autocompleteChanged = (newAutocompleteOpen, from, options) => {
    autocompleteOpen = newAutocompleteOpen;
    fireAutocompleteChanged(newAutocompleteOpen, from, options);
  };

  const scrollChanged = (cm) => {
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
    fireScrollChanged(newScrollInfo);
  };

  const keyDown = (editor, event) => {
    fireKeyDown(event);
  };

  let mounted = autofocus !== true;

  const onFocus = () => {
    if (mounted) {
      fireFocusChanged(true);
    } else {
      mounted = true;
    }
  };

  const onBlur = () => {
    fireFocusChanged(false);
  };

  editor.on("keydown", keyDown);
  editor.on("scroll", scrollChanged);
  editor.on("focus", onFocus);
  editor.on("blur", onBlur);

  const onCursorActivity = (e) => {
    const cursor = e.doc.getCursor();
    const line = cursor.line + 1;
    const column = cursor.ch;
    const position = editorSupport.positionConverter.toAbsolute(line, column);
    positionChanged({ line, column, position });
  };

  editor.on("cursorActivity", onCursorActivity);

  const onHintShown = ({ from, options }) => {
    if (editor.autocomplete) {
      autocompleteChanged(true, from, options);
    }
  };

  // this is used instead of: editor.on("startCompletion", (editor) => {});
  editor.on("hint-shown", onHintShown);

  const onEndCompletion = (editor) => {
    if (editor.autocomplete) {
      autocompleteChanged(false);
    }
  };

  editor.on("endCompletion", onEndCompletion);

  const setValue = (value, updateSyntaxHighlighting = true) => {
    editor.setValue(value);
    if (updateSyntaxHighlighting !== false) {
      const version = editor.newContentVersion();
      editorSupport.update(value, version);

      fixColors(editor, editorSupport);
    }
  };

  const setReadOnly = (newReadOnly) => {
    readOnly = newReadOnly;
    editor.setOption(
      "readOnly",
      readOnly ? (!readOnlyCursor ? "nocursor" : true) : false
    );
  };

  const setReadOnlyCursor = (newReadOnlyCursor) => {
    readOnlyCursor = newReadOnlyCursor;
    editor.setOption(
      "readOnly",
      readOnly ? (!readOnlyCursor ? "nocursor" : true) : false
    );
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
    // TODO - should the mode be unregistered or something?
    editor.off("gutterClick", lineNumberClicked);
    // change is triggered BEFORE dom update, "changes" is triggered AFTER dom update
    editor.off("change", valueChanged);
    editor.off("scroll", scrollChanged);
    editor.off("focus", onFocus);
    editor.off("blur", onBlur);
    editor.off("cursorActivity", onCursorActivity);
    editor.off("hint-shown", onHintShown);
    editor.off("endCompletion", onEndCompletion);
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
    setReadOnlyCursor,
    setTheme,
    setValue,

    onAutocompleteChanged,
    offAutocompleteChanged,
    onFocusChanged,
    offFocusChanged,
    onKeyDown,
    offKeyDown,
    onLineNumberClicked,
    offLineNumberClicked,
    onPositioChanged,
    offPositionChanged,
    onScrollChanged,
    offScrollChanged,
    onValueChanged,
    offValueChanged,

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
