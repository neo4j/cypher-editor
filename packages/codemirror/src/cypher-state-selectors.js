import { search } from "@codemirror/search";
import { autocompletion, pickedCompletion } from "@codemirror/autocomplete";
import { StateField } from "@codemirror/state";

const getStateField = (mainExtension, label) => {
  const extensions = mainExtension();
  if (Array.isArray(extensions)) {
    const stateField = extensions.find((ex) => ex instanceof StateField);
    if (stateField) {
      return stateField;
    }
  }
  const length = Array.isArray(extensions) ? extensions.length : "no";
  throw new Error(
    "getStateField for " + label + " failed (" + length + " extensions found)"
  );
};

export const searchStateField = getStateField(search, "search");
export const autocompletionStateField = getStateField(
  autocompletion,
  "autocompletion"
);

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

export const getStateSelection = (state) => state.selection;

export const getStateHasSelection = (state) =>
  state.selection.ranges.some((r) => !r.empty);

export const getSearchState = (state) => state.field(searchStateField, false);

export const getStateSearchOpen = (state) =>
  (getSearchState(state) || { panel: null }).panel !== null;

export const getStateSearchMatches = (state, maxCount = 1000) => {
  const matches = (
    getSearchState(state) || { query: { matchAll: () => null } }
  ).query.matchAll(state, 1000);
  return matches ? matches.slice(0, maxCount) : matches;
};

export const getStateSearchSpec = (state) =>
  (getSearchState(state) || { query: { spec: null } }).query.spec;

export const getStateSearchText = (state) =>
  (getSearchState(state) || { query: { spec: { search: null } } }).query.spec
    .search;

export const getAutocompleteState = (state) =>
  state.field(autocompletionStateField, false);

export const getStateAutocompleteOpen = (state) =>
  (getAutocompleteState(state) || { open: null }).open !== null;

export const getFormattedAutocompleteOption = (option) => ({
  from: option.source.from,
  ...option.completion
});

export const getStateAutocompleteOptions = (state, format = false) => {
  const { open } = getAutocompleteState(state) || { open: null };
  if (open !== null) {
    const { options } = open;
    if (options) {
      return format ? options.map(getFormattedAutocompleteOption) : options;
    }
    return [];
  }
  return null;
};

export const areViewUpdateAutocompleteOptionsEqual = (v) => {
  const { startState: oldState, state: newState } = v;
  const { open: oldOpen } = getAutocompleteState(oldState) || { open: null };
  const { open: newOpen } = getAutocompleteState(newState) || { open: null };
  if (oldOpen === null || newOpen === null) {
    return oldOpen === newOpen;
  } else {
    const { options: oldOptions } = oldOpen;
    const { options: newOptions } = newOpen;
    if (!oldOptions || !newOptions) {
      return oldOptions === newOptions;
    } else {
      const { length: oldLength } = oldOptions;
      const { length: newLength } = newOptions;
      if (!oldLength || !newLength || oldLength !== newLength) {
        return oldLength === newLength;
      }
      for (let i = 0; i < newLength; i++) {
        const oldOption = oldOptions[i];
        const newOption = oldOptions[i];
        if (
          oldOption.source.from !== newOption.source.from ||
          oldOption.completion !== newOption.completion
        ) {
          return false;
        }
      }
      return true;
    }
  }
};

export const getViewUpdateAnnotationValueForType = (v, type) => {
  for (let transaction of v.transactions) {
    const { annotations } = transaction;
    const foundAnnotation = annotations.find((a) => a.type === type);
    if (foundAnnotation && foundAnnotation.value) {
      return foundAnnotation.value;
    }
  }
  return null;
};

export const getViewUpdatePickedAutocompleteOption = (v, format = false) => {
  const pickedAutocompletion = getViewUpdateAnnotationValueForType(
    v,
    pickedCompletion
  );
  if (pickedAutocompletion) {
    const pickedAutocompleteOption = getStateAutocompleteOptions(
      v.startState,
      false
    ).find(({ completion }) => completion == pickedAutocompletion);
    if (pickedAutocompleteOption) {
      return format
        ? getFormattedAutocompleteOption(pickedAutocompleteOption)
        : pickedAutocompleteOption;
    }
  }

  return null;
};
