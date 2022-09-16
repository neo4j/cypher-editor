<script lang="ts">
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

  export let codemirrorVersion = undefined;
  export let framework = undefined;
  export let bundler = undefined;
  export let editor = undefined;

  const title = getTitle({ codemirrorVersion, framework, bundler });

  let cypher = initialValue;

  const driver = createDriver();

  let theme = defaultTheme;
  let position = initialPosition;
  let focused = true;
  let lineNumbers = initialOptions.lineNumbers;
  let readOnly = initialOptions.readOnly;
  let autocomplete = initialOptions.autocomplete;
  let placeholder = initialOptions.placeholder;
  let lineWrapping = initialOptions.lineWrapping;
  let autocompleteOpen = false;
  let lint = initialOptions.lint;
  let lineNumberFormatter = initialOptions.lineNumberFormatter;
  let schema = initialSchema;
  let cypherEditor;
  let autocompleteTriggerStrings = initialOptions.autocompleteTriggerStrings;
  let autocompleteCloseOnBlur = initialOptions.autocompleteCloseOnBlur;
  let positionPosition = "0";
  let positionLine = "1";
  let positionColumn = "0";
  let lineCount = 0;
  let logs = [];
  let lastScrollInfo;

  const lightTheme = () => {
    logs = logs.concat(commandLog("setTheme", "light"));
    theme = "light";
  };

  const darkTheme = () => {
    logs = logs.concat(commandLog("setTheme", "dark"));
    theme = "dark";
  };

  let promisedResult;

  const send = () => {
    const session = driver.session();
    promisedResult = session.run(cypher);
  };

  let goPositionPositionEnabled;
  let goPositionLineColumnEnabled;

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

  const updateValue = (value) => {
    cypher = value;
    updateGoButtons();
    if (cypherEditor) {
      lineCount = cypherEditor.getLineCount();
    }
  };

  const onValueChanged = (value: string, change?: any) => {
    logs = logs.concat(eventLog("valueChanged", value ? value.length : 0));
    updateValue(value);
  };

  const onPositionChanged = (positionObject) => {
    logs = logs.concat(eventLog("positionChanged", positionObject));
    position = positionObject;
  };

  const onAutocompleteOpenChanged = (newAutocompleteOpen) => {
    logs = logs.concat(
      eventLog("autocompleteOpenChanged", newAutocompleteOpen)
    );
    autocompleteOpen = newAutocompleteOpen;
  };

  const onLineNumberClicked = (line, event) => {
    logs = logs.concat(eventLog("lineNumberClicked", line));
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

  const onScrollChanged = (scrollInfo) => {
    logs = logs.concat(
      eventLog(
        "scrollChanged",
        getChangedScrollInfo(lastScrollInfo, scrollInfo)
      )
    );
    lastScrollInfo = scrollInfo;
  };

  const showLineNumbers = () => {
    logs = logs.concat(commandLog("setLineNumbers", true));
    lineNumbers = true;
    cypherEditor && cypherEditor.setLineNumbers(lineNumbers);
  };

  const hideLineNumbers = () => {
    logs = logs.concat(commandLog("setLineNumbers", false));
    lineNumbers = false;
    cypherEditor && cypherEditor.setLineNumbers(lineNumbers);
  };

  $: cypherLength = cypher ? cypher.length : 0;
  $: positionString = position ? JSON.stringify(position) : "";
  $: focusedString = focused + "";
  $: autocompleteString = autocompleteOpen + "";
  $: logText = getLogText(logs);

  let textareaRef;

  $: if (textareaRef && logText) {
    textareaRef.value = logText;
    textareaRef.scrollTop = textareaRef.scrollHeight;
  }

  const setNoPlaceholder = () => {
    logs = logs.concat(commandLog("setPlaceholder", undefined));
    placeholder = undefined;
    cypherEditor && cypherEditor.setPlaceholder(placeholder);
  };

  const setSamplePlaceholder = () => {
    logs = logs.concat(commandLog("setPlaceholder", samplePlaceholder));
    placeholder = samplePlaceholder;
    cypherEditor && cypherEditor.setPlaceholder(placeholder);
  };

  const showLineWrapping = () => {
    logs = logs.concat(commandLog("setLineWrapping", true));
    lineWrapping = true;
    cypherEditor && cypherEditor.setLineWrapping(lineWrapping);
  };

  const showNoLineWrapping = () => {
    logs = logs.concat(commandLog("setLineWrapping", false));
    lineWrapping = false;
    cypherEditor && cypherEditor.setLineWrapping(lineWrapping);
  };

  const makeReadable = () => {
    logs = logs.concat(commandLog("setReadOnly", false));
    readOnly = false;
    cypherEditor && cypherEditor.setReadOnly(readOnly);
  };

  const makeReadOnly = () => {
    logs = logs.concat(commandLog("setReadOnly", true));
    readOnly = true;
    cypherEditor && cypherEditor.setReadOnly(readOnly);
  };

  const makeReadOnlyNoCursor = () => {
    logs = logs.concat(commandLog("setReadOnly", "nocursor"));
    readOnly = "nocursor";
    cypherEditor && cypherEditor.setReadOnly(readOnly);
  };

  const enableAutocomplete = () => {
    logs = logs.concat(commandLog("setAutocomplete", true));
    autocomplete = true;
    cypherEditor && cypherEditor.setAutocomplete(true);
  };

  const disableAutocomplete = () => {
    logs = logs.concat(commandLog("setAutocomplete", false));
    autocomplete = false;
    cypherEditor && cypherEditor.setAutocomplete(false);
  };

  const enableLint = () => {
    logs = logs.concat(commandLog("setLint", true));
    lint = true;
    cypherEditor && cypherEditor.setLint(lint);
  };

  const disableLint = () => {
    logs = logs.concat(commandLog("setLint", false));
    lint = false;
    cypherEditor && cypherEditor.setLint(lint);
  };

  const clearHistory = () => {
    logs = logs.concat(commandLog("clearHistory", ""));
    cypherEditor && cypherEditor.clearHistory();
  };

  const focusEditor = () => {
    logs = logs.concat(commandLog("focus", ""));
    cypherEditor && cypherEditor.focus();
  };

  const showDefaultLineNumberFormatter = () => {
    logs = logs.concat(
      commandLog(
        "setLineNumberFormatter",
        "default " + typeof defaultLineNumberFormatter
      )
    );
    lineNumberFormatter = defaultLineNumberFormatter;
    cypherEditor && cypherEditor.setLineNumberFormatter(lineNumberFormatter);
  };

  const showNoneLineNumberFormatter = () => {
    logs = logs.concat(
      commandLog(
        "setLineNumberFormatter",
        "none " + typeof noneLineNumberFormatter
      )
    );
    lineNumberFormatter = noneLineNumberFormatter;
    cypherEditor && cypherEditor.setLineNumberFormatter(lineNumberFormatter);
  };

  const showCustomLineNumberFormatter = () => {
    logs = logs.concat(
      commandLog(
        "setLineNumberFormatter",
        "custom " + typeof customLineNumberFormatter
      )
    );
    lineNumberFormatter = customLineNumberFormatter;
    cypherEditor && cypherEditor.setLineNumberFormatter(lineNumberFormatter);
  };

  const showSimpleSchema = () => {
    logs = logs.concat(commandLog("setSchema", "simple"));
    schema = simpleSchema;
    cypherEditor && cypherEditor.setSchema(schema);
  };

  const showLongSchema = () => {
    logs = logs.concat(commandLog("setSchema", "long"));
    schema = neo4jSchema;
    cypherEditor && cypherEditor.setSchema(schema);
  };

  const showDefaultAutocompleteTriggerStrings = () => {
    logs = logs.concat(
      commandLog(
        "setAutocompleteTriggerStrings",
        initialOptions.autocompleteTriggerStrings
      )
    );
    autocompleteTriggerStrings = initialOptions.autocompleteTriggerStrings;
    cypherEditor &&
      cypherEditor.setAutocompleteTriggerStrings(
        initialOptions.autocompleteTriggerStrings
      );
  };

  const showNoAutocompleteTriggerStrings = () => {
    logs = logs.concat(commandLog("setAutocompleteTriggerStrings", false));
    autocompleteTriggerStrings = false;
    cypherEditor && cypherEditor.setAutocompleteTriggerStrings(false);
  };

  const showStickyAutocomplete = () => {
    logs = logs.concat(commandLog("setAutocompleteCloseOnBlur", false));
    autocompleteCloseOnBlur = false;
    cypherEditor && cypherEditor.setAutocompleteCloseOnBlur(false);
  };

  const showUnstickyAutocomplete = () => {
    logs = logs.concat(commandLog("setAutocompleteCloseOnBlur", true));
    autocompleteCloseOnBlur = true;
    cypherEditor && cypherEditor.setAutocompleteCloseOnBlur(true);
  };

  const goToPosition = (position) => {
    logs = logs.concat(commandLog("goToPosition", position));
    cypherEditor && cypherEditor.goToPosition(position);
    cypherEditor && cypherEditor.focus();
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

  const showLongValue = () => {
    if (cypherEditor) {
      logs = logs.concat(commandLog("setValue", longQuery.length + " (long)"));
      cypherEditor.setValue(longQuery);
      updateValue(longQuery);
    }
  };

  const showSimpleValue = () => {
    if (cypherEditor) {
      logs = logs.concat(
        commandLog("setValue", simpleQuery.length + " (simple)")
      );
      cypherEditor.setValue(simpleQuery);
      updateValue(simpleQuery);
    }
  };
</script>

<div class="database">
  <div class="left">
    <div class="setting setting-short">
      <div class="setting-label">Theme</div>
      <div class="setting-values">
        <button
          class={theme === "light" ? "setting-active" : undefined}
          on:click={lightTheme}>Light</button
        >
        <button
          class={theme === "dark" ? "setting-active" : undefined}
          on:click={darkTheme}>Dark</button
        >
      </div>
    </div>

    <div class="setting setting-short">
      <div class="setting-label">Placeholder</div>
      <div class="setting-values">
        <button
          class={placeholder === undefined ? "setting-active" : undefined}
          on:click={setNoPlaceholder}>None</button
        >
        <button
          class={placeholder === samplePlaceholder
            ? "setting-active"
            : undefined}
          on:click={setSamplePlaceholder}>Sample</button
        >
      </div>
    </div>

    <div class="setting setting-short">
      <div class="setting-label">Schema</div>
      <div class="setting-values">
        <button
          class={schema === simpleSchema ? "setting-active" : undefined}
          on:click={showSimpleSchema}>Simple</button
        >
        <button
          class={schema === neo4jSchema ? "setting-active" : undefined}
          on:click={showLongSchema}>Long</button
        >
      </div>
    </div>

    <div class="setting setting-short">
      <div class="setting-label">Lint</div>
      <div class="setting-values">
        <button
          class={lint === true ? "setting-active" : undefined}
          on:click={enableLint}>True</button
        >
        <button
          class={lint === false ? "setting-active" : undefined}
          on:click={disableLint}>False</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Line Numbers</div>
      <div class="setting-values">
        <button
          class={lineNumbers === true ? "setting-active" : undefined}
          on:click={showLineNumbers}>True</button
        >
        <button
          class={lineNumbers === false ? "setting-active" : undefined}
          on:click={hideLineNumbers}>False</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Line Wrapping</div>
      <div class="setting-values">
        <button
          class={lineWrapping === false ? "setting-active" : undefined}
          on:click={showNoLineWrapping}>False</button
        >
        <button
          class={lineWrapping === true ? "setting-active" : undefined}
          on:click={showLineWrapping}>True</button
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
          on:click={showDefaultLineNumberFormatter}>Default</button
        >
        <button
          class={lineNumberFormatter === noneLineNumberFormatter
            ? "setting-active"
            : undefined}
          on:click={showNoneLineNumberFormatter}>None</button
        >
        <button
          class={lineNumberFormatter === customLineNumberFormatter
            ? "setting-active"
            : undefined}
          on:click={showCustomLineNumberFormatter}>Custom</button
        >
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Read Only</div>
      <div class="setting-values">
        <button
          class={readOnly === false ? "setting-active" : undefined}
          on:click={makeReadable}>False</button
        >
        <button
          class={readOnly === true ? "setting-active" : undefined}
          on:click={makeReadOnly}>True</button
        >
        <button
          class={readOnly === "nocursor" ? "setting-active" : undefined}
          on:click={makeReadOnlyNoCursor}>No Cursor</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Autocomplete</div>
      <div class="setting-values">
        <button
          class={autocomplete === true ? "setting-active" : undefined}
          on:click={enableAutocomplete}>True</button
        >
        <button
          class={autocomplete === false ? "setting-active" : undefined}
          on:click={disableAutocomplete}>False</button
        >
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
          on:click={showDefaultAutocompleteTriggerStrings}>Default</button
        >
        <button
          class={autocompleteTriggerStrings === false
            ? "setting-active"
            : undefined}
          on:click={showNoAutocompleteTriggerStrings}>False</button
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
          on:click={showStickyAutocomplete}>False</button
        >
        <button
          class={autocompleteCloseOnBlur === true ||
          autocompleteCloseOnBlur === undefined
            ? "setting-active"
            : undefined}
          on:click={showUnstickyAutocomplete}>True</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">History</div>
      <div class="setting-values">
        <button on:click={clearHistory}>Clear</button>
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Focus</div>
      <div class="setting-values">
        <button on:click={focusEditor}>Focus Editor</button>
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">
        Position
        <button title="start" on:click={goToPositionStart}>start</button>
        <button title="end" on:click={goToPositionEnd}>end</button>
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
          on:click={goToPositionPosition}>Go</button
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
          on:click={goToPositionLineColumn}>Go</button
        >
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Value</div>
      <div class="setting-values">
        <button on:click={showLongValue}>Long</button>
        <button on:click={showSimpleValue}>Simple</button>
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
        {onValueChanged}
        {onPositionChanged}
        {onFocusChanged}
        {onScrollChanged}
        {onEditorCreated}
        {onAutocompleteOpenChanged}
        {onLineNumberClicked}
        {initialPosition}
        {initialSchema}
        {initialValue}
        {initialOptions}
        {theme}
        classNames={["editor"]}
      />
    </div>
    <div class="card">
      <div class="info">
        <div class="info-item-long">Position: {positionString}</div>
        <div class="info-item">Length: {cypherLength}</div>
        <div class="info-item">Line Count: {lineCount}</div>
        <div class="info-item">Focused: {focusedString}</div>
        <div class="info-item">Autocompleting: {autocompleteString}</div>
      </div>
    </div>
    <div class="card">
      <div class="logs">
        <h3>Logs</h3>
        <textarea readonly bind:this={textareaRef} value={logText} />
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
