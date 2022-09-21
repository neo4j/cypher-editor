<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import "codemirror/addon/lint/lint";
  import "codemirror/addon/hint/show-hint";
  import "codemirror/addon/hint/show-hint.css";
  import "codemirror/addon/edit/closebrackets";
  import "codemirror/addon/display/placeholder";
  import "codemirror/lib/codemirror.css";
  import "codemirror/addon/lint/lint.css";
  import "cypher-codemirror5/css/cypher-codemirror.css";
  import { createCypherEditor } from "cypher-codemirror5";

  export let initialOptions = undefined;

  export let onValueChanged = undefined;

  export let onFocusChanged = undefined;

  export let onScrollChanged = undefined;

  export let onPositionChanged = undefined;

  export let className = undefined;

  export let focusedClassName = undefined;

  export let onEditorCreated = undefined;

  export let onAutocompleteChanged = undefined;

  export let onLineNumberClicked = undefined;

  let isFocused = false;

  let cypherEditorRef;
  let cypherEditor;

  $: editorClassName =
    (className ? className + " " : "") +
    (isFocused && focusedClassName ? focusedClassName : "");

  const valueChanged = (doc: { getValue: () => string }, change: any) => {
    onValueChanged && onValueChanged(doc.getValue(), change);
  };

  const focusChanged = (focused) => {
    isFocused = focused;
    onFocusChanged && onFocusChanged(focused);
  };

  const scrollChanged = (scrollInfo) => {
    onScrollChanged && onScrollChanged(scrollInfo);
  };

  const positionChanged = (positionObject) => {
    onPositionChanged && onPositionChanged(positionObject);
  };

  const autocompleteChanged = (autocompleteOpen, from, options) => {
    onAutocompleteChanged &&
      onAutocompleteChanged(autocompleteOpen, from, options);
  };

  const lineNumberClicked = (line, event) => {
    onLineNumberClicked && onLineNumberClicked(line, event);
  };

  onMount(() => {
    const { editor } = createCypherEditor(cypherEditorRef, initialOptions);
    cypherEditor = editor;
    cypherEditor.onValueChanged(valueChanged);
    cypherEditor.onFocusChanged(focusChanged);
    cypherEditor.onScrollChanged(scrollChanged);
    cypherEditor.onPositioChanged(positionChanged);
    cypherEditor.onAutocompleteChanged(autocompleteChanged);
    cypherEditor.onLineNumberClicked(lineNumberClicked);

    onEditorCreated && onEditorCreated(cypherEditor);
  });

  onDestroy(() => {
    if (cypherEditor) {
      cypherEditor.offValueChanged(valueChanged);
      cypherEditor.offFocusChanged(focusChanged);
      cypherEditor.offScrollChanged(scrollChanged);
      cypherEditor.offPositionChanged(positionChanged);
      cypherEditor.offAutocompleteChanged(autocompleteChanged);
      cypherEditor.offLineNumberClicked(lineNumberClicked);

      cypherEditor.destroy();
    }
  });
</script>

<div class={editorClassName} bind:this={cypherEditorRef} />
