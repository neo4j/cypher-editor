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

import * as React from 'react';
import { createCypherEditor } from '../codemirror-cypher';

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
    this.editorSupport = editorSupport;
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

  render() {
    const setInput = (input) => {
      this.input = input;
    };
    return <div className="Codemirror-Container" ref={setInput} />;
  }
}
