import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";
import { TreeUtils } from "../../util/TreeUtils";

// If we are in relationship pattern then return variables and types
export default (element) => {
  const parent = TreeUtils.findParent(
    element,
    CypherTypes.RELATIONSHIP_PATTERN_CONTEXT
  );
  if (parent) {
    // We are at the beginning, so allow variables too
    if (element.getText() === "[") {
      return [
        { type: CompletionTypes.VARIABLE },
        { type: CompletionTypes.RELATIONSHIP_TYPE }
      ];
    }
    // We are at the end, fail and allow algorithm to get back by 1 char
    if (element.getText() === "]") {
      return [];
    }
  }
  return [];
};
