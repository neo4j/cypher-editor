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

  return (editorSupport.parseErrors || []).map(({ line, col, msg }) => ({
    severity: "error",
    from: {
      line: line - 1,
      ch: Math.min(editor.getLine(line - 1).length - 1, col)
    },
    to: { line, ch: 0 },
    message: msg
  }));
});

codemirror.registerHelper("hint", "cypher", (editor) => {
  const editorSupport = editor.editorSupport;
  if (!editorSupport) return {};
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

export function createCypherEditor(parentDOMElement, settings) {
  const editorSupport = new CypherEditorSupport();

  const editor = codemirror(parentDOMElement, { ...settings, value: "" });

  const positionChangeListeners = [];

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

  const on = (type, listener) => {
    if (type === "position") {
      positionChangeListeners.push(listener);
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
    editor.setOption('readOnly', readOnly);
  };

  const setLineNumbers = (lineNumbers) => {
    editor.setOption('lineNumbers', lineNumbers);
    if (lineNumbers) {
      editor.setOption('gutters', settings.gutters);
    } else {
      editor.setOption('gutters', false)
    }

  };
  editor.setValue = setValue;
  editor.setReadOnly = setReadOnly;
  editor.setLineNumbers = setLineNumbers;
  editor.on = on;
  editor.off = off;

  if (settings.updateSyntaxHighlighting !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(value, version);

    fixColors(editor, editorSupport);
  }

  return { editor, editorSupport };
}
