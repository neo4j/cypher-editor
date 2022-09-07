<script lang="js">
  import { onMount, onDestroy } from "svelte";

  import "cypher-codemirror/css/cypher-codemirror.css";
  import { createCypherEditor } from "cypher-codemirror";

  export let initialPosition = undefined;

  export let options = undefined;

  export let autoCompleteSchema = undefined;

  export let onValueChange = undefined;

  export let onFocusChange = undefined;

  export let onScroll = undefined;

  export let classNames = undefined;

  export let cypher = "MATCH (n) RETURN n LIMIT 10";

  const THEME_LIGHT = "light";
  const THEME_DARK = "dark";

  export let theme = THEME_LIGHT;

  let cypherEditorOptions = { ...(options || {}) };

  let cypherEditorRef;
  let cypherEditor;
  let cypherEditorSupport;

  $: editorClassNames = (classNames ? classNames : [])
    .concat(theme !== THEME_DARK ? [] : ["cm-dark"])
    .join(" ");

  const triggerAutocompletion = (changes) => {
    let changedText = [];
    changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
      changedText = inserted.text;
    });

    if (changedText.length !== 1) {
      return;
    }

    const text = changedText[0];
    const shouldTriggerAutocompletion =
      text === "." ||
      text === ":" ||
      text === "[]" ||
      text === "()" ||
      text === "{}" ||
      text === "[" ||
      text === "(" ||
      text === "{" ||
      text === "$";
    if (shouldTriggerAutocompletion) {
      cypherEditor.showAutoComplete();
    }
  };

  const valueChanged = (value, changes) => {
    triggerAutocompletion(changes);
    onValueChange && onValueChange(value);
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

  onMount(() => {
    const { editor, editorSupport } = createCypherEditor(
      cypherEditorRef,
      cypherEditorOptions
    );
    cypherEditor = editor;
    cypherEditorSupport = editorSupport;

    cypherEditor.focus();
    cypherEditor.setValue(cypher);
    if (initialPosition) {
      cypherEditor.goToPosition(initialPosition);
    }
    cypherEditor.on("change", valueChanged);
    cypherEditor.on("focus", focused);
    cypherEditor.on("blur", blurred);
    cypherEditor.on("scroll", scrollChanged);
  });

  onDestroy(() => {
    if (cypherEditor) {
      cypherEditor.off("change", valueChanged);
      cypherEditor.off("focus", focused);
      cypherEditor.off("blur", blurred);
      cypherEditor.off("scroll", scrollChanged);
      cypherEditor.destroy();
    }
  });
</script>

<div class={editorClassNames} bind:this={cypherEditorRef} />
