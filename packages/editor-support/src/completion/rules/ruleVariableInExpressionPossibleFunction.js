import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";
import { TreeUtils } from "../../util/TreeUtils";

// If variable is inside expression context then it might be both variable and function
export default (element) => {
  const variable = TreeUtils.findAnyParent(element, [
    CypherTypes.VARIABLE_CONTEXT
  ]);
  const expression = TreeUtils.findAnyParent(variable, [
    CypherTypes.EXPRESSION_CONTEXT
  ]);
  return variable != null && expression != null
    ? [
        { type: CompletionTypes.VARIABLE },
        { type: CompletionTypes.FUNCTION_NAME }
      ]
    : [];
};
