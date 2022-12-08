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
  createEventTypeFilterMap
} from "demo-base";

const driver = createDriver();

const Database = ({ CypherEditor, codemirrorVersion, framework, bundler }) => {
  const title = getTitle({ codemirrorVersion, framework, bundler });

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
  const [cypher, setCypher] = useState(initialOptions.value);
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState(null);
  const [focused, setFocused] = useState(initialOptions.autofocus);
  const [history, setHistory] = useState(initialOptions.history);
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
  const [readOnly, setReadOnly] = useState(initialOptions.readOnly);
  const [readOnlyCursor, setReadOnlyCursor] = useState(
    initialOptions.readOnlyCursor
  );
  const [results, setResults] = useState(null);
  const [schema, setSchema] = useState(initialOptions.schema);
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

  const onValueChanged = (value, change) => {
    addEventLog("valueChanged", value ? value.length : 0);
    updateValue(value);
  };

  const onPositionChanged = (positionObject) => {
    addEventLog("positionChanged", positionObject);
    setPosition(positionObject);
  };

  const onAutocompleteChanged = (open, from, options) => {
    addEventLog("autocompleteChanged", { open, from, options });
    setAutocompleteOpen(open);
    setAutocompleteOptions(options);
    updatePickGoButtons({
      autocompleteOpen: open,
      autocompleteOptions: options
    });
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

  const onEditorCreated = (editor) => {
    addEventLog("editorCreated", "");
    setEditor(editor);
    setPosition(editor.getPosition());
    setLineCount(editor.getLineCount());
    updateGoButtons({ cypherEditor: editor });
  };

  const onFocusChanged = (focused) => {
    addEventLog("focusChanged", focused);
    setFocused(focused);
  };

  const onScrollChanged = (scrollInfo) => {
    addEventLog(
      "scrollChanged",
      getChangedScrollInfo(lastScrollInfo, scrollInfo)
    );
    setLastScrollInfo(scrollInfo);
  };

  const lightTheme = () => {
    addCommandLog("setTheme", "light");
    setTheme("light");
  };

  const darkTheme = () => {
    addCommandLog("setTheme", "dark");
    setTheme("dark");
  };

  const cypherLength = cypher.length;
  const positionString = position ? JSON.stringify(position) : "";
  const focusedString = focused + "";
  const autocompleteString = autocompleteOpen + "";

  const showLineNumbers = () => {
    addCommandLog("setLineNumbers", true);
    setLineNumbers(true);
  };

  const hideLineNumbers = () => {
    addCommandLog("setLineNumbers", false);
    setLineNumbers(false);
  };

  const setNoPlaceholder = () => {
    addCommandLog("setPlaceholder", undefined);
    setPlaceholder(undefined);
  };

  const setSamplePlaceholder = () => {
    addCommandLog("setPlaceholder", samplePlaceholder);
    setPlaceholder(samplePlaceholder);
  };

  const showLineWrapping = () => {
    addCommandLog("setLineWrapping", true);
    setLineWrapping(true);
  };

  const showNoLineWrapping = () => {
    addCommandLog("setLineWrapping", false);
    setLineWrapping(false);
  };

  const makeReadable = () => {
    addCommandLog("setReadOnly", false);
    setReadOnly(false);
  };

  const makeReadOnly = () => {
    addCommandLog("setReadOnly", true);
    setReadOnly(true);
  };

  const makeReadOnlyNoCursor = () => {
    addCommandLog("setReadOnlyCursor", false);
    setReadOnlyCursor(false);
  };

  const makeReadOnlyCursor = () => {
    addCommandLog("setReadOnlyCursor", true);
    setReadOnlyCursor(true);
  };

  const enableAutocomplete = () => {
    addCommandLog("setAutocomplete", true);
    setAutocomplete(true);
  };

  const disableAutocomplete = () => {
    addCommandLog("setAutocomplete", false);
    setAutocomplete(false);
  };

  const enableLint = () => {
    addCommandLog("setLint", true);
    setLint(true);
  };

  const disableLint = () => {
    addCommandLog("setLint", false);
    setLint(false);
  };

  const enableHistory = () => {
    addCommandLog("setHistory", true);
    setHistory(true);
  };

  const disableHistory = () => {
    addCommandLog("setHistory", false);
    setHistory(false);
  };

  const clearHistory = () => {
    addCommandLog("clearHistory", "");
    editor && editor.clearHistory();
  };

  const focusEditor = () => {
    addCommandLog("focus", "");
    editor && editor.focus();
  };

  const showDefaultLineNumberFormatter = () => {
    addCommandLog("setLineNumberFormatter", "default");
    setLineNumberFormatterObject({
      lineNumberFormatter: defaultLineNumberFormatter
    });
  };

  const showNoneLineNumberFormatter = () => {
    addCommandLog("setLineNumberFormatter", "none");
    setLineNumberFormatterObject({
      lineNumberFormatter: noneLineNumberFormatter
    });
  };

  const showCustomLineNumberFormatter = () => {
    addCommandLog("setLineNumberFormatter", "custom");
    setLineNumberFormatterObject({
      lineNumberFormatter: customLineNumberFormatter
    });
  };

  const showSimpleSchema = () => {
    addCommandLog("setSchema", "simple");
    setSchema(simpleSchema);
  };

  const showLongSchema = () => {
    addCommandLog("setSchema", "long");
    setSchema(neo4jSchema);
  };

  const showDefaultAutocompleteTriggerStrings = () => {
    addCommandLog(
      "setAutocompleteTriggerStrings",
      initialOptions.autocompleteTriggerStrings
    );
    setAutocompleteTriggerStrings(initialOptions.autocompleteTriggerStrings);
  };

  const showNoAutocompleteTriggerStrings = () => {
    addCommandLog("setAutocompleteTriggerStrings", false);
    setAutocompleteTriggerStrings(false);
  };

  const showStickyAutocomplete = () => {
    addCommandLog("setAutocompleteCloseOnBlur", false);
    setAutocompleteCloseOnBlur(false);
  };

  const showUnstickyAutocomplete = () => {
    addCommandLog("setAutocompleteCloseOnBlur", true);
    setAutocompleteCloseOnBlur(true);
  };

  const goToPosition = (position) => {
    addCommandLog("setPosition", position);
    setPosition(position);
    editor && editor.focus();
  };

  const goToPositionStart = () => {
    goToPosition(0);
  };

  const goToPositionEnd = () => {
    goToPosition(cypherLength);
  };

  const goToPositionPosition = () => {
    if (isNumberString(positionPosition)) {
      goToPosition(+positionPosition);
    }
  };

  const goToPositionLineColumn = () => {
    if (isNumberString(positionLine) && isNumberString(positionColumn)) {
      goToPosition({ line: +positionLine, column: +positionColumn });
    }
  };

  const selectCompletion = () => {
    addCommandLog("selectCompletion", autocompleteOptionIndex);
    editor && editor.selectAutocompleteOption(+autocompleteOptionIndex);
  };

  const isNumberString = (v) => v === "0" || /^([1-9])([0-9])*$/.test(v);

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

  const showLongValue = () => {
    if (editor) {
      addCommandLog("setValue", longQuery.length + " (long)");
      updateValue(longQuery);
    }
  };

  const showSimpleValue = () => {
    if (editor) {
      addCommandLog("setValue", simpleQuery.length + " (simple)");
      updateValue(simpleQuery);
    }
  };

  const clearValue = () => {
    if (editor) {
      addCommandLog("setValue", "0 (clear)");
      updateValue("");
    }
  };

  const disableTabKey = () => {
    addCommandLog("setTabKey", false);
    setTabKey(false);
  };

  const enableTabKey = () => {
    addCommandLog("setTabKey", true);
    setTabKey(true);
  };

  const disableTooltipAbsolute = () => {
    addCommandLog("setTooltipAbsolute", false);
    setTooltipAbsolute(false);
  };

  const enableTooltipAbsolute = () => {
    addCommandLog("setTooltipAbsolute", true);
    setTooltipAbsolute(true);
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
        <div className="setting setting-short">
          <div className="setting-label">Theme</div>
          <div className="setting-values">
            <button
              className={theme === "light" ? "setting-active" : undefined}
              onClick={lightTheme}
            >
              Light
            </button>
            <button
              className={theme === "dark" ? "setting-active" : undefined}
              onClick={darkTheme}
            >
              Dark
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
              onClick={setNoPlaceholder}
            >
              None
            </button>
            <button
              className={
                placeholder === samplePlaceholder ? "setting-active" : undefined
              }
              onClick={setSamplePlaceholder}
            >
              Sample
            </button>
          </div>
        </div>

        <div className="setting setting-short schema">
          <div className="setting-label">Schema</div>
          <div className="setting-values">
            <button
              className={schema === simpleSchema ? "setting-active" : undefined}
              onClick={showSimpleSchema}
            >
              Simple
            </button>
            <button
              className={schema === neo4jSchema ? "setting-active" : undefined}
              onClick={showLongSchema}
            >
              Long
            </button>
          </div>
        </div>

        <div className="setting setting-short">
          <div className="setting-label">Lint</div>
          <div className="setting-values">
            <button
              className={lint === true ? "setting-active" : undefined}
              onClick={enableLint}
            >
              True
            </button>
            <button
              className={lint === false ? "setting-active" : undefined}
              onClick={disableLint}
            >
              False
            </button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">Line Numbers</div>
          <div className="setting-values">
            <button
              className={lineNumbers === true ? "setting-active" : undefined}
              onClick={showLineNumbers}
            >
              True
            </button>
            <button
              className={lineNumbers === false ? "setting-active" : undefined}
              onClick={hideLineNumbers}
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
              onClick={showNoLineWrapping}
            >
              False
            </button>
            <button
              className={lineWrapping === true ? "setting-active" : undefined}
              onClick={showLineWrapping}
            >
              True
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
              onClick={showDefaultLineNumberFormatter}
            >
              Default
            </button>
            <button
              className={
                lineNumberFormatter === noneLineNumberFormatter
                  ? "setting-active"
                  : undefined
              }
              onClick={showNoneLineNumberFormatter}
            >
              None
            </button>
            <button
              className={
                lineNumberFormatter === customLineNumberFormatter
                  ? "setting-active"
                  : undefined
              }
              onClick={showCustomLineNumberFormatter}
            >
              Custom
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Read Only</div>
          <div className="setting-values">
            <button
              className={readOnly === false ? "setting-active" : undefined}
              onClick={makeReadable}
            >
              False
            </button>
            <button
              className={readOnly === true ? "setting-active" : undefined}
              onClick={makeReadOnly}
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
              onClick={makeReadOnlyNoCursor}
            >
              False
            </button>
            <button
              disabled={!readOnly}
              className={readOnlyCursor === true ? "setting-active" : undefined}
              onClick={makeReadOnlyCursor}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">Autocomplete</div>
          <div className="setting-values">
            <button
              className={autocomplete === true ? "setting-active" : undefined}
              onClick={enableAutocomplete}
            >
              True
            </button>
            <button
              className={autocomplete === false ? "setting-active" : undefined}
              onClick={disableAutocomplete}
            >
              False
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
              onClick={showDefaultAutocompleteTriggerStrings}
            >
              Default
            </button>
            <button
              className={
                autocompleteTriggerStrings === false
                  ? "setting-active"
                  : undefined
              }
              onClick={showNoAutocompleteTriggerStrings}
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
              onClick={showStickyAutocomplete}
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
              onClick={showUnstickyAutocomplete}
            >
              True
            </button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">History</div>
          <div className="setting-values">
            <button
              className={history ? "setting-active" : undefined}
              onClick={enableHistory}
            >
              True
            </button>
            <button
              className={!history ? "setting-active" : undefined}
              onClick={disableHistory}
            >
              False
            </button>
            <button onClick={clearHistory}>Clear</button>
          </div>
        </div>

        <div className="setting">
          <div className="setting-label">Focus</div>
          <div className="setting-values">
            <button onClick={focusEditor}>Focus Editor</button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">
            Position
            <button title="start" onClick={goToPositionStart}>
              start
            </button>
            <button title="end" onClick={goToPositionEnd}>
              end
            </button>
          </div>
          <div className="setting-values">
            <label htmlFor="position">position</label>
            <input
              name="position"
              type="text"
              value={positionPosition}
              onInput={positionPositionChanged}
            />
            <button
              disabled={!goPositionPositionEnabled}
              onClick={goToPositionPosition}
            >
              Go
            </button>
          </div>
          <div className="setting-values">
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
              onClick={goToPositionLineColumn}
            >
              Go
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Select Completion</div>

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

        <div className="setting cypher">
          <div className="setting-label">Value</div>
          <div className="setting-values">
            <button
              className={cypher === longQuery ? "setting-active" : undefined}
              onClick={showLongValue}
            >
              Long
            </button>
            <button
              className={cypher === simpleQuery ? "setting-active" : undefined}
              onClick={showSimpleValue}
            >
              Simple
            </button>
            <button
              className={cypher === "" ? "setting-active" : undefined}
              onClick={clearValue}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="setting setting-long">
          <div className="setting-label">Tab Key Enabled</div>
          <div className="setting-values">
            <button
              className={tabKey === false ? "setting-active" : undefined}
              onClick={disableTabKey}
            >
              False
            </button>
            <button
              className={tabKey === true ? "setting-active" : undefined}
              onClick={enableTabKey}
            >
              True
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
              onClick={disableTooltipAbsolute}
            >
              False
            </button>
            <button
              className={
                tooltipAbsolute === true ? "setting-active" : undefined
              }
              onClick={enableTooltipAbsolute}
            >
              True
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
            onValueChanged={onValueChanged}
            onPositionChanged={onPositionChanged}
            onFocusChanged={onFocusChanged}
            onAutocompleteChanged={onAutocompleteChanged}
            onLineNumberClick={onLineNumberClick}
            onKeyDown={onKeyDown}
            onScrollChanged={onScrollChanged}
            onEditorCreated={onEditorCreated}
            autocomplete={autocomplete}
            autocompleteCloseOnBlur={autocompleteCloseOnBlur}
            autocompleteOpen={autocompleteOpen}
            schema={schema}
            autocompleteTriggerStrings={autocompleteTriggerStrings}
            autofocus={autofocus}
            history={history}
            lineNumberFormatter={lineNumberFormatter}
            lineNumbers={lineNumbers}
            lineWrapping={lineWrapping}
            lint={lint}
            placeholder={placeholder}
            position={position}
            readOnly={readOnly}
            readOnlyCursor={readOnlyCursor}
            tabKey={tabKey}
            theme={theme}
            tooltipAbsolute={tooltipAbsolute}
            parseOnSetValue={parseOnSetValue}
            value={cypher}
            className="database-editor"
          />
        </div>
        <div className="card">
          <div className="info">
            <div className="info-item-long">Position: {positionString}</div>
            <div className="info-item">Length: {cypherLength}</div>
            <div className="info-item">Line Count: {lineCount}</div>
            <div className="info-item">Focused: {focusedString}</div>
            <div className="info-item">
              Autocompleting: {autocompleteString}
            </div>
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
