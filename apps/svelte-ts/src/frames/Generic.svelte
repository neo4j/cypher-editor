<script lang="ts">
  import type { GenericResult } from "./Generic.types";
  export let result: GenericResult;
</script>

<p>{result.data}</p>

<style>
  p {
    font-size: 1rem;
  }
</style>
