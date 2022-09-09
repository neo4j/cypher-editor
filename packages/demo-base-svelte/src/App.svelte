<script lang="ts">
  export let codemirrorVersion = undefined;
  export let framework = undefined;
  export let bundler = undefined;
</script>

<main>
  <h1>Cypher Codemirror {codemirrorVersion} {framework} {bundler}</h1>
  <div class="card">
    <slot name="database"/>
  </div>
</main>
