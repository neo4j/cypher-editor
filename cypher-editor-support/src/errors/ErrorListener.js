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

import antlr4 from 'antlr4';

export class ErrorListener extends antlr4.error.ErrorListener {
  errors = [];

  // eslint-disable-next-line no-unused-vars
  syntaxError(rec, sym, line, col, msg, e) {
    if (msg === "mismatched input '<EOF>' expecting {';', SP}") {
        // suppress error about missing semicolon at the end of a query
      return;
    }
    if (msg === "missing ';' at '<EOF>'") {
      return;
    }
    if (msg === "mismatched input '<EOF>' expecting {CYPHER, EXPLAIN, PROFILE, USING, PERIODIC, COMMIT, UNION, ALL, CREATE, DROP, INDEX, ON, CONSTRAINT, ASSERT, IS, UNIQUE, EXISTS, LOAD, CSV, WITH, HEADERS, FROM, AS, FIELDTERMINATOR, OPTIONAL, MATCH, UNWIND, MERGE, SET, DETACH, DELETE, REMOVE, FOREACH, IN, DISTINCT, RETURN, ORDER, BY, L_SKIP, LIMIT, ASCENDING, ASC, DESCENDING, DESC, JOIN, SCAN, START, NODE, RELATIONSHIP, REL, WHERE, SHORTESTPATH, ALLSHORTESTPATHS, OR, XOR, AND, NOT, STARTS, ENDS, CONTAINS, NULL, COUNT, FILTER, EXTRACT, ANY, NONE, SINGLE, TRUE, FALSE, REDUCE, CASE, ELSE, END, WHEN, THEN, CALL, YIELD, KEY, HexLetter, UnescapedSymbolicName, EscapedSymbolicName}") {
      return;
    }
    this.errors.push({ line, col, msg });
  }
}

