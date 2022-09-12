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

  const editor = codemirror(parentDOMElement, {
    ...otherSettings,
    lint,
    value: "",
    lineNumberFormatter: (line) => (lineFormatter ? lineFormatter(line) : line)
  });
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
        editor.showAutoComplete();
      } else if (changed.text.length === 2) {
        const longerText = text + changed.text[1];
        if (autocompleteTriggerStrings.indexOf(longerText) !== -1) {
          editor.showAutoComplete();
        }
      }
    }
  };
  editor.on("change", valueChanged);

  lineFormatter = (line) => {
    return lineNumberFormatter(line, editor.getLineCount(), editor);
  };

  const positionChangeListeners = [];
  const autocompleteChangeListeners = [];

  const goToPosition = (position) => {
    const { line, ch } = editor.getCursor();
    const currentLine = line + 1;
    const currentColumn = ch;
    if (position.line < currentLine) {
      const steps = currentLine - position.line;
      for (let i = 0; i < steps; i++) {
        editor.execCommand("goLineUp");
      }
    } else if (position.line > currentLine) {
      const steps = position.line - currentLine;
      for (let i = 0; i < steps; i++) {
        editor.execCommand("goLineDown");
      }
    }
    if (position.column < currentColumn) {
      const steps = currentColumn - position.column;
      for (let i = 0; i < steps; i++) {
        editor.execCommand("goCharLeft");
      }
    } else if (position.column > currentColumn) {
      const steps = position.column - currentColumn;
      for (let i = 0; i < steps; i++) {
        editor.execCommand("goCharRight");
      }
    }
  };

  const getPosition = () => {
    const { line: lineIndex, ch } = editor.getCursor();
    const position = editor.indexFromPos(editor.getCursor());
    return { line: lineIndex + 1, column: ch, position };
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
  editor.goToPosition = goToPosition;
  editor.showAutoComplete = showAutoComplete;

  const originalOn = editor.on.bind(editor);
  const originalOff = editor.off.bind(editor);

  const positionChanged = (positionObject) => {
    positionChangeListeners.forEach((listener) => {
      listener(positionObject);
    });
  };

  const autocompleteChanged = (newAutocompleteOpen) => {
    autocompleteOpen = newAutocompleteOpen;
    autocompleteChangeListeners.forEach((listener) => {
      listener(autocompleteOpen);
    });
  };

  const on = (type, listener) => {
    if (type === "position") {
      positionChangeListeners.push(listener);
    } else if (type === "autocomplete") {
      autocompleteChangeListeners.push(listener);
    } else {
      originalOn(type, listener);
    }
  };

  const off = (type, listener) => {
    if (type === "position") {
      const index = positionChangeListeners.findIndex((l) => l === listener);
      if (index >= 0) {
        positionChangeListeners.splice(index, 1);
      }
    } else if (type === "autocomplete") {
      const index = autocompleteChangeListeners.findIndex((l) => l === listener);
      if (index >= 0) {
        autocompleteChangeListeners.splice(index, 1);
      }
    } else {
      originalOff(type, listener);
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
      autocompleteChanged(true);
    }
  });

  editor.on("endCompletion", (editor) => {
    if (editor.autocomplete) {
      autocompleteChanged(false);
    }
  });

  const value = settings.value || "";
  editor.setValue(value);

  const originalSetValue = editor.setValue.bind(editor);

  const setValue = (value, updateSyntaxHighlighting = true) => {
    originalSetValue(value);
    if (updateSyntaxHighlighting !== false) {
      const version = editor.newContentVersion();
      editorSupport.update(value, version);

      fixColors(editor, editorSupport);
    }
  };

  const setReadOnly = (readOnly) => {
    editor.setOption("readOnly", readOnly);
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
      lineFormat(line, editor.getLineCount(), editor);
    editor.setOption("lineNumberFormatter", lineNumberFormatter);
  };

  const setAutocomplete = (autocomplete) => {
    editor.autocomplete = autocomplete;
  };

  const setAutocompleteSticky = (newAutocompleteSticky) => {
    autocompleteSticky = newAutocompleteSticky;
    editor.setOption("hintOptions", { ...baseHintOptions, closeOnUnfocus: !autocompleteSticky});
  };

  const setAutocompleteTriggerStrings = (newAutocompleteTriggerStrings) => {
    autocompleteTriggerStrings = newAutocompleteTriggerStrings;
  };

  const setLint = (lint) => {
    editor.lint = lint;
  };

  const getLineCount = () => {
    return editor.lineCount();
  };

  const setSchema = (schema) => {
    editorSupport.setSchema(schema);
    if (autocompleteOpen) {
      showAutoComplete();
    }
  };

  editor.setValue = setValue;
  editor.setReadOnly = setReadOnly;
  editor.setLineNumbers = setLineNumbers;
  editor.setLineNumberFormatter = setLineNumberFormatter;
  editor.getPosition = getPosition;
  editor.setAutocomplete = setAutocomplete;
  editor.setAutocompleteSticky = setAutocompleteSticky;
  editor.setAutocompleteTriggerStrings = setAutocompleteTriggerStrings;
  editor.setLint = setLint;
  editor.getLineCount = getLineCount;
  editor.setSchema = setSchema;
  editor.on = on;
  editor.off = off;

  if (settings.updateSyntaxHighlighting !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(value, version);

    fixColors(editor, editorSupport);
  }

  return { editor, editorSupport };
}
