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
import { reduceElement } from '../util';

describe('Reference Traverser - Property keys', () => {
  it('returns reference for a single key', () => {
    const b = new CypherEditorSupport('RETURN n.key');

    const refs = b.getReferences(1, 10);
    expect(refs.map(r => reduceElement(r))).to.deep.equal([
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 9,
          line: 1,
        },
        stop: {
          column: 11,
          line: 1,
        },
        text: 'key',
      },
    ]);
  });

  it('returns reference for multiple keys', () => {
    const b = new CypherEditorSupport('MATCH (n {key: 42}) SET n.key = 4 RETURN n.key;');

    const refs = b.getReferences(1, 10);
    expect(refs.map(r => reduceElement(r))).to.deep.equal([
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 10,
          line: 1,
        },
        stop: {
          column: 12,
          line: 1,
        },
        text: 'key',
      },
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 26,
          line: 1,
        },
        stop: {
          column: 28,
          line: 1,
        },
        text: 'key',
      },
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 43,
          line: 1,
        },
        stop: {
          column: 45,
          line: 1,
        },
        text: 'key',
      },
    ]);
  });

  it('returns references for multiple queries', () => {
    const b = new CypherEditorSupport(`MATCH (n {key: 42})
          SET n.key = 42
          RETURN n.key;
          MATCH (n {key: 42})
          SET n.key = 42
          RETURN n.key`);

    const refs = b.getReferences(1, 10);
    expect(refs.map(r => reduceElement(r))).to.deep.equal([
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 10,
          line: 1,
        },
        stop: {
          column: 12,
          line: 1,
        },
        text: 'key',
      },
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 36,
          line: 2,
        },
        stop: {
          column: 38,
          line: 2,
        },
        text: 'key',
      },
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 64,
          line: 3,
        },
        stop: {
          column: 66,
          line: 3,
        },
        text: 'key',
      },
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 89,
          line: 4,
        },
        stop: {
          column: 91,
          line: 4,
        },
        text: 'key',
      },
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 115,
          line: 5,
        },
        stop: {
          column: 117,
          line: 5,
        },
        text: 'key',
      },
      {
        rule: 'PropertyKeyNameContext',
        start: {
          column: 143,
          line: 6,
        },
        stop: {
          column: 145,
          line: 6,
        },
        text: 'key',
      },
    ]);
  });
});
