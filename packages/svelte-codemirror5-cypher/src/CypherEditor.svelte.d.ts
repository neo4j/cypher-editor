/// <reference types="svelte" />
import type { SvelteComponentTyped } from "svelte";

export interface CypherEditorProps {
  autocomplete?: boolean;
  autocompleteCloseOnBlur?: boolean;
  autocompleteSchema?: any;
  autocompleteTriggerStrings?: string[];
  history?: boolean;
  lineNumberFormatter?: any;
  lineNumbers?: boolean;
  lineWrapping?: boolean;
  lint?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  readOnlyCursor?: boolean;
  theme?: "light" | "dark";
  value?: string;
  className?: string;
  focusedClassName?: string;
  autofocus?: boolean;
  parseOnSetValue?: boolean;
}

export default class CypherEditor extends SvelteComponentTyped<
  CypherEditorProps,
  {},
  {}
> {}
