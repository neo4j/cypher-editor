### cypher-codemirror5

This package provides code that enables cypher language support in codemirror 5.

Thisprovides a convenience method to create an editor with the following API:

```
// import CodeMirror5 from 'codemirror';
// import { CypherEditorSupport } from 'cypher-editor-support';

const createCypherEditor = (parentDOMElement, codeMirrorFiveSettings = {}) => {
  // create editor & editorSupport using settings
  const editor = CodeMirror5(parentDOMElement, codeMirrorFiveSettings);
  return {
    editor: CodeMirror5,
    editorSupport: CypherEditorSupport
  };
};
```
