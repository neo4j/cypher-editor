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
const INNER_THEME_LIGHT = "cypher";
const INNER_THEME_DARK = "cypher cypher-dark";
const THEME_MAP = {
  [THEME_LIGHT]: INNER_THEME_LIGHT,
  [THEME_DARK]: INNER_THEME_DARK
};

class CypherEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      innerTheme: THEME_MAP[props.theme]
    };
  }

  setEditorRef = (ref) => {
    this.editorRef = ref;
  };

  valueChanged = (doc, change) => {
    const { onValueChange } = this.props;
    if (onValueChange && change.origin !== "setValue") {
      onValueChange(doc.getValue(), change);
    }
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

  lineClicked = (line, event) => {
    const { onLineClick } = this.props;
    onLineClick && onLineClick(line, event);
  };

  componentDidMount() {
    const {
      initialOptions,
      initialSchema,
      initialValue = "MATCH (n) RETURN n LIMIT 10",
      initialPosition,
      theme = THEME_LIGHT,
      onEditorCreate
    } = this.props;

    let innerTheme = THEME_MAP[theme];

    const defaultOptions = {
      lineNumbers: true,
      mode: "cypher",
      theme: innerTheme,
      gutters: ["cypher-hints"],
      lineWrapping: true,
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
    const { editor, editorSupport } = createCypherEditor(
      this.editorRef,
      cypherEditorOptions
    );
    this.cypherEditor = editor;

    if (cypherEditorOptions.autofocus) {
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
    this.cypherEditor.on("lineclick", this.lineClicked);

    onEditorCreate && onEditorCreate(this.cypherEditor);
  }

  componentWillUnmount() {
    if (this.cypherEditor) {
      this.cypherEditor.off("change", this.valueChanged);
      this.cypherEditor.off("focus", this.focused);
      this.cypherEditor.off("blur", this.blurred);
      this.cypherEditor.off("scroll", this.scrollChanged);
      this.cypherEditor.off("position", this.positionChanged);
      this.cypherEditor.off("autocomplete", this.autocompleteChanged);
      this.cypherEditor.off("lineclick", this.lineClicked);

      this.cypherEditor.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      const innerTheme = THEME_MAP[this.props.theme];
      this.setState({ innerTheme });
      this.cypherEditor.setOption("theme", innerTheme);
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
