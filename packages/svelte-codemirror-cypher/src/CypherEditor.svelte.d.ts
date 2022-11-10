/// <reference types="svelte" />
import type { SvelteComponentTyped } from "svelte";
import type { ChangeSet, Extension } from "@codemirror/state";
import type { EditorSupportSchema } from "cypher-editor-support";
// import type { EditorApi as BaseEditorApi } from "cypher-codemirror";
import type { EditorApi } from "cypher-codemirror";
import type {
  ScrollInfo,
  PositionObject,
  PositionAny,
  Theme,
  AutocompleteOption,
  AutofocusProp
} from "cypher-codemirror-base";

/**
 * AutocompleteSchema docs
 */
// export type AutocompleteSchema = EditorSupportSchema;
//  export interface AutocompleteSchema extends EditorSupportSchema {};

 /**
  * EditorApi docs
  */
// export type EditorApi = BaseEditorApi;
//  export interface EditorApi extends BaseEditorApi {};

// /**
//  * @property schema {@link cypher-editor-support.EditorSupportSchema }
//  * @property foo string
//  */
// export interface MyFooType {
//   schema?: EditorSupportSchema;
//   foo?: string;
// };
// // export type MyFooType = {
// //   /** that comment is ignored */
// //   schema:? string;
// // };

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
/**
 * Whether autocomplete is closed when the editor loses focus.
 *
 * @defaultValue `true`
 */
  autocompleteCloseOnBlur?: boolean;
/**
 * Whether the autocomplete window is open.
 * Changing this can be used to manually control the autocomplete open state.
 *
 * @defaultValue `false`
 */
  autocompleteOpen?: boolean;
// /**
//  * The autocomplete schema to use when showing autocomplete suggestions.
//  * 
//  * {@link cypher-editor-support.EditorSupportSchema } SCHEMA
//  * 
//  * @typeParam {@link cypher-editor-support.EditorSupportSchema }
//  * 
//  * @defaultValue `undefined`
//  */
/**
 * The autocomplete schema to use when showing autocomplete suggestions.
 * 
 * @defaultValue `undefined`
 */
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
  onValueChanged?: (value: string, changes: ChangeSet) => void;
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

  // TODO - add these props
  // preExtensions?: Extension[],
  // postExtensions?: Extension[]
};

/**
 * Cypher Editor Svelte Component
 */
export default class CypherEditor extends SvelteComponentTyped<
  CypherEditorProps,
  {},
  {}
> {};
