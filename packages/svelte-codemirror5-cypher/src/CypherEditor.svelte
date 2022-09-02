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

  const THEME_LIGHT = 'cypher';
  const THEME_DARK = 'cypher cypher-dark';

  export let initialPosition = undefined;

  export let options = undefined;

  export let autoCompleteSchema = undefined;

  export let onValueChange = undefined;

  export let onFocusChange = undefined;

  export let onScroll = undefined;

  export let classNames = undefined;

  export let cypher = "MATCH (n) RETURN n LIMIT 10";

  export let theme = THEME_LIGHT;

  let lineNumberFormatter;

  const defaultOptions = {
    lineNumbers: true,
    mode: "cypher",
    theme: "cypher",
    gutters: ["cypher-hints"],
    lineWrapping: true,
    autofocus: true,
    smartIndent: false,
    lineNumberFormatter: (line) => lineNumberFormatter ? lineNumberFormatter(line) : line,
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

  let cypherEditorOptions = { ...defaultOptions, ...(options || {}) };

  let isFocused = false;

  let schema = autoCompleteSchema;
  
  let cypherEditorRef;
  let cypherEditor;
  let cypherEditorSupport;
  const goToPosition = (position) => {
    for (let i = 0; i < position.line; i++) {
      cypherEditor.execCommand("goLineDown");
    }

    for (let i = 0; i <= position.column; i++) {
      cypherEditor.execCommand("goCharRight");
    }
  };

  const triggerAutocompletion = (changed) => {
    if (changed.text.length !== 1) {
      return;
    }

    const text = changed.text[0];
    const shouldTriggerAutocompletion =
      text === '.' ||
      text === ':' ||
      text === '[]' ||
      text === '()' ||
      text === '{}' ||
      text === '[' ||
      text === '(' ||
      text === '{' ||
      text === '$';
    if (shouldTriggerAutocompletion) {
      cypherEditor.execCommand('autocomplete');
    }
  };

  const valueChanged = (doc: { getValue: () => string}, change: any) => {
    if (onValueChange && change.origin !== "setValue") {
      onValueChange(doc.getValue(), change);
    }
    triggerAutocompletion(change);
  };

  const focusChanged = focused => {
    isFocused = focused;
    onFocusChange && onFocusChange(focused);
  };

  const scrollChanged = cm => {
    onScroll && onScroll(cm.getScrollInfo());
  };

  onMount(() => {
    const { editor, editorSupport } = createCypherEditor(
      cypherEditorRef,
      cypherEditorOptions
    );
    cypherEditor = editor;
    cypherEditorSupport = editorSupport;

    lineNumberFormatter = line => {
      if (!cypherEditor || cypherEditor.lineCount() === 1) {
        return "$";
      } else {
        return line;
      }
    };

    cypherEditor.on("change", valueChanged);
    cypherEditor.on("focus", () => focusChanged(true));
    cypherEditor.on("blur", () => focusChanged(false));
    cypherEditor.on("scroll", scrollChanged);
    cypherEditor.setValue(cypher);
    cypherEditor.setOption('theme', theme);
    
    cypherEditorSupport.setSchema(schema);

    if (initialPosition) {
      goToPosition(initialPosition);
    }
  });

  onDestroy(() => {
    cypherEditor.off("change", valueChanged);
    cypherEditor.off("focus", () => focusChanged(true));
    cypherEditor.off("blur", () => focusChanged(false));
    cypherEditor.off("scroll", scrollChanged);
  });

  const editorClassNames = (classNames || []).concat(['ReactCodeMirror']).concat(isFocused ? ['ReactCodeMirror--focused'] : []).join(' ')

  const themeChanged = (newTheme) => {
    cypherEditor && cypherEditor.setOption('theme', newTheme);
  };

  $: {
    themeChanged(theme);
  }

</script>

<div class={editorClassNames} bind:this={cypherEditorRef}>
</div>
