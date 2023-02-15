/* eslint-disable max-len */
import { CypherParser } from "@neo4j-cypher/antlr4";

export const VARIABLE_CONTEXT = CypherParser.VariableContext;
export const LABEL_NAME_CONTEXT = CypherParser.LabelNameContext;
export const RELATIONSHIP_TYPE_NAME_CONTEXT = CypherParser.RelTypeNameContext;
export const PROPERTY_KEY_NAME_CONTEXT = CypherParser.PropertyKeyNameContext;
export const PARAMETER_NAME_CONTEXT = CypherParser.ParameterNameContext;
export const PARAMETER_CONTEXT = CypherParser.ParameterContext;
export const FUNCTION_NAME_CONTEXT = CypherParser.FunctionInvocationBodyContext;
export const PROCEDURE_NAME_CONTEXT =
  CypherParser.ProcedureInvocationBodyContext;
export const CONSOLE_COMMAND_NAME_CONTEXT =
  CypherParser.CypherConsoleCommandNameContext;
export const CONSOLE_COMMAND_CONTEXT = CypherParser.CypherConsoleCommandContext;
export const CONSOLE_COMMAND_PARAMETERS_CONTEXT =
  CypherParser.CypherConsoleCommandParametersContext;
export const CONSOLE_COMMAND_PARAMETER_CONTEXT =
  CypherParser.CypherConsoleCommandParameterContext;
export const CONSOLE_COMMAND_SUBCOMMAND_CONTEXT =
  CypherParser.SubCommandContext;
export const CONSOLE_COMMAND_PATH_CONTEXT = CypherParser.CommandPathContext;
export const PROCEDURE_OUTPUT_CONTEXT = CypherParser.ProcedureOutputContext;
export const PROCEDURE_RESULTS_CONTEXT = CypherParser.ProcedureResultsContext;

export const ALL_FUNCTION_NAME_CONTEXT = CypherParser.AllFunctionNameContext;
export const ANY_FUNCTION_NAME_CONTEXT = CypherParser.AnyFunctionNameContext;
export const SINGLE_FUNCTION_NAME_CONTEXT =
  CypherParser.SingleFunctionNameContext;
export const NONE_FUNCTION_NAME_CONTEXT = CypherParser.NoneFunctionNameContext;
export const EXTRACT_FUNCTION_NAME_CONTEXT =
  CypherParser.ExtractFunctionNameContext;
export const REDUCE_FUNCTION_NAME_CONTEXT =
  CypherParser.ReduceFunctionNameContext;
export const SHORTEST_PATH_FUNCTION_NAME_CONTEXT =
  CypherParser.ShortestPathFunctionNameContext;
export const ALL_SHORTEST_PATH_FUNCTION_NAME_CONTEXT =
  CypherParser.AllShortestPathFunctionNameContext;
export const FILTER_FUNCTION_NAME_CONTEXT =
  CypherParser.FilterFunctionNameContext;
export const EXISTS_FUNCTION_NAME_CONTEXT =
  CypherParser.ExistsFunctionNameContext;

export const CALL_CONTEXT = CypherParser.CallContext;
export const EXPRESSION_CONTEXT = CypherParser.ExpressionContext;
export const PATTERN_ELEMENT_CONTEXT = CypherParser.PatternElementContext;
export const NODE_PATTERN_CONTEXT = CypherParser.NodePatternContext;
export const NODE_LABEL_CONTEXT = CypherParser.NodeLabelContext;
export const NODE_LABELS_CONTEXT = CypherParser.NodeLabelsContext;
export const RELATIONSHIP_TYPE_CONTEXT = CypherParser.RelationshipTypeContext;
export const RELATIONSHIP_TYPE_OPTIONAL_COLON_CONTEXT =
  CypherParser.RelationshipTypeOptionalColonContext;
export const RELATIONSHIP_TYPES_CONTEXT = CypherParser.RelationshipTypesContext;
export const RELATIONSHIP_PATTERN_CONTEXT =
  CypherParser.RelationshipPatternContext;
export const PROPERTY_LOOKUP_CONTEXT = CypherParser.PropertyLookupContext;
export const MAP_LITERAL_CONTEXT = CypherParser.MapLiteralContext;
export const PROPERTIES_CONTEXT = CypherParser.PropertiesContext;
export const MAP_LITERAL_ENTRY = CypherParser.LiteralEntryContext;
export const STRING_LITERAL_CONTEXT = CypherParser.StringLiteralContext;
export const ATOM_CONTEXT = CypherParser.AtomContext;

export const QUERY_CONTEXT = CypherParser.CypherQueryContext;
export const SYMBOLIC_NAME_CONTEXT = CypherParser.SymbolicNameContext;

export const COMPLETION_CANDIDATES = [
  STRING_LITERAL_CONTEXT,
  VARIABLE_CONTEXT,
  PROCEDURE_NAME_CONTEXT,
  FUNCTION_NAME_CONTEXT,
  CONSOLE_COMMAND_NAME_CONTEXT,
  NODE_LABEL_CONTEXT,
  RELATIONSHIP_TYPE_CONTEXT,
  RELATIONSHIP_TYPE_OPTIONAL_COLON_CONTEXT
];

export const SYMBOLIC_CONTEXTS = [
  VARIABLE_CONTEXT,
  LABEL_NAME_CONTEXT,
  RELATIONSHIP_TYPE_NAME_CONTEXT,
  PROPERTY_KEY_NAME_CONTEXT,
  PARAMETER_NAME_CONTEXT
];
