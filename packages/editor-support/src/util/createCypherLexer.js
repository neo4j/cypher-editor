import antrl4 from "@neo4j-cypher/antlr4-browser";
import { CypherLexer } from "@neo4j-cypher/antlr4";

export const createCypherLexer = (input) => {
  const chars = new antrl4.InputStream(input);
  return new CypherLexer(chars);
};
