import React, { Component } from 'react';
import { createCypherEditor } from "cypher-codemirror";
import "cypher-codemirror/css/cypher-codemirror.css";

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

class CypherEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  setEditorRef = ref => {
    this.editorRef = ref;
  }

  triggerAutocompletion = (changes) => {
    let changedText = [];
    changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
      changedText = inserted.text;
    });

    if (changedText.length !== 1) {
      return;
    }

    const text = changedText[0];
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
      this.cypherEditor.showAutoComplete();
    }
  }

  valueChanged = (value, changes) => {
    const { onValueChange } = this.props;
    this.triggerAutocompletion(changes);
    onValueChange && onValueChange(value);
  }

  focusChanged = focused => {
    const { onFocusChange } = this.props;
    this.setState({ focused })
    onFocusChange && onFocusChange(focused);
  }

  focused = () => {
    this.focusChanged(true);
  }

  blurred = () => {
    this.focusChanged(false);
  }

  scrollChanged = scrollInfo => {
    const { onScroll } = this.props;
    onScroll && onScroll(scrollInfo);
  }

  componentDidMount() {
    const { options, autoCompleteSchema, cypher = 'MATCH (n) RETURN n LIMIT 10', initialPosition } = this.props;
    const { editor, editorSupport } = createCypherEditor(
      this.editorRef,
      options
    );
    this.cypherEditor = editor;

    this.cypherEditor.focus();
    this.cypherEditor.setValue(cypher);
    if (initialPosition) {
      this.cypherEditor.goToPosition(initialPosition);
    }
    this.cypherEditor.on('change', this.valueChanged);
    this.cypherEditor.on("focus", this.focused);
    this.cypherEditor.on("blur", this.blurred);
    this.cypherEditor.on("scroll", this.scrollChanged);

    editorSupport.setSchema(autoCompleteSchema);
  }

  componentWillUnmount() {
    if (this.cypherEditor) {
      this.cypherEditor.off('change', this.valueChanged);
      this.cypherEditor.off("focus", this.focused);
      this.cypherEditor.off("blur", this.blurred);
      this.cypherEditor.off("scroll", this.scrollChanged);
      this.cypherEditor.destroy();
    }
  }

  render() {
    const { classNames, theme = THEME_LIGHT } = this.props;
    const editorClassNames = (classNames ? classNames : []).concat(theme !== THEME_DARK ? [] : ['cm-dark']).join(' ');

    return (
      <div className={editorClassNames} ref={this.setEditorRef}></div>
    )
  }
};

export default CypherEditor;