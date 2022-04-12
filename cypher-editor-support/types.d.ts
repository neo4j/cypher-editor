import { Lexer } from "antlr4";

declare interface EditorSupportPosition {
  line: number;
  column: number;
}

declare interface EditorSupportCompletionItem {
  type: string;
  view: string;
  content: string;
  postfix: null;
}

declare interface ConsoleCommand {
  name: string;
  description?: string;
  commands?: ConsoleCommand[];
}

declare interface FunctionSchema {
  name: string;
  signature: string;
}

declare interface ProcedureSchema {
  name: string;
  signature: string;
  returnItems: FunctionSchema[];
}

declare interface EditorSupportSchema {
  labels?: string[];
  relationshipTypes?: string[];
  propertyKeys?: string[];
  functions?: FunctionSchema[];
  procedures?: ProcedureSchema[];
  consoleCommands?: ConsoleCommand[];
  parameters?: string[];
}

declare class CypherEditorSupport {
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
  constructor(input: string);
}
declare interface CypherPosition {
  column: number;
  line: number;
}
declare interface QueryOrCommand {
  getText: () => string;
  start: CypherPosition;
  stop: CypherPosition;
}
declare function parse(input: string): {
  referencesListener: {
    queriesAndCommands: QueryOrCommand[];
  };
};
declare function extractStatements(input: string): {
  referencesListener: {
    statements: [{ raw: () => Record<string, unknown>[] }];
  };
};

export class CypherLexer extends Lexer {
  constructor(input: string);
  channelNames: string[];
  modeNames: string[];
  literalNames: string[];
  symbolicNames: string[];
  ruleNames: string[];
  grammarFileName: string;
}

declare function createCypherLexer(input: string): CypherLexer;

export {
  EditorSupportPosition,
  EditorSupportCompletionItem,
  ConsoleCommand,
  FunctionSchema,
  ProcedureSchema,
  EditorSupportSchema,
  CypherEditorSupport,
  CypherPosition,
  QueryOrCommand,
  parse,
  extractStatements,
  createCypherLexer,
};
