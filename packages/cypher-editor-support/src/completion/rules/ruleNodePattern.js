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

import * as CypherTypes from '../../lang/CypherTypes';
import * as CompletionTypes from '../CompletionTypes';

// If we are in relationship pattern then return variables and types
export default (element) => {
  const parent = element.getParent();
  const text = element.getText();
  // Special case. We are at the beginning of first node pattern.
  if (parent) {
    if (parent.constructor.name === CypherTypes.PATTERN_ELEMENT_CONTEXT && text === '(') {
      return [
        { type: CompletionTypes.VARIABLE },
        { type: CompletionTypes.LABEL },
      ];
    }

    if (parent.constructor.name === CypherTypes.NODE_PATTERN_CONTEXT) {
      // We are at the begining of node pattern
      if (text === '(') {
        return [
          { type: CompletionTypes.VARIABLE },
          { type: CompletionTypes.LABEL },
        ];
      }
      if (text === ':') {
        return [
          { type: CompletionTypes.LABEL },
        ];
      }
    }
  }

  return [];
};
