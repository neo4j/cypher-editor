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
  import { defaultOptions } from "cypher-codemirror-base";

  export let autocomplete: typeof defaultOptions.autocomplete =
    defaultOptions.autocomplete;
  $: updateOption({ autocomplete });

  export let autocompleteCloseOnBlur: typeof defaultOptions.autocompleteCloseOnBlur =
    defaultOptions.autocompleteCloseOnBlur;
  $: updateOption({ autocompleteCloseOnBlur });

  export let autocompleteSchema: typeof defaultOptions.autocompleteSchema =
    defaultOptions.autocompleteSchema;
  $: updateOption({ autocompleteSchema });

  export let autocompleteTriggerStrings: typeof defaultOptions.autocompleteTriggerStrings =
    defaultOptions.autocompleteTriggerStrings;
  $: updateOption({ autocompleteTriggerStrings });

  export let history: typeof defaultOptions.history = defaultOptions.history;
  $: updateOption({ history });

  export let lineNumberFormatter: typeof defaultOptions.lineNumberFormatter =
    defaultOptions.lineNumberFormatter;
  $: updateOption({ lineNumberFormatter });

  export let lineNumbers: typeof defaultOptions.lineNumbers =
    defaultOptions.lineNumbers;
  $: updateOption({ lineNumbers });

  export let lineWrapping: typeof defaultOptions.lineWrapping =
    defaultOptions.lineWrapping;
  $: updateOption({ lineWrapping });

  export let lint: typeof defaultOptions.lint = defaultOptions.lint;
  $: updateOption({ lint });

  export let placeholder: typeof defaultOptions.placeholder =
    defaultOptions.placeholder;
  $: updateOption({ placeholder });

  export let readOnly: typeof defaultOptions.readOnly = defaultOptions.readOnly;
  $: updateOption({ readOnly });

  export let readOnlyCursor: typeof defaultOptions.readOnlyCursor =
    defaultOptions.readOnlyCursor;
  $: updateOption({ readOnlyCursor });

  export let theme: typeof defaultOptions.theme = defaultOptions.theme;
  $: updateOption({ theme });

  export let value: string = "";
  $: updateOption({ value });

  export let className: string = "";
  export let focusedClassName: string = "";
  export let autofocus: typeof defaultOptions.autofocus | undefined =
    defaultOptions.autofocus;
  export let parseOnSetValue:
    | typeof defaultOptions.parseOnSetValue
    | undefined = defaultOptions.parseOnSetValue;

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

  const valueChanged = (doc: { getValue: () => string }, change: any) => {
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
