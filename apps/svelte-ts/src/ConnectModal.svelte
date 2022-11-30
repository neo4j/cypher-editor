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
  import type { Driver } from "neo4j-driver";
  import { onMount, createEventDispatcher, onDestroy } from "svelte";
  import { connect } from "./cypher.utils";

  export let open: boolean = true;

  let error: string = "";
  let dialog: HTMLDialogElement;
  let passwordElement: HTMLInputElement;
  let connectURL = "neo4j://localhost:7687";
  let username = "neo4j";
  let password = "";
  let dispatch = createEventDispatcher();
  let driver: Driver;

  $: toggleModal(open);

  onMount(() => {
    dialog.addEventListener("close", dialogCloseHandler);
    dialog.addEventListener("keydown", keyDownHandler);
  });
  onDestroy(() => {
    dialog.removeEventListener("keydown", keyDownHandler);
    dialog.removeEventListener("close", dialogCloseHandler);
    if (driver) {
      driver.close();
    }
  });

  function keyDownHandler(e: KeyboardEvent) {
    if (e.key === "Escape") {
      dialog.close("cancel");
    }
  }

  function dialogCloseHandler() {
    error = "";
    open = false;
    if (dialog.returnValue === "connect") {
      connectAndSetState();
    } else {
      resetForm();
      dispatch("cancel");
    }
  }

  async function connectAndSetState() {
    if (driver) {
      driver.close();
    }
    try {
      driver = await connect({ connectURL, username, password });
      dispatch("connect", { driver });
      resetForm();
    } catch (e) {
      console.log(`Couldn't connect ${e.message}`);
      error = e.message;
      open = true;
    }
  }
  function resetForm() {
    error = "";
    password = "";
  }

  function toggleModal(show: boolean) {
    if (!dialog) {
      setTimeout(() => toggleModal(show), 100);
      return;
    }
    if (show && !dialog.open) {
      dialog.showModal();
      if (passwordElement) {
        passwordElement.focus();
      }
    }
  }
</script>

<dialog bind:this={dialog}>
  <h3>Connect to Neo4j</h3>
  <form method="dialog">
    <label>
      <span>Connection URL</span>
      <input
        class="w-full"
        type="text"
        placeholder="neo4j://localhost:7687"
        bind:value={connectURL}
      />
    </label>
    <div class="split">
      <label>
        <span>Database user</span>
        <input type="text" placeholder="neo4j" bind:value={username} />
      </label>
      <label>
        <span>Database password</span>
        <input
          bind:this={passwordElement}
          type="password"
          bind:value={password}
        />
      </label>
    </div>
    {#if error.length}
      <div class="error">
        {error}
      </div>
    {/if}
    <div class="actions">
      <button class="large filled primary" value="connect">Connect</button>
      <button class="large text primary" value="cancel">Cancel</button>
    </div>
  </form>
</dialog>

<style>
  .error {
    margin-top: 2rem;
    background-color: pink;
    color: red;
    padding: 16px;
    border-radius: 6px;
  }
  h3 {
    text-align: center;
  }
  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4.5rem;
    gap: 1rem;
  }
  .w-full {
    width: 100%;
  }
  .split {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .split label {
    width: 45%;
  }
  button {
    width: 50%;
    text-align: center;
  }
  label {
    color: var(--form-label-text-color);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    margin-top: 1.5rem;
  }
  label span {
    letter-spacing: 0.25px;
  }

  dialog {
    border-radius: 16px;
    width: 500px;
    border: 0;
    padding: 3rem 2rem;
  }
  button {
    transition: background-color 75ms ease;
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: 0.125rem;
    border-radius: 4px;
    font-weight: 700;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  button.text {
    border-style: none;
    background-color: transparent;
  }
  button.primary.text {
    color: var(--text-primary-50);
  }
  button.primary.text:hover {
    background-color: rgb(230 248 255);
  }
  button.primary.filled {
    background-color: var(--text-primary-50);
  }
  button.primary.filled:hover {
    background-color: rgb(0 86 179);
  }
  button.large {
    height: 3rem;
    padding: 0.75rem 1.5rem;
    font-size: var(--font-size-h6);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.25px;
    line-height: 24px;
  }
  button.filled {
    border-width: 0px;
    color: rgb(255 255 255);
  }
  input {
    height: 3rem;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 1rem;
    border: 1px solid var(--border-color);
    width: 100%;
  }
</style>
