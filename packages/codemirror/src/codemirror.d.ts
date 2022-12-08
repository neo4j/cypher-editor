/**
 * Adds support for the cypher query language to Codemirror version 6
 *
 * @remarks
 *
 * This package provides a factory function for constructing an
 * {@link codemirror#EditorApi | EditorApi} instance which
 * wraps a Codemirror 6 instance with cypher language capabilities.
 *
 * @packageDocumentation
 */

import type { ChangeSet, Extension } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";

import type {
  EditorSupportSchema,
  CypherEditorSupport,
  CompletionType
} from "@neo4j-cypher/editor-support";

/**
 * Partial editor cursor position with line & column only
 */
export interface PartialPositionObject {
  /**
   * The 1 based line number of the cursor position
   */
  line: number;
  /**
   * The 1 based column number of the cursor position
   */
  column: number;
}

/**
 * Full editor cursor position with line, column & position
 */
export interface PositionObject {
  /**
   * The 1 based line number of the cursor position
   */
  line: number;
  /**
   * The 1 based column number of the cursor position
   */
  column: number;
  /**
   * The 0 based absolute position number of the cursor position
   */
  position: number;
}

/**
 * Any supported editor cursor position
 */
export type PositionAny = PositionObject | PartialPositionObject | number;

/**
 * The current editor theme
 */
export type Theme = "light" | "dark";

/**
 * The prop keys that can be used with autofocusProps
 */
export type AutofocusProp = "position" | "readOnly" | "value";

/**
 * Information about an autocomplete option that was suggested to the user
 */
export interface AutocompleteOption {
  /**
   * The label of the autocomplete option in the list of options
   */
  label: string;
  /**
   * More detailed information about the autocomplete option
   */
  detail?: string;
  /**
   * The type of the autocomplete option
   */
  type?: CompletionType;
}

/**
 * Information about the editor scroll position
 */
export interface ScrollInfo {
  /**
   * The scrollTop position of the editor scroll dom element
   */
  scrollTop: number;
  /**
   * The clientHeight position of the editor scroll dom element
   */
  clientHeight: number;
  /**
   * The scrollHeight position of the editor scroll dom element
   */
  scrollHeight: number;
  /**
   * The scrollLeft position of the editor scroll dom element
   */
  scrollLeft: number;
  /**
   * The clientWidth position of the editor scroll dom element
   */
  clientWidth: number;
  /**
   * The scrollWidth position of the editor scroll dom element
   */
  scrollWidth: number;
}

/**
 * Listener for editor creation
 */
export interface EditorCreatedListener {
  /**
   * @param editor - The created editor api instance
   */
  (editor: EditorApi): void;
}

/**
 * Listener for editor autocomplete changes
 */
export interface AutocompleteChangedListener {
  /**
   * @param open - whether the autocomplete menu is open or not
   * @param from - the start cursor position for the suggested options
   * @param options - the list of autocomplete options being suggested to the user
   */
  (open: boolean, from?: number, options?: AutocompleteOption[]): void;
}

/**
 * Listener for editor cursor position changes
 */
export interface PositionChangedListener {
  /**
   * @param position - the new editor cursor position
   */
  (position: PositionObject): void;
}

/**
 * Listener for editor focus changes
 */
export interface FocusChangedListener {
  /**
   * @param focused - whether the editor was focused or not
   */
  (focused: boolean): void;
}

/**
 * Listener for editor scroll position changes
 */
export interface ScrollChangedListener {
  /**
   * @param scrollInfo - the new editor scroll position info
   */
  (scrollInfo: ScrollInfo): void;
}

/**
 * Listener for editor value changes
 */
export interface ValueChangedListener {
  /**
   * @param value - the new cypher query text value
   * @param changes - the codemirror 6 ChangeSet object representing what changed
   */
  (value: string, changes: ChangeSet): void;
}

/**
 * Listener for editor key down events
 */
export interface KeyDownListener {
  /**
   * @param event - the native keyboard event
   */
  (event: KeyboardEvent): void;
}

/**
 * Listener for editor line number click events
 */
export interface LineNumberClickListener {
  /**
   * @param lineNumber - the 1 based line number that was clicked
   * @param event - the native event
   */
  (lineNumber: number, event: Event): void;
}

/**
 * Formats a line number for display beside the editor text
 */
export interface LineNumberFormatter {
  /**
   * @param lineNumber - the current line number
   * @param lineCount - the number of lines in the editor text
   */
  (lineNumber: number, lineCount: number): string;
}

/**
 * This is the EditorApi interface which wraps all of the interaction with the cypher editor
 *
 * @remarks
 *
 * An instance of this interface is returned by the {@link codemirror#createCypherEditor | createCypherEditor} function
 */
export interface EditorApi {
  /**
   * Clears the undo/redo history of the editor
   */
  clearHistory(): void;
  /**
   * Cleanup function that can be used to safely dispose of the editor
   */
  destroy(): void;
  /**
   * Brings the browser focus to the editor
   */
  focus(): void;
  /**
   * Get the number of lines in the current editor value
   */
  getLineCount(): number;
  /**
   * Get the current editor cursor position
   */
  getPosition(): PositionObject;
  /**
   * Get a full position object for any supported position value or null if position value is invalid
   */
  getPositionForValue(positionValue: PositionAny): PositionObject | null;
  /**
   * Select the autocomplete option with the given index, causing it to be applied to the editor value
   */
  selectAutocompleteOption(autocompleteOptionIndex: number): void;
  /**
   * Set whether or not the autocomplete feature is enabled
   */
  setAutocomplete(autocomplete?: boolean): void;
  /**
   * Set whether or not the autocomplete auto closes whenever the editor loses focus
   */
  setAutocompleteCloseOnBlur(autocompleteCloseOnBlur?: boolean): void;
  /**
   * Set whether or not the autocomplete menu is shown to the user
   */
  setAutocompleteOpen(autocompleteOpen?: boolean): void;
  /**
   * Set the keys that when typed will automatically open the autocomplete menu
   */
  setAutocompleteTriggerStrings(autocompleteTriggerStrings?: string[]): void;
  /**
   * Set whether or not the editor maintains an undo/redo history
   */
  setHistory(history?: boolean): void;
  /**
   * Set whether pressing the tab key affects editor indentation
   */
  setIndentWithTab(indentWithTab?: boolean): void;
  /**
   * Set the formatter for the line numbers of the editor
   */
  setLineNumberFormatter(
    lineNumberFormatter?: (lineNumber: number, lineCount: number) => string
  ): void;
  /**
   * Set whether or not line numbers are shown to the left of the editor ui
   */
  setLineNumbers(lineNumbers?: boolean): void;
  /**
   * Set whether or not the editor wraps lines vs using a horizontal scrollbar
   */
  setLineWrapping(lineWrapping?: boolean): void;
  /**
   * Set whether or not the editor should display lint errors to the user
   */
  setLint(lint?: boolean): void;
  /**
   * Set the text to be shown to the user when the editor value is empty
   */
  setPlaceholder(placeholder?: string | undefined): void;
  /**
   * Set the current editor cursor position
   */
  setPosition(position?: PositionAny): void;
  /**
   * Set whether the editor is read only or the user can edit the editor's value
   */
  setReadOnly(readOnly?: boolean): void;
  /**
   * Set whether to show the cursor when the editor readOnly is true
   */
  setReadOnlyCursor(readOnlyCursor?: boolean): void;
  /**
   * Set the schema making the editor aware of things such as node labels & relationship types & procedures in the current graph database
   */
  setSchema(schema?: EditorSupportSchema): void;
  /**
   * Set whether to use the light or dark theme for the editor
   */
  setTheme(theme?: Theme): void;
  /**
   * Set whether or not the tooltips use simple absolute position styling (vs fixed and trying to stay within bounds)
   */
  setTooltipAbsolute(tooltipAbsolute?: boolean): void;
  /**
   * Set the editor value
   *
   * @param value - The new editor value
   * @param parseOnSetValue - Whether to update the language parser tree immediately for the new value (defaults to true)
   */
  setValue(value?: string, parseOnSetValue?: boolean): void;

  /**
   * Add an event listener for editor autocomplete changes
   *
   * @returns A cleanup function that when called removes the listener
   */
  onAutocompleteChanged(listener: AutocompleteChangedListener): () => void;
  /**
   * remove an event listener for editor autocomplete changes
   */
  offAutocompleteChanged(listener: AutocompleteChangedListener): void;
  /**
   * Add an event listener for editor focus changes
   *
   * @returns A cleanup function that when called removes the listener
   */
  onFocusChanged(listener: FocusChangedListener): () => void;
  /**
   * remove an event listener for editor focus changes
   */
  offFocusChanged(listener: FocusChangedListener): void;
  /**
   * Add an event listener for editor key down events
   *
   * @returns A cleanup function that when called removes the listener
   */
  onKeyDown(listener: KeyDownListener): () => void;
  /**
   * remove an event listener for editor key down events
   */
  offKeyDown(listener: KeyDownListener): void;
  /**
   * Add an event listener for editor line number click events
   *
   * @returns A cleanup function that when called removes the listener
   */
  onLineNumberClick(listener: LineNumberClickListener): () => void;
  /**
   * remove an event listener for editor line number click events
   */
  offLineNumberClick(listener: LineNumberClickListener): void;
  /**
   * Add an event listener for editor cursor position changes
   *
   * @returns A cleanup function that when called removes the listener
   */
  onPositionChanged(listener: PositionChangedListener): () => void;
  /**
   * remove an event listener for editor curosor position changes
   */
  offPositionChanged(listener: PositionChangedListener): void;
  /**
   * Add an event listener for editor scroll position changes
   *
   * @returns A cleanup function that when called removes the listener
   */
  onScrollChanged(listener: ScrollChangedListener): () => void;
  /**
   * remove an event listener for editor scroll position changes
   */
  offScrollChanged(listener: ScrollChangedListener): void;
  /**
   * Add an event listener for editor value changes
   *
   * @returns A cleanup function that when called removes the listener
   */
  onValueChanged(listener: ValueChangedListener): () => void;
  /**
   * remove an event listener for editor value changes
   */
  offValueChanged(listener: ValueChangedListener): void;

  /**
   * set the codemirror 6 extensions that should be added to the editor before the cypher language support extensions
   */
  setPreExtensions(preExtensions: Extension[]): void;
  /**
   * set the codemirror 6 extensions that should be added to the editor after the cypher language support extensions
   */
  setPostExtensions(preExtensions: Extension[]): void;

  /**
   * The editor support instance used internally by the editor
   */
  editorSupport: CypherEditorSupport;

  /**
   * The codemirror 6 view instance representing the cypher editor
   */
  codemirror: EditorView;
}

/**
 * These are the options for the {@link codemirror#createCypherEditor | createCypherEditor} function
 */
export interface EditorOptions {
  /**
   * Whether the autocomplete feature is enabled
   *
   * @defaultValue true
   */
  autocomplete?: boolean;
  /**
   * Whether the autocomplete auto closes whenever the editor loses focus
   *
   * @defaultValue true
   */
  autocompleteCloseOnBlur?: boolean;
  /**
   * Whether the autocomplete menu is initially shown to the user
   *
   * @defaultValue false
   */
  autocompleteOpen?: boolean;
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
   * Whether the editor maintains an undo/redo history
   *
   * @defaultValue true
   */
  history?: boolean;
  /**
   * Whether pressing the tab key affects editor indentation
   *
   * @defaultValue true
   */
  indentWithTab?: boolean;
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
   * @defaultValue false
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
   * The initial editor cursor position
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
   * The schema making the editor aware of things such as node labels & relationship types & procedures in the current graph database
   *
   * @defaultValue undefined
   */
  schema?: EditorSupportSchema;
  /**
   * Whether to use the light or dark theme for the editor
   *
   * @defaultValue "light"
   */
  theme?: Theme;
  /**
   * Whether or not the tooltips use simple absolute position styling (vs trying to stay within bounds)
   *
   * @defaultValue false
   */
  tooltipAbsolute?: boolean;
  /**
   * The initial editor value
   *
   * @defaultValue ""
   */
  value?: string;
  /**
   * The codemirror 6 extensions that should be added to the editor before the cypher language support extensions.
   *
   * @defaultValue undefined
   */
  preExtensions?: Extension[];
  /**
   * The codemirror 6 extensions that should be added to the editor after the cypher language support extensions.
   *
   * @defaultValue undefined
   */
  postExtensions?: Extension[];
}

/**
 * This function creates a codemirror cypher editor instance
 * @param parentDOMElement - the parent dom element to attach the editor to
 * @param options - the options for the created editor
 * @returns An editor api that wraps the created editor instance
 */
export declare function createCypherEditor(
  parentDOMElement: Element | DocumentFragment,
  options: EditorOptions
): EditorApi;
