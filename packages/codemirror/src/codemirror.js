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

// All of these packages are dependencies of "codemirror" package version >= 6;
import {
  startCompletion,
  closeCompletion,
  acceptCompletion,
  setSelectedCompletion,
  completionStatus
  // currentCompletions (could use this if we could get currentCompletionsFrom as well)
} from "@codemirror/autocomplete";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

import {
  defaultOptions as baseDefaultOptions,
  createEventHandlers,
  positionNewToOld,
  positionOldToNew
} from "./cypher-codemirror-base";
import { initEditorSupportEffect } from "./cypher-state-definitions";
import {
  getStatePositionAbsolute,
  getStateEditorSupport,
  getStateLineCount,
  getStateValue,
  getStateLength,
  getStatePosition,
  getStatePositionForAny
} from "./cypher-state-selectors";
import {
  fixColors,
  syntaxCSS,
  domListener,
  cypherLanguage,
  getReadableExtensions,
  getReadOnlyExtensions,
  getPlaceholderExtensions,
  getThemeExtensions,
  getTooltipAbsoluteExtensions,
  getLineNumbersExtensions,
  getAutocompleteExtensions,
  getLineWrappingExtensions,
  getHistoryExtensions,
  getIndentWithTabExtensions,
  getLintExtensions
} from "./cypher-extensions";

export * from "./cypher-codemirror-base";

export * from "./cypher-extensions";

export const getExtensions = (
  options = {},
  {
    lintConf = new Compartment(),
    autocompleteConf = new Compartment(),
    readableConf = new Compartment(),
    readOnlyConf = new Compartment(),
    showLinesConf = new Compartment(),
    lineWrappingConf = new Compartment(),
    historyConf = new Compartment(),
    indentWithTabConf = new Compartment(),
    placeholderConf = new Compartment(),
    themeConf = new Compartment(),
    tooltipAbsoluteConf = new Compartment(),
    onLineNumberClick = () => {},
    onFocusChanged = () => {},
    onScrollChanged = () => {},
    onKeyDown = () => {}
  } = {}
) => {
  const combinedOptions = { ...defaultOptions, ...options };
  const {
    autocomplete,
    autocompleteCloseOnBlur,
    history,
    indentWithTab,
    lineNumberFormatter,
    lineNumbers,
    lineWrapping,
    lint,
    placeholder,
    readOnly,
    readOnlyCursor,
    theme,
    tooltipAbsolute
  } = combinedOptions;

  return [
    domListener({ onFocusChanged, onScrollChanged, onKeyDown }),
    cypherLanguage(),
    lintConf.of(getLintExtensions({ readOnly, lint })),
    autocompleteConf.of(
      getAutocompleteExtensions({
        readOnly,
        autocomplete,
        autocompleteCloseOnBlur
      })
    ),
    showLinesConf.of(
      getLineNumbersExtensions({
        lineNumbers,
        lineNumberFormatter,
        onLineNumberClick
      })
    ),
    lineWrappingConf.of(getLineWrappingExtensions({ lineWrapping })),
    historyConf.of(getHistoryExtensions({ history })),
    indentWithTabConf.of(getIndentWithTabExtensions({ indentWithTab })),
    readableConf.of(getReadableExtensions({ readOnly, readOnlyCursor })),
    placeholderConf.of(getPlaceholderExtensions({ placeholder })),
    syntaxCSS,
    themeConf.of(getThemeExtensions({ theme })),
    tooltipAbsoluteConf.of(getTooltipAbsoluteExtensions({ tooltipAbsolute })),
    readOnlyConf.of(getReadOnlyExtensions({ readOnly, readOnlyCursor }))
  ];
};

const defaultOptions = {
  ...baseDefaultOptions,
  preExtensions: [],
  postExtensions: []
};

export const getDefaultOptions = () => ({ ...defaultOptions });

export const withDefaultOptions = (options) => {
  const combinedOptions = { ...defaultOptions };
  for (let key of Object.keys(options)) {
    if (options[key] !== undefined) {
      combinedOptions[key] = options[key];
    }
  }
  return combinedOptions;
};

export function createCypherEditor(parentDOMElement, options = {}) {
  const combinedOptions = withDefaultOptions(options);
  const {
    autofocus,
    position,
    parseOnSetValue,
    schema,
    value,
    preExtensions,
    postExtensions
  } = combinedOptions;
  let {
    autocomplete,
    autocompleteOpen,
    autocompleteCloseOnBlur,
    autocompleteTriggerStrings,
    history,
    indentWithTab,
    lineNumberFormatter,
    lineNumbers,
    lineWrapping,
    lint,
    placeholder,
    readOnly,
    readOnlyCursor,
    tooltipAbsolute
  } = combinedOptions;

  const {
    on: onValueChanged,
    off: offValueChanged,
    fire: fireValueChanged
  } = createEventHandlers();

  const {
    on: onFocusChanged,
    off: offFocusChanged,
    fire: fireFocusChanged
  } = createEventHandlers();

  const {
    on: onScrollChanged,
    off: offScrollChanged,
    fire: fireScrollChanged
  } = createEventHandlers();

  const {
    on: onPositionChanged,
    off: offPositionChanged,
    fire: firePositionChanged
  } = createEventHandlers();

  const {
    on: onAutocompleteChanged,
    off: offAutocompleteChanged,
    fire: fireAutocompleteChanged
  } = createEventHandlers();

  const {
    on: onLineNumberClick,
    off: offLineNumberClick,
    fire: fireLineNumberClick
  } = createEventHandlers();

  const {
    on: onKeyDown,
    off: offKeyDown,
    fire: fireKeyDown
  } = createEventHandlers();

  const lineNumberClick = (line, event) => {
    fireLineNumberClick(line, event);
  };

  const keyDown = (event) => {
    fireKeyDown(event);
  };

  const positionChanged = (positionObject) => {
    firePositionChanged(positionOldToNew(positionObject));
  };

  const autocompleteChanged = (newAutocompleteOpen, from, options) => {
    autocompleteOpen = newAutocompleteOpen;
    fireAutocompleteChanged(autocompleteOpen, from, options);
  };

  const focusChanged = (focused) => {
    fireFocusChanged(focused);
  };

  const scrollChanged = (scrollInfo) => {
    fireScrollChanged(scrollInfo);
  };

  const updateListener = EditorView.updateListener.of((v) => {
    if (v.docChanged) {
      valueChanged(getStateValue(v.state), v.changes);
      positionChanged(getStatePosition(v.state));
    } else if (v.selectionSet) {
      const oldPosition = getStatePositionAbsolute(v.startState);
      const newPosition = getStatePositionAbsolute(v.state);
      if (oldPosition !== newPosition) {
        positionChanged(getStatePosition(v.state));
      }
      if (deferredAutocomplete) {
        deferredAutocomplete = false;
        showAutocomplete();
      }
    }
    const startStatus = completionStatus(v.startState);
    const endStatus = completionStatus(v.state);
    if (startStatus !== "active" && endStatus === "active") {
      const { transactions } = v;

      const autocompleteResults = [];

      for (let transaction of transactions) {
        const { effects } = transaction;
        if (effects) {
          for (let effect of effects) {
            const { value: values } = effect;
            if (values) {
              for (let value of values) {
                const { result } = value;
                if (result && typeof result === "object") {
                  const { from, options } = result;
                  if (from !== undefined && options !== undefined) {
                    autocompleteResults.push({ from, options });
                  }
                }
              }
            }
          }
        }
      }
      if (autocompleteResults.length > 0) {
        if (autocompleteResults.length > 1) {
          console.error(
            "multiple autocomplete results found in update transactions"
          );
        }
        const { from, options } = autocompleteResults[0];
        autocompleteChanged(true, from, options);
      }
    } else if (startStatus !== null && endStatus === null) {
      autocompleteChanged(false);
    }
  });

  const preConf = new Compartment();
  const lintConf = new Compartment();
  const autocompleteConf = new Compartment();
  const readableConf = new Compartment();
  const readOnlyConf = new Compartment();
  const showLinesConf = new Compartment();
  const lineWrappingConf = new Compartment();
  const historyConf = new Compartment();
  const indentWithTabConf = new Compartment();
  const placeholderConf = new Compartment();
  const themeConf = new Compartment();
  const tooltipAbsoluteConf = new Compartment();
  const postConf = new Compartment();

  const initialState = EditorState.create({
    doc: value,
    extensions: [
      preConf.of(preExtensions),
      ...getExtensions(combinedOptions, {
        lintConf,
        autocompleteConf,
        readableConf,
        readOnlyConf,
        showLinesConf,
        lineWrappingConf,
        historyConf,
        indentWithTabConf,
        placeholderConf,
        themeConf,
        tooltipAbsoluteConf,
        postConf,
        onLineNumberClick: lineNumberClick,
        onFocusChanged: focusChanged,
        onScrollChanged: scrollChanged,
        onKeyDown: keyDown
      }),
      updateListener,
      postConf.of(postExtensions)
    ]
  });

  let editor = new EditorView({
    parent: parentDOMElement,
    state: initialState
  });
  editor.version = 1;
  editor.newContentVersion = function newContentVersion() {
    this.version += 1;
    return this.version;
  };
  editor.newContentVersion.bind(editor);
  editor.dispatch({ effects: [initEditorSupportEffect] });
  const editorSupport = getStateEditorSupport(editor.state);
  editorSupport.update(value);

  const getPositionForValue = (positionValue) =>
    getStatePositionForAny(editor.state, positionNewToOld(positionValue));

  const setPosition = (positionParam, scrollIntoView = true) => {
    const positionObject = getPositionForValue(positionParam);
    if (positionObject) {
      const { position } = positionObject;
      editor.dispatch(
        editor.state.update({ scrollIntoView, selection: { anchor: position } })
      );
    }
  };

  let deferredAutocomplete = false;

  const showDeferredAutocomplete = () => {
    deferredAutocomplete = true;
    setTimeout(() => {
      if (deferredAutocomplete) {
        deferredAutocomplete = false;
        showAutocomplete();
      }
    }, 50);
  };

  const showAutocomplete = () => {
    startCompletion(editor);
  };

  const hideAutocomplete = () => {
    closeCompletion(editor);
  };

  if (position !== undefined) {
    setPosition(position);
  }
  if (schema !== undefined) {
    editorSupport.setSchema(schema);
  }
  if (autocompleteOpen === true) {
    showAutocomplete();
  }

  if (autofocus) {
    editor.contentDOM.focus();
  }

  const setPreExtensions = (preExtensions) => {
    editor.dispatch({
      effects: preConf.reconfigure(preExtensions)
    });
  };

  const setPostExtensions = (postExtensions) => {
    editor.dispatch({
      effects: postConf.reconfigure(postExtensions)
    });
  };

  const valueChanged = (value, changes) => {
    if (autocomplete && Array.isArray(autocompleteTriggerStrings)) {
      let changedText = [];
      changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
        changedText = inserted.text;
      });

      if (changedText.length > 0 && changedText.length <= 2) {
        const text = changedText[0];
        if (autocompleteTriggerStrings.indexOf(text) !== -1) {
          showDeferredAutocomplete();
        } else if (changedText.length === 2) {
          const longerText = text + changedText[1];
          if (autocompleteTriggerStrings.indexOf(longerText) !== -1) {
            showDeferredAutocomplete();
          }
        }
      }
    }

    fireValueChanged(value, changes);
  };

  const setValue = (
    value = defaultOptions.value,
    parseOnSetValueParam = parseOnSetValue
  ) => {
    const update = editor.state.update({
      changes: { from: 0, to: getStateLength(editor.state), insert: value }
    });
    editor.update([update]);
    if (parseOnSetValueParam !== false) {
      const version = editor.newContentVersion();
      const editorSupport = getStateEditorSupport(editor.state);
      editorSupport.update(value, version);

      fixColors(editor, editorSupport);
    }
  };

  const selectAutocompleteOption = (index) => {
    editor.dispatch({ effects: setSelectedCompletion(index) });
    acceptCompletion(editor);
  };

  const setHistory = (newHistory = defaultOptions.history) => {
    history = newHistory;
    editor.dispatch({
      effects: historyConf.reconfigure(getHistoryExtensions({ history }))
    });
  };

  const clearHistory = () => {
    editor.dispatch({
      effects: historyConf.reconfigure([])
    });
    editor.dispatch({
      effects: historyConf.reconfigure(getHistoryExtensions({ history }))
    });
  };

  const setLineNumbers = (newLineNumbers = defaultOptions.lineNumbers) => {
    lineNumbers = newLineNumbers;
    editor.dispatch({
      effects: showLinesConf.reconfigure(
        getLineNumbersExtensions({
          lineNumbers,
          lineNumberFormatter,
          onLineNumberClick: lineNumberClick
        })
      )
    });
  };

  const setLineNumberFormatter = (
    newLineNumberFormatter = defaultOptions.lineNumberFormatter
  ) => {
    lineNumberFormatter = newLineNumberFormatter;
    editor.dispatch({
      effects: showLinesConf.reconfigure(
        getLineNumbersExtensions({
          lineNumbers,
          lineNumberFormatter,
          onLineNumberClick: lineNumberClick
        })
      )
    });
  };

  const setReadOnly = (newReadOnly = defaultOptions.readOnly) => {
    readOnly = newReadOnly;
    editor.dispatch({
      effects: [
        readableConf.reconfigure(
          getReadableExtensions({ readOnly, readOnlyCursor })
        ),
        readOnlyConf.reconfigure(
          getReadOnlyExtensions({ readOnly, readOnlyCursor })
        ),
        autocompleteConf.reconfigure(
          getAutocompleteExtensions({
            readOnly,
            autocomplete,
            autocompleteCloseOnBlur
          })
        ),
        lintConf.reconfigure(getLintExtensions({ readOnly, lint }))
      ]
    });
  };

  const setReadOnlyCursor = (
    newReadOnlyCursor = defaultOptions.readOnlyCursor
  ) => {
    readOnlyCursor = newReadOnlyCursor;
    editor.dispatch({
      effects: [
        readableConf.reconfigure(
          getReadableExtensions({ readOnly, readOnlyCursor })
        ),
        readOnlyConf.reconfigure(
          getReadOnlyExtensions({ readOnly, readOnlyCursor })
        )
      ]
    });
  };

  const setPlaceholder = (newPlaceholder = defaultOptions.placeholder) => {
    placeholder = newPlaceholder;
    editor.dispatch({
      effects: [
        placeholderConf.reconfigure(getPlaceholderExtensions({ placeholder }))
      ]
    });
  };

  const setLineWrapping = (newLineWrapping = defaultOptions.lineWrapping) => {
    lineWrapping = newLineWrapping;
    editor.dispatch({
      effects: [
        lineWrappingConf.reconfigure(
          getLineWrappingExtensions({ lineWrapping })
        )
      ]
    });
  };

  const setAutocomplete = (newAutocomplete = defaultOptions.autocomplete) => {
    autocomplete = newAutocomplete;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        getAutocompleteExtensions({
          readOnly,
          autocomplete,
          autocompleteCloseOnBlur
        })
      )
    });
  };

  const setAutocompleteCloseOnBlur = (
    newAutocompleteCloseOnBlur = defaultOptions.autocompleteCloseOnBlur
  ) => {
    autocompleteCloseOnBlur = newAutocompleteCloseOnBlur;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        getAutocompleteExtensions({
          readOnly,
          autocomplete,
          autocompleteCloseOnBlur
        })
      )
    });
  };

  const setAutocompleteTriggerStrings = (
    newAutocompleteTriggerStrings = defaultOptions.autocompleteTriggerStrings
  ) => {
    autocompleteTriggerStrings = newAutocompleteTriggerStrings;
  };

  const setLint = (newLint = defaultOptions.lint) => {
    lint = newLint;
    editor.dispatch({
      effects: lintConf.reconfigure(getLintExtensions({ readOnly, lint }))
    });
  };

  const getPosition = () => {
    return positionOldToNew(getStatePosition(editor.state));
  };

  const getLineCount = () => {
    return editor ? getStateLineCount(editor.state) : 0;
  };

  const setSchema = (schema = defaultOptions.schema) => {
    editorSupport.setSchema(schema);
    if (autocompleteOpen) {
      showAutocomplete();
    }
  };

  const setTheme = (theme = defaultOptions.theme) => {
    editor.dispatch({
      effects: themeConf.reconfigure(getThemeExtensions({ theme }))
    });
  };

  const setTooltipAbsolute = (
    newTooltipAbsolute = defaultOptions.tooltipAbsolute
  ) => {
    tooltipAbsolute = newTooltipAbsolute;
    editor.dispatch({
      effects: tooltipAbsoluteConf.reconfigure(
        getTooltipAbsoluteExtensions({ tooltipAbsolute })
      )
    });
  };

  const focus = () => {
    editor && editor.focus();
  };

  const destroy = () => {
    editor && editor.destroy();
  };

  const setAutocompleteOpen = (open = defaultOptions.autocompleteOpen) => {
    if (open) {
      showAutocomplete();
    } else {
      hideAutocomplete();
    }
  };

  const setIndentWithTab = (
    newIndentWithTab = defaultOptions.indentWithTab
  ) => {
    indentWithTab = newIndentWithTab;
    editor.dispatch({
      effects: indentWithTabConf.reconfigure(
        getIndentWithTabExtensions({ indentWithTab })
      )
    });
  };

  const editorAPI = {
    clearHistory,
    destroy,
    focus,
    getLineCount,
    getPosition,
    getPositionForValue,
    selectAutocompleteOption,
    setAutocomplete,
    setAutocompleteCloseOnBlur,
    setAutocompleteOpen,
    setAutocompleteTriggerStrings,
    setHistory,
    setIndentWithTab,
    setLineNumberFormatter,
    setLineNumbers,
    setLineWrapping,
    setLint,
    setPlaceholder,
    setPosition,
    setReadOnly,
    setReadOnlyCursor,
    setSchema,
    setTheme,
    setTooltipAbsolute,
    setValue,

    onAutocompleteChanged,
    offAutocompleteChanged,
    onFocusChanged,
    offFocusChanged,
    onKeyDown,
    offKeyDown,
    onLineNumberClick,
    offLineNumberClick,
    onPositionChanged,
    offPositionChanged,
    onScrollChanged,
    offScrollChanged,
    onValueChanged,
    offValueChanged,

    setPreExtensions,
    setPostExtensions,
    codemirror: editor,
    editorSupport
  };

  if (parseOnSetValue !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(value, version);

    fixColors(editor, editorSupport);
  }

  return {
    editor: editorAPI
  };
}
