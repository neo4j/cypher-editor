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
  if (!editorSupport || editor.autocomplete === false) {
    return { list: [] };
  }
  editorSupport.update(editor.getValue());

  const { line, ch } = editor.getCursor();
  const { items, from, to } = editorSupport.getCompletion(line + 1, ch);

  const position = translatePosition(from, to);
  const render = (element, self, data) => {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML += `<b>${data.displayText}</b>${
      data.postfix ? data.postfix : ""
    }`;
  };

  return {
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

const defaultAutocompleteSticky = false;

export function createCypherEditor(parentDOMElement, settings) {
  const editorSupport = new CypherEditorSupport();

  const {
    autocomplete = true,
    autocompleteSticky: initialAutocompleteSticky = false,
    lint = true,
    lineNumberFormatter = defaultLineNumberFormatter,
    autocompleteTriggerStrings:
      initialAutocompleteTriggerStrings = defaultAutocompleteTriggerStrings,
    ...otherSettings
  } = settings;

  let lineFormatter;
  let autocompleteTriggerStrings = initialAutocompleteTriggerStrings;
  let autocompleteSticky = initialAutocompleteSticky;
  const baseHintOptions = otherSettings.hintOptions || {};
  let autocompleteOpen = false;

  if (initialAutocompleteSticky) {
    otherSettings.hintOptions = { ...baseHintOptions, closeOnUnfocus: false };
  }

  const onLineClick = (cm, lineIndex, _, event) => {
    lineClickListeners.forEach((listener) => {
      listener(lineIndex + 1, event);
    });
  };

  // const onLineClick = (...args) => {
  //   // line, event
  //   console.log("onLineClick: ", args);
  //   lineClickListeners.forEach((listener) => {
  //     listener(...args);
  //   });
  // };

  const editor = codemirror(parentDOMElement, {
    ...otherSettings,
    lint,
    value: "",
    lineNumberFormatter: (line) => (lineFormatter ? lineFormatter(line) : line)
  });
  editor.on("gutterClick", onLineClick);
  editor.lint = lint;
  editor.autocomplete = autocomplete;

  const valueChanged = (doc, changed) => {
    if (
      editor.autocomplete &&
      Array.isArray(autocompleteTriggerStrings) &&
      changed.origin !== "setValue" &&
      changed.text.length > 0 &&
      changed.text.length <= 2
    ) {
      const text = changed.text[0];
      if (autocompleteTriggerStrings.indexOf(text) !== -1) {
        showAutoComplete();
      } else if (changed.text.length === 2) {
        const longerText = text + changed.text[1];
        if (autocompleteTriggerStrings.indexOf(longerText) !== -1) {
          showAutoComplete();
        }
      }
    }
  };
  editor.on("change", valueChanged);

  lineFormatter = (line) => {
    return lineNumberFormatter(line, getLineCount(), editor);
  };

  const positionChangeListeners = [];
  const autocompleteChangeListeners = [];
  const lineClickListeners = [];
  const scrollListeners = [];

  const goToPosition = (position) => {
    // TODO TEMP
    // const value = 202;
    // const value = { line: 1, column: 500 };
    // const value = { line: 99, column: 0 };
    // const values = [0, 202, {}, { line: -1, column: -1 }, { line: 2, column: 3 }, { line: 1, column: 500 }, { line: 99, column: 0 }, 890, 891, 892];
    // for (let value of values) {
    //   const tempPosition = getPositionForValue(value);
    //   console.log('getPositionForValue temp result: ', value, tempPosition);
    // }
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

  const getPosition = () => {
    const { line: lineIndex, ch } = editor.getCursor();
    const position = editor.indexFromPos(editor.getCursor());
    return { line: lineIndex + 1, column: ch, position };
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

  const showAutoComplete = () => {
    editor.execCommand("autocomplete");
  };

  editor.cypherMarkers = [];
  editor.editorSupport = editorSupport;
  editor.version = 1;
  editor.newContentVersion = function newContentVersion() {
    this.version += 1;
    return this.version;
  };
  editor.newContentVersion.bind(editor);

  const positionChanged = (positionObject) => {
    positionChangeListeners.forEach((listener) => {
      listener(positionObject);
    });
  };

  const autocompleteOpenChanged = (newAutocompleteOpen) => {
    autocompleteOpen = newAutocompleteOpen;
    autocompleteChangeListeners.forEach((listener) => {
      listener(autocompleteOpen);
    });
  };

  let scrollListener;

  const onScrollChanged = (cm) => {
    const scrollInfo = cm.getScrollInfo();
    const {
      top,
      clientHeight,
      height,
      left,
      clientWidth,
      width
    } = scrollInfo;
    const newScrollInfo = {
      scrollTop: top,
      clientHeight,
      scrollHeight: height,
      scrollLeft: left,
      clientWidth,
      scrollWidth: width
    };
    scrollListeners.forEach((listener) => {
      listener(newScrollInfo);
    });
  };

  const on = (type, listener) => {
    if (type === "position") {
      positionChangeListeners.push(listener);
    } else if (type === "autocomplete") {
      autocompleteChangeListeners.push(listener);
    } else if (type === "lineclick") {
      lineClickListeners.push(listener);
    } else if (type === "scroll") {
      if (!scrollListener) {
        scrollListener = onScrollChanged;
        editor.on(type, scrollListener);
      }
      scrollListeners.push(listener);
    } else {
      editor.on(type, listener);
    }
  };

  const off = (type, listener) => {
    if (type === "position") {
      const index = positionChangeListeners.findIndex((l) => l === listener);
      if (index >= 0) {
        positionChangeListeners.splice(index, 1);
      }
    } else if (type === "autocomplete") {
      const index = autocompleteChangeListeners.findIndex(
        (l) => l === listener
      );
      if (index >= 0) {
        autocompleteChangeListeners.splice(index, 1);
      }
    } else if (type === "lineclick") {
      const index = lineClickListeners.findIndex((l) => l === listener);
      if (index >= 0) {
        lineClickListeners.splice(index, 1);
      }
    } else if (type === "scroll") {
      const index = scrollListeners.findIndex((l) => l === listener);
      if (index >= 0) {
        scrollListeners.splice(index, 1);
      }
      if (scrollListeners.length === 0 && scrollListener) {
        editor.off(type, scrollListener);
        scrollListener = undefined;
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

  editor.on("startCompletion", (editor) => {
    if (editor.autocomplete) {
      autocompleteOpenChanged(true);
    }
  });

  editor.on("endCompletion", (editor) => {
    if (editor.autocomplete) {
      autocompleteOpenChanged(false);
    }
  });

  const value = settings.value || "";
  editor.setValue(value);

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
      editor.setOption("gutters", settings.gutters);
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

  const setAutocompleteSticky = (newAutocompleteSticky) => {
    autocompleteSticky = newAutocompleteSticky;
    editor.setOption("hintOptions", {
      ...baseHintOptions,
      closeOnUnfocus: !autocompleteSticky
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

  const setSchema = (schema) => {
    editorSupport.setSchema(schema);
    if (autocompleteOpen) {
      showAutoComplete();
    }
  };

  const focus = () => {
    editor && editor.focus();
  };

  const editorAPI = {
    focus,
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
    setAutocompleteSticky,
    setAutocompleteTriggerStrings,
    setLint,
    getLineCount,
    setSchema,
    on,
    off,
    codemirror: editor,
    editorSupport
  };

  if (settings.updateSyntaxHighlighting !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(value, version);

    fixColors(editor, editorSupport);
  }

  return { editor: editorAPI };
}
