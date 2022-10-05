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

  // TODO - add types for pre/post extension props?
}

export default class CypherEditor extends SvelteComponentTyped<
  CypherEditorProps,
  {},
  {}
> {}
