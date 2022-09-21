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
  readOnlyCursor: false,
  theme: THEME_LIGHT,
  updateSyntaxHighlighting: true,
  value: ""
};

export const isNumber = (v) =>
  v !== undefined &&
  (typeof v === "number" || v instanceof Number) &&
  isFinite(v);
export const isInteger = (v) => isNumber(v) && v % 1 === 0;
export const isObject = (v) => typeof v === "object" && v !== null;

export const isAbsolutePosition = v => isInteger(v) && v >= 0;
export const isLineColumnPosition = v => isObject(v) && isInteger(v.line) && v.line >= 1 && isInteger(v.column) && v.column >= 0;
export const isLineColumnAbsolutePosition = v => isObject(v) && isInteger(v.position) && v.position >= 0;

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
