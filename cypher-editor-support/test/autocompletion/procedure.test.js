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

describe('AutoCompletion - Procedure', () => {
  describe('types', () => {
    it('return procedure name type', () => {
      checkCompletionTypes('call ▼db.proc()', true, [{ type: CompletionTypes.PROCEDURE_NAME }]);
    });

    it('return procedure name type if only call present', () => {
      checkCompletionTypes('call▼ ', true, [{ type: CompletionTypes.PROCEDURE_NAME }]);
    });

    it('return output at the beginning of yield', () => {
      checkCompletionTypes('call db.proc() yield▼ ', true, [{
        type: CompletionTypes.PROCEDURE_OUTPUT,
        name: 'db.proc',
      }]);
    });

    it('return output before the first typed symbol', () => {
      checkCompletionTypes('call db.proc() yield ▼a', true, [{
        type: CompletionTypes.PROCEDURE_OUTPUT,
        name: 'db.proc',
      }]);
    });

    it('return output at the beggining of second output', () => {
      checkCompletionTypes('call db.proc() yield a as b,▼ ', true, [{
        type: CompletionTypes.PROCEDURE_OUTPUT,
        name: 'db.proc',
      }]);
    });
  });

  describe('without filters', () => {
    it('yields procedure name list', () => {
      const expected = {
        from: { line: 1, column: 5 },
        to: { line: 1, column: 8 },
        items: [
          { type: 'procedure', view: 'db.indexes', content: 'db.indexes', postfix: '()' },
          {
            type: 'procedure',
            view: 'org.neo4j.graph.traverse',
            content: 'org.neo4j.graph.traverse',
            postfix: 'expression',
          },
        ],
      };
      checkCompletion('call ▼d.p', expected);
      checkCompletion('call d▼.p', expected);
      checkCompletion('call d.▼p', expected);
      checkCompletion('call d.p▼', expected);
    });

    it('yields procedure name list if only call present', () => {
      const expected = {
        from: { line: 1, column: 5 },
        to: { line: 1, column: 5 },
        items: [
          { type: 'procedure', view: 'db.indexes', content: 'db.indexes', postfix: '()' },
          {
            type: 'procedure',
            view: 'org.neo4j.graph.traverse',
            content: 'org.neo4j.graph.traverse',
            postfix: 'expression',
          },
        ],
      };
      checkCompletion('call ▼', expected);
    });
  });

  describe('with filters', () => {
    it('yields procedure name list', () => {
      const expected = {
        from: { line: 1, column: 5 },
        to: { line: 1, column: 9 },
        items: [
          { type: 'procedure', view: 'db.indexes', content: 'db.indexes', postfix: '()' },
        ],
      };
      checkCompletion('call ▼db.i', expected, true);
      checkCompletion('call d▼b.i', expected, true);
      checkCompletion('call db▼.i', expected, true);
      checkCompletion('call db.▼i', expected, true);
      checkCompletion('call db.i▼', expected, true);
    });

    describe('YIELD returnItems', () => {
      it('yields all procedure returnItems', () => {
        const expected = {
          from: { line: 1, column: 24 },
          to: { line: 1, column: 24 },
          items: [
            { type: 'procedureOutput', view: 'description', content: 'description', postfix: ' :: STRING?' },
            { type: 'procedureOutput', view: 'state', content: 'state', postfix: ' :: STRING?' },
            { type: 'procedureOutput', view: 'type', content: 'type', postfix: ' :: STRING?' },
          ],
        };
        checkCompletion('call db.indexes() yield ▼', expected, true);
      });

      it('yields all procedure returnItems after first symbol is typed', () => {
        const expected = {
          from: { line: 1, column: 24 },
          to: { line: 1, column: 25 },
          items: [
            { type: 'procedureOutput', view: 'state', content: 'state', postfix: ' :: STRING?' },
          ],
        };
        checkCompletion('call db.indexes() yield a▼', expected, true);
      });

      it('yields all procedure returnItems after expression', () => {
        const expected = {
          from: { line: 1, column: 32 },
          to: { line: 1, column: 32 },
          items: [
            { type: 'procedureOutput', view: 'description', content: 'description', postfix: ' :: STRING?' },
            { type: 'procedureOutput', view: 'state', content: 'state', postfix: ' :: STRING?' },
            { type: 'procedureOutput', view: 'type', content: 'type', postfix: ' :: STRING?' },
          ],
        };
        checkCompletion('call db.indexes() yield a as b, ▼', expected, true);
      });
    });
  });
});
