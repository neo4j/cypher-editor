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

describe('Reference Traverser - Relationships', () => {
  it('returns reference for relationship types', () => {
    const b = new CypherEditorSupport('MATCH ()-[:TYPE]-()');

    const refs = b.getReferences(1, 13);
    expect(refs.map(r => reduceElement(r))).to.deep.equal([
      {
        rule: 'RelTypeNameContext',
        start: {
          column: 11,
          line: 1,
        },
        stop: {
          column: 14,
          line: 1,
        },
        text: 'TYPE',
      },
    ],
    );
  });

  it('returns reference for multiple relationship types', () => {
    const b = new CypherEditorSupport('MATCH ()-[:TYPE]-() MATCH ()-[:TYPE]-()');

    const refs = b.getReferences(1, 13);
    expect(refs.map(r => reduceElement(r))).to.deep.equal([
      {
        rule: 'RelTypeNameContext',
        start: {
          column: 11,
          line: 1,
        },
        stop: {
          column: 14,
          line: 1,
        },
        text: 'TYPE',
      },
      {
        rule: 'RelTypeNameContext',
        start: {
          column: 31,
          line: 1,
        },
        stop: {
          column: 34,
          line: 1,
        },
        text: 'TYPE',
      },
    ]);
  });

  it('returns references for multiple queries', () => {
    const b = new CypherEditorSupport('MATCH ()-[:TYPE]-(); MATCH ()-[:TYPE]-()');

    const refs = b.getReferences(1, 13);
    expect(refs.map(r => reduceElement(r))).to.deep.equal([
      {
        rule: 'RelTypeNameContext',
        start: {
          column: 11,
          line: 1,
        },
        stop: {
          column: 14,
          line: 1,
        },
        text: 'TYPE',
      },
      {
        rule: 'RelTypeNameContext',
        start: {
          column: 32,
          line: 1,
        },
        stop: {
          column: 35,
          line: 1,
        },
        text: 'TYPE',
      },
    ]);
  });
});
