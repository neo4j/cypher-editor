<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@neo4j-cypher/editor-support](./neo4j-cypher_editor-support.md)

## editor-support package

Cypher language support package using an antlr4 grammar

### Remarks:

This package provides cypher query parsing using an antlr4 grammar.

It is mostly unchanged from the original implementation.

It provides capabilities for cypher query syntax highlighting and and autocompletion suggestions.

---

<br>

### Classes:

|  Class | Description |
|  --- | --- |
|  [CypherEditorSupport](#cyphereditorsupport) | Instances of this class are used to encapsulate the parsed cypher tree for the antlr4 grammar |
|  [CypherLexer](#cypherlexer) | The CypherLexer class generated by antlr4 |

<br>

<a name="cyphereditorsupport"></a>

### CypherEditorSupport class

Instances of this class are used to encapsulate the parsed cypher tree for the antlr4 grammar

<b>Signature:</b>

```typescript
export class CypherEditorSupport 
```

<br>

#### Constructors:

|  Constructor | Description |
|  --- | --- |
|  [(constructor)(input)](#cyphereditorsupport.(constructor)) | Constructs a new instance of the <code>CypherEditorSupport</code> class |

<br>

<a name="cyphereditorsupport.(constructor)"></a>

#### CypherEditorSupport.(constructor)

Constructs a new instance of the `CypherEditorSupport` class

<b>Signature:</b>

```typescript
constructor(input: string);
```
<b>Parameters:</b>

|  Parameter | Type |
|  --- | --- |
|  input | string |

<br>

#### Methods:

|  Method |
|  --- |
|  [getCompletion(line, column, doFilter)](#cyphereditorsupport.getcompletion) |
|  [setSchema(schema)](#cyphereditorsupport.setschema) |
|  [update(input)](#cyphereditorsupport.update) |

<br>

<a name="cyphereditorsupport.getcompletion"></a>

#### CypherEditorSupport.getCompletion() method

<b>Signature:</b>

```typescript
getCompletion(
    line: number,
    column: number,
    doFilter?: boolean
  ): {
    from: EditorSupportPosition;
    to: EditorSupportPosition;
    items: EditorSupportCompletionItem[];
  };
```
<b>Parameters:</b>

|  Parameter | Type | Description |
|  --- | --- | --- |
|  line | number |  |
|  column | number |  |
|  doFilter | boolean | <i>(Optional)</i> |

<b>Returns:</b>

{ from: [EditorSupportPosition](#editorsupportposition)<!-- -->; to: [EditorSupportPosition](#editorsupportposition)<!-- -->; items: [EditorSupportCompletionItem](#editorsupportcompletionitem)<!-- -->\[\]; }

<br>

<a name="cyphereditorsupport.setschema"></a>

#### CypherEditorSupport.setSchema() method

<b>Signature:</b>

```typescript
setSchema(schema: EditorSupportSchema): void;
```
<b>Parameters:</b>

|  Parameter | Type |
|  --- | --- |
|  schema | [EditorSupportSchema](#editorsupportschema) |

<b>Returns:</b>

void

<br>

<a name="cyphereditorsupport.update"></a>

#### CypherEditorSupport.update() method

<b>Signature:</b>

```typescript
update(input: string): void;
```
<b>Parameters:</b>

|  Parameter | Type |
|  --- | --- |
|  input | string |

<b>Returns:</b>

void

<br>

<a name="cypherlexer"></a>

### CypherLexer class

The CypherLexer class generated by antlr4

<b>Signature:</b>

```typescript
export class CypherLexer extends Lexer 
```
<b>Extends:</b> Lexer

<br>

#### Constructors:

|  Constructor | Description |
|  --- | --- |
|  [(constructor)(input)](#cypherlexer.(constructor)) | Constructs a new instance of the <code>CypherLexer</code> class |

<br>

<a name="cypherlexer.(constructor)"></a>

#### CypherLexer.(constructor)

Constructs a new instance of the `CypherLexer` class

<b>Signature:</b>

```typescript
constructor(input: string);
```
<b>Parameters:</b>

|  Parameter | Type |
|  --- | --- |
|  input | string |

<br>

#### Properties:

|  Property | Type |
|  --- | --- |
|  [channelNames](#cypherlexer.channelnames) | string\[\] |
|  [grammarFileName](#cypherlexer.grammarfilename) | string |
|  [literalNames](#cypherlexer.literalnames) | string\[\] |
|  [modeNames](#cypherlexer.modenames) | string\[\] |
|  [ruleNames](#cypherlexer.rulenames) | string\[\] |
|  [symbolicNames](#cypherlexer.symbolicnames) | string\[\] |

<br>

<a name="cypherlexer.channelnames"></a>

#### CypherLexer.channelNames property

<b>Signature:</b>

```typescript
channelNames: string[];
```

<br>

<a name="cypherlexer.grammarfilename"></a>

#### CypherLexer.grammarFileName property

<b>Signature:</b>

```typescript
grammarFileName: string;
```

<br>

<a name="cypherlexer.literalnames"></a>

#### CypherLexer.literalNames property

<b>Signature:</b>

```typescript
literalNames: string[];
```

<br>

<a name="cypherlexer.modenames"></a>

#### CypherLexer.modeNames property

<b>Signature:</b>

```typescript
modeNames: string[];
```

<br>

<a name="cypherlexer.rulenames"></a>

#### CypherLexer.ruleNames property

<b>Signature:</b>

```typescript
ruleNames: string[];
```

<br>

<a name="cypherlexer.symbolicnames"></a>

#### CypherLexer.symbolicNames property

<b>Signature:</b>

```typescript
symbolicNames: string[];
```

---

<br>

### Functions:

|  Function | Description |
|  --- | --- |
|  [createCypherLexer(input)](#createcypherlexer) | Helper function to instanciate a CypherLexer |
|  [parse(input)](#parse) | Helper function to parse a cypher query |

<br>

<a name="createcypherlexer"></a>

### createCypherLexer() function

Helper function to instanciate a CypherLexer

<b>Signature:</b>

```typescript
declare function createCypherLexer(input: string): CypherLexer;
```

#### Parameters:

|  Parameter | Type |
|  --- | --- |
|  input | string |

<b>Returns:</b>

[CypherLexer](#cypherlexer)

<br>

<a name="parse"></a>

### parse() function

Helper function to parse a cypher query

<b>Signature:</b>

```typescript
declare function parse(input: string): {
  referencesListener: {
    queriesAndCommands: QueryOrCommand[];
  };
};
```

#### Parameters:

|  Parameter | Type |
|  --- | --- |
|  input | string |

<b>Returns:</b>

{ referencesListener: { queriesAndCommands: [QueryOrCommand](#queryorcommand)<!-- -->\[\]; }; }

---

<br>

### Interfaces:

|  Interface | Description |
|  --- | --- |
|  [ConsoleCommand](#consolecommand) | A console command, these are typically prefixed with <code>:</code> like <code>:help</code> |
|  [EditorSupportCompletionItem](#editorsupportcompletionitem) | EditorSupportCompletionItem |
|  [EditorSupportPosition](#editorsupportposition) | The editor support library has its own representation of editor positions |
|  [EditorSupportSchema](#editorsupportschema) | The editor support schema contains information about a graph database that enables advanced autocompletion &amp; syntax highlighting. |
|  [FunctionSchema](#functionschema) | A function provided by the graph database |
|  [ProcedureSchema](#procedureschema) | A procedure provided by the graph database |
|  [QueryOrCommand](#queryorcommand) |  |

<br>

<a name="consolecommand"></a>

### ConsoleCommand interface

A console command, these are typically prefixed with `:` like `:help`

<b>Signature:</b>

```typescript
export interface ConsoleCommand 
```

<br>

#### Properties:

|  Property | Type | Description |
|  --- | --- | --- |
|  [commands?](#consolecommand.commands) | [ConsoleCommand](./neo4j-cypher_editor-support.md#consolecommand)<!-- -->\[\] | <i>(Optional)</i> |
|  [description?](#consolecommand.description) | string | <i>(Optional)</i> |
|  [name](#consolecommand.name) | string |  |

<br>

<a name="consolecommand.commands"></a>

#### ConsoleCommand.commands property

<b>Signature:</b>

```typescript
commands?: ConsoleCommand[];
```

<br>

<a name="consolecommand.description"></a>

#### ConsoleCommand.description property

<b>Signature:</b>

```typescript
description?: string;
```

<br>

<a name="consolecommand.name"></a>

#### ConsoleCommand.name property

<b>Signature:</b>

```typescript
name: string;
```

<br>

<a name="editorsupportcompletionitem"></a>

### EditorSupportCompletionItem interface

EditorSupportCompletionItem

<b>Signature:</b>

```typescript
export interface EditorSupportCompletionItem 
```

<br>

#### Properties:

|  Property | Type |
|  --- | --- |
|  [content](#editorsupportcompletionitem.content) | string |
|  [postfix](#editorsupportcompletionitem.postfix) | null |
|  [type](#editorsupportcompletionitem.type) | [CompletionType](#completiontype) |
|  [view](#editorsupportcompletionitem.view) | string |

<br>

<a name="editorsupportcompletionitem.content"></a>

#### EditorSupportCompletionItem.content property

<b>Signature:</b>

```typescript
content: string;
```

<br>

<a name="editorsupportcompletionitem.postfix"></a>

#### EditorSupportCompletionItem.postfix property

<b>Signature:</b>

```typescript
postfix: null;
```

<br>

<a name="editorsupportcompletionitem.type"></a>

#### EditorSupportCompletionItem.type property

<b>Signature:</b>

```typescript
type: CompletionType;
```

<br>

<a name="editorsupportcompletionitem.view"></a>

#### EditorSupportCompletionItem.view property

<b>Signature:</b>

```typescript
view: string;
```

<br>

<a name="editorsupportposition"></a>

### EditorSupportPosition interface

The editor support library has its own representation of editor positions

<b>Signature:</b>

```typescript
export interface EditorSupportPosition 
```

<br>

#### Properties:

|  Property | Type | Description |
|  --- | --- | --- |
|  [column](#editorsupportposition.column) | number |  |
|  [line](#editorsupportposition.line) | number | The 1 based line number The 0 based column number |

<br>

<a name="editorsupportposition.column"></a>

#### EditorSupportPosition.column property

<b>Signature:</b>

```typescript
column: number;
```

<br>

<a name="editorsupportposition.line"></a>

#### EditorSupportPosition.line property

The 1 based line number The 0 based column number

<b>Signature:</b>

```typescript
line: number;
```

<br>

<a name="editorsupportschema"></a>

### EditorSupportSchema interface

The editor support schema contains information about a graph database that enables advanced autocompletion &amp; syntax highlighting.

<b>Signature:</b>

```typescript
export interface EditorSupportSchema 
```

<br>

#### Properties:

|  Property | Type | Description |
|  --- | --- | --- |
|  [consoleCommands?](#editorsupportschema.consolecommands) | [ConsoleCommand](#consolecommand)<!-- -->\[\] | <i>(Optional)</i> The list of console commands |
|  [functions?](#editorsupportschema.functions) | [FunctionSchema](#functionschema)<!-- -->\[\] | <i>(Optional)</i> The list of functions provided the graph database |
|  [labels?](#editorsupportschema.labels) | string\[\] | <i>(Optional)</i> The list of labels in the graph database |
|  [parameters?](#editorsupportschema.parameters) | string\[\] | <i>(Optional)</i> The list of parameters |
|  [procedures?](#editorsupportschema.procedures) | [ProcedureSchema](#procedureschema)<!-- -->\[\] | <i>(Optional)</i> The list of procedures provided the graph database |
|  [propertyKeys?](#editorsupportschema.propertykeys) | string\[\] | <i>(Optional)</i> The list of property keys in the graph database |
|  [relationshipTypes?](#editorsupportschema.relationshiptypes) | string\[\] | <i>(Optional)</i> The list of relationship types in the graph database |

<br>

<a name="editorsupportschema.consolecommands"></a>

#### EditorSupportSchema.consoleCommands property

The list of console commands

<b>Signature:</b>

```typescript
consoleCommands?: ConsoleCommand[];
```

<br>

<a name="editorsupportschema.functions"></a>

#### EditorSupportSchema.functions property

The list of functions provided the graph database

<b>Signature:</b>

```typescript
functions?: FunctionSchema[];
```

<br>

<a name="editorsupportschema.labels"></a>

#### EditorSupportSchema.labels property

The list of labels in the graph database

<b>Signature:</b>

```typescript
labels?: string[];
```

<br>

<a name="editorsupportschema.parameters"></a>

#### EditorSupportSchema.parameters property

The list of parameters

<b>Signature:</b>

```typescript
parameters?: string[];
```

<br>

<a name="editorsupportschema.procedures"></a>

#### EditorSupportSchema.procedures property

The list of procedures provided the graph database

<b>Signature:</b>

```typescript
procedures?: ProcedureSchema[];
```

<br>

<a name="editorsupportschema.propertykeys"></a>

#### EditorSupportSchema.propertyKeys property

The list of property keys in the graph database

<b>Signature:</b>

```typescript
propertyKeys?: string[];
```

<br>

<a name="editorsupportschema.relationshiptypes"></a>

#### EditorSupportSchema.relationshipTypes property

The list of relationship types in the graph database

<b>Signature:</b>

```typescript
relationshipTypes?: string[];
```

<br>

<a name="functionschema"></a>

### FunctionSchema interface

A function provided by the graph database

<b>Signature:</b>

```typescript
export interface FunctionSchema 
```

<br>

#### Properties:

|  Property | Type |
|  --- | --- |
|  [name](#functionschema.name) | string |
|  [signature](#functionschema.signature) | string |

<br>

<a name="functionschema.name"></a>

#### FunctionSchema.name property

<b>Signature:</b>

```typescript
name: string;
```

<br>

<a name="functionschema.signature"></a>

#### FunctionSchema.signature property

<b>Signature:</b>

```typescript
signature: string;
```

<br>

<a name="procedureschema"></a>

### ProcedureSchema interface

A procedure provided by the graph database

<b>Signature:</b>

```typescript
export interface ProcedureSchema 
```

<br>

#### Properties:

|  Property | Type |
|  --- | --- |
|  [name](#procedureschema.name) | string |
|  [returnItems](#procedureschema.returnitems) | [FunctionSchema](#functionschema)<!-- -->\[\] |
|  [signature](#procedureschema.signature) | string |

<br>

<a name="procedureschema.name"></a>

#### ProcedureSchema.name property

<b>Signature:</b>

```typescript
name: string;
```

<br>

<a name="procedureschema.returnitems"></a>

#### ProcedureSchema.returnItems property

<b>Signature:</b>

```typescript
returnItems: FunctionSchema[];
```

<br>

<a name="procedureschema.signature"></a>

#### ProcedureSchema.signature property

<b>Signature:</b>

```typescript
signature: string;
```

<br>

<a name="queryorcommand"></a>

### QueryOrCommand interface

<b>Signature:</b>

```typescript
declare interface QueryOrCommand 
```

<br>

#### Properties:

|  Property | Type |
|  --- | --- |
|  [cypherConsoleCommandName](#queryorcommand.cypherconsolecommandname) | () =&gt; { getText: () =&gt; string } |
|  [getText](#queryorcommand.gettext) | () =&gt; string |
|  [start](#queryorcommand.start) | [EditorSupportPosition](#editorsupportposition) |
|  [stop](#queryorcommand.stop) | [EditorSupportPosition](#editorsupportposition) |

<br>

<a name="queryorcommand.cypherconsolecommandname"></a>

#### QueryOrCommand.cypherConsoleCommandName property

<b>Signature:</b>

```typescript
cypherConsoleCommandName: () => { getText: () => string };
```

<br>

<a name="queryorcommand.gettext"></a>

#### QueryOrCommand.getText property

<b>Signature:</b>

```typescript
getText: () => string;
```

<br>

<a name="queryorcommand.start"></a>

#### QueryOrCommand.start property

<b>Signature:</b>

```typescript
start: EditorSupportPosition;
```

<br>

<a name="queryorcommand.stop"></a>

#### QueryOrCommand.stop property

<b>Signature:</b>

```typescript
stop: EditorSupportPosition;
```

---

<br>

### Type Aliases:

|  Type Alias | Description |
|  --- | --- |
|  [CompletionType](#completiontype) | All autocomplete options have a CompletionType |

<br>

<a name="completiontype"></a>

### CompletionType type

All autocomplete options have a CompletionType

<b>Signature:</b>

```typescript
export type CompletionType =
  | "keyword"
  | "label"
  | "variable"
  | "parameter"
  | "propertyKey"
  | "relationshipType"
  | "function"
  | "procedure"
  | "consoleCommand"
  | "consoleCommandSubcommand"
  | "procedureOutput"
  | "noop";
```

---

