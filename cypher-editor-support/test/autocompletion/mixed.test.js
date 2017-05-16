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
import * as AutoCompletion from '../../src/completion/AutoCompletion';
import * as CompletionTypes from '../../src/completion/CompletionTypes';

describe('AutoCompletion - Mixed', () => {
  describe('types', () => {
    it('yields any at the beginning of a query', () => {
      checkCompletionTypes('▼', false, CompletionTypes.ALL);
    });

    it('yields function name and variable in expression', () => {
      checkCompletionTypes('return ▼fun', true, [{ type: CompletionTypes.VARIABLE }, { type: CompletionTypes.FUNCTION_NAME }]);
    });
  });

  describe('without filters', () => {
    it('yields function name and variable list in expression', () => {
      const expected = {
        from: { line: 1, column: 19 },
        to: { line: 1, column: 22 },
        items: [
          { type: 'variable', view: 'fun', content: 'fun', postfix: null },
          { type: 'function', view: 'toFloat', content: 'toFloat', postfix: 'expression' },
          { type: 'function', view: 'head', content: 'head', postfix: 'expression' },
        ],
      };
      checkCompletion('match (fun) return ▼fun', expected);
      checkCompletion('match (fun) return fun▼', expected);
    });

    it('yields only keywords at the start of a query', () => {
      checkCompletion('▼', {
        from: { line: 1, column: 0 },
        to: { line: 1, column: 0 },
        items: [
          {
            content: "param1",
            postfix: null,
            type: "parameter",
            view: "param1",
          },
          {
            content: "param2",
            postfix: null,
            type: "parameter",
            view: "param2",
          },
          {
            content: 'prop1',
            postfix: null,
            type: 'propertyKey',
            view: 'prop1',
          },
          {
            content: 'prop2',
            postfix: null,
            type: 'propertyKey',
            view: 'prop2',
          },
          {
            content: 'toFloat',
            postfix: 'expression',
            type: 'function',
            view: 'toFloat',
          },
          {
            content: 'head',
            postfix: 'expression',
            type: 'function',
            view: 'head',
          },
          ...AutoCompletion.KEYWORD_ITEMS,
        ],
      });
    });
  });

  describe('with filters', () => {
    it('yields function name and variable list in expression', () => {
      const expected = {
        from: { line: 1, column: 21 },
        to: { line: 1, column: 23 },
        items: [
          { type: 'variable', view: 'atern', content: 'atern', postfix: null },
          { type: 'function', view: 'toFloat', content: 'toFloat', postfix: 'expression' },
        ],
      };

      checkCompletion('MATCH (atern) RETURN at▼', expected, true);
      checkCompletion('MATCH (atern) RETURN a▼t', expected, true);
      checkCompletion('MATCH (atern) RETURN ▼at', expected, true);
    });
  });
});
