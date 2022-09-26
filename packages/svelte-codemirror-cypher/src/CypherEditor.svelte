<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import "cypher-codemirror/css/cypher-codemirror.css";
  import { createCypherEditor } from "cypher-codemirror";
  import { defaultOptions } from "cypher-codemirror-base";

  export let autocomplete: boolean = defaultOptions.autocomplete;
  $: updateOption({ autocomplete });

  export let autocompleteCloseOnBlur: boolean =
    defaultOptions.autocompleteCloseOnBlur;
  $: updateOption({ autocompleteCloseOnBlur });

  export let autocompleteSchema = defaultOptions.autocompleteSchema;
  $: updateOption({ autocompleteSchema });

  export let autocompleteTriggerStrings: string[] =
    defaultOptions.autocompleteTriggerStrings;
  $: updateOption({ autocompleteTriggerStrings });

  export let history: boolean = defaultOptions.history;
  $: updateOption({ history });

  export let lineNumberFormatter: (line: string, lineNumber: number) => string =
    defaultOptions.lineNumberFormatter;
  $: updateOption({ lineNumberFormatter });

  export let lineNumbers: boolean = defaultOptions.lineNumbers;
  $: updateOption({ lineNumbers });

  export let lineWrapping: boolean = defaultOptions.lineWrapping;
  $: updateOption({ lineWrapping });

  export let lint: boolean = defaultOptions.lint;
  $: updateOption({ lint });

  export let placeholder: string = defaultOptions.placeholder;
  $: updateOption({ placeholder });

  export let readOnly: boolean = defaultOptions.readOnly;
  $: updateOption({ readOnly });

  export let readOnlyCursor: boolean = defaultOptions.readOnlyCursor;
  $: updateOption({ readOnlyCursor });

  export let theme = defaultOptions.theme;
  $: updateOption({ theme });

  export let value: string = "";
  $: updateOption({ value });

  export let className: string = undefined;
  export let focusedClassName: string = undefined;
  export let autofocus: boolean | undefined = undefined;
  export let parseOnSetValue: boolean | undefined = true;

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
  }

  const valueChanged = (newValue, changes) => {
    innerValue = newValue;
    value = newValue;
    onValueChanged && onValueChanged(newValue, changes);
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
      autocompleteSchema,
      autocompleteTriggerStrings,
      autofocus,
      history,
      lineNumberFormatter,
      lineNumbers,
      lineWrapping,
      lint,
      placeholder,
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
