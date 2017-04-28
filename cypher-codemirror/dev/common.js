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

import functions from './_data/functions.json';
import procedures from './_data/procedures.json';

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
  mode: 'application/x-cypher-query',
  indentWithTabs: true,
  smartIndent: true,
  lineNumbers: true,
  matchBrackets: true,
  autofocus: true,
  theme: 'cypher cypher-dark',
  lint: true,
  styleActiveLine: true,
  extraKeys: { 'Ctrl-Space': 'autocomplete' },
  hintOptions: {
    completeSingle: false,
    closeOnUnfocus: false,
    alignWithWord: true,
    async: true,
  },
};

export const neo4jSchema = {
  consoleCommands: [
    { name: ':clear' },
    { name: ':play' },
    { name: ':help', description: 'this is help command' },
    {
      name: ':server',
      commands: [
        {
          name: 'user',
          commands: [
            { name: 'list', description: 'listdesc' },
            { name: 'add' },
          ]
        }
      ]
    },
    { name: ':schema' },
    { name: ':history' },
    { name: ':queries' },
  ],
  labels: [
    'Legislator',
    'State',
    'Party',
    'Body',
    'Bill',
    'Subject',
    'Committee',
    'Congress'],
  relationshipTypes: [
    'REPRESENTS',
    'IS_MEMBER_OF',
    'ELECTED_TO',
    'PROPOSED_DURING',
    'SPONSORED_BY',
    'VOTED_ON',
    'REFERRED_TO',
    'SERVES_ON',
    'DEALS_WITH',
  ],
  propertyKeys: [
    'bioguideID',
    'code',
    'name',
    'type',
    'billID',
    'title',
    'thomasID',
    'birthday',
    'wikipediaID',
    'currentParty',
    'state',
    'votesmartID',
    'fecIDs',
    'republicanCount',
    'otherCount',
    'cspanID',
    'democratCount',
    'lastName',
    'firstName',
    'party',
    'opensecretsID',
    'icpsrID',
    'religion',
    'lisID',
    'govtrackID',
    'gender',
    'district',
    'number',
    'enacted',
    'officialTitle',
    'vetoed',
    'active',
    'popularTitle',
    'cosponsor',
    'vote',
    'jurisdiction',
    'url',
    'rank',
    'washpostID',
  ],
  functions: functions.data
    .map(data => ({
      name: data.row[0],
      signature: data.row[1].replace(data.row[0], ''),
    })),
  procedures: procedures.data
    .map((data) => {
      const name = data.row[0];
      const signature = data.row[1].replace(data.row[0], '');

      let returnItems = [];
      const matches = signature.match(/\([^)]*\) :: \((.*)\)/i);

      if (matches) {
        returnItems = matches[1]
          .split(', ')
          .map((returnItem) => {
            const returnItemMatches = returnItem.match(/(.*) :: (.*)/);
            return {
              name: returnItemMatches[1],
              signature: returnItemMatches[2],
            };
          });
      }

      return {
        name,
        signature,
        returnItems,
      };
    }),
};
