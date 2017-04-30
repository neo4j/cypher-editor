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
import cypherLegacy from './openCypherTestFiles/cypher-legacy';
import cypher from './openCypherTestFiles/cypher';

describe('openCypher test files', () => {
  describe('cypherLegacy', () => {
    let i = 0;
    cypherLegacy.forEach((query) => {
      i += 1;
      it(`cypher-legacy-query-${i}`, () => {
        const b = new CypherEditorSupport(query);
        expect(b.parseErrors).to.deep.equal([]);
      });
    });
  });

  describe('cypher', () => {
    let i = 0;
    cypher.forEach((query) => {
      i += 1;
      it(`cypher-query-${i}`, () => {
        const b = new CypherEditorSupport(query);
        expect(b.parseErrors).to.deep.equal([]);
      });
    });
  });
});
