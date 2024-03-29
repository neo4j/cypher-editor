/**
 * Cypher language support package using an antlr4 grammar
 *
 * @remarks
 *
 * This package provides cypher query parsing using an antlr4 grammar.
 *
 * It is mostly unchanged from the original implementation.
 *
 * It provides capabilities for cypher query syntax highlighting and
 * and autocompletion suggestions.
 *
 * @packageDocumentation
 */

/**
 * The editor support library has its own representation of editor positions
 */
export interface EditorSupportPosition {
  /**
   * The 1 based line number
   * The 0 based column number
   */
  line: number;
  column: number;
}

/**
 * EditorSupportCompletionItem
 */
export interface EditorSupportCompletionItem {
  type: CompletionType;
  view: string;
  content: string;
  postfix: null;
}

/**
 * A console command, these are typically prefixed with `:` like `:help`
 */
export interface ConsoleCommand {
  name: string;
  description?: string;
  commands?: ConsoleCommand[];
}

/**
 * A function provided by the graph database
 */
export interface FunctionSchema {
  name: string;
  signature: string;
}

/**
 * A procedure provided by the graph database
 */
export interface ProcedureSchema {
  name: string;
  signature: string;
  returnItems: FunctionSchema[];
}

/**
 * The editor support schema contains information about a graph database
 * that enables advanced autocompletion & syntax highlighting.
 */
export interface EditorSupportSchema {
  /**
   * The list of labels in the graph database
   */
  labels?: string[];
  /**
   * The list of relationship types in the graph database
   */
  relationshipTypes?: string[];
  /**
   * The list of property keys in the graph database
   */
  propertyKeys?: string[];
  /**
   * The list of functions provided the graph database
   */
  functions?: FunctionSchema[];
  /**
   * The list of procedures provided the graph database
   */
  procedures?: ProcedureSchema[];
  /**
   * The list of console commands
   */
  consoleCommands?: ConsoleCommand[];
  /**
   * The list of parameters
   */
  parameters?: string[];
}

/**
 * Instances of this class are used to encapsulate the parsed cypher tree for the antlr4 grammar
 */
export class CypherEditorSupport {
  constructor(input: string);
  getCompletion(
    line: number,
    column: number,
    doFilter?: boolean
  ): {
    from: EditorSupportPosition;
    to: EditorSupportPosition;
    items: EditorSupportCompletionItem[];
  };
  setSchema(schema: EditorSupportSchema): void;
  update(input: string): void;
}

/**
 * All autocomplete options have a CompletionType
 */
export type CompletionType =
  | "keyword"
  | "label"
  | "variable"
  | "parameter"
  | "propertyKey"
  | "relationshipType"
  | "function"
  | "procedure"
  | "consoleCommand"
  | "consoleCommandSubcommand"
  | "procedureOutput"
  | "noop";

import { Lexer } from "@neo4j-cypher/antlr4";
/**
 * The CypherLexer class generated by antlr4
 */
export class CypherLexer extends Lexer {
  constructor(input: string);
  channelNames: string[];
  modeNames: string[];
  literalNames: string[];
  symbolicNames: string[];
  ruleNames: string[];
  grammarFileName: string;
}

/**
 * Helper function to instanciate a CypherLexer
 */
declare function createCypherLexer(input: string): CypherLexer;

/**
 * Helper function to parse a cypher query
 */
declare function parse(input: string): {
  referencesListener: {
    queriesAndCommands: QueryOrCommand[];
  };
};
declare interface QueryOrCommand {
  getText: () => string;
  start: EditorSupportPosition;
  stop: EditorSupportPosition;
  cypherConsoleCommandName: () => { getText: () => string };
}
