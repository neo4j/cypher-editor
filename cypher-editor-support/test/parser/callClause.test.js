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

describe('Parser - Call clause', () => {
  it('should successfully parse call with arguments', () => {
    const b = new CypherEditorSupport('CALL procedure()');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should successfully parse call without arguments', () => {
    const b = new CypherEditorSupport('CALL procedure');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should successfully parse call with where after yield', () => {
    const b = new CypherEditorSupport('CALL procedure() YIELD name WHERE true RETURN name;');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should successfully past call where string contains cypher', () => {
    const b = new CypherEditorSupport('CALL foo.bar("RETURN 1")');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should successfully past call where string contains cypher with new lines', () => {
    const b = new CypherEditorSupport('CALL foo.bar("MATCH (n) \nRETURN n")');
    expect(b.parseErrors).to.deep.equal([]);
  });
});
