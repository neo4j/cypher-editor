import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";

// If we are in relationship pattern then return variables and types
export default (element) => {
  const parent = element.getParent ? element.getParent() : null;
  const text = element.getText();
  // Special case. We are at the beginning of first node pattern.
  if (parent) {
    if (parent instanceof CypherTypes.PATTERN_ELEMENT_CONTEXT && text === "(") {
      return [
        { type: CompletionTypes.VARIABLE },
        { type: CompletionTypes.LABEL }
      ];
    }

    if (parent instanceof CypherTypes.NODE_PATTERN_CONTEXT) {
      // We are at the begining of node pattern
      if (text === "(") {
        return [
          { type: CompletionTypes.VARIABLE },
          { type: CompletionTypes.LABEL }
        ];
      }
      if (text === ":") {
        return [{ type: CompletionTypes.LABEL }];
      }
    }
  }

  return [];
};
