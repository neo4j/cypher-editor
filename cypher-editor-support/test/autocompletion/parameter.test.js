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

import { checkCompletion, checkCompletionTypes } from './util';
import * as CompletionTypes from '../../src/completion/CompletionTypes';

describe('AutoCompletion - Parameter', () => {
  describe('types', () => {
    it('yields parameter name', () => {
      checkCompletionTypes('RETURN $▼a', true, [{ type: CompletionTypes.PARAMETER }]);
    });

    it('yields parameter name w/o first char typed', () => {
      checkCompletionTypes('RETURN ▼$', true, [{ type: CompletionTypes.PARAMETER }]);
    });
  });

  describe('without filters', () => {
    xit('yields parameter name list', () => {
      const expected = {
        from: { line: 1, column: 14 },
        to: { line: 1, column: 15 },
        items: [
          { type: 'parameter', view: 'b', content: 'b', postfix: null },
          { type: 'parameter', view: 'a', content: 'a', postfix: null },
        ],
      };
      checkCompletion('RETURN {b} + $▼a', expected);
      checkCompletion('RETURN {b} + $a▼', expected);
    });

    xit('yields parameter name list after first symbol', () => {
      const expected = {
        from: { line: 1, column: 13 },
        to: { line: 1, column: 14 },
        items: [
          { type: 'parameter', view: 'b', content: 'b', postfix: null },
          { type: 'parameter', view: 'a', content: 'a', postfix: null },
        ],
      };
      checkCompletion('RETURN $b + {▼a}', expected);
      checkCompletion('RETURN $b + {a▼}', expected);
    });
  });

  describe('with filters', () => {
    xit('yields parameter name list', () => {
      const expected = {
        from: { line: 1, column: 14 },
        to: { line: 1, column: 15 },
        items: [
          { type: 'parameter', view: 'a', content: 'a', postfix: null },
        ],
      };

      checkCompletion('RETURN {b} + $a▼', expected, true);
      checkCompletion('RETURN {b} + $▼a', expected, true);
    });

    xit('yields legacy parameter name list', () => {
      const expected = {
        from: { line: 1, column: 8 },
        to: { line: 1, column: 9 },
        items: [
          { type: 'parameter', view: 'b', content: 'b', postfix: null },
        ],
      };
      checkCompletion('RETURN {b▼}', expected, true);
    });
  });
});
