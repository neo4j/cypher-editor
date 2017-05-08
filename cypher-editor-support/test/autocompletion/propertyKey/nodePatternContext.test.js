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

import { checkCompletion, checkCompletionTypes } from '../util';
import * as AutoCompletion from '../../../src/completion/AutoCompletion';
import * as CompletionTypes from '../../../src/completion/CompletionTypes';

describe('AutoCompletion - Property Key - Node pattern context', () => {
  describe('types', () => {
    it('yields property key with no first char typed inside map literal', () => {
      checkCompletionTypes('MATCH (▼{});', true, [
        { type: CompletionTypes.PROPERTY_KEY },
      ]);
    });

    it('yields ALL if on closing curly brace', () => {
      checkCompletionTypes('MATCH ({▼});', false, CompletionTypes.ALL);
    });

    it('yield property key and parameter if in properties context', () => {
      checkCompletionTypes('WITH $someParam MATCH ({som▼e })', true, [
        { type: CompletionTypes.PROPERTY_KEY },
        { type: CompletionTypes.PARAMETER },
      ]);
    });

    it('yields property key or parameter with no closing curly brace', () => {
      checkCompletionTypes('WITH $param MATCH (n ▼{', true, [
        { type: CompletionTypes.PROPERTY_KEY },
        { type: CompletionTypes.PARAMETER },
      ]);
    });

    it('yields property key with first char typed inside map literal w/o closing curly brace', () => {
      checkCompletionTypes('WITH $param MATCH (n {▼p', true, [
        { type: CompletionTypes.PROPERTY_KEY },
        { type: CompletionTypes.PARAMETER },
      ]);
    });

    it('yields property key with first char typed inside map literal with a closing curly brace', () => {
      checkCompletionTypes('WITH $param MATCH (n {p▼})', false, CompletionTypes.ALL);
    });

    it('yields all before double dots', () => {
      checkCompletionTypes('MATCH (n {key▼:})', true, CompletionTypes.ALL);
    });

    it('yields all before double dots unclosed map literal', () => {
      checkCompletionTypes('MATCH (n {key▼:', true, CompletionTypes.ALL);
    });

    it('yields all after double dots', () => {
      checkCompletionTypes('MATCH (n {key:▼ })', true, CompletionTypes.ALL);
    });

    it('yields property key with no first char typed after key and with closing curly brace', () => {
      checkCompletionTypes('MATCH (n {key: 1, ▼});', false, CompletionTypes.ALL);
    });

    it('yields property key after key and first char typed w/o closing curly brace', () => {
      checkCompletionTypes('MATCH (n {key: 1, ▼k', true, [{ type: CompletionTypes.PROPERTY_KEY }]);
    });

    it('yields property key after key and first char typed with closing curly brace', () => {
      checkCompletionTypes('MATCH (n {key: 1, ▼k});', true, [{ type: CompletionTypes.PROPERTY_KEY }]);
    });
    xit('yields property key with no first char typed inside map literal with backtick', () => {
      checkCompletionTypes('MATCH (n {`▼});', true, [
        { type: CompletionTypes.PROPERTY_KEY },
      ]);
    });

    xit('yields property key with first char typed inside map literal with backtick', () => {
      checkCompletionTypes('MATCH (n {`p▼});', true, [
        { type: CompletionTypes.PROPERTY_KEY },
      ]);
    });

    xit('yields property key with no first char typed inside map literal with both backticks', () => {
      checkCompletionTypes('MATCH (n {`▼`});', true, [
        { type: CompletionTypes.PROPERTY_KEY },
      ]);
    });

    xit('yields property key with first char typed inside map literal with both backticks', () => {
      checkCompletionTypes('MATCH ({`p▼`});', true, [
        { type: CompletionTypes.PROPERTY_KEY },
      ]);
    });
  });

  describe('autocompletion', () => {
    it('yields property key list from within map', () => {
      const expected = {
        from: { line: 1, column: 8 },
        to: { line: 1, column: 8 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop1', content: 'prop1', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop2', content: 'prop2', postfix: null },
        ],
      };
      checkCompletion('MATCH ({▼});', expected, true);
    });

    xit('yields property key list from within map with first backtick opened', () => {
      const expected = {
        from: { line: 1, column: 8 },
        to: { line: 1, column: 8 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: '`prop1`', content: '`prop1`', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: '`prop2`', content: '`prop2`', postfix: null },
        ],
      };
      checkCompletion('MATCH ({`▼});', expected, true);
    });

    xit('yields property key list from within map with both backticks', () => {
      const expected = {
        from: { line: 1, column: 8 },
        to: { line: 1, column: 11 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: '`prop1`', content: '`prop1`', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: '`prop2`', content: '`prop2`', postfix: null },
        ],
      };
      checkCompletion('MATCH ({`p▼`});', expected, true);
    });

    xit('yields property key list from within map with both backticks and no first char typed', () => {
      const expected = {
        from: { line: 1, column: 8 },
        to: { line: 1, column: 11 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: '`prop1`', content: '`prop1`', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: '`prop2`', content: '`prop2`', postfix: null },
        ],
      };
      checkCompletion('MATCH ({`▼`});', expected, true);
    });

    xit('yields property key list from within map with both backticks and first char typed', () => {
      const expected = {
        from: { line: 1, column: 8 },
        to: { line: 1, column: 11 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: '`prop1`', content: '`prop1`', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: '`prop2`', content: '`prop2`', postfix: null },
        ],
      };
      checkCompletion('MATCH ({`p▼`});', expected, true);
    });
    it('yields property keys and param in properties context', () => {
      const expected = {
        from: { line: 1, column: 8 },
        to: { line: 1, column: 10 },
        items: [
          {
            content: 'p1',
            postfix: null,
            type: 'parameter',
            view: 'p1',
          },
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop1', content: 'prop1', postfix: null },
        ],
      };
      checkCompletion('MATCH ({p1▼ });', expected, true);
    });

    it('yields property key list in map literal w/o closing curly brace', () => {
      const expected = {
        from: { line: 1, column: 10 },
        to: { line: 1, column: 10 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop1', content: 'prop1', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop2', content: 'prop2', postfix: null },
        ],
      };
      checkCompletion('MATCH (n {▼', expected, true);
    });

    it('yields all after double dots in unclosed map literal', () => {
      const expected = {
        from: { line: 1, column: 12 },
        to: { line: 1, column: 12 },
        items: [
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
      };
      checkCompletion('MATCH ({key:▼', expected, true);
    });

    it('yields all after double dots in map literal', () => {
      const expected = {
        from: { line: 1, column: 12 },
        to: { line: 1, column: 12 },
        items: [
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
      };
      checkCompletion('MATCH ({key:▼ })', expected, true);
    });
  });
});
