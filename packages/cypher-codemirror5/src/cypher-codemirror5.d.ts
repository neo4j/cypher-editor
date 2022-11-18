import type { BaseEditorApi, BaseEditorOptions } from "cypher-codemirror-base";
import type { Editor, EditorChange } from "codemirror";

export type ValueChangedListener = (
  value: string,
  changes: EditorChange
) => void;

export interface EditorApi
  extends Omit<BaseEditorApi, "onValueChanged" | "offValueChanged"> {
  onValueChanged: (listener: ValueChangedListener) => () => void;
  offValueChanged: (listener: ValueChangedListener) => void;

  codemirror: Editor;
}

export interface EditorOptions extends BaseEditorOptions {
  codemirrorOptions?: any; // TODO - it'd be a lot of work, but codemirrorOptions could be typed...
}

export type createCypherEditor = (
  parentDOMElement: Element | DocumentFragment,
  options: EditorOptions
) => EditorApi;
