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

// Return procedure output completion if we are inside procedure
export default (element) => {
  const call = TreeUtils.findAnyParent(element, [CypherTypes.CALL_CONTEXT]);
  if (call != null) {
    const procedure = TreeUtils.findChild(
      call,
      CypherTypes.PROCEDURE_NAME_CONTEXT
    );
    const resultOutput = TreeUtils.findAnyParent(
      element,
      CypherTypes.PROCEDURE_RESULTS_CONTEXT
    );

    if (procedure == null || resultOutput == null) {
      return [];
    }

    return [
      { type: CompletionTypes.PROCEDURE_OUTPUT, name: procedure.getText() }
    ];
  }
  return [];
};
