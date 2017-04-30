/*
 * Copyright (c) 2002-2017 "Neo Technology,"
 * Network Engine for Objects in Lund AB [http://neotechnology.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable max-len */
import { CypherParser } from '../_generated/CypherParser';

export const VARIABLE_CONTEXT = CypherParser.VariableContext.prototype.constructor.name;
export const LABEL_NAME_CONTEXT = CypherParser.LabelNameContext.prototype.constructor.name;
export const RELATIONSHIP_TYPE_NAME_CONTEXT = CypherParser.RelTypeNameContext.prototype.constructor.name;
export const PROPERTY_KEY_NAME_CONTEXT = CypherParser.PropertyKeyNameContext.prototype.constructor.name;
export const PARAMETER_NAME_CONTEXT = CypherParser.ParameterNameContext.prototype.constructor.name;
export const PARAMETER_CONTEXT = CypherParser.ParameterContext.prototype.constructor.name;
export const FUNCTION_NAME_CONTEXT = CypherParser.FunctionInvocationBodyContext.prototype.constructor.name;
export const PROCEDURE_NAME_CONTEXT = CypherParser.ProcedureInvocationBodyContext.prototype.constructor.name;
export const CONSOLE_COMMAND_NAME_CONTEXT = CypherParser.CypherConsoleCommandNameContext.prototype.constructor.name;
export const CONSOLE_COMMAND_CONTEXT = CypherParser.CypherConsoleCommandContext.prototype.constructor.name;
export const CONSOLE_COMMAND_PARAMETERS_CONTEXT = CypherParser.CypherConsoleCommandParametersContext.prototype.constructor.name;
export const CONSOLE_COMMAND_PARAMETER_CONTEXT = CypherParser.CypherConsoleCommandParameterContext.prototype.constructor.name;
export const CONSOLE_COMMAND_SUBCOMMAND_CONTEXT = CypherParser.SubCommandContext.prototype.constructor.name;
export const CONSOLE_COMMAND_PATH_CONTEXT = CypherParser.CommandPathContext.prototype.constructor.name;
export const PROCEDURE_OUTPUT_CONTEXT = CypherParser.ProcedureOutputContext.prototype.constructor.name;
export const PROCEDURE_RESULTS_CONTEXT = CypherParser.ProcedureResultsContext.prototype.constructor.name;

export const ALL_FUNCTION_NAME_CONTEXT = CypherParser.AllFunctionNameContext.prototype.constructor.name;
export const ANY_FUNCTION_NAME_CONTEXT = CypherParser.AnyFunctionNameContext.prototype.constructor.name;
export const SINGLE_FUNCTION_NAME_CONTEXT = CypherParser.SingleFunctionNameContext.prototype.constructor.name;
export const NONE_FUNCTION_NAME_CONTEXT = CypherParser.NoneFunctionNameContext.prototype.constructor.name;
export const EXTRACT_FUNCTION_NAME_CONTEXT = CypherParser.ExtractFunctionNameContext.prototype.constructor.name;
export const REDUCE_FUNCTION_NAME_CONTEXT = CypherParser.ReduceFunctionNameContext.prototype.constructor.name;
export const SHORTEST_PATH_FUNCTION_NAME_CONTEXT = CypherParser.ShortestPathFunctionNameContext.prototype.constructor.name;
export const ALL_SHORTEST_PATH_FUNCTION_NAME_CONTEXT = CypherParser.AllShortestPathFunctionNameContext.prototype.constructor.name;
export const FILTER_FUNCTION_NAME_CONTEXT = CypherParser.FilterFunctionNameContext.prototype.constructor.name;
export const EXISTS_FUNCTION_NAME_CONTEXT = CypherParser.ExistsFunctionNameContext.prototype.constructor.name;

export const CALL_CONTEXT = CypherParser.CallContext.prototype.constructor.name;
export const EXPRESSION_CONTEXT = CypherParser.ExpressionContext.prototype.constructor.name;
export const PATTERN_ELEMENT_CONTEXT = CypherParser.PatternElementContext.prototype.constructor.name;
export const NODE_PATTERN_CONTEXT = CypherParser.NodePatternContext.prototype.constructor.name;
export const NODE_LABEL_CONTEXT = CypherParser.NodeLabelContext.prototype.constructor.name;
export const NODE_LABELS_CONTEXT = CypherParser.NodeLabelsContext.prototype.constructor.name;
export const RELATIONSHIP_TYPE_CONTEXT = CypherParser.RelationshipTypeContext.prototype.constructor.name;
export const RELATIONSHIP_TYPE_OPTIONAL_COLON_CONTEXT = CypherParser.RelationshipTypeOptionalColonContext.prototype.constructor.name;
export const RELATIONSHIP_TYPES_CONTEXT = CypherParser.RelationshipTypesContext.prototype.constructor.name;
export const RELATIONSHIP_PATTERN_CONTEXT = CypherParser.RelationshipPatternContext.prototype.constructor.name;
export const PROPERTY_LOOKUP_CONTEXT = CypherParser.PropertyLookupContext.prototype.constructor.name;
export const MAP_LITERAL_CONTEXT = CypherParser.MapLiteralContext.prototype.constructor.name;
export const PROPERTIES_CONTEXT = CypherParser.PropertiesContext.prototype.constructor.name;
export const MAP_LITERAL_ENTRY = CypherParser.LiteralEntryContext.prototype.constructor.name;
export const STRING_LITERAL_CONTEXT = CypherParser.StringLiteralContext.prototype.constructor.name;

export const QUERY_CONTEXT = CypherParser.CypherQueryContext.prototype.constructor.name;
export const SYMBOLIC_NAME_CONTEXT = CypherParser.SymbolicNameContext.prototype.constructor.name;


export const COMPLETION_CANDIDATES = [
  STRING_LITERAL_CONTEXT,
  VARIABLE_CONTEXT,
  PROCEDURE_NAME_CONTEXT,
  FUNCTION_NAME_CONTEXT,
  CONSOLE_COMMAND_NAME_CONTEXT,
  NODE_LABEL_CONTEXT,
  RELATIONSHIP_TYPE_CONTEXT,
  RELATIONSHIP_TYPE_OPTIONAL_COLON_CONTEXT,
];

export const SYMBOLIC_CONTEXTS = [
  VARIABLE_CONTEXT,
  LABEL_NAME_CONTEXT,
  RELATIONSHIP_TYPE_NAME_CONTEXT,
  PROPERTY_KEY_NAME_CONTEXT,
  PARAMETER_NAME_CONTEXT,
];
