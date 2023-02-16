import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";

export default (element) => {
  const lookupContext = element.getParent();
  const text = element.getText();

  if (lookupContext) {
    if (
      lookupContext instanceof CypherTypes.PROPERTY_LOOKUP_CONTEXT &&
      text === "."
    ) {
      return [{ type: CompletionTypes.PROPERTY_KEY }];
    }
  }
  return [];
};
