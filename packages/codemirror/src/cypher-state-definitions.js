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

import { StateEffect, StateField } from "@codemirror/state";
import { EditorView, Decoration } from "@codemirror/view";
import { CypherEditorSupport } from "@neo4j-cypher/editor-support";

export const editorSupportField = StateField.define({
  create() {
    return new CypherEditorSupport();
  },
  update(editorSupport, tr) {
    return editorSupport;
  }
});

export const addTypeMarkerEffect = StateEffect.define();
export const clearTypeMarkersEffect = StateEffect.define();

export const typeMarkerField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(typeMarkers, tr) {
    typeMarkers = typeMarkers.map(tr.changes);
    for (let e of tr.effects) {
      if (e.is(clearTypeMarkersEffect)) {
        typeMarkers = typeMarkers.filter(() => false);
      } else if (e.is(addTypeMarkerEffect)) {
        if (e.value.from !== e.value.to) {
          typeMarkers = typeMarkers.update({
            add: [
              Decoration.mark({ class: "cm-p-" + e.value.type }).range(
                e.value.from,
                e.value.to
              )
            ]
          });
        }
      }
    }
    return typeMarkers;
  },
  provide: (f) => EditorView.decorations.from(f)
});
