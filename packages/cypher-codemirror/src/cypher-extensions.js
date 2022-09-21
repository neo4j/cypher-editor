import {
  autocompletion as autocompletionExtension,
  completionKeymap
} from "@codemirror/autocomplete";
import {
  history as historyExtension,
  defaultKeymap,
  historyKeymap
} from "@codemirror/commands";
import {
  StreamLanguage,
  indentOnInput,
  foldKeymap,
  syntaxHighlighting,
  HighlightStyle
} from "@codemirror/language";
import { linter, lintKeymap } from "@codemirror/lint";
import { searchKeymap } from "@codemirror/search";
import { EditorState, StateEffect } from "@codemirror/state";
import {
  EditorView,
  lineNumbers as lineNumbersExtension,
  drawSelection as drawSelectionExtension,
  rectangularSelection as rectangularSelectionExtension,
  crosshairCursor as crosshairCursorExtension,
  keymap,
  placeholder as placeholderExtension
} from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { THEME_DARK } from "cypher-codemirror-base";
import { TreeUtils } from "cypher-editor-support";

import { cypher } from "./cypher";
import {
  typeMarkerField,
  addTypeMarkerEffect,
  clearTypeMarkersEffect
} from "./cypher-state-definitions";
import {
  getStateEditorSupport,
  getStateLineCount,
  getStateValue,
  getStatePositionAbsoluteForLineColumn
} from "./cypher-state-selectors";

const typeMarkerTheme = EditorView.baseTheme({
  // ".cm-underline": { textDecoration: "underline 3px red" }
});

const typeMarkerFromTo = (view, options = {}) => {
  let effects = [addTypeMarkerEffect.of(options)];

  if (!view.state.field(typeMarkerField, false)) {
    effects.push(
      StateEffect.appendConfig.of([typeMarkerField, typeMarkerTheme])
    );
  }
  view.dispatch({ effects });
  return true;
};

export const fixColors = (view, editorSupport) => {
  view.dispatch(clearTypeMarkersEffect.of());
  if (editorSupport.parseTree == null) {
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

export const focusListener = ({ onFocusChanged = () => {} }) => [
  EditorView.domEventHandlers({
    focus: () => {
      onFocusChanged(true);
    },
    blur: () => {
      onFocusChanged(false);
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
  const completions = items.map(({ type, view, postfix }) => ({
    type,
    label: view,
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
  activateOnTyping = false,
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
  onLineNumberClicked = () => {}
}) => [
  lineNumbersExtension({
    formatNumber: (number, state) =>
      lineNumberFormatter(number, getStateLineCount(state), state),
    domEventHandlers: {
      click(view, lineObject, event) {
        const { line } =
          getStatePositionForAbsolute(view.state, lineObject.from) || {};
        onLineNumberClicked(line, event);
        return true;
      }
    }
  })
];

// EXTENSIONS COLLECTIONS

const darkExtensions = [
  EditorView.theme({}, { dark: true }),
  EditorView.editorAttributes.of({ class: "cm-dark" })
];

export const historyExtensions = [historyExtension()];

export const readableExtensions = [
  drawSelectionExtension(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  rectangularSelectionExtension(),
  crosshairCursorExtension(),
  keymap.of([
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap
  ])
];

export const readOnlyExtensions = [EditorState.readOnly.of(true)];

export const readOnlyNoCursorExtensions = [
  EditorState.readOnly.of(true),
  EditorView.editable.of(false)
];

export const lineWrappingExtensions = [EditorView.lineWrapping];

export const useLintExtensions = [cypherLinter()];

export const useNoLintExtensions = [cypherLinter({ showErrors: false })];

export const useAutocompleteExtensions = [cypherCompletion()];

export const useStickyAutocompleteExtensions = [
  cypherCompletion({ closeOnBlur: false })
];

// GETTERS

export const getReadableExtensions = ({ readOnly, readOnlyCursor }) =>
  !readOnly || readOnlyCursor ? readableExtensions : [];

export const getReadOnlyExtensions = ({ readOnly, readOnlyCursor }) =>
  readOnly
    ? readOnlyCursor
      ? readOnlyExtensions
      : readOnlyNoCursorExtensions
    : [];

export const getPlaceholderExtensions = ({ placeholder }) =>
  placeholder !== undefined ? [placeholderExtension(placeholder)] : [];

export const getThemeExtensions = ({ theme }) =>
  theme === THEME_DARK ? darkExtensions : [];

export const getLineNumbersExtensions = ({
  lineNumbers,
  lineNumberFormatter,
  onLineNumberClicked
}) =>
  lineNumbers
    ? [cypherLineNumbers({ lineNumberFormatter, onLineNumberClicked })]
    : [];

export const getAutocompleteExtensions = ({
  readOnly,
  autocomplete,
  autocompleteCloseOnBlur
}) =>
  readOnly === false && autocomplete
    ? !autocompleteCloseOnBlur
      ? useStickyAutocompleteExtensions
      : useAutocompleteExtensions
    : [];

export const getLineWrappingExtensions = ({ lineWrapping }) =>
  lineWrapping ? lineWrappingExtensions : [];

export const getHistoryExtensions = ({ history }) =>
  history ? historyExtensions : [];

export const getLintExtensions = ({ readOnly, lint }) =>
  readOnly === false && lint ? useLintExtensions : useNoLintExtensions;
