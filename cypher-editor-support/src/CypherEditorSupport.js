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

import antlr4 from 'antlr4';
import { CypherParser } from './_generated/CypherParser';
import { CypherLexer } from './_generated/CypherLexer';
import { ErrorListener } from './errors/ErrorListener';
import { ReferencesListener } from './references/ReferencesListener';
import { ReferencesProvider } from './references/ReferencesProvider';
import { CompletionTypeResolver } from './completion/CompletionTypeResolver';
import { AutoCompletion } from './completion/AutoCompletion';
import * as CypherTypes from './lang/CypherTypes';
import { CypherSyntaxHighlight } from './highlight/CypherSyntaxHighlight';
import { TreeUtils } from './util/TreeUtils';
import { PositionConverter } from './util/PositionConverter';
import { retryOperation } from './util/retryOperation';

export class CypherEditorSupport {
  schema = {};

  input = null;
  positionConverter = new PositionConverter('');

  parseTree = null;
  parseErrors = [];
  referencesProviders = {};
  completion = new AutoCompletion();
  queriesAndCommands = [];
  listeners = [];
  version = 0;

  constructor(input = '') {
    this.update(input);
  }

  ensureVersion = (version, delay = 30, times = 5) =>
    retryOperation(
      () =>
        new Promise((resolve, reject) => {
          if (version === this.version) {
            return resolve();
          }
          return reject();
        }),
      delay,
      times,
    );

  on(eventName, cb) {
    this.listeners[eventName] = Array.isArray(this.listeners[eventName])
      ? this.listeners[eventName].concat([cb])
      : (this.listeners[eventName] = [cb]);
  }

  off(eventName, cb) {
    if (!this.listeners[eventName]) return;
    const index = this.listeners[eventName].indexOf(cb);
    if (index > -1) {
      this.listeners[eventName].splice(index, 1);
    }
  }

  trigger(eventName, args = []) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName].forEach(cb => cb(...args));
  }

  update(input = '', version) {
    this.trigger('update');
    if (input === this.input) {
      this.version = version || this.version;
      this.trigger('updated');
      return;
    }
    this.positionConverter = new PositionConverter(input);

    this.input = input;
    const { parseTree, referencesListener, errorListener } = this.parse(input);
    this.parseTree = parseTree;

    const consoleCommandExists = () => {
      const ctx = TreeUtils.findChild(this.parseTree, CypherTypes.CONSOLE_COMMAND_CONTEXT);
      return ctx != null;
    };

    if (consoleCommandExists()) {
      // Do not show errors for console commands, because they are too complex.
      this.parseErrors = [];
    } else {
      this.parseErrors = errorListener.errors;
    }

    const { queries, indexes, queriesAndCommands } = referencesListener;
    this.queriesAndCommands = queriesAndCommands;

    this.referencesProviders = CypherTypes.SYMBOLIC_CONTEXTS.reduce(
      (acc, t) => ({
        ...acc,
        [t]: new ReferencesProvider(queries, indexes[t]),
      }),
      {},
    );

    this.completion.updateReferenceProviders(this.referencesProviders);
    this.version = version || this.version;
    this.trigger('updated');
  }

  setSchema(schema) {
    this.schema = schema;
    this.completion.updateSchema(this.schema);
  }

  parse(input) {
    const referencesListener = new ReferencesListener();
    const errorListener = new ErrorListener();
    const chars = new antlr4.InputStream(input);
    const lexer = new CypherLexer(chars);
    lexer.removeErrorListeners();
    lexer.addErrorListener(errorListener);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new CypherParser(tokens);
    parser.buildParseTrees = true;
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);
    parser.addParseListener(referencesListener);
    const parseTree = parser.cypher();
    return { parseTree, referencesListener, errorListener };
  }

  getElement(line, column) {
    const abs = this.positionConverter.toAbsolute(line, column);

    function getElement(pt) {
      const pos = TreeUtils.getPosition(pt);
      if (pos != null && (abs < pos.start || abs > pos.stop)) {
        return null;
      }

      const c = pt.getChildCount();
      if (c === 0 && pos != null) {
        return pt;
      }

      for (let i = 0; i < c; i += 1) {
        const e = getElement(pt.getChild(i));
        if (e != null) {
          return e;
        }
      }

      return pos != null ? pt : null;
    }

    return getElement(this.parseTree);
  }

  getReferences(line, column) {
    const e = TreeUtils.findAnyParent(this.getElement(line, column), CypherTypes.SYMBOLIC_CONTEXTS);
    if (e == null) {
      return [];
    }

    const type = e.constructor.name;
    const query =
      type === CypherTypes.VARIABLE_CONTEXT
        ? TreeUtils.findAnyParent(e, [CypherTypes.QUERY_CONTEXT])
        : null;

    return this.referencesProviders[type].getReferences(e.getText(), query);
  }

  getCompletionInfo(line, column) {
    const element = this.getElementForCompletion(line, column);
    const query = TreeUtils.findAnyParent(element, [CypherTypes.QUERY_CONTEXT]);
    const { found, types } = CompletionTypeResolver.getTypes(element);

    return { element, query, found, types };
  }

  getElementForCompletion(line, column) {
    const e = this.getElement(line, column);
    return TreeUtils.findAnyParent(e, CypherTypes.COMPLETION_CANDIDATES) || e;
  }

  getCompletion(line, column, doFilter = true) {
    let info = this.getCompletionInfo(line, column);

    // Shift by one symbol back and try again.
    if (!info.found && column > 0) {
      const prevInfo = this.getCompletionInfo(line, column - 1);
      if (prevInfo.found) {
        info = prevInfo;
      }
    }
    const { element, query, found, types } = info;

    const replaceRange = {
      from: { line, column },
      to: { line, column },
    };
    let filter = null;

    const shouldBeReplaced = AutoCompletion.shouldBeReplaced(element);
    if (found && shouldBeReplaced) {
      // There are number of situations where we need to be smarter than default behavior
      const { start, stop } = TreeUtils.getPosition(element);
      const smartReplaceRange = AutoCompletion.calculateSmartReplaceRange(element, start, stop);
      if (smartReplaceRange) {
        replaceRange.from = this.positionConverter.toRelative(smartReplaceRange.start);
        replaceRange.to = this.positionConverter.toRelative(smartReplaceRange.stop + 1);

        if (smartReplaceRange.filterText) {
          filter = smartReplaceRange.filterText;
        }
      } else {
        replaceRange.from = this.positionConverter.toRelative(start);
        replaceRange.to = this.positionConverter.toRelative(stop + 1);
      }
    }

    if (filter === null) {
      filter = doFilter && found && shouldBeReplaced ? element.getText() : '';
    }
    return {
      items: this.completion.getItems(types, {
        filter,
        query,
        elementType: element ? element.constructor.name : 'unknown',
      }),
      ...replaceRange,
    };
  }

  applyHighlighthing(callback) {
    CypherSyntaxHighlight.process(this.parseTree, callback);
  }
}
