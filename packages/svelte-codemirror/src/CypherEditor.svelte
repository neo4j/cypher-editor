<!--
/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
-->
<script>
  import { onMount, onDestroy } from "svelte";
  import { createCypherEditor, defaultOptions } from "@neo4j-cypher/codemirror";

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
