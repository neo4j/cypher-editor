import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";
import { TreeUtils } from "../../util/TreeUtils";

export default (element) => {
  const literalEntry = TreeUtils.findParent(
    element,
    CypherTypes.MAP_LITERAL_ENTRY
  );
  if (!literalEntry) {
    return [];
  }
  const doubleDots = literalEntry.getChild(1);
  const space = literalEntry.getChild(2);
  if (doubleDots === element || space === element) {
    return CompletionTypes.ALL;
  }
  return [];
};
