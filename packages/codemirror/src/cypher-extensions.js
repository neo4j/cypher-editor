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

import {
  autocompletion as autocompletionExtension,
  completionKeymap
} from "@codemirror/autocomplete";
import {
  history as historyExtension,
  defaultKeymap,
  historyKeymap,
  indentWithTab
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
import { TreeUtils } from "@neo4j-cypher/editor-support";

import { THEME_DARK } from "./cypher-codemirror-base";
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
  getStatePositionAbsoluteForLineColumn,
  getStatePositionForAbsolute
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

export const domListener = ({
  onFocusChanged = () => {},
  onScrollChanged = () => {},
  onKeyDown = () => {}
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
  }
};

const darkExtensions = [
  EditorView.theme(themeOverrides, { dark: true }),
  EditorView.editorAttributes.of({ class: "cm-dark" })
];

const lightExtensions = [
  EditorView.theme(themeOverrides, { dark: false })
];

export const historyExtensions = [historyExtension()];

export const indentWithTabExtensions = [keymap.of([indentWithTab])];

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
  theme === THEME_DARK ? darkExtensions : lightExtensions;

export const getLineNumbersExtensions = ({
  lineNumbers,
  lineNumberFormatter,
  onLineNumberClick
}) =>
  lineNumbers
    ? [cypherLineNumbers({ lineNumberFormatter, onLineNumberClick })]
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

export const getIndentWithTabExtensions = ({ indentWithTab }) =>
  indentWithTab ? indentWithTabExtensions : []

export const getLintExtensions = ({ readOnly, lint }) =>
  readOnly === false && lint ? useLintExtensions : useNoLintExtensions;
