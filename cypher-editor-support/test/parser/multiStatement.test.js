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

describe('Parser - Multi statement commands', () => {
  it('should catch an error on second statement', () => {
    const b = new CypherEditorSupport('RETURN 1;\n' +
      'sdfsfsdfsdfsdf;\n' +
      'RETURN rand();');
    expect(b.parseErrors).to.deep.equal([
      {
        col: 0,
        line: 2,
        msg: "extraneous input 'sdfsfsdfsdfsdf' expecting {<EOF>, ':', CYPHER, EXPLAIN, PROFILE, USING, CREATE, DROP, LOAD, WITH, OPTIONAL, MATCH, UNWIND, MERGE, SET, DETACH, DELETE, REMOVE, FOREACH, RETURN, START, CALL, SP}",
      },
    ]);
  });

  it('should successfully parse common param command use case', () => {
    const b = new CypherEditorSupport(':play http://guides.neo4j.com/reco;\n' +
        ':param x => 1;\n' +
        'RETURN $x;\n' +
        ':play reco;');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should successfully parse multiple param commands with query', () => {
    const b = new CypherEditorSupport(':param age => 25;' +
        ':param interests => [\'football\', \'fishing\'];\n' +
        'MATCH (n)\n' +
        'WHERE n.age > $age\n' +
        'AND n.interest IN $interests\n' +
        'RETURN n;');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should recover to second statement after facing invalid command', () => {
    const b = new CypherEditorSupport(':PUT ao*51 fagas 8(!; :play;');
    expect(b.parseErrors).to.deep.equal([
      {
        col: 7,
        line: 1,
        msg: "mismatched input '*' expecting {';', SP}",
      },
      {
        col: 11,
        line: 1,
        msg: "mismatched input 'fagas' expecting {':', CYPHER, EXPLAIN, PROFILE, USING, CREATE, DROP, LOAD, WITH, OPTIONAL, MATCH, UNWIND, MERGE, SET, DETACH, DELETE, REMOVE, FOREACH, RETURN, START, CALL}",
      },
      {
        col: 17,
        line: 1,
        msg: "mismatched input '8' expecting {':', CYPHER, EXPLAIN, PROFILE, USING, CREATE, DROP, LOAD, WITH, OPTIONAL, MATCH, UNWIND, MERGE, SET, DETACH, DELETE, REMOVE, FOREACH, RETURN, START, CALL}",
      },
    ]);
  });
});
