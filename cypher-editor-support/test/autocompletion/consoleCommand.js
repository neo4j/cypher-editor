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
  });

  describe('without filters', () => {
    it('yields command names if colon', () => {
      const expected = {
        from: { line: 1, column: 0 },
        to: { line: 1, column: 1 },
        items: [
          { type: 'consoleCommand', view: ':clear', content: ':clear', postfix: null },
          { type: 'consoleCommand', view: ':play', content: ':play', postfix: null },
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
  });
});
