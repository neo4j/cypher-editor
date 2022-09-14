<script lang="js">
  import { onMount, onDestroy } from "svelte";

  import "cypher-codemirror/css/cypher-codemirror.css";
  import { createCypherEditor } from "cypher-codemirror";

  const THEME_LIGHT = "light";
  const THEME_DARK = "dark";

  export let initialPosition = undefined;

  export let initialOptions = undefined;

  export let initialSchema = undefined;

  export let onValueChange = undefined;

  export let onFocusChange = undefined;

  export let onScroll = undefined;

  export let onPositionChange = undefined;

  export let classNames = undefined;

  export let initialValue = "MATCH (n) RETURN n LIMIT 10";

  export let theme = THEME_LIGHT;

  export let onEditorCreate = undefined;

  export let onAutocompleteOpenChange = undefined;

  export let onLineClick = undefined;

  $: cypherEditorOptions = { ...(initialOptions || {}) };

  let cypherEditorRef;
  let cypherEditor;
  let cypherEditorSupport;

  $: editorClassNames = (classNames ? classNames : [])
    .concat(theme !== THEME_DARK ? [] : ["cm-dark"])
    .join(" ");

  const valueChanged = (value, changes) => {
    onValueChange && onValueChange(value, changes);
  };

  const focusChanged = (focused) => {
    onFocusChange && onFocusChange(focused);
  };

  const focused = () => {
    focusChanged(true);
  };

  const blurred = () => {
    focusChanged(false);
  };

  const scrollChanged = (scrollInfo) => {
    onScroll && onScroll(scrollInfo);
  };

  const positionChanged = (positionObject) => {
    onPositionChange && onPositionChange(positionObject);
  };

  const autocompleteChanged = (autocompleteOpen) => {
    onAutocompleteOpenChange && onAutocompleteOpenChange(autocompleteOpen);
  }

  const lineClicked = (line, event) => {
    onLineClick && onLineClick(line, event);
  }

  onMount(() => {
    const { autofocus = true, ...options } = cypherEditorOptions;
    const { editor, editorSupport } = createCypherEditor(
      cypherEditorRef,
      options
    );
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
    cypherEditor.on("autocomplete", autocompleteChanged);
    cypherEditor.on("lineclick", lineClicked);

    onEditorCreate && onEditorCreate(cypherEditor);
  });

  onDestroy(() => {
    if (cypherEditor) {
      cypherEditor.off("change", valueChanged);
      cypherEditor.off("focus", focused);
      cypherEditor.off("blur", blurred);
      cypherEditor.off("scroll", scrollChanged);
      cypherEditor.off("position", positionChanged);
      cypherEditor.off("autocomplete", autocompleteChanged);
      cypherEditor.off("lineclick", lineClicked);

      cypherEditor.destroy();
    }
  });
</script>

<div class={editorClassNames} bind:this={cypherEditorRef} />
