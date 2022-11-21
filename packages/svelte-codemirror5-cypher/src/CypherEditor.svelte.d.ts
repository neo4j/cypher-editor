/// <reference types="svelte" />
import type { SvelteComponentTyped } from "svelte";
import type { EditorChange } from "codemirror";
import type { EditorSupportSchema } from "cypher-editor-support";
import type {
  EditorApi,
  ScrollInfo,
  PositionObject,
  PositionAny,
  Theme,
  AutocompleteOption,
  AutofocusProp
} from "cypher-codemirror5";

/**
 * AutocompleteSchema docs
 */
// export interface AutocompleteSchema extends EditorSupportSchema {};

/**
 * EditorApi docs
 */
// export interface EditorApi extends BaseEditorApi {};

/**
 * Docs for CypherEditorProps.
 *
 * @example
 * Here's some example code using the props:
 *
 * ```ts
 * const props = { autocomplete: false };
 * <CypherEditor {...props} />
 * ```
 */
export interface CypherEditorProps {
  /**
   * Whether autocomplete is enabled.
   *
   * @defaultValue `true`
   */
  autocomplete?: boolean;
  autocompleteCloseOnBlur?: boolean;
  autocompleteOpen?: boolean;
  autocompleteSchema?: EditorSupportSchema;
  autocompleteTriggerStrings?: string[];
  autofocusProps?: AutofocusProp[];
  history?: boolean;
  lineNumberFormatter?: (lineNumber: number, lineCount: number) => string;
  lineNumbers?: boolean;
  lineWrapping?: boolean;
  lint?: boolean;
  placeholder?: string;
  position?: PositionAny;
  readOnly?: boolean;
  readOnlyCursor?: boolean;
  theme?: Theme;
  value?: string;
  className?: string;
  focusedClassName?: string;
  autofocus?: boolean;
  parseOnSetValue?: boolean;

  onEditorCreated?: (editor: EditorApi) => void;
  onValueChanged?: (value: string, changes: EditorChange) => void;
  onFocusChanged?: (focused: boolean) => void;
  onScrollChanged?: (scrollInfo: ScrollInfo) => void;
  onPositionChanged?: (position: PositionObject) => void;
  onAutocompleteChanged?: (
    open: boolean,
    from: number,
    options: AutocompleteOption[]
  ) => void;
  onLineNumberClick?: (lineNumber: number, event: Event) => void;
  onKeyDown?: (event: KeyboardEvent) => void;

  // TODO - add props for codemirror (cm5) options?
  // codemirrorOptions: any
}

/**
 * Cypher Editor Svelte Component
 */
export default class CypherEditor extends SvelteComponentTyped<
  CypherEditorProps,
  {},
  {}
> {}
