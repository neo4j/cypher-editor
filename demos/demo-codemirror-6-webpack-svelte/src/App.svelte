<script lang="ts">
  import { App, Database } from "demo-base-svelte";
  import { CypherEditor } from "@neo4j-cypher/svelte-codemirror";
</script>

<App>
  <Database
    slot="database"
    codemirrorVersion="6"
    framework="svelte"
    bundler="webpack"
    editor={CypherEditor}
  />
</App>
