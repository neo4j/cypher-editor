<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { CypherEditor } from "svelte-codemirror-cypher";
  import neo4j, { type Driver } from "neo4j-driver";
  import { runQuery, schemaQuery } from "./cypher.utils";
  import { historyStore } from "./history.store";
  import { slide } from "svelte/transition";

  type StreamResponse = {
    cypher: string;
    promise: Promise<any>;
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

  function execute() {
    if (viewState !== "idle" || !$history.trim().length) {
      return;
    }
    viewState = "executing";
    const toExec = $history;
    history.send("PUSH_CURRENT");
    addResponse({
      cypher: toExec,
      // Promise chain to let UI handle the error
      promise: runQuery(driver, toExec).finally(() => {
        viewState = "idle";
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
      execute();
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

<div class="container">
  <CypherEditor
    bind:value={$history}
    readOnly={viewState === "executing"}
    readOnlyCursor={true}
    onKeyDown={keyDown}
    {autocompleteSchema}
    theme="dark"
    lint={$history.trim().length > 0}
  />
  {#if viewState === "disconnected"}
    <div class="error">Not connected, can't execute queries.</div>
  {/if}
  {#if viewState !== "booting" && responses}
    {#each responses as response (response.id)}
      <div class="response" transition:slide>
        <div class="header">
          <div
            title={response.cypher}
            class="cypher"
            on:click={() => history.send("SET_CURRENT", response.cypher)}
          >
            {response.cypher}
          </div>
          <button class="close-btn" on:click={() => removeResponse(response.id)}
            >&times;</button
          >
        </div>
        <div class="body">
          {#await response.promise}
            Running query...
          {:then res}
            {JSON.stringify(res.records, null, 2)}
          {:catch e}
            {e}
          {/await}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  :global(html) {
    scrollbar-gutter: stable;
  }
  :global(body) {
    background-color: #eee;
  }
  .container {
    margin: 0 auto;
    width: 600px;
    padding: 16px;
  }
  .response {
    margin-top: 14px;
    font-family: monospace;
    font-size: 12px;
    background-color: white;
    overflow: hidden;
  }
  .response .header {
    height: 30px;
    border-bottom: 1px solid #ccc;
    color: #888;
    font-size: 14px;
    display: flex;
    align-items: baseline;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .response .header .cypher {
    padding: 4px 8px;
    flex: auto 1 1;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 30px;
    white-space: nowrap;
  }

  .response .header .close-btn {
    width: 30px;
    height: 30px;
    border: 0;
    padding: 0;
    margin: 0;
    background: none;
    border-left: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: auto 0 0;
  }
  .response .body {
    white-space: pre;
    height: 180px;
    padding: 4px 8px;
    overflow: auto;
  }
  .error {
    color: red;
    background-color: pink;
    padding: 8px;
    margin: 8px 0;
  }
  :global(.cm-editor) {
    height: 200px;
    font-size: 18px;
  }
</style>
