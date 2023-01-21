/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
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

import { CypherListener } from "@neo4j-cypher/antlr4";
import * as CypherTypes from "../lang/CypherTypes";

class Index {
  names = {};
  namesByQuery = [];
  referencesByName = {};
  referencesByQueryAndName = [];

  addQuery() {
    this.namesByQuery.push([]);
    this.referencesByQueryAndName.push({});
  }

  add(ctx, addName = true) {
    const queryIndex = this.namesByQuery.length - 1;
    const text = ctx.getText();
    if (addName) {
      this.names[text] = true;
      this.namesByQuery[queryIndex][text] = true;
    }
    this.referencesByName[text] = [...(this.referencesByName[text] || []), ctx];
    const index = this.referencesByQueryAndName[queryIndex];
    index[text] = [...(index[text] || []), ctx];
  }

  /**
   * Variables have specific rules, because they participate in autocompletion.
   * We should not add to the names list variables that are in expression.
   */
  addVariable(ctx) {
    let addName = true;

    // If variable is inside atom, then variable is inside expression.
    // Therefore, variables is node defined here.
    const parent = ctx.parentCtx;
    if (parent && parent instanceof CypherTypes.ATOM_CONTEXT) {
      addName = false;
    }
    this.add(ctx, addName);
  }
}

export class ReferencesListener extends CypherListener {
  queries = [];
  queriesAndCommands = [];
  statements = [];
  raw = [];
  
  indexes = new Map();

  inConsoleCommand = false;

  constructor() {
    super();
    CypherTypes.SYMBOLIC_CONTEXTS.forEach(
      (sc) => {
        this.indexes.set(sc, new Index(sc));
      }
    );
  }

  enterRaw(ctx) {
    this.raw.push(ctx);
  }
  exitRaw(ctx) {
    if (this.raw.length === 0) {
      this.raw.push(ctx);
    }
  }

  enterCypherPart(ctx) {
    this.statements.push(ctx);
  }

  exitCypher(ctx) {
    if (this.statements.length === 0) {
      this.statements.push(ctx);
    }
  }

  enterCypherConsoleCommand(ctx) {
    this.queriesAndCommands.push(ctx);
    this.indexes.forEach((index) => index.addQuery());
    this.inConsoleCommand = true;
  }

  exitCypherConsoleCommand() {
    this.inConsoleCommand = false;
  }

  enterCypherQuery(ctx) {
    this.queries.push(ctx);
    this.queriesAndCommands.push(ctx);
    this.indexes.forEach((index) => index.addQuery());
  }

  exitVariable(ctx) {
    if (this.inConsoleCommand) {
      return;
    }
    this.indexes.get(CypherTypes.VARIABLE_CONTEXT).addVariable(ctx);
  }

  exitLabelName(ctx) {
    if (this.inConsoleCommand) {
      return;
    }
    this.indexes.get(CypherTypes.LABEL_NAME_CONTEXT).add(ctx);
  }

  exitRelTypeName(ctx) {
    if (this.inConsoleCommand) {
      return;
    }
    this.indexes.get(CypherTypes.RELATIONSHIP_TYPE_NAME_CONTEXT).add(ctx);
  }

  exitPropertyKeyName(ctx) {
    if (this.inConsoleCommand) {
      return;
    }
    this.indexes.get(CypherTypes.PROPERTY_KEY_NAME_CONTEXT).add(ctx);
  }

  exitParameterName(ctx) {
    if (this.inConsoleCommand) {
      return;
    }
    this.indexes.get(CypherTypes.PARAMETER_NAME_CONTEXT).add(ctx);
  }
}
