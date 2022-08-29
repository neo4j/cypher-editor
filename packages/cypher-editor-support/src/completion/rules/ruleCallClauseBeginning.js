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

// If we are in call rule, and element is second child of call return procedure types
export default (element) => {
  const parent = element.parentCtx;
  if (!parent) {
    return [];
  }

  if (parent.constructor.name === CypherTypes.CALL_CONTEXT) {
    const secondChild = parent.getChild(1);
    if (secondChild === element) {
      return [{ type: CompletionTypes.PROCEDURE_NAME }];
    }
  }

  return [];
};
