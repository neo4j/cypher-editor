import {
  autocompletion as autocompletionExtension,
  completionKeymap,
  completionStatus,
  acceptCompletion,
  closeBrackets as closeBracketsExtension,
  closeBracketsKeymap
} from "@codemirror/autocomplete";
import {
  history as historyExtension,
  defaultKeymap,
  historyKeymap,
  indentMore,
  indentLess
} from "@codemirror/commands";
import {
  StreamLanguage,
  indentOnInput,
  foldKeymap,
  syntaxHighlighting,
  HighlightStyle,
  indentUnit as indentUnitExtension,
  bracketMatching as bracketMatchingExtension
} from "@codemirror/language";
import { linter, lintKeymap } from "@codemirror/lint";
import { searchKeymap, search } from "@codemirror/search";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  lineNumbers as lineNumbersExtension,
  drawSelection as drawSelectionExtension,
  rectangularSelection as rectangularSelectionExtension,
  crosshairCursor as crosshairCursorExtension,
  keymap,
  placeholder as placeholderExtension,
  tooltips
} from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { TreeUtils } from "@neo4j-cypher/editor-support";

import {
  THEME_LIGHT,
  THEME_DARK,
  THEME_AUTO,
  THEME_NONE
} from "./cypher-codemirror-base";
import { cypher } from "./cypher";
import {
  typeMarkerField,
  addTypeMarkerEffect,
  clearTypeMarkersEffect,
  editorSupportField
} from "./cypher-state-definitions";
import {
  getStateEditorSupport,
  getStateLineCount,
  getStateValue,
  getStatePositionAbsoluteForLineColumn,
  getStatePositionForAbsolute,
  getStateHasSelection
} from "./cypher-state-selectors";

const typeMarkerTheme = EditorView.baseTheme({
  // ".cm-underline": { textDecoration: "underline 3px red" }
});

const typeMarkerFromTo = (view, options = {}) => {
  const effects = [addTypeMarkerEffect.of(options)];
  view.dispatch({ effects });
  return true;
};

export const resetColors = (view, editorSupport) => {
  const effects = [clearTypeMarkersEffect.of()];
  view.dispatch({ effects });
};

export const fixColors = (view, editorSupport) => {
  resetColors(view, editorSupport);
  if (!editorSupport.parseTree || !editorSupport.input) {
    return;
  }
  editorSupport.applyHighlighthing((element, type) => {
    const { start: from, stop: to } = TreeUtils.getPosition(element) || {
      start: 0,
      stop: 0
    };
    typeMarkerFromTo(view, { from, to: to + 1, type });
  });
};

export const domListener = ({
  onFocusChanged = () => {},
  onScrollChanged = () => {},
  onKeyDown = () => {},
  onKeyUp = () => {}
}) => [
  EditorView.domEventHandlers({
    focus: () => {
      onFocusChanged(true);
    },
    blur: () => {
      onFocusChanged(false);
    },
    scroll: (event, view) => {
      if (event.target === view.scrollDOM) {
        const {
          scrollTop,
          clientHeight,
          scrollHeight,
          scrollLeft,
          clientWidth,
          scrollWidth
        } = event.target;
        onScrollChanged({
          scrollTop,
          clientHeight,
          scrollHeight,
          scrollLeft,
          clientWidth,
          scrollWidth
        });
      }
    },
    keydown: (event) => {
      onKeyDown(event);
    },
    keyup: (event) => {
      onKeyUp(event);
    }
  })
];

export const cypherLinter = ({
  delay = 750,
  showErrors = true,
  ...otherOptions
} = {}) => [
  linter(
    (view) => {
      // Empty editor, no need to lint
      if (!getStateValue(view.state).length) return [];
      const editorSupport = getStateEditorSupport(view.state);
      if (!editorSupport) return [];
      const version = view.newContentVersion();
      editorSupport.update(getStateValue(view.state), version);

      fixColors(view, editorSupport);

      return ((showErrors && editorSupport.parseErrors) || []).map(
        ({ msg, start, stop }) => {
          return {
            severity: "error",
            from: start,
            to: stop + 1,
            message: msg
          };
        }
      );
    },
    { ...otherOptions, delay }
  )
];

export const cypherLanguage = () => [StreamLanguage.define(cypher)];

const cypherCompletions = (context) => {
  const editorSupport = getStateEditorSupport(context.state);
  editorSupport.update(getStateValue(context.state));

  const { line, column } = editorSupport.positionConverter.toRelative(
    context.pos
  );
  const completion = editorSupport.getCompletion(line, column, true);
  const { items, from, to } = completion;
  const completions = items.map(({ type, view, content, postfix }) => ({
    type,
    label: view,
    apply: content,
    detail: postfix
  }));
  let word = context.matchBefore(/\w*/);
  let cypherCompletions = null;
  if (!(word.from == word.to && !context.explicit)) {
    cypherCompletions = {
      //from: word.from,
      // TODO - line is 1 based, column is 0 based
      from: getStatePositionAbsoluteForLineColumn(context.state, from),
      options: completions,
      filter: false,
      getMatch: () => []
    };
  }
  return cypherCompletions;
};

export const cypherCompletion = ({
  activateOnTyping = false /* Could be made an option... */,
  closeOnBlur = true
} = {}) => [
  autocompletionExtension({
    activateOnTyping,
    closeOnBlur,
    override: [cypherCompletions]
  })
];

const syntaxStyles = [
  { tag: tags.comment, class: "cm-comment" },
  { tag: tags.variableName, class: "cm-variable" },
  {
    tag: [tags.string, tags.special(tags.brace)],
    class: "cm-string"
  },
  { tag: tags.number, class: "cm-number" },
  { tag: tags.keyword, class: "cm-keyword" },
  { tag: tags.operator, class: "cm-operator" }
];

const syntaxStyle = HighlightStyle.define(syntaxStyles);
export const syntaxCSS = [syntaxHighlighting(syntaxStyle)];

export const cypherLineNumbers = ({
  lineNumberFormatter,
  onLineNumberClick = () => {}
}) => [
  lineNumbersExtension({
    formatNumber: (number, state) =>
      lineNumberFormatter(number, getStateLineCount(state), state),
    domEventHandlers: {
      click(view, lineObject, event) {
        const { line } =
          getStatePositionForAbsolute(view.state, lineObject.from) || {};
        onLineNumberClick(line, event);
        return true;
      }
    }
  })
];

// EXTENSIONS COLLECTIONS

const themeOverrides = {
  "&.cm-editor": {
    "&.cm-focused": {
      outline: "none"
    }
  },
  ".cm-cursor .cm-cursor-wide": {
    borderLeft: "0.67em solid rgba(147, 161, 161, 0.37)"
  }
};

const USE_DARK_FLAG = true;

const themeDarkExtensions = [
  EditorView.theme(themeOverrides, USE_DARK_FLAG ? { dark: true } : {}),
  EditorView.editorAttributes.of({ class: "cm-dark" })
];

const themeLightExtensions = [
  EditorView.theme(themeOverrides, USE_DARK_FLAG ? { dark: false } : {}),
  EditorView.editorAttributes.of({ class: "cm-light" })
];

const themeNone = [
  EditorView.theme(themeOverrides, {}),
  EditorView.editorAttributes.of({ class: "cm-none" })
];

const themeAutoExtensions = [
  EditorView.theme(themeOverrides, {}),
  EditorView.editorAttributes.of({ class: "cm-auto" })
];

const cursorWideExtensions = [
  EditorView.editorAttributes.of({ class: "cm-cursor-wide" })
];

const cursorNormalExtensions = [
  EditorView.editorAttributes.of({ class: "cm-cursor-normal" })
];

const runTab = (view) => {
  const { state, dispatch } = view;
  const status = completionStatus(state);

  if (status === null) {
    if (getStateHasSelection(state)) {
      return indentMore(view);
    } else {
      dispatch(
        state.update(state.replaceSelection(state.facet(indentUnitExtension)), {
          scrollIntoView: true,
          userEvent: "input"
        })
      );
      return true;
    }
  } else if (status === "active") {
    return acceptCompletion(view);
  }
  return false;
};

const shiftTab = (view) => {
  const { state } = view;
  const status = completionStatus(state);
  if (status === null && getStateHasSelection(state)) {
    return indentLess(view);
  }
  return false;
};

export const tabKeyExtensions = [
  keymap.of([{ key: "Tab", run: runTab, shift: shiftTab }])
];

export const historyExtensions = [historyExtension(), keymap.of(historyKeymap)];

const searchTopExtensions = [search({ top: true }), keymap.of(searchKeymap)];

const searchBottomExtensions = [
  search({ top: false }),
  keymap.of(searchKeymap)
];

export const readableExtensions = [
  drawSelectionExtension(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  rectangularSelectionExtension(),
  crosshairCursorExtension(),
  keymap.of([...defaultKeymap, ...foldKeymap])
];

export const readOnlyExtensions = [EditorState.readOnly.of(true)];

export const readOnlyNoCursorExtensions = [
  EditorState.readOnly.of(true),
  EditorView.editable.of(false)
];

export const lineWrappingExtensions = [EditorView.lineWrapping];

export const useLintExtensions = [cypherLinter(), keymap.of(lintKeymap)];

export const useNoLintExtensions = [cypherLinter({ showErrors: false })];

export const useAutocompleteExtensions = [
  cypherCompletion(),
  keymap.of(completionKeymap)
];

export const useStickyAutocompleteExtensions = [
  cypherCompletion({ closeOnBlur: false }),
  keymap.of(completionKeymap)
];

// GETTERS

export const getCypherLanguageExtensions = ({ cypherLanguage: cypher }) =>
  cypher
    ? [
        cypherLanguage(),
        typeMarkerField,
        typeMarkerTheme,
        editorSupportField,
        syntaxCSS,
        EditorView.editorAttributes.of({ class: "cm-cypher" })
      ]
    : [];

export const getAutocompleteExtensions = ({
  cypherLanguage,
  readOnly,
  autocomplete,
  autocompleteCloseOnBlur
}) =>
  cypherLanguage && readOnly === false && autocomplete
    ? !autocompleteCloseOnBlur
      ? useStickyAutocompleteExtensions
      : useAutocompleteExtensions
    : [];

export const getCursorWideExtensions = ({ cursorWide }) =>
  cursorWide ? cursorWideExtensions : cursorNormalExtensions;

export const getHistoryExtensions = ({ history }) =>
  history ? historyExtensions : [];

export const getLineNumbersExtensions = ({
  lineNumbers,
  lineNumberFormatter,
  onLineNumberClick
}) =>
  lineNumbers
    ? [cypherLineNumbers({ lineNumberFormatter, onLineNumberClick })]
    : [];

export const getLineWrappingExtensions = ({ lineWrapping }) =>
  lineWrapping ? lineWrappingExtensions : [];

export const getLintExtensions = ({ cypherLanguage, readOnly, lint }) =>
  cypherLanguage && readOnly === false && lint
    ? useLintExtensions
    : useNoLintExtensions;

export const getPlaceholderExtensions = ({ placeholder }) =>
  placeholder !== undefined ? [placeholderExtension(placeholder)] : [];

export const getReadableExtensions = ({ readOnly, readOnlyCursor }) =>
  !readOnly || readOnlyCursor ? readableExtensions : [];

export const getReadOnlyExtensions = ({ readOnly, readOnlyCursor }) =>
  readOnly
    ? readOnlyCursor
      ? readOnlyExtensions
      : readOnlyNoCursorExtensions
    : [];

export const getTabKeyExtensions = ({ tabKey, indentUnit }) =>
  tabKey ? tabKeyExtensions.concat(indentUnitExtension.of(indentUnit)) : [];

export const getThemeExtensions = ({ theme }) =>
  ({
    [THEME_DARK]: themeDarkExtensions,
    [THEME_LIGHT]: themeLightExtensions,
    [THEME_AUTO]: themeAutoExtensions,
    [THEME_NONE]: themeNone
  }[theme] ?? themeLightExtensions);

export const getSearchExtensions = ({ readOnly, search, searchTop }) =>
  search ? (searchTop ? searchTopExtensions : searchBottomExtensions) : [];

export const getTooltipAbsoluteExtensions = ({ tooltipAbsolute }) =>
  tooltipAbsolute
    ? [tooltips({ position: "absolute" })]
    : [tooltips({ position: "fixed" })];

export const getCloseBracketsExtensions = ({ closeBrackets }) =>
  closeBrackets
    ? [closeBracketsExtension(), keymap.of(closeBracketsKeymap)]
    : [];

export const getBracketMatchingExtensions = ({ bracketMatching }) =>
  bracketMatching ? [bracketMatchingExtension()] : [];
