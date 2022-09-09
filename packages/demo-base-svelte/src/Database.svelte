<script lang="ts">
  import neo4j from "neo4j-driver";
  import { neo4jSchema, defaultQuery, initialPosition, host, user, pass } from "demo-base";

  export let editor = undefined;

  const driver = neo4j.driver(
    host,
    neo4j.auth.basic(user, pass)
  );

  let cypher = defaultQuery;

  let theme = "light";
  let position = initialPosition || { line: 1, column: 0 };
  let focused = true;

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

  const onFocusChange = (newFocused) => {
    focused = newFocused;
  }

  $: cypherLength = cypher ? cypher.length : 0;
  $: positionString = position ? JSON.stringify(position) : "";
  $: focusedString = focused + "";
</script>

<main>
  <svelte:component
    {onValueChange}
    {onPositionChange}
    {onFocusChange}
    {initialPosition}
    autoCompleteSchema={neo4jSchema}
    {cypher}
    {theme} this={editor}/>
  <button on:click={lightTheme}>Light theme</button>
  <button on:click={darkTheme}>Dark theme</button>
  <div>Length: {cypherLength}</div>
  <div>Position: {positionString}</div>
  <div>Focused: {focusedString}</div>
  <button on:click={send}> Run </button>

  <div>
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
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
