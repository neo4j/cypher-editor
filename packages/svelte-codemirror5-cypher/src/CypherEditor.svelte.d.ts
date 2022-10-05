/// <reference types="svelte" />
import type { SvelteComponentTyped } from "svelte";

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

  onEditorCreated?: (editor: any) => void;
  onValueChanged?: (value: string, changes: any) => void;
  onFocusChanged?: (focused: boolean) => void;
  onScrollChanged?: (scrollInfo: any) => void;
  onPositionChanged?: (position: {
    line: number;
    column: number;
    position: number;
  }) => void;
  onAutocompleteChanged?: (open: boolean, from: number, options: [any]) => void;
  onLineNumberClick?: (lineNumber: number, event: any) => void;
  onKeyDown?: (event: KeyboardEvent) => void;

  // TODO - add types for codemirror (cm5) options?
}

export default class CypherEditor extends SvelteComponentTyped<
  CypherEditorProps,
  {},
  {}
> {}
