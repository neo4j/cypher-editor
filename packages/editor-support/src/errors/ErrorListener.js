import antlr4 from "antlr4-js-exports";

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
