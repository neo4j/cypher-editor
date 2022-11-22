/**
 * This package exports a Svelte Cypher Editor component
 * 
 * @remarks
 * 
 * The props for this component are defined by the {@link svelte-codemirror-cypher#CypherEditorProps | CypherEditorProps} interface
 * 
 * @example
 * Here's some example code using the props:
 *
 * ```ts
 * const props = { autocomplete: false };
 * <CypherEditor {...props} />
 * ```
 * 
 * @packageDocumentation
 */

export type {
  default as CypherEditor,
  CypherEditorProps
} from "./CypherEditor.svelte";
// export type { default as CypherEditor, CypherEditorProps, AutocompleteSchema, EditorApi } from "./CypherEditor.svelte";
