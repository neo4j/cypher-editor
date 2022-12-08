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

import React, { Component } from "react";
import {
  createCypherEditor,
  reactiveOptionKeys,
  defaultOptions
} from "@neo4j-cypher/codemirror";

class CypherEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  setEditorRef = (ref) => {
    this.editorRef = ref;
  };

  valueChanged = (value, changes) => {
    this.innerValue = value;
    this.value = value;
    const { onValueChanged } = this.props;
    onValueChanged && onValueChanged(value, changes);
  };

  focusChanged = (focused) => {
    const { onFocusChanged } = this.props;
    this.setState({ focused });
    onFocusChanged && onFocusChanged(focused);
  };

  scrollChanged = (scrollInfo) => {
    const { onScrollChanged } = this.props;
    onScrollChanged && onScrollChanged(scrollInfo);
  };

  positionChanged = (positionObject) => {
    const { onPositionChanged } = this.props;
    onPositionChanged && onPositionChanged(positionObject);
  };

  autocompleteChanged = (autocompleteOpen, from, options) => {
    const { onAutocompleteChanged } = this.props;
    onAutocompleteChanged &&
      onAutocompleteChanged(autocompleteOpen, from, options);
  };

  lineNumberClick = (line, event) => {
    const { onLineNumberClick } = this.props;
    onLineNumberClick && onLineNumberClick(line, event);
  };

  keyDown = (event) => {
    const { onKeyDown } = this.props;
    onKeyDown && onKeyDown(event);
  };

  componentDidMount() {
    const {
      autocomplete,
      autocompleteCloseOnBlur,
      autocompleteOpen,
      autocompleteTriggerStrings,
      autofocus,
      history,
      indentWithTab,
      lineNumberFormatter,
      lineNumbers,
      lineWrapping,
      lint,
      placeholder,
      position,
      readOnly,
      readOnlyCursor,
      schema,
      theme,
      tooltipAbsolute,
      parseOnSetValue,
      value,
      onEditorCreated
    } = this.props;

    this.value = this.innerValue = value;

    const { editor } = createCypherEditor(this.editorRef, {
      autocomplete,
      autocompleteCloseOnBlur,
      autocompleteOpen,
      autocompleteTriggerStrings,
      autofocus,
      history,
      indentWithTab,
      lineNumberFormatter,
      lineNumbers,
      lineWrapping,
      lint,
      placeholder,
      position,
      readOnly,
      readOnlyCursor,
      schema,
      theme,
      tooltipAbsolute,
      parseOnSetValue,
      value
    });
    this.cypherEditor = editor;
    this.cypherEditor.onValueChanged(this.valueChanged);
    this.cypherEditor.onFocusChanged(this.focusChanged);
    this.cypherEditor.onScrollChanged(this.scrollChanged);
    this.cypherEditor.onPositionChanged(this.positionChanged);
    this.cypherEditor.onAutocompleteChanged(this.autocompleteChanged);
    this.cypherEditor.onLineNumberClick(this.lineNumberClick);
    this.cypherEditor.onKeyDown(this.keyDown);

    onEditorCreated && onEditorCreated(this.cypherEditor);
  }

  componentWillUnmount() {
    if (this.cypherEditor) {
      this.cypherEditor.offValueChanged(this.valueChanged);
      this.cypherEditor.offFocusChanged(this.focusChanged);
      this.cypherEditor.offScrollChanged(this.scrollChanged);
      this.cypherEditor.offPositionChanged(this.positionChanged);
      this.cypherEditor.offAutocompleteChanged(this.autocompleteChanged);
      this.cypherEditor.offLineNumberClick(this.lineNumberClick);
      this.cypherEditor.offKeyDown(this.keyDown);

      this.cypherEditor.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.value = this.props.value;
    }
    for (let key of reactiveOptionKeys) {
      if (prevProps[key] !== this.props[key]) {
        this.updateOption({ [key]: this.props[key] });
      }
    }
  }

  updateOption(prop) {
    if (!this.cypherEditor) {
      return;
    }
    const key = Object.keys(prop).pop();

    // Call setValue only if the change comes from the outside
    if (key === "value" && this.innerValue === this.value) {
      return; // TODO - this probably isn't needed for React (only needed for bind:value in Svelte?)
    }

    const methodName = "set" + key[0].toUpperCase() + key.slice(1);
    if (this.cypherEditor[methodName]) {
      this.cypherEditor[methodName](prop[key]);
    }

    const autofocusProps =
      this.props.autofocusProps !== undefined
        ? this.props.autofocusProps
        : defaultOptions.autofocusProps;

    if (autofocusProps.includes(key)) {
      this.cypherEditor.focus();
    }
  }

  render() {
    const { className, focusedClassName } = this.props;
    const { focused } = this.state;
    const editorClassName =
      (className ? className + " " : "") +
      (focused && focusedClassName ? focusedClassName : "");

    return <div className={editorClassName} ref={this.setEditorRef}></div>;
  }
}

export default CypherEditor;
