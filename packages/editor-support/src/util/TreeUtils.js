/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
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

export class TreeUtils {
  static findParent(pt, type) {
    let el = pt;
    while (true) {
      // eslint-disable-line no-constant-condition
      if (el == null) {
        return null;
      }
      if (el.constructor.name === type) {
        return el;
      }
      el = el.parentCtx;
    }
  }

  static findAnyParent(pt, types = []) {
    let el = pt;
    while (true) {
      // eslint-disable-line no-constant-condition
      if (el == null) {
        return null;
      }
      if (types.indexOf(el.constructor.name) > -1) {
        return el;
      }
      el = el.parentCtx;
    }
  }

  static findChild(element, type) {
    if (element == null) {
      return null;
    }

    if (element.constructor.name === type) {
      return element;
    }

    if (element.children != null) {
      for (let i = 0; i < element.children.length; i += 1) {
        const e = element.children[i];
        const result = TreeUtils.findChild(e, type);
        if (result != null) {
          return result;
        }
      }
    }

    return null;
  }

  static getPosition(el) {
    if (el != null) {
      const { start, stop, symbol } = el;
      if (symbol != null) {
        return {
          start: symbol.start,
          stop: symbol.stop
        };
      } else if (start != null && stop != null) {
        return {
          start: start.start,
          stop: stop.stop
        };
      }
    }

    return null;
  }

  static hasErrorNode(element) {
    if (element == null) {
      return false;
    }

    if (element.isErrorNode && element.isErrorNode()) {
      return true;
    }

    if (element.children != null) {
      for (let i = 0; i < element.children.length; i += 1) {
        const e = element.children[i];
        const childHasErrorNode = TreeUtils.hasErrorNode(e);
        if (childHasErrorNode) {
          return true;
        }
      }
    }

    return false;
  }
}
