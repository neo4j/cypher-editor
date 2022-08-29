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

import 'babel-polyfill';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/edit/closebrackets';

import '../../src/codemirror-cypher.css';
import CypherCodeMirror from '../../src/react/CypherCodeMirror';
import { neo4jSchema, codeMirrorSettings } from '../common';

class Content extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      theme: 'cypher cypher-dark',
    };
  }

  lightTheme = () => {
    this.setState({ theme: 'cypher' });
  };

  darkTheme = () => {
    this.setState({ theme: 'cypher cypher-dark' });
  };

  render() {
    return (
      <div className="columns">
        <div>
          <CypherCodeMirror theme={this.state.theme} settings={codeMirrorSettings} schema={neo4jSchema} />
        </div>
        <div>
          <div className="schema">
            <button onClick={this.lightTheme}>Light theme</button>
            <button onClick={this.darkTheme}>Dark theme</button>
            <pre>
              {JSON.stringify(neo4jSchema, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Content />,
  document.getElementById('content'),
);
