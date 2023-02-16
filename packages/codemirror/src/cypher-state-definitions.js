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
        typeMarkers = Decoration.none;
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
