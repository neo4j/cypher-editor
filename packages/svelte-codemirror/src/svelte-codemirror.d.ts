/**
 * This package provides a Svelte Cypher Editor component
 *
 * @remarks
 *
 * The props for this component are defined by the {@link svelte-codemirror#CypherEditorProps | CypherEditorProps} interface
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

export {
  default as CypherEditor,
  type CypherEditorProps
} from "./CypherEditor.svelte";
