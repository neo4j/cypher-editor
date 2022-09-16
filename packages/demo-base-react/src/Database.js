import React, { useState, useRef, useEffect } from "react";
import {
  neo4jSchema,
  simpleSchema,
  longQuery,
  simpleQuery,
  initialPosition,
  createDriver,
  defaultLineNumberFormatter,
  noneLineNumberFormatter,
  customLineNumberFormatter,
  samplePlaceholder,
  defaultTheme,
  initialSchema,
  initialValue,
  initialOptions,
  getTitle,
  getLogText,
  commandLog,
  eventLog,
  getChangedScrollInfo
} from "demo-base";

const driver = createDriver();

const Database = ({ CypherEditor, codemirrorVersion, framework, bundler }) => {
  const title = getTitle({ codemirrorVersion, framework, bundler });
  const [cypher, setCypher] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [theme, setTheme] = useState(defaultTheme);
  const [position, setPosition] = useState(initialPosition);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [focused, setFocused] = useState(
    initialOptions.autofocus !== undefined ? initialOptions.autofocus : true
  );
  const [editor, setEditor] = useState(null);
  const [lineNumbers, setLineNumbers] = useState(
    initialOptions.lineNumbers !== undefined ? initialOptions.lineNumbers : true
  );
  const [lineNumberFormatterObject, setLineNumberFormatterObject] = useState({
    lineNumberFormatter: initialOptions.lineNumberFormatter
  });
  const { lineNumberFormatter } = lineNumberFormatterObject;
  const [schema, setSchema] = useState(initialSchema);
  const [readOnly, setReadOnly] = useState(initialOptions.readOnly !== undefined ? initialOptions.readOnly : false);
  const [autocomplete, setAutocomplete] = useState(
    initialOptions.autocomplete !== undefined ? initialOptions.autocomplete : true
  );
  const [autocompleteTriggerStrings, setAutocompleteTriggerStrings] = useState(
    initialOptions.autocompleteTriggerStrings
  );
  const [autocompleteCloseOnBlur, setAutocompleteCloseOnBlur] = useState(
    initialOptions.autocompleteCloseOnBlur
  );
  const [placeholder, setPlaceholder] = useState(initialOptions.placeholder);
  const [lineWrapping, setLineWrapping] = useState(
    initialOptions.lineWrapping !== undefined
      ? initialOptions.lineWrapping
      : false
  );
  const [lint, setLint] = useState(
    initialOptions.lint !== undefined ? initialOptions.lint : true
  );
  const [positionPosition, setPositionPosition] = useState("0");
  const [positionLine, setPositionLine] = useState("1");
  const [positionColumn, setPositionColumn] = useState("0");
  const [goPositionPositionEnabled, setGoPositionPositionEnabled] =
    useState(false);
  const [goPositionLineColumnEnabled, setGoPositionLineColumnEnabled] =
    useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const [logText, setLogText] = useState("");
  const [lastScrollInfo, setLastScrollInfo] = useState(undefined);
  const textareaRef = useRef(null);

  useEffect(() => {
    const logText = getLogText(logs);
    setLogText(logText);
    if (textareaRef.current) {
      textareaRef.current.value = logText;
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [logs]);

  const clearLogs = () => {
    setLogText("");
    setLogs([]);
  };

  const addCommandLog = (command, argument) => {
    setLogs(logs => logs.concat(commandLog(command, argument)));
  };

  const addEventLog = (event, argument) => {
    setLogs(logs => logs.concat(eventLog(event, argument)));
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

  const onAutocompleteOpenChanged = (autocompleteOpen) => {
    addEventLog("autocompleteOpenChanged", autocompleteOpen);
    setAutocompleteOpen(autocompleteOpen);
  };

  const onLineNumberClicked = (line, event) => {
    addEventLog("lineNumberClicked", line);
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
    editor && editor.setLineNumbers(true);
  };

  const hideLineNumbers = () => {
    addCommandLog("setLineNumbers", false);
    setLineNumbers(false);
    editor && editor.setLineNumbers(false);
  };

  const setNoPlaceholder = () => {
    addCommandLog("setPlaceholder", undefined);
    setPlaceholder(undefined);
    editor && editor.setPlaceholder(undefined);
  };

  const setSamplePlaceholder = () => {
    addCommandLog("setPlaceholder", samplePlaceholder);
    setPlaceholder(samplePlaceholder);
    editor && editor.setPlaceholder(samplePlaceholder);
  };

  const showLineWrapping = () => {
    addCommandLog("setLineWrapping", true);
    setLineWrapping(true);
    editor && editor.setLineWrapping(true);
  };

  const showNoLineWrapping = () => {
    addCommandLog("setLineWrapping", false);
    setLineWrapping(false);
    editor && editor.setLineWrapping(false);
  };

  const makeReadable = () => {
    addCommandLog("setReadOnly", false);
    setReadOnly(false);
    editor && editor.setReadOnly(false);
  };

  const makeReadOnly = () => {
    addCommandLog("setReadOnly", true);
    setReadOnly(true);
    editor && editor.setReadOnly(true);
  };

  const makeReadOnlyNoCursor = () => {
    addCommandLog("setReadOnly", "nocursor");
    setReadOnly("nocursor");
    editor && editor.setReadOnly("nocursor");
  };

  const enableAutocomplete = () => {
    addCommandLog("setAutocomplete", true);
    setAutocomplete(true);
    editor && editor.setAutocomplete(true);
  };

  const disableAutocomplete = () => {
    addCommandLog("setAutocomplete", false);
    setAutocomplete(false);
    editor && editor.setAutocomplete(false);
  };

  const enableLint = () => {
    addCommandLog("setLint", true);
    setLint(true);
    editor && editor.setLint(true);
  };

  const disableLint = () => {
    addCommandLog("setLint", false);
    setLint(false);
    editor && editor.setLint(false);
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
    editor && editor.setLineNumberFormatter(defaultLineNumberFormatter);
  };

  const showNoneLineNumberFormatter = () => {
    addCommandLog("setLineNumberFormatter", "none");
    setLineNumberFormatterObject({
      lineNumberFormatter: noneLineNumberFormatter
    });
    editor && editor.setLineNumberFormatter(noneLineNumberFormatter);
  };

  const showCustomLineNumberFormatter = () => {
    addCommandLog("setLineNumberFormatter", "custom");
    setLineNumberFormatterObject({
      lineNumberFormatter: customLineNumberFormatter
    });
    editor && editor.setLineNumberFormatter(customLineNumberFormatter);
  };

  const showSimpleSchema = () => {
    addCommandLog("setSchema", "simple");
    setSchema(simpleSchema);
    editor && editor.setSchema(simpleSchema);
  };

  const showLongSchema = () => {
    addCommandLog("setSchema", "long");
    setSchema(neo4jSchema);
    editor && editor.setSchema(neo4jSchema);
  };

  const showDefaultAutocompleteTriggerStrings = () => {
    addCommandLog(
      "setAutocompleteTriggerStrings",
      initialOptions.autocompleteTriggerStrings
    );
    setAutocompleteTriggerStrings(initialOptions.autocompleteTriggerStrings);
    editor &&
      editor.setAutocompleteTriggerStrings(
        initialOptions.autocompleteTriggerStrings
      );
  };

  const showNoAutocompleteTriggerStrings = () => {
    addCommandLog("setAutocompleteTriggerStrings", false);
    setAutocompleteTriggerStrings(false);
    editor && editor.setAutocompleteTriggerStrings(false);
  };

  const showStickyAutocomplete = () => {
    addCommandLog("setAutocompleteCloseOnBlur", false);
    setAutocompleteCloseOnBlur(false);
    editor && editor.setAutocompleteCloseOnBlur(false);
  };

  const showUnstickyAutocomplete = () => {
    addCommandLog("setAutocompleteCloseOnBlur", true);
    setAutocompleteCloseOnBlur(true);
    editor && editor.setAutocompleteCloseOnBlur(true);
  };

  const goToPosition = (position) => {
    addCommandLog("goToPosition", position);
    editor && editor.goToPosition(position);
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

  const showLongValue = () => {
    if (editor) {
      addCommandLog("setValue", longQuery.length + " (long)");
      editor && editor.setValue(longQuery);
      updateValue(longQuery);
    }
  };

  const showSimpleValue = () => {
    if (editor) {
      addCommandLog("setValue", simpleQuery.length + " (simple)");
      editor && editor.setValue(simpleQuery);
      updateValue(simpleQuery);
    }
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

        <div className="setting setting-short">
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
            <button
              className={readOnly === "nocursor" ? "setting-active" : undefined}
              onClick={makeReadOnlyNoCursor}
            >
              No Cursor
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

        <div className="setting">
          <div className="setting-label">Value</div>
          <div className="setting-values">
            <button onClick={showLongValue}>Long</button>
            <button onClick={showSimpleValue}>Simple</button>
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
            onAutocompleteOpenChanged={onAutocompleteOpenChanged}
            onLineNumberClicked={onLineNumberClicked}
            onScrollChanged={onScrollChanged}
            onEditorCreated={onEditorCreated}
            initialPosition={initialPosition}
            initialSchema={initialSchema}
            initialValue={initialValue}
            initialOptions={initialOptions}
            theme={theme}
            classNames={["editor"]}
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
