import React, { Component } from "react";
import { createCypherEditor } from "cypher-codemirror";
import "cypher-codemirror/css/cypher-codemirror.css";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

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
    const { onValueChange } = this.props;
    onValueChange && onValueChange(value);
  };

  focusChanged = (focused) => {
    const { onFocusChange } = this.props;
    this.setState({ focused });
    onFocusChange && onFocusChange(focused);
  };

  focused = () => {
    this.focusChanged(true);
  };

  blurred = () => {
    this.focusChanged(false);
  };

  scrollChanged = (scrollInfo) => {
    const { onScroll } = this.props;
    onScroll && onScroll(scrollInfo);
  };

  positionChanged = (positionObject) => {
    const { onPositionChange } = this.props;
    onPositionChange && onPositionChange(positionObject);
  };

  autocompleteChanged = (autocompleteOpen) => {
    const { onAutocompleteOpenChange } = this.props;
    onAutocompleteOpenChange && onAutocompleteOpenChange(autocompleteOpen);
  };

  componentDidMount() {
    const {
      initialOptions,
      initialSchema,
      initialValue = "MATCH (n) RETURN n LIMIT 10",
      initialPosition,
      onEditorCreate
    } = this.props;
    const { autofocus = true, ...options } = initialOptions || {};
    const { editor, editorSupport } = createCypherEditor(
      this.editorRef,
      options
    );
    this.cypherEditor = editor;

    if (autofocus) {
      this.cypherEditor.focus();
    }
    if (initialSchema) {
      editorSupport.setSchema(initialSchema);
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

    onEditorCreate && onEditorCreate(this.cypherEditor);
  }

  componentWillUnmount() {
    if (this.cypherEditor) {
      this.cypherEditor.off("change", this.valueChanged);
      this.cypherEditor.off("focus", this.focused);
      this.cypherEditor.off("blur", this.blurred);
      this.cypherEditor.off("scroll", this.scrollChanged);
      this.cypherEditor.off("position", this.positionChanged);
      this.cypherEditor.destroy();
    }
  }

  render() {
    const { classNames, theme = THEME_LIGHT } = this.props;
    const editorClassNames = (classNames ? classNames : [])
      .concat(theme !== THEME_DARK ? [] : ["cm-dark"])
      .join(" ");

    return <div className={editorClassNames} ref={this.setEditorRef}></div>;
  }
}

export default CypherEditor;
