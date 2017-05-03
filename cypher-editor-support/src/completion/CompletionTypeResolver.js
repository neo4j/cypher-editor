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

import * as CompletionTypes from './CompletionTypes';
import * as rules from './rules';

// Rules are sorted starting with specific ones, and finishing with more generic ones.
const orderedCompletionRules = [
  rules.ruleNoop,
  rules.ruleVariableInExpressionPossibleFunction,
  rules.ruleLiteralEntry,
  rules.rulePropInMapLiteral,
  rules.ruleParamStartsWithDollar,
  rules.ruleSpecificParent,
  rules.ruleNodePattern,
  rules.ruleRelationshipPattern,
  rules.ruleProcedureOutputsInCallClause,
  rules.ruleCallClauseBeginning,
  rules.ruleConsoleCommandSubcommands,
  rules.rulePropertyLookup,
  rules.rulePossibleKeyword,
];

function evaluateRules(element) {
  for (const rule of orderedCompletionRules) {
    const types = rule(element);
    if (types.length > 0) {
      return types;
    }
  }

  return [];
}

export class CompletionTypeResolver {

  static getTypes(element) {
    // If element is null, then no types
    if (element == null) {
      return {
        found: false,
        types: CompletionTypes.ALL,
      };
    }

    // Retrieve types from rules
    const types = evaluateRules(element);
    if (types.length > 0) {
      return {
        found: true,
        types,
      };
    }

    // If no types found, then no types
    return {
      found: false,
      types: CompletionTypes.ALL,
    };
  }
}
