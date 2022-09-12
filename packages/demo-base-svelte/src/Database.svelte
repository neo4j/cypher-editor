<script lang="ts">
  import neo4j from "neo4j-driver";
  import { neo4jSchema as initialSchema, defaultQuery, defaultOptions, initialPosition, host, user, pass } from "demo-base";

  export let codemirrorVersion = undefined;
  export let framework = undefined;
  export let bundler = undefined;
  export let editor = undefined;

  const title = `Cypher Codemirror ${codemirrorVersion} ${framework} ${bundler}`;

  const initialValue = defaultQuery;
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
  let lint = initialOptions.lint;
  let cypherEditor;

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

  const onValueChange = (value: string, change: any) => {
    cypher = value;
  };

  const onPositionChange = (positionObject) => {
    position = positionObject;
  };

  const onEditorCreate = (editor) => {
    cypherEditor = editor;
    position = editor.getPosition();
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

  const focusEditor = () => {
    cypherEditor && cypherEditor.focus();
  };
</script>

<div class="database">
  <div class="left">
    <div class="setting">
      <div class="setting-label">Theme</div>
      <div class="setting-values">
        <button class={theme === "light" ? "setting-active" : undefined} on:click={lightTheme}>Light</button>
        <button class={theme === "dark" ? "setting-active" : undefined} on:click={darkTheme}>Dark</button>    
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Line Numbers</div>
      <div class="setting-values">
        <button class={lineNumbers === true ? "setting-active" : undefined} on:click={showLineNumbers}>True</button>
        <button class={lineNumbers === false ? "setting-active" : undefined} on:click={hideLineNumbers}>False</button>    
      </div>
    </div>

    <div class="setting">
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

    <div class="setting">
      <div class="setting-label">Lint</div>
      <div class="setting-values">
        <button class={lint === true ? "setting-active" : undefined} on:click={enableLint}>True</button>
        <button class={lint === false ? "setting-active" : undefined} on:click={disableLint}>False</button>    
      </div>
    </div>

    <div class="setting">
      <div class="setting-label">Focus</div>
      <div class="setting-values">
        <button on:click={focusEditor}>Focus Editor</button>
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
        <div class="info-item">Focused: {focusedString}</div>
      </div>
    </div>
    <div class="card">
      <div class="results">
        <button on:click={send}> Run </button>
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
