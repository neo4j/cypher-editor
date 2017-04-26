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

describe('AutoCompletion - Property Key', () => {
  describe('types', () => {
    it('yields property key', () => {
      checkCompletionTypes('MATCH (a) RETURN a.▼b', true, [{ type: CompletionTypes.PROPERTY_KEY }]);
    });

    it('yields property key with no first char typed in SET clause', () => {
      checkCompletionTypes('MATCH (a) SET a▼.', true, [{ type: CompletionTypes.PROPERTY_KEY }]);
    });

    it('yields property key with no first char typed after WHERE keyword', () => {
      checkCompletionTypes('MATCH (n) where n▼.', true, [{ type: CompletionTypes.PROPERTY_KEY }]);
    });

    it('yields property key with no first char typed after in an expression', () => {
      checkCompletionTypes('MATCH (a) WHERE a.name > "name" AND a▼.', true, [{ type: CompletionTypes.PROPERTY_KEY }]);
    });
  });

  describe('without filters', () => {
    it('yields property key list', () => {
      const expected = {
        from: { line: 1, column: 19 },
        to: { line: 1, column: 20 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop1', content: 'prop1', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop2', content: 'prop2', postfix: null },
        ],
      };
      checkCompletion('MATCH (a) RETURN a.▼b', expected);
      checkCompletion('MATCH (a) RETURN a.b▼', expected);
    });

    it('yields property key list without first char typed in a Set clause', () => {
      const expected = {
        from: { line: 1, column: 16 },
        to: { line: 1, column: 16 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop1', content: 'prop1', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop2', content: 'prop2', postfix: null },
        ],
      };
      checkCompletion('MATCH (a) SET a.▼', expected);
    });

    it('yields property key list without first char typed after WHERE keyword', () => {
      const expected = {
        from: { line: 1, column: 17 },
        to: { line: 1, column: 17 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop1', content: 'prop1', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop2', content: 'prop2', postfix: null },
        ],
      };
      checkCompletion('MATCH(a) WHERE n.▼', expected);
    });
  });

  describe('with filters', () => {
    it('yields property key list', () => {
      const expected = {
        from: { line: 1, column: 19 },
        to: { line: 1, column: 21 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop1', content: 'prop1', postfix: null },
        ],
      };
      checkCompletion('MATCH (a) RETURN a.p1▼', expected, true);
      checkCompletion('MATCH (a) RETURN a.p▼1', expected, true);
      checkCompletion('MATCH (a) RETURN a.▼p1', expected, true);
    });
  });
})
;
