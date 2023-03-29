import React, { useState, useRef, useEffect } from "react";
import {
  neo4jSchema,
  simpleSchema,
  longQuery,
  simpleQuery,
  createDriver,
  defaultLineNumberFormatter,
  noneLineNumberFormatter,
  customLineNumberFormatter,
  samplePlaceholder,
  initialOptions,
  getTitle,
  getLogText,
  commandLog,
  eventLog,
  getChangedScrollInfo,
  eventTypes,
  createEventTypeFilterMap,
  selectionGrowing,
  selectionZigzag
} from "demo-base";

const driver = createDriver();

const isNumberString = (v) => v === "0" || /^([1-9])([0-9])*$/.test(v);

const Database = ({ CypherEditor, codemirrorVersion, framework, bundler }) => {
  const title = getTitle({ codemirrorVersion, framework, bundler });

  const [styled, setStyled] = useState(false);
  const style = styled
    ? { width: "200px", minWidth: "200px", maxWidth: "200px" }
    : undefined;

  const [autocomplete, setAutocomplete] = useState(initialOptions.autocomplete);
  const [autocompleteCloseOnBlur, setAutocompleteCloseOnBlur] = useState(
    initialOptions.autocompleteCloseOnBlur
  );
  const [autocompleteOpen, setAutocompleteOpen] = useState(
    initialOptions.autocompleteOpen
  );
  const [autocompleteOptions, setAutocompleteOptions] = useState(undefined);
  const [autocompleteTriggerStrings, setAutocompleteTriggerStrings] = useState(
    initialOptions.autocompleteTriggerStrings
  );
  const [autofocus, setAutofocus] = useState(initialOptions.autofocus);
  const [bracketMatching, setBracketMatching] = useState(
    initialOptions.bracketMatching
  );
  const [closeBrackets, setCloseBrackets] = useState(
    initialOptions.closeBrackets
  );
  const [cursorWide, setCursorWide] = useState(initialOptions.cursorWide);
  const [cypherLanguage, setCypherLanguage] = useState(
    initialOptions.cypherLanguage
  );
  const [cypher, setCypher] = useState(initialOptions.value);
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState(null);
  const [focused, setFocused] = useState(initialOptions.autofocus);
  const [history, setHistory] = useState(initialOptions.history);
  const [indentUnit, setIndentUnit] = useState(initialOptions.indentUnit);
  const [lineNumberFormatterObject, setLineNumberFormatterObject] = useState({
    lineNumberFormatter: initialOptions.lineNumberFormatter
  });
  let { lineNumberFormatter } = lineNumberFormatterObject;
  const [lineNumbers, setLineNumbers] = useState(initialOptions.lineNumbers);
  const [lineWrapping, setLineWrapping] = useState(initialOptions.lineWrapping);
  const [lint, setLint] = useState(initialOptions.lint);
  const [loading, setLoading] = useState(false);
  const [parseOnSetValue, setParseOnSetValue] = useState(
    initialOptions.parseOnSetValue
  );
  const [placeholder, setPlaceholder] = useState(initialOptions.placeholder);
  const [position, setPosition] = useState(initialOptions.position);
  const [positionPosition, setPositionPosition] = useState("0");
  const [positionLine, setPositionLine] = useState("1");
  const [positionColumn, setPositionColumn] = useState("1");
  const [selection, setSelection] = useState(initialOptions.selection);
  const [readOnly, setReadOnly] = useState(initialOptions.readOnly);
  const [readOnlyCursor, setReadOnlyCursor] = useState(
    initialOptions.readOnlyCursor
  );
  const [results, setResults] = useState(null);
  const [schema, setSchema] = useState(initialOptions.schema);
  const [search, setSearch] = useState(initialOptions.search);
  const [searchMatches, setSearchMatches] = useState(
    initialOptions.searchMatches
  );
  const [searchOpen, setSearchOpen] = useState(initialOptions.searchOpen);
  const [searchText, setSearchText] = useState(initialOptions.searchText);
  const [searchTop, setSearchTop] = useState(initialOptions.searchTop);
  const [tabKey, setTabKey] = useState(initialOptions.tabKey);
  const [theme, setTheme] = useState(initialOptions.theme);
  const [tooltipAbsolute, setTooltipAbsolute] = useState(
    initialOptions.tooltipAbsolute
  );

  const [goPositionPositionEnabled, setGoPositionPositionEnabled] =
    useState(false);
  const [goPositionLineColumnEnabled, setGoPositionLineColumnEnabled] =
    useState(false);
  const [autocompleteOptionIndex, setAutocompleteOptionIndex] = useState("0");
  const [selectAutocompleteOptionEnabled, setAutocompleteOptionEnabled] =
    useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const [logText, setLogText] = useState("");
  const [lastScrollInfo, setLastScrollInfo] = useState(undefined);
  const [eventFilters, setEventFilters] = useState(
    createEventTypeFilterMap(true)
  );
  const textareaRef = useRef(null);

  const onFilterChange = (eventType) => {
    setEventFilters((filters) => ({
      ...filters,
      [eventType]: !filters[eventType]
    }));
  };

  useEffect(() => {
    ({ lineNumberFormatter } = lineNumberFormatterObject);
  }, [lineNumberFormatterObject]);

  useEffect(() => {
    setLogText(getLogText(logs, { eventFilters }));
  }, [logs, eventFilters]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = logText
        ? textareaRef.current.scrollHeight
        : 0;
    }
  }, [logText]);

  const clearLogs = () => {
    setLogs([]);
  };

  const addCommandLog = (command, argument) => {
    setLogs((logs) => logs.concat(commandLog(command, argument)));
  };

  const addEventLog = (event, argument) => {
    setLogs((logs) => logs.concat(eventLog(event, argument)));
  };

  const send = () => {
    const session = driver.session();
    setLoading(true);
    session.run(cypher).then(
      (results) => {
        setResults(results);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setResults(null);
        setLoading(false);
        setError(error);
      }
    );
  };

  const updateGoButtons = ({
    cypherEditor = editor,
    positionPosition: goPositionPosition = positionPosition,
    positionLine: goPositionLine = positionLine,
    positionColumn: goPositionColumn = positionColumn
  } = {}) => {
    setGoPositionPositionEnabled(
      isNumberString(goPositionPosition) &&
        cypherEditor.getPositionForValue(+goPositionPosition) !== null
    );
    setGoPositionLineColumnEnabled(
      isNumberString(goPositionLine) &&
        isNumberString(goPositionColumn) &&
        cypherEditor.getPositionForValue({
          line: +goPositionLine,
          column: +goPositionColumn
        }) !== null
    );
  };

  const updatePickGoButtons = ({
    autocompleteOptionIndex:
      goAutocompleteOptionIndex = autocompleteOptionIndex,
    autocompleteOpen: goAutocompleteOpen = autocompleteOpen,
    autocompleteOptions: goAutocompleteOptions = autocompleteOptions
  } = {}) => {
    setAutocompleteOptionEnabled(
      isNumberString(goAutocompleteOptionIndex) &&
        goAutocompleteOpen &&
        goAutocompleteOptions !== undefined &&
        +goAutocompleteOptionIndex >= 0 &&
        +goAutocompleteOptionIndex < goAutocompleteOptions.length
    );
  };

  const updateValue = (value) => {
    setCypher(value);
    updateGoButtons();
    editor && setLineCount(editor.getLineCount());
  };

  const onAutocompleteChanged = (open, options, option) => {
    addEventLog("autocompleteChanged", { open, options, option });
    setAutocompleteOpen(open);
    setAutocompleteOptions(options);
    updatePickGoButtons({
      autocompleteOpen: open,
      autocompleteOptions: options
    });
  };

  const onEditorCreated = (editor) => {
    addEventLog("editorCreated", "");
    setEditor(editor);
    setPosition(editor.getPosition());
    setSelection(editor.getSelection());
    setLineCount(editor.getLineCount());
    updateGoButtons({ cypherEditor: editor });
  };

  const onFocusChanged = (focused) => {
    addEventLog("focusChanged", focused);
    setFocused(focused);
  };

  const onPositionChanged = (positionObject) => {
    addEventLog("positionChanged", positionObject);
    setPosition(positionObject);
  };

  const onSelectionChanged = (selection) => {
    addEventLog("selectionChanged", selection);
    setSelection(selection);
  };

  const onScrollChanged = (scrollInfo) => {
    addEventLog(
      "scrollChanged",
      getChangedScrollInfo(lastScrollInfo, scrollInfo)
    );
    setLastScrollInfo(scrollInfo);
  };

  const onSearchChanged = (open, text, matches) => {
    addEventLog("searchChanged", {
      open,
      text,
      matches: matches ? matches.length : matches
    });
    setSearchOpen(open);
    setSearchText(text);
  };

  const onValueChanged = (value, change) => {
    addEventLog("valueChanged", value ? value.length : 0);
    updateValue(value);
  };

  const onLineNumberClick = (line, event) => {
    addEventLog("lineNumberClick", line);
  };

  const onKeyDown = (event) => {
    const { code, altKey, key, controlKey, metaKey, shiftKey } = event;
    addEventLog("keyDown", {
      code,
      altKey,
      key,
      controlKey,
      metaKey,
      shiftKey
    });
  };

  const onKeyUp = (event) => {
    const { code, altKey, key, controlKey, metaKey, shiftKey } = event;
    addEventLog("keyUp", {
      code,
      altKey,
      key,
      controlKey,
      metaKey,
      shiftKey
    });
  };

  const cypherLength = cypher.length;
  const positionString = position ? JSON.stringify(position) : "";
  const focusedString = focused + "";
  const autocompleteString = autocompleteOpen + "";
  const searchString = searchOpen + "";

  const clearHistory = () => {
    addCommandLog("clearHistory", "");
    editor && editor.clearHistory();
  };

  const focusEditor = () => {
    addCommandLog("focus", "");
    editor && editor.focus();
  };

  const selectCompletion = () => {
    addCommandLog("selectAutocompleteOption", autocompleteOptionIndex);
    editor && editor.selectAutocompleteOption(+autocompleteOptionIndex);
  };

  const setAutocompleteOn = () => {
    addCommandLog("setAutocomplete", true);
    setAutocomplete(true);
  };

  const setAutocompleteOff = () => {
    addCommandLog("setAutocomplete", false);
    setAutocomplete(false);
  };

  const setAutocompleteOpenOn = () => {
    addCommandLog("setAutocompleteOpen", true);
    setAutocompleteOpen(true);
  };

  const setAutocompleteOpenOff = () => {
    addCommandLog("setAutocompleteOpen", false);
    setAutocompleteOpen(false);
  };

  const setAutocompleteCloseOnBlurOff = () => {
    addCommandLog("setAutocompleteCloseOnBlur", false);
    setAutocompleteCloseOnBlur(false);
  };

  const setAutocompleteCloseOnBlurOn = () => {
    addCommandLog("setAutocompleteCloseOnBlur", true);
    setAutocompleteCloseOnBlur(true);
  };

  const setAutocompleteTriggerStringsDefault = () => {
    addCommandLog(
      "setAutocompleteTriggerStrings",
      initialOptions.autocompleteTriggerStrings
    );
    setAutocompleteTriggerStrings(initialOptions.autocompleteTriggerStrings);
  };

  const setAutocompleteTriggerStringsNone = () => {
    addCommandLog("setAutocompleteTriggerStrings", false);
    setAutocompleteTriggerStrings(false);
  };

  const setBracketMatchingOn = () => {
    addCommandLog("setBracketMatching", true);
    setBracketMatching(true);
  };

  const setBracketMatchingOff = () => {
    addCommandLog("setBracketMatching", false);
    setBracketMatching(false);
  };

  const setCloseBracketsOn = () => {
    addCommandLog("setCloseBrackets", true);
    setCloseBrackets(true);
  };

  const setCloseBracketsOff = () => {
    addCommandLog("setCloseBrackets", false);
    setCloseBrackets(false);
  };

  const setCursorWideOn = () => {
    addCommandLog("setCursorWide", true);
    setCursorWide(true);
  };

  const setCursorWideOff = () => {
    addCommandLog("setCursorWide", false);
    setCursorWide(false);
  };

  const setCypherLanguageOn = () => {
    addCommandLog("setCypherLanguage", true);
    setCypherLanguage(true);
  };

  const setCypherLanguageOff = () => {
    addCommandLog("setCypherLanguage", false);
    setCypherLanguage(false);
  };

  const setHistoryOn = () => {
    addCommandLog("setHistory", true);
    setHistory(true);
  };

  const setHistoryOff = () => {
    addCommandLog("setHistory", false);
    setHistory(false);
  };

  const setIndentUnitTwoSpaces = () => {
    addCommandLog("setIndentUnit", "  ");
    setIndentUnit("  ");
  };

  const setIndentUnitTab = () => {
    addCommandLog("setIndentUnit", "\t");
    setIndentUnit("\t");
  };

  const setLineNumberFormatterDefault = () => {
    addCommandLog("setLineNumberFormatter", "default");
    setLineNumberFormatterObject({
      lineNumberFormatter: defaultLineNumberFormatter
    });
  };

  const setLineNumberFormatterNone = () => {
    addCommandLog("setLineNumberFormatter", "none");
    setLineNumberFormatterObject({
      lineNumberFormatter: noneLineNumberFormatter
    });
  };

  const setLineNumberFormatterCustom = () => {
    addCommandLog("setLineNumberFormatter", "custom");
    setLineNumberFormatterObject({
      lineNumberFormatter: customLineNumberFormatter
    });
  };

  const setLineNumbersOn = () => {
    addCommandLog("setLineNumbers", true);
    setLineNumbers(true);
  };

  const setLineNumbersOff = () => {
    addCommandLog("setLineNumbers", false);
    setLineNumbers(false);
  };

  const setLineWrappingOn = () => {
    addCommandLog("setLineWrapping", true);
    setLineWrapping(true);
  };

  const setLineWrappingOff = () => {
    addCommandLog("setLineWrapping", false);
    setLineWrapping(false);
  };

  const setLintOn = () => {
    addCommandLog("setLint", true);
    setLint(true);
  };

  const setLintOff = () => {
    addCommandLog("setLint", false);
    setLint(false);
  };

  const setPlaceholderNone = () => {
    addCommandLog("setPlaceholder", undefined);
    setPlaceholder(undefined);
  };

  const setPlaceholderSample = () => {
    addCommandLog("setPlaceholder", samplePlaceholder);
    setPlaceholder(samplePlaceholder);
  };

  const setPositionTo = (position) => {
    addCommandLog("setPosition", position);
    setPosition(position);
  };

  const setPositionToStart = () => {
    setPositionTo(0);
  };

  const setPositionToEnd = () => {
    setPositionTo(cypherLength);
  };

  const setPositionToAbsolute = () => {
    if (isNumberString(positionPosition)) {
      setPositionTo(+positionPosition);
    }
  };

  const setPositionToLineColumn = () => {
    if (isNumberString(positionLine) && isNumberString(positionColumn)) {
      setPositionTo({ line: +positionLine, column: +positionColumn });
    }
  };

  const setReadOnlyOff = () => {
    addCommandLog("setReadOnly", false);
    setReadOnly(false);
  };

  const setReadOnlyOn = () => {
    addCommandLog("setReadOnly", true);
    setReadOnly(true);
  };

  const setReadOnlyCursorOff = () => {
    addCommandLog("setReadOnlyCursor", false);
    setReadOnlyCursor(false);
  };

  const setReadOnlyCursorOn = () => {
    addCommandLog("setReadOnlyCursor", true);
    setReadOnlyCursor(true);
  };

  const setSchemaSimple = () => {
    addCommandLog("setSchema", "simple");
    setSchema(simpleSchema);
  };

  const setSchemaLong = () => {
    addCommandLog("setSchema", "long");
    setSchema(neo4jSchema);
  };

  const setSearchOn = () => {
    addCommandLog("setSearch", true);
    setSearch(true);
  };

  const setSearchOff = () => {
    addCommandLog("setSearch", false);
    setSearch(false);
  };

  const setSearchMatchesNone = () => {
    addCommandLog("setSearchMatches", 0);
    setSearchMatches(0);
  };

  const setSearchMatchesTen = () => {
    addCommandLog("setSearchMatches", 10);
    setSearchMatches(10);
  };

  const setSearchOpenOn = () => {
    addCommandLog("setSearchOpen", true);
    setSearchOpen(true);
  };

  const setSearchOpenOff = () => {
    addCommandLog("setSearchOpen", false);
    setSearchOpen(false);
  };

  const setSearchTextAll = () => {
    addCommandLog("setSearchText", "all");
    setSearchText("all");
  };

  const setSearchTextCall = () => {
    addCommandLog("setSearchText", "call");
    setSearchText("call");
  };

  const setSearchTextUnion = () => {
    addCommandLog("setSearchText", "union");
    setSearchText("union");
  };

  const setSearchTopOn = () => {
    addCommandLog("setSearchTop", true);
    setSearchTop(true);
  };

  const setSearchTopOff = () => {
    addCommandLog("setSearchTop", false);
    setSearchTop(false);
  };

  const setSelectionGrowing = () => {
    addCommandLog("setSelection", selectionGrowing);
    setSelection(selectionGrowing);
  };

  const setSelectionZigzag = () => {
    addCommandLog("setSelection", selectionZigzag);
    setSelection(selectionZigzag);
  };

  const setTabKeyOff = () => {
    addCommandLog("setTabKey", false);
    setTabKey(false);
  };

  const setTabKeyOn = () => {
    addCommandLog("setTabKey", true);
    setTabKey(true);
  };

  const setThemeLight = () => {
    addCommandLog("setTheme", "light");
    setTheme("light");
  };

  const setThemeDark = () => {
    addCommandLog("setTheme", "dark");
    setTheme("dark");
  };

  const setThemeAuto = () => {
    addCommandLog("setTheme", "auto");
    setTheme("auto");
  };

  const setTooltipAbsoluteOff = () => {
    addCommandLog("setTooltipAbsolute", false);
    setTooltipAbsolute(false);
  };

  const setTooltipAbsoluteOn = () => {
    addCommandLog("setTooltipAbsolute", true);
    setTooltipAbsolute(true);
  };

  const setValueLong = () => {
    if (editor) {
      addCommandLog("setValue", longQuery.length + " (long)");
      updateValue(longQuery);
    }
  };

  const setValueSimple = () => {
    if (editor) {
      addCommandLog("setValue", simpleQuery.length + " (simple)");
      updateValue(simpleQuery);
    }
  };

  const setValueClear = () => {
    if (editor) {
      addCommandLog("setValue", "0 (clear)");
      updateValue("");
    }
  };

  const setStyledOn = () => {
    setStyled(true);
  };

  const setStyledOff = () => {
    setStyled(false);
  };

  const positionPositionChanged = (e) => {
    const { target } = e;
    const { value } = target;
    let updateParams;
    if (value === "" || isNumberString(value)) {
      setPositionPosition(value);
      updateParams = { positionPosition: value };
    } else {
      e.target.value = positionPosition;
    }
    updateGoButtons(updateParams);
  };

  const positionLineChanged = (e) => {
    const { target } = e;
    const { value } = target;
    let updateParams;
    if (value === "" || isNumberString(value)) {
      setPositionLine(value);
      updateParams = { positionLine: value };
    } else {
      e.target.value = positionLine;
    }
    updateGoButtons(updateParams);
  };

  const positionColumnChanged = (e) => {
    const { target } = e;
    const { value } = target;
    let updateParams;
    if (value === "" || isNumberString(value)) {
      setPositionColumn(value);
      updateParams = { positionColumn: value };
    } else {
      e.target.value = positionColumn;
    }
    updateGoButtons(updateParams);
  };

  const autocompleteOptionIndexChanged = (e) => {
    const { target } = e;
    const { value } = target;
    let updateParams;
    if (value === "" || isNumberString(value)) {
      setAutocompleteOptionIndex(value);
      updateParams = { autocompleteOptionIndex: value };
    } else {
      e.target.value = autocompleteOptionIndex;
    }
    updatePickGoButtons(updateParams);
  };

  let content = "";
  if (loading) {
    content = <p>...waiting</p>;
  } else if (error) {
    content = <p style={{ color: "red" }}>{error.message}</p>;
  } else if (results) {
    content = results.records.map((record, i) => (
      <pre key={i}>{JSON.stringify(record)}</pre>
    ));
  }

  return (
    <div className="database">
      <div className="left">
        <div className="setting">
          <div className="setting-label">Autocomplete</div>
          <div className="setting-values">
            <button
              className={autocomplete === true ? "setting-active" : undefined}
              onClick={setAutocompleteOn}
            >
              True
            </button>
            <button
              className={autocomplete === false ? "setting-active" : undefined}
              onClick={setAutocompleteOff}
            >
              False
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Autocomplete Close On Blur</div>
          <div className="setting-values">
            <button
              className={
                autocompleteCloseOnBlur === false ? "setting-active" : undefined
              }
              onClick={setAutocompleteCloseOnBlurOff}
            >
              False
            </button>
            <button
              className={
                autocompleteCloseOnBlur === true ||
                autocompleteCloseOnBlur === undefined
                  ? "setting-active"
                  : undefined
              }
              onClick={setAutocompleteCloseOnBlurOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Autocomplete Open</div>
          <div className="setting-values">
            <button
              className={
                autocompleteOpen === false ? "setting-active" : undefined
              }
              onClick={setAutocompleteOpenOff}
            >
              False
            </button>
            <button
              className={
                autocompleteOpen === true ? "setting-active" : undefined
              }
              onClick={setAutocompleteOpenOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Autocomplete Select</div>

          <div className="setting-values">
            <label htmlFor="autocompleteOptionIndex">index</label>
            <input
              className="short-input"
              name="autocompleteOptionIndex"
              type="text"
              value={autocompleteOptionIndex}
              onInput={autocompleteOptionIndexChanged}
            />
            <button
              disabled={!selectAutocompleteOptionEnabled}
              onClick={selectCompletion}
            >
              Go
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Autocomplete Triggers</div>
          <div className="setting-values">
            <button
              className={
                autocompleteTriggerStrings ===
                initialOptions.autocompleteTriggerStrings
                  ? "setting-active"
                  : undefined
              }
              onClick={setAutocompleteTriggerStringsDefault}
            >
              Default
            </button>
            <button
              className={
                autocompleteTriggerStrings === false
                  ? "setting-active"
                  : undefined
              }
              onClick={setAutocompleteTriggerStringsNone}
            >
              False
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Bracket Matching</div>
          <div className="setting-values">
            <button
              className={bracketMatching ? "setting-active" : undefined}
              onClick={setBracketMatchingOn}
            >
              True
            </button>
            <button
              className={!bracketMatching ? "setting-active" : undefined}
              onClick={setBracketMatchingOff}
            >
              False
            </button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">Close Brackets</div>
          <div className="setting-values">
            <button
              className={closeBrackets ? "setting-active" : undefined}
              onClick={setCloseBracketsOn}
            >
              True
            </button>
            <button
              className={!closeBrackets ? "setting-active" : undefined}
              onClick={setCloseBracketsOff}
            >
              False
            </button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">Cursor Wide</div>
          <div className="setting-values">
            <button
              className={cursorWide ? "setting-active" : undefined}
              onClick={setCursorWideOn}
            >
              True
            </button>
            <button
              className={!cursorWide ? "setting-active" : undefined}
              onClick={setCursorWideOff}
            >
              False
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Cypher Language</div>
          <div className="setting-values">
            <button
              className={cypherLanguage ? "setting-active" : undefined}
              onClick={setCypherLanguageOn}
            >
              True
            </button>
            <button
              className={!cypherLanguage ? "setting-active" : undefined}
              onClick={setCypherLanguageOff}
            >
              False
            </button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">Focus</div>
          <div className="setting-values">
            <button onClick={focusEditor}>Focus Editor</button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">History</div>
          <div className="setting-values">
            <button
              className={history ? "setting-active" : undefined}
              onClick={setHistoryOn}
            >
              True
            </button>
            <button
              className={!history ? "setting-active" : undefined}
              onClick={setHistoryOff}
            >
              False
            </button>
            <button onClick={clearHistory}>Clear</button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Indent Unit</div>
          <div className="setting-values">
            <button
              className={indentUnit === "  " ? "setting-active" : undefined}
              onClick={setIndentUnitTwoSpaces}
            >
              Two Spaces
            </button>
            <button
              className={indentUnit === "\t" ? "setting-active" : undefined}
              onClick={setIndentUnitTab}
            >
              Tab
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Line Number Formatter</div>
          <div className="setting-values">
            <button
              className={
                lineNumberFormatter === defaultLineNumberFormatter
                  ? "setting-active"
                  : undefined
              }
              onClick={setLineNumberFormatterDefault}
            >
              Default
            </button>
            <button
              className={
                lineNumberFormatter === noneLineNumberFormatter
                  ? "setting-active"
                  : undefined
              }
              onClick={setLineNumberFormatterNone}
            >
              None
            </button>
            <button
              className={
                lineNumberFormatter === customLineNumberFormatter
                  ? "setting-active"
                  : undefined
              }
              onClick={setLineNumberFormatterCustom}
            >
              Custom
            </button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">Line Numbers</div>
          <div className="setting-values">
            <button
              className={lineNumbers === true ? "setting-active" : undefined}
              onClick={setLineNumbersOn}
            >
              True
            </button>
            <button
              className={lineNumbers === false ? "setting-active" : undefined}
              onClick={setLineNumbersOff}
            >
              False
            </button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">Line Wrapping</div>
          <div className="setting-values">
            <button
              className={lineWrapping === false ? "setting-active" : undefined}
              onClick={setLineWrappingOff}
            >
              False
            </button>
            <button
              className={lineWrapping === true ? "setting-active" : undefined}
              onClick={setLineWrappingOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting setting-short">
          <div className="setting-label">Lint</div>
          <div className="setting-values">
            <button
              className={lint === true ? "setting-active" : undefined}
              onClick={setLintOn}
            >
              True
            </button>
            <button
              className={lint === false ? "setting-active" : undefined}
              onClick={setLintOff}
            >
              False
            </button>
          </div>
        </div>

        <div className="setting setting-short">
          <div className="setting-label">Placeholder</div>
          <div className="setting-values">
            <button
              className={
                placeholder === undefined ? "setting-active" : undefined
              }
              onClick={setPlaceholderNone}
            >
              None
            </button>
            <button
              className={
                placeholder === samplePlaceholder ? "setting-active" : undefined
              }
              onClick={setPlaceholderSample}
            >
              Sample
            </button>
          </div>
        </div>

        <div className="setting setting-long position">
          <div className="setting-label position-start-end">
            Position
            <button title="start" onClick={setPositionToStart}>
              start
            </button>
            <button title="end" onClick={setPositionToEnd}>
              end
            </button>
          </div>
          <div className="setting-values position-position">
            <label htmlFor="position">position</label>
            <input
              name="position"
              type="text"
              value={positionPosition}
              onInput={positionPositionChanged}
            />
            <button
              disabled={!goPositionPositionEnabled}
              onClick={setPositionToAbsolute}
            >
              Go
            </button>
          </div>
          <div className="setting-values position-line-column">
            <label htmlFor="line">line</label>
            <input
              className="short-input"
              name="line"
              type="text"
              value={positionLine}
              onInput={positionLineChanged}
            />
            <label htmlFor="column">column</label>
            <input
              className="short-input"
              name="column"
              type="text"
              value={positionColumn}
              onInput={positionColumnChanged}
            />
            <button
              disabled={!goPositionLineColumnEnabled}
              onClick={setPositionToLineColumn}
            >
              Go
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Read Only</div>
          <div className="setting-values">
            <button
              className={readOnly === false ? "setting-active" : undefined}
              onClick={setReadOnlyOff}
            >
              False
            </button>
            <button
              className={readOnly === true ? "setting-active" : undefined}
              onClick={setReadOnlyOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Read Only Cursor</div>
          <div className="setting-values">
            <button
              disabled={!readOnly}
              className={
                readOnlyCursor === false ? "setting-active" : undefined
              }
              onClick={setReadOnlyCursorOff}
            >
              False
            </button>
            <button
              disabled={!readOnly}
              className={readOnlyCursor === true ? "setting-active" : undefined}
              onClick={setReadOnlyCursorOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting setting-short schema">
          <div className="setting-label">Schema</div>
          <div className="setting-values">
            <button
              className={schema === simpleSchema ? "setting-active" : undefined}
              onClick={setSchemaSimple}
            >
              Simple
            </button>
            <button
              className={schema === neo4jSchema ? "setting-active" : undefined}
              onClick={setSchemaLong}
            >
              Long
            </button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">Search</div>
          <div className="setting-values">
            <button
              className={search === false ? "setting-active" : undefined}
              onClick={setSearchOff}
            >
              False
            </button>
            <button
              className={search === true ? "setting-active" : undefined}
              onClick={setSearchOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Search Matches</div>
          <div className="setting-values">
            <button
              className={searchMatches === 0 ? "setting-active" : undefined}
              onClick={setSearchMatchesNone}
            >
              0
            </button>
            <button
              className={searchMatches === 10 ? "setting-active" : undefined}
              onClick={setSearchMatchesTen}
            >
              10
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Search Open</div>
          <div className="setting-values">
            <button
              className={searchOpen === false ? "setting-active" : undefined}
              onClick={setSearchOpenOff}
            >
              False
            </button>
            <button
              className={searchOpen === true ? "setting-active" : undefined}
              onClick={setSearchOpenOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Search Text</div>
          <div className="setting-values">
            <button
              className={searchText === "all" ? "setting-active" : undefined}
              onClick={setSearchTextAll}
            >
              all
            </button>
            <button
              className={searchText === "call" ? "setting-active" : undefined}
              onClick={setSearchTextCall}
            >
              call
            </button>
            <button
              className={searchText === "union" ? "setting-active" : undefined}
              onClick={setSearchTextUnion}
            >
              union
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Search Top</div>
          <div className="setting-values">
            <button
              className={searchTop === false ? "setting-active" : undefined}
              onClick={setSearchTopOff}
            >
              False
            </button>
            <button
              className={searchTop === true ? "setting-active" : undefined}
              onClick={setSearchTopOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting setting-long selection">
          <div className="setting-label">Selection</div>
          <div className="setting-values">
            <button
              className={
                selection === selectionZigzag ? "setting-active" : undefined
              }
              onClick={setSelectionZigzag}
            >
              Zigzag
            </button>
            <button
              className={
                selection === selectionGrowing ? "setting-active" : undefined
              }
              onClick={setSelectionGrowing}
            >
              Growing
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Tab Key Enabled</div>
          <div className="setting-values">
            <button
              className={tabKey === false ? "setting-active" : undefined}
              onClick={setTabKeyOff}
            >
              False
            </button>
            <button
              className={tabKey === true ? "setting-active" : undefined}
              onClick={setTabKeyOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting setting-short">
          <div className="setting-label">Theme</div>
          <div className="setting-values">
            <button
              className={theme === "light" ? "setting-active" : undefined}
              onClick={setThemeLight}
            >
              Light
            </button>
            <button
              className={theme === "dark" ? "setting-active" : undefined}
              onClick={setThemeDark}
            >
              Dark
            </button>
            <button
              className={theme === "auto" ? "setting-active" : undefined}
              onClick={setThemeAuto}
            >
              Auto
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Tooltip Absolute</div>
          <div className="setting-values">
            <button
              className={
                tooltipAbsolute === false ? "setting-active" : undefined
              }
              onClick={setTooltipAbsoluteOff}
            >
              False
            </button>
            <button
              className={
                tooltipAbsolute === true ? "setting-active" : undefined
              }
              onClick={setTooltipAbsoluteOn}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting cypher">
          <div className="setting-label">Value</div>
          <div className="setting-values">
            <button
              className={cypher === longQuery ? "setting-active" : undefined}
              onClick={setValueLong}
            >
              Long
            </button>
            <button
              className={cypher === simpleQuery ? "setting-active" : undefined}
              onClick={setValueSimple}
            >
              Simple
            </button>
            <button
              className={cypher === "" ? "setting-active" : undefined}
              onClick={setValueClear}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="setting style">
          <div className="setting-label">Style</div>
          <div className="setting-values">
            <button
              className={styled ? "setting-active" : undefined}
              onClick={setStyledOn}
            >
              Styled
            </button>
            <button
              className={!styled ? "setting-active" : undefined}
              onClick={setStyledOff}
            >
              Unstyled
            </button>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="card">
          <h1>{title}</h1>
        </div>
        <div className="card">
          <CypherEditor
            onAutocompleteChanged={onAutocompleteChanged}
            onEditorCreated={onEditorCreated}
            onFocusChanged={onFocusChanged}
            onPositionChanged={onPositionChanged}
            onSelectionChanged={onSelectionChanged}
            onScrollChanged={onScrollChanged}
            onSearchChanged={onSearchChanged}
            onValueChanged={onValueChanged}
            onLineNumberClick={onLineNumberClick}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            autocomplete={autocomplete}
            autocompleteCloseOnBlur={autocompleteCloseOnBlur}
            autocompleteOpen={autocompleteOpen}
            autocompleteTriggerStrings={autocompleteTriggerStrings}
            autofocus={autofocus}
            bracketMatching={bracketMatching}
            closeBrackets={closeBrackets}
            cursorWide={cursorWide}
            cypherLanguage={cypherLanguage}
            history={history}
            indentUnit={indentUnit}
            lineNumberFormatter={lineNumberFormatter}
            lineNumbers={lineNumbers}
            lineWrapping={lineWrapping}
            lint={lint}
            placeholder={placeholder}
            position={position}
            readOnly={readOnly}
            readOnlyCursor={readOnlyCursor}
            schema={schema}
            search={search}
            searchMatches={searchMatches}
            searchOpen={searchOpen}
            searchText={searchText}
            searchTop={searchTop}
            selection={selection}
            tabKey={tabKey}
            theme={theme}
            tooltipAbsolute={tooltipAbsolute}
            parseOnSetValue={parseOnSetValue}
            value={cypher}
            className="database-editor"
            style={style}
          />
        </div>
        <div className="card">
          <div className="info">
            <div className="info-item-long">Position: {positionString}</div>
            <div className="info-item">Length: {cypherLength}</div>
            <div className="info-item">Line Count: {lineCount}</div>
            <div className="info-item">Focused: {focusedString}</div>
            <div className="info-item">Autocomplete: {autocompleteString}</div>
            <div className="info-item">Search: {searchString}</div>
          </div>
        </div>
        <div className="card">
          <div className="logs">
            <div className="logs-header">
              <h3>Logs</h3>
              <button onClick={clearLogs}> Clear </button>
            </div>
            <div className="logs-filters">
              {eventTypes.map((eventType) => (
                <div key={eventType} className="logs-filter">
                  <label htmlFor={eventType}>{eventType}</label>
                  <input
                    type="checkbox"
                    checked={eventFilters[eventType]}
                    onChange={() => {
                      onFilterChange(eventType);
                    }}
                  />
                </div>
              ))}
            </div>
            <textarea id="log" readOnly value={logText} ref={textareaRef} />
          </div>
        </div>
        <div className="card">
          <div className="results">
            <button onClick={send}> Run Current Query </button>
            <h3>Results</h3>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
