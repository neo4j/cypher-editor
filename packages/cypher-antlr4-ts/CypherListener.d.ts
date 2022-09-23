import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { CypherContext } from "./CypherParser";
import { CypherPartContext } from "./CypherParser";
import { CypherConsoleCommandContext } from "./CypherParser";
import { CypherConsoleCommandNameContext } from "./CypherParser";
import { CypherConsoleCommandParametersContext } from "./CypherParser";
import { CypherConsoleCommandParameterContext } from "./CypherParser";
import { ArrowExpressionContext } from "./CypherParser";
import { UrlContext } from "./CypherParser";
import { UriContext } from "./CypherParser";
import { SchemeContext } from "./CypherParser";
import { HostContext } from "./CypherParser";
import { HostnameContext } from "./CypherParser";
import { HostnumberContext } from "./CypherParser";
import { PortContext } from "./CypherParser";
import { PathContext } from "./CypherParser";
import { UserContext } from "./CypherParser";
import { LoginContext } from "./CypherParser";
import { PasswordContext } from "./CypherParser";
import { FragContext } from "./CypherParser";
import { UrlQueryContext } from "./CypherParser";
import { SearchContext } from "./CypherParser";
import { SearchparameterContext } from "./CypherParser";
import { StringContext } from "./CypherParser";
import { UrlDigitsContext } from "./CypherParser";
import { JsonContext } from "./CypherParser";
import { ObjContext } from "./CypherParser";
import { PairContext } from "./CypherParser";
import { ArrayContext } from "./CypherParser";
import { ValueContext } from "./CypherParser";
import { KeyValueLiteralContext } from "./CypherParser";
import { CommandPathContext } from "./CypherParser";
import { SubCommandContext } from "./CypherParser";
import { CypherQueryContext } from "./CypherParser";
import { QueryOptionsContext } from "./CypherParser";
import { AnyCypherOptionContext } from "./CypherParser";
import { CypherOptionContext } from "./CypherParser";
import { VersionNumberContext } from "./CypherParser";
import { ExplainContext } from "./CypherParser";
import { ProfileContext } from "./CypherParser";
import { ConfigurationOptionContext } from "./CypherParser";
import { StatementContext } from "./CypherParser";
import { QueryContext } from "./CypherParser";
import { RegularQueryContext } from "./CypherParser";
import { BulkImportQueryContext } from "./CypherParser";
import { SingleQueryContext } from "./CypherParser";
import { PeriodicCommitHintContext } from "./CypherParser";
import { LoadCSVQueryContext } from "./CypherParser";
import { UnionContext } from "./CypherParser";
import { ClauseContext } from "./CypherParser";
import { CommandContext } from "./CypherParser";
import { SystemCommandContext } from "./CypherParser";
import { MultidatabaseCommandContext } from "./CypherParser";
import { UserCommandContext } from "./CypherParser";
import { PrivilegeCommandContext } from "./CypherParser";
import { ShowRolesContext } from "./CypherParser";
import { CreateRoleContext } from "./CypherParser";
import { CopyRoleContext } from "./CypherParser";
import { DropRoleContext } from "./CypherParser";
import { ShowUsersContext } from "./CypherParser";
import { CreateUserContext } from "./CypherParser";
import { DropUserContext } from "./CypherParser";
import { AlterUserContext } from "./CypherParser";
import { ShowPrivilegesContext } from "./CypherParser";
import { GrantPrivilegeContext } from "./CypherParser";
import { DenyPrivilegeContext } from "./CypherParser";
import { RevokePrivilegeContext } from "./CypherParser";
import { RevokePartContext } from "./CypherParser";
import { DatabaseScopeContext } from "./CypherParser";
import { GraphScopeContext } from "./CypherParser";
import { RolesContext } from "./CypherParser";
import { GrantableGraphPrivilegesContext } from "./CypherParser";
import { RevokeableGraphPrivilegesContext } from "./CypherParser";
import { DatasbasePrivilegeContext } from "./CypherParser";
import { DbmsPrivilegeContext } from "./CypherParser";
import { ElementScopeContext } from "./CypherParser";
import { PropertiesListContext } from "./CypherParser";
import { PropertyScopeContext } from "./CypherParser";
import { ShowDatabaseContext } from "./CypherParser";
import { CreateDatabaseContext } from "./CypherParser";
import { DropDatabaseContext } from "./CypherParser";
import { StartDatabaseContext } from "./CypherParser";
import { StopDatabaseContext } from "./CypherParser";
import { IfNotExistsContext } from "./CypherParser";
import { IfExistsContext } from "./CypherParser";
import { OrReplaceContext } from "./CypherParser";
import { SetPasswordContext } from "./CypherParser";
import { PasswordStatusContext } from "./CypherParser";
import { SetStatusContext } from "./CypherParser";
import { UserStatusContext } from "./CypherParser";
import { CreateUniqueConstraintContext } from "./CypherParser";
import { CreateNodeKeyConstraintContext } from "./CypherParser";
import { CreateNodePropertyExistenceConstraintContext } from "./CypherParser";
import { CreateRelationshipPropertyExistenceConstraintContext } from "./CypherParser";
import { CreateIndexContext } from "./CypherParser";
import { DropUniqueConstraintContext } from "./CypherParser";
import { DropNodeKeyConstraintContext } from "./CypherParser";
import { DropNodePropertyExistenceConstraintContext } from "./CypherParser";
import { DropRelationshipPropertyExistenceConstraintContext } from "./CypherParser";
import { DropIndexContext } from "./CypherParser";
import { IndexContext } from "./CypherParser";
import { UniqueConstraintContext } from "./CypherParser";
import { NodeKeyConstraintContext } from "./CypherParser";
import { NodePropertyExistenceConstraintContext } from "./CypherParser";
import { RelationshipPropertyExistenceConstraintContext } from "./CypherParser";
import { RelationshipPatternSyntaxContext } from "./CypherParser";
import { LoadCSVClauseContext } from "./CypherParser";
import { MatchClauseContext } from "./CypherParser";
import { UnwindClauseContext } from "./CypherParser";
import { MergeClauseContext } from "./CypherParser";
import { MergeActionContext } from "./CypherParser";
import { CreateClauseContext } from "./CypherParser";
import { CreateUniqueClauseContext } from "./CypherParser";
import { SetClauseContext } from "./CypherParser";
import { SetItemContext } from "./CypherParser";
import { DeleteClauseContext } from "./CypherParser";
import { RemoveClauseContext } from "./CypherParser";
import { RemoveItemContext } from "./CypherParser";
import { ForeachClauseContext } from "./CypherParser";
import { WithClauseContext } from "./CypherParser";
import { ReturnClauseContext } from "./CypherParser";
import { ReturnBodyContext } from "./CypherParser";
import { FuncContext } from "./CypherParser";
import { ReturnItemsContext } from "./CypherParser";
import { ReturnItemContext } from "./CypherParser";
import { CallContext } from "./CypherParser";
import { ProcedureInvocationContext } from "./CypherParser";
import { ProcedureInvocationBodyContext } from "./CypherParser";
import { ProcedureArgumentsContext } from "./CypherParser";
import { ProcedureResultsContext } from "./CypherParser";
import { ProcedureResultContext } from "./CypherParser";
import { AliasedProcedureResultContext } from "./CypherParser";
import { SimpleProcedureResultContext } from "./CypherParser";
import { ProcedureOutputContext } from "./CypherParser";
import { OrderContext } from "./CypherParser";
import { SkipContext } from "./CypherParser";
import { LimitContext } from "./CypherParser";
import { SortItemContext } from "./CypherParser";
import { HintContext } from "./CypherParser";
import { StartClauseContext } from "./CypherParser";
import { StartPointContext } from "./CypherParser";
import { LookupContext } from "./CypherParser";
import { NodeLookupContext } from "./CypherParser";
import { RelationshipLookupContext } from "./CypherParser";
import { IdentifiedIndexLookupContext } from "./CypherParser";
import { IndexQueryContext } from "./CypherParser";
import { IdLookupContext } from "./CypherParser";
import { LiteralIdsContext } from "./CypherParser";
import { WhereContext } from "./CypherParser";
import { PatternContext } from "./CypherParser";
import { PatternPartContext } from "./CypherParser";
import { AnonymousPatternPartContext } from "./CypherParser";
import { PatternElementContext } from "./CypherParser";
import { NodePatternContext } from "./CypherParser";
import { PatternElementChainContext } from "./CypherParser";
import { RelationshipPatternContext } from "./CypherParser";
import { RelationshipPatternStartContext } from "./CypherParser";
import { RelationshipPatternEndContext } from "./CypherParser";
import { RelationshipDetailContext } from "./CypherParser";
import { PropertiesContext } from "./CypherParser";
import { RelTypeContext } from "./CypherParser";
import { RelationshipTypesContext } from "./CypherParser";
import { RelationshipTypeContext } from "./CypherParser";
import { RelationshipTypeOptionalColonContext } from "./CypherParser";
import { NodeLabelsContext } from "./CypherParser";
import { NodeLabelContext } from "./CypherParser";
import { RangeLiteralContext } from "./CypherParser";
import { LabelNameContext } from "./CypherParser";
import { RelTypeNameContext } from "./CypherParser";
import { ExpressionContext } from "./CypherParser";
import { OrExpressionContext } from "./CypherParser";
import { XorExpressionContext } from "./CypherParser";
import { AndExpressionContext } from "./CypherParser";
import { NotExpressionContext } from "./CypherParser";
import { ComparisonExpressionContext } from "./CypherParser";
import { AddOrSubtractExpressionContext } from "./CypherParser";
import { MultiplyDivideModuloExpressionContext } from "./CypherParser";
import { PowerOfExpressionContext } from "./CypherParser";
import { UnaryAddOrSubtractExpressionContext } from "./CypherParser";
import { StringListNullOperatorExpressionContext } from "./CypherParser";
import { PropertyOrLabelsExpressionContext } from "./CypherParser";
import { FilterFunctionContext } from "./CypherParser";
import { FilterFunctionNameContext } from "./CypherParser";
import { ExistsFunctionContext } from "./CypherParser";
import { ExistsFunctionNameContext } from "./CypherParser";
import { AllFunctionContext } from "./CypherParser";
import { AllFunctionNameContext } from "./CypherParser";
import { AnyFunctionContext } from "./CypherParser";
import { AnyFunctionNameContext } from "./CypherParser";
import { NoneFunctionContext } from "./CypherParser";
import { NoneFunctionNameContext } from "./CypherParser";
import { SingleFunctionContext } from "./CypherParser";
import { SingleFunctionNameContext } from "./CypherParser";
import { ExtractFunctionContext } from "./CypherParser";
import { ExtractFunctionNameContext } from "./CypherParser";
import { ReduceFunctionContext } from "./CypherParser";
import { ReduceFunctionNameContext } from "./CypherParser";
import { ShortestPathPatternFunctionContext } from "./CypherParser";
import { ShortestPathFunctionNameContext } from "./CypherParser";
import { AllShortestPathFunctionNameContext } from "./CypherParser";
import { AtomContext } from "./CypherParser";
import { LiteralContext } from "./CypherParser";
import { StringLiteralContext } from "./CypherParser";
import { BooleanLiteralContext } from "./CypherParser";
import { ListLiteralContext } from "./CypherParser";
import { PartialComparisonExpressionContext } from "./CypherParser";
import { ParenthesizedExpressionContext } from "./CypherParser";
import { RelationshipsPatternContext } from "./CypherParser";
import { FilterExpressionContext } from "./CypherParser";
import { IdInCollContext } from "./CypherParser";
import { FunctionInvocationContext } from "./CypherParser";
import { FunctionInvocationBodyContext } from "./CypherParser";
import { FunctionNameContext } from "./CypherParser";
import { ProcedureNameContext } from "./CypherParser";
import { ListComprehensionContext } from "./CypherParser";
import { PatternComprehensionContext } from "./CypherParser";
import { PropertyLookupContext } from "./CypherParser";
import { CaseExpressionContext } from "./CypherParser";
import { CaseAlternativesContext } from "./CypherParser";
import { VariableContext } from "./CypherParser";
import { NumberLiteralContext } from "./CypherParser";
import { MapLiteralContext } from "./CypherParser";
import { MapProjectionContext } from "./CypherParser";
import { MapProjectionVariantsContext } from "./CypherParser";
import { LiteralEntryContext } from "./CypherParser";
import { PropertySelectorContext } from "./CypherParser";
import { VariableSelectorContext } from "./CypherParser";
import { AllPropertiesSelectorContext } from "./CypherParser";
import { ParameterContext } from "./CypherParser";
import { LegacyParameterContext } from "./CypherParser";
import { NewParameterContext } from "./CypherParser";
import { ParameterNameContext } from "./CypherParser";
import { PropertyExpressionsContext } from "./CypherParser";
import { PropertyExpressionContext } from "./CypherParser";
import { PropertyKeysContext } from "./CypherParser";
import { PropertyKeyNameContext } from "./CypherParser";
import { IntegerLiteralContext } from "./CypherParser";
import { DoubleLiteralContext } from "./CypherParser";
import { NamespaceContext } from "./CypherParser";
import { LeftArrowHeadContext } from "./CypherParser";
import { RightArrowHeadContext } from "./CypherParser";
import { DashContext } from "./CypherParser";
import { SymbolicNameContext } from "./CypherParser";
import { KeywordContext } from "./CypherParser";
/**
 * This interface defines a complete listener for a parse tree produced by
 * `CypherParser`.
 */
export interface CypherListener extends ParseTreeListener {
    /**
     * Enter a parse tree produced by `CypherParser.cypher`.
     * @param ctx the parse tree
     */
    enterCypher?: (ctx: CypherContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.cypher`.
     * @param ctx the parse tree
     */
    exitCypher?: (ctx: CypherContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.cypherPart`.
     * @param ctx the parse tree
     */
    enterCypherPart?: (ctx: CypherPartContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.cypherPart`.
     * @param ctx the parse tree
     */
    exitCypherPart?: (ctx: CypherPartContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.cypherConsoleCommand`.
     * @param ctx the parse tree
     */
    enterCypherConsoleCommand?: (ctx: CypherConsoleCommandContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.cypherConsoleCommand`.
     * @param ctx the parse tree
     */
    exitCypherConsoleCommand?: (ctx: CypherConsoleCommandContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.cypherConsoleCommandName`.
     * @param ctx the parse tree
     */
    enterCypherConsoleCommandName?: (ctx: CypherConsoleCommandNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.cypherConsoleCommandName`.
     * @param ctx the parse tree
     */
    exitCypherConsoleCommandName?: (ctx: CypherConsoleCommandNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.cypherConsoleCommandParameters`.
     * @param ctx the parse tree
     */
    enterCypherConsoleCommandParameters?: (ctx: CypherConsoleCommandParametersContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.cypherConsoleCommandParameters`.
     * @param ctx the parse tree
     */
    exitCypherConsoleCommandParameters?: (ctx: CypherConsoleCommandParametersContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.cypherConsoleCommandParameter`.
     * @param ctx the parse tree
     */
    enterCypherConsoleCommandParameter?: (ctx: CypherConsoleCommandParameterContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.cypherConsoleCommandParameter`.
     * @param ctx the parse tree
     */
    exitCypherConsoleCommandParameter?: (ctx: CypherConsoleCommandParameterContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.arrowExpression`.
     * @param ctx the parse tree
     */
    enterArrowExpression?: (ctx: ArrowExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.arrowExpression`.
     * @param ctx the parse tree
     */
    exitArrowExpression?: (ctx: ArrowExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.url`.
     * @param ctx the parse tree
     */
    enterUrl?: (ctx: UrlContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.url`.
     * @param ctx the parse tree
     */
    exitUrl?: (ctx: UrlContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.uri`.
     * @param ctx the parse tree
     */
    enterUri?: (ctx: UriContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.uri`.
     * @param ctx the parse tree
     */
    exitUri?: (ctx: UriContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.scheme`.
     * @param ctx the parse tree
     */
    enterScheme?: (ctx: SchemeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.scheme`.
     * @param ctx the parse tree
     */
    exitScheme?: (ctx: SchemeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.host`.
     * @param ctx the parse tree
     */
    enterHost?: (ctx: HostContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.host`.
     * @param ctx the parse tree
     */
    exitHost?: (ctx: HostContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.hostname`.
     * @param ctx the parse tree
     */
    enterHostname?: (ctx: HostnameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.hostname`.
     * @param ctx the parse tree
     */
    exitHostname?: (ctx: HostnameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.hostnumber`.
     * @param ctx the parse tree
     */
    enterHostnumber?: (ctx: HostnumberContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.hostnumber`.
     * @param ctx the parse tree
     */
    exitHostnumber?: (ctx: HostnumberContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.port`.
     * @param ctx the parse tree
     */
    enterPort?: (ctx: PortContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.port`.
     * @param ctx the parse tree
     */
    exitPort?: (ctx: PortContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.path`.
     * @param ctx the parse tree
     */
    enterPath?: (ctx: PathContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.path`.
     * @param ctx the parse tree
     */
    exitPath?: (ctx: PathContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.user`.
     * @param ctx the parse tree
     */
    enterUser?: (ctx: UserContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.user`.
     * @param ctx the parse tree
     */
    exitUser?: (ctx: UserContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.login`.
     * @param ctx the parse tree
     */
    enterLogin?: (ctx: LoginContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.login`.
     * @param ctx the parse tree
     */
    exitLogin?: (ctx: LoginContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.password`.
     * @param ctx the parse tree
     */
    enterPassword?: (ctx: PasswordContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.password`.
     * @param ctx the parse tree
     */
    exitPassword?: (ctx: PasswordContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.frag`.
     * @param ctx the parse tree
     */
    enterFrag?: (ctx: FragContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.frag`.
     * @param ctx the parse tree
     */
    exitFrag?: (ctx: FragContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.urlQuery`.
     * @param ctx the parse tree
     */
    enterUrlQuery?: (ctx: UrlQueryContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.urlQuery`.
     * @param ctx the parse tree
     */
    exitUrlQuery?: (ctx: UrlQueryContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.search`.
     * @param ctx the parse tree
     */
    enterSearch?: (ctx: SearchContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.search`.
     * @param ctx the parse tree
     */
    exitSearch?: (ctx: SearchContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.searchparameter`.
     * @param ctx the parse tree
     */
    enterSearchparameter?: (ctx: SearchparameterContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.searchparameter`.
     * @param ctx the parse tree
     */
    exitSearchparameter?: (ctx: SearchparameterContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.string`.
     * @param ctx the parse tree
     */
    enterString?: (ctx: StringContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.string`.
     * @param ctx the parse tree
     */
    exitString?: (ctx: StringContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.urlDigits`.
     * @param ctx the parse tree
     */
    enterUrlDigits?: (ctx: UrlDigitsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.urlDigits`.
     * @param ctx the parse tree
     */
    exitUrlDigits?: (ctx: UrlDigitsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.json`.
     * @param ctx the parse tree
     */
    enterJson?: (ctx: JsonContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.json`.
     * @param ctx the parse tree
     */
    exitJson?: (ctx: JsonContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.obj`.
     * @param ctx the parse tree
     */
    enterObj?: (ctx: ObjContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.obj`.
     * @param ctx the parse tree
     */
    exitObj?: (ctx: ObjContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.pair`.
     * @param ctx the parse tree
     */
    enterPair?: (ctx: PairContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.pair`.
     * @param ctx the parse tree
     */
    exitPair?: (ctx: PairContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.array`.
     * @param ctx the parse tree
     */
    enterArray?: (ctx: ArrayContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.array`.
     * @param ctx the parse tree
     */
    exitArray?: (ctx: ArrayContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.value`.
     * @param ctx the parse tree
     */
    enterValue?: (ctx: ValueContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.value`.
     * @param ctx the parse tree
     */
    exitValue?: (ctx: ValueContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.keyValueLiteral`.
     * @param ctx the parse tree
     */
    enterKeyValueLiteral?: (ctx: KeyValueLiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.keyValueLiteral`.
     * @param ctx the parse tree
     */
    exitKeyValueLiteral?: (ctx: KeyValueLiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.commandPath`.
     * @param ctx the parse tree
     */
    enterCommandPath?: (ctx: CommandPathContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.commandPath`.
     * @param ctx the parse tree
     */
    exitCommandPath?: (ctx: CommandPathContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.subCommand`.
     * @param ctx the parse tree
     */
    enterSubCommand?: (ctx: SubCommandContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.subCommand`.
     * @param ctx the parse tree
     */
    exitSubCommand?: (ctx: SubCommandContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.cypherQuery`.
     * @param ctx the parse tree
     */
    enterCypherQuery?: (ctx: CypherQueryContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.cypherQuery`.
     * @param ctx the parse tree
     */
    exitCypherQuery?: (ctx: CypherQueryContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.queryOptions`.
     * @param ctx the parse tree
     */
    enterQueryOptions?: (ctx: QueryOptionsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.queryOptions`.
     * @param ctx the parse tree
     */
    exitQueryOptions?: (ctx: QueryOptionsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.anyCypherOption`.
     * @param ctx the parse tree
     */
    enterAnyCypherOption?: (ctx: AnyCypherOptionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.anyCypherOption`.
     * @param ctx the parse tree
     */
    exitAnyCypherOption?: (ctx: AnyCypherOptionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.cypherOption`.
     * @param ctx the parse tree
     */
    enterCypherOption?: (ctx: CypherOptionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.cypherOption`.
     * @param ctx the parse tree
     */
    exitCypherOption?: (ctx: CypherOptionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.versionNumber`.
     * @param ctx the parse tree
     */
    enterVersionNumber?: (ctx: VersionNumberContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.versionNumber`.
     * @param ctx the parse tree
     */
    exitVersionNumber?: (ctx: VersionNumberContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.explain`.
     * @param ctx the parse tree
     */
    enterExplain?: (ctx: ExplainContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.explain`.
     * @param ctx the parse tree
     */
    exitExplain?: (ctx: ExplainContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.profile`.
     * @param ctx the parse tree
     */
    enterProfile?: (ctx: ProfileContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.profile`.
     * @param ctx the parse tree
     */
    exitProfile?: (ctx: ProfileContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.configurationOption`.
     * @param ctx the parse tree
     */
    enterConfigurationOption?: (ctx: ConfigurationOptionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.configurationOption`.
     * @param ctx the parse tree
     */
    exitConfigurationOption?: (ctx: ConfigurationOptionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.query`.
     * @param ctx the parse tree
     */
    enterQuery?: (ctx: QueryContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.query`.
     * @param ctx the parse tree
     */
    exitQuery?: (ctx: QueryContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.regularQuery`.
     * @param ctx the parse tree
     */
    enterRegularQuery?: (ctx: RegularQueryContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.regularQuery`.
     * @param ctx the parse tree
     */
    exitRegularQuery?: (ctx: RegularQueryContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.bulkImportQuery`.
     * @param ctx the parse tree
     */
    enterBulkImportQuery?: (ctx: BulkImportQueryContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.bulkImportQuery`.
     * @param ctx the parse tree
     */
    exitBulkImportQuery?: (ctx: BulkImportQueryContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.singleQuery`.
     * @param ctx the parse tree
     */
    enterSingleQuery?: (ctx: SingleQueryContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.singleQuery`.
     * @param ctx the parse tree
     */
    exitSingleQuery?: (ctx: SingleQueryContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.periodicCommitHint`.
     * @param ctx the parse tree
     */
    enterPeriodicCommitHint?: (ctx: PeriodicCommitHintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.periodicCommitHint`.
     * @param ctx the parse tree
     */
    exitPeriodicCommitHint?: (ctx: PeriodicCommitHintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.loadCSVQuery`.
     * @param ctx the parse tree
     */
    enterLoadCSVQuery?: (ctx: LoadCSVQueryContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.loadCSVQuery`.
     * @param ctx the parse tree
     */
    exitLoadCSVQuery?: (ctx: LoadCSVQueryContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.union`.
     * @param ctx the parse tree
     */
    enterUnion?: (ctx: UnionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.union`.
     * @param ctx the parse tree
     */
    exitUnion?: (ctx: UnionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.clause`.
     * @param ctx the parse tree
     */
    enterClause?: (ctx: ClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.clause`.
     * @param ctx the parse tree
     */
    exitClause?: (ctx: ClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.command`.
     * @param ctx the parse tree
     */
    enterCommand?: (ctx: CommandContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.command`.
     * @param ctx the parse tree
     */
    exitCommand?: (ctx: CommandContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.systemCommand`.
     * @param ctx the parse tree
     */
    enterSystemCommand?: (ctx: SystemCommandContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.systemCommand`.
     * @param ctx the parse tree
     */
    exitSystemCommand?: (ctx: SystemCommandContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.multidatabaseCommand`.
     * @param ctx the parse tree
     */
    enterMultidatabaseCommand?: (ctx: MultidatabaseCommandContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.multidatabaseCommand`.
     * @param ctx the parse tree
     */
    exitMultidatabaseCommand?: (ctx: MultidatabaseCommandContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.userCommand`.
     * @param ctx the parse tree
     */
    enterUserCommand?: (ctx: UserCommandContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.userCommand`.
     * @param ctx the parse tree
     */
    exitUserCommand?: (ctx: UserCommandContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.privilegeCommand`.
     * @param ctx the parse tree
     */
    enterPrivilegeCommand?: (ctx: PrivilegeCommandContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.privilegeCommand`.
     * @param ctx the parse tree
     */
    exitPrivilegeCommand?: (ctx: PrivilegeCommandContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.showRoles`.
     * @param ctx the parse tree
     */
    enterShowRoles?: (ctx: ShowRolesContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.showRoles`.
     * @param ctx the parse tree
     */
    exitShowRoles?: (ctx: ShowRolesContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createRole`.
     * @param ctx the parse tree
     */
    enterCreateRole?: (ctx: CreateRoleContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createRole`.
     * @param ctx the parse tree
     */
    exitCreateRole?: (ctx: CreateRoleContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.copyRole`.
     * @param ctx the parse tree
     */
    enterCopyRole?: (ctx: CopyRoleContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.copyRole`.
     * @param ctx the parse tree
     */
    exitCopyRole?: (ctx: CopyRoleContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dropRole`.
     * @param ctx the parse tree
     */
    enterDropRole?: (ctx: DropRoleContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dropRole`.
     * @param ctx the parse tree
     */
    exitDropRole?: (ctx: DropRoleContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.showUsers`.
     * @param ctx the parse tree
     */
    enterShowUsers?: (ctx: ShowUsersContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.showUsers`.
     * @param ctx the parse tree
     */
    exitShowUsers?: (ctx: ShowUsersContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createUser`.
     * @param ctx the parse tree
     */
    enterCreateUser?: (ctx: CreateUserContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createUser`.
     * @param ctx the parse tree
     */
    exitCreateUser?: (ctx: CreateUserContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dropUser`.
     * @param ctx the parse tree
     */
    enterDropUser?: (ctx: DropUserContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dropUser`.
     * @param ctx the parse tree
     */
    exitDropUser?: (ctx: DropUserContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.alterUser`.
     * @param ctx the parse tree
     */
    enterAlterUser?: (ctx: AlterUserContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.alterUser`.
     * @param ctx the parse tree
     */
    exitAlterUser?: (ctx: AlterUserContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.showPrivileges`.
     * @param ctx the parse tree
     */
    enterShowPrivileges?: (ctx: ShowPrivilegesContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.showPrivileges`.
     * @param ctx the parse tree
     */
    exitShowPrivileges?: (ctx: ShowPrivilegesContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.grantPrivilege`.
     * @param ctx the parse tree
     */
    enterGrantPrivilege?: (ctx: GrantPrivilegeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.grantPrivilege`.
     * @param ctx the parse tree
     */
    exitGrantPrivilege?: (ctx: GrantPrivilegeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.denyPrivilege`.
     * @param ctx the parse tree
     */
    enterDenyPrivilege?: (ctx: DenyPrivilegeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.denyPrivilege`.
     * @param ctx the parse tree
     */
    exitDenyPrivilege?: (ctx: DenyPrivilegeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.revokePrivilege`.
     * @param ctx the parse tree
     */
    enterRevokePrivilege?: (ctx: RevokePrivilegeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.revokePrivilege`.
     * @param ctx the parse tree
     */
    exitRevokePrivilege?: (ctx: RevokePrivilegeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.revokePart`.
     * @param ctx the parse tree
     */
    enterRevokePart?: (ctx: RevokePartContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.revokePart`.
     * @param ctx the parse tree
     */
    exitRevokePart?: (ctx: RevokePartContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.databaseScope`.
     * @param ctx the parse tree
     */
    enterDatabaseScope?: (ctx: DatabaseScopeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.databaseScope`.
     * @param ctx the parse tree
     */
    exitDatabaseScope?: (ctx: DatabaseScopeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.graphScope`.
     * @param ctx the parse tree
     */
    enterGraphScope?: (ctx: GraphScopeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.graphScope`.
     * @param ctx the parse tree
     */
    exitGraphScope?: (ctx: GraphScopeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.roles`.
     * @param ctx the parse tree
     */
    enterRoles?: (ctx: RolesContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.roles`.
     * @param ctx the parse tree
     */
    exitRoles?: (ctx: RolesContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.grantableGraphPrivileges`.
     * @param ctx the parse tree
     */
    enterGrantableGraphPrivileges?: (ctx: GrantableGraphPrivilegesContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.grantableGraphPrivileges`.
     * @param ctx the parse tree
     */
    exitGrantableGraphPrivileges?: (ctx: GrantableGraphPrivilegesContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.revokeableGraphPrivileges`.
     * @param ctx the parse tree
     */
    enterRevokeableGraphPrivileges?: (ctx: RevokeableGraphPrivilegesContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.revokeableGraphPrivileges`.
     * @param ctx the parse tree
     */
    exitRevokeableGraphPrivileges?: (ctx: RevokeableGraphPrivilegesContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.datasbasePrivilege`.
     * @param ctx the parse tree
     */
    enterDatasbasePrivilege?: (ctx: DatasbasePrivilegeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.datasbasePrivilege`.
     * @param ctx the parse tree
     */
    exitDatasbasePrivilege?: (ctx: DatasbasePrivilegeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dbmsPrivilege`.
     * @param ctx the parse tree
     */
    enterDbmsPrivilege?: (ctx: DbmsPrivilegeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dbmsPrivilege`.
     * @param ctx the parse tree
     */
    exitDbmsPrivilege?: (ctx: DbmsPrivilegeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.elementScope`.
     * @param ctx the parse tree
     */
    enterElementScope?: (ctx: ElementScopeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.elementScope`.
     * @param ctx the parse tree
     */
    exitElementScope?: (ctx: ElementScopeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.propertiesList`.
     * @param ctx the parse tree
     */
    enterPropertiesList?: (ctx: PropertiesListContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.propertiesList`.
     * @param ctx the parse tree
     */
    exitPropertiesList?: (ctx: PropertiesListContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.propertyScope`.
     * @param ctx the parse tree
     */
    enterPropertyScope?: (ctx: PropertyScopeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.propertyScope`.
     * @param ctx the parse tree
     */
    exitPropertyScope?: (ctx: PropertyScopeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.showDatabase`.
     * @param ctx the parse tree
     */
    enterShowDatabase?: (ctx: ShowDatabaseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.showDatabase`.
     * @param ctx the parse tree
     */
    exitShowDatabase?: (ctx: ShowDatabaseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createDatabase`.
     * @param ctx the parse tree
     */
    enterCreateDatabase?: (ctx: CreateDatabaseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createDatabase`.
     * @param ctx the parse tree
     */
    exitCreateDatabase?: (ctx: CreateDatabaseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dropDatabase`.
     * @param ctx the parse tree
     */
    enterDropDatabase?: (ctx: DropDatabaseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dropDatabase`.
     * @param ctx the parse tree
     */
    exitDropDatabase?: (ctx: DropDatabaseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.startDatabase`.
     * @param ctx the parse tree
     */
    enterStartDatabase?: (ctx: StartDatabaseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.startDatabase`.
     * @param ctx the parse tree
     */
    exitStartDatabase?: (ctx: StartDatabaseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.stopDatabase`.
     * @param ctx the parse tree
     */
    enterStopDatabase?: (ctx: StopDatabaseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.stopDatabase`.
     * @param ctx the parse tree
     */
    exitStopDatabase?: (ctx: StopDatabaseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.ifNotExists`.
     * @param ctx the parse tree
     */
    enterIfNotExists?: (ctx: IfNotExistsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.ifNotExists`.
     * @param ctx the parse tree
     */
    exitIfNotExists?: (ctx: IfNotExistsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.ifExists`.
     * @param ctx the parse tree
     */
    enterIfExists?: (ctx: IfExistsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.ifExists`.
     * @param ctx the parse tree
     */
    exitIfExists?: (ctx: IfExistsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.orReplace`.
     * @param ctx the parse tree
     */
    enterOrReplace?: (ctx: OrReplaceContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.orReplace`.
     * @param ctx the parse tree
     */
    exitOrReplace?: (ctx: OrReplaceContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.setPassword`.
     * @param ctx the parse tree
     */
    enterSetPassword?: (ctx: SetPasswordContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.setPassword`.
     * @param ctx the parse tree
     */
    exitSetPassword?: (ctx: SetPasswordContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.passwordStatus`.
     * @param ctx the parse tree
     */
    enterPasswordStatus?: (ctx: PasswordStatusContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.passwordStatus`.
     * @param ctx the parse tree
     */
    exitPasswordStatus?: (ctx: PasswordStatusContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.setStatus`.
     * @param ctx the parse tree
     */
    enterSetStatus?: (ctx: SetStatusContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.setStatus`.
     * @param ctx the parse tree
     */
    exitSetStatus?: (ctx: SetStatusContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.userStatus`.
     * @param ctx the parse tree
     */
    enterUserStatus?: (ctx: UserStatusContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.userStatus`.
     * @param ctx the parse tree
     */
    exitUserStatus?: (ctx: UserStatusContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createUniqueConstraint`.
     * @param ctx the parse tree
     */
    enterCreateUniqueConstraint?: (ctx: CreateUniqueConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createUniqueConstraint`.
     * @param ctx the parse tree
     */
    exitCreateUniqueConstraint?: (ctx: CreateUniqueConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createNodeKeyConstraint`.
     * @param ctx the parse tree
     */
    enterCreateNodeKeyConstraint?: (ctx: CreateNodeKeyConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createNodeKeyConstraint`.
     * @param ctx the parse tree
     */
    exitCreateNodeKeyConstraint?: (ctx: CreateNodeKeyConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createNodePropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    enterCreateNodePropertyExistenceConstraint?: (ctx: CreateNodePropertyExistenceConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createNodePropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    exitCreateNodePropertyExistenceConstraint?: (ctx: CreateNodePropertyExistenceConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createRelationshipPropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    enterCreateRelationshipPropertyExistenceConstraint?: (ctx: CreateRelationshipPropertyExistenceConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createRelationshipPropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    exitCreateRelationshipPropertyExistenceConstraint?: (ctx: CreateRelationshipPropertyExistenceConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createIndex`.
     * @param ctx the parse tree
     */
    enterCreateIndex?: (ctx: CreateIndexContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createIndex`.
     * @param ctx the parse tree
     */
    exitCreateIndex?: (ctx: CreateIndexContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dropUniqueConstraint`.
     * @param ctx the parse tree
     */
    enterDropUniqueConstraint?: (ctx: DropUniqueConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dropUniqueConstraint`.
     * @param ctx the parse tree
     */
    exitDropUniqueConstraint?: (ctx: DropUniqueConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dropNodeKeyConstraint`.
     * @param ctx the parse tree
     */
    enterDropNodeKeyConstraint?: (ctx: DropNodeKeyConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dropNodeKeyConstraint`.
     * @param ctx the parse tree
     */
    exitDropNodeKeyConstraint?: (ctx: DropNodeKeyConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dropNodePropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    enterDropNodePropertyExistenceConstraint?: (ctx: DropNodePropertyExistenceConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dropNodePropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    exitDropNodePropertyExistenceConstraint?: (ctx: DropNodePropertyExistenceConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dropRelationshipPropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    enterDropRelationshipPropertyExistenceConstraint?: (ctx: DropRelationshipPropertyExistenceConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dropRelationshipPropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    exitDropRelationshipPropertyExistenceConstraint?: (ctx: DropRelationshipPropertyExistenceConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dropIndex`.
     * @param ctx the parse tree
     */
    enterDropIndex?: (ctx: DropIndexContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dropIndex`.
     * @param ctx the parse tree
     */
    exitDropIndex?: (ctx: DropIndexContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.index`.
     * @param ctx the parse tree
     */
    enterIndex?: (ctx: IndexContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.index`.
     * @param ctx the parse tree
     */
    exitIndex?: (ctx: IndexContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.uniqueConstraint`.
     * @param ctx the parse tree
     */
    enterUniqueConstraint?: (ctx: UniqueConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.uniqueConstraint`.
     * @param ctx the parse tree
     */
    exitUniqueConstraint?: (ctx: UniqueConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.nodeKeyConstraint`.
     * @param ctx the parse tree
     */
    enterNodeKeyConstraint?: (ctx: NodeKeyConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.nodeKeyConstraint`.
     * @param ctx the parse tree
     */
    exitNodeKeyConstraint?: (ctx: NodeKeyConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.nodePropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    enterNodePropertyExistenceConstraint?: (ctx: NodePropertyExistenceConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.nodePropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    exitNodePropertyExistenceConstraint?: (ctx: NodePropertyExistenceConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipPropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    enterRelationshipPropertyExistenceConstraint?: (ctx: RelationshipPropertyExistenceConstraintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipPropertyExistenceConstraint`.
     * @param ctx the parse tree
     */
    exitRelationshipPropertyExistenceConstraint?: (ctx: RelationshipPropertyExistenceConstraintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipPatternSyntax`.
     * @param ctx the parse tree
     */
    enterRelationshipPatternSyntax?: (ctx: RelationshipPatternSyntaxContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipPatternSyntax`.
     * @param ctx the parse tree
     */
    exitRelationshipPatternSyntax?: (ctx: RelationshipPatternSyntaxContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.loadCSVClause`.
     * @param ctx the parse tree
     */
    enterLoadCSVClause?: (ctx: LoadCSVClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.loadCSVClause`.
     * @param ctx the parse tree
     */
    exitLoadCSVClause?: (ctx: LoadCSVClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.matchClause`.
     * @param ctx the parse tree
     */
    enterMatchClause?: (ctx: MatchClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.matchClause`.
     * @param ctx the parse tree
     */
    exitMatchClause?: (ctx: MatchClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.unwindClause`.
     * @param ctx the parse tree
     */
    enterUnwindClause?: (ctx: UnwindClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.unwindClause`.
     * @param ctx the parse tree
     */
    exitUnwindClause?: (ctx: UnwindClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.mergeClause`.
     * @param ctx the parse tree
     */
    enterMergeClause?: (ctx: MergeClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.mergeClause`.
     * @param ctx the parse tree
     */
    exitMergeClause?: (ctx: MergeClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.mergeAction`.
     * @param ctx the parse tree
     */
    enterMergeAction?: (ctx: MergeActionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.mergeAction`.
     * @param ctx the parse tree
     */
    exitMergeAction?: (ctx: MergeActionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createClause`.
     * @param ctx the parse tree
     */
    enterCreateClause?: (ctx: CreateClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createClause`.
     * @param ctx the parse tree
     */
    exitCreateClause?: (ctx: CreateClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.createUniqueClause`.
     * @param ctx the parse tree
     */
    enterCreateUniqueClause?: (ctx: CreateUniqueClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.createUniqueClause`.
     * @param ctx the parse tree
     */
    exitCreateUniqueClause?: (ctx: CreateUniqueClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.setClause`.
     * @param ctx the parse tree
     */
    enterSetClause?: (ctx: SetClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.setClause`.
     * @param ctx the parse tree
     */
    exitSetClause?: (ctx: SetClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.setItem`.
     * @param ctx the parse tree
     */
    enterSetItem?: (ctx: SetItemContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.setItem`.
     * @param ctx the parse tree
     */
    exitSetItem?: (ctx: SetItemContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.deleteClause`.
     * @param ctx the parse tree
     */
    enterDeleteClause?: (ctx: DeleteClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.deleteClause`.
     * @param ctx the parse tree
     */
    exitDeleteClause?: (ctx: DeleteClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.removeClause`.
     * @param ctx the parse tree
     */
    enterRemoveClause?: (ctx: RemoveClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.removeClause`.
     * @param ctx the parse tree
     */
    exitRemoveClause?: (ctx: RemoveClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.removeItem`.
     * @param ctx the parse tree
     */
    enterRemoveItem?: (ctx: RemoveItemContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.removeItem`.
     * @param ctx the parse tree
     */
    exitRemoveItem?: (ctx: RemoveItemContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.foreachClause`.
     * @param ctx the parse tree
     */
    enterForeachClause?: (ctx: ForeachClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.foreachClause`.
     * @param ctx the parse tree
     */
    exitForeachClause?: (ctx: ForeachClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.withClause`.
     * @param ctx the parse tree
     */
    enterWithClause?: (ctx: WithClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.withClause`.
     * @param ctx the parse tree
     */
    exitWithClause?: (ctx: WithClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.returnClause`.
     * @param ctx the parse tree
     */
    enterReturnClause?: (ctx: ReturnClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.returnClause`.
     * @param ctx the parse tree
     */
    exitReturnClause?: (ctx: ReturnClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.returnBody`.
     * @param ctx the parse tree
     */
    enterReturnBody?: (ctx: ReturnBodyContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.returnBody`.
     * @param ctx the parse tree
     */
    exitReturnBody?: (ctx: ReturnBodyContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.func`.
     * @param ctx the parse tree
     */
    enterFunc?: (ctx: FuncContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.func`.
     * @param ctx the parse tree
     */
    exitFunc?: (ctx: FuncContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.returnItems`.
     * @param ctx the parse tree
     */
    enterReturnItems?: (ctx: ReturnItemsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.returnItems`.
     * @param ctx the parse tree
     */
    exitReturnItems?: (ctx: ReturnItemsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.returnItem`.
     * @param ctx the parse tree
     */
    enterReturnItem?: (ctx: ReturnItemContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.returnItem`.
     * @param ctx the parse tree
     */
    exitReturnItem?: (ctx: ReturnItemContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.procedureInvocation`.
     * @param ctx the parse tree
     */
    enterProcedureInvocation?: (ctx: ProcedureInvocationContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.procedureInvocation`.
     * @param ctx the parse tree
     */
    exitProcedureInvocation?: (ctx: ProcedureInvocationContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.procedureInvocationBody`.
     * @param ctx the parse tree
     */
    enterProcedureInvocationBody?: (ctx: ProcedureInvocationBodyContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.procedureInvocationBody`.
     * @param ctx the parse tree
     */
    exitProcedureInvocationBody?: (ctx: ProcedureInvocationBodyContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.procedureArguments`.
     * @param ctx the parse tree
     */
    enterProcedureArguments?: (ctx: ProcedureArgumentsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.procedureArguments`.
     * @param ctx the parse tree
     */
    exitProcedureArguments?: (ctx: ProcedureArgumentsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.procedureResults`.
     * @param ctx the parse tree
     */
    enterProcedureResults?: (ctx: ProcedureResultsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.procedureResults`.
     * @param ctx the parse tree
     */
    exitProcedureResults?: (ctx: ProcedureResultsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.procedureResult`.
     * @param ctx the parse tree
     */
    enterProcedureResult?: (ctx: ProcedureResultContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.procedureResult`.
     * @param ctx the parse tree
     */
    exitProcedureResult?: (ctx: ProcedureResultContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.aliasedProcedureResult`.
     * @param ctx the parse tree
     */
    enterAliasedProcedureResult?: (ctx: AliasedProcedureResultContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.aliasedProcedureResult`.
     * @param ctx the parse tree
     */
    exitAliasedProcedureResult?: (ctx: AliasedProcedureResultContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.simpleProcedureResult`.
     * @param ctx the parse tree
     */
    enterSimpleProcedureResult?: (ctx: SimpleProcedureResultContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.simpleProcedureResult`.
     * @param ctx the parse tree
     */
    exitSimpleProcedureResult?: (ctx: SimpleProcedureResultContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.procedureOutput`.
     * @param ctx the parse tree
     */
    enterProcedureOutput?: (ctx: ProcedureOutputContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.procedureOutput`.
     * @param ctx the parse tree
     */
    exitProcedureOutput?: (ctx: ProcedureOutputContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.order`.
     * @param ctx the parse tree
     */
    enterOrder?: (ctx: OrderContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.order`.
     * @param ctx the parse tree
     */
    exitOrder?: (ctx: OrderContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.skip`.
     * @param ctx the parse tree
     */
    enterSkip?: (ctx: SkipContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.skip`.
     * @param ctx the parse tree
     */
    exitSkip?: (ctx: SkipContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.limit`.
     * @param ctx the parse tree
     */
    enterLimit?: (ctx: LimitContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.limit`.
     * @param ctx the parse tree
     */
    exitLimit?: (ctx: LimitContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.sortItem`.
     * @param ctx the parse tree
     */
    enterSortItem?: (ctx: SortItemContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.sortItem`.
     * @param ctx the parse tree
     */
    exitSortItem?: (ctx: SortItemContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.hint`.
     * @param ctx the parse tree
     */
    enterHint?: (ctx: HintContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.hint`.
     * @param ctx the parse tree
     */
    exitHint?: (ctx: HintContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.startClause`.
     * @param ctx the parse tree
     */
    enterStartClause?: (ctx: StartClauseContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.startClause`.
     * @param ctx the parse tree
     */
    exitStartClause?: (ctx: StartClauseContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.startPoint`.
     * @param ctx the parse tree
     */
    enterStartPoint?: (ctx: StartPointContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.startPoint`.
     * @param ctx the parse tree
     */
    exitStartPoint?: (ctx: StartPointContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.lookup`.
     * @param ctx the parse tree
     */
    enterLookup?: (ctx: LookupContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.lookup`.
     * @param ctx the parse tree
     */
    exitLookup?: (ctx: LookupContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.nodeLookup`.
     * @param ctx the parse tree
     */
    enterNodeLookup?: (ctx: NodeLookupContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.nodeLookup`.
     * @param ctx the parse tree
     */
    exitNodeLookup?: (ctx: NodeLookupContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipLookup`.
     * @param ctx the parse tree
     */
    enterRelationshipLookup?: (ctx: RelationshipLookupContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipLookup`.
     * @param ctx the parse tree
     */
    exitRelationshipLookup?: (ctx: RelationshipLookupContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.identifiedIndexLookup`.
     * @param ctx the parse tree
     */
    enterIdentifiedIndexLookup?: (ctx: IdentifiedIndexLookupContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.identifiedIndexLookup`.
     * @param ctx the parse tree
     */
    exitIdentifiedIndexLookup?: (ctx: IdentifiedIndexLookupContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.indexQuery`.
     * @param ctx the parse tree
     */
    enterIndexQuery?: (ctx: IndexQueryContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.indexQuery`.
     * @param ctx the parse tree
     */
    exitIndexQuery?: (ctx: IndexQueryContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.idLookup`.
     * @param ctx the parse tree
     */
    enterIdLookup?: (ctx: IdLookupContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.idLookup`.
     * @param ctx the parse tree
     */
    exitIdLookup?: (ctx: IdLookupContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.literalIds`.
     * @param ctx the parse tree
     */
    enterLiteralIds?: (ctx: LiteralIdsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.literalIds`.
     * @param ctx the parse tree
     */
    exitLiteralIds?: (ctx: LiteralIdsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.where`.
     * @param ctx the parse tree
     */
    enterWhere?: (ctx: WhereContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.where`.
     * @param ctx the parse tree
     */
    exitWhere?: (ctx: WhereContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.pattern`.
     * @param ctx the parse tree
     */
    enterPattern?: (ctx: PatternContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.pattern`.
     * @param ctx the parse tree
     */
    exitPattern?: (ctx: PatternContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.patternPart`.
     * @param ctx the parse tree
     */
    enterPatternPart?: (ctx: PatternPartContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.patternPart`.
     * @param ctx the parse tree
     */
    exitPatternPart?: (ctx: PatternPartContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.anonymousPatternPart`.
     * @param ctx the parse tree
     */
    enterAnonymousPatternPart?: (ctx: AnonymousPatternPartContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.anonymousPatternPart`.
     * @param ctx the parse tree
     */
    exitAnonymousPatternPart?: (ctx: AnonymousPatternPartContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.patternElement`.
     * @param ctx the parse tree
     */
    enterPatternElement?: (ctx: PatternElementContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.patternElement`.
     * @param ctx the parse tree
     */
    exitPatternElement?: (ctx: PatternElementContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.nodePattern`.
     * @param ctx the parse tree
     */
    enterNodePattern?: (ctx: NodePatternContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.nodePattern`.
     * @param ctx the parse tree
     */
    exitNodePattern?: (ctx: NodePatternContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.patternElementChain`.
     * @param ctx the parse tree
     */
    enterPatternElementChain?: (ctx: PatternElementChainContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.patternElementChain`.
     * @param ctx the parse tree
     */
    exitPatternElementChain?: (ctx: PatternElementChainContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipPattern`.
     * @param ctx the parse tree
     */
    enterRelationshipPattern?: (ctx: RelationshipPatternContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipPattern`.
     * @param ctx the parse tree
     */
    exitRelationshipPattern?: (ctx: RelationshipPatternContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipPatternStart`.
     * @param ctx the parse tree
     */
    enterRelationshipPatternStart?: (ctx: RelationshipPatternStartContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipPatternStart`.
     * @param ctx the parse tree
     */
    exitRelationshipPatternStart?: (ctx: RelationshipPatternStartContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipPatternEnd`.
     * @param ctx the parse tree
     */
    enterRelationshipPatternEnd?: (ctx: RelationshipPatternEndContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipPatternEnd`.
     * @param ctx the parse tree
     */
    exitRelationshipPatternEnd?: (ctx: RelationshipPatternEndContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipDetail`.
     * @param ctx the parse tree
     */
    enterRelationshipDetail?: (ctx: RelationshipDetailContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipDetail`.
     * @param ctx the parse tree
     */
    exitRelationshipDetail?: (ctx: RelationshipDetailContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.properties`.
     * @param ctx the parse tree
     */
    enterProperties?: (ctx: PropertiesContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.properties`.
     * @param ctx the parse tree
     */
    exitProperties?: (ctx: PropertiesContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relType`.
     * @param ctx the parse tree
     */
    enterRelType?: (ctx: RelTypeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relType`.
     * @param ctx the parse tree
     */
    exitRelType?: (ctx: RelTypeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipTypes`.
     * @param ctx the parse tree
     */
    enterRelationshipTypes?: (ctx: RelationshipTypesContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipTypes`.
     * @param ctx the parse tree
     */
    exitRelationshipTypes?: (ctx: RelationshipTypesContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipType`.
     * @param ctx the parse tree
     */
    enterRelationshipType?: (ctx: RelationshipTypeContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipType`.
     * @param ctx the parse tree
     */
    exitRelationshipType?: (ctx: RelationshipTypeContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipTypeOptionalColon`.
     * @param ctx the parse tree
     */
    enterRelationshipTypeOptionalColon?: (ctx: RelationshipTypeOptionalColonContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipTypeOptionalColon`.
     * @param ctx the parse tree
     */
    exitRelationshipTypeOptionalColon?: (ctx: RelationshipTypeOptionalColonContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.nodeLabels`.
     * @param ctx the parse tree
     */
    enterNodeLabels?: (ctx: NodeLabelsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.nodeLabels`.
     * @param ctx the parse tree
     */
    exitNodeLabels?: (ctx: NodeLabelsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.nodeLabel`.
     * @param ctx the parse tree
     */
    enterNodeLabel?: (ctx: NodeLabelContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.nodeLabel`.
     * @param ctx the parse tree
     */
    exitNodeLabel?: (ctx: NodeLabelContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.rangeLiteral`.
     * @param ctx the parse tree
     */
    enterRangeLiteral?: (ctx: RangeLiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.rangeLiteral`.
     * @param ctx the parse tree
     */
    exitRangeLiteral?: (ctx: RangeLiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.labelName`.
     * @param ctx the parse tree
     */
    enterLabelName?: (ctx: LabelNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.labelName`.
     * @param ctx the parse tree
     */
    exitLabelName?: (ctx: LabelNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relTypeName`.
     * @param ctx the parse tree
     */
    enterRelTypeName?: (ctx: RelTypeNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relTypeName`.
     * @param ctx the parse tree
     */
    exitRelTypeName?: (ctx: RelTypeNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.orExpression`.
     * @param ctx the parse tree
     */
    enterOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.orExpression`.
     * @param ctx the parse tree
     */
    exitOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.xorExpression`.
     * @param ctx the parse tree
     */
    enterXorExpression?: (ctx: XorExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.xorExpression`.
     * @param ctx the parse tree
     */
    exitXorExpression?: (ctx: XorExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.andExpression`.
     * @param ctx the parse tree
     */
    enterAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.andExpression`.
     * @param ctx the parse tree
     */
    exitAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.notExpression`.
     * @param ctx the parse tree
     */
    enterNotExpression?: (ctx: NotExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.notExpression`.
     * @param ctx the parse tree
     */
    exitNotExpression?: (ctx: NotExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.comparisonExpression`.
     * @param ctx the parse tree
     */
    enterComparisonExpression?: (ctx: ComparisonExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.comparisonExpression`.
     * @param ctx the parse tree
     */
    exitComparisonExpression?: (ctx: ComparisonExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.addOrSubtractExpression`.
     * @param ctx the parse tree
     */
    enterAddOrSubtractExpression?: (ctx: AddOrSubtractExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.addOrSubtractExpression`.
     * @param ctx the parse tree
     */
    exitAddOrSubtractExpression?: (ctx: AddOrSubtractExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.multiplyDivideModuloExpression`.
     * @param ctx the parse tree
     */
    enterMultiplyDivideModuloExpression?: (ctx: MultiplyDivideModuloExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.multiplyDivideModuloExpression`.
     * @param ctx the parse tree
     */
    exitMultiplyDivideModuloExpression?: (ctx: MultiplyDivideModuloExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.powerOfExpression`.
     * @param ctx the parse tree
     */
    enterPowerOfExpression?: (ctx: PowerOfExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.powerOfExpression`.
     * @param ctx the parse tree
     */
    exitPowerOfExpression?: (ctx: PowerOfExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.unaryAddOrSubtractExpression`.
     * @param ctx the parse tree
     */
    enterUnaryAddOrSubtractExpression?: (ctx: UnaryAddOrSubtractExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.unaryAddOrSubtractExpression`.
     * @param ctx the parse tree
     */
    exitUnaryAddOrSubtractExpression?: (ctx: UnaryAddOrSubtractExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.stringListNullOperatorExpression`.
     * @param ctx the parse tree
     */
    enterStringListNullOperatorExpression?: (ctx: StringListNullOperatorExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.stringListNullOperatorExpression`.
     * @param ctx the parse tree
     */
    exitStringListNullOperatorExpression?: (ctx: StringListNullOperatorExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.propertyOrLabelsExpression`.
     * @param ctx the parse tree
     */
    enterPropertyOrLabelsExpression?: (ctx: PropertyOrLabelsExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.propertyOrLabelsExpression`.
     * @param ctx the parse tree
     */
    exitPropertyOrLabelsExpression?: (ctx: PropertyOrLabelsExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.filterFunction`.
     * @param ctx the parse tree
     */
    enterFilterFunction?: (ctx: FilterFunctionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.filterFunction`.
     * @param ctx the parse tree
     */
    exitFilterFunction?: (ctx: FilterFunctionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.filterFunctionName`.
     * @param ctx the parse tree
     */
    enterFilterFunctionName?: (ctx: FilterFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.filterFunctionName`.
     * @param ctx the parse tree
     */
    exitFilterFunctionName?: (ctx: FilterFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.existsFunction`.
     * @param ctx the parse tree
     */
    enterExistsFunction?: (ctx: ExistsFunctionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.existsFunction`.
     * @param ctx the parse tree
     */
    exitExistsFunction?: (ctx: ExistsFunctionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.existsFunctionName`.
     * @param ctx the parse tree
     */
    enterExistsFunctionName?: (ctx: ExistsFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.existsFunctionName`.
     * @param ctx the parse tree
     */
    exitExistsFunctionName?: (ctx: ExistsFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.allFunction`.
     * @param ctx the parse tree
     */
    enterAllFunction?: (ctx: AllFunctionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.allFunction`.
     * @param ctx the parse tree
     */
    exitAllFunction?: (ctx: AllFunctionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.allFunctionName`.
     * @param ctx the parse tree
     */
    enterAllFunctionName?: (ctx: AllFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.allFunctionName`.
     * @param ctx the parse tree
     */
    exitAllFunctionName?: (ctx: AllFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.anyFunction`.
     * @param ctx the parse tree
     */
    enterAnyFunction?: (ctx: AnyFunctionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.anyFunction`.
     * @param ctx the parse tree
     */
    exitAnyFunction?: (ctx: AnyFunctionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.anyFunctionName`.
     * @param ctx the parse tree
     */
    enterAnyFunctionName?: (ctx: AnyFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.anyFunctionName`.
     * @param ctx the parse tree
     */
    exitAnyFunctionName?: (ctx: AnyFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.noneFunction`.
     * @param ctx the parse tree
     */
    enterNoneFunction?: (ctx: NoneFunctionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.noneFunction`.
     * @param ctx the parse tree
     */
    exitNoneFunction?: (ctx: NoneFunctionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.noneFunctionName`.
     * @param ctx the parse tree
     */
    enterNoneFunctionName?: (ctx: NoneFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.noneFunctionName`.
     * @param ctx the parse tree
     */
    exitNoneFunctionName?: (ctx: NoneFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.singleFunction`.
     * @param ctx the parse tree
     */
    enterSingleFunction?: (ctx: SingleFunctionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.singleFunction`.
     * @param ctx the parse tree
     */
    exitSingleFunction?: (ctx: SingleFunctionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.singleFunctionName`.
     * @param ctx the parse tree
     */
    enterSingleFunctionName?: (ctx: SingleFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.singleFunctionName`.
     * @param ctx the parse tree
     */
    exitSingleFunctionName?: (ctx: SingleFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.extractFunction`.
     * @param ctx the parse tree
     */
    enterExtractFunction?: (ctx: ExtractFunctionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.extractFunction`.
     * @param ctx the parse tree
     */
    exitExtractFunction?: (ctx: ExtractFunctionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.extractFunctionName`.
     * @param ctx the parse tree
     */
    enterExtractFunctionName?: (ctx: ExtractFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.extractFunctionName`.
     * @param ctx the parse tree
     */
    exitExtractFunctionName?: (ctx: ExtractFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.reduceFunction`.
     * @param ctx the parse tree
     */
    enterReduceFunction?: (ctx: ReduceFunctionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.reduceFunction`.
     * @param ctx the parse tree
     */
    exitReduceFunction?: (ctx: ReduceFunctionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.reduceFunctionName`.
     * @param ctx the parse tree
     */
    enterReduceFunctionName?: (ctx: ReduceFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.reduceFunctionName`.
     * @param ctx the parse tree
     */
    exitReduceFunctionName?: (ctx: ReduceFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.shortestPathPatternFunction`.
     * @param ctx the parse tree
     */
    enterShortestPathPatternFunction?: (ctx: ShortestPathPatternFunctionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.shortestPathPatternFunction`.
     * @param ctx the parse tree
     */
    exitShortestPathPatternFunction?: (ctx: ShortestPathPatternFunctionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.shortestPathFunctionName`.
     * @param ctx the parse tree
     */
    enterShortestPathFunctionName?: (ctx: ShortestPathFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.shortestPathFunctionName`.
     * @param ctx the parse tree
     */
    exitShortestPathFunctionName?: (ctx: ShortestPathFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.allShortestPathFunctionName`.
     * @param ctx the parse tree
     */
    enterAllShortestPathFunctionName?: (ctx: AllShortestPathFunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.allShortestPathFunctionName`.
     * @param ctx the parse tree
     */
    exitAllShortestPathFunctionName?: (ctx: AllShortestPathFunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.atom`.
     * @param ctx the parse tree
     */
    enterAtom?: (ctx: AtomContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.atom`.
     * @param ctx the parse tree
     */
    exitAtom?: (ctx: AtomContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.literal`.
     * @param ctx the parse tree
     */
    enterLiteral?: (ctx: LiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.literal`.
     * @param ctx the parse tree
     */
    exitLiteral?: (ctx: LiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.stringLiteral`.
     * @param ctx the parse tree
     */
    enterStringLiteral?: (ctx: StringLiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.stringLiteral`.
     * @param ctx the parse tree
     */
    exitStringLiteral?: (ctx: StringLiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.booleanLiteral`.
     * @param ctx the parse tree
     */
    enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.booleanLiteral`.
     * @param ctx the parse tree
     */
    exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.listLiteral`.
     * @param ctx the parse tree
     */
    enterListLiteral?: (ctx: ListLiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.listLiteral`.
     * @param ctx the parse tree
     */
    exitListLiteral?: (ctx: ListLiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.partialComparisonExpression`.
     * @param ctx the parse tree
     */
    enterPartialComparisonExpression?: (ctx: PartialComparisonExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.partialComparisonExpression`.
     * @param ctx the parse tree
     */
    exitPartialComparisonExpression?: (ctx: PartialComparisonExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.parenthesizedExpression`.
     * @param ctx the parse tree
     */
    enterParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.parenthesizedExpression`.
     * @param ctx the parse tree
     */
    exitParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.relationshipsPattern`.
     * @param ctx the parse tree
     */
    enterRelationshipsPattern?: (ctx: RelationshipsPatternContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.relationshipsPattern`.
     * @param ctx the parse tree
     */
    exitRelationshipsPattern?: (ctx: RelationshipsPatternContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.filterExpression`.
     * @param ctx the parse tree
     */
    enterFilterExpression?: (ctx: FilterExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.filterExpression`.
     * @param ctx the parse tree
     */
    exitFilterExpression?: (ctx: FilterExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.idInColl`.
     * @param ctx the parse tree
     */
    enterIdInColl?: (ctx: IdInCollContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.idInColl`.
     * @param ctx the parse tree
     */
    exitIdInColl?: (ctx: IdInCollContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.functionInvocation`.
     * @param ctx the parse tree
     */
    enterFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.functionInvocation`.
     * @param ctx the parse tree
     */
    exitFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.functionInvocationBody`.
     * @param ctx the parse tree
     */
    enterFunctionInvocationBody?: (ctx: FunctionInvocationBodyContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.functionInvocationBody`.
     * @param ctx the parse tree
     */
    exitFunctionInvocationBody?: (ctx: FunctionInvocationBodyContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.functionName`.
     * @param ctx the parse tree
     */
    enterFunctionName?: (ctx: FunctionNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.functionName`.
     * @param ctx the parse tree
     */
    exitFunctionName?: (ctx: FunctionNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.procedureName`.
     * @param ctx the parse tree
     */
    enterProcedureName?: (ctx: ProcedureNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.procedureName`.
     * @param ctx the parse tree
     */
    exitProcedureName?: (ctx: ProcedureNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.listComprehension`.
     * @param ctx the parse tree
     */
    enterListComprehension?: (ctx: ListComprehensionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.listComprehension`.
     * @param ctx the parse tree
     */
    exitListComprehension?: (ctx: ListComprehensionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.patternComprehension`.
     * @param ctx the parse tree
     */
    enterPatternComprehension?: (ctx: PatternComprehensionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.patternComprehension`.
     * @param ctx the parse tree
     */
    exitPatternComprehension?: (ctx: PatternComprehensionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.propertyLookup`.
     * @param ctx the parse tree
     */
    enterPropertyLookup?: (ctx: PropertyLookupContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.propertyLookup`.
     * @param ctx the parse tree
     */
    exitPropertyLookup?: (ctx: PropertyLookupContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.caseExpression`.
     * @param ctx the parse tree
     */
    enterCaseExpression?: (ctx: CaseExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.caseExpression`.
     * @param ctx the parse tree
     */
    exitCaseExpression?: (ctx: CaseExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.caseAlternatives`.
     * @param ctx the parse tree
     */
    enterCaseAlternatives?: (ctx: CaseAlternativesContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.caseAlternatives`.
     * @param ctx the parse tree
     */
    exitCaseAlternatives?: (ctx: CaseAlternativesContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.variable`.
     * @param ctx the parse tree
     */
    enterVariable?: (ctx: VariableContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.variable`.
     * @param ctx the parse tree
     */
    exitVariable?: (ctx: VariableContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.numberLiteral`.
     * @param ctx the parse tree
     */
    enterNumberLiteral?: (ctx: NumberLiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.numberLiteral`.
     * @param ctx the parse tree
     */
    exitNumberLiteral?: (ctx: NumberLiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.mapLiteral`.
     * @param ctx the parse tree
     */
    enterMapLiteral?: (ctx: MapLiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.mapLiteral`.
     * @param ctx the parse tree
     */
    exitMapLiteral?: (ctx: MapLiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.mapProjection`.
     * @param ctx the parse tree
     */
    enterMapProjection?: (ctx: MapProjectionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.mapProjection`.
     * @param ctx the parse tree
     */
    exitMapProjection?: (ctx: MapProjectionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.mapProjectionVariants`.
     * @param ctx the parse tree
     */
    enterMapProjectionVariants?: (ctx: MapProjectionVariantsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.mapProjectionVariants`.
     * @param ctx the parse tree
     */
    exitMapProjectionVariants?: (ctx: MapProjectionVariantsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.literalEntry`.
     * @param ctx the parse tree
     */
    enterLiteralEntry?: (ctx: LiteralEntryContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.literalEntry`.
     * @param ctx the parse tree
     */
    exitLiteralEntry?: (ctx: LiteralEntryContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.propertySelector`.
     * @param ctx the parse tree
     */
    enterPropertySelector?: (ctx: PropertySelectorContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.propertySelector`.
     * @param ctx the parse tree
     */
    exitPropertySelector?: (ctx: PropertySelectorContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.variableSelector`.
     * @param ctx the parse tree
     */
    enterVariableSelector?: (ctx: VariableSelectorContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.variableSelector`.
     * @param ctx the parse tree
     */
    exitVariableSelector?: (ctx: VariableSelectorContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.allPropertiesSelector`.
     * @param ctx the parse tree
     */
    enterAllPropertiesSelector?: (ctx: AllPropertiesSelectorContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.allPropertiesSelector`.
     * @param ctx the parse tree
     */
    exitAllPropertiesSelector?: (ctx: AllPropertiesSelectorContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.parameter`.
     * @param ctx the parse tree
     */
    enterParameter?: (ctx: ParameterContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.parameter`.
     * @param ctx the parse tree
     */
    exitParameter?: (ctx: ParameterContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.legacyParameter`.
     * @param ctx the parse tree
     */
    enterLegacyParameter?: (ctx: LegacyParameterContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.legacyParameter`.
     * @param ctx the parse tree
     */
    exitLegacyParameter?: (ctx: LegacyParameterContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.newParameter`.
     * @param ctx the parse tree
     */
    enterNewParameter?: (ctx: NewParameterContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.newParameter`.
     * @param ctx the parse tree
     */
    exitNewParameter?: (ctx: NewParameterContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.parameterName`.
     * @param ctx the parse tree
     */
    enterParameterName?: (ctx: ParameterNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.parameterName`.
     * @param ctx the parse tree
     */
    exitParameterName?: (ctx: ParameterNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.propertyExpressions`.
     * @param ctx the parse tree
     */
    enterPropertyExpressions?: (ctx: PropertyExpressionsContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.propertyExpressions`.
     * @param ctx the parse tree
     */
    exitPropertyExpressions?: (ctx: PropertyExpressionsContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.propertyExpression`.
     * @param ctx the parse tree
     */
    enterPropertyExpression?: (ctx: PropertyExpressionContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.propertyExpression`.
     * @param ctx the parse tree
     */
    exitPropertyExpression?: (ctx: PropertyExpressionContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.propertyKeys`.
     * @param ctx the parse tree
     */
    enterPropertyKeys?: (ctx: PropertyKeysContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.propertyKeys`.
     * @param ctx the parse tree
     */
    exitPropertyKeys?: (ctx: PropertyKeysContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.propertyKeyName`.
     * @param ctx the parse tree
     */
    enterPropertyKeyName?: (ctx: PropertyKeyNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.propertyKeyName`.
     * @param ctx the parse tree
     */
    exitPropertyKeyName?: (ctx: PropertyKeyNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.integerLiteral`.
     * @param ctx the parse tree
     */
    enterIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.integerLiteral`.
     * @param ctx the parse tree
     */
    exitIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.doubleLiteral`.
     * @param ctx the parse tree
     */
    enterDoubleLiteral?: (ctx: DoubleLiteralContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.doubleLiteral`.
     * @param ctx the parse tree
     */
    exitDoubleLiteral?: (ctx: DoubleLiteralContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.namespace`.
     * @param ctx the parse tree
     */
    enterNamespace?: (ctx: NamespaceContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.namespace`.
     * @param ctx the parse tree
     */
    exitNamespace?: (ctx: NamespaceContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.leftArrowHead`.
     * @param ctx the parse tree
     */
    enterLeftArrowHead?: (ctx: LeftArrowHeadContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.leftArrowHead`.
     * @param ctx the parse tree
     */
    exitLeftArrowHead?: (ctx: LeftArrowHeadContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.rightArrowHead`.
     * @param ctx the parse tree
     */
    enterRightArrowHead?: (ctx: RightArrowHeadContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.rightArrowHead`.
     * @param ctx the parse tree
     */
    exitRightArrowHead?: (ctx: RightArrowHeadContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.dash`.
     * @param ctx the parse tree
     */
    enterDash?: (ctx: DashContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.dash`.
     * @param ctx the parse tree
     */
    exitDash?: (ctx: DashContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.symbolicName`.
     * @param ctx the parse tree
     */
    enterSymbolicName?: (ctx: SymbolicNameContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.symbolicName`.
     * @param ctx the parse tree
     */
    exitSymbolicName?: (ctx: SymbolicNameContext) => void;
    /**
     * Enter a parse tree produced by `CypherParser.keyword`.
     * @param ctx the parse tree
     */
    enterKeyword?: (ctx: KeywordContext) => void;
    /**
     * Exit a parse tree produced by `CypherParser.keyword`.
     * @param ctx the parse tree
     */
    exitKeyword?: (ctx: KeywordContext) => void;
}
