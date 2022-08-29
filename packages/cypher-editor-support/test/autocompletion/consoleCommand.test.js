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

import { checkCompletion, checkCompletionTypes } from './util';
import * as CompletionTypes from '../../src/completion/CompletionTypes';

describe('AutoCompletion - Console Command', () => {
  describe('types', () => {
    it('yields consoleCommand type at the command colon', () => {
      checkCompletionTypes('▼:', true, [{ type: CompletionTypes.CONSOLE_COMMAND_NAME }]);
    });

    it('yields consoleCommand type at the command name', () => {
      checkCompletionTypes(':▼p', true, [{ type: CompletionTypes.CONSOLE_COMMAND_NAME }]);
    });

    it('yields consoleCommand at subcommand', () => {
      checkCompletionTypes(':help▼ ', true, [{
        type: CompletionTypes.CONSOLE_COMMAND_SUBCOMMAND,
        path: [':help'],
        filterLastElement: false,
      }]);
    });

    it('yields consoleCommand at subcommand partly', () => {
      checkCompletionTypes(':help m▼a', true, [{
        type: CompletionTypes.CONSOLE_COMMAND_SUBCOMMAND,
        path: [':help', 'ma'],
        filterLastElement: true,
      }]);
    });

    it('yields consoleCommand at subcommand at subcommand', () => {
      checkCompletionTypes(':server user▼ ', true, [{
        type: CompletionTypes.CONSOLE_COMMAND_SUBCOMMAND,
        path: [':server', 'user'],
        filterLastElement: false,
      }]);
    });

    it('yields consoleCommand at subcommand at subcommand partly', () => {
      checkCompletionTypes(':server user l▼i', true, [{
        type: CompletionTypes.CONSOLE_COMMAND_SUBCOMMAND,
        path: [':server', 'user', 'li'],
        filterLastElement: true,
      }]);
    });
  });

  describe('without filters', () => {
    it('yields command names if colon', () => {
      const expected = {
        from: { line: 1, column: 0 },
        to: { line: 1, column: 1 },
        items: [
          { type: 'consoleCommand', view: ':clear', content: ':clear', postfix: null },
          { type: 'consoleCommand', view: ':play', content: ':play', postfix: null },
          { type: 'consoleCommand', view: ':help', content: ':help', postfix: 'helpdesc' },
          { type: 'consoleCommand', view: ':server', content: ':server', postfix: null },
        ],
      };
      checkCompletion(':▼', expected);
    });

    it('yields command names if half written', () => {
      const expected = {
        from: { line: 1, column: 0 },
        to: { line: 1, column: 3 },
        items: [
          { type: 'consoleCommand', view: ':clear', content: ':clear', postfix: null },
          { type: 'consoleCommand', view: ':play', content: ':play', postfix: null },
          { type: 'consoleCommand', view: ':help', content: ':help', postfix: 'helpdesc' },
          { type: 'consoleCommand', view: ':server', content: ':server', postfix: null },
        ],
      };
      checkCompletion(':▼pl', expected);
      checkCompletion(':pl▼', expected);
    });
  });

  describe('with filters', () => {
    it('yields command names if half written', () => {
      const expected = {
        from: { line: 1, column: 0 },
        to: { line: 1, column: 3 },
        items: [
          { type: 'consoleCommand', view: ':play', content: ':play', postfix: null },
        ],
      };
      checkCompletion(':▼pl', expected, true);
      checkCompletion(':pl▼', expected, true);
    });

    it('yields help subcommand', () => {
      const expected = {
        from: { line: 1, column: 6 },
        to: { line: 1, column: 6 },
        items: [
          { type: 'consoleCommandSubcommand', view: 'match', content: 'match', postfix: null },
          { type: 'consoleCommandSubcommand', view: 'create', content: 'create', postfix: null },
        ],
      };
      checkCompletion(':help ▼', expected, true);
    });

    it('yields help subcommand partly', () => {
      const expected = {
        from: { line: 1, column: 6 },
        to: { line: 1, column: 8 },
        items: [
          { type: 'consoleCommandSubcommand', view: 'match', content: 'match', postfix: null },
        ],
      };
      checkCompletion(':help ma▼', expected, true);
    });

    it('yields server subcommand subcommand', () => {
      const expected = {
        from: { line: 1, column: 13 },
        to: { line: 1, column: 13 },
        items: [
          { type: 'consoleCommandSubcommand', view: 'list', content: 'list', postfix: 'listdesc' },
          { type: 'consoleCommandSubcommand', view: 'add', content: 'add', postfix: null },
        ],
      };
      checkCompletion(':server user ▼', expected, true);
    });

    it('yields server subcommand subcommand partly', () => {
      const expected = {
        from: { line: 1, column: 13 },
        to: { line: 1, column: 15 },
        items: [
          { type: 'consoleCommandSubcommand', view: 'list', content: 'list', postfix: 'listdesc' },
        ],
      };
      checkCompletion(':server user li▼', expected, true);
    });

    it('yields server subcommand subcommand no subcommand', () => {
      const expected = {
        from: { line: 1, column: 18 },
        to: { line: 1, column: 18 },
        items: [],
      };
      checkCompletion(':server user list ▼', expected, true);
    });
  });
});
