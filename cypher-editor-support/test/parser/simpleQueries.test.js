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
import { reduceTree } from '../util';

describe('Parser - Simple queries', () => {
  it('should return correct ast for simple query', () => {
    const backend = new CypherEditorSupport('RETURN 42;');

    expect(backend.parseErrors).to.deep.equal([]);
  });

  it('should return errors for incorrect query', () => {
    const b = new CypherEditorSupport('POTATO');

    expect(b.parseErrors).to.deep.equal([{
      line: 1,
      col: 0,
      msg: "mismatched input 'POTATO' expecting {':', CYPHER, EXPLAIN, PROFILE, USING, CREATE, DROP, LOAD, WITH, OPTIONAL, MATCH, UNWIND, MERGE, SET, DETACH, DELETE, REMOVE, FOREACH, RETURN, START, CALL, SP}",
    }]);
    expect(reduceTree(b.parseTree)).to.deep.equal({
      rule: 'CypherContext',
      start: { line: 1, column: 0 },
      stop: { line: 1, column: 5 },
      text: 'POTATO',
      children: [{ rule: 'ErrorNodeImpl', start: {}, stop: {}, children: [], text: 'POTATO' }],
    });
  });

  it('should return errors if error in lexer', () => {
    const b = new CypherEditorSupport('WITH a` WITH 1;');

    expect(b.parseErrors).to.deep.equal([
      {
        col: 6,
        line: 1,
        msg: "extraneous input '`' expecting {';', SP}",
      },
      {
        col: 8,
        line: 1,
        msg: "missing ';' at 'WITH'",
      },
    ]);
  });
});
