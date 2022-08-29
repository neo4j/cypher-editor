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

import { checkCompletionTypes, checkCompletion } from './util';
import * as CompletionTypes from '../../src/completion/CompletionTypes';

describe('AutoCompletion - Literal', () => {
  describe('string', () => {
    describe('types', () => {
      it('yields nothing type', () => {
        checkCompletionTypes('RETURN "▼"', true, [{ type: CompletionTypes.NOOP }]);
        checkCompletionTypes("RETURN '▼'", true, [{ type: CompletionTypes.NOOP }]);
      });
    });

    describe('with filters', () => {
      it('yields no AC in string', () => {
        const expected = {
          from: { line: 1, column: 7 },
          to: { line: 1, column: 10 },
          items: [],
        };

        checkCompletion('RETURN ":▼"', expected, true);
        checkCompletion("RETURN ':▼'", expected, true);
      });
    });
  });
});
