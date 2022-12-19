<!--
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
-->
<script lang="ts">
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import type { Driver, QueryResult } from "neo4j-driver";
  import { CypherEditor } from "@neo4j-cypher/svelte-codemirror";
  import "@neo4j-cypher/codemirror/css/cypher-codemirror.css";

  import { runQuery, schemaQuery } from "./cypher.utils";
  import { historyStore } from "./history.store";
  import Cypher from "./frames/Cypher.svelte";
  import { consoleCommands, isCommand, runCommand } from "./command.utils";
  import Generic from "./frames/Generic.svelte";
  import type { GenericResult } from "./frames/Generic.types";
  import ConnectModal from "./ConnectModal.svelte";

  type StreamResponse = {
    cmd: string;
    promise: Promise<QueryResult | GenericResult>;
    id?: number;
  };
  type Schema = {
    // Not complete types here
    consoleCommands?: Array<{ name: string }>;
    labels?: string[];
    relationshipTypes?: string[];
  };

  const history = historyStore("MATCH (n) RETURN count(n)", 20);
  let viewState: "idle" | "executing" | "disconnected" | "connection-modal" =
    "connection-modal";
  let schema: Schema = { consoleCommands };
  let driver: Driver;
  let responses: StreamResponse[] = [];
  let id = 0;

  onMount(() => {
    execute(":help");
  });

  async function updateEditorSchema() {
    try {
      const res = await runQuery(driver, schemaQuery);
      // labels
      const labelsRow = res.records?.[0];
      const relsRow = res.records?.[1];
      const labels = labelsRow ? labelsRow.toObject() : { result: [] };
      const relationshipTypes = relsRow ? relsRow.toObject() : { result: [] };
      schema = {
        consoleCommands,
        labels: labels.result.map((x: string) => `:${x}`),
        relationshipTypes: relationshipTypes.result.map((x: string) => `:${x}`)
      };
    } catch (e) {
      schema = {
        consoleCommands
      };
      console.log(e);
    }
  }

  function didConnect(newDriver) {
    driver = newDriver;
    viewState = "idle";
    updateEditorSchema();
  }
  function didCancelConnect() {
    if (!driver) {
      viewState = "disconnected";
    } else {
      viewState = "idle";
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
        if (!isCommand(input)) {
          updateEditorSchema();
        }
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
        {schema}
        theme="light"
        lint={$history.trim().length > 0}
      />
    </div>
  </div>
  {#if viewState === "disconnected"}
    <div class="error">
      Not connected, can't execute queries. <button
        class="connect-btn"
        on:click={() => (viewState = "connection-modal")}>Connect now</button
      >
    </div>
  {/if}
  <div class="stream-section">
    {#if responses}
      {#each responses as response (response.id)}
        <div class="response" transition:slide>
          <div class="header">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
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
              <Generic result={{ data: `Error: ${e.message}` }} />
            {/await}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
<ConnectModal
  open={viewState === "connection-modal"}
  on:connect={({ detail }) => didConnect(detail.driver)}
  on:cancel={didCancelConnect}
/>

<style>
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
    padding: 16px;
    border-bottom: 1px solid rgb(238 241 246);
    background-color: white;
  }
  .editor-wrapper {
    border: 1px solid var(--border-color);
    border-radius: 6px;
    min-height: 44px;
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
    cursor: pointer;
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

    max-height: 400px;
    padding: 16px;
    overflow-y: auto;
  }
  .error {
    color: red;
    background-color: pink;
    padding: 16px;
    margin: 0;
  }
  .connect-btn {
    border: 1px solid rgba(255, 0, 0, 0.5);
    background: transparent;
    color: red;
    border-radius: 4px;
    padding: 2px 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }
  :global(.cm-editor) {
    max-height: 200px;
    font-size: 18px;
  }
  :global(.cm-editor .cm-gutters) {
    border: 0;
  }
</style>
