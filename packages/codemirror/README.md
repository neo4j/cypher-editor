### @neo4j-cypher/codemirror

This package provides a variety of extensions to enable cypher language support in codemirror 6.

This package exports those extensions, and provides a convenience method to create an editor with the following API:

```js
// import { EditorView } from 'codemirror';
// import { CypherEditorSupport } from '@neo4j-cypher/editor-support';

const createCypherEditor = (
  parentDOMElement,
  { text = "initial text here", extensions = undefined } = {}
) => {
  // create editor & editorSupport using given extensions, or default extensions if undefined
  const editor = new EditorView({
    parentDOMElement,
    state: initialState // also contains editorSupport for use by extensions
  });
  return {
    editor: EditorView,
    editorSupport: CypherEditorSupport
  };
};
```
