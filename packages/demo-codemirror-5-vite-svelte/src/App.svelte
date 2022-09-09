<script lang="ts">
  import { App, Database } from "demo-base-svelte";
  import CypherEditor from "svelte-codemirror5-cypher";
</script>

<App codemirrorVersion="5" framework="svelte" bundler="vite">
  <Database slot="database" editor={CypherEditor}>
  </Database>
</App>