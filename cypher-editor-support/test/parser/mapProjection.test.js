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

import assert from 'assert';
import { CypherEditorSupport } from '../../src/CypherEditorSupport';

describe('Parser - map projections', () => {
  it('should successfully parse map projections with all property selector', () => {
    const b = new CypherEditorSupport('RETURN person { .* };');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse map projections with property selector', () => {
    const b = new CypherEditorSupport('RETURN person { .name };');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse map projections with literal entry and map projection inside', () => {
    const b = new CypherEditorSupport('RETURN person { someProp: collect(moreProps { .variable1, .variable2 })};');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse map projections with literal entry', () => {
    const b = new CypherEditorSupport('RETURN person { someProp: collect(expression)};');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse map projections with a variable', () => {
    const b = new CypherEditorSupport('RETURN person { person };');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse map projections with a variable without spaces', () => {
    const b = new CypherEditorSupport('RETURN person{person};');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse map projections with a variable without spaces', () => {
    const b = new CypherEditorSupport('RETURN person{ person, .person, something: expression(), .*};');
    assert.deepEqual(b.parseErrors, []);
  });
});
