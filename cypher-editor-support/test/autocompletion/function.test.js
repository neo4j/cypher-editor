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

describe('AutoCompletion - Function', () => {
  describe('types', () => {
    it('yields function name', () => {
      checkCompletionTypes('return ▼fun()', true, [{ type: CompletionTypes.FUNCTION_NAME }],
      );
    });
    it('yields function name with backticks', () => {
      checkCompletionTypes('return ▼`fun`()', true, [{ type: CompletionTypes.FUNCTION_NAME }],
      );
    });

    it('yields function name after backtick and first char typed', () => {
      checkCompletionTypes('return `f▼un`()', true, [{ type: CompletionTypes.FUNCTION_NAME }],
      );
    });
  });

  describe('without filters', () => {
    it('yields function name list', () => {
      const expected = {
        from: { line: 1, column: 7 },
        to: { line: 1, column: 10 },
        items: [
          { type: 'function', view: 'toFloat', content: 'toFloat', postfix: 'expression' },
          { type: 'function', view: 'head', content: 'head', postfix: 'expression' },
        ],
      };
      checkCompletion('return ▼fun()', expected);
      checkCompletion('return fun▼()', expected);
    });

    it('yields function name list', () => {
      const expected = {
        from: { line: 1, column: 7 },
        to: { line: 1, column: 21 },
        items: [
          { type: 'function', view: 'toFloat', content: 'toFloat', postfix: 'expression' },
          { type: 'function', view: 'head', content: 'head', postfix: 'expression' },
        ],
      };
      checkCompletion('return ▼name.space.fun()', expected);
      checkCompletion('return name.space.fun▼()', expected);
    });
  });

  describe('with filters', () => {
    it('yields function name list', () => {
      const expected = {
        from: { line: 1, column: 7 },
        to: { line: 1, column: 9 },
        items: [
          { type: 'function', view: 'head', content: 'head', postfix: 'expression' },
        ],
      };

      checkCompletion('return he▼()', expected, true);
      checkCompletion('return h▼e()', expected, true);
      checkCompletion('return ▼he()', expected, true);
    });
  });

  xit('yields function name list with backticks', () => {
    const expected = {
      from: { line: 1, column: 7 },
      to: { line: 1, column: 23 },
      items: [
        { type: 'function', view: '`toFloat`', content: '`toFloat`', postfix: 'expression' },
        { type: 'function', view: '`head`', content: '`head`', postfix: 'expression' },
      ],
    };
    checkCompletion('return `▼name.space.fun`()', expected);
    // checkCompletion('return `name.space.fun`()', expected);
  });
});
