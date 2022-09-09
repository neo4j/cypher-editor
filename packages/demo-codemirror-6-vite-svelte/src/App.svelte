<script lang="ts">
  import { App, Database } from "demo-base-svelte";
  import CypherEditor from "svelte-codemirror-cypher";
</script>

<App codemirrorVersion="6" framework="svelte" bundler="vite">
  <Database slot="database" editor={CypherEditor}>
  </Database>
</App>
