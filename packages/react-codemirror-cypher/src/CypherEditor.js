import React, { Component } from "react";
import { createCypherEditor } from "cypher-codemirror";
import "cypher-codemirror/css/cypher-codemirror.css";

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
    const { onValueChanged } = this.props;
    onValueChanged && onValueChanged(value);
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

  lineNumberClicked = (line, event) => {
    const { onLineNumberClicked } = this.props;
    onLineNumberClicked && onLineNumberClicked(line, event);
  };

  componentDidMount() {
    const { initialOptions, onEditorCreated } = this.props;
    const { editor } = createCypherEditor(this.editorRef, initialOptions);
    this.cypherEditor = editor;
    this.cypherEditor.onValueChanged(this.valueChanged);
    this.cypherEditor.onFocusChanged(this.focusChanged);
    this.cypherEditor.onScrollChanged(this.scrollChanged);
    this.cypherEditor.onPositioChanged(this.positionChanged);
    this.cypherEditor.onAutocompleteChanged(this.autocompleteChanged);
    this.cypherEditor.onLineNumberClicked(this.lineNumberClicked);

    onEditorCreated && onEditorCreated(this.cypherEditor);
  }

  componentWillUnmount() {
    if (this.cypherEditor) {
      this.cypherEditor.offValueChanged(this.valueChanged);
      this.cypherEditor.offFocusChanged(this.focusChanged);
      this.cypherEditor.offScrollChanged(this.scrollChanged);
      this.cypherEditor.offPositionChanged(this.positionChanged);
      this.cypherEditor.offAutocompleteChanged(this.autocompleteChanged);
      this.cypherEditor.offLineNumberClicked(this.lineNumberClicked);

      this.cypherEditor.destroy();
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
