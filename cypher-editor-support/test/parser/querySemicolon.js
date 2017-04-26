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

describe('Parser - query semicolon', () => {
  it('should ignore missing semicolon at the end of last query', () => {
    const b = new CypherEditorSupport('RETURN 1');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should ignore missing semicolon at the end of last query (2)', () => {
    const b = new CypherEditorSupport('RETURN 1; RETURN 1');
    assert.deepEqual(b.parseErrors, []);
  });

  it('should ignore missing semicolon at the end of last query on new line', () => {
    const b = new CypherEditorSupport('RETURN 1\n');
    assert.deepEqual(b.parseErrors, []);
  });
});
