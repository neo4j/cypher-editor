<script lang="js">
  import { onMount, onDestroy } from "svelte";

  import "cypher-codemirror/css/cypher-codemirror.css";
  import { createCypherEditor } from "cypher-codemirror";

  const THEME_LIGHT = "light";
  const THEME_DARK = "dark";

  export let initialPosition = undefined;

  export let initialOptions = undefined;

  export let initialSchema = undefined;

  export let onValueChanged = undefined;

  export let onFocusChanged = undefined;

  export let onScrollChanged = undefined;

  export let onPositionChanged = undefined;

  export let classNames = undefined;

  export let initialValue = "MATCH (n) RETURN n LIMIT 10";

  export let theme = THEME_LIGHT;

  export let onEditorCreated = undefined;

  export let onAutocompleteOpenChanged = undefined;

  export let onLineNumberClicked = undefined;

  $: cypherEditorOptions = { ...(initialOptions || {}) };

  let cypherEditorRef;
  let cypherEditor;
  let cypherEditorSupport;

  $: editorClassNames = (classNames ? classNames : [])
    .concat(theme !== THEME_DARK ? [] : ["cm-dark"])
    .join(" ");

  const valueChanged = (value, changes) => {
    onValueChanged && onValueChanged(value, changes);
  };

  const focusChanged = (focused) => {
    onFocusChanged && onFocusChanged(focused);
  };

  const focused = () => {
    focusChanged(true);
  };

  const blurred = () => {
    focusChanged(false);
  };

  const scrollChanged = (scrollInfo) => {
    onScrollChanged && onScrollChanged(scrollInfo);
  };

  const positionChanged = (positionObject) => {
    onPositionChanged && onPositionChanged(positionObject);
  };

  const autocompleteOpenChanged = (autocompleteOpen) => {
    onAutocompleteOpenChanged && onAutocompleteOpenChanged(autocompleteOpen);
  };

  const lineNumberClicked = (line, event) => {
    onLineNumberClicked && onLineNumberClicked(line, event);
  };

  onMount(() => {
    const { autofocus = true, ...options } = cypherEditorOptions;
    const { editor } = createCypherEditor(
      cypherEditorRef,
      options
    );
    const { editorSupport } = editor;
    cypherEditor = editor;
    cypherEditorSupport = editorSupport;

    if (autofocus) {
      cypherEditor.focus();
    }
    if (initialSchema) {
      editorSupport.setSchema(initialSchema);
    }
    cypherEditor.setValue(initialValue);
    if (initialPosition) {
      cypherEditor.goToPosition(initialPosition);
    }
    cypherEditor.on("change", valueChanged);
    cypherEditor.on("focus", focused);
    cypherEditor.on("blur", blurred);
    cypherEditor.on("scroll", scrollChanged);
    cypherEditor.on("position", positionChanged);
    cypherEditor.on("autocomplete", autocompleteOpenChanged);
    cypherEditor.on("lineclick", lineNumberClicked);

    onEditorCreated && onEditorCreated(cypherEditor);
  });

  onDestroy(() => {
    if (cypherEditor) {
      cypherEditor.off("change", valueChanged);
      cypherEditor.off("focus", focused);
      cypherEditor.off("blur", blurred);
      cypherEditor.off("scroll", scrollChanged);
      cypherEditor.off("position", positionChanged);
      cypherEditor.off("autocomplete", autocompleteOpenChanged);
      cypherEditor.off("lineclick", lineNumberClicked);

      cypherEditor.destroy();
    }
  });
</script>

<div class={editorClassNames} bind:this={cypherEditorRef} />
