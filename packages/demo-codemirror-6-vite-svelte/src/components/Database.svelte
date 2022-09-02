<script lang="ts">
  import neo4j from "neo4j-driver";
  import CypherEditor from "svelte-codemirror-cypher";
  import { neo4jSchema, defaultQuery, initialPosition } from "demo-base";

  const driver = neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic("neo4j", "asdfgh")
  );

  let cypher = defaultQuery;

  let theme = "light";

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

  let localSchema = neo4jSchema;

  // Add new command to show the schema updating
  // after 5 secs
  setTimeout(() => {
    const tmpSchema = {
      ...neo4jSchema,
      consoleCommands: neo4jSchema.consoleCommands.concat({
        name: ":new-command",
      }),
    };
    localSchema = tmpSchema;
  }, 5000);
</script>

<main>
  <CypherEditor
    {onValueChange}
    {initialPosition}
    autoCompleteSchema={localSchema}
    bind:cypher
    {theme}
  />
  <button on:click={lightTheme}>Light theme</button>
  <button on:click={darkTheme}>Dark theme</button>
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
