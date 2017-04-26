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
import { reduceElement } from '../util';

describe('Reference Traverser - Property keys', () => {
  it('returns reference for a single key', () => {
    const b = new CypherEditorSupport('RETURN n.key');

    const refs = b.getReferences(1, 10);
    assert.deepEqual(refs.map(r => reduceElement(r)), [{
      rule: 'PropertyKeyNameContext',
      start: { line: 1, column: 9 },
      stop: { line: 1, column: 11 },
    }],
    );
  });

  it('returns reference for multiple keys', () => {
    const b = new CypherEditorSupport('MATCH (n {key: 42}) SET n.key = 4 RETURN n.key;');

    const refs = b.getReferences(1, 10);
    assert.deepEqual(refs.map(r => reduceElement(r)), [{
      rule: 'PropertyKeyNameContext',
      start: { line: 1, column: 10 },
      stop: { line: 1, column: 12 },
    }, {
      rule: 'PropertyKeyNameContext',
      start: { line: 1, column: 26 },
      stop: { line: 1, column: 28 },
    }, {
      rule: 'PropertyKeyNameContext',
      start: { line: 1, column: 43 },
      stop: { line: 1, column: 45 },
    }],
    );
  });

  it('returns references for multiple queries', () => {
    const b = new CypherEditorSupport(`MATCH (n {key: 42})
          SET n.key = 42
          RETURN n.key;
          MATCH (n {key: 42})
          SET n.key = 42
          RETURN n.key`);

    const refs = b.getReferences(1, 10);
    assert.deepEqual(refs.map(r => reduceElement(r)), [{
      rule: 'PropertyKeyNameContext',
      start: { line: 1, column: 10 },
      stop: { line: 1, column: 12 },
    }, {
      rule: 'PropertyKeyNameContext',
      start: { line: 2, column: 36 },
      stop: { line: 2, column: 38 },
    }, {
      rule: 'PropertyKeyNameContext',
      start: { line: 3, column: 64 },
      stop: { line: 3, column: 66 },
    }, {
      rule: 'PropertyKeyNameContext',
      start: { line: 4, column: 89 },
      stop: { line: 4, column: 91 },
    }, {
      rule: 'PropertyKeyNameContext',
      start: { line: 5, column: 115 },
      stop: { line: 5, column: 117 },
    }, {
      rule: 'PropertyKeyNameContext',
      start: { line: 6, column: 143 },
      stop: { line: 6, column: 145 },
    }],
    );
  });
});
