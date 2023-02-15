import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";

// If we are in call rule, and element is second child of call return procedure types
export default (element) => {
  const parent = element.parentCtx;
  if (!parent) {
    return [];
  }

  if (parent instanceof CypherTypes.CALL_CONTEXT) {
    const secondChild = parent.getChild(1);
    if (secondChild === element) {
      return [{ type: CompletionTypes.PROCEDURE_NAME }];
    }
  }

  return [];
};
