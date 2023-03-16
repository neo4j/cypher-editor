import { EditorSelection, SelectionRange } from "@codemirror/state";
import neo4j from "neo4j-driver";
import {
  THEME_LIGHT,
  THEME_DARK,
  THEME_AUTO,
  defaultAutocompleteTriggerStrings,
  defaultLineNumberFormatter,
  defaultOptions as baseDefaultOptions
} from "@neo4j-cypher/codemirror";

export {
  THEME_LIGHT,
  THEME_DARK,
  THEME_AUTO,
  defaultAutocompleteTriggerStrings,
  defaultLineNumberFormatter
};

export { neo4jSchema, simpleSchema } from "./schema-data";
import { simpleSchema } from "./schema-data";

export const sampleQuery = `// line comment
/* block comment */
:play "http://example.com";
:play incommand-dash;
MATCH (variable)
MATCH (:Label)
MATCH ()-[:RelationshipType]-()
WITH $param
WITH {param}
RETURN some.functionNamme()
CALL some.procedureName()
CALL some.procedureName() YIELD param1, param2 as somethingElse
MATCH (variable {propKey: 1})
SET variable.propKey = 1;`;

export const metaQuery = `	CALL db.labels() YIELD label
	RETURN {name:'labels', data:COLLECT(label)[..1000]} AS result
	UNION ALL
	CALL db.relationshipTypes() YIELD relationshipType
	RETURN {name:'relationshipTypes', data:COLLECT(relationshipType)[..1000]} AS result
	UNION ALL
	CALL db.propertyKeys() YIELD propertyKey
	RETURN {name:'propertyKeys', data:COLLECT(propertyKey)[..1000]} AS result
	UNION ALL
	CALL dbms.functions() YIELD name, signature, description
	RETURN {name:'functions', data: collect({name: name, signature: signature, description: description})} AS result
	UNION ALL
	CALL dbms.procedures() YIELD name, signature, description
	RETURN {name:'procedures', data:collect({name: name, signature: signature, description: description})} AS result
	UNION ALL
	MATCH () RETURN { name:'nodes', data:count(*) } AS result
	UNION ALL
	MATCH ()-[]->() RETURN { name:'relationships', data: count(*)} AS result
`;

export const shortMetaQuery = `  CALL db.labels() YIELD label
  RETURN {name:'labels', data:COLLECT(label)[..1000]} AS result
`;

export const simpleQuery = `MATCH (n) RETURN n LIMIT 10`;

export const serverInfoQuery = `CALL dbms.components() YIELD name, versions, edition`;

export const longQuery = metaQuery;

export const host = "neo4j://localhost:7687";

export const user = "neo4j";

export const pass = "asdfgh";

const defaultOptions = {
  ...baseDefaultOptions,

  preExtensions: [],
  postExtensions: []
};

export const noneLineNumberFormatter = (line) => line;
export const customLineNumberFormatter = (line, lineCount) => {
  if (line === 1) {
    return "one";
  } else if (line === 2) {
    return "two";
  } else if (line === 3) {
    return "three";
  } else if (line > 3) {
    return line + " / " + lineCount + " prompt$";
  }
};

export const samplePlaceholder = "Sample Placeholder";

export const defaultTheme = THEME_LIGHT;

// Note: an automated test for the initial autofocus (defaultOptions.autofocus) would be good.
export const initialOptions = {
  ...defaultOptions,
  autocomplete: true, // whether to show autocompletion
  autocompleteCloseOnBlur: false,
  autocompleteOpen: false,
  autocompleteTriggerStrings: defaultAutocompleteTriggerStrings,
  autofocus: true, // if true the editor will be focused once created
  bracketMatching: true,
  closeBrackets: true,
  cursorWide: true,
  cypherLanguage: true,
  history: true,
  indentUnit: "\t",
  lineNumberFormatter: defaultLineNumberFormatter,
  lineNumbers: true, // whether to show the line numbers next to the editor
  lineWrapping: false,
  lint: true, // whether to show lint errors,
  placeholder: undefined, // this text shows when the actual text is empty
  position: { line: 2, column: 3 },
  readOnly: false, // can be one of: true / false / "nocursor"
  readOnlyCursor: false,
  schema: simpleSchema,
  search: true,
  searchMatches: 10,
  searchOpen: false,
  searchText: "",
  searchTop: false,
  selection: undefined,
  tabKey: true,
  theme: defaultTheme,
  tooltipAbsolute: true,
  parseOnSetValue: true,
  value: longQuery
};

export const getTitle = ({ codemirrorVersion, framework, bundler }) =>
  `Cypher Codemirror ${codemirrorVersion} ${framework} ${bundler}`;

const trimOptions = (options) => {
  const typeMap = {};
  for (let { type } of options) {
    if (typeMap[type] === undefined) {
      typeMap[type] = 0;
    }
    typeMap[type]++;
  }
  return typeMap; // options.map(({ type }) => ({ type }));
};

const optionFroms = (options) => {
  const fromMap = {};
  const optionFroms = [];
  if (options) {
    for (let { from } of options) {
      if (fromMap[from] === undefined) {
        fromMap[from] = true;
        optionFroms.push(from);
      }
    }
  }
  return optionFroms;
};

const printArgument = (type, label, argument) => {
  try {
    if (
      type === "event" &&
      label === "autocompleteChanged" &&
      typeof argument === "object" &&
      argument !== null
    ) {
      const { open, options, option } = argument;

      return JSON.stringify({
        open,
        ...(options !== undefined && options !== null
          ? {
              from: optionFroms(options),
              options: trimOptions(options)
            }
          : {}),
        ...(option !== undefined && option !== null
          ? {
              option: {
                type: option.type,
                label: option.label,
                from: option.from
              }
            }
          : {})
      });
    }
    return JSON.stringify(argument);
  } catch (e) {
    return "error " + e.message + " " + argument;
  }
};

export const getLogText = (logs, { eventFilters, commandFilters } = {}) => {
  return (
    eventFilters === undefined && commandFilters === undefined
      ? logs
      : logs.filter(
          ({ type, label }) =>
            (type === "event" &&
              (eventFilters === undefined || eventFilters[label])) ||
            (type === "command" &&
              (commandFilters === undefined || commandFilters[label]))
        )
  )
    .map(
      ({ type, label, argument }) =>
        type + " " + label + " " + printArgument(type, label, argument)
    )
    .join("\n");
};

export const commandLog = (command, argument) => {
  return {
    type: "command",
    label: command,
    command,
    argument
  };
};

export const eventLog = (event, argument) => {
  return {
    type: "event",
    label: event,
    event,
    argument
  };
};

const hasSameKeyValues = (a, b, keys) => {
  if (!a && !b) {
    return true;
  } else if (!a || !b) {
    return false;
  } else {
    for (let key of keys) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
};

export const getChangedScrollInfo = (oldScrollInfo, newScrollInfo) => {
  if (!oldScrollInfo) {
    return newScrollInfo;
  }
  const yChanged = !hasSameKeyValues(oldScrollInfo, newScrollInfo, [
    "scrollTop",
    "clientHeight",
    "scrollHeight"
  ]);
  const xChanged = !hasSameKeyValues(oldScrollInfo, newScrollInfo, [
    "scrollLeft",
    "clientWidth",
    "scrollWidth"
  ]);
  if (xChanged === yChanged) {
    return newScrollInfo;
  } else {
    const {
      scrollTop,
      clientHeight,
      scrollHeight,
      scrollLeft,
      clientWidth,
      scrollWidth
    } = newScrollInfo;
    if (yChanged) {
      return { scrollTop, clientHeight, scrollHeight };
    } else {
      return { scrollLeft, clientWidth, scrollWidth };
    }
  }
};

const rangesGrowing = [
  SelectionRange.fromJSON({
    from: 1,
    to: 2,
    anchor: 1,
    head: 2
  }),
  SelectionRange.fromJSON({
    from: 3,
    to: 5,
    anchor: 3,
    head: 5
  }),
  SelectionRange.fromJSON({
    from: 6,
    to: 9,
    anchor: 6,
    head: 9
  })
];

const rangesZigzag = [
  SelectionRange.fromJSON({
    from: 0,
    to: 2,
    anchor: 0,
    head: 2
  }),
  SelectionRange.fromJSON({
    from: 4,
    to: 6,
    anchor: 6,
    head: 4
  }),
  SelectionRange.fromJSON({
    from: 8,
    to: 10,
    anchor: 8,
    head: 10
  }),
  SelectionRange.fromJSON({
    from: 12,
    to: 14,
    anchor: 14,
    head: 12
  })
];

export const selectionGrowing = EditorSelection.create(rangesGrowing, 2);

export const selectionZigzag = EditorSelection.create(rangesZigzag, 1);

export const eventTypes = [
  "autocompleteChanged",
  "editorCreated",
  "focusChanged",
  "lineNumberClick",
  "keyDown",
  "keyUp",
  "positionChanged",
  "selectionChanged",
  "scrollChanged",
  "valueChanged",
  "searchChanged"
];

export const createEventTypeFilterMap = (initialValue = true) => {
  const filterMap = {};
  for (let eventType of eventTypes) {
    filterMap[eventType] = initialValue;
  }
  return filterMap;
};

export const createDriver = () =>
  neo4j.driver(host, neo4j.auth.basic(user, pass));
