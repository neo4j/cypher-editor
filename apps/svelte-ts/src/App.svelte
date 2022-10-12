<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { CypherEditor } from "svelte-codemirror-cypher";
  import neo4j, { type Driver, type QueryResult } from "neo4j-driver";
  import { runQuery, schemaQuery } from "./cypher.utils";
  import { historyStore } from "./history.store";
  import { slide } from "svelte/transition";
  import Cypher from "./frames/Cypher.svelte";
  import { isCommand, runCommand } from "./command.utils";
  import Generic from "./frames/Generic.svelte";
  import type { GenericResult } from "./frames/Generic.types";

  type StreamResponse = {
    cmd: string;
    promise: Promise<QueryResult | GenericResult>;
    id?: number;
  };

  const history = historyStore("MATCH (n) RETURN count(n)", 20);
  let viewState: "booting" | "idle" | "executing" | "disconnected" = "booting";
  let autocompleteSchema = {};
  let driver: Driver;
  let responses: StreamResponse[] = [];
  let id = 0;

  onMount(async () => {
    driver = neo4j.driver(
      "neo4j://localhost:7687",
      neo4j.auth.basic(
        import.meta.env.VITE_NEO4J_USERNAME,
        import.meta.env.VITE_NEO4J_PASSWORD
      )
    );
    try {
      await driver.verifyConnectivity();
      updateEditorSchema();
      viewState = "idle";
    } catch (e) {
      console.log(`Couldn't connect ${e.message}`);
      viewState = "disconnected";
    }
    execute(":help");
  });
  onDestroy(() => {
    driver.close();
  });

  async function updateEditorSchema() {
    try {
      const res = await runQuery(driver, schemaQuery);
      const obj = res.records[0].toObject();
      autocompleteSchema = {
        labels: obj.labels.map((x: string) => `:${x}`),
        relationshipTypes: obj.relationshipTypes.map((x: string) => `:${x}`)
      };
    } catch (e) {
      console.log(e);
    }
  }

  function executeEditor() {
    if (!$history.trim().length) {
      return;
    }
    const toExec = $history;
    history.send("PUSH_CURRENT");
    execute(toExec);
  }

  function execute(input: string) {
    const currentViewState = viewState;
    viewState = "executing";
    const execPromise = isCommand(input)
      ? runCommand(input)
      : runQuery(driver, input);
    addResponse({
      cmd: input,
      // Promise chain to let UI handle the error
      promise: execPromise.finally(() => {
        viewState = currentViewState;
        updateEditorSchema();
      })
    });
  }

  function addResponse(data: StreamResponse) {
    responses = [{ id: id++, ...data } as StreamResponse].concat(responses);
  }
  function removeResponse(removeId) {
    responses = responses.filter(({ id }) => id !== removeId);
  }

  function keyDown(event: KeyboardEvent) {
    const { key, metaKey, ctrlKey } = event;
    const hasModKey = metaKey || ctrlKey;

    // cmd + enter to exec
    if (key === "Enter" && hasModKey) {
      event.preventDefault();
      executeEditor();
      return;
    }

    // Stepping in history
    if (key === "ArrowUp" && hasModKey) {
      history.send("STEP_BACK");
      event.preventDefault();
      return;
    }
    if (key === "ArrowDown" && hasModKey) {
      history.send("STEP_FORWARD");
      event.preventDefault();
      return;
    }
  }
</script>

<div class="wrapper">
  <div class="editor-section">
    <div class="editor-wrapper">
      <CypherEditor
        bind:value={$history}
        readOnly={viewState === "executing"}
        readOnlyCursor={true}
        onKeyDown={keyDown}
        {autocompleteSchema}
        theme="light"
        lint={$history.trim().length > 0}
      />
    </div>
  </div>
  {#if viewState === "disconnected"}
    <div class="error">Not connected, can't execute queries.</div>
  {/if}
  <div class="stream-section">
    {#if viewState !== "booting" && responses}
      {#each responses as response (response.id)}
        <div class="response" transition:slide>
          <div class="header">
            <div
              title={response.cmd}
              class="cypher"
              on:click={() => history.send("SET_CURRENT", response.cmd)}
            >
              {response.cmd}
            </div>
            <button
              class="close-btn"
              on:click={() => removeResponse(response.id)}>&times;</button
            >
          </div>
          <div class="body">
            {#await response.promise}
              Executing command...
            {:then res}
              {#if "data" in res}
                <Generic result={res} />
              {:else}
                <Cypher result={res} />
              {/if}
            {:catch e}
              {e}
            {/await}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  :global(body) {
    background-color: #f6f7fa;
    margin: 0;
    padding: 0;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .stream-section {
    padding: 16px;
    overflow-y: auto;
  }
  .editor-section {
    min-height: 46px;
    padding: 16px;
    border-bottom: 1px solid rgb(238 241 246);
    background-color: white;
  }
  .editor-wrapper {
    border: 1px solid rgb(196 200 205);
    border-radius: 6px;
    overflow: hidden;
    min-height: 34px;
    padding-top: 8px;
  }
  .response {
    margin-top: 14px;
    font-family: monospace;
    font-size: 12px;
    background-color: white;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid rgb(238 241 246);
  }
  .response .header {
    height: 36px;
    padding: 16px;
    color: #888;
    font-size: 17px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .response .header .cypher {
    flex: auto 1 1;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 30px;
    white-space: nowrap;
    border-radius: 6px;
    border: 1px solid rgb(196 200 205);
    line-height: 29px;
    padding: 0 16px;
  }

  .response .header .close-btn {
    font-weight: normal;
    font-family: "times new roman", times, georgia, serif;
    font-size: 200%;
    color: #888;
    width: 20px;
    height: 20px;
    border: 0;
    padding: 8px;
    margin-left: 16px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: auto 0 0;
    border-radius: 6px;
    box-sizing: content-box;
  }
  .response .header .close-btn:hover {
    background-color: rgb(230 248 255);
  }
  .response .body {
    white-space: pre;
    height: 180px;
    padding: 16px;
    overflow: auto;
  }
  .error {
    color: red;
    background-color: pink;
    padding: 16px;
    margin: 0;
  }
  :global(.cm-editor) {
    max-height: 200px;
    font-size: 18px;
    outline: none !important;
  }
  :global(.cm-editor .cm-gutters) {
    border: 0;
  }
</style>
