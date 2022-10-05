<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { CypherEditor } from "svelte-codemirror-cypher";
  import neo4j, { type Driver } from "neo4j-driver";
  import { runQuery, schemaQuery } from "./cypher.utils";
  import { historyStore } from "./history.store";

  const history = historyStore("MATCH (n) RETURN count(n)", 20);
  let viewState: "booting" | "idle" | "executing" | "disconnected" = "booting";
  let autocompleteSchema = {};
  let driver: Driver;
  let response;

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
    // Promise chain to let UI handle the error
    response = runQuery(driver, $history).finally(() => {
      history.send("EXECUTED");
      viewState = "idle";
      updateEditorSchema();
    });
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
  {#if viewState !== "booting" && response}
    <div class="response">
      {#await response then res}
        {JSON.stringify(res.records, null, 2)}
      {:catch e}
        {e}
      {/await}
    </div>
  {/if}
</div>

<style>
  .container {
    margin: 0 auto;
    width: 600px;
    padding: 16px;
  }
  .response {
    margin-top: 8px;
    white-space: pre;
    font-family: monospace;
    font-size: 12px;
    height: 400px;
    background-color: #eee;
    overflow: auto;
    padding: 8px;
  }
  .error {
    color: red;
    background-color: pink;
    padding: 8px;
    margin: 8px 0;
  }
  :global(.cm-editor) {
    height: 200px;
  }
</style>
