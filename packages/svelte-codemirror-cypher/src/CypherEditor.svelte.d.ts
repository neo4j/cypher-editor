/// <reference types="svelte" />
import type { SvelteComponentTyped } from "svelte";
// import type { Extension } from "@codemirror/state";
import type { EditorSupportSchema } from "cypher-editor-support";
import type {
  PositionAny,
  Theme,
  AutofocusProp,
  EditorCreatedListener,
  AutocompleteChangedListener,
  PositionChangedListener,
  FocusChangedListener,
  ScrollChangedListener,
  ValueChangedListener,
  KeyDownListener,
  LineNumberClickListener,
  LineNumberFormatter
} from "cypher-codemirror";

/**
 * This package exports a Svelte Cypher Editor component
 * 
 * @remarks
 * 
 * The props for this component are defined by the {@link svelte-codemirro-cypher#CypherEditorProps | CypherEditorProps} interface
 * 
 * @example
 * Here's some example code using the props:
 *
 * ```ts
 * const props = { autocomplete: false };
 * <CypherEditor {...props} />
 * ```
 * @packageDocumentation
 */

/**
 * Interface for Svelte Cypher Editor component props
 */
export interface CypherEditorProps {
  /**
   * Whether the autocomplete feature is enabled
   *
   * @defaultValue `true`
   */
  autocomplete?: boolean;
  /**
   * Whether the autocomplete auto closes whenever the editor loses focus
   *
   * @defaultValue `true`
   */
  autocompleteCloseOnBlur?: boolean;
  /**
   * Whether the autocomplete window is open
   * 
   * @remarks
   * 
   * Changing this can be used to manually control the autocomplete open state
   *
   * @defaultValue `false`
   */
  autocompleteOpen?: boolean;
  /**
   * The schema to use when showing autocomplete suggestions (and syntax highlighting)
   *
   * @defaultValue `undefined`
   */
  autocompleteSchema?: EditorSupportSchema;
  /**
   * The keys that when typed will automatically open the autocomplete menu
   *
   * @defaultValue [".",":","[]","()","{}","[","(","{","$"]
   */
  autocompleteTriggerStrings?: string[];
  /**
   * Whether the editor should be auto focused on first creation
   *
   * @defaultValue true
   */
  autofocus?: boolean;
  /**
   * setting any of these props will trigger the editor gaining focus
   *
   * @defaultValue ["position", "readOnly", "value"]
   */
  autofocusProps?: AutofocusProp[];
  /**
   * Whether the editor maintains an undo/redo history
   *
   * @defaultValue true
   */
  history?: boolean;
  /**
   * The formatter for the line numbers of the editor
   *
   * @defaultValue (line, lineCount) => lineCount === 1 ? "$" : line + "";
   */
  lineNumberFormatter?: LineNumberFormatter;
  /**
   * Whether line numbers are shown to the left of the editor ui
   *
   * @defaultValue true
   */
  lineNumbers?: boolean;
  /**
   * Whether the editor wraps lines vs using a horizontal scrollbar
   *
   * @defaultValue false
   */
  lineWrapping?: boolean;
  /**
   * Whether the editor should display lint errors to the user
   *
   * @defaultValue true
   */
  lint?: boolean;
  /**
   * Whether to run the cypher language parser immediately after every call to set the value
   *
   * @defaultValue true
   */
  parseOnSetValue?: boolean;
  /**
   * The text to be shown to the user when the editor value is empty
   *
   * @defaultValue undefined
   */
  placeholder?: string;
  /**
   * The editor cursor position
   *
   * @defaultValue undefined
   */
  position?: PositionAny;
  /**
   * Whether the editor is read only or the user can edit the editor's value
   *
   * @defaultValue false
   */
  readOnly?: boolean;
  /**
   * Whether to show the cursor when the editor readOnly is true
   *
   * @defaultValue false
   */
  readOnlyCursor?: boolean;
  /**
   * Whether to use the light or dark theme for the editor
   *
   * @defaultValue "light"
   */
  theme?: Theme;
  /**
   * The editor text value
   *
   * @defaultValue ""
   */
  value?: string;
  /**
   * A css class name to be added to the root editor dom element
   *
   * @defaultValue undefined
   */
  className?: string;
  /**
   * A css class name to be added to the root editor dom element when it is focused
   *
   * @defaultValue undefined
   */
  focusedClassName?: string;
  
  /**
   * A listener for when the editor api gets created
   */
  onEditorCreated?: EditorCreatedListener;
  /**
   * A listener for when the editor value changes
   */
  onValueChanged?: ValueChangedListener;
  /**
   * A listener for when the editor focus changes
   */
  onFocusChanged?: FocusChangedListener;
  /**
   * A listener for when the editor scroll position changes
   */
  onScrollChanged?: ScrollChangedListener;
  /**
   * A listener for when the editor cursor position changes
   */
  onPositionChanged?: PositionChangedListener;
  /**
   * A listener for when the editor autocompletion state changes
   */
  onAutocompleteChanged?: AutocompleteChangedListener;
  /**
   * A listener for when the user clicks an editor line number
   */
  onLineNumberClick?: LineNumberClickListener;
  /**
   * A listener for when the user presses a key down in the editor
   */
  onKeyDown?: KeyDownListener;

  // TODO - add these props
  // preExtensions?: Extension[],
  // postExtensions?: Extension[]
}

/**
 * Cypher Editor Svelte Component
 */
export default class CypherEditor extends SvelteComponentTyped<
  CypherEditorProps,
  {},
  {}
> {}
