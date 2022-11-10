import type { BaseEditorApi, BaseEditorOptions } from "cypher-codemirror-base";
import type { ChangeSet, Extension } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";

/**
 * This is the ValueChangedListener
 */
export type ValueChangedListener = (value: string, changes: ChangeSet) => void;

/**
 * This is the EditorApi
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
 * This is the EditorOptions
 */
export interface EditorOptions extends BaseEditorOptions {
  preExtensions?: Extension[];
  postExtensions?: Extension[];
}

/**
 * This is the createCypherEditor function
 */
export type createCypherEditor = (
  parentDOMElement: Element | DocumentFragment,
  options: EditorOptions
) => EditorApi;
