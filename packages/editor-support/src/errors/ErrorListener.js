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

import antlr4 from "antlr4";

export class ErrorListener extends antlr4.error.ErrorListener {
  errors = [];

  // eslint-disable-next-line no-unused-vars
  syntaxError(rec, sym, line, col, msg, e) {
    const { start, stop } = sym || {};
    if (msg === "mismatched input '<EOF>' expecting {';', SP}") {
      // suppress error about missing semicolon at the end of a query
      return;
    }
    if (msg === "missing ';' at '<EOF>'") {
      return;
    }
    if (
      msg ===
      "mismatched input '<EOF>' expecting {':', CYPHER, EXPLAIN, PROFILE, USING, CREATE, DROP, LOAD, WITH, OPTIONAL, MATCH, UNWIND, MERGE, SET, DETACH, DELETE, REMOVE, FOREACH, RETURN, START, CALL}"
    ) {
      return;
    }
    this.errors.push({ line, col, msg, start, stop });
  }
}
