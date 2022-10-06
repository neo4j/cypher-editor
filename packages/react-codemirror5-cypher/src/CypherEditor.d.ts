import * as React from "react";
import type { EditorChange } from "codemirror";
import type { EditorSupportSchema } from "cypher-editor-support";
import type { EditorApi } from "cypher-codemirror5";
import type {
  ScrollInfo,
  PositionObject,
  PositionAny,
  Theme,
  AutocompleteOption
} from "cypher-codemirror-base";

export interface CypherEditorProps {
  autocomplete?: boolean;
  autocompleteCloseOnBlur?: boolean;
  autocompleteOpen?: boolean;
  autocompleteSchema?: EditorSupportSchema;
  autocompleteTriggerStrings?: string[];
  history?: boolean;
  lineNumberFormatter?: (lineNumber: number, lineCount: number) => string;
  lineNumbers?: boolean;
  lineWrapping?: boolean;
  lint?: boolean;
  placeholder?: string;
  position?: PositionAny;
  readOnly?: boolean;
  readOnlyCursor?: boolean;
  theme?: Theme;
  value?: string;
  className?: string;
  focusedClassName?: string;
  autofocus?: boolean;
  parseOnSetValue?: boolean;

  onEditorCreated?: (editor: EditorApi) => void;
  onValueChanged?: (value: string, changes: EditorChange) => void;
  onFocusChanged?: (focused: boolean) => void;
  onScrollChanged?: (scrollInfo: ScrollInfo) => void;
  onPositionChanged?: (position: PositionObject) => void;
  onAutocompleteChanged?: (
    open: boolean,
    from: number,
    options: AutocompleteOption[]
  ) => void;
  onLineNumberClick?: (lineNumber: number, event: Event) => void;
  onKeyDown?: (event: KeyboardEvent) => void;

  // TODO - add props for codemirror (cm5) options?
  // codemirrorOptions: any
}

declare class CypherEditor extends React.Component<CypherEditorProps, any> {}

export default CypherEditor;
