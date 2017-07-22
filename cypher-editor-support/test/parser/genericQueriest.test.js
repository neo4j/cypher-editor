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

import { expect } from 'chai';
import { CypherEditorSupport } from '../../src/CypherEditorSupport';

const queries = [
  'MERGE () ON CREATE SET connection.departure = 1445, connection.arrival = 1710',
  'MERGE () ON MATCH SET connection.departure = 1445, connection.arrival = 1710',
  'SET a=a,b=b',
  'SET a=a ,b=b',
  'SET a=a, b=b',
  'SET a=a , b=b',
];

describe('Parser - Generic queries', () => {
  queries.forEach((query, i) => {
    it(`check query #${i}`, () => {
      const b = new CypherEditorSupport(query);
      expect(b.parseErrors).to.deep.equal([]);
    });
  });
});
