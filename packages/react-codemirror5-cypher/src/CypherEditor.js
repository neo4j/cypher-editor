import React, { Component } from "react";
import { createCypherEditor } from "cypher-codemirror5";

import "codemirror/addon/lint/lint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/display/placeholder";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint.css";
import "cypher-codemirror5/css/cypher-codemirror.css";

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

  valueChanged = (doc, change) => {
    const { onValueChanged } = this.props;
    if (onValueChanged && change.origin !== "setValue") {
      onValueChanged(doc.getValue(), change);
    }
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

  autocompleteOpenChanged = (autocompleteOpen) => {
    const { onAutocompleteOpenChanged } = this.props;
    onAutocompleteOpenChanged && onAutocompleteOpenChanged(autocompleteOpen);
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
      theme = THEME_LIGHT,
      onEditorCreated
    } = this.props;

    const defaultOptions = {
      lineNumbers: true,
      mode: "cypher",
      theme: theme,
      gutters: ["cypher-hints"],
      lineWrapping: false,
      autofocus: true,
      smartIndent: false,
      lint: true,
      extraKeys: {
        "Ctrl-Space": "autocomplete"
      },
      hintOptions: {
        completeSingle: false, //
        closeOnUnfocus: false, //
        alignWithWord: true, //
        async: true //
      },
      autoCloseBrackets: {
        explode: ""
      }
    };

    let cypherEditorOptions = { ...defaultOptions, ...(initialOptions || {}) };

    if (cypherEditorOptions.lineNumbers === false) {
      cypherEditorOptions.gutters = false;
    }
    const { editor } = createCypherEditor(this.editorRef, cypherEditorOptions);
    this.cypherEditor = editor;

    if (cypherEditorOptions.autofocus) {
      this.cypherEditor.focus();
    }
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
    this.cypherEditor.on("autocomplete", this.autocompleteOpenChanged);
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
      this.cypherEditor.off("autocomplete", this.autocompleteOpenChanged);
      this.cypherEditor.off("lineclick", this.lineNumberClicked);

      this.cypherEditor.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.cypherEditor.setTheme(this.props.theme);
    }
  }

  render() {
    const { classNames } = this.props;
    const { focused } = this.state;
    const editorClassNames = (classNames || [])
      .concat(["ReactCodeMirror"])
      .concat(focused ? ["ReactCodeMirror--focused"] : [])
      .join(" ");

    return <div className={editorClassNames} ref={this.setEditorRef}></div>;
  }
}

export default CypherEditor;
