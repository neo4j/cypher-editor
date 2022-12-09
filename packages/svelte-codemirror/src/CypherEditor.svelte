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

  export let autocompleteTriggerStrings =
    defaultOptions.autocompleteTriggerStrings;
  $: updateOption({ autocompleteTriggerStrings });

  export let autofocusProps = defaultOptions.autofocusProps;

  export let history = defaultOptions.history;
  $: updateOption({ history });

  export let indentUnit = defaultOptions.indentUnit;
  $: updateOption({ indentUnit });

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

  export let schema = defaultOptions.schema;
  $: updateOption({ schema });

  export let search = defaultOptions.search;
  $: updateOption({ search });

  export let searchTop = defaultOptions.searchTop;
  $: updateOption({ searchTop });

  export let tabKey = defaultOptions.tabKey;
  $: updateOption({ tabKey });

  export let theme = defaultOptions.theme;
  $: updateOption({ theme });

  export let tooltipAbsolute = defaultOptions.tooltipAbsolute;
  $: updateOption({ tooltipAbsolute });

  export let value = defaultOptions.value;
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
  let lastValue = null;
  let lastPosition = null;

  $: editorClassName =
    (className ? className + " " : "") +
    (isFocused && focusedClassName ? focusedClassName : "");

  function updateOption(prop) {
    if (!cypherEditor) {
      return;
    }
    const key = Object.keys(prop).pop();

    if (key === "value") {
      if (prop[key] === lastValue) {
        return;
      } else {
        lastValue = prop[key];
      }
    }
    if (key === "position") {
      const { position } = cypherEditor.getPositionForValue(prop[key]) || {
        position: null
      };
      if (position === lastPosition) {
        return;
      } else {
        lastPosition = position;
      }
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
    lastValue = newValue;
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
    lastPosition = (positionObject || { position: null }).position;
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
      autocompleteTriggerStrings,
      autofocus,
      history,
      indentUnit,
      lineNumberFormatter,
      lineNumbers,
      lineWrapping,
      lint,
      placeholder,
      position,
      readOnly,
      readOnlyCursor,
      schema,
      search,
      searchTop,
      tabKey,
      theme,
      tooltipAbsolute,
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
