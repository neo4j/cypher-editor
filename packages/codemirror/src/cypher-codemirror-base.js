export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";
export const THEME_AUTO = "auto";

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
  autofocusProps: ["cursorWide", "position", "readOnly", "selection", "value"],
  bracketMatching: true,
  clearHistoryProps: ["cypherLanguage"],
  closeBrackets: true,
  cursorWide: true,
  cypherLanguage: true,
  history: true,
  indentUnit: "  ",
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
  search: true,
  searchMatches: 0,
  searchOpen: false,
  searchText: "",
  searchTop: false,
  selection: undefined,
  tabKey: true,
  theme: THEME_LIGHT,
  tooltipAbsolute: true,
  value: "",
  preExtensions: [],
  postExtensions: []
};

export const reactiveOptionKeys = [
  "autocomplete",
  "autocompleteCloseOnBlur",
  "autocompleteOpen",
  "autocompleteTriggerStrings",
  "bracketMatching",
  "closeBrackets",
  "cursorWide",
  "cypherLanguage",
  // "autofocus",
  "history",
  "indentUnit",
  "lineNumberFormatter",
  "lineNumbers",
  "lineWrapping",
  "lint",
  "placeholder",
  "position",
  "readOnly",
  "readOnlyCursor",
  "schema",
  "search",
  "searchMatches",
  "searchOpen",
  "searchText",
  "searchTop",
  "selection",
  "tabKey",
  "theme",
  "tooltipAbsolute",
  // "parseOnSetValue",
  "value",
  "preExtensions",
  "postExtensions"
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

  const count = () => {
    return listeners.length;
  };

  return { on, off, listeners, fire, count };
};
