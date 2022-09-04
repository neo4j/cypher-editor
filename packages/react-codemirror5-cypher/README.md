### react-codemirror5-cypher

This package exports a React component that provides a cypher editor using codemirror 5.

You can use this package like the following:

```
import React from 'react';
import CypherEditor from 'react-codemirror5-cypher';

const editorProps = {
  onValueChange: (value, change) => {}, // optional
  onFocusChange: focused => {}, // optional
  onScroll: scrollInfo => {}, // optional
  options: {}, // optional, codemirror 5 options
  autoCompleteSchema: { /* ... */ }, // optional, see example in demos
  cypher: 'this is the text to show in the editor',
  initialPosition: { row: 2, column: 3},  // optional, rows are 1 based, columns are 0 based
  classNames: [], // optional, array of classnames to add to the root dom element.
  theme: 'cypher' // optional, should be `cypher` or `cypher cypher-dark`, defaults to `cypher` (light mode)
};

const MyReactComponent = () => {
  return (
    <CypherEditor {...editorProps} />
  );
}
```
