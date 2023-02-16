import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";

// Specify place where no autocompletion should be triggered
export default (element) => {
  if (element instanceof CypherTypes.STRING_LITERAL_CONTEXT) {
    return [{ type: CompletionTypes.NOOP }];
  }

  return [];
};
