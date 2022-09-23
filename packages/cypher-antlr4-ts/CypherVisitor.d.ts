import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `CypherParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface CypherVisitor<Result> extends ParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `CypherParser.cypher`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCypher?: (ctx: CypherContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.cypherPart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCypherPart?: (ctx: CypherPartContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.cypherConsoleCommand`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCypherConsoleCommand?: (ctx: CypherConsoleCommandContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.cypherConsoleCommandName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCypherConsoleCommandName?: (ctx: CypherConsoleCommandNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.cypherConsoleCommandParameters`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCypherConsoleCommandParameters?: (ctx: CypherConsoleCommandParametersContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.cypherConsoleCommandParameter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCypherConsoleCommandParameter?: (ctx: CypherConsoleCommandParameterContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.arrowExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArrowExpression?: (ctx: ArrowExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.url`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUrl?: (ctx: UrlContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.uri`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUri?: (ctx: UriContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.scheme`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitScheme?: (ctx: SchemeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.host`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitHost?: (ctx: HostContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.hostname`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitHostname?: (ctx: HostnameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.hostnumber`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitHostnumber?: (ctx: HostnumberContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.port`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPort?: (ctx: PortContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.path`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPath?: (ctx: PathContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.user`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUser?: (ctx: UserContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.login`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLogin?: (ctx: LoginContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.password`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPassword?: (ctx: PasswordContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.frag`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFrag?: (ctx: FragContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.urlQuery`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUrlQuery?: (ctx: UrlQueryContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.search`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSearch?: (ctx: SearchContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.searchparameter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSearchparameter?: (ctx: SearchparameterContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.string`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString?: (ctx: StringContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.urlDigits`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUrlDigits?: (ctx: UrlDigitsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.json`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitJson?: (ctx: JsonContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.obj`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitObj?: (ctx: ObjContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.pair`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPair?: (ctx: PairContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.array`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArray?: (ctx: ArrayContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.value`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitValue?: (ctx: ValueContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.keyValueLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitKeyValueLiteral?: (ctx: KeyValueLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.commandPath`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCommandPath?: (ctx: CommandPathContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.subCommand`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSubCommand?: (ctx: SubCommandContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.cypherQuery`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCypherQuery?: (ctx: CypherQueryContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.queryOptions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitQueryOptions?: (ctx: QueryOptionsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.anyCypherOption`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAnyCypherOption?: (ctx: AnyCypherOptionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.cypherOption`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCypherOption?: (ctx: CypherOptionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.versionNumber`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVersionNumber?: (ctx: VersionNumberContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.explain`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExplain?: (ctx: ExplainContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.profile`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProfile?: (ctx: ProfileContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.configurationOption`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConfigurationOption?: (ctx: ConfigurationOptionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStatement?: (ctx: StatementContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.query`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitQuery?: (ctx: QueryContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.regularQuery`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRegularQuery?: (ctx: RegularQueryContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.bulkImportQuery`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBulkImportQuery?: (ctx: BulkImportQueryContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.singleQuery`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSingleQuery?: (ctx: SingleQueryContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.periodicCommitHint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPeriodicCommitHint?: (ctx: PeriodicCommitHintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.loadCSVQuery`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLoadCSVQuery?: (ctx: LoadCSVQueryContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.union`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnion?: (ctx: UnionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.clause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitClause?: (ctx: ClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.command`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCommand?: (ctx: CommandContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.systemCommand`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSystemCommand?: (ctx: SystemCommandContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.multidatabaseCommand`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMultidatabaseCommand?: (ctx: MultidatabaseCommandContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.userCommand`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserCommand?: (ctx: UserCommandContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.privilegeCommand`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrivilegeCommand?: (ctx: PrivilegeCommandContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.showRoles`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitShowRoles?: (ctx: ShowRolesContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createRole`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateRole?: (ctx: CreateRoleContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.copyRole`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCopyRole?: (ctx: CopyRoleContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dropRole`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDropRole?: (ctx: DropRoleContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.showUsers`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitShowUsers?: (ctx: ShowUsersContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createUser`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateUser?: (ctx: CreateUserContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dropUser`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDropUser?: (ctx: DropUserContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.alterUser`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAlterUser?: (ctx: AlterUserContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.showPrivileges`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitShowPrivileges?: (ctx: ShowPrivilegesContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.grantPrivilege`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGrantPrivilege?: (ctx: GrantPrivilegeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.denyPrivilege`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDenyPrivilege?: (ctx: DenyPrivilegeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.revokePrivilege`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRevokePrivilege?: (ctx: RevokePrivilegeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.revokePart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRevokePart?: (ctx: RevokePartContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.databaseScope`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDatabaseScope?: (ctx: DatabaseScopeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.graphScope`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGraphScope?: (ctx: GraphScopeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.roles`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRoles?: (ctx: RolesContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.grantableGraphPrivileges`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitGrantableGraphPrivileges?: (ctx: GrantableGraphPrivilegesContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.revokeableGraphPrivileges`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRevokeableGraphPrivileges?: (ctx: RevokeableGraphPrivilegesContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.datasbasePrivilege`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDatasbasePrivilege?: (ctx: DatasbasePrivilegeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dbmsPrivilege`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDbmsPrivilege?: (ctx: DbmsPrivilegeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.elementScope`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElementScope?: (ctx: ElementScopeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.propertiesList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertiesList?: (ctx: PropertiesListContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.propertyScope`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyScope?: (ctx: PropertyScopeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.showDatabase`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitShowDatabase?: (ctx: ShowDatabaseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createDatabase`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateDatabase?: (ctx: CreateDatabaseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dropDatabase`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDropDatabase?: (ctx: DropDatabaseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.startDatabase`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStartDatabase?: (ctx: StartDatabaseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.stopDatabase`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStopDatabase?: (ctx: StopDatabaseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.ifNotExists`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfNotExists?: (ctx: IfNotExistsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.ifExists`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfExists?: (ctx: IfExistsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.orReplace`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitOrReplace?: (ctx: OrReplaceContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.setPassword`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSetPassword?: (ctx: SetPasswordContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.passwordStatus`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPasswordStatus?: (ctx: PasswordStatusContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.setStatus`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSetStatus?: (ctx: SetStatusContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.userStatus`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUserStatus?: (ctx: UserStatusContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createUniqueConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateUniqueConstraint?: (ctx: CreateUniqueConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createNodeKeyConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateNodeKeyConstraint?: (ctx: CreateNodeKeyConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createNodePropertyExistenceConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateNodePropertyExistenceConstraint?: (ctx: CreateNodePropertyExistenceConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createRelationshipPropertyExistenceConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateRelationshipPropertyExistenceConstraint?: (ctx: CreateRelationshipPropertyExistenceConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createIndex`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateIndex?: (ctx: CreateIndexContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dropUniqueConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDropUniqueConstraint?: (ctx: DropUniqueConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dropNodeKeyConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDropNodeKeyConstraint?: (ctx: DropNodeKeyConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dropNodePropertyExistenceConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDropNodePropertyExistenceConstraint?: (ctx: DropNodePropertyExistenceConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dropRelationshipPropertyExistenceConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDropRelationshipPropertyExistenceConstraint?: (ctx: DropRelationshipPropertyExistenceConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dropIndex`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDropIndex?: (ctx: DropIndexContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.index`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIndex?: (ctx: IndexContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.uniqueConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUniqueConstraint?: (ctx: UniqueConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.nodeKeyConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNodeKeyConstraint?: (ctx: NodeKeyConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.nodePropertyExistenceConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNodePropertyExistenceConstraint?: (ctx: NodePropertyExistenceConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipPropertyExistenceConstraint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipPropertyExistenceConstraint?: (ctx: RelationshipPropertyExistenceConstraintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipPatternSyntax`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipPatternSyntax?: (ctx: RelationshipPatternSyntaxContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.loadCSVClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLoadCSVClause?: (ctx: LoadCSVClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.matchClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMatchClause?: (ctx: MatchClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.unwindClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnwindClause?: (ctx: UnwindClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.mergeClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMergeClause?: (ctx: MergeClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.mergeAction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMergeAction?: (ctx: MergeActionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateClause?: (ctx: CreateClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.createUniqueClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCreateUniqueClause?: (ctx: CreateUniqueClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.setClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSetClause?: (ctx: SetClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.setItem`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSetItem?: (ctx: SetItemContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.deleteClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeleteClause?: (ctx: DeleteClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.removeClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRemoveClause?: (ctx: RemoveClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.removeItem`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRemoveItem?: (ctx: RemoveItemContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.foreachClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitForeachClause?: (ctx: ForeachClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.withClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWithClause?: (ctx: WithClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.returnClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturnClause?: (ctx: ReturnClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.returnBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturnBody?: (ctx: ReturnBodyContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.func`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunc?: (ctx: FuncContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.returnItems`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturnItems?: (ctx: ReturnItemsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.returnItem`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturnItem?: (ctx: ReturnItemContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.call`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCall?: (ctx: CallContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.procedureInvocation`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcedureInvocation?: (ctx: ProcedureInvocationContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.procedureInvocationBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcedureInvocationBody?: (ctx: ProcedureInvocationBodyContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.procedureArguments`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcedureArguments?: (ctx: ProcedureArgumentsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.procedureResults`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcedureResults?: (ctx: ProcedureResultsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.procedureResult`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcedureResult?: (ctx: ProcedureResultContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.aliasedProcedureResult`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAliasedProcedureResult?: (ctx: AliasedProcedureResultContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.simpleProcedureResult`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSimpleProcedureResult?: (ctx: SimpleProcedureResultContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.procedureOutput`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcedureOutput?: (ctx: ProcedureOutputContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.order`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitOrder?: (ctx: OrderContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.skip`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSkip?: (ctx: SkipContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.limit`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLimit?: (ctx: LimitContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.sortItem`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSortItem?: (ctx: SortItemContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.hint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitHint?: (ctx: HintContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.startClause`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStartClause?: (ctx: StartClauseContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.startPoint`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStartPoint?: (ctx: StartPointContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.lookup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLookup?: (ctx: LookupContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.nodeLookup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNodeLookup?: (ctx: NodeLookupContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipLookup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipLookup?: (ctx: RelationshipLookupContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.identifiedIndexLookup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifiedIndexLookup?: (ctx: IdentifiedIndexLookupContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.indexQuery`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIndexQuery?: (ctx: IndexQueryContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.idLookup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdLookup?: (ctx: IdLookupContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.literalIds`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteralIds?: (ctx: LiteralIdsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.where`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhere?: (ctx: WhereContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.pattern`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPattern?: (ctx: PatternContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.patternPart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPatternPart?: (ctx: PatternPartContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.anonymousPatternPart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAnonymousPatternPart?: (ctx: AnonymousPatternPartContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.patternElement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPatternElement?: (ctx: PatternElementContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.nodePattern`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNodePattern?: (ctx: NodePatternContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.patternElementChain`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPatternElementChain?: (ctx: PatternElementChainContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipPattern`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipPattern?: (ctx: RelationshipPatternContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipPatternStart`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipPatternStart?: (ctx: RelationshipPatternStartContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipPatternEnd`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipPatternEnd?: (ctx: RelationshipPatternEndContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipDetail`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipDetail?: (ctx: RelationshipDetailContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.properties`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProperties?: (ctx: PropertiesContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relType`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelType?: (ctx: RelTypeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipTypes`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipTypes?: (ctx: RelationshipTypesContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipType`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipType?: (ctx: RelationshipTypeContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipTypeOptionalColon`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipTypeOptionalColon?: (ctx: RelationshipTypeOptionalColonContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.nodeLabels`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNodeLabels?: (ctx: NodeLabelsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.nodeLabel`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNodeLabel?: (ctx: NodeLabelContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.rangeLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRangeLiteral?: (ctx: RangeLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.labelName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLabelName?: (ctx: LabelNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relTypeName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelTypeName?: (ctx: RelTypeNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.orExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitOrExpression?: (ctx: OrExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.xorExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitXorExpression?: (ctx: XorExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.andExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAndExpression?: (ctx: AndExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.notExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNotExpression?: (ctx: NotExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.comparisonExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitComparisonExpression?: (ctx: ComparisonExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.addOrSubtractExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddOrSubtractExpression?: (ctx: AddOrSubtractExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.multiplyDivideModuloExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMultiplyDivideModuloExpression?: (ctx: MultiplyDivideModuloExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.powerOfExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPowerOfExpression?: (ctx: PowerOfExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.unaryAddOrSubtractExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnaryAddOrSubtractExpression?: (ctx: UnaryAddOrSubtractExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.stringListNullOperatorExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStringListNullOperatorExpression?: (ctx: StringListNullOperatorExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.propertyOrLabelsExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyOrLabelsExpression?: (ctx: PropertyOrLabelsExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.filterFunction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFilterFunction?: (ctx: FilterFunctionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.filterFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFilterFunctionName?: (ctx: FilterFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.existsFunction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExistsFunction?: (ctx: ExistsFunctionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.existsFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExistsFunctionName?: (ctx: ExistsFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.allFunction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAllFunction?: (ctx: AllFunctionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.allFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAllFunctionName?: (ctx: AllFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.anyFunction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAnyFunction?: (ctx: AnyFunctionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.anyFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAnyFunctionName?: (ctx: AnyFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.noneFunction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNoneFunction?: (ctx: NoneFunctionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.noneFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNoneFunctionName?: (ctx: NoneFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.singleFunction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSingleFunction?: (ctx: SingleFunctionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.singleFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSingleFunctionName?: (ctx: SingleFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.extractFunction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExtractFunction?: (ctx: ExtractFunctionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.extractFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExtractFunctionName?: (ctx: ExtractFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.reduceFunction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReduceFunction?: (ctx: ReduceFunctionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.reduceFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReduceFunctionName?: (ctx: ReduceFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.shortestPathPatternFunction`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitShortestPathPatternFunction?: (ctx: ShortestPathPatternFunctionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.shortestPathFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitShortestPathFunctionName?: (ctx: ShortestPathFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.allShortestPathFunctionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAllShortestPathFunctionName?: (ctx: AllShortestPathFunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAtom?: (ctx: AtomContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteral?: (ctx: LiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.stringLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStringLiteral?: (ctx: StringLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.booleanLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.listLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitListLiteral?: (ctx: ListLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.partialComparisonExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPartialComparisonExpression?: (ctx: PartialComparisonExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.parenthesizedExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.relationshipsPattern`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRelationshipsPattern?: (ctx: RelationshipsPatternContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.filterExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFilterExpression?: (ctx: FilterExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.idInColl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdInColl?: (ctx: IdInCollContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.functionInvocation`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionInvocation?: (ctx: FunctionInvocationContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.functionInvocationBody`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionInvocationBody?: (ctx: FunctionInvocationBodyContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.functionName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunctionName?: (ctx: FunctionNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.procedureName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProcedureName?: (ctx: ProcedureNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.listComprehension`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitListComprehension?: (ctx: ListComprehensionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.patternComprehension`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPatternComprehension?: (ctx: PatternComprehensionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.propertyLookup`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyLookup?: (ctx: PropertyLookupContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.caseExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseExpression?: (ctx: CaseExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.caseAlternatives`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCaseAlternatives?: (ctx: CaseAlternativesContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.variable`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariable?: (ctx: VariableContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.numberLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNumberLiteral?: (ctx: NumberLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.mapLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMapLiteral?: (ctx: MapLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.mapProjection`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMapProjection?: (ctx: MapProjectionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.mapProjectionVariants`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMapProjectionVariants?: (ctx: MapProjectionVariantsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.literalEntry`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLiteralEntry?: (ctx: LiteralEntryContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.propertySelector`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertySelector?: (ctx: PropertySelectorContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.variableSelector`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVariableSelector?: (ctx: VariableSelectorContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.allPropertiesSelector`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAllPropertiesSelector?: (ctx: AllPropertiesSelectorContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.parameter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameter?: (ctx: ParameterContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.legacyParameter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLegacyParameter?: (ctx: LegacyParameterContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.newParameter`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNewParameter?: (ctx: NewParameterContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.parameterName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameterName?: (ctx: ParameterNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.propertyExpressions`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyExpressions?: (ctx: PropertyExpressionsContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.propertyExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyExpression?: (ctx: PropertyExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.propertyKeys`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyKeys?: (ctx: PropertyKeysContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.propertyKeyName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyKeyName?: (ctx: PropertyKeyNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.integerLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIntegerLiteral?: (ctx: IntegerLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.doubleLiteral`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDoubleLiteral?: (ctx: DoubleLiteralContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.namespace`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNamespace?: (ctx: NamespaceContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.leftArrowHead`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLeftArrowHead?: (ctx: LeftArrowHeadContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.rightArrowHead`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitRightArrowHead?: (ctx: RightArrowHeadContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.dash`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDash?: (ctx: DashContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.symbolicName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitSymbolicName?: (ctx: SymbolicNameContext) => Result;
    /**
     * Visit a parse tree produced by `CypherParser.keyword`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitKeyword?: (ctx: KeywordContext) => Result;
}
