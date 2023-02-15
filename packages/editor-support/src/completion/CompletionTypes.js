export const KEYWORD = "keyword";
export const LABEL = "label";
export const VARIABLE = "variable";
export const PARAMETER = "parameter";
export const PROPERTY_KEY = "propertyKey";
export const RELATIONSHIP_TYPE = "relationshipType";
export const FUNCTION_NAME = "function";
export const PROCEDURE_NAME = "procedure";
export const CONSOLE_COMMAND_NAME = "consoleCommand";
export const CONSOLE_COMMAND_SUBCOMMAND = "consoleCommandSubcommand";
export const PROCEDURE_OUTPUT = "procedureOutput";

// Return no autocompletion
export const NOOP = "noop";

// Default
export const ALL = [
  VARIABLE,
  PARAMETER,
  PROPERTY_KEY,
  FUNCTION_NAME,
  KEYWORD
].map((type) => ({ type }));
