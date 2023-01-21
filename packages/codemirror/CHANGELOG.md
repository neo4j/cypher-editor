# @neo4j-cypher/codemirror

## 1.0.0-next.19

### Patch Changes

- Updated dependencies [6e6269f]
  - @neo4j-cypher/editor-support@1.0.0-next.3

## 1.0.0-next.18

### Patch Changes

- d4ef48e: disable syntax highlighting when editor is empty to fix a bug

## 1.0.0-next.17

### Patch Changes

- b5add94: fix bug where decorations were not being cleared properly
- 05bcaef: undo changes from last version, they broke things

## 1.0.0-next.16

### Patch Changes

- f20de4e: fix rare decoration update error by removing unneeded code

## 1.0.0-next.15

### Patch Changes

- b0dc3cb: fix css line-height of gutters to match content

## 1.0.0-next.14

### Patch Changes

- 77cb7d3: add missing pre/post extensions props to components, fix autocomplete change typo bug

## 1.0.0-next.13

### Patch Changes

- b8d7618: fix issues with parsing emoji & special chars
- 0a21042: add bracketMatching & closeBrackets options (both default true)

## 1.0.0-next.12

### Patch Changes

- 95e6d25: add cypherLanguage & various search/cursor options, misc improvements

## 1.0.0-next.11

### Patch Changes

- 42dc131: fix position/selection bug, add search & indentUnit options

## 1.0.0-next.10

### Patch Changes

- 4a8e102: tooltipAbsolute default to true, fix tab key bugs

## 1.0.0-next.9

### Patch Changes

- b5ca4c5: rename indentWithTab -> tabKey, fix tab with autocomplete

## 1.0.0-next.8

### Patch Changes

- 95e70e0: add tooltipAbsolute option / prop

## 1.0.0-next.7

### Patch Changes

- d925e37: fix default application bug on editor creation

## 1.0.0-next.6

### Patch Changes

- a2750e5: add js theme override to remove focused outline

## 1.0.0-next.5

### Patch Changes

- de33476: Add indentWithTab prop / option

## 1.0.0-next.4

### Patch Changes

- de36649: Use escaped Cypher when needed in the auto-completions

## 1.0.0-next.3

### Patch Changes

- 48363de: add antlr4-browser package (remove fs dependency)
- Updated dependencies [48363de]
  - @neo4j-cypher/editor-support@1.0.0-next.2

## 1.0.0-next.2

### Patch Changes

- b35f29a: make sure calls to editorApi.set function apply defaults, fixup react types

## 1.0.0-next.1

### Patch Changes

- 896eddf: add missing @babel/runtime dependency
- Updated dependencies [896eddf]
  - @neo4j-cypher/editor-support@1.0.0-next.1

## 1.0.0-next.0

### Major Changes

- 13f7151: Initial pre-release

### Patch Changes

- Updated dependencies [13f7151]
  - @neo4j-cypher/editor-support@1.0.0-next.0
