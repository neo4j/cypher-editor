// All of these packages are dependencies of "codemirror" package version >= 6;
import {
  startCompletion,
  closeCompletion,
  acceptCompletion,
  setSelectedCompletion
} from "@codemirror/autocomplete";
import {
  getSearchQuery,
  setSearchQuery,
  openSearchPanel,
  closeSearchPanel,
  SearchQuery
} from "@codemirror/search";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

import {
  defaultOptions,
  createEventHandlers,
  positionNewToOld,
  positionOldToNew
} from "./cypher-codemirror-base";
import {
  getStatePositionAbsolute,
  getStateEditorSupport,
  getStateLineCount,
  getStateValue,
  getStateLength,
  getStatePosition,
  getStatePositionForAny,
  getStateSearchOpen,
  getStateSearchSpec,
  getStateSearchMatches,
  getStateSearchText,
  getStateAutocompleteOpen,
  getStateAutocompleteOptions,
  areViewUpdateAutocompleteOptionsEqual,
  getViewUpdatePickedAutocompleteOption
} from "./cypher-state-selectors";
import {
  fixColors,
  resetColors,
  domListener,
  getReadableExtensions,
  getReadOnlyExtensions,
  getPlaceholderExtensions,
  getSearchExtensions,
  getThemeExtensions,
  getTooltipAbsoluteExtensions,
  getLineNumbersExtensions,
  getAutocompleteExtensions,
  getLineWrappingExtensions,
  getHistoryExtensions,
  getTabKeyExtensions,
  getLintExtensions,
  getCursorWideExtensions,
  getCypherLanguageExtensions,
  getBracketMatchingExtensions,
  getCloseBracketsExtensions
} from "./cypher-extensions";

export * from "./cypher-codemirror-base";

export * from "./cypher-extensions";

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

const isTruthyObject = (obj) => obj && typeof obj === "object";

const areSchemasDifferent = (oldSchema, newSchema) => {
  const oldIsObject = isTruthyObject(oldSchema);
  const newIsObject = isTruthyObject(newSchema);
  if (oldIsObject !== newIsObject) {
    return true;
  } else if (oldIsObject) {
    const oldKeys = Object.keys(oldSchema);
    const newKeys = Object.keys(newSchema);
    if (oldKeys.length !== newKeys.length) {
      return true;
    } else {
      return oldKeys.some((key) => oldSchema[key] !== newSchema[key]);
    }
  } else {
    return false;
  }
};

export const getExtensions = (
  options = {},
  {
    lintConf = new Compartment(),
    autocompleteConf = new Compartment(),
    bracketMatchingConf = new Compartment(),
    closeBracketsConf = new Compartment(),
    cursorWideConf = new Compartment(),
    cypherLanguageConf = new Compartment(),
    readableConf = new Compartment(),
    readOnlyConf = new Compartment(),
    showLinesConf = new Compartment(),
    lineWrappingConf = new Compartment(),
    historyConf = new Compartment(),
    placeholderConf = new Compartment(),
    searchConf = new Compartment(),
    tabKeyConf = new Compartment(),
    themeConf = new Compartment(),
    tooltipAbsoluteConf = new Compartment(),
    onLineNumberClick = () => {},
    onFocusChanged = () => {},
    onScrollChanged = () => {},
    onKeyDown = () => {},
    onKeyUp = () => {}
  } = {}
) => {
  const combinedOptions = withDefaultOptions(options);
  const {
    autocomplete,
    autocompleteCloseOnBlur,
    bracketMatching,
    closeBrackets,
    cursorWide,
    cypherLanguage,
    history,
    tabKey,
    indentUnit,
    lineNumberFormatter,
    lineNumbers,
    lineWrapping,
    lint,
    placeholder,
    readOnly,
    readOnlyCursor,
    search,
    searchTop,
    theme,
    tooltipAbsolute
  } = combinedOptions;

  return [
    domListener({ onFocusChanged, onScrollChanged, onKeyDown, onKeyUp }),
    cypherLanguageConf.of(getCypherLanguageExtensions({ cypherLanguage })),
    lintConf.of(getLintExtensions({ cypherLanguage, readOnly, lint })),
    autocompleteConf.of(
      getAutocompleteExtensions({
        cypherLanguage,
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
    tabKeyConf.of(getTabKeyExtensions({ tabKey, indentUnit })),
    readableConf.of(getReadableExtensions({ readOnly, readOnlyCursor })),
    placeholderConf.of(getPlaceholderExtensions({ placeholder })),
    themeConf.of(getThemeExtensions({ theme })),
    cursorWideConf.of(getCursorWideExtensions({ cursorWide })),
    searchConf.of(getSearchExtensions({ readOnly, search, searchTop })),
    tooltipAbsoluteConf.of(getTooltipAbsoluteExtensions({ tooltipAbsolute })),
    readOnlyConf.of(getReadOnlyExtensions({ readOnly, readOnlyCursor })),
    bracketMatchingConf.of(getBracketMatchingExtensions({ bracketMatching })),
    closeBracketsConf.of(getCloseBracketsExtensions({ closeBrackets }))
  ];
};

const isActiveSearchMatches = (searchMatches) =>
  searchMatches > 0 && searchMatches <= 1000;

const detectThemeDark = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const addDetectThemeDarkListener = (isThemeDarkCallback) => {
  const listener = (event) => {
    isThemeDarkCallback(event.matches);
  };
  window.matchMedia &&
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);
  return listener;
};

const removeDetectThemeDarkListener = (listener) => {
  window.matchMedia &&
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", listener);
};

export function createCypherEditor(parentDOMElement, options = {}) {
  const combinedOptions = withDefaultOptions(options);
  const {
    autofocus,
    position,
    parseOnSetValue,
    value,
    preExtensions,
    postExtensions
  } = combinedOptions;
  let {
    autocomplete,
    autocompleteOpen,
    autocompleteCloseOnBlur,
    autocompleteTriggerStrings,
    cypherLanguage,
    history,
    indentUnit,
    lineNumberFormatter,
    lineNumbers,
    lineWrapping,
    lint,
    placeholder,
    readOnly,
    readOnlyCursor,
    search,
    searchMatches,
    searchOpen,
    searchText,
    searchTop,
    schema,
    tabKey,
    theme,
    tooltipAbsolute
  } = combinedOptions;
  let editorSupport = null;
  let lastPosition = null;
  let searchInitializing = false;
  let detectedThemeDark = theme === "auto" ? detectThemeDark() : null;
  let pressedKey = null;
  let deferredAutocomplete = false;

  const setDetectedThemeDark = (dark) => {
    detectedThemeDark = dark;
    updateTheme();
  };

  let detectedThemeDarkListener =
    theme === "auto" ? addDetectThemeDarkListener(setDetectedThemeDark) : null;

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
    on: onSearchChanged,
    off: offSearchChanged,
    fire: fireSearchChanged
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

  const { on: onKeyUp, off: offKeyUp, fire: fireKeyUp } = createEventHandlers();

  const lineNumberClick = (line, event) => {
    fireLineNumberClick(line, event);
  };

  const keyDown = (event) => {
    pressedKey =
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey &&
      event.key &&
      event.key.length === 1
        ? event.key
        : null;
    fireKeyDown(event);
  };

  const keyUp = (event) => {
    if (deferredAutocomplete) {
      showAutocomplete();
      deferredAutocomplete = false;
    }

    pressedKey = null;
    fireKeyUp(event);
  };

  const deferAutocompleteForChanges = (changes) => {
    const { length = 0, newLength = 0 } = changes;
    const isSmallInsert = newLength > length && newLength - length <= 2;
    if (
      pressedKey &&
      cypherLanguage &&
      autocomplete &&
      Array.isArray(autocompleteTriggerStrings) &&
      isSmallInsert
    ) {
      let changedText = null;
      changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
        if (
          !changedText &&
          inserted &&
          typeof inserted === "object" &&
          Array.isArray(inserted.text) &&
          inserted.text.length == 1
        ) {
          changedText = inserted.text[0];
          // { {}
        }
      });

      if (
        changedText &&
        autocompleteTriggerStrings.indexOf(changedText) !== -1
      ) {
        deferredAutocomplete = true;
      }
    }
  };

  const handleValueChanged = (value, changes) => {
    deferAutocompleteForChanges(changes);

    fireValueChanged(value, changes);
  };

  const handlePositionChanged = (positionObject) => {
    lastPosition = (positionObject || { position: null }).position;
    firePositionChanged(positionOldToNew(positionObject));
  };

  const handleAutocompleteChanged = (newAutocompleteOpen, options, option) => {
    autocompleteOpen = newAutocompleteOpen;
    fireAutocompleteChanged(autocompleteOpen, options, option);
  };

  const handleSearchChanged = (newSearchOpen, text, matches) => {
    if (!searchInitializing) {
      searchOpen = newSearchOpen;
      fireSearchChanged(searchOpen, text, matches);
    }
  };

  const handleFocusChanged = (focused) => {
    fireFocusChanged(focused);
  };

  const handleScrollChanged = (scrollInfo) => {
    fireScrollChanged(scrollInfo);
  };

  const updateListener = EditorView.updateListener.of((v) => {
    const { docChanged: valueChanged, selectionSet: selectionChanged } = v;
    const oldPosition = selectionChanged
      ? valueChanged
        ? null
        : getStatePositionAbsolute(v.startState)
      : null;
    const newPosition = selectionChanged
      ? getStatePositionAbsolute(v.state)
      : null;
    const positionChanged = valueChanged || oldPosition !== newPosition;
    const oldAutocompleteOpen = getStateAutocompleteOpen(v.startState);
    const newAutocompleteOpen = getStateAutocompleteOpen(v.state);
    const pickedAutocompleteOption = getViewUpdatePickedAutocompleteOption(
      v,
      true
    );
    const autocompleteChanged =
      cypherLanguage &&
      autocomplete &&
      (oldAutocompleteOpen !== newAutocompleteOpen ||
        !areViewUpdateAutocompleteOptionsEqual(v) ||
        pickedAutocompleteOption);
    const oldSearchOpen = getStateSearchOpen(v.startState);
    const newSearchOpen = getStateSearchOpen(v.state);
    const oldSearchText = getStateSearchText(v.startState);
    const newSearchText = getStateSearchText(v.state);
    const oldSearchSpec = getStateSearchSpec(v.startState);
    const newSearchSpec = getStateSearchSpec(v.state);
    const activeSearchMatches = isActiveSearchMatches(searchMatches);
    const searchChanged =
      search &&
      (oldSearchOpen !== newSearchOpen ||
        (activeSearchMatches
          ? oldSearchSpec !== newSearchSpec
          : oldSearchText !== newSearchText));

    if (valueChanged) {
      handleValueChanged(getStateValue(v.state), v.changes);
    }
    if (positionChanged) {
      handlePositionChanged(getStatePosition(v.state));
    }
    if (selectionChanged && deferredAutocomplete) {
      deferredAutocomplete = false;
      showAutocomplete();
    }

    if (autocompleteChanged) {
      const newAutocompleteOptions = newAutocompleteOpen
        ? getStateAutocompleteOptions(v.state, true)
        : undefined;
      const newAutocompleteOption = pickedAutocompleteOption;
      handleAutocompleteChanged(
        newAutocompleteOpen,
        newAutocompleteOptions,
        newAutocompleteOption
      );
    }

    if (searchChanged) {
      if (oldSearchOpen || newSearchOpen) {
        const newSearchMatches =
          activeSearchMatches && newSearchOpen
            ? getStateSearchMatches(v.state, searchMatches)
            : undefined;
        handleSearchChanged(newSearchOpen, newSearchText, newSearchMatches);
      }
    } else if (valueChanged && activeSearchMatches && newSearchOpen) {
      handleSearchChanged(
        newSearchOpen,
        newSearchText,
        getStateSearchMatches(v.state, searchMatches)
      );
    }
  });

  const preConf = new Compartment();
  const lintConf = new Compartment();
  const autocompleteConf = new Compartment();
  const bracketMatchingConf = new Compartment();
  const closeBracketsConf = new Compartment();
  const readableConf = new Compartment();
  const readOnlyConf = new Compartment();
  const showLinesConf = new Compartment();
  const lineWrappingConf = new Compartment();
  const historyConf = new Compartment();
  const placeholderConf = new Compartment();
  const searchConf = new Compartment();
  const tabKeyConf = new Compartment();
  const themeConf = new Compartment();
  const cursorWideConf = new Compartment();
  const cypherLanguageConf = new Compartment();
  const tooltipAbsoluteConf = new Compartment();
  const postConf = new Compartment();

  const createOptions =
    theme === "auto"
      ? {
          ...combinedOptions,
          theme: detectedThemeDark ? "dark" : "light"
        }
      : combinedOptions;

  const initialState = EditorState.create({
    doc: value,
    extensions: [
      preConf.of(preExtensions),
      ...getExtensions(createOptions, {
        lintConf,
        autocompleteConf,
        bracketMatchingConf,
        closeBracketsConf,
        cursorWideConf,
        cypherLanguageConf,
        tabKeyConf,
        readableConf,
        readOnlyConf,
        showLinesConf,
        lineWrappingConf,
        historyConf,
        placeholderConf,
        searchConf,
        themeConf,
        tooltipAbsoluteConf,
        postConf,
        onLineNumberClick: lineNumberClick,
        onFocusChanged: handleFocusChanged,
        onScrollChanged: handleScrollChanged,
        onKeyDown: keyDown,
        onKeyUp: keyUp
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
  if (cypherLanguage) {
    editorSupport = getStateEditorSupport(editor.state);
    editorSupport.update(value);
  }

  const getPositionForValue = (positionValue) =>
    getStatePositionForAny(editor.state, positionNewToOld(positionValue));

  const setPosition = (positionParam, scrollIntoView = true) => {
    const positionObject = getPositionForValue(positionParam);
    if (positionObject) {
      const { position } = positionObject;
      if (position !== lastPosition) {
        editor.dispatch(
          editor.state.update({
            scrollIntoView,
            selection: { anchor: position }
          })
        );
      }
    }
  };

  const showAutocomplete = () => {
    if (cypherLanguage && autocomplete) {
      startCompletion(editor);
    }
  };

  const hideAutocomplete = () => {
    if (cypherLanguage && autocomplete) {
      closeCompletion(editor);
    }
  };

  const showSearch = () => {
    if (search) {
      openSearchPanel(editor);
    }
  };

  const hideSearch = () => {
    if (search) {
      closeSearchPanel(editor);
    }
  };

  if (position !== undefined) {
    setPosition(position);
  }
  lastPosition = (getStatePosition(editor.state) || { position: null })
    .position;
  if (cypherLanguage && schema !== undefined) {
    editorSupport.setSchema(schema);
  }
  if (cypherLanguage && autocomplete && autocompleteOpen === true) {
    showAutocomplete();
  }
  if (cypherLanguage && search && searchOpen === true) {
    showSearch();
  }

  if (autofocus) {
    editor.contentDOM.focus();
  }

  const setPreExtensions = (preExtensions = defaultOptions.preExtensions) => {
    editor.dispatch({
      effects: preConf.reconfigure(preExtensions)
    });
  };

  const setPostExtensions = (
    postExtensions = defaultOptions.postExtensions
  ) => {
    editor.dispatch({
      effects: postConf.reconfigure(postExtensions)
    });
  };

  const setValue = (
    value = defaultOptions.value,
    parseOnSetValueParam = parseOnSetValue
  ) => {
    const update = editor.state.update({
      changes: { from: 0, to: getStateLength(editor.state), insert: value }
    });
    editor.update([update]);
    if (cypherLanguage && parseOnSetValueParam !== false) {
      const version = editor.newContentVersion();
      const editorSupport = getStateEditorSupport(editor.state);
      editorSupport.update(value, version);

      fixColors(editor, editorSupport);
    }
  };

  const selectAutocompleteOption = (index) => {
    if (cypherLanguage && autocomplete) {
      editor.dispatch({ effects: setSelectedCompletion(index) });
      acceptCompletion(editor);
    }
  };

  const setHistory = (newHistory = defaultOptions.history) => {
    history = newHistory;
    editor.dispatch({
      effects: historyConf.reconfigure(getHistoryExtensions({ history }))
    });
  };

  const clearHistory = () => {
    if (history) {
      editor.dispatch({
        effects: historyConf.reconfigure([])
      });
      editor.dispatch({
        effects: historyConf.reconfigure(getHistoryExtensions({ history }))
      });
    }
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
    if (lineNumbers) {
      editor.dispatch({
        effects: showLinesConf.reconfigure(
          getLineNumbersExtensions({
            lineNumbers,
            lineNumberFormatter,
            onLineNumberClick: lineNumberClick
          })
        )
      });
    }
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
            cypherLanguage,
            readOnly,
            autocomplete,
            autocompleteCloseOnBlur
          })
        ),
        lintConf.reconfigure(
          getLintExtensions({ cypherLanguage, readOnly, lint })
        )
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
    const autocompleteActivated =
      cypherLanguage && newAutocomplete && !(cypherLanguage && autocomplete);
    autocomplete = newAutocomplete;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        getAutocompleteExtensions({
          cypherLanguage,
          readOnly,
          autocomplete,
          autocompleteCloseOnBlur
        })
      )
    });
    if (autocompleteActivated) {
      if (autocompleteOpen) {
        showAutocomplete();
      }
    }
  };

  const setAutocompleteCloseOnBlur = (
    newAutocompleteCloseOnBlur = defaultOptions.autocompleteCloseOnBlur
  ) => {
    autocompleteCloseOnBlur = newAutocompleteCloseOnBlur;
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        getAutocompleteExtensions({
          cypherLanguage,
          readOnly,
          autocomplete,
          autocompleteCloseOnBlur
        })
      )
    });
  };

  const setAutocompleteOpen = (
    newAutocompleteOpen = defaultOptions.autocompleteOpen
  ) => {
    autocompleteOpen = newAutocompleteOpen;
    if (autocompleteOpen) {
      showAutocomplete();
    } else {
      hideAutocomplete();
    }
  };

  const setAutocompleteTriggerStrings = (
    newAutocompleteTriggerStrings = defaultOptions.autocompleteTriggerStrings
  ) => {
    autocompleteTriggerStrings = newAutocompleteTriggerStrings;
  };

  const setLint = (newLint = defaultOptions.lint) => {
    lint = newLint;
    editor.dispatch({
      effects: lintConf.reconfigure(
        getLintExtensions({ cypherLanguage, readOnly, lint })
      )
    });
  };

  const getPosition = () => {
    return positionOldToNew(getStatePosition(editor.state));
  };

  const getLineCount = () => {
    return editor ? getStateLineCount(editor.state) : 0;
  };

  const setSchema = (newSchema = defaultOptions.schema) => {
    const schemaChanged = areSchemasDifferent(schema, newSchema);
    schema = newSchema;
    if (cypherLanguage) {
      editorSupport.setSchema(schema);
      if (schemaChanged && autocomplete && autocompleteOpen) {
        showAutocomplete();
      }
    }
  };

  const setTheme = (newTheme = defaultOptions.theme) => {
    const oldTheme = theme;
    theme = newTheme;
    if (oldTheme === "auto" && newTheme !== "auto") {
      detectedThemeDark = null;
      detectedThemeDarkListener &&
        removeDetectThemeDarkListener(detectedThemeDarkListener);
      detectedThemeDarkListener = null;
    }
    if (oldTheme !== "auto" && newTheme === "auto") {
      detectedThemeDark = detectThemeDark();
      detectedThemeDarkListener =
        addDetectThemeDarkListener(setDetectedThemeDark);
    }
    const derivedTheme =
      theme === "auto" ? (detectedThemeDark ? "dark" : "light") : theme;
    editor.dispatch({
      effects: themeConf.reconfigure(
        getThemeExtensions({ theme: derivedTheme })
      )
    });
  };

  const updateTheme = () => {
    setTheme(theme);
  };

  const setCursorWide = (cursorWide = defaultOptions.cursorWide) => {
    editor.dispatch({
      effects: cursorWideConf.reconfigure(
        getCursorWideExtensions({ cursorWide })
      )
    });
  };

  const setCypherLanguage = (
    newCypherLanguage = defaultOptions.cypherLanguage
  ) => {
    const cypherLanguageChanged = cypherLanguage !== newCypherLanguage;
    const autocompleteActivated =
      newCypherLanguage && autocomplete && !(cypherLanguage && autocomplete);

    cypherLanguage = newCypherLanguage;

    if (cypherLanguageChanged && !cypherLanguage) {
      editorSupport = null;
    }

    editor.dispatch({
      effects: cypherLanguageConf.reconfigure(
        getCypherLanguageExtensions({ cypherLanguage })
      )
    });
    editor.dispatch({
      effects: autocompleteConf.reconfigure(
        getAutocompleteExtensions({
          cypherLanguage,
          readOnly,
          autocomplete,
          autocompleteCloseOnBlur
        })
      )
    });
    editor.dispatch({
      effects: lintConf.reconfigure(
        getLintExtensions({ cypherLanguage, readOnly, lint })
      )
    });
    if (cypherLanguageChanged && cypherLanguage) {
      editor.version = 1;
      const version = editor.newContentVersion();
      editorSupport = getStateEditorSupport(editor.state);
      editorSupport.setSchema(schema);
      editorSupport.update(value, version);

      fixColors(editor, editorSupport);
    }
    if (autocompleteActivated) {
      if (autocompleteOpen) {
        showAutocomplete();
      }
    }
    if (!cypherLanguage) {
      editor && resetColors(editor);
    }
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
    detectedThemeDarkListener &&
      removeDetectThemeDarkListener(detectedThemeDarkListener);
  };

  const setTabKey = (newTabKey = defaultOptions.tabKey) => {
    tabKey = newTabKey;
    editor.dispatch({
      effects: tabKeyConf.reconfigure(
        getTabKeyExtensions({ tabKey, indentUnit })
      )
    });
  };

  const setIndentUnit = (newIndentUnit = defaultOptions.indentUnit) => {
    indentUnit = newIndentUnit;
    editor.dispatch({
      effects: tabKeyConf.reconfigure(
        getTabKeyExtensions({ tabKey, indentUnit })
      )
    });
  };

  const setSearch = (newSearch = defaultOptions.search) => {
    const searchActivated = newSearch && !search;
    search = newSearch;
    if (searchActivated) {
      searchInitializing = true;
    }
    editor.dispatch({
      effects: searchConf.reconfigure(
        getSearchExtensions({ readOnly, search, searchTop })
      )
    });
    if (searchActivated) {
      setSearchText(searchText);
      if (searchOpen) {
        showSearch();
      }
      searchInitializing = false;
      handleSearchChanged(
        searchOpen,
        searchText,
        searchOpen
          ? getStateSearchMatches(editor.state, searchMatches)
          : undefined
      );
    }
  };

  const setSearchMatches = (
    newSearchMatches = defaultOptions.searchMatches
  ) => {
    const searchMatchesChanged = newSearchMatches !== searchMatches;
    searchMatches = newSearchMatches;
    if (searchMatchesChanged && searchMatches > 0) {
    }
  };

  const setSearchOpen = (newSearchOpen = defaultOptions.searchOpen) => {
    searchOpen = newSearchOpen;
    if (searchOpen) {
      showSearch();
    } else {
      hideSearch();
    }
  };

  const setSearchText = (newSearchText = defaultOptions.searchText) => {
    searchText = newSearchText;
    if (search) {
      const searchQuery = getSearchQuery(editor.state);
      const { caseSensitive, literal, regexp, replace, wholeWord } =
        searchQuery;
      const newSearchQuery = new SearchQuery({
        search: searchText,
        caseSensitive,
        literal,
        regexp,
        replace,
        wholeWord
      });
      editor.dispatch({
        effects: setSearchQuery.of(newSearchQuery)
      });
    }
  };

  const setSearchTop = (newSearchTop = defaultOptions.searchTop) => {
    searchTop = newSearchTop;
    editor.dispatch({
      effects: searchConf.reconfigure(
        getSearchExtensions({ readOnly, search, searchTop })
      )
    });
  };

  const setBracketMatching = (
    bracketMatching = defaultOptions.bracketMatching
  ) => {
    editor.dispatch({
      effects: bracketMatchingConf.reconfigure(
        getBracketMatchingExtensions({ bracketMatching })
      )
    });
  };

  const setCloseBrackets = (closeBrackets = defaultOptions.closeBrackets) => {
    editor.dispatch({
      effects: closeBracketsConf.reconfigure(
        getCloseBracketsExtensions({ closeBrackets })
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
    setBracketMatching,
    setCloseBrackets,
    setCursorWide,
    setCypherLanguage,
    setHistory,
    setIndentUnit,
    setLineNumberFormatter,
    setLineNumbers,
    setLineWrapping,
    setLint,
    setPlaceholder,
    setPosition,
    setReadOnly,
    setReadOnlyCursor,
    setSchema,
    setSearch,
    setSearchMatches,
    setSearchOpen,
    setSearchText,
    setSearchTop,
    setTabKey,
    setTheme,
    setTooltipAbsolute,
    setValue,

    onAutocompleteChanged,
    offAutocompleteChanged,
    onFocusChanged,
    offFocusChanged,
    onKeyDown,
    offKeyDown,
    onKeyUp,
    offKeyUp,
    onLineNumberClick,
    offLineNumberClick,
    onPositionChanged,
    offPositionChanged,
    onScrollChanged,
    offScrollChanged,
    onSearchChanged,
    offSearchChanged,
    onValueChanged,
    offValueChanged,

    setPreExtensions,
    setPostExtensions,
    codemirror: editor,
    editorSupport
  };

  if (cypherLanguage && parseOnSetValue !== false) {
    const version = editor.newContentVersion();
    editorSupport.update(value, version);

    fixColors(editor, editorSupport);
  }

  return {
    editor: editorAPI
  };
}
