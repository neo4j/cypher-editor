/**
 * EditorSupportPosition
 */
export interface EditorSupportPosition {
  line: number;
  column: number;
}

/**
 * EditorSupportCompletionItem
 */
export interface EditorSupportCompletionItem {
  type: string;
  view: string;
  content: string;
  postfix: null;
}

export interface ConsoleCommand {
  name: string;
  description?: string;
  commands?: ConsoleCommand[];
}

export interface FunctionSchema {
  name: string;
  signature: string;
}

export interface ProcedureSchema {
  name: string;
  signature: string;
  returnItems: FunctionSchema[];
}

/**
 * Editor Support Autocomplete Schema
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
  propertyKeys?: string[];
  functions?: FunctionSchema[];
  procedures?: ProcedureSchema[];
  consoleCommands?: ConsoleCommand[];
  parameters?: string[];
}

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
