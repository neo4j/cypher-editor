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
import * as CompletionTypes from '../../../src/completion/CompletionTypes';

describe('AutoCompletion - Property Key - Relationship pattern context', () => {
  describe('types', () => {
    it('yields property key with no first char inside a map within expression', () => {
      checkCompletionTypes('MATCH ()-[▼{}]-()', true, [
        { type: CompletionTypes.PROPERTY_KEY },
      ]);
    });

    it('yields property key with no first char inside a map within expression with first symbol', () => {
      checkCompletionTypes('WITH $param MATCH ()-[{▼p}]-()', true, [
        { type: CompletionTypes.PROPERTY_KEY },
        { type: CompletionTypes.PARAMETER },
      ]);
    });

    it('yields property key with no first char inside map within expression without closing curly brace', () => {
      checkCompletionTypes('WITH $param MATCH ()-[▼{', true, [
        { type: CompletionTypes.PROPERTY_KEY },
        { type: CompletionTypes.PARAMETER },
      ]);
    });

    it('yields property key with first char inside map within expression and no closing curly brace', () => {
      checkCompletionTypes('WITH $param MATCH ()-[{▼p', true, [
        { type: CompletionTypes.PROPERTY_KEY },
        { type: CompletionTypes.PARAMETER },
      ]);
    });
  });

  describe('autocompletion', () => {
    it('yields property key list inside map within expression', () => {
      const expected = {
        from: { line: 1, column: 11 },
        to: { line: 1, column: 11 },
        items: [
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop1', content: 'prop1', postfix: null },
          { type: CompletionTypes.PROPERTY_KEY, view: 'prop2', content: 'prop2', postfix: null },
        ],
      };
      checkCompletion('MATCH ()-[{▼}]-()', expected, true);
    });
  });
});
