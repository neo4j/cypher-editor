import * as React from "react";
import type { Extension, EditorSelection } from "@codemirror/state";
import type { EditorSupportSchema } from "@neo4j-cypher/editor-support";
import type {
  PositionAny,
  Theme,
  AutofocusProp,
  EditorCreatedListener,
  AutocompleteChangedListener,
  PositionChangedListener,
  FocusChangedListener,
  ScrollChangedListener,
  SearchChangedListener,
  ValueChangedListener,
  KeyListener,
  LineNumberClickListener,
  LineNumberFormatter,
  SelectionChangedListener
} from "@neo4j-cypher/codemirror";

/**
 * Interface for React Cypher Editor component props
 */
export interface CypherEditorProps {
  /**
   * Whether the autocomplete feature is enabled
   *
   * @defaultValue `true`
   */
  autocomplete?: boolean;
  /**
   * Whether the autocomplete auto closes whenever the editor loses focus
   *
   * @defaultValue `true`
   */
  autocompleteCloseOnBlur?: boolean;
  /**
   * Whether the autocomplete panel is open
   *
   * @remarks
   *
   * Changing this can be used to manually control the autocomplete open state
   *
   * @defaultValue `false`
   */
  autocompleteOpen?: boolean;
  /**
   * The keys that when typed will automatically open the autocomplete menu
   *
   * @defaultValue [".",":","[]","()","{}","[","(","{","$"]
   */
  autocompleteTriggerStrings?: string[];
  /**
   * Whether the editor should be auto focused on first creation
   *
   * @defaultValue true
   */
  autofocus?: boolean;
  /**
   * setting any of these props will trigger the editor gaining focus
   *
   * @defaultValue ["position", "readOnly", "value"]
   */
  autofocusProps?: AutofocusProp[];
  /**
   * Whether to show matching brackets in the editor view
   *
   * @defaultValue true
   */
  bracketMatching?: boolean;
  /**
   * Setting any of these props will trigger the editor to clear its undo/redo history
   *
   * @defaultValue ["cypherLanguage"]
   */
  clearHistoryProps?: AutofocusProp[];
  /**
   * Whether to automatically close brackets or wrap selected text with quotes on quote press
   *
   * @defaultValue true
   */
  closeBrackets?: boolean;
  /**
   * Whether the wide cursor should be shown
   *
   * @defaultValue true
   */
  cursorWide?: boolean;
  /**
   * Whether or not cypher language extensions are enabled
   *
   * @defaultValue true
   */
  cypherLanguage?: boolean;
  /**
   * Whether the editor maintains an undo/redo history
   *
   * @defaultValue true
   */
  history?: boolean;
  /**
   * The indent text to use when tabKey is enabled
   *
   * @defaultValue "  "
   */
  indentUnit?: string;
  /**
   * The formatter for the line numbers of the editor
   *
   * @defaultValue (line, lineCount) => lineCount === 1 ? "$" : line + "";
   */
  lineNumberFormatter?: LineNumberFormatter;
  /**
   * Whether line numbers are shown to the left of the editor ui
   *
   * @defaultValue true
   */
  lineNumbers?: boolean;
  /**
   * Whether the editor wraps lines vs using a horizontal scrollbar
   *
   * @defaultValue false
   */
  lineWrapping?: boolean;
  /**
   * Whether the editor should display lint errors to the user
   *
   * @defaultValue false
   */
  lint?: boolean;
  /**
   * Whether to run the cypher language parser immediately after every call to set the value
   *
   * @defaultValue true
   */
  parseOnSetValue?: boolean;
  /**
   * The text to be shown to the user when the editor value is empty
   */
  placeholder?: string;
  /**
   * The editor cursor position
   */
  position?: PositionAny;
  /**
   * Whether the editor is read only or the user can edit the editor's value
   *
   * @defaultValue false
   */
  readOnly?: boolean;
  /**
   * Whether to show the cursor when the editor readOnly is true
   *
   * @defaultValue false
   */
  readOnlyCursor?: boolean;
  /**
   * The schema making the editor aware of things such as node labels & relationship types & procedures in the current graph database
   */
  schema?: EditorSupportSchema;
  /**
   * Whether search is enabled
   *
   * @defaultValue true
   */
  search?: boolean;
  /**
   * The max number of search matches to be included with search changed callbacks
   *
   * @remarks
   *
   * Must be between 0 and 1000, 0 means no searching for matches (better for performance)
   *
   * @defaultValue 0
   */
  searchMatches?: number;
  /**
   * Whether the search panel is open
   *
   * @remarks
   *
   * Changing this can be used to manually control the search open state
   *
   * @defaultValue `false`
   */
  searchOpen?: boolean;
  /**
   * The search text for the search panel
   *
   * @remarks
   *
   * Changing this can be used to manually control the search panel text
   *
   * @defaultValue ""
   */
  searchText?: string;
  /**
   * Whether search is shown at the top of the editor window
   *
   * @defaultValue false
   */
  searchTop?: boolean;
  /**
   * The editor text selection
   *
   * @defaultValue undefined
   */
  selection?: EditorSelection;
  /**
   * Whether the tab key is enabled
   *
   * @defaultValue true
   */
  tabKey?: boolean;
  /**
   * Whether to use the light or dark theme for the editor
   *
   * @defaultValue "light"
   */
  theme?: Theme;
  /**
   * Whether or not the tooltips use simple absolute position styling (vs trying to stay within bounds)
   *
   * @defaultValue true
   */
  tooltipAbsolute?: boolean;
  /**
   * The editor text value
   *
   * @defaultValue ""
   */
  value?: string;
  /**
   * A css class name to be added to the root editor dom element
   */
  className?: string;
  /**
   * A css class name to be added to the root editor dom element when it is focused
   */
  focusedClassName?: string;
  /**
   * a style prop to be applied to the root editor dom element
   */
  style?: React.CSSProperties;
  /**
   * A listener for when the editor api gets created
   */
  onEditorCreated?: EditorCreatedListener;
  /**
   * A listener for when the editor value changes
   */
  onValueChanged?: ValueChangedListener;
  /**
   * A listener for when the editor focus changes
   */
  onFocusChanged?: FocusChangedListener;
  /**
   * A listener for when the editor scroll position changes
   */
  onScrollChanged?: ScrollChangedListener;
  /**
   * A listener for when the editor cursor position changes
   */
  onPositionChanged?: PositionChangedListener;
  /**
   * A listener for when the editor autocompletion state changes
   */
  onAutocompleteChanged?: AutocompleteChangedListener;
  /**
   * A listener for when the editor search state changes
   */
  onSearchChanged?: SearchChangedListener;
  /**
   * A listener for when the editor text selection changes
   */
  onSelectionChanged?: SelectionChangedListener;
  /**
   * A listener for when the user clicks an editor line number
   */
  onLineNumberClick?: LineNumberClickListener;
  /**
   * A listener for when the user performs a key down in the editor
   */
  onKeyDown?: KeyListener;
  /**
   * A listener for when the user performs a key up in the editor
   */
  onKeyUp?: KeyListener;

  /**
   * The codemirror 6 extensions that should be added to the editor before the cypher language support extensions.
   *
   * @defaultValue undefined
   */
  preExtensions?: Extension[];
  /**
   * The codemirror 6 extensions that should be added to the editor after the cypher language support extensions.
   *
   * @defaultValue undefined
   */
  postExtensions?: Extension[];
}

/**
 * Cypher Editor React Component
 */
export default class CypherEditor extends React.Component<
  CypherEditorProps,
  any
> {}
