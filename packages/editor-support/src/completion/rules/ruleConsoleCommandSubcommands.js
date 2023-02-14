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

// If we are in console command, and not in console command name, return path
export default (element) => {
  let consoleCommand = TreeUtils.findParent(
    element.parentCtx,
    CypherTypes.CONSOLE_COMMAND_CONTEXT
  );
  let isAtTheEndOfConsoleCommand = false;
  if (!consoleCommand) {
    // We are not in console command. But maybe we are on a space at the end of console command?
    // If first child of parent contains console command
    // and second child is our current element
    // then we are at the space at the end of console command
    const parent = element.parentCtx;
    const child1 = TreeUtils.findChild(
      parent.children[0],
      CypherTypes.CONSOLE_COMMAND_CONTEXT
    );
    const child2 = parent.children[1];
    if (child1 && child2 && child2 === element) {
      consoleCommand = child1;
      isAtTheEndOfConsoleCommand = true;
    } else {
      return [];
    }
  }

  // Find current parameter or space
  const currentElement =
    TreeUtils.findParent(
      element,
      CypherTypes.CONSOLE_COMMAND_PARAMETER_CONTEXT
    ) || element;

  const path = [];
  let currentElementInParameter = false;

  // Iterate over parameters, and stop when we found current one.
  for (let i = 0; i < consoleCommand.children.length; i += 1) {
    const child = consoleCommand.children[i];
    if (child instanceof CypherTypes.CONSOLE_COMMAND_NAME_CONTEXT) {
      path.push(child.getText());
    }
    if (child instanceof CypherTypes.CONSOLE_COMMAND_PARAMETERS_CONTEXT) {
      for (let j = 0; j < child.children.length; j += 1) {
        const parameterChild = child.children[j];
        if (
          parameterChild instanceof
          CypherTypes.CONSOLE_COMMAND_PARAMETER_CONTEXT
        ) {
          path.push(parameterChild.getText());
          currentElementInParameter = true;
        } else {
          currentElementInParameter = false;
        }
        if (parameterChild === currentElement) {
          break;
        }
      }
    }
  }

  // If we are at the end of console command, nothing to filter.
  let filterLastElement;
  if (isAtTheEndOfConsoleCommand) {
    filterLastElement = false;
  } else {
    // If we are in parameter, filter, otherwise not
    filterLastElement = currentElementInParameter;
  }

  return [
    {
      type: CompletionTypes.CONSOLE_COMMAND_SUBCOMMAND,
      path,
      filterLastElement
    }
  ];
};
