import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";
import { TreeUtils } from "../../util/TreeUtils";

// Return procedure output completion if we are inside procedure
export default (element) => {
  const call = TreeUtils.findAnyParent(element, [CypherTypes.CALL_CONTEXT]);
  if (call != null) {
    const procedure = TreeUtils.findChild(
      call,
      CypherTypes.PROCEDURE_NAME_CONTEXT
    );
    const resultOutput = TreeUtils.findAnyParent(element, [
      CypherTypes.PROCEDURE_RESULTS_CONTEXT
    ]);

    if (procedure == null || resultOutput == null) {
      return [];
    }

    return [
      { type: CompletionTypes.PROCEDURE_OUTPUT, name: procedure.getText() }
    ];
  }
  return [];
};
