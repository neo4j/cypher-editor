import antlr4 from 'antlr4';
import { CypherParser } from '../_generated/CypherParser';
import { CypherLexer } from '../_generated/CypherLexer';
import { ErrorListener } from '../errors/ErrorListener';
import { ReferencesListener } from '../references/ReferencesListener';

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
  return { parseTree, referencesListener, errorListener };
};
