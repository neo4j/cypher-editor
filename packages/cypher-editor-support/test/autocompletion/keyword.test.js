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

import { checkCompletion } from './util';

describe('AutoCompletion - Keyword', () => {
  describe('types', () => {
  });

  describe('without filters', () => {
  });

  describe('with filters', () => {
    it('yields keyword list', () => {
      const expected = {
        from: { line: 1, column: 10 },
        to: { line: 1, column: 12 },
        items: [
          { type: 'keyword', view: 'WHEN', content: 'WHEN', postfix: null },
          { type: 'keyword', view: 'WHERE', content: 'WHERE', postfix: null },
          { type: 'keyword', view: 'WITH', content: 'WITH', postfix: null },
        ],
      };

      checkCompletion('MATCH (n) wH▼', expected, true);
      checkCompletion('MATCH (n) w▼H', expected, true);
      checkCompletion('MATCH (n) ▼wH', expected, true);
    });
  });
});
