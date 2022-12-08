/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
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

import {
  isInteger,
  isAbsolutePosition,
  isLineColumnPosition,
  isLineColumnAbsolutePosition
} from "./cypher-codemirror-base";

import { editorSupportField } from "./cypher-state-definitions";

export const getStatePositionAnchorAbsolute = (state) =>
  state.selection.main.anchor;
export const getStatePositionAbsolute = (state) => state.selection.main.head;
export const getStateEditorSupport = (state) =>
  state.field(editorSupportField, false);
export const getStateLineCount = (state) => state.doc.lines;
export const getStateValue = (state) => state.doc.toString();
export const getStateLength = (state) => state.doc.length;
export const getStateLineObjectForLine = (state, line) => state.doc.line(line);
export const getStateLineObjectForAbsolute = (state, position) =>
  state.doc.lineAt(position);
export const getStatePositionAbsoluteForLineColumn = (
  state,
  { line, column }
) => state.doc.line(line).from + column;

export const getStatePositionForAbsolute = (state, position) => {
  const { number: line, from: lineStart } = getStateLineObjectForAbsolute(
    state,
    position
  );
  const column = position - lineStart;
  return { line, column, position };
};

export const getStatePosition = (state) =>
  getStatePositionForAbsolute(state, getStatePositionAbsolute(state));

export const getStatePositionAnchor = (state) =>
  getStatePositionForAbsolute(state, getStatePositionAnchorAbsolute(state));

export const getStatePositionForAny = (state, positionValue) => {
  let position = null;
  if (isAbsolutePosition(positionValue)) {
    position = positionValue;
  } else if (isLineColumnAbsolutePosition(positionValue)) {
    position = positionValue.position;
  } else if (isLineColumnPosition(positionValue)) {
    const { line, column } = positionValue;
    const lineCount = getStateLineCount(state);
    if (line <= lineCount) {
      const lineObject = getStateLineObjectForLine(state, line);
      if (lineObject) {
        const { from, to } = lineObject;
        if (isInteger(from) && isInteger(to) && column <= to - from) {
          position = from + column;
        }
      }
    }
  }
  if (position !== null) {
    if (position <= getStateLength(state)) {
      const lineObject = getStateLineObjectForAbsolute(state, position);
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
