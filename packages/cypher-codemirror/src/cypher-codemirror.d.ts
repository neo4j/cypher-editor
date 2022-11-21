import type { ChangeSet, Extension } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";

/**
 * Create Codemirror 6 cypher editor instances
 *
 * @remarks
 *
 * This package provides a factory function for constructing an
 * {@link cypher-codemirror#EditorApi | EditorApi} instance which
 * wraps a Codemirror 6 instance with cypher language support.
 * @packageDocumentation
 */

import type {
  EditorSupportSchema,
  CypherEditorSupport
} from "cypher-editor-support";

export type PositionObject = {
  line: number;
  column: number;
  position: number;
};

export type PartialPositionObject = {
  line: number;
  column: number;
};

export type PositionAny = PositionObject | PartialPositionObject | number;

export type Theme = "light" | "dark";

export type AutofocusProp = "position" | "readOnly" | "value";

export interface AutocompleteOption {
  label: string;
  detail?: string;
  type?: string;
}

export interface ScrollInfo {
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
  scrollLeft: number;
  clientWidth: number;
  scrollWidth: number;
}

export interface AutocompleteChangedListener {
  (open: boolean, from?: number, options?: AutocompleteOption[]): void;
}

export interface PositionChangedListener {
  (position: PositionObject): void;
}

export interface FocusChangedListener {
  (focused: boolean): void;
}

export interface ScrollChangedListener {
  (scrollInfo: ScrollInfo): void;
}

/**
 * This listener is fired when the value of the cypher editor is changed
 */
export interface ValueChangedListener {
  /**
   * @param value - the new cypher query text value
   * @param changes - the codemirror 6 ChangeSet object representing what changed
   */
  (value: string, changes: ChangeSet): void;
}

export interface KeyDownListener {
  (event: KeyboardEvent): void;
}

export interface LineNumberClickListener {
  (lineNumber: number, event: Event): void;
}

/**
 * This is the EditorApi which wraps all of the interaction with the cypher editor
 */
export interface EditorApi {
  clearHistory: () => void;
  destroy: () => void;
  focus: () => void;
  getLineCount: () => void;
  getPosition: () => PositionObject;
  getPositionForValue: (positionValue: PositionAny) => PositionObject | null;
  selectAutocompleteOption: (autocompleteOptionIndex: number) => void;
  setAutocomplete: (autocomplete: boolean) => void;
  setAutocompleteCloseOnBlur: (autocompleteCloseOnBlur: boolean) => void;
  setAutocompleteOpen: (autocompleteOpen: boolean) => void;
  setAutocompleteSchema: (autocompleteSchema: EditorSupportSchema) => void;
  setAutocompleteTriggerStrings: (autocompleteTriggerStrings: string[]) => void;
  setHistory: (history: boolean) => void;
  setLineNumberFormatter: (
    lineNumberFormatter: (lineNumber: number, lineCount: number) => string
  ) => void;
  setLineNumbers: (lineNumbers: boolean) => void;
  setLineWrapping: (lineWrapping: boolean) => void;
  setLint: (lint: boolean) => void;
  setPlaceholder: (placeholder: string | undefined) => void;
  setPosition: (position: PositionAny) => void;
  setReadOnly: (readOnly: boolean) => void;
  setReadOnlyCursor: (readOnlyCursor: boolean) => void;
  setTheme: (theme: Theme) => void;
  setValue: (value: string, parseOnSetValue?: boolean) => void;

  onAutocompleteChanged: (listener: AutocompleteChangedListener) => () => void;
  offAutocompleteChanged: (listener: AutocompleteChangedListener) => void;
  onFocusChanged: (listener: FocusChangedListener) => () => void;
  offFocusChanged: (listener: FocusChangedListener) => void;
  onKeyDown: (listener: KeyDownListener) => () => void;
  offKeyDown: (listener: KeyDownListener) => void;
  onLineNumberClick: (listener: LineNumberClickListener) => () => void;
  offLineNumberClick: (listener: LineNumberClickListener) => void;
  onPositionChanged: (listener: PositionChangedListener) => () => void;
  offPositionChanged: (listener: PositionChangedListener) => void;
  onScrollChanged: (listener: ScrollChangedListener) => () => void;
  offScrollChanged: (listener: ScrollChangedListener) => void;
  onValueChanged: (listener: ValueChangedListener) => () => void;
  offValueChanged: (listener: ValueChangedListener) => void;

  setPreExtensions: (preExtensions: Extension[]) => void;
  setPostExtensions: (preExtensions: Extension[]) => void;

  editorSupport: CypherEditorSupport;
  codemirror: EditorView;
}

/**
 * These are the options for the {@link cypher-codemirror#createCypherEditor | createCypherEditor} function
 */
export interface EditorOptions {
  autocomplete?: boolean;
  autocompleteCloseOnBlur?: boolean;
  autocompleteOpen?: boolean;
  autocompleteSchema?: EditorSupportSchema;
  autocompleteTriggerStrings?: string[];
  autofocus?: boolean;
  history?: boolean;
  lineNumberFormatter?: (lineNumber: number, lineCount: number) => string;
  lineNumbers?: boolean;
  lineWrapping?: boolean;
  lint?: boolean;
  parseOnSetValue?: boolean;
  placeholder?: string;
  position?: PositionAny;
  readOnly?: boolean;
  readOnlyCursor?: boolean;
  theme?: Theme;
  value?: string;

  preExtensions?: Extension[];
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
