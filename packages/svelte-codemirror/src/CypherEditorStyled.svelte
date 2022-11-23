<script>
import "@neo4j-cypher/codemirror/css/cypher-codemirror.css";

import { default as CypherEditor } from "./CypherEditor.svelte";
</script>

<CypherEditor {...$$props}/>
