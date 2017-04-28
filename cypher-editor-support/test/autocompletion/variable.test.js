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

describe('AutoCompletion - Variable', () => {
  describe('types', () => {
    xit('yields variable w/o closing backtick', () => {
      checkCompletionTypes('CREATE (`var`) MATCH (`v▼)', true, [{ type: CompletionTypes.VARIABLE }]);
    });
    it('yields variable with closing backtick ', () => {
      checkCompletionTypes('CREATE (`var`) MATCH (`v▼`)', true, [{ type: CompletionTypes.VARIABLE }]);
    });
  });

  describe('without filters', () => {
    it('yields variable list', () => {
      const expected = {
        from: { line: 1, column: 17 },
        to: { line: 1, column: 18 },
        items: [
          { type: 'variable', view: 'n', content: 'n', postfix: null },
          { type: 'variable', view: 'a', content: 'a', postfix: null },
        ],
      };

      checkCompletion('MATCH (n) MATCH (▼a', expected);
      checkCompletion('MATCH (n) MATCH (a▼', expected);
    });

    it('yields variable list in multiple queries, first query', () => {
      const expected = {
        from: { line: 1, column: 7 },
        to: { line: 1, column: 8 },
        items: [
          { type: 'variable', view: 'x', content: 'x', postfix: null },
        ],
      };
      checkCompletion('MATCH (▼x); MATCH (n) MATCH (a', expected);
      checkCompletion('MATCH (x▼); MATCH (n) MATCH (a', expected);
    });

    it('yields variable list in multiple queries, second query', () => {
      const expected = {
        from: { line: 1, column: 28 },
        to: { line: 1, column: 29 },
        items: [
          { type: 'variable', view: 'n', content: 'n', postfix: null },
          { type: 'variable', view: 'a', content: 'a', postfix: null },
        ],
      };
      checkCompletion('MATCH (x); MATCH (n) MATCH (▼a', expected);
      checkCompletion('MATCH (x); MATCH (n) MATCH (a▼', expected);
    });
  });

  describe('with filters', () => {
    it('yields variable list', () => {
      const expected = {
        from: { line: 1, column: 36 },
        to: { line: 1, column: 40 },
        items: [
          { type: 'variable', view: 'markus', content: 'markus', postfix: null },
        ],
      };

      checkCompletion('MATCH (penny) MATCH (markus) RETURN mark▼', expected, true);
      checkCompletion('MATCH (penny) MATCH (markus) RETURN mar▼k', expected, true);
    });

    it('yields variable list without variable under cursor', () => {
      const expected = {
        from: { line: 1, column: 19 },
        to: { line: 1, column: 21 },
        items: [
          { type: 'variable', view: 'var', content: 'var', postfix: null },
        ],
      };

      checkCompletion('MATCH (var) RETURN va▼', expected, true);
    });
    xit('yields variable with open backtick', () => {
      const expected = {
        from: { line: 1, column: 23 },
        to: { line: 1, column: 23 },
        items: [
          { type: 'variable', view: '`v`', content: '`v`', postfix: null },
          { type: 'variable', view: '`var`', content: '`var`', postfix: null },
        ],
      };
      checkCompletion('MATCH (`var`) MATCH (`v▼', expected, true);
    });
    it('yields variable with both backticks', () => {
      const expected = {
        from: { line: 1, column: 21 },
        to: { line: 1, column: 24 },
        items: [
          { type: 'variable', view: '`v`', content: '`v`', postfix: null },
          { type: 'variable', view: '`var`', content: '`var`', postfix: null },
        ],
      };
      checkCompletion('MATCH (`var`) MATCH (`v▼`', expected, true);
    });
    it('yields variable with both backticks and closing brace', () => {
      const expected = {
        from: { line: 1, column: 21 },
        to: { line: 1, column: 24 },
        items: [
          { type: 'variable', view: '`v`', content: '`v`', postfix: null },
          { type: 'variable', view: '`var`', content: '`var`', postfix: null },
        ],
      };
      checkCompletion('MATCH (`var`) MATCH (`v▼`)', expected, true);
    });
    xit('yields variable with open backticks and closing brace', () => {
      const expected = {
        from: { line: 1, column: 23 },
        to: { line: 1, column: 23 },
        items: [
          { type: 'variable', view: '`v', content: '`v', postfix: null },
          { type: 'variable', view: '`var`', content: '`var`', postfix: null },
        ],
      };
      checkCompletion('MATCH (`var`) MATCH (`v▼)', expected, true);
    });
    xit('yields variable with open brace and open backtick but w/o first symbol', () => {
      const expected = {
        from: { line: 1, column: 22 },
        to: { line: 1, column: 22 },
        items: [
          { type: 'variable', view: '`', content: '`', postfix: null },
          { type: 'variable', view: '`var`', content: '`var`', postfix: null },
        ],
      };
      checkCompletion('MATCH (`var`) MATCH (`▼', expected, true);
    });
    it('yields variable with open brace and both backticks but w/o first symbol', () => {
      const expected = {
        from: { line: 1, column: 21 },
        to: { line: 1, column: 23 },
        items: [
          { type: 'variable', view: '``', content: '``', postfix: null },
          { type: 'variable', view: '`var`', content: '`var`', postfix: null },
        ],
      };
      checkCompletion('MATCH (`var`) MATCH (`▼`', expected, true);
    });
    it('yields variable list if variable under cursor matces', () => {
      const exptected = {
        from: { line: 1, column: 19 },
        to: { line: 1, column: 22 },
        items: [
          { type: 'variable', view: 'var', content: 'var', postfix: null },
        ],
      };

    checkCompletion('MATCH (var) RETURN var▼', exptected, true);
    });
  });
});
