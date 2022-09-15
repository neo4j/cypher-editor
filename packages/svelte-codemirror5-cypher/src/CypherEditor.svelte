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

  let isFocused = false;

  let cypherEditorRef;
  let cypherEditor;

  $: editorClassNames = (classNames || [])
    .concat(["ReactCodeMirror"])
    .concat(isFocused ? ["ReactCodeMirror--focused"] : [])
    .join(" ");

  const defaultOptions = {
    lineNumbers: true,
    mode: "cypher",
    theme: theme,
    gutters: ["cypher-hints"],
    lineWrapping: false,
    autofocus: true,
    smartIndent: false,
    lint: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete"
    },
    hintOptions: {
      completeSingle: false, //
      closeOnUnfocus: false, //
      alignWithWord: true, //
      async: true //
    },
    autoCloseBrackets: {
      explode: ""
    }
  };

  $: cypherEditorOptions = { ...defaultOptions, ...(initialOptions || {}) };

  const valueChanged = (doc: { getValue: () => string }, change: any) => {
    if (onValueChanged && change.origin !== "setValue") {
      onValueChanged(doc.getValue(), change);
    }
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
    if (cypherEditorOptions.lineNumbers === false) {
      cypherEditorOptions.gutters = false;
    }
    const { editor } = createCypherEditor(
      cypherEditorRef,
      cypherEditorOptions
    );
    cypherEditor = editor;

    if (cypherEditorOptions.autofocus) {
      cypherEditor.focus();
    }
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
  });

  const themeChanged = (newTheme) => {
    cypherEditor && cypherEditor.setTheme(newTheme);
  };

  $: {
    themeChanged(theme);
  }
</script>

<div class={editorClassNames} bind:this={cypherEditorRef} />
