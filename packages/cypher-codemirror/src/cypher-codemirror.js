// All of these packages are dependencies of "codemirror" package version >= 6;
import { autocompletion, completionKeymap, startCompletion } from '@codemirror/autocomplete';
import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { StreamLanguage, indentOnInput, foldKeymap, syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { lintKeymap, linter } from '@codemirror/lint';
import { searchKeymap } from '@codemirror/search';
import { EditorState, StateEffect, StateField } from "@codemirror/state";
import { EditorView, Decoration, lineNumbers, drawSelection, rectangularSelection, crosshairCursor, keymap } from '@codemirror/view';
import { tags } from "@lezer/highlight";

import { CypherEditorSupport, TreeUtils } from 'cypher-editor-support';

import { cypher } from './cypher';

const addTypeMarker = StateEffect.define();
const clearTypeMarkers = StateEffect.define();

const typeMarkerField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(typeMarkers, tr) {
    typeMarkers = typeMarkers.map(tr.changes);
    for (let e of tr.effects) {
      if (e.is(clearTypeMarkers)) {
        typeMarkers = typeMarkers.filter(() => false);
      } else if (e.is(addTypeMarker)) {
        if (e.value.from !== e.value.to) {
          typeMarkers = typeMarkers.update({
            add: [Decoration.mark({class: "cm-p-" + e.value.type }).range(e.value.from, e.value.to)]
          });
        }
      }
    }
    return typeMarkers;
  },
  provide: f => EditorView.decorations.from(f)
});

const typeMarkerTheme = EditorView.baseTheme({
  // ".cm-underline": { textDecoration: "underline 3px red" }
});

export function typeMarkerFromTo(view, options = {}) {
  let effects = [addTypeMarker.of(options)];

  if (!view.state.field(typeMarkerField, false)) {
    effects.push(StateEffect.appendConfig.of([typeMarkerField, typeMarkerTheme]));
  }
  view.dispatch({effects});
  return true;
}

function fixColors(view, editorSupport) {
  view.dispatch(clearTypeMarkers.of());
  if (editorSupport.parseTree == null) {
    return;
  }

  editorSupport.applyHighlighthing((element, type) => {
    const { start: from, stop: to } = TreeUtils.getPosition(element) || { start: 0, stop: 0 };
    typeMarkerFromTo(view, { from, to: to + 1, type });
  });
}

const editorSupportField = StateField.define({
  create() {
    return new CypherEditorSupport();
  },
  update(editorSupport, tr) {
    return editorSupport;
  }
});


function editorSupportInit(view) {
  if (!view.state.field(editorSupportField, false)) {
    const effects = [StateEffect.appendConfig.of([editorSupportField])];
    view.dispatch({effects});
    return true;  
  }
}

export const cypherLinter = ({ delay = 250, showErrors = true, ...otherOptions } = {}) => [linter(view => {
  const editorSupport = getEditorSupport(view.state); // view.editorSupport;
  if (!editorSupport) return [];
  const version = view.newContentVersion();
  editorSupport.update(view.state.doc.toString(), version);
  
  fixColors(view, editorSupport);
  
  return ((showErrors && editorSupport.parseErrors) || [])
    .map(({ msg, start, stop }) => {
      return ({
        severity: 'error',
        from: start,
        to: stop + 1,
        message: msg,
      })
    });
}, { ...otherOptions, delay })];

const getEditorSupport = state => state.field(editorSupportField, false);

const cypherCompletions = context => {
  const editorSupport = getEditorSupport(context.state);
  editorSupport.update(context.state.doc.toString());

  const { line, column } = editorSupport.positionConverter.toRelative(context.pos);
  const completion = editorSupport.getCompletion(line, column, true);
  const { items, from, to } = completion;
  const completions = items.map(({ type, view }) => ({ type, label: view }));
  let word = context.matchBefore(/\w*/);
  // console.log('context.pos: ' + context.pos + ' word: ' + word);
  let cypherCompletions = null;
  if (!(word.from == word.to && !context.explicit)) {
    cypherCompletions = {
      //from: word.from,
      from: context.state.doc.line(from.line).from + from.column,
      options: completions,
      filter: false,
      getMatch: () => []
    };
  }
  return cypherCompletions;
};

export const cypherCompletion = ({ activateOnTyping = false, closeOnBlur = true } = {}) => [autocompletion({activateOnTyping, closeOnBlur, override: [cypherCompletions]})];

const lightSyntaxStyles = [
  { tag: tags.comment, color: '#93a1a1', class: 'cm-comment' },
  { tag: tags.variableName, color: '#0080ff', class: 'cm-variable' },
  { tag: [tags.string, tags.special(tags.brace)], color: '#b58900', class: 'cm-string' },
  { tag: tags.number, color: '#2aa198', class: 'cm-number' },
  { tag: tags.bool, color: '#5c6166' },
  { tag: tags.null, color: '#5c6166' },
  { tag: tags.keyword, color: '#859900', class: 'cm-keyword' },
  { tag: tags.operator, color: '#5c6166', class: 'cm-operator' },
  { tag: tags.className, color: '#5c6166' },
  { tag: tags.definition(tags.typeName), color: '#5c6166' },
  { tag: tags.typeName, color: '#5c6166' },
  { tag: tags.angleBracket, color: '#5c6166' },
  { tag: tags.tagName, color: '#5c6166' },
  { tag: tags.attributeName, color: '#5c6166' },
];

const darkSyntaxStyles = [
  { tag: tags.comment, color: '#586e75', class: 'cm-comment' },
  { tag: tags.variableName, color: '#0080ff', class: 'cm-variable' },
  { tag: [tags.string, tags.special(tags.brace)], color: '#b58900', class: 'cm-string' },
  { tag: tags.number, color: '#2aa198', class: 'cm-number' },
  { tag: tags.bool, color: '#5c6166' },
  { tag: tags.null, color: '#5c6166' },
  { tag: tags.keyword, color: '#859900', class: 'cm-keyword' },
  { tag: tags.operator, color: '#5c6166', class: 'cm-operator' },
  { tag: tags.className, color: '#5c6166' },
  { tag: tags.definition(tags.typeName), color: '#5c6166' },
  { tag: tags.typeName, color: '#5c6166' },
  { tag: tags.angleBracket, color: '#5c6166' },
  { tag: tags.tagName, color: '#5c6166' },
  { tag: tags.attributeName, color: '#5c6166' },
];

const lightSyntaxStyle = HighlightStyle.define(lightSyntaxStyles);
const lightTheme = [syntaxHighlighting(lightSyntaxStyle)];

const darkSyntaxStyle = HighlightStyle.define(darkSyntaxStyles);
const darkTheme = [syntaxHighlighting(darkSyntaxStyle)];

const formatNumber = (number, state) => {
  return state.doc.lines > 1 ? number : '$';
}

export const cypherLineNumbers = () => [lineNumbers({ formatNumber })];

export const cypherLanguage = () => [StreamLanguage.define(cypher)];

const VALUE_KEY = 'change';
const FOCUS_KEY = 'focus';
const BLUR_KEY = 'blur';
const SCROLL_KEY = 'scroll';

export const getExtensions = () => {
  return [
    cypherLanguage(),
    cypherLinter(),
    cypherLineNumbers(),
    history(),
    drawSelection(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    cypherCompletion(),
    rectangularSelection(),
    crosshairCursor(),
    keymap.of([
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
      ...completionKeymap,
      ...lintKeymap
    ])
  ];
};

export function createCypherEditor(parentDOMElement, { text = '', extensions } = {}) {
  
  let theme = 'light'; // TODO pass this in via options, and make it a compartment toggle thing in cm 6.

  const eventListenerTypeMap = {};

  const onValueChanged = (value, changes) => {
    if (eventListenerTypeMap[VALUE_KEY] !== undefined) {
      eventListenerTypeMap[VALUE_KEY].forEach(listener => {
        listener(value, changes);
      })
    }
  };

  const onFocusChanged = (focused) => {
    const key = focused ? FOCUS_KEY : BLUR_KEY;
    if (eventListenerTypeMap[key] !== undefined) {
      eventListenerTypeMap[key].forEach(listener => {
        listener(focused);
      })
    }
  };

  const onScrollChanged = (editor) => {
    const scrollRect = editor.scrollDOM.getBoundingClientRect();
    const contentRect = editor.contentDOM.getBoundingClientRect();
    if (eventListenerTypeMap[SCROLL_KEY] !== undefined) {
      eventListenerTypeMap[SCROLL_KEY].forEach(listener => {
        listener({ scrollRect, contentRect });
      })
    }
  };

  let settingValue = false;

  const updateListener = EditorView.updateListener.of((v) => {
    if (v.docChanged && !settingValue) {
      onValueChanged(v.state.doc.toString(), v.changes);
    }
  });

  extensions = [
    ...(extensions ? extensions : [...getExtensions(), theme === 'light' ? lightTheme : darkTheme]),
    updateListener
  ];

  const initialState = EditorState.create({
    doc: text,
    extensions: extensions
  });

  let editor = new EditorView({
    parent: parentDOMElement,
    state: initialState
  });

  const setValue = (value) => {
    settingValue = true;
    const update = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: value}});
    editor.update([update]);
    settingValue = false;
  };

  const goToPosition = (position, scrollIntoView = true) => {
    if (typeof position === 'object' && position) {
      const { line, column } = position;
      position = editor.state.doc.line(line).from + column;
    }
    editor.dispatch(editor.state.update({ scrollIntoView, selection: { anchor: position } }));
  };
  
  editor.version = 1;
  editor.newContentVersion = function newContentVersion() {
    this.version += 1;
    return this.version;
  };
  editor.newContentVersion.bind(editor);
  editorSupportInit(editor);

  editor.contentDOM.focus();

  editor.contentDOM.addEventListener('blur', () => {
    onFocusChanged(false);
  });

  editor.contentDOM.addEventListener('focus', () => {
    onFocusChanged(true);
  });

  editor.scrollDOM.addEventListener('scroll', () => {
    onScrollChanged(editor);
  });

  const on = (type, listener) => {
    if (eventListenerTypeMap[type] === undefined) {
      eventListenerTypeMap[type] = [];
    }
    eventListenerTypeMap[type].push(listener);
  };

  const off = (type, listener) => {
    if (eventListenerTypeMap[type] !== undefined) {
      const listeners = eventListenerTypeMap[type];
      const index = listeners.findIndex(l => l === listener);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
      if (eventListenerTypeMap[type].length === 0) {
        delete eventListenerTypeMap[type];
      }
    }
  };

  const showAutoComplete = () => {
    startCompletion(editor);
  };

  // const setDarkTheme = () => {
  //   if (theme !== 'dark') {
  //     theme = 'dark';
  //     editor.dispatch({
  //       reconfigure: {
  //         full: getExtensions(theme)
  //       }
  //     });
  //   }
  // };

  // const setLightTheme = () => {
  //   if (theme !== 'light') {
  //     theme = 'light';
  //     editor.dispatch({
  //       reconfigure: {
  //         full: getExtensions(theme)
  //       }
  //     });
  //   }
  // };

  editor.goToPosition = goToPosition;
  editor.setValue = setValue;
  editor.on = on;
  editor.off = off;
  editor.showAutoComplete = showAutoComplete;
  // editor.setDarkTheme = setDarkTheme;
  // editor.setLightTheme = setLightTheme;

  const editorSupport = getEditorSupport(editor.state);

  return {
    editor, editorSupport
  };
}
