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

import { PositionConverter } from '../src/util/PositionConverter';

describe('PositionConverter', () => {
  it('calculates absolute of zero pos', () => {
    const conv = new PositionConverter('a\nb');
    assert.deepEqual(conv.toAbsolute(1, 0), 0);
  });

  it('calculates absolute of first letter on second line', () => {
    const conv = new PositionConverter('a\nb');
    assert.deepEqual(conv.toAbsolute(2, 0), 2);
  });

  it('calculates absolute position', () => {
    const conv = new PositionConverter('a\nbc');
    assert.deepEqual(conv.toAbsolute(2, 1), 3);
  });

  it('calculates absolute position of newline', () => {
    const conv = new PositionConverter('a\nbc');
    assert.deepEqual(conv.toAbsolute(1, 1), 1);
  });

  it('calculates relative of zero pos', () => {
    const conv = new PositionConverter('a\nb');
    assert.deepEqual(conv.toRelative(0), { line: 1, column: 0 });
  });

  it('calculates relative position for end of line', () => {
    const conv = new PositionConverter('a\nbc');
    assert.deepEqual(conv.toRelative(1), { line: 1, column: 1 });
  });

  it('calculates relative position of second lines first char', () => {
    const conv = new PositionConverter('a\nbc');
    assert.deepEqual(conv.toRelative(2), { line: 2, column: 0 });
  });

  it('calculates relative position of second lines second char', () => {
    const conv = new PositionConverter('a\nbc');
    assert.deepEqual(conv.toRelative(3), { line: 2, column: 1 });
  });
});
