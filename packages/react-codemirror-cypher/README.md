### react-codemirror-cypher

This package exports a React component that provides a cypher editor using codemirror 6.

You can use this package like the following:

```
import React from 'react';
import CypherEditor from 'react-codemirror-cypher';

const editorProps = {
  onValueChange: value => {}, // optional
  onFocusChange: focused => {}, // optional
  onScroll: scrollInfo => {}, // optional
  options: {
    theme: 'light', // optional, defaults to light
    extensions: [ /* override extensions  */ ] // optional, defaults to a sensible list of extensions.
  },
  autoCompleteSchema: { /* ... */ }, // optional, see example in demos
  cypher: 'this is the text to show in the editor',
  initialPosition: { row: 2, column: 3},  // optional, rows are 1 based, columns are 0 based
  classNames: [], // optional, array of classnames to add to the root dom element.
  theme: 'light' // optional, should be light or dark, defaults to light
};

const MyReactComponent = () => {
  return (
    <CypherEditor {...editorProps} />
  );
}
```