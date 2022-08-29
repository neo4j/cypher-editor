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

export function reduceElement(pt) {
  const e = {
    rule: pt.constructor.name,
    text: pt.getText(),
    start: {},
    stop: {},
  };

  const { start, stop } = pt;

  if (start != null) {
    e.start = {
      line: start.line,
      column: start.start,
    };
  }

  if (pt.stop != null) {
    e.stop = {
      line: stop.line,
      column: stop.stop,
    };
  }

  return e;
}

export function reduceTree(pt) {
  const e = { ...reduceElement(pt), children: [] };

  const children = pt.getChildCount();
  for (let i = 0; i < children; i += 1) {
    e.children.push(reduceTree(pt.getChild(i)));
  }

  return e;
}
