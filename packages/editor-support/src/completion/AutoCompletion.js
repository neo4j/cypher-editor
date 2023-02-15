import Fuse from "fuse.js";
import _find from "lodash.find";
import * as CypherTypes from "../lang/CypherTypes";
import * as CompletionTypes from "./CompletionTypes";
import CypherKeywords from "../lang/CypherKeywords";
import { TreeUtils } from "../util/TreeUtils";
import { ecsapeCypher } from "../util/ecsapeCypher";

export const KEYWORD_ITEMS = CypherKeywords.map((keyword) => ({
  type: CompletionTypes.KEYWORD,
  view: keyword,
  content: keyword,
  postfix: null
}));

const fuzzySearch = (list, text, key) => {
  const fuse = new Fuse(list, { keys: [key] });
  return fuse.search(text).map(({ item }) => item);
};

class AbstractCachingCompletion {
  cache = {};

  constructor(cache = {}) {
    this.cache = cache;
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  calculateItems(type, query = null) {
    return [];
  }

  complete(types, query) {
    return types
      .map((typeData) => {
        const cached = this.cache[typeData.type];
        if (cached != null) {
          return cached;
        }
        return this.calculateItems(typeData, query);
      })
      .reduce((acc, items) => [...acc, ...items], []);
  }
}

class SchemaBasedCompletion extends AbstractCachingCompletion {
  schema = {};

  static providers = {
    [CompletionTypes.PROCEDURE_OUTPUT]: (schema, typeData) => {
      const findByName = (e) =>
        e.name === typeData.name && e.returnItems !== [];
      const procedure = _find(schema.procedures, findByName);
      if (procedure) {
        return procedure.returnItems.map(({ name, signature }) => ({
          type: CompletionTypes.PROCEDURE_OUTPUT,
          view: name,
          content: name,
          postfix: ` :: ${signature}`
        }));
      }
      return [];
    },
    [CompletionTypes.CONSOLE_COMMAND_SUBCOMMAND]: (schema, typeData) => {
      const { filterLastElement, path } = typeData;

      const length = filterLastElement ? path.length - 1 : path.length;
      let currentLevel = schema.consoleCommands;
      for (let i = 0; i < length; i += 1) {
        const foundCommand = _find(currentLevel, ["name", path[i]]);
        if (foundCommand) {
          currentLevel = foundCommand.commands || [];
        } else {
          return [];
        }
      }

      return currentLevel.map(({ name, description }) => ({
        type: CompletionTypes.CONSOLE_COMMAND_SUBCOMMAND,
        view: name,
        content: name,
        postfix: description || null
      }));
    }
  };

  constructor(schema = {}) {
    super({
      [CompletionTypes.KEYWORD]: KEYWORD_ITEMS,
      [CompletionTypes.LABEL]: (schema.labels || []).map((label) => ({
        type: CompletionTypes.LABEL,
        view: label,
        content: ecsapeCypher(label),
        postfix: null
      })),
      [CompletionTypes.RELATIONSHIP_TYPE]: (schema.relationshipTypes || []).map(
        (relType) => ({
          type: CompletionTypes.RELATIONSHIP_TYPE,
          view: relType,
          content: ecsapeCypher(relType),
          postfix: null
        })
      ),
      [CompletionTypes.PROPERTY_KEY]: (schema.propertyKeys || []).map(
        (propKey) => ({
          type: CompletionTypes.PROPERTY_KEY,
          view: propKey,
          content: ecsapeCypher(propKey),
          postfix: null
        })
      ),
      [CompletionTypes.FUNCTION_NAME]: (schema.functions || []).map(
        ({ name, signature }) => ({
          type: CompletionTypes.FUNCTION_NAME,
          view: name,
          content: ecsapeCypher(name),
          postfix: signature
        })
      ),
      [CompletionTypes.PROCEDURE_NAME]: (schema.procedures || []).map(
        ({ name, signature }) => ({
          type: CompletionTypes.PROCEDURE_NAME,
          view: name,
          content: name,
          postfix: signature
        })
      ),
      [CompletionTypes.CONSOLE_COMMAND_NAME]: (
        schema.consoleCommands || []
      ).map((consoleCommandName) => ({
        type: CompletionTypes.CONSOLE_COMMAND_NAME,
        view: consoleCommandName.name,
        content: consoleCommandName.name,
        postfix: consoleCommandName.description || null
      })),
      [CompletionTypes.PARAMETER]: (schema.parameters || []).map(
        (parameter) => ({
          type: CompletionTypes.PARAMETER,
          view: parameter,
          content: parameter,
          postfix: null
        })
      )
    });
    this.schema = schema;
  }

  calculateItems(typeData) {
    return (SchemaBasedCompletion.providers[typeData.type] || (() => []))(
      this.schema,
      typeData
    );
  }
}

class QueryBasedCompletion extends AbstractCachingCompletion {
  providers = {};
  emptyProvider = { getNames: () => [] };

  constructor(referenceProviders = {}) {
    super();
    this.providers = {
      [CompletionTypes.VARIABLE]: (query) =>
        (
          referenceProviders.get(CypherTypes.VARIABLE_CONTEXT) ||
          this.emptyProvider
        )
          .getNames(query)
          .map((name) => ({
            type: CompletionTypes.VARIABLE,
            view: name,
            content: name,
            postfix: null
          }))
    };
  }

  calculateItems(typeData, query) {
    return (this.providers[typeData.type] || (() => []))(query);
  }
}

export class AutoCompletion {
  queryBased = null;
  schemaBased = null;

  constructor() {
    this.updateSchema({});
  }

  getItems(types, { query = null, filter = "" }) {
    const text = filter.toLowerCase();
    const filteredText = AutoCompletion.filterText(text);

    const completionItemFilter = () => true;

    const list = [this.queryBased, this.schemaBased]
      .filter((s) => s != null)
      .map((t) => t.complete(types, query))
      .reduce((acc, items) => [...acc, ...items], [])
      .filter(completionItemFilter);

    if (filteredText) {
      return fuzzySearch(list, filteredText, "view");
    }
    if (text) {
      return fuzzySearch(list, text, "view");
    }
    return list;
  }

  updateSchema(schema) {
    this.schemaBased = new SchemaBasedCompletion(schema);
  }

  updateReferenceProviders(referenceProviders) {
    this.queryBased = new QueryBasedCompletion(referenceProviders);
  }

  /**
   * Define whether element should be replaced or not.
   */
  static shouldBeReplaced(element) {
    if (element == null) {
      return false;
    }

    const text = element.getText();
    const parent = element.parentCtx;

    // If element is whitespace
    if (/^\s+$/.test(text)) {
      return false;
    }
    // If element is opening bracket (e.g. start of relationship pattern)
    if (text === "[") {
      return false;
    }
    // If element is opening brace (e.g. start of node pattern)
    if (text === "(") {
      return false;
    }

    if (text === ".") {
      return false;
    }

    if (text === "{") {
      return false;
    }
    if (text === "$") {
      return false;
    }
    if (
      text === ":" &&
      parent != null &&
      parent instanceof CypherTypes.MAP_LITERAL_ENTRY
    ) {
      return false;
    }

    return true;
  }

  static filterText(text) {
    if (text.startsWith("$")) {
      return text.slice(1);
    }
    return text;
  }

  // eslint-disable-next-line no-unused-vars
  static calculateSmartReplaceRange(element, start, stop) {
    // If we are in relationship type or label and we have error nodes in there.
    // This means that we typed in just ':' and Antlr consumed other tokens in element
    // In this case replace only ':'
    if (
      element instanceof CypherTypes.RELATIONSHIP_TYPE_CONTEXT ||
      element instanceof CypherTypes.NODE_LABEL_CONTEXT
    ) {
      if (TreeUtils.hasErrorNode(element)) {
        return { filterText: ":", start, stop: start };
      }
    }

    return null;
  }
}
