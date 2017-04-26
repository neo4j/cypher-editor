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

describe('Reference Traverser - Variables', () => {
  it('returns reference for a single variable', () => {
    const b = new CypherEditorSupport('RETURN n');

    const refs = b.getReferences(1, 7);
    assert.deepEqual(refs.map(r => reduceElement(r)), [{
      rule: 'VariableContext',
      start: { line: 1, column: 7 },
      stop: { line: 1, column: 7 },
    }],
    );
  });

  it('returns references for a multiple variables', () => {
    const b = new CypherEditorSupport('MATCH (n)-[r]->(n) RETURN n');

    const refs = b.getReferences(1, 7);
    assert.deepEqual(refs.map(r => reduceElement(r)), [{
      rule: 'VariableContext',
      start: { line: 1, column: 7 },
      stop: { line: 1, column: 7 },
    }, {
      rule: 'VariableContext',
      start: { line: 1, column: 16 },
      stop: { line: 1, column: 16 },
    }, {
      rule: 'VariableContext',
      start: { line: 1, column: 26 },
      stop: { line: 1, column: 26 },
    }],
    );
  });

  it('returns references for a single query', () => {
    const b = new CypherEditorSupport('MATCH (n) RETURN n; MATCH (n) RETURN n');

    const refs = b.getReferences(1, 7);
    assert.deepEqual(refs.map(r => reduceElement(r)), [{
      rule: 'VariableContext',
      start: { line: 1, column: 7 },
      stop: { line: 1, column: 7 },
    }, {
      rule: 'VariableContext',
      start: { line: 1, column: 17 },
      stop: { line: 1, column: 17 },
    }],
    );
  });
});
