import _includes from "lodash.includes";
import * as CompletionTypes from "../CompletionTypes";
import CypherKeywords from "../../lang/CypherKeywords";

// If any of the keywords contains element text, return ALL
export default (element) => {
  const text = element.getText().toLowerCase();
  if (
    CypherKeywords.find((keyword) => _includes(keyword.toLowerCase(), text))
  ) {
    return CompletionTypes.ALL;
  }
  return [];
};
