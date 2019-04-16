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

import { expect } from 'chai';
import { CypherEditorSupport } from '../../src/CypherEditorSupport';
import { CompletionTypeResolver } from '../../src/completion/CompletionTypeResolver';

export const schema = {
  labels: [':y', ':x'],
  relationshipTypes: [':rel1', ':rel 2'],
  propertyKeys: ['prop1', 'prop2'],
  parameters: ['param1', 'param2'],
  functions: [
    { name: 'toFloat', signature: 'expression' },
    { name: 'head', signature: 'expression' },
  ],
  procedures: [
    {
      name: 'db.indexes',
      signature: '()',
      returnItems: [
        { name: 'description', signature: 'STRING?' },
        { name: 'state', signature: 'STRING?' },
        { name: 'type', signature: 'STRING?' },
      ],
    },
    { name: 'org.neo4j.graph.traverse', signature: 'expression', returnItems: [] },
  ],
  consoleCommands: [
    {
      name: ':clear',
    },
    {
      name: ':play',
    },
    {
      name: ':help',
      description: 'helpdesc',
      commands: [
        { name: 'match' },
        { name: 'create' },
      ],
    },
    {
      name: ':server',
      commands: [
        {
          name: 'user',
          commands: [
            { name: 'list', description: 'listdesc' },
            { name: 'add' },
          ],
        },
      ],
    },
  ],
};

export function checkCompletion(queryWithCursor, expectedItems, doFilter = false) {
  const pos = queryWithCursor.indexOf('▼');
  const query = queryWithCursor.replace('▼', '');

  const backend = new CypherEditorSupport(query);
  backend.setSchema(schema);
  const completion = backend.getCompletion(1, pos, doFilter);

  expect(completion).to.deep.equal(expectedItems);
}


export function checkCompletionTypes(queryWithCursor, found, expectedTypes) {
  const pos = queryWithCursor.indexOf('▼');
  const query = queryWithCursor.replace('▼', '');

  const backend = new CypherEditorSupport(query);
  const el = backend.getElementForCompletion(1, pos);
  const types = CompletionTypeResolver.getTypes(el);

  expect(types).to.deep.equal({
    found,
    types: expectedTypes,
  });
}
