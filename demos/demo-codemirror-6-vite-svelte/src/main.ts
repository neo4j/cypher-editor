import "demo-base/css/app.css";
import "@neo4j-cypher/codemirror/css/cypher-codemirror.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")
});

export default app;
