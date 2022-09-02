import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      'cypher-codemirror5/css/cypher-codemirror.css': 'cypher-codemirror5/css/cypher-codemirror.css',
      'cypher-codemirror5': 'cypher-codemirror5/src/index.js',
      'cypher-antlr4': 'cypher-antlr4/src/index.js',
      'cypher-antlr4-simple': 'cypher-antlr4-simple/src/index.js',
      'cypher-editor-support': 'cypher-editor-support/src/index.js',
      'demo-base': 'demo-base/src/index.js'
    }
  }
});
