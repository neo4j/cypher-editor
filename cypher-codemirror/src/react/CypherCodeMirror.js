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

/* eslint-disable no-console */
import * as React from 'react';
import { createCypherEditor, parse } from '../codemirror-cypher';

function triggerAutocompletion(cm, changed) {
  if (changed.text.length !== 1) {
    return;
  }

  const text = changed.text[0];
  const shouldTriggerAutocompletion =
    text === '.' ||
    text === ':' ||
    text === '[]' ||
    text === '()' ||
    text === '{}' ||
    text === '[' ||
    text === '(' ||
    text === '{' ||
    text === '$';
  if (shouldTriggerAutocompletion) {
    cm.execCommand('autocomplete');
  }
}

export default class CypherCodeMirror extends React.Component {
  constructor(props) {
    super(props);
    this.settings = props.settings || {};
    this.schema = props.schema || {};

    if (props.theme) {
      this.theme = props.theme;
      this.settings.theme = props.theme;
    }

    this.input = null;
    this.editorSupport = null;
    this.editor = null;
  }

  componentDidMount() {
    const { editor, editorSupport } = createCypherEditor(this.input, this.settings);
    this.editor = editor;
    this.editor.on('change', triggerAutocompletion);
    this.editorSupport = editorSupport;
    this.editorSupport.on('updated', () => {
      console.log('UPDATED - this.editorSupport.version: ', this.editorSupport.version);
      console.table(this.editorSupport.queriesAndCommands.map(stmt => stmt.getText()));
    });
    this.editorSupport.on('update', () => {
      console.log('UPDATE - this.editor.version: ', this.editor.version);
      console.log('UPDATE - this.editorSupport.version: ', this.editorSupport.version);
      this.editorSupport
        .ensureVersion(this.editor.version)
        .then(() => {
          console.log('ENSURE OK - this.editor.version: ', this.editor.version);
          console.log('ENSURE OK - this.editorSupport.version: ', this.editorSupport.version);
        })
        .catch(() => {
          console.error('Version not found');
          console.log('ENSURE ERROR - this.editor.version: ', this.editor.version);
          console.log('ENSURE ERROR - this.editorSupport.version: ', this.editorSupport.version);
        });
    });
    this.editorSupport.setSchema(this.schema);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.schema) {
      this.schema = nextProps.schema;
      this.editorSupport.setSchema(nextProps.schema);
    }

    if (nextProps.theme) {
      this.theme = nextProps.theme;
      this.settings.theme = nextProps.theme;
      this.editor.setOption('theme', this.theme);
    }
  }
  parseContent = () => {
    const { referencesListener, referencesProviders } = parse(this.editor.getValue());
    const { queriesAndCommands } = referencesListener;
    console.log('queriesAndCommands: ', queriesAndCommands);
    console.log('referencesProviders: ', referencesProviders);
  };
  render() {
    const setInput = (input) => {
      this.input = input;
    };
    return (
      <div>
        <button onClick={this.parseContent}>Manually parse content</button>
        <div className="Codemirror-Container" ref={setInput} />
      </div>
    );
  }
}
