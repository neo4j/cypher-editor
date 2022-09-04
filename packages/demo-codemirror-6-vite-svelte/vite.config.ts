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

      "cypher-codemirror/css/cypher-codemirror.css":
        "cypher-codemirror/css/cypher-codemirror.css",
      "cypher-codemirror": "cypher-codemirror/src/index.js",
      "cypher-antlr4": "cypher-antlr4/src/index.js",
      "cypher-antlr4-simple": "cypher-antlr4-simple/src/index.js",
      "cypher-editor-support": "cypher-editor-support/src/index.js",
      "demo-base": "demo-base/src/index.js"
    }
  }
});
