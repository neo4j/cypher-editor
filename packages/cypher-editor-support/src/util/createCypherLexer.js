import antlr4 from 'antlr4';
import { CypherLexer } from '../_generated.simple/CypherLexer';

export const createCypherLexer = (input) => {
  const chars = new antlr4.InputStream(input);
  return new CypherLexer(chars);
};
