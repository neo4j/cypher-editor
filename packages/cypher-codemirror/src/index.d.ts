import type { BaseEditorApi, BaseEditorOptions } from "cypher-codemirror-base";
import type { ChangeSet, Extension } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";

export type ValueChangedListener = (value: string, changes: ChangeSet) => void;

export interface EditorApi
  extends Omit<BaseEditorApi, "onValueChanged" | "offValueChanged"> {
  onValueChanged: (listener: ValueChangedListener) => () => void;
  offValueChanged: (listener: ValueChangedListener) => void;

  setPreExtensions: (preExtensions: Extension[]) => void;
  setPostExtensions: (preExtensions: Extension[]) => void;

  codemirror: EditorView;
}

export interface EditorOptions extends BaseEditorOptions {
  preExtensions?: Extension[];
  postExtensions?: Extension[];
}

export type createCypherEditor = (
  parentDOMElement: Element | DocumentFragment,
  options: EditorOptions
) => EditorApi;
