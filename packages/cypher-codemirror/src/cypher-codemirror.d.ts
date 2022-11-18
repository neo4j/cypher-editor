import type { BaseEditorApi, BaseEditorOptions } from "cypher-codemirror-base";
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

/**
 * This listener is fired when the value of the cypher editor is changed
 * @param value - the new cypher query text value
 * @param changes - the codemirror 6 ChangeSet object representing what changed 
 */
export type ValueChangedListener = (value: string, changes: ChangeSet) => void;

/**
 * This is the EditorApi which wraps all of the interaction with the cypher editor
 */
export interface EditorApi
  extends Omit<BaseEditorApi, "onValueChanged" | "offValueChanged"> {
/**
 * ON VALUE CHANGED
 */
  onValueChanged: (listener: ValueChangedListener) => () => void;
  offValueChanged: (listener: ValueChangedListener) => void;

  setPreExtensions: (preExtensions: Extension[]) => void;
  setPostExtensions: (preExtensions: Extension[]) => void;

  codemirror: EditorView;
}

/**
 * These are the options for the {@link cypher-codemirror#createCypherEditor | createCypherEditor} function
 */
export interface EditorOptions extends BaseEditorOptions {
  preExtensions?: Extension[];
  postExtensions?: Extension[];
}

/**
 * This is the createCypherEditor function
 */
export declare function createCypherEditor(parentDOMElement: Element | DocumentFragment,
  options: EditorOptions): EditorApi;
