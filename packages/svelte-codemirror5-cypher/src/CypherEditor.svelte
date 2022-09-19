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

  export let initialPosition = undefined;

  export let initialOptions = undefined;

  export let initialSchema = undefined;

  export let onValueChanged = undefined;

  export let onFocusChanged = undefined;

  export let onScrollChanged = undefined;

  export let onPositionChanged = undefined;

  export let classNames = undefined;

  export let initialValue = "MATCH (n) RETURN n LIMIT 10";

  export let theme = undefined;

  export let onEditorCreated = undefined;

  export let onAutocompleteOpenChanged = undefined;

  export let onLineNumberClicked = undefined;

  let isFocused = false;

  let cypherEditorRef;
  let cypherEditor;

  $: editorClassNames = (classNames || [])
    .concat(["ReactCodeMirror"])
    .concat(isFocused ? ["ReactCodeMirror--focused"] : [])
    .join(" ");

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

  const autocompleteOpenChanged = (autocompleteOpen) => {
    onAutocompleteOpenChanged && onAutocompleteOpenChanged(autocompleteOpen);
  };

  const lineNumberClicked = (line, event) => {
    onLineNumberClicked && onLineNumberClicked(line, event);
  };

  onMount(() => {
    const { editor } = createCypherEditor(cypherEditorRef, {
      ...initialOptions,
      theme
    });
    cypherEditor = editor;

    if (initialSchema) {
      cypherEditor.setSchema(initialSchema);
    }
    cypherEditor.setValue(initialValue);
    if (initialPosition) {
      cypherEditor.goToPosition(initialPosition);
    }

    cypherEditor.on("change", valueChanged);
    cypherEditor.on("focus", () => focusChanged(true));
    cypherEditor.on("blur", () => focusChanged(false));
    cypherEditor.on("scroll", scrollChanged);
    cypherEditor.on("position", positionChanged);
    cypherEditor.on("autocomplete", autocompleteOpenChanged);
    cypherEditor.on("lineclick", lineNumberClicked);

    onEditorCreated && onEditorCreated(cypherEditor);
  });

  onDestroy(() => {
    cypherEditor.off("change", valueChanged);
    cypherEditor.off("focus", () => focusChanged(true));
    cypherEditor.off("blur", () => focusChanged(false));
    cypherEditor.off("scroll", scrollChanged);
    cypherEditor.off("position", positionChanged);
    cypherEditor.off("autocomplete", autocompleteOpenChanged);
    cypherEditor.off("lineclick", lineNumberClicked);

    cypherEditor.destroy();
  });
</script>

<div class={editorClassNames} bind:this={cypherEditorRef} />
