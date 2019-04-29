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

describe('AutoCompletion - Relationship Pattern', () => {
  describe('types', () => {
    it('yields relationship type if character present', () => {
      checkCompletionTypes('MATCH (a)-[a:▼b]-', true, [{ type: CompletionTypes.RELATIONSHIP_TYPE }]);
    });

    it('yields relationship type if start of relationship details', () => {
      checkCompletionTypes('MATCH (a)-▼[', true, [
        { type: CompletionTypes.VARIABLE },
        { type: CompletionTypes.RELATIONSHIP_TYPE },
      ]);
    });

    it('yields relationship type if only colon present', () => {
      checkCompletionTypes('MATCH (a)-[▼:', true, [{ type: CompletionTypes.RELATIONSHIP_TYPE }]);
    });

    it('yields relationship type if second and only pipe present', () => {
      checkCompletionTypes('MATCH (a)-[:q▼|', true, [{ type: CompletionTypes.RELATIONSHIP_TYPE }]);
    });

    it('yields relationship type if second and color present', () => {
      checkCompletionTypes('MATCH (a)-[:q|▼:', true, [{ type: CompletionTypes.RELATIONSHIP_TYPE }]);
    });
  });

  describe('without filters', () => {
    it('yields relationship type list', () => {
      const expected = {
        from: { line: 1, column: 12 },
        to: { line: 1, column: 14 },
        items: [
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel1', content: ':rel1', postfix: null },
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel 2', content: ':`rel 2`', postfix: null },
        ],
      };
      checkCompletion('MATCH (a)-[a:▼b]-', expected);
      checkCompletion('MATCH (a)-[a:b▼]-', expected);
    });

    it('yields relationship type list if only colon present', () => {
      const expected = {
        from: { line: 1, column: 12 },
        to: { line: 1, column: 13 },
        items: [
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel1', content: ':rel1', postfix: null },
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel 2', content: ':`rel 2`', postfix: null },
        ],
      };
      checkCompletion('MATCH (a)-[a▼:]-()', expected);
    });
  });

  describe('with filters', () => {
    it('yields relationship type list', () => {
      const expected = {
        from: { line: 1, column: 12 },
        to: { line: 1, column: 15 },
        items: [
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel1', content: ':rel1', postfix: null },
        ],
      };

      checkCompletion('MATCH (a)-[a:l1▼]-', expected, true);
      checkCompletion('MATCH (a)-[a:l▼1]-', expected, true);
      checkCompletion('MATCH (a)-[a:▼l1]-', expected, true);
    });

    it('yields relationship type list if only colon present', () => {
      const expected = {
        from: { line: 1, column: 12 },
        to: { line: 1, column: 13 },
        items: [
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel1', content: ':rel1', postfix: null },
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel 2', content: ':`rel 2`', postfix: null },
        ],
      };
      checkCompletion('MATCH (a)-[a▼:]-()', expected, true);
    });

    it('yields relationship type and variable list at the beginning of pattern', () => {
      const expected = {
        from: { line: 1, column: 10 },
        to: { line: 1, column: 10 },
        items: [
          { type: CompletionTypes.VARIABLE, view: 'a', content: 'a', postfix: null },
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel1', content: ':rel1', postfix: null },
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel 2', content: ':`rel 2`', postfix: null },
        ],
      };
      checkCompletion('MATCH (a)-▼[', expected, true);
    });

    it('yields relationship type if first letter is typed in', () => {
      const expected = {
        from: { line: 1, column: 11 },
        to: { line: 1, column: 13 },
        items: [
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel1', content: ':rel1', postfix: null },
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel 2', content: ':`rel 2`', postfix: null },
        ],
      };
      checkCompletion('MATCH (a)-[:r▼', expected, true);
    });

    it('yields relationship type if after colon with space', () => {
      const expected = {
        from: { line: 1, column: 11 },
        to: { line: 1, column: 12 },
        items: [
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel1', content: ':rel1', postfix: null },
          { type: CompletionTypes.RELATIONSHIP_TYPE, view: ':rel 2', content: ':`rel 2`', postfix: null },
        ],
      };
      checkCompletion('MATCH (a)-[:▼ return n;', expected, true);
    });
  });
});
