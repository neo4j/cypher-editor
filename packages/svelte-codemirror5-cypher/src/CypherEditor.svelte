<script>
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
  import { defaultOptions } from "cypher-codemirror-base";

  export let autocomplete = defaultOptions.autocomplete;
  $: updateOption({ autocomplete });

  export let autocompleteCloseOnBlur = defaultOptions.autocompleteCloseOnBlur;
  $: updateOption({ autocompleteCloseOnBlur });

  export let autocompleteOpen = defaultOptions.autocompleteOpen;
  $: updateOption({ autocompleteOpen });

  export let autocompleteSchema = defaultOptions.autocompleteSchema;
  $: updateOption({ autocompleteSchema });

  export let autocompleteTriggerStrings =
    defaultOptions.autocompleteTriggerStrings;
  $: updateOption({ autocompleteTriggerStrings });

  export let autofocusProps = defaultOptions.autofocusProps;

  export let history = defaultOptions.history;
  $: updateOption({ history });

  export let lineNumberFormatter = defaultOptions.lineNumberFormatter;
  $: updateOption({ lineNumberFormatter });

  export let lineNumbers = defaultOptions.lineNumbers;
  $: updateOption({ lineNumbers });

  export let lineWrapping = defaultOptions.lineWrapping;
  $: updateOption({ lineWrapping });

  export let lint = defaultOptions.lint;
  $: updateOption({ lint });

  export let placeholder = defaultOptions.placeholder;
  $: updateOption({ placeholder });

  export let position = defaultOptions.position;
  $: updateOption({ position });

  export let readOnly = defaultOptions.readOnly;
  $: updateOption({ readOnly });

  export let readOnlyCursor = defaultOptions.readOnlyCursor;
  $: updateOption({ readOnlyCursor });

  export let theme = defaultOptions.theme;
  $: updateOption({ theme });

  export let value = "";
  $: updateOption({ value });

  export let className = "";
  export let focusedClassName = "";
  export let autofocus = defaultOptions.autofocus;
  export let parseOnSetValue = defaultOptions.parseOnSetValue;

  export let onValueChanged = undefined;
  export let onFocusChanged = undefined;
  export let onScrollChanged = undefined;
  export let onPositionChanged = undefined;
  export let onEditorCreated = undefined;
  export let onAutocompleteChanged = undefined;
  export let onLineNumberClick = undefined;
  export let onKeyDown = undefined;

  let isFocused = false;

  let cypherEditorRef;
  let cypherEditor;
  let innerValue = value;

  $: editorClassName =
    (className ? className + " " : "") +
    (isFocused && focusedClassName ? focusedClassName : "");

  function updateOption(prop) {
    if (!cypherEditor) {
      return;
    }
    const key = Object.keys(prop).pop();

    // Call setValue only if the change comes from the outside
    if (key === "value" && innerValue === value) {
      return;
    }

    const methodName = "set" + key[0].toUpperCase() + key.slice(1);
    if (cypherEditor[methodName]) {
      cypherEditor[methodName](prop[key]);
    }

    if (autofocusProps.includes(key)) {
      cypherEditor.focus();
    }
  }

  const valueChanged = (doc, change) => {
    const newValue = doc.getValue();
    innerValue = newValue;
    value = newValue;
    onValueChanged && onValueChanged(newValue, change);
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

  const lineNumberClick = (line, event) => {
    onLineNumberClick && onLineNumberClick(line, event);
  };

  const keyDown = (event) => {
    onKeyDown && onKeyDown(event);
  };

  onMount(() => {
    const { editor } = createCypherEditor(cypherEditorRef, {
      autocomplete,
      autocompleteCloseOnBlur,
      autocompleteOpen,
      autocompleteSchema,
      autocompleteTriggerStrings,
      autofocus,
      history,
      lineNumberFormatter,
      lineNumbers,
      lineWrapping,
      lint,
      placeholder,
      position,
      readOnly,
      readOnlyCursor,
      theme,
      parseOnSetValue,
      value
    });
    cypherEditor = editor;
    cypherEditor.onValueChanged(valueChanged);
    cypherEditor.onFocusChanged(focusChanged);
    cypherEditor.onScrollChanged(scrollChanged);
    cypherEditor.onPositionChanged(positionChanged);
    cypherEditor.onAutocompleteChanged(autocompleteChanged);
    cypherEditor.onLineNumberClick(lineNumberClick);
    cypherEditor.onKeyDown(keyDown);

    onEditorCreated && onEditorCreated(cypherEditor);
  });

  onDestroy(() => {
    if (cypherEditor) {
      cypherEditor.offValueChanged(valueChanged);
      cypherEditor.offFocusChanged(focusChanged);
      cypherEditor.offScrollChanged(scrollChanged);
      cypherEditor.offPositionChanged(positionChanged);
      cypherEditor.offAutocompleteChanged(autocompleteChanged);
      cypherEditor.offLineNumberClick(lineNumberClick);
      cypherEditor.offKeyDown(keyDown);

      cypherEditor.destroy();
    }
  });
</script>

<div class={editorClassName} bind:this={cypherEditorRef} />
