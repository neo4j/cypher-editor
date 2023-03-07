/**
 * Parses a cypher query and returns the statements.
 *
 * @param input the cypher query to parse
 */
declare function extractStatements(input: string): {
  referencesListener: {
    statements: [{ raw: () => Record<string, unknown>[] }];
  };
};
