import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";
import { TreeUtils } from "../../util/TreeUtils";

const childToParentTypeMapping = new Map();
childToParentTypeMapping.set(CypherTypes.VARIABLE_CONTEXT, [
  { type: CompletionTypes.VARIABLE }
]);
childToParentTypeMapping.set(CypherTypes.PARAMETER_NAME_CONTEXT, [
  { type: CompletionTypes.PARAMETER }
]);
childToParentTypeMapping.set(CypherTypes.PROPERTY_KEY_NAME_CONTEXT, [
  { type: CompletionTypes.PROPERTY_KEY }
]);
childToParentTypeMapping.set(CypherTypes.FUNCTION_NAME_CONTEXT, [
  { type: CompletionTypes.FUNCTION_NAME }
]);
childToParentTypeMapping.set(CypherTypes.PROCEDURE_NAME_CONTEXT, [
  { type: CompletionTypes.PROCEDURE_NAME }
]);
childToParentTypeMapping.set(CypherTypes.NODE_LABEL_CONTEXT, [
  { type: CompletionTypes.LABEL }
]);
childToParentTypeMapping.set(CypherTypes.RELATIONSHIP_TYPE_CONTEXT, [
  { type: CompletionTypes.RELATIONSHIP_TYPE }
]);
childToParentTypeMapping.set(
  CypherTypes.RELATIONSHIP_TYPE_OPTIONAL_COLON_CONTEXT,
  [{ type: CompletionTypes.RELATIONSHIP_TYPE }]
);
childToParentTypeMapping.set(CypherTypes.CONSOLE_COMMAND_NAME_CONTEXT, [
  { type: CompletionTypes.CONSOLE_COMMAND_NAME }
]);
childToParentTypeMapping.set(CypherTypes.NODE_LABELS_CONTEXT, [
  { type: CompletionTypes.LABEL }
]);
childToParentTypeMapping.set(CypherTypes.RELATIONSHIP_TYPES_CONTEXT, [
  { type: CompletionTypes.RELATIONSHIP_TYPE }
]);

// Check that element is inside specific parent context
export default (element) => {
  const parent = TreeUtils.findAnyParent(
    element,
    Array.from(childToParentTypeMapping.keys())
  );
  return parent != null ? childToParentTypeMapping.get(parent.constructor) : [];
};
