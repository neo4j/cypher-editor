/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
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

import { TreeUtils } from "../util/TreeUtils";
import * as CypherTypes from "../lang/CypherTypes";

function traverse(element, callback) {
  if (callback(element)) {
    // found, no need to go deeper
    return;
  }
  const c = element.getChildCount();
  if (c === 0) {
    return;
  }
  for (let i = 0; i < c; i += 1) {
    traverse(element.getChild(i), callback);
  }
}

export class CypherSyntaxHighlight {
  static process(parseTree, callback) {
    traverse(parseTree, (e) => {
      const { start, stop } = TreeUtils.getPosition(e) || { start: 0, stop: 0 };

      if (start > stop) {
        return false;
      }

      if (e instanceof CypherTypes.VARIABLE_CONTEXT) {
        callback(e, "variable");
        return true;
      }

      if (e instanceof CypherTypes.NODE_LABEL_CONTEXT) {
        callback(e, "label");
        return true;
      }

      if (
        e instanceof CypherTypes.RELATIONSHIP_TYPE_CONTEXT ||
        e instanceof
          CypherTypes.RELATIONSHIP_TYPE_OPTIONAL_COLON_CONTEXT
      ) {
        callback(e, "relationshipType");
        return true;
      }

      if (e instanceof CypherTypes.PROPERTY_KEY_NAME_CONTEXT) {
        callback(e, "property");
        return true;
      }

      if (e instanceof CypherTypes.PROCEDURE_NAME_CONTEXT) {
        callback(e, "procedure");
        return true;
      }

      if (e instanceof CypherTypes.PROCEDURE_OUTPUT_CONTEXT) {
        callback(e, "procedureOutput");
        return true;
      }

      if (e instanceof CypherTypes.FUNCTION_NAME_CONTEXT) {
        callback(e, "function");
        return true;
      }

      if (
        e instanceof CypherTypes.ALL_FUNCTION_NAME_CONTEXT ||
        e instanceof CypherTypes.REDUCE_FUNCTION_NAME_CONTEXT ||
        e instanceof CypherTypes.FILTER_FUNCTION_NAME_CONTEXT ||
        e instanceof CypherTypes.NONE_FUNCTION_NAME_CONTEXT ||
        e instanceof CypherTypes.EXTRACT_FUNCTION_NAME_CONTEXT ||
        e instanceof
          CypherTypes.SHORTEST_PATH_FUNCTION_NAME_CONTEXT ||
        e instanceof
          CypherTypes.ALL_SHORTEST_PATH_FUNCTION_NAME_CONTEXT ||
        e instanceof CypherTypes.SINGLE_FUNCTION_NAME_CONTEXT ||
        e instanceof CypherTypes.EXISTS_FUNCTION_NAME_CONTEXT ||
        e instanceof CypherTypes.ANY_FUNCTION_NAME_CONTEXT
      ) {
        callback(e, "function");
        return true;
      }

      if (e instanceof CypherTypes.PARAMETER_CONTEXT) {
        callback(e, "parameter");
        return true;
      }

      if (e instanceof CypherTypes.CONSOLE_COMMAND_NAME_CONTEXT) {
        callback(e, "consoleCommand");
        return true;
      }

      if (
        e instanceof CypherTypes.CONSOLE_COMMAND_SUBCOMMAND_CONTEXT ||
        e instanceof CypherTypes.CONSOLE_COMMAND_PATH_CONTEXT
      ) {
        callback(e, "property");
        return true;
      }

      return false;
    });
  }
}
