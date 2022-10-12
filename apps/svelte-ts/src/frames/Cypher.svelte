<script lang="ts">
  import type { QueryResult } from "neo4j-driver";
  export let result: QueryResult;
</script>

<pre>{JSON.stringify(result.records, null, 2)}</pre>

<style>
  pre {
    background-color: #fafafa;
    border-radius: 6px;
    padding: 8px;
  }
</style>
