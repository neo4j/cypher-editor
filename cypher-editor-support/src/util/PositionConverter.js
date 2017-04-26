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

export class PositionConverter {
  newLines = [];

  constructor(input) {
    for (let i = 0; i < input.length; i++) {
      if (input[i] === '\n') {
        this.newLines.push(i);
      }
    }
  }

  toAbsolute(line, column) {
    return (this.newLines[line - 2] || -1) + column + 1;
  }

  toRelative(abs) {
    for (let i = this.newLines.length - 1; i >= 0; i--) {
      const column = abs - this.newLines[i];
      if (column >= 1) {
        return { line: i + 2, column: column - 1 };
      }
    }

    return { line: 1, column: abs };
  }
}
