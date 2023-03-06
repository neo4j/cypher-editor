<script lang="ts">
  import { tick } from "svelte";
  import {
    neo4jSchema,
    simpleSchema,
    longQuery,
    simpleQuery,
    initialOptions,
    createDriver,
    defaultLineNumberFormatter,
    noneLineNumberFormatter,
    customLineNumberFormatter,
    samplePlaceholder,
    getTitle,
    getLogText,
    commandLog,
    eventLog,
    getChangedScrollInfo,
    eventTypes,
    createEventTypeFilterMap
  } from "demo-base";

  export let codemirrorVersion = undefined;
  export let framework = undefined;
  export let bundler = undefined;
  export let editor = undefined;

  const title = getTitle({ codemirrorVersion, framework, bundler });

  const driver = createDriver();

  const isNumberString = (v) => v === "0" || /^([1-9])([0-9])*$/.test(v);

  let autocomplete = initialOptions.autocomplete;
  let autocompleteCloseOnBlur = initialOptions.autocompleteCloseOnBlur;
  let autocompleteTriggerStrings = initialOptions.autocompleteTriggerStrings;
  let autofocus = initialOptions.autofocus;
  let bracketMatching = initialOptions.bracketMatching;
  let closeBrackets = initialOptions.closeBrackets;
  let cursorWide = initialOptions.cursorWide;
  let cypherLanguage = initialOptions.cypherLanguage;
  let history = initialOptions.history;
  let indentUnit = initialOptions.indentUnit;
  let lineNumberFormatter = initialOptions.lineNumberFormatter;
  let lineNumbers = initialOptions.lineNumbers;
  let lineWrapping = initialOptions.lineWrapping;
  let lint = initialOptions.lint;
  let parseOnSetValue = initialOptions.parseOnSetValue;
  let placeholder = initialOptions.placeholder;
  let position = initialOptions.position;
  let readOnly = initialOptions.readOnly;
  let readOnlyCursor = initialOptions.readOnlyCursor;
  let schema = initialOptions.schema;
  let search = initialOptions.search;
  let searchMatches = initialOptions.searchMatches;
  let searchOpen = initialOptions.searchOpen;
  let searchText = initialOptions.searchText;
  let searchTop = initialOptions.searchTop;
  let tabKey = initialOptions.tabKey;
  let theme = initialOptions.theme;
  let tooltipAbsolute = initialOptions.tooltipAbsolute;
  let cypher = initialOptions.value;

  let cypherEditor;
  let autocompleteOpen = false;
  let autocompleteOptions = undefined;
  let focused = true;
  let positionPosition = "0";
  let positionLine = "1";
  let positionColumn = "1";
  let lineCount = 0;
  let logs = [];
  let lastScrollInfo;
  let eventFilters = createEventTypeFilterMap(true);

  let promisedResult;

  const send = () => {
    const session = driver.session();
    promisedResult = session.run(cypher);
  };

  let goPositionPositionEnabled;
  let goPositionLineColumnEnabled;
  let autocompleteOptionIndex = "0";
  let selectAutocompleteOptionEnabled = false;

  const updateGoButtons = () => {
    goPositionPositionEnabled =
      isNumberString(positionPosition) &&
      cypherEditor.getPositionForValue(+positionPosition) !== null;
    goPositionLineColumnEnabled =
      isNumberString(positionLine) &&
      isNumberString(positionColumn) &&
      cypherEditor.getPositionForValue({
        line: +positionLine,
        column: +positionColumn
      }) !== null;
  };

  const updatePickGoButtons = () => {
    selectAutocompleteOptionEnabled =
      isNumberString(autocompleteOptionIndex) &&
      autocompleteOpen &&
      autocompleteOptions !== undefined &&
      +autocompleteOptionIndex >= 0 &&
      +autocompleteOptionIndex < autocompleteOptions.length;
  };

  const updateValue = (value) => {
    cypher = value;
    updateGoButtons();
    if (cypherEditor) {
      lineCount = cypherEditor.getLineCount();
    }
  };

  const onAutocompleteChanged = (open, options, option) => {
    logs = logs.concat(
      eventLog("autocompleteChanged", { open, options, option })
    );
    autocompleteOpen = open;
    autocompleteOptions = options;
    updatePickGoButtons();
  };

  const onEditorCreated = (editor) => {
    logs = logs.concat(eventLog("editorCreated", ""));
    cypherEditor = editor;
    position = editor.getPosition();
    lineCount = cypherEditor.getLineCount();
    updateGoButtons();
  };

  const onFocusChanged = (newFocused) => {
    logs = logs.concat(eventLog("focusChanged", newFocused));
    focused = newFocused;
  };

  const onPositionChanged = (positionObject) => {
    logs = logs.concat(eventLog("positionChanged", positionObject));
    position = positionObject;
  };

  const onScrollChanged = (scrollInfo) => {
    logs = logs.concat(
      eventLog(
        "scrollChanged",
        getChangedScrollInfo(lastScrollInfo, scrollInfo)
      )
    );
    lastScrollInfo = scrollInfo;
  };

  const onSearchChanged = (open, text, matches) => {
    logs = logs.concat(
      eventLog("searchChanged", {
        open,
        text,
        matches: matches ? matches.length : matches
      })
    );
    searchOpen = open;
    searchText = text;
  };

  const onValueChanged = (value: string, change?: any) => {
    logs = logs.concat(eventLog("valueChanged", value ? value.length : 0));
    updateValue(value);
  };

  const onKeyDown = (event) => {
    const { code, altKey, key, controlKey, metaKey, shiftKey } = event;
    logs = logs.concat(
      eventLog("keyDown", { code, altKey, key, controlKey, metaKey, shiftKey })
    );
  };

  const onKeyUp = (event) => {
    const { code, altKey, key, controlKey, metaKey, shiftKey } = event;
    logs = logs.concat(
      eventLog("keyUp", { code, altKey, key, controlKey, metaKey, shiftKey })
    );
  };

  const onLineNumberClick = (line, event) => {
    logs = logs.concat(eventLog("lineNumberClick", line));
  };

  $: cypherLength = cypher ? cypher.length : 0;
  $: positionString = position ? JSON.stringify(position) : "";
  $: focusedString = focused + "";
  $: autocompleteString = autocompleteOpen + "";
  $: searchString = searchOpen + "";
  $: logText = getLogText(logs, { eventFilters });

  let textareaRef;
  $: if (logText) autoScrollLog();

  async function autoScrollLog() {
    // Let the DOM populate before scrolling
    await tick();
    textareaRef.scrollTop = logText ? textareaRef.scrollHeight : 0;
  }

  const clearLogs = () => {
    logs = [];
  };

  function appendLog(newEntry) {
    if (cypherEditor) {
      return logs.concat(newEntry);
    }
    return logs;
  }

  function deriveSchemaName(checkSchema) {
    if (checkSchema === simpleSchema) {
      return "simple";
    }
    if (checkSchema === neo4jSchema) {
      return "long";
    }
  }

  function deriveLineNumberFormatterName() {
    if (lineNumberFormatter === defaultLineNumberFormatter) {
      return "default";
    }
    if (lineNumberFormatter === noneLineNumberFormatter) {
      return "none";
    }
    if (lineNumberFormatter === customLineNumberFormatter) {
      return "custom";
    }
  }

  $: logs = appendLog(commandLog("setAutocomplete", autocomplete));
  $: logs = appendLog(
    commandLog("setAutocompleteCloseOnBlur", autocompleteCloseOnBlur)
  );
  $: logs = appendLog(commandLog("setAutocompleteOpen", autocompleteOpen));
  $: logs = appendLog(
    commandLog("setAutocompleteTriggerStrings", autocompleteTriggerStrings)
  );
  $: logs = appendLog(commandLog("setBracketMatching", bracketMatching));
  $: logs = appendLog(commandLog("setCloseBrackets", closeBrackets));
  $: logs = appendLog(commandLog("setCursorWide", cursorWide));
  $: logs = appendLog(commandLog("setCypherLanguage", cypherLanguage));
  $: logs = appendLog(commandLog("setHistory", history));
  $: logs = appendLog(commandLog("setIndentUnit", indentUnit));
  $: logs = appendLog(
    commandLog(
      "setLineNumberFormatter",
      deriveLineNumberFormatterName() + " " + typeof lineNumberFormatter
    )
  );
  $: logs = appendLog(commandLog("setLineNumbers", lineNumbers));
  $: logs = appendLog(commandLog("setLineWrapping", lineWrapping));
  $: logs = appendLog(commandLog("setLint", lint));
  $: logs = appendLog(commandLog("setPlaceholder", placeholder));
  $: logs = appendLog(commandLog("setReadOnly", readOnly));
  $: logs = appendLog(commandLog("setReadOnlyCursor", readOnlyCursor));
  $: logs = appendLog(commandLog("setSchema", deriveSchemaName(schema)));
  $: logs = appendLog(commandLog("setSearch", search));
  $: logs = appendLog(commandLog("setSearchMatches", searchMatches));
  $: logs = appendLog(commandLog("setSearchOpen", searchOpen));
  $: logs = appendLog(commandLog("setSearchText", searchText));
  $: logs = appendLog(commandLog("setSearchTop", searchTop));
  $: logs = appendLog(commandLog("setTabKey", tabKey));
  $: logs = appendLog(commandLog("setTheme", theme));
  $: logs = appendLog(commandLog("setTooltipAbsolute", tooltipAbsolute));

  const clearHistory = () => {
    logs = appendLog(commandLog("clearHistory", ""));
    cypherEditor && cypherEditor.clearHistory();
  };

  const focusEditor = () => {
    logs = logs.concat(commandLog("focus", ""));
    cypherEditor && cypherEditor.focus();
  };

  const selectCompletion = () => {
    logs = appendLog(
      commandLog("selectAutocompleteOption", autocompleteOptionIndex)
    );
    cypherEditor &&
      cypherEditor.selectAutocompleteOption(+autocompleteOptionIndex);
  };

  const setPlaceholderSample = () => {
    placeholder = samplePlaceholder;
  };

  const setPositionTo = (newPosition) => {
    logs = logs.concat(commandLog("setPosition", newPosition));
    position = newPosition;
    cypherEditor && cypherEditor.setPosition(position);
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

  const setValueLong = () => {
    if (cypherEditor) {
      logs = appendLog(commandLog("setValue", longQuery.length + " (long)"));
      updateValue(longQuery);
    }
  };

  const setValueSimple = () => {
    if (cypherEditor) {
      logs = appendLog(
        commandLog("setValue", simpleQuery.length + " (simple)")
      );
      updateValue(simpleQuery);
    }
  };
  const setValueClear = () => {
    if (cypherEditor) {
      logs = appendLog(commandLog("setValue", "0 (clear)"));
      updateValue("");
    }
  };

  const positionPositionChanged = (e) => {
    const { target } = e;
    const { value } = target;
    if (value === "" || isNumberString(value)) {
      positionPosition = value;
    } else {
      e.target.value = positionPosition;
    }
    updateGoButtons();
  };

  const positionLineChanged = (e) => {
    const { target } = e;
    const { value } = target;
    if (value === "" || isNumberString(value)) {
      positionLine = value;
    } else {
      e.target.value = positionLine;
    }
    updateGoButtons();
  };

  const positionColumnChanged = (e) => {
    const { target } = e;
    const { value } = target;
    if (value === "" || isNumberString(value)) {
      positionColumn = value;
    } else {
      e.target.value = positionColumn;
    }
    updateGoButtons();
  };

  const autocompleteOptionIndexChanged = (e) => {
    const { target } = e;
    const { value } = target;
    if (value === "" || isNumberString(value)) {
      autocompleteOptionIndex = value;
    } else {
      e.target.value = autocompleteOptionIndex;
    }
    updatePickGoButtons();
  };
</script>

<div class="database">
  <div class="left">
    <div class="setting">
      <div class="setting-label">Autocomplete</div>
      <div class="setting-values">
        <button
          class={autocomplete === true ? "setting-active" : undefined}
          on:click={() => (autocomplete = true)}>True</button
        >
        <button
          class={autocomplete === false ? "setting-active" : undefined}
          on:click={() => (autocomplete = false)}>False</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Autocomplete Close On Blur</div>
      <div class="setting-values">
        <button
          class={autocompleteCloseOnBlur === false
            ? "setting-active"
            : undefined}
          on:click={() => (autocompleteCloseOnBlur = false)}>False</button
        >
        <button
          class={autocompleteCloseOnBlur === true ||
          autocompleteCloseOnBlur === undefined
            ? "setting-active"
            : undefined}
          on:click={() => (autocompleteCloseOnBlur = true)}>True</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Autocomplete Open</div>
      <div class="setting-values">
        <button
          class={autocompleteOpen === false ? "setting-active" : undefined}
          on:click={() => (autocompleteOpen = false)}>False</button
        >
        <button
          class={autocompleteOpen === true || autocompleteOpen === undefined
            ? "setting-active"
            : undefined}
          on:click={() => (autocompleteOpen = true)}>True</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Autocomplete Select</div>

      <div class="setting-values">
        <label for="autocompleteOptionIndex">index</label>
        <input
          class="short-input"
          name="autocompleteOptionIndex"
          type="text"
          value={autocompleteOptionIndex}
          on:input={autocompleteOptionIndexChanged}
        />
        <button
          disabled={!selectAutocompleteOptionEnabled}
          on:click={selectCompletion}
        >
          Go
        </button>
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Autocomplete Triggers</div>
      <div class="setting-values">
        <button
          class={autocompleteTriggerStrings ===
          initialOptions.autocompleteTriggerStrings
            ? "setting-active"
            : undefined}
          on:click={() =>
            (autocompleteTriggerStrings =
              initialOptions.autocompleteTriggerStrings)}>Default</button
        >
        <button
          class={autocompleteTriggerStrings === false
            ? "setting-active"
            : undefined}
          on:click={() => (autocompleteTriggerStrings = false)}>False</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Bracket Matching</div>
      <div class="setting-values">
        <button
          class={bracketMatching ? "setting-active" : undefined}
          on:click={() => (bracketMatching = true)}>True</button
        >
        <button
          class={!bracketMatching ? "setting-active" : undefined}
          on:click={() => (bracketMatching = false)}>False</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Close Brackets</div>
      <div class="setting-values">
        <button
          class={closeBrackets ? "setting-active" : undefined}
          on:click={() => (closeBrackets = true)}>True</button
        >
        <button
          class={!closeBrackets ? "setting-active" : undefined}
          on:click={() => (closeBrackets = false)}>False</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Cursor Wide</div>
      <div class="setting-values">
        <button
          class={cursorWide ? "setting-active" : undefined}
          on:click={() => (cursorWide = true)}>True</button
        >
        <button
          class={!cursorWide ? "setting-active" : undefined}
          on:click={() => (cursorWide = false)}>False</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Cypher Language</div>
      <div class="setting-values">
        <button
          class={cypherLanguage ? "setting-active" : undefined}
          on:click={() => (cypherLanguage = true)}>True</button
        >
        <button
          class={!cypherLanguage ? "setting-active" : undefined}
          on:click={() => (cypherLanguage = false)}>False</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Focus</div>
      <div class="setting-values">
        <button on:click={focusEditor}>Focus Editor</button>
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">History</div>
      <div class="setting-values">
        <button
          class={history ? "setting-active" : undefined}
          on:click={() => (history = true)}>True</button
        >
        <button
          class={!history ? "setting-active" : undefined}
          on:click={() => (history = false)}>False</button
        >
        <button on:click={clearHistory}>Clear</button>
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Indent Unit</div>
      <div class="setting-values">
        <button
          class={indentUnit === "  " ? "setting-active" : undefined}
          on:click={() => (indentUnit = "  ")}>Two Spaces</button
        >
        <button
          class={indentUnit === "\t" ? "setting-active" : undefined}
          on:click={() => (indentUnit = "\t")}>Tab</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Line Number Formatter</div>
      <div class="setting-values">
        <button
          class={lineNumberFormatter === defaultLineNumberFormatter
            ? "setting-active"
            : undefined}
          on:click={() => (lineNumberFormatter = defaultLineNumberFormatter)}
          >Default</button
        >
        <button
          class={lineNumberFormatter === noneLineNumberFormatter
            ? "setting-active"
            : undefined}
          on:click={() => (lineNumberFormatter = noneLineNumberFormatter)}
          >None</button
        >
        <button
          class={lineNumberFormatter === customLineNumberFormatter
            ? "setting-active"
            : undefined}
          on:click={() => (lineNumberFormatter = customLineNumberFormatter)}
          >Custom</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Line Numbers</div>
      <div class="setting-values">
        <button
          class={lineNumbers === true ? "setting-active" : undefined}
          on:click={() => (lineNumbers = true)}>True</button
        >
        <button
          class={lineNumbers === false ? "setting-active" : undefined}
          on:click={() => (lineNumbers = false)}>False</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Line Wrapping</div>
      <div class="setting-values">
        <button
          class={lineWrapping === false ? "setting-active" : undefined}
          on:click={() => (lineWrapping = false)}>False</button
        >
        <button
          class={lineWrapping === true ? "setting-active" : undefined}
          on:click={() => (lineWrapping = true)}>True</button
        >
      </div>
    </div>

    <div class="setting setting-short">
      <div class="setting-label">Lint</div>
      <div class="setting-values">
        <button
          class={lint === true ? "setting-active" : undefined}
          on:click={() => (lint = true)}>True</button
        >
        <button
          class={lint === false ? "setting-active" : undefined}
          on:click={() => (lint = false)}>False</button
        >
      </div>
    </div>

    <div class="setting setting-short">
      <div class="setting-label">Placeholder</div>
      <div class="setting-values">
        <button
          class={placeholder === undefined ? "setting-active" : undefined}
          on:click={() => (placeholder = undefined)}>None</button
        >
        <button
          class={placeholder === samplePlaceholder
            ? "setting-active"
            : undefined}
          on:click={setPlaceholderSample}>Sample</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">
        Position
        <button title="start" on:click={setPositionToStart}>start</button>
        <button title="end" on:click={setPositionToEnd}>end</button>
      </div>
      <div class="setting-values">
        <label for="position">position</label>
        <input
          name="position"
          type="text"
          value={positionPosition}
          on:input={positionPositionChanged}
        />
        <button
          disabled={!goPositionPositionEnabled}
          on:click={setPositionToAbsolute}>Go</button
        >
      </div>
      <div class="setting-values">
        <label for="line">line</label>
        <input
          class="short-input"
          name="line"
          type="text"
          value={positionLine}
          on:input={positionLineChanged}
        />
        <label for="column">column</label>
        <input
          class="short-input"
          name="column"
          type="text"
          value={positionColumn}
          on:input={positionColumnChanged}
        />
        <button
          disabled={!goPositionLineColumnEnabled}
          on:click={setPositionToLineColumn}>Go</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Read Only</div>
      <div class="setting-values">
        <button
          class={readOnly === false ? "setting-active" : undefined}
          on:click={() => (readOnly = false)}>False</button
        >
        <button
          class={readOnly === true ? "setting-active" : undefined}
          on:click={() => (readOnly = true)}>True</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Read Only Cursor</div>
      <div class="setting-values">
        <button
          disabled={!readOnly}
          class={readOnlyCursor === false ? "setting-active" : undefined}
          on:click={() => (readOnlyCursor = false)}>False</button
        >
        <button
          disabled={!readOnly}
          class={readOnlyCursor === true ? "setting-active" : undefined}
          on:click={() => (readOnlyCursor = true)}>True</button
        >
      </div>
    </div>

    <div class="setting setting-short schema">
      <div class="setting-label">Schema</div>
      <div class="setting-values">
        <button
          class={schema === simpleSchema ? "setting-active" : undefined}
          on:click={() => (schema = simpleSchema)}>Simple</button
        >
        <button
          class={schema === neo4jSchema ? "setting-active" : undefined}
          on:click={() => (schema = neo4jSchema)}>Long</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Search</div>
      <div class="setting-values">
        <button
          class={search === false ? "setting-active" : undefined}
          on:click={() => (search = false)}>False</button
        >
        <button
          class={search === true ? "setting-active" : undefined}
          on:click={() => (search = true)}>True</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Search Matches</div>
      <div class="setting-values">
        <button
          class={searchMatches === 0 ? "setting-active" : undefined}
          on:click={() => (searchMatches = 0)}>0</button
        >
        <button
          class={searchMatches === 10 ? "setting-active" : undefined}
          on:click={() => (searchMatches = 10)}>10</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Search Open</div>
      <div class="setting-values">
        <button
          class={searchOpen === true ? "setting-active" : undefined}
          on:click={() => (searchOpen = true)}>True</button
        >
        <button
          class={searchOpen === false ? "setting-active" : undefined}
          on:click={() => (searchOpen = false)}>False</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Search Text</div>
      <div class="setting-values">
        <button
          class={searchText === "all" ? "setting-active" : undefined}
          on:click={() => (searchText = "all")}>all</button
        >
        <button
          class={searchText === "call" ? "setting-active" : undefined}
          on:click={() => (searchText = "call")}>call</button
        >
        <button
          class={searchText === "union" ? "setting-active" : undefined}
          on:click={() => (searchText = "union")}>union</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Search Top</div>
      <div class="setting-values">
        <button
          class={searchTop === false ? "setting-active" : undefined}
          on:click={() => (searchTop = false)}
        >
          False
        </button>
        <button
          class={searchTop === true ? "setting-active" : undefined}
          on:click={() => (searchTop = true)}
        >
          True
        </button>
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Tab Key Enabled</div>
      <div class="setting-values">
        <button
          class={tabKey === false ? "setting-active" : undefined}
          on:click={() => (tabKey = false)}>False</button
        >
        <button
          class={tabKey === true ? "setting-active" : undefined}
          on:click={() => (tabKey = true)}>True</button
        >
      </div>
    </div>

    <div class="setting setting-short">
      <div class="setting-label">Theme</div>
      <div class="setting-values">
        <button
          class={theme === "light" ? "setting-active" : undefined}
          on:click={() => (theme = "light")}>Light</button
        >
        <button
          class={theme === "dark" ? "setting-active" : undefined}
          on:click={() => (theme = "dark")}>Dark</button
        >
        <button
          class={theme === "auto" ? "setting-active" : undefined}
          on:click={() => (theme = "auto")}>Auto</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Tooltip Absolute</div>
      <div class="setting-values">
        <button
          class={tooltipAbsolute === false ? "setting-active" : undefined}
          on:click={() => (tooltipAbsolute = false)}>False</button
        >
        <button
          class={tooltipAbsolute === true ? "setting-active" : undefined}
          on:click={() => (tooltipAbsolute = true)}>True</button
        >
      </div>
    </div>

    <div class="setting cypher">
      <div class="setting-label">Value</div>
      <div class="setting-values">
        <button
          class={cypher === longQuery ? "setting-active" : undefined}
          on:click={setValueLong}>Long</button
        >
        <button
          class={cypher === simpleQuery ? "setting-active" : undefined}
          on:click={setValueSimple}>Simple</button
        >
        <button
          class={cypher === "" ? "setting-active" : undefined}
          on:click={setValueClear}>Clear</button
        >
      </div>
    </div>
  </div>

  <div class="right">
    <div class="card">
      <h1>{title}</h1>
    </div>
    <div class="card">
      <svelte:component
        this={editor}
        {onAutocompleteChanged}
        {onEditorCreated}
        {onFocusChanged}
        {onPositionChanged}
        {onScrollChanged}
        {onSearchChanged}
        {onValueChanged}
        {onLineNumberClick}
        {onKeyDown}
        {onKeyUp}
        {autocomplete}
        {autocompleteOpen}
        {autocompleteCloseOnBlur}
        {autocompleteTriggerStrings}
        {bracketMatching}
        {closeBrackets}
        {cursorWide}
        {cypherLanguage}
        {history}
        {indentUnit}
        {lineNumberFormatter}
        {lineNumbers}
        {lineWrapping}
        {lint}
        {placeholder}
        {readOnly}
        {readOnlyCursor}
        {schema}
        {search}
        {searchMatches}
        {searchOpen}
        {searchText}
        {searchTop}
        {tabKey}
        {theme}
        {tooltipAbsolute}
        value={cypher}
        {autofocus}
        {parseOnSetValue}
        className="database-editor"
      />
    </div>
    <div class="card">
      <div class="info">
        <div class="info-item-long">Position: {positionString}</div>
        <div class="info-item">Length: {cypherLength}</div>
        <div class="info-item">Line Count: {lineCount}</div>
        <div class="info-item">Focused: {focusedString}</div>
        <div class="info-item">Autocomplete: {autocompleteString}</div>
        <div class="info-item">Search: {searchString}</div>
      </div>
    </div>
    <div class="card">
      <div class="logs">
        <div class="logs-header">
          <h3>Logs</h3>
          <button on:click={clearLogs}> Clear </button>
        </div>
        <div class="logs-filters">
          {#each eventTypes as eventType}
            <div class="logs-filter">
              <label for={eventType}>{eventType}</label>
              <input
                type="checkbox"
                checked={eventFilters[eventType]}
                on:input={() => {
                  eventFilters = {
                    ...eventFilters,
                    [eventType]: !eventFilters[eventType]
                  };
                }}
              />
            </div>
          {/each}
        </div>
        <textarea id="log" readonly bind:this={textareaRef} value={logText} />
      </div>
    </div>
    <div class="card">
      <div class="results">
        <button on:click={send}> Run Current Query </button>
        <h3>Results</h3>
        {#await promisedResult}
          <p>...waiting</p>
        {:then results}
          {#if results}
            {#each results.records as record}
              <pre>{JSON.stringify(record)}</pre>
            {/each}
          {/if}
        {:catch error}
          <p style="color: red">{error.message}</p>
        {/await}
      </div>
    </div>
  </div>
</div>
