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

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";

export const defaultLineNumberFormatter = (line, lineCount) => {
  if (lineCount === 1) {
    return "$";
  } else {
    return line;
  }
};

export const defaultAutocompleteTriggerStrings = [
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

export const defaultOptions = {
  autocomplete: true,
  autocompleteCloseOnBlur: true,
  autocompleteOpen: false,
  autocompleteTriggerStrings: defaultAutocompleteTriggerStrings,
  autofocus: true,
  autofocusProps: ["position", "readOnly", "value"],
  history: true,
  lineNumberFormatter: defaultLineNumberFormatter,
  lineNumbers: true,
  lineWrapping: false,
  lint: false,
  parseOnSetValue: true,
  placeholder: undefined,
  position: undefined,
  readOnly: false,
  readOnlyCursor: false,
  schema: undefined,
  tabKey: true,
  theme: THEME_LIGHT,
  tooltipAbsolute: false,
  value: ""
};

export const reactiveOptionKeys = [
  "autocomplete",
  "autocompleteCloseOnBlur",
  "autocompleteOpen",
  "autocompleteTriggerStrings",
  // "autofocus",
  "history",
  "lineNumberFormatter",
  "lineNumbers",
  "lineWrapping",
  "lint",
  "placeholder",
  "position",
  "readOnly",
  "readOnlyCursor",
  "schema",
  "tabKey",
  "theme",
  "tooltipAbsolute",
  // "parseOnSetValue",
  "value"
];

export const isNumber = (v) =>
  v !== undefined &&
  (typeof v === "number" || v instanceof Number) &&
  isFinite(v);
export const isInteger = (v) => isNumber(v) && v % 1 === 0;
export const isObject = (v) => typeof v === "object" && v !== null;

export const isAbsolutePosition = (v) => isInteger(v) && v >= 0;
export const isLineColumnPosition = (v) =>
  isObject(v) &&
  isInteger(v.line) &&
  v.line >= 1 &&
  isInteger(v.column) &&
  v.column >= 0;
export const isLineColumnAbsolutePosition = (v) =>
  isObject(v) && isInteger(v.position) && v.position >= 0;

export const positionColumnNewToOld = ({ line, column, ...rest }) => ({
  line,
  column: column - 1,
  ...rest
});

export const positionColumnOldToNew = ({ line, column, ...rest }) => ({
  line,
  column: column + 1,
  ...rest
});

export const positionNewToOld = (positionValue) =>
  isLineColumnPosition(positionValue)
    ? positionColumnNewToOld(positionValue)
    : positionValue;

export const positionOldToNew = (positionValue) =>
  isLineColumnPosition(positionValue)
    ? positionColumnOldToNew(positionValue)
    : positionValue;

export const createEventHandlers = () => {
  const listeners = [];

  const off = (listener) => {
    const index = listeners.findIndex((l) => l === listener);
    if (index >= 0) {
      listeners.splice(index, 1);
      return true;
    }
    return false;
  };

  const on = (listener) => {
    listeners.push(listener);
    return () => {
      off(listener);
    };
  };

  const fire = (...args) => {
    for (let listener of listeners) {
      listener(...args);
    }
  };

  return { on, off, listeners, fire };
};
