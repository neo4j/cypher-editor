### @neo4j-cypher/svelte-codemirror

This package exports a Svelte component that provides a cypher editor using codemirror 6.

You can use this package like the following full app example:

```
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { CypherEditor } from "@neo4j-cypher/svelte-codemirror";
  import neo4j from "neo4j-driver";

  let cypher = "MATCH (n) RETURN count(n)";
  let viewState: "loading" | "idle" | "executing" = "loading";
  let schema = {};
  let driver;
  let response;

  onMount(async () => {
    driver = neo4j.driver(
      "neo4j://localhost:7687",
      neo4j.auth.basic("neo4j", "password")
    );
    await driver.verifyConnectivity();
    viewState = "idle";
  });
  onDestroy(() => {
    driver.close();
  });

  function execute() {
    return new Promise(async (resolve, reject) => {
      viewState = "executing";
      const session = driver.session();
      try {
        const res = await session.run(cypher.trim());
        resolve(res);
        cypher = "";
      } catch (e) {
        console.log(`Query "${cypher}" failed`, e);
        reject(e);
      }
      session.close();
      viewState = "idle";
    });
  }

  function keyDown(event: KeyboardEvent) {
    const { key, metaKey, ctrlKey } = event;
    if (viewState !== "idle") {
      return;
    }
    if (cypher && key === "Enter" && (metaKey || ctrlKey)) {
      event.preventDefault();
      response = execute();
    }
  }
</script>

<div class="container">
  <CypherEditor
    bind:value={cypher}
    readOnly={viewState === "executing"}
    onKeyDown={keyDown}
    {schema}
    theme="dark"
  />
  {#if viewState !== "loading" && response}
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
  }
  :global(.cm-editor) {
    height: 200px;
  }
</style>

```
