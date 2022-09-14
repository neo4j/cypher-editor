<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

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
  const INNER_THEME_LIGHT = 'cypher';
  const INNER_THEME_DARK = 'cypher cypher-dark';
  const THEME_MAP = {
    [THEME_LIGHT]: INNER_THEME_LIGHT,
    [THEME_DARK]: INNER_THEME_DARK
  };

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

  let innerTheme = THEME_MAP[theme];

  let isFocused = false;
  
  let cypherEditorRef;
  let cypherEditor;
  let cypherEditorSupport;

  $: editorClassNames = (classNames || []).concat(["ReactCodeMirror"]).concat(isFocused ? ["ReactCodeMirror--focused"] : []).join(" ");

  const defaultOptions = {
    lineNumbers: true,
    mode: "cypher",
    theme: innerTheme,
    gutters: ["cypher-hints"],
    lineWrapping: true,
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

  const valueChanged = (doc: { getValue: () => string}, change: any) => {
    if (onValueChange && change.origin !== "setValue") {
      onValueChange(doc.getValue(), change);
    }
  };

  const focusChanged = focused => {
    isFocused = focused;
    onFocusChange && onFocusChange(focused);
  };

  const scrollChanged = cm => {
    onScroll && onScroll(cm.getScrollInfo());
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
    if (cypherEditorOptions.lineNumbers === false) {
      cypherEditorOptions.gutters = false;
    }
    const { editor, editorSupport } = createCypherEditor(
      cypherEditorRef,
      cypherEditorOptions
    );
    cypherEditor = editor;
    cypherEditorSupport = editorSupport;

    if (cypherEditorOptions.autofocus) {
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
    cypherEditor.on("focus", () => focusChanged(true));
    cypherEditor.on("blur", () => focusChanged(false));
    cypherEditor.on("scroll", scrollChanged);
    cypherEditor.on("position", positionChanged);
    cypherEditor.on("autocomplete", autocompleteChanged);
    cypherEditor.on("lineclick", lineClicked);

    onEditorCreate && onEditorCreate(cypherEditor);
  });

  onDestroy(() => {
    cypherEditor.off("change", valueChanged);
    cypherEditor.off("focus", () => focusChanged(true));
    cypherEditor.off("blur", () => focusChanged(false));
    cypherEditor.off("scroll", scrollChanged);
    cypherEditor.off("position", positionChanged);
    cypherEditor.off("autocomplete", autocompleteChanged);
    cypherEditor.off("lineclick", lineClicked);
  });

  const themeChanged = (newTheme) => {
    innerTheme = THEME_MAP[newTheme];
    cypherEditor && cypherEditor.setOption('theme', innerTheme);
  };

  $: {
    themeChanged(theme);
  }

</script>

<div class={editorClassNames} bind:this={cypherEditorRef}>
</div>
