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

import antlr4 from "@neo4j-cypher/antlr4-browser";
import { ReferencesProvider } from "../references/ReferencesProvider";
import * as CypherTypes from "../lang/CypherTypes";
import { CypherParser, CypherLexer } from "@neo4j-cypher/antlr4";
import { ErrorListener } from "../errors/ErrorListener";
import { ReferencesListener } from "../references/ReferencesListener";

export const parse = (input) => {
  const referencesListener = new ReferencesListener();
  const errorListener = new ErrorListener();
  const chars = new antlr4.InputStream(input);
  const lexer = new CypherLexer(chars);
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorListener);
  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new CypherParser(tokens);
  parser.buildParseTrees = true;
  parser.removeErrorListeners();
  parser.addErrorListener(errorListener);
  parser.addParseListener(referencesListener);
  const parseTree = parser.cypher();
  const { queries, indexes } = referencesListener;

  const referencesProviders = new Map();
  CypherTypes.SYMBOLIC_CONTEXTS.forEach(
    (sc) => {
      referencesProviders.set(sc, new ReferencesProvider(queries, indexes.get(sc)));
    }
  );

  return { parseTree, referencesListener, errorListener, referencesProviders };
};
