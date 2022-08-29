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

describe('Parser - Index', () => {
  it('should parse index creation on single property', () => {
    const b = new CypherEditorSupport('CREATE INDEX ON :Person(name)');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should parse index creation on compound property', () => {
    const b = new CypherEditorSupport('CREATE INDEX ON :Person(name, surname)');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should parse index drop on single property', () => {
    const b = new CypherEditorSupport('DROP INDEX ON :Person(name)');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should parse index drop on compound property', () => {
    const b = new CypherEditorSupport('DROP INDEX ON :Person(name, surname)');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should parse index hint on single property', () => {
    const b = new CypherEditorSupport('MATCH (f:Foo) USING INDEX f:Foo(bar)');
    expect(b.parseErrors).to.deep.equal([]);
  });

  it('should parse index hint on compound properties', () => {
    const b = new CypherEditorSupport('MATCH (f:Foo) USING INDEX f:Foo(bar,baz)');
    expect(b.parseErrors).to.deep.equal([]);
  });
});
