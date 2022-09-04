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

const THEME_LIGHT = "cypher";
const THEME_DARK = "cypher cypher-dark";

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

  triggerAutocompletion = (changed) => {
    if (changed.text.length !== 1) {
      return;
    }

    const text = changed.text[0];
    const shouldTriggerAutocompletion =
      text === "." ||
      text === ":" ||
      text === "[]" ||
      text === "()" ||
      text === "{}" ||
      text === "[" ||
      text === "(" ||
      text === "{" ||
      text === "$";
    if (shouldTriggerAutocompletion) {
      cypherEditor.execCommand("autocomplete");
    }
  };

  valueChanged = (doc, change) => {
    const { onValueChange } = this.props;
    if (onValueChange && change.origin !== "setValue") {
      onValueChange(doc.getValue(), change);
    }
    this.triggerAutocompletion(change);
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

  scrollChanged = (cm) => {
    const { onScroll } = this.props;
    onScroll && onScroll(cm.getScrollInfo());
  };

  goToPosition = (position) => {
    for (let i = 0; i < position.line; i++) {
      this.cypherEditor.execCommand("goLineDown");
    }

    for (let i = 0; i <= position.column; i++) {
      this.cypherEditor.execCommand("goCharRight");
    }
  };

  componentDidMount() {
    const {
      options,
      autoCompleteSchema,
      cypher = "MATCH (n) RETURN n LIMIT 10",
      initialPosition,
      theme = THEME_LIGHT
    } = this.props;

    let lineNumberFormatter;

    const defaultOptions = {
      lineNumbers: true,
      mode: "cypher",
      theme: theme,
      gutters: ["cypher-hints"],
      lineWrapping: true,
      autofocus: true,
      smartIndent: false,
      lineNumberFormatter: (line) =>
        lineNumberFormatter ? lineNumberFormatter(line) : line,
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

    let cypherEditorOptions = { ...defaultOptions, ...(options || {}) };

    const { editor, editorSupport } = createCypherEditor(
      this.editorRef,
      cypherEditorOptions
    );
    this.cypherEditor = editor;
    lineNumberFormatter = (line) => {
      if (!this.cypherEditor || this.cypherEditor.lineCount() === 1) {
        return "$";
      } else {
        return line;
      }
    };

    this.cypherEditor.focus();
    this.cypherEditor.setValue(cypher);
    if (initialPosition) {
      this.goToPosition(initialPosition);
    }
    this.cypherEditor.on("change", this.valueChanged);
    this.cypherEditor.on("focus", this.focused);
    this.cypherEditor.on("blur", this.blurred);
    this.cypherEditor.on("scroll", this.scrollChanged);

    editorSupport.setSchema(autoCompleteSchema);
  }

  componentWillUnmount() {
    if (this.cypherEditor) {
      this.cypherEditor.off("change", this.valueChanged);
      this.cypherEditor.off("focus", this.focused);
      this.cypherEditor.off("blur", this.blurred);
      this.cypherEditor.off("scroll", this.scrollChanged);
      this.cypherEditor.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.cypherEditor.setOption("theme", this.props.theme);
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
