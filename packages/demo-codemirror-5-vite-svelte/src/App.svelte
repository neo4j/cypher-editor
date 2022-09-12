<script lang="ts">
  import { App, Database } from "demo-base-svelte";
  import CypherEditor from "svelte-codemirror5-cypher";
</script>

<App>
  <Database slot="database" codemirrorVersion="5" framework="svelte" bundler="vite" editor={CypherEditor} />
</App>