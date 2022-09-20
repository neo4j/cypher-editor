import { editorSupportField } from "./cypher-state-definitions";

const isNumber = (v) =>
  v !== undefined &&
  (typeof v === "number" || v instanceof Number) &&
  isFinite(v);
const isInteger = (v) => isNumber(v) && v % 1 === 0;

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

export const getStatePositionForAny = (state, positionValue) => {
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
