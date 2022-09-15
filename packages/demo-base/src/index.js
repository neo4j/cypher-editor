/*
 * Copyright (c) 2002-2017 "Neo Technology,"
 * Network Engine for Objects in Lund AB [http://neotechnology.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export { neo4jSchema, simpleSchema } from "./schema-data";

export const codeMirrorSettings = {
  value: `// line comment
/* block comment */
:play "http://example.com";
:play incommand-dash;
MATCH (variable)
MATCH (:Label)
MATCH ()-[:RelationshipType]-()
WITH $param
WITH {param}
RETURN some.functionNamme()
CALL some.procedureName()
CALL some.procedureName() YIELD param1, param2 as somethingElse
MATCH (variable {propKey: 1})
SET variable.propKey = 1;`,
  mode: "application/x-cypher-query",
  indentWithTabs: true,
  smartIndent: false,
  lineNumbers: true,
  matchBrackets: true,
  autofocus: true,
  theme: "cypher cypher-dark",
  lint: true,
  styleActiveLine: true,
  extraKeys: { "Ctrl-Space": "autocomplete" },
  hintOptions: {
    completeSingle: false,
    closeOnUnfocus: false,
    alignWithWord: true,
    async: true
  },
  gutters: ["cypher-hints"],
  lineWrapping: false,
  autoCloseBrackets: {
    explode: ""
  }
};

export const metaQuery = `	CALL db.labels() YIELD label
	RETURN {name:'labels', data:COLLECT(label)[..1000]} AS result
	UNION ALL
	CALL db.relationshipTypes() YIELD relationshipType
	RETURN {name:'relationshipTypes', data:COLLECT(relationshipType)[..1000]} AS result
	UNION ALL
	CALL db.propertyKeys() YIELD propertyKey
	RETURN {name:'propertyKeys', data:COLLECT(propertyKey)[..1000]} AS result
	UNION ALL
	CALL dbms.functions() YIELD name, signature, description
	RETURN {name:'functions', data: collect({name: name, signature: signature, description: description})} AS result
	UNION ALL
	CALL dbms.procedures() YIELD name, signature, description
	RETURN {name:'procedures', data:collect({name: name, signature: signature, description: description})} AS result
	UNION ALL
	MATCH () RETURN { name:'nodes', data:count(*) } AS result
	UNION ALL
	MATCH ()-[]->() RETURN { name:'relationships', data: count(*)} AS result
`;

export const shortMetaQuery = `  CALL db.labels() YIELD label
  RETURN {name:'labels', data:COLLECT(label)[..1000]} AS result
`;

export const simpleQuery = `MATCH (n) RETURN n LIMIT 10`;

export const serverInfoQuery = `CALL dbms.components() YIELD name, versions, edition`;

export const longQuery = metaQuery;

export const initialPosition = { line: 2, column: 3 };

export const host = "neo4j://localhost:7687";

export const user = "neo4j";

export const pass = "asdfgh";

export const defaultOptions = {
  lineNumbers: true, // whether to show the line numbers next to the editor
  autofocus: true, // if true the editor will be focused once created
  placeholder: undefined, // this text shows when the actual text is empty
  readOnly: false, // can be one of: true / false / "nocursor"
  autocomplete: true, // whether to show autocompletion
  lint: true, // whether to show lint errors,
  autocompleteTriggerStrings: [".", ":", "[]", "()", "{}", "[", "(", "{", "$"],
  autocompleteSticky: false
};
