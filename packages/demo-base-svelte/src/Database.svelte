<script lang="ts">
  import neo4j from "neo4j-driver";
  import { neo4jSchema, simpleSchema, longQuery, simpleQuery, defaultOptions, initialPosition, host, user, pass } from "demo-base";

  export let codemirrorVersion = undefined;
  export let framework = undefined;
  export let bundler = undefined;
  export let editor = undefined;

  const initialSchema = simpleSchema;
  const title = `Cypher Codemirror ${codemirrorVersion} ${framework} ${bundler}`;

  const samplePlaceholder = "Sample Placeholder";

  const defaultLineNumberFormatter = undefined;
  const noneLineNumberFormatter = line => line;
  const customLineNumberFormatter = (line, lineCount) => {
    if (line === 1) {
      return "one";
    } else if (line === 2) {
      return "two";
    } else if (line === 3) {
      return "three";
    } else if (line > 3) {
      return line + ' / ' + lineCount + " prompt$";
    }
  };

  const initialValue = longQuery;
  const initialOptions = defaultOptions;
  let cypher = initialValue;

  const driver = neo4j.driver(
    host,
    neo4j.auth.basic(user, pass)
  );

  let theme = "light";
  let position = initialPosition || { line: 1, column: 0 };
  let focused = true;
  let lineNumbers = initialOptions.lineNumbers;
  let readOnly = initialOptions.readOnly;
  let autocomplete = initialOptions.autocomplete;
  let placeholder = initialOptions.placeholder;
  let autocompleteOpen = false;
  let lint = initialOptions.lint;
  let lineNumberFormatter = initialOptions.lineNumberFormatter;
  let schema = initialSchema;
  let cypherEditor;
  let autocompleteTriggerStrings = initialOptions.autocompleteTriggerStrings;
  let autocompleteSticky = initialOptions.autocompleteSticky;
  let positionPosition = "0";
  let positionLine = "1";
  let positionColumn = "0";
  let lineCount = 0;

  const lightTheme = () => {
    theme = "light";
  };

  const darkTheme = () => {
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
    goPositionPositionEnabled = isNumberString(positionPosition) && cypherEditor.getPositionForValue(+positionPosition) !== null;
    goPositionLineColumnEnabled = isNumberString(positionLine) && isNumberString(positionColumn) && cypherEditor.getPositionForValue({ line: +positionLine, column: +positionColumn }) !== null;
  };

  const onValueChange = (value: string, change?: any) => {
    cypher = value;
    updateGoButtons();
    if (cypherEditor) {
      lineCount = cypherEditor.getLineCount();
    }
  };

  const onPositionChange = (positionObject) => {
    position = positionObject;
  };

  const onAutocompleteOpenChange = (newAutocompleteOpen) => {
    autocompleteOpen = newAutocompleteOpen;
  };

  const onLineClick = (line, event) => {
    alert("line clicked: " + line);
  };

  const onEditorCreate = (editor) => {
    cypherEditor = editor;
    position = editor.getPosition();
    lineCount = cypherEditor.getLineCount();
    updateGoButtons();
  };

  const onFocusChange = (newFocused) => {
    focused = newFocused;
  }

  const showLineNumbers = () => {
    lineNumbers = true;
    cypherEditor && cypherEditor.setLineNumbers(lineNumbers);
  };

  const hideLineNumbers = () => {
    lineNumbers = false;
    cypherEditor && cypherEditor.setLineNumbers(lineNumbers);
  };

  $: cypherLength = cypher ? cypher.length : 0;
  $: positionString = position ? JSON.stringify(position) : "";
  $: focusedString = focused + "";
  $: autocompleteString = autocompleteOpen + "";

  const setNoPlaceholder = () => {
    placeholder = undefined;
    cypherEditor && cypherEditor.setPlaceholder(placeholder);
  };

  const setSamplePlaceholder = () => {
    placeholder = samplePlaceholder;
    cypherEditor && cypherEditor.setPlaceholder(placeholder);
  };

  const makeReadable = () => {
    readOnly = false;
    cypherEditor && cypherEditor.setReadOnly(readOnly);
  };

  const makeReadOnly = () => {
    readOnly = true;
    cypherEditor && cypherEditor.setReadOnly(readOnly);
  };

  const makeReadOnlyNoCursor = () => {
    readOnly = "nocursor";
    cypherEditor && cypherEditor.setReadOnly(readOnly);
  };

  const enableAutocomplete = () => {
    autocomplete = true;
    cypherEditor && cypherEditor.setAutocomplete(true);
  };

  const disableAutocomplete = () => {
    autocomplete = false;
    cypherEditor && cypherEditor.setAutocomplete(false);
  };

  const enableLint = () => {
    lint = true;
    cypherEditor && cypherEditor.setLint(true);
  };

  const disableLint = () => {
    lint = false;
    cypherEditor && cypherEditor.setLint(false);
  };

  const clearHistory = () => {
    cypherEditor && cypherEditor.clearHistory();
  };

  const focusEditor = () => {
    cypherEditor && cypherEditor.focus();
  };

  const showDefaultLineNumberFormatter = () => {
    lineNumberFormatter = defaultLineNumberFormatter;
    cypherEditor && cypherEditor.setLineNumberFormatter(lineNumberFormatter);
  };

  const showNoneLineNumberFormatter = () => {
    lineNumberFormatter = noneLineNumberFormatter;
    cypherEditor && cypherEditor.setLineNumberFormatter(lineNumberFormatter);
  };

  const showCustomLineNumberFormatter = () => {
    lineNumberFormatter = customLineNumberFormatter;
    cypherEditor && cypherEditor.setLineNumberFormatter(lineNumberFormatter);
  };

  const showSimpleSchema = () => {
    schema = simpleSchema;
    cypherEditor && cypherEditor.setSchema(schema);
  };

  const showLongSchema = () => {
    schema = neo4jSchema;
    cypherEditor && cypherEditor.setSchema(schema);
  };

  const showDefaultAutocompleteTriggerStrings = () => {
    autocompleteTriggerStrings = initialOptions.autocompleteTriggerStrings;
    cypherEditor && cypherEditor.setAutocompleteTriggerStrings(initialOptions.autocompleteTriggerStrings);
  };

  const showNoAutocompleteTriggerStrings = () => {
    autocompleteTriggerStrings = false;
    cypherEditor && cypherEditor.setAutocompleteTriggerStrings(false);
  };

  const showStickyAutocomplete = () => {
    autocompleteSticky = true;
    cypherEditor && cypherEditor.setAutocompleteSticky(true);
  };

  const showUnstickyAutocomplete = () => {
    autocompleteSticky = false;
    cypherEditor && cypherEditor.setAutocompleteSticky(false);
  };

  const goToPosition = (position) => {
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

  const isNumberString = v => v === "0" || /^([1-9])([0-9])*$/.test(v);

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
      cypherEditor.setValue(longQuery);
      onValueChange(longQuery);
    }
  };

  const showSimpleValue = () => {
    if (cypherEditor) {
      cypherEditor.setValue(simpleQuery);
      onValueChange(simpleQuery);
    }
  };
</script>

<div class="database">
  <div class="left">
    <div class="setting setting-short">
      <div class="setting-label">Theme</div>
      <div class="setting-values">
        <button class={theme === "light" ? "setting-active" : undefined} on:click={lightTheme}>Light</button>
        <button class={theme === "dark" ? "setting-active" : undefined} on:click={darkTheme}>Dark</button>    
      </div>
    </div>

    <div class="setting setting-short">
      <div class="setting-label">Placeholder</div>
      <div class="setting-values">
        <button class={placeholder === undefined ? "setting-active" : undefined} on:click={setNoPlaceholder}>None</button>
        <button class={placeholder === samplePlaceholder ? "setting-active" : undefined} on:click={setSamplePlaceholder}>Sample</button>    
      </div>
    </div>

    <div class="setting setting-short">
      <div class="setting-label">Schema</div>
      <div class="setting-values">
        <button class={schema === simpleSchema ? "setting-active" : undefined} on:click={showSimpleSchema}>Simple</button>
        <button class={schema === neo4jSchema ? "setting-active" : undefined} on:click={showLongSchema}>Long</button>    
      </div>
    </div>

    <div class="setting setting-short">
      <div class="setting-label">Lint</div>
      <div class="setting-values">
        <button class={lint === true ? "setting-active" : undefined} on:click={enableLint}>True</button>
        <button class={lint === false ? "setting-active" : undefined} on:click={disableLint}>False</button>    
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Line Numbers</div>
      <div class="setting-values">
        <button class={lineNumbers === true ? "setting-active" : undefined} on:click={showLineNumbers}>True</button>
        <button class={lineNumbers === false ? "setting-active" : undefined} on:click={hideLineNumbers}>False</button>    
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Line Number Formatter</div>
      <div class="setting-values">
        <button class={lineNumberFormatter === defaultLineNumberFormatter ? "setting-active" : undefined} on:click={showDefaultLineNumberFormatter}>Default</button>
        <button class={lineNumberFormatter === noneLineNumberFormatter ? "setting-active" : undefined} on:click={showNoneLineNumberFormatter}>None</button>
        <button class={lineNumberFormatter === customLineNumberFormatter ? "setting-active" : undefined} on:click={showCustomLineNumberFormatter}>Custom</button>
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Read Only</div>
      <div class="setting-values">
        <button class={readOnly === false ? "setting-active" : undefined} on:click={makeReadable}>False</button>
        <button class={readOnly === true ? "setting-active" : undefined} on:click={makeReadOnly}>True</button>
        <button class={readOnly === "nocursor" ? "setting-active" : undefined} on:click={makeReadOnlyNoCursor}>No Cursor</button>
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Autocomplete</div>
      <div class="setting-values">
        <button class={autocomplete === true ? "setting-active" : undefined} on:click={enableAutocomplete}>True</button>
        <button class={autocomplete === false ? "setting-active" : undefined} on:click={disableAutocomplete}>False</button>    
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Autocomplete Triggers</div>
      <div class="setting-values">
        <button class={autocompleteTriggerStrings === initialOptions.autocompleteTriggerStrings ? "setting-active" : undefined} on:click={showDefaultAutocompleteTriggerStrings}>Default</button>
        <button class={autocompleteTriggerStrings === false ? "setting-active" : undefined} on:click={showNoAutocompleteTriggerStrings}>False</button>    
      </div>
    </div>

    <div class="setting setting-long">
      <div class="setting-label">Autocomplete Sticky</div>
      <div class="setting-values">
        <button class={autocompleteSticky === true ? "setting-active" : undefined} on:click={showStickyAutocomplete}>True</button>
        <button class={autocompleteSticky === false || autocompleteSticky === undefined ? "setting-active" : undefined} on:click={showUnstickyAutocomplete}>False</button>    
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
        <input name="position" type="text" value={positionPosition} on:input={positionPositionChanged}/>
        <button disabled={!goPositionPositionEnabled} on:click={goToPositionPosition}>Go</button>    
      </div>
      <div class="setting-values">
        <label for="line">line</label>
        <input class="short-input" name="line" type="text" value={positionLine} on:input={positionLineChanged}/>
        <label for="column">column</label>
        <input class="short-input" name="column" type="text" value={positionColumn} on:input={positionColumnChanged}/>
        <button disabled={!goPositionLineColumnEnabled} on:click={goToPositionLineColumn}>Go</button>    
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
        {onValueChange}
        {onPositionChange}
        {onFocusChange}
        {onEditorCreate}
        {onAutocompleteOpenChange}
        {onLineClick}
        {initialPosition}
        {initialSchema}
        {initialValue}
        {initialOptions}
        {theme}
        classNames={["editor"]}
        this={editor}/>
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
