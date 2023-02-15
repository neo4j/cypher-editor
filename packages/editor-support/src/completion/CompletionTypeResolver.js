import * as CompletionTypes from "./CompletionTypes";
import * as rules from "./rules";

// Rules are sorted starting with specific ones, and finishing with more generic ones.
const orderedCompletionRules = [
  rules.ruleNoop,
  rules.ruleVariableInExpressionPossibleFunction,
  rules.ruleLiteralEntry,
  rules.rulePropInMapLiteral,
  rules.ruleParamStartsWithDollar,
  rules.ruleSpecificParent,
  rules.ruleNodePattern,
  rules.ruleRelationshipPattern,
  rules.ruleProcedureOutputsInCallClause,
  rules.ruleCallClauseBeginning,
  rules.ruleConsoleCommandSubcommands,
  rules.rulePropertyLookup,
  rules.rulePossibleKeyword
];

function evaluateRules(element) {
  for (let i = 0; i < orderedCompletionRules.length; i += 1) {
    const rule = orderedCompletionRules[i];
    const types = rule(element);
    if (types.length > 0) {
      return types;
    }
  }

  return [];
}

export class CompletionTypeResolver {
  static getTypes(element) {
    // If element is null, then no types
    if (element == null) {
      return {
        found: false,
        types: CompletionTypes.ALL
      };
    }

    // Retrieve types from rules
    const types = evaluateRules(element);
    if (types.length > 0) {
      return {
        found: true,
        types
      };
    }

    // If no types found, then no types
    return {
      found: false,
      types: CompletionTypes.ALL
    };
  }
}
