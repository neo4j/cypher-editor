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

describe('Parser - Console commands', () => {
  it('should successfully parse simple command', () => {
    const b = new CypherEditorSupport(':play;');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse command with parameter', () => {
    const b = new CypherEditorSupport(':play 1 \'string\' true;');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse command and query', () => {
    const b = new CypherEditorSupport(':play "url"; match (n);');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse command with variable', () => {
    const b = new CypherEditorSupport(':play variable;');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse command with multiple variable', () => {
    const b = new CypherEditorSupport(':play variable anotherVariable;');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse command with map literal', () => {
    const b = new CypherEditorSupport(':play {hello: "world", key: true, pop: 125.45};');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse command with map literal and something else', () => {
    const b = new CypherEditorSupport(':play "http://link.com" {hello: "world", key: true, pop: 125.45};');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse command with dashes', () => {
    const b = new CypherEditorSupport(':play-this-now;');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse command with key value literal', () => {
    const b = new CypherEditorSupport(":config n: 'xxx';");
    assert.deepEqual(b.parseErrors, []);
  });

  it('should successfully parse command variable-with-dashes', () => {
    const b = new CypherEditorSupport(":config variable-with-dashes;");
    assert.deepEqual(b.parseErrors, []);
  });
});
