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

import * as CypherTypes from "../../lang/CypherTypes";
import * as CompletionTypes from "../CompletionTypes";
import { TreeUtils } from "../../util/TreeUtils";

const childToParentTypeMapping = {
  [CypherTypes.VARIABLE_CONTEXT]: [{ type: CompletionTypes.VARIABLE }],
  [CypherTypes.PARAMETER_NAME_CONTEXT]: [{ type: CompletionTypes.PARAMETER }],
  [CypherTypes.PROPERTY_KEY_NAME_CONTEXT]: [
    { type: CompletionTypes.PROPERTY_KEY }
  ],
  [CypherTypes.FUNCTION_NAME_CONTEXT]: [
    { type: CompletionTypes.FUNCTION_NAME }
  ],
  [CypherTypes.PROCEDURE_NAME_CONTEXT]: [
    { type: CompletionTypes.PROCEDURE_NAME }
  ],
  [CypherTypes.NODE_LABEL_CONTEXT]: [{ type: CompletionTypes.LABEL }],
  [CypherTypes.RELATIONSHIP_TYPE_CONTEXT]: [
    { type: CompletionTypes.RELATIONSHIP_TYPE }
  ],
  [CypherTypes.RELATIONSHIP_TYPE_OPTIONAL_COLON_CONTEXT]: [
    { type: CompletionTypes.RELATIONSHIP_TYPE }
  ],
  [CypherTypes.CONSOLE_COMMAND_NAME_CONTEXT]: [
    { type: CompletionTypes.CONSOLE_COMMAND_NAME }
  ],
  [CypherTypes.NODE_LABELS_CONTEXT]: [{ type: CompletionTypes.LABEL }],
  [CypherTypes.RELATIONSHIP_TYPES_CONTEXT]: [
    { type: CompletionTypes.RELATIONSHIP_TYPE }
  ]
};

// Check that element is inside specific parent context
export default (element) => {
  const parent = TreeUtils.findAnyParent(
    element,
    Object.keys(childToParentTypeMapping)
  );
  return parent != null
    ? childToParentTypeMapping[parent.constructor.name]
    : [];
};
