### demo-base

This package contains values used across all demo packages.

Interesting exports to change are:

```
export const defaultQuery = 'this is the initial query that will show up on first load';
export const initialPosition = { line: 2, column: 3 }; // go to this position on first load
export const neo4jSchema = { /* this is an object you can define to control advanced autocompletion etc */ };
```
