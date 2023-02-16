import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";
import { TreeUtils } from "../../util/TreeUtils";

export default (element) => {
  const mapLiteralContext = TreeUtils.findParent(
    element,
    CypherTypes.MAP_LITERAL_CONTEXT
  );
  const propertiesContext = TreeUtils.findParent(
    element,
    CypherTypes.PROPERTIES_CONTEXT
  );

  if (mapLiteralContext) {
    const text = element.getText();
    if (text === "}") {
      return [];
    }
    return [{ type: CompletionTypes.PROPERTY_KEY }];
  }

  if (propertiesContext) {
    const text = element.getText();
    if (text === "}") {
      return [];
    }
    if (/\s+/.test(text)) {
      return [];
    }
    return [
      { type: CompletionTypes.PROPERTY_KEY },
      { type: CompletionTypes.PARAMETER }
    ];
  }

  return [];
};
