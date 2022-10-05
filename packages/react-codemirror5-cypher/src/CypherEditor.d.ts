import * as React from "react";

export interface CypherEditorProps {
  autocomplete?: boolean;
  autocompleteCloseOnBlur?: boolean;
  autocompleteOpen?: boolean;
  autocompleteSchema?: any;
  autocompleteTriggerStrings?: string[];
  history?: boolean;
  lineNumberFormatter?: any;
  lineNumbers?: boolean;
  lineWrapping?: boolean;
  lint?: boolean;
  placeholder?: string;
  position?: number | { line: number; column: number };
  readOnly?: boolean;
  readOnlyCursor?: boolean;
  theme?: "light" | "dark";
  value?: string;
  className?: string;
  focusedClassName?: string;
  autofocus?: boolean;
  parseOnSetValue?: boolean;

  // TODO - add types for codemirror (cm5) options?
}

declare class CypherEditor extends React.Component<CypherEditorProps, any> {}

export default CypherEditor;
