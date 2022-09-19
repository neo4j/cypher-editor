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

  focused = () => {
    this.focusChanged(true);
  };

  blurred = () => {
    this.focusChanged(false);
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
    const {
      initialOptions,
      initialSchema,
      initialValue = "MATCH (n) RETURN n LIMIT 10",
      initialPosition,
      onEditorCreated,
      theme
    } = this.props;
    const { editor } = createCypherEditor(this.editorRef, {
      ...initialOptions,
      theme
    });
    this.cypherEditor = editor;

    if (initialSchema) {
      editor.setSchema(initialSchema);
    }
    this.cypherEditor.setValue(initialValue);
    if (initialPosition) {
      this.cypherEditor.goToPosition(initialPosition);
    }
    this.cypherEditor.on("change", this.valueChanged);
    this.cypherEditor.on("focus", this.focused);
    this.cypherEditor.on("blur", this.blurred);
    this.cypherEditor.on("scroll", this.scrollChanged);
    this.cypherEditor.on("position", this.positionChanged);
    this.cypherEditor.on("autocomplete", this.autocompleteChanged);
    this.cypherEditor.on("lineclick", this.lineNumberClicked);

    onEditorCreated && onEditorCreated(this.cypherEditor);
  }

  componentWillUnmount() {
    if (this.cypherEditor) {
      this.cypherEditor.off("change", this.valueChanged);
      this.cypherEditor.off("focus", this.focused);
      this.cypherEditor.off("blur", this.blurred);
      this.cypherEditor.off("scroll", this.scrollChanged);
      this.cypherEditor.off("position", this.positionChanged);
      this.cypherEditor.off("autocomplete", this.autocompleteChanged);
      this.cypherEditor.off("lineclick", this.lineNumberClicked);

      this.cypherEditor.destroy();
    }
  }

  render() {
    const { classNames } = this.props;
    const editorClassNames = (classNames ? classNames : []).join(" ");

    return <div className={editorClassNames} ref={this.setEditorRef}></div>;
  }
}

export default CypherEditor;
