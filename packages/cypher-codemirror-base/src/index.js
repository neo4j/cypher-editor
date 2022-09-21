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
