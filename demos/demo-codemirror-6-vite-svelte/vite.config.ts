import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

import * as path from "path";

// const absPath = aPath => path.resolve(__dirname, aPath);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    exclude: ["cypher-codemirror", "cypher-antlr4", "cypher-editor-support"]
  },
  resolve: {
    alias: {
      // 'cypher-codemirror/css/cypher-codemirror.css': absPath('../cypher-codemirror/css/cypher-codemirror.css'),
      // 'cypher-codemirror': absPath('../cypher-codemirror/src/index.js'),
      // 'cypher-antlr4': absPath('../cypher-antlr4/src/index.js'),
      // 'cypher-antlr4-simple': absPath('../cypher-antlr4-simple/src/index.js'),
      // 'cypher-editor-support': absPath('../cypher-editor-support/src/index.js'),
      // 'demo-base': absPath('../demo-base/src/index.js')

      "@neo4j-cypher/codemirror/css/cypher-codemirror.css":
        "@neo4j-cypher/codemirror/css/cypher-codemirror.css",
      "@neo4j-cypher/codemirror": "@neo4j-cypher/codemirror/src/codemirror.js",
      "@neo4j-cypher/antlr4": "@neo4j-cypher/antlr4/src/index.js",
      "@neo4j-cypher/antlr4-simple": "@neo4j-cypher/antlr4-simple/src/index.js",
      "@neo4j-cypher/editor-support":
        "@neo4j-cypher/editor-support/src/editor-support.js",
      "demo-base/css/app.css": "demo-base/css/app.css",
      "demo-base": "demo-base/src/index.js"
    }
  }
});
