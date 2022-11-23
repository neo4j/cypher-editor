import antlr4 from "antlr4";
import {
  ReferencesProvider,
  CypherTypes,
  ErrorListener
} from "@neo4j-cypher/editor-support";
import { CypherParser, CypherLexer } from "@neo4j-cypher/antlr4-simple";
import { ReferencesListener } from "./ReferencesListener.simple";

export const extractStatements = (input) => {
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

  const referencesProviders = CypherTypes.SYMBOLIC_CONTEXTS.reduce(
    (acc, t) => ({
      ...acc,
      [t]: new ReferencesProvider(queries, indexes[t])
    }),
    {}
  );
  return { parseTree, referencesListener, errorListener, referencesProviders };
};
