import { ATN } from "antlr4ts/atn/ATN";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { CypherListener } from "./CypherListener";
import { CypherVisitor } from "./CypherVisitor";
export declare class CypherParser extends Parser {
    static readonly T__0 = 1;
    static readonly T__1 = 2;
    static readonly T__2 = 3;
    static readonly T__3 = 4;
    static readonly T__4 = 5;
    static readonly T__5 = 6;
    static readonly T__6 = 7;
    static readonly T__7 = 8;
    static readonly T__8 = 9;
    static readonly T__9 = 10;
    static readonly T__10 = 11;
    static readonly T__11 = 12;
    static readonly T__12 = 13;
    static readonly T__13 = 14;
    static readonly T__14 = 15;
    static readonly T__15 = 16;
    static readonly T__16 = 17;
    static readonly T__17 = 18;
    static readonly T__18 = 19;
    static readonly T__19 = 20;
    static readonly T__20 = 21;
    static readonly T__21 = 22;
    static readonly T__22 = 23;
    static readonly T__23 = 24;
    static readonly T__24 = 25;
    static readonly T__25 = 26;
    static readonly T__26 = 27;
    static readonly T__27 = 28;
    static readonly T__28 = 29;
    static readonly T__29 = 30;
    static readonly T__30 = 31;
    static readonly T__31 = 32;
    static readonly T__32 = 33;
    static readonly T__33 = 34;
    static readonly T__34 = 35;
    static readonly T__35 = 36;
    static readonly T__36 = 37;
    static readonly T__37 = 38;
    static readonly T__38 = 39;
    static readonly T__39 = 40;
    static readonly T__40 = 41;
    static readonly T__41 = 42;
    static readonly T__42 = 43;
    static readonly T__43 = 44;
    static readonly T__44 = 45;
    static readonly T__45 = 46;
    static readonly T__46 = 47;
    static readonly T__47 = 48;
    static readonly T__48 = 49;
    static readonly T__49 = 50;
    static readonly T__50 = 51;
    static readonly T__51 = 52;
    static readonly T__52 = 53;
    static readonly CYPHER = 54;
    static readonly EXPLAIN = 55;
    static readonly PROFILE = 56;
    static readonly USING = 57;
    static readonly PERIODIC = 58;
    static readonly COMMIT = 59;
    static readonly UNION = 60;
    static readonly ALL = 61;
    static readonly CREATE = 62;
    static readonly DROP = 63;
    static readonly INDEX = 64;
    static readonly ON = 65;
    static readonly CONSTRAINT = 66;
    static readonly ASSERT = 67;
    static readonly IS = 68;
    static readonly UNIQUE = 69;
    static readonly EXISTS = 70;
    static readonly LOAD = 71;
    static readonly CSV = 72;
    static readonly WITH = 73;
    static readonly HEADERS = 74;
    static readonly FROM = 75;
    static readonly AS = 76;
    static readonly FIELDTERMINATOR = 77;
    static readonly OPTIONAL = 78;
    static readonly MATCH = 79;
    static readonly UNWIND = 80;
    static readonly MERGE = 81;
    static readonly SET = 82;
    static readonly DETACH = 83;
    static readonly DELETE = 84;
    static readonly REMOVE = 85;
    static readonly FOREACH = 86;
    static readonly IN = 87;
    static readonly DISTINCT = 88;
    static readonly RETURN = 89;
    static readonly ORDER = 90;
    static readonly BY = 91;
    static readonly L_SKIP = 92;
    static readonly LIMIT = 93;
    static readonly ASCENDING = 94;
    static readonly ASC = 95;
    static readonly DESCENDING = 96;
    static readonly DESC = 97;
    static readonly JOIN = 98;
    static readonly SCAN = 99;
    static readonly START = 100;
    static readonly NODE = 101;
    static readonly RELATIONSHIP = 102;
    static readonly REL = 103;
    static readonly WHERE = 104;
    static readonly SHORTESTPATH = 105;
    static readonly ALLSHORTESTPATHS = 106;
    static readonly OR = 107;
    static readonly XOR = 108;
    static readonly AND = 109;
    static readonly NOT = 110;
    static readonly STARTS = 111;
    static readonly ENDS = 112;
    static readonly CONTAINS = 113;
    static readonly NULL = 114;
    static readonly COUNT = 115;
    static readonly FILTER = 116;
    static readonly EXTRACT = 117;
    static readonly ANY = 118;
    static readonly NONE = 119;
    static readonly SINGLE = 120;
    static readonly TRUE = 121;
    static readonly FALSE = 122;
    static readonly REDUCE = 123;
    static readonly CASE = 124;
    static readonly ELSE = 125;
    static readonly END = 126;
    static readonly WHEN = 127;
    static readonly THEN = 128;
    static readonly CALL = 129;
    static readonly YIELD = 130;
    static readonly KEY = 131;
    static readonly CATALOG = 132;
    static readonly SHOW = 133;
    static readonly DEFAULT = 134;
    static readonly DBMS = 135;
    static readonly DATABASE = 136;
    static readonly DATABASES = 137;
    static readonly GRAPH = 138;
    static readonly GRAPHS = 139;
    static readonly REPLACE = 140;
    static readonly IF = 141;
    static readonly STOP = 142;
    static readonly ROLE = 143;
    static readonly ROLES = 144;
    static readonly USER = 145;
    static readonly USERS = 146;
    static readonly POPULATED = 147;
    static readonly PASSWORD = 148;
    static readonly CHANGE = 149;
    static readonly REQUIRED = 150;
    static readonly STATUS = 151;
    static readonly ACTIVE = 152;
    static readonly SUSPENDED = 153;
    static readonly ALTER = 154;
    static readonly CURRENT = 155;
    static readonly TO = 156;
    static readonly PRIVILEGES = 157;
    static readonly GRANT = 158;
    static readonly DENY = 159;
    static readonly REVOKE = 160;
    static readonly RELATIONSHIPS = 161;
    static readonly NODES = 162;
    static readonly ELEMENT = 163;
    static readonly ELEMENTS = 164;
    static readonly COPY = 165;
    static readonly OF = 166;
    static readonly TRAVERSE = 167;
    static readonly READ = 168;
    static readonly WRITE = 169;
    static readonly ACCESS = 170;
    static readonly INDEXES = 171;
    static readonly MANAGEMENT = 172;
    static readonly NEW = 173;
    static readonly LABEL = 174;
    static readonly LABELS = 175;
    static readonly NAME = 176;
    static readonly NAMES = 177;
    static readonly TYPE = 178;
    static readonly TYPES = 179;
    static readonly PROPERTY = 180;
    static readonly CONSTRAINTS = 181;
    static readonly ASSIGN = 182;
    static readonly BTREE = 183;
    static readonly EXIST = 184;
    static readonly FOR = 185;
    static readonly OPTIONS = 186;
    static readonly EXECUTE = 187;
    static readonly DEFINED = 188;
    static readonly FUNCTION = 189;
    static readonly FUNCTIONS = 190;
    static readonly BOOSTED = 191;
    static readonly PROCEDURE = 192;
    static readonly PROCEDURES = 193;
    static readonly ADMIN = 194;
    static readonly ADMINISTRATOR = 195;
    static readonly BRIEF = 196;
    static readonly VERBOSE = 197;
    static readonly OUTPUT = 198;
    static readonly StringLiteral = 199;
    static readonly UrlHex = 200;
    static readonly EscapedChar = 201;
    static readonly HexInteger = 202;
    static readonly DecimalInteger = 203;
    static readonly OctalInteger = 204;
    static readonly HexLetter = 205;
    static readonly HexDigit = 206;
    static readonly Digit = 207;
    static readonly NonZeroDigit = 208;
    static readonly NonZeroOctDigit = 209;
    static readonly OctDigit = 210;
    static readonly ZeroDigit = 211;
    static readonly ExponentDecimalReal = 212;
    static readonly RegularDecimalReal = 213;
    static readonly UnescapedSymbolicName = 214;
    static readonly IdentifierStart = 215;
    static readonly IdentifierPart = 216;
    static readonly EscapedSymbolicName = 217;
    static readonly SP = 218;
    static readonly WHITESPACE = 219;
    static readonly Comment = 220;
    static readonly ERROR_TOKEN = 221;
    static readonly RULE_cypher = 0;
    static readonly RULE_cypherPart = 1;
    static readonly RULE_cypherConsoleCommand = 2;
    static readonly RULE_cypherConsoleCommandName = 3;
    static readonly RULE_cypherConsoleCommandParameters = 4;
    static readonly RULE_cypherConsoleCommandParameter = 5;
    static readonly RULE_arrowExpression = 6;
    static readonly RULE_url = 7;
    static readonly RULE_uri = 8;
    static readonly RULE_scheme = 9;
    static readonly RULE_host = 10;
    static readonly RULE_hostname = 11;
    static readonly RULE_hostnumber = 12;
    static readonly RULE_port = 13;
    static readonly RULE_path = 14;
    static readonly RULE_user = 15;
    static readonly RULE_login = 16;
    static readonly RULE_password = 17;
    static readonly RULE_frag = 18;
    static readonly RULE_urlQuery = 19;
    static readonly RULE_search = 20;
    static readonly RULE_searchparameter = 21;
    static readonly RULE_string = 22;
    static readonly RULE_urlDigits = 23;
    static readonly RULE_json = 24;
    static readonly RULE_obj = 25;
    static readonly RULE_pair = 26;
    static readonly RULE_array = 27;
    static readonly RULE_value = 28;
    static readonly RULE_keyValueLiteral = 29;
    static readonly RULE_commandPath = 30;
    static readonly RULE_subCommand = 31;
    static readonly RULE_cypherQuery = 32;
    static readonly RULE_queryOptions = 33;
    static readonly RULE_anyCypherOption = 34;
    static readonly RULE_cypherOption = 35;
    static readonly RULE_versionNumber = 36;
    static readonly RULE_explain = 37;
    static readonly RULE_profile = 38;
    static readonly RULE_configurationOption = 39;
    static readonly RULE_statement = 40;
    static readonly RULE_query = 41;
    static readonly RULE_regularQuery = 42;
    static readonly RULE_bulkImportQuery = 43;
    static readonly RULE_singleQuery = 44;
    static readonly RULE_periodicCommitHint = 45;
    static readonly RULE_loadCSVQuery = 46;
    static readonly RULE_union = 47;
    static readonly RULE_clause = 48;
    static readonly RULE_command = 49;
    static readonly RULE_systemCommand = 50;
    static readonly RULE_multidatabaseCommand = 51;
    static readonly RULE_userCommand = 52;
    static readonly RULE_privilegeCommand = 53;
    static readonly RULE_showRoles = 54;
    static readonly RULE_createRole = 55;
    static readonly RULE_copyRole = 56;
    static readonly RULE_dropRole = 57;
    static readonly RULE_showUsers = 58;
    static readonly RULE_createUser = 59;
    static readonly RULE_dropUser = 60;
    static readonly RULE_alterUser = 61;
    static readonly RULE_showPrivileges = 62;
    static readonly RULE_grantPrivilege = 63;
    static readonly RULE_denyPrivilege = 64;
    static readonly RULE_revokePrivilege = 65;
    static readonly RULE_revokePart = 66;
    static readonly RULE_databaseScope = 67;
    static readonly RULE_graphScope = 68;
    static readonly RULE_roles = 69;
    static readonly RULE_grantableGraphPrivileges = 70;
    static readonly RULE_revokeableGraphPrivileges = 71;
    static readonly RULE_datasbasePrivilege = 72;
    static readonly RULE_dbmsPrivilege = 73;
    static readonly RULE_elementScope = 74;
    static readonly RULE_propertiesList = 75;
    static readonly RULE_propertyScope = 76;
    static readonly RULE_showDatabase = 77;
    static readonly RULE_createDatabase = 78;
    static readonly RULE_dropDatabase = 79;
    static readonly RULE_startDatabase = 80;
    static readonly RULE_stopDatabase = 81;
    static readonly RULE_ifNotExists = 82;
    static readonly RULE_ifExists = 83;
    static readonly RULE_orReplace = 84;
    static readonly RULE_setPassword = 85;
    static readonly RULE_passwordStatus = 86;
    static readonly RULE_setStatus = 87;
    static readonly RULE_userStatus = 88;
    static readonly RULE_createUniqueConstraint = 89;
    static readonly RULE_createNodeKeyConstraint = 90;
    static readonly RULE_createNodePropertyExistenceConstraint = 91;
    static readonly RULE_createRelationshipPropertyExistenceConstraint = 92;
    static readonly RULE_createIndex = 93;
    static readonly RULE_dropUniqueConstraint = 94;
    static readonly RULE_dropNodeKeyConstraint = 95;
    static readonly RULE_dropNodePropertyExistenceConstraint = 96;
    static readonly RULE_dropRelationshipPropertyExistenceConstraint = 97;
    static readonly RULE_dropIndex = 98;
    static readonly RULE_index = 99;
    static readonly RULE_uniqueConstraint = 100;
    static readonly RULE_nodeKeyConstraint = 101;
    static readonly RULE_nodePropertyExistenceConstraint = 102;
    static readonly RULE_relationshipPropertyExistenceConstraint = 103;
    static readonly RULE_relationshipPatternSyntax = 104;
    static readonly RULE_loadCSVClause = 105;
    static readonly RULE_matchClause = 106;
    static readonly RULE_unwindClause = 107;
    static readonly RULE_mergeClause = 108;
    static readonly RULE_mergeAction = 109;
    static readonly RULE_createClause = 110;
    static readonly RULE_createUniqueClause = 111;
    static readonly RULE_setClause = 112;
    static readonly RULE_setItem = 113;
    static readonly RULE_deleteClause = 114;
    static readonly RULE_removeClause = 115;
    static readonly RULE_removeItem = 116;
    static readonly RULE_foreachClause = 117;
    static readonly RULE_withClause = 118;
    static readonly RULE_returnClause = 119;
    static readonly RULE_returnBody = 120;
    static readonly RULE_func = 121;
    static readonly RULE_returnItems = 122;
    static readonly RULE_returnItem = 123;
    static readonly RULE_call = 124;
    static readonly RULE_procedureInvocation = 125;
    static readonly RULE_procedureInvocationBody = 126;
    static readonly RULE_procedureArguments = 127;
    static readonly RULE_procedureResults = 128;
    static readonly RULE_procedureResult = 129;
    static readonly RULE_aliasedProcedureResult = 130;
    static readonly RULE_simpleProcedureResult = 131;
    static readonly RULE_procedureOutput = 132;
    static readonly RULE_order = 133;
    static readonly RULE_skip = 134;
    static readonly RULE_limit = 135;
    static readonly RULE_sortItem = 136;
    static readonly RULE_hint = 137;
    static readonly RULE_startClause = 138;
    static readonly RULE_startPoint = 139;
    static readonly RULE_lookup = 140;
    static readonly RULE_nodeLookup = 141;
    static readonly RULE_relationshipLookup = 142;
    static readonly RULE_identifiedIndexLookup = 143;
    static readonly RULE_indexQuery = 144;
    static readonly RULE_idLookup = 145;
    static readonly RULE_literalIds = 146;
    static readonly RULE_where = 147;
    static readonly RULE_pattern = 148;
    static readonly RULE_patternPart = 149;
    static readonly RULE_anonymousPatternPart = 150;
    static readonly RULE_patternElement = 151;
    static readonly RULE_nodePattern = 152;
    static readonly RULE_patternElementChain = 153;
    static readonly RULE_relationshipPattern = 154;
    static readonly RULE_relationshipPatternStart = 155;
    static readonly RULE_relationshipPatternEnd = 156;
    static readonly RULE_relationshipDetail = 157;
    static readonly RULE_properties = 158;
    static readonly RULE_relType = 159;
    static readonly RULE_relationshipTypes = 160;
    static readonly RULE_relationshipType = 161;
    static readonly RULE_relationshipTypeOptionalColon = 162;
    static readonly RULE_nodeLabels = 163;
    static readonly RULE_nodeLabel = 164;
    static readonly RULE_rangeLiteral = 165;
    static readonly RULE_labelName = 166;
    static readonly RULE_relTypeName = 167;
    static readonly RULE_expression = 168;
    static readonly RULE_orExpression = 169;
    static readonly RULE_xorExpression = 170;
    static readonly RULE_andExpression = 171;
    static readonly RULE_notExpression = 172;
    static readonly RULE_comparisonExpression = 173;
    static readonly RULE_addOrSubtractExpression = 174;
    static readonly RULE_multiplyDivideModuloExpression = 175;
    static readonly RULE_powerOfExpression = 176;
    static readonly RULE_unaryAddOrSubtractExpression = 177;
    static readonly RULE_stringListNullOperatorExpression = 178;
    static readonly RULE_propertyOrLabelsExpression = 179;
    static readonly RULE_filterFunction = 180;
    static readonly RULE_filterFunctionName = 181;
    static readonly RULE_existsFunction = 182;
    static readonly RULE_existsFunctionName = 183;
    static readonly RULE_allFunction = 184;
    static readonly RULE_allFunctionName = 185;
    static readonly RULE_anyFunction = 186;
    static readonly RULE_anyFunctionName = 187;
    static readonly RULE_noneFunction = 188;
    static readonly RULE_noneFunctionName = 189;
    static readonly RULE_singleFunction = 190;
    static readonly RULE_singleFunctionName = 191;
    static readonly RULE_extractFunction = 192;
    static readonly RULE_extractFunctionName = 193;
    static readonly RULE_reduceFunction = 194;
    static readonly RULE_reduceFunctionName = 195;
    static readonly RULE_shortestPathPatternFunction = 196;
    static readonly RULE_shortestPathFunctionName = 197;
    static readonly RULE_allShortestPathFunctionName = 198;
    static readonly RULE_atom = 199;
    static readonly RULE_literal = 200;
    static readonly RULE_stringLiteral = 201;
    static readonly RULE_booleanLiteral = 202;
    static readonly RULE_listLiteral = 203;
    static readonly RULE_partialComparisonExpression = 204;
    static readonly RULE_parenthesizedExpression = 205;
    static readonly RULE_relationshipsPattern = 206;
    static readonly RULE_filterExpression = 207;
    static readonly RULE_idInColl = 208;
    static readonly RULE_functionInvocation = 209;
    static readonly RULE_functionInvocationBody = 210;
    static readonly RULE_functionName = 211;
    static readonly RULE_procedureName = 212;
    static readonly RULE_listComprehension = 213;
    static readonly RULE_patternComprehension = 214;
    static readonly RULE_propertyLookup = 215;
    static readonly RULE_caseExpression = 216;
    static readonly RULE_caseAlternatives = 217;
    static readonly RULE_variable = 218;
    static readonly RULE_numberLiteral = 219;
    static readonly RULE_mapLiteral = 220;
    static readonly RULE_mapProjection = 221;
    static readonly RULE_mapProjectionVariants = 222;
    static readonly RULE_literalEntry = 223;
    static readonly RULE_propertySelector = 224;
    static readonly RULE_variableSelector = 225;
    static readonly RULE_allPropertiesSelector = 226;
    static readonly RULE_parameter = 227;
    static readonly RULE_legacyParameter = 228;
    static readonly RULE_newParameter = 229;
    static readonly RULE_parameterName = 230;
    static readonly RULE_propertyExpressions = 231;
    static readonly RULE_propertyExpression = 232;
    static readonly RULE_propertyKeys = 233;
    static readonly RULE_propertyKeyName = 234;
    static readonly RULE_integerLiteral = 235;
    static readonly RULE_doubleLiteral = 236;
    static readonly RULE_namespace = 237;
    static readonly RULE_leftArrowHead = 238;
    static readonly RULE_rightArrowHead = 239;
    static readonly RULE_dash = 240;
    static readonly RULE_symbolicName = 241;
    static readonly RULE_keyword = 242;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    get vocabulary(): Vocabulary;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException;
    constructor(input: TokenStream);
    cypher(): CypherContext;
    cypherPart(): CypherPartContext;
    cypherConsoleCommand(): CypherConsoleCommandContext;
    cypherConsoleCommandName(): CypherConsoleCommandNameContext;
    cypherConsoleCommandParameters(): CypherConsoleCommandParametersContext;
    cypherConsoleCommandParameter(): CypherConsoleCommandParameterContext;
    arrowExpression(): ArrowExpressionContext;
    url(): UrlContext;
    uri(): UriContext;
    scheme(): SchemeContext;
    host(): HostContext;
    hostname(): HostnameContext;
    hostnumber(): HostnumberContext;
    port(): PortContext;
    path(): PathContext;
    user(): UserContext;
    login(): LoginContext;
    password(): PasswordContext;
    frag(): FragContext;
    urlQuery(): UrlQueryContext;
    search(): SearchContext;
    searchparameter(): SearchparameterContext;
    string(): StringContext;
    urlDigits(): UrlDigitsContext;
    json(): JsonContext;
    obj(): ObjContext;
    pair(): PairContext;
    array(): ArrayContext;
    value(): ValueContext;
    keyValueLiteral(): KeyValueLiteralContext;
    commandPath(): CommandPathContext;
    subCommand(): SubCommandContext;
    cypherQuery(): CypherQueryContext;
    queryOptions(): QueryOptionsContext;
    anyCypherOption(): AnyCypherOptionContext;
    cypherOption(): CypherOptionContext;
    versionNumber(): VersionNumberContext;
    explain(): ExplainContext;
    profile(): ProfileContext;
    configurationOption(): ConfigurationOptionContext;
    statement(): StatementContext;
    query(): QueryContext;
    regularQuery(): RegularQueryContext;
    bulkImportQuery(): BulkImportQueryContext;
    singleQuery(): SingleQueryContext;
    periodicCommitHint(): PeriodicCommitHintContext;
    loadCSVQuery(): LoadCSVQueryContext;
    union(): UnionContext;
    clause(): ClauseContext;
    command(): CommandContext;
    systemCommand(): SystemCommandContext;
    multidatabaseCommand(): MultidatabaseCommandContext;
    userCommand(): UserCommandContext;
    privilegeCommand(): PrivilegeCommandContext;
    showRoles(): ShowRolesContext;
    createRole(): CreateRoleContext;
    copyRole(): CopyRoleContext;
    dropRole(): DropRoleContext;
    showUsers(): ShowUsersContext;
    createUser(): CreateUserContext;
    dropUser(): DropUserContext;
    alterUser(): AlterUserContext;
    showPrivileges(): ShowPrivilegesContext;
    grantPrivilege(): GrantPrivilegeContext;
    denyPrivilege(): DenyPrivilegeContext;
    revokePrivilege(): RevokePrivilegeContext;
    revokePart(): RevokePartContext;
    databaseScope(): DatabaseScopeContext;
    graphScope(): GraphScopeContext;
    roles(): RolesContext;
    grantableGraphPrivileges(): GrantableGraphPrivilegesContext;
    revokeableGraphPrivileges(): RevokeableGraphPrivilegesContext;
    datasbasePrivilege(): DatasbasePrivilegeContext;
    dbmsPrivilege(): DbmsPrivilegeContext;
    elementScope(): ElementScopeContext;
    propertiesList(): PropertiesListContext;
    propertyScope(): PropertyScopeContext;
    showDatabase(): ShowDatabaseContext;
    createDatabase(): CreateDatabaseContext;
    dropDatabase(): DropDatabaseContext;
    startDatabase(): StartDatabaseContext;
    stopDatabase(): StopDatabaseContext;
    ifNotExists(): IfNotExistsContext;
    ifExists(): IfExistsContext;
    orReplace(): OrReplaceContext;
    setPassword(): SetPasswordContext;
    passwordStatus(): PasswordStatusContext;
    setStatus(): SetStatusContext;
    userStatus(): UserStatusContext;
    createUniqueConstraint(): CreateUniqueConstraintContext;
    createNodeKeyConstraint(): CreateNodeKeyConstraintContext;
    createNodePropertyExistenceConstraint(): CreateNodePropertyExistenceConstraintContext;
    createRelationshipPropertyExistenceConstraint(): CreateRelationshipPropertyExistenceConstraintContext;
    createIndex(): CreateIndexContext;
    dropUniqueConstraint(): DropUniqueConstraintContext;
    dropNodeKeyConstraint(): DropNodeKeyConstraintContext;
    dropNodePropertyExistenceConstraint(): DropNodePropertyExistenceConstraintContext;
    dropRelationshipPropertyExistenceConstraint(): DropRelationshipPropertyExistenceConstraintContext;
    dropIndex(): DropIndexContext;
    index(): IndexContext;
    uniqueConstraint(): UniqueConstraintContext;
    nodeKeyConstraint(): NodeKeyConstraintContext;
    nodePropertyExistenceConstraint(): NodePropertyExistenceConstraintContext;
    relationshipPropertyExistenceConstraint(): RelationshipPropertyExistenceConstraintContext;
    relationshipPatternSyntax(): RelationshipPatternSyntaxContext;
    loadCSVClause(): LoadCSVClauseContext;
    matchClause(): MatchClauseContext;
    unwindClause(): UnwindClauseContext;
    mergeClause(): MergeClauseContext;
    mergeAction(): MergeActionContext;
    createClause(): CreateClauseContext;
    createUniqueClause(): CreateUniqueClauseContext;
    setClause(): SetClauseContext;
    setItem(): SetItemContext;
    deleteClause(): DeleteClauseContext;
    removeClause(): RemoveClauseContext;
    removeItem(): RemoveItemContext;
    foreachClause(): ForeachClauseContext;
    withClause(): WithClauseContext;
    returnClause(): ReturnClauseContext;
    returnBody(): ReturnBodyContext;
    func(): FuncContext;
    returnItems(): ReturnItemsContext;
    returnItem(): ReturnItemContext;
    call(): CallContext;
    procedureInvocation(): ProcedureInvocationContext;
    procedureInvocationBody(): ProcedureInvocationBodyContext;
    procedureArguments(): ProcedureArgumentsContext;
    procedureResults(): ProcedureResultsContext;
    procedureResult(): ProcedureResultContext;
    aliasedProcedureResult(): AliasedProcedureResultContext;
    simpleProcedureResult(): SimpleProcedureResultContext;
    procedureOutput(): ProcedureOutputContext;
    order(): OrderContext;
    skip(): SkipContext;
    limit(): LimitContext;
    sortItem(): SortItemContext;
    hint(): HintContext;
    startClause(): StartClauseContext;
    startPoint(): StartPointContext;
    lookup(): LookupContext;
    nodeLookup(): NodeLookupContext;
    relationshipLookup(): RelationshipLookupContext;
    identifiedIndexLookup(): IdentifiedIndexLookupContext;
    indexQuery(): IndexQueryContext;
    idLookup(): IdLookupContext;
    literalIds(): LiteralIdsContext;
    where(): WhereContext;
    pattern(): PatternContext;
    patternPart(): PatternPartContext;
    anonymousPatternPart(): AnonymousPatternPartContext;
    patternElement(): PatternElementContext;
    nodePattern(): NodePatternContext;
    patternElementChain(): PatternElementChainContext;
    relationshipPattern(): RelationshipPatternContext;
    relationshipPatternStart(): RelationshipPatternStartContext;
    relationshipPatternEnd(): RelationshipPatternEndContext;
    relationshipDetail(): RelationshipDetailContext;
    properties(): PropertiesContext;
    relType(): RelTypeContext;
    relationshipTypes(): RelationshipTypesContext;
    relationshipType(): RelationshipTypeContext;
    relationshipTypeOptionalColon(): RelationshipTypeOptionalColonContext;
    nodeLabels(): NodeLabelsContext;
    nodeLabel(): NodeLabelContext;
    rangeLiteral(): RangeLiteralContext;
    labelName(): LabelNameContext;
    relTypeName(): RelTypeNameContext;
    expression(): ExpressionContext;
    orExpression(): OrExpressionContext;
    xorExpression(): XorExpressionContext;
    andExpression(): AndExpressionContext;
    notExpression(): NotExpressionContext;
    comparisonExpression(): ComparisonExpressionContext;
    addOrSubtractExpression(): AddOrSubtractExpressionContext;
    multiplyDivideModuloExpression(): MultiplyDivideModuloExpressionContext;
    powerOfExpression(): PowerOfExpressionContext;
    unaryAddOrSubtractExpression(): UnaryAddOrSubtractExpressionContext;
    stringListNullOperatorExpression(): StringListNullOperatorExpressionContext;
    propertyOrLabelsExpression(): PropertyOrLabelsExpressionContext;
    filterFunction(): FilterFunctionContext;
    filterFunctionName(): FilterFunctionNameContext;
    existsFunction(): ExistsFunctionContext;
    existsFunctionName(): ExistsFunctionNameContext;
    allFunction(): AllFunctionContext;
    allFunctionName(): AllFunctionNameContext;
    anyFunction(): AnyFunctionContext;
    anyFunctionName(): AnyFunctionNameContext;
    noneFunction(): NoneFunctionContext;
    noneFunctionName(): NoneFunctionNameContext;
    singleFunction(): SingleFunctionContext;
    singleFunctionName(): SingleFunctionNameContext;
    extractFunction(): ExtractFunctionContext;
    extractFunctionName(): ExtractFunctionNameContext;
    reduceFunction(): ReduceFunctionContext;
    reduceFunctionName(): ReduceFunctionNameContext;
    shortestPathPatternFunction(): ShortestPathPatternFunctionContext;
    shortestPathFunctionName(): ShortestPathFunctionNameContext;
    allShortestPathFunctionName(): AllShortestPathFunctionNameContext;
    atom(): AtomContext;
    literal(): LiteralContext;
    stringLiteral(): StringLiteralContext;
    booleanLiteral(): BooleanLiteralContext;
    listLiteral(): ListLiteralContext;
    partialComparisonExpression(): PartialComparisonExpressionContext;
    parenthesizedExpression(): ParenthesizedExpressionContext;
    relationshipsPattern(): RelationshipsPatternContext;
    filterExpression(): FilterExpressionContext;
    idInColl(): IdInCollContext;
    functionInvocation(): FunctionInvocationContext;
    functionInvocationBody(): FunctionInvocationBodyContext;
    functionName(): FunctionNameContext;
    procedureName(): ProcedureNameContext;
    listComprehension(): ListComprehensionContext;
    patternComprehension(): PatternComprehensionContext;
    propertyLookup(): PropertyLookupContext;
    caseExpression(): CaseExpressionContext;
    caseAlternatives(): CaseAlternativesContext;
    variable(): VariableContext;
    numberLiteral(): NumberLiteralContext;
    mapLiteral(): MapLiteralContext;
    mapProjection(): MapProjectionContext;
    mapProjectionVariants(): MapProjectionVariantsContext;
    literalEntry(): LiteralEntryContext;
    propertySelector(): PropertySelectorContext;
    variableSelector(): VariableSelectorContext;
    allPropertiesSelector(): AllPropertiesSelectorContext;
    parameter(): ParameterContext;
    legacyParameter(): LegacyParameterContext;
    newParameter(): NewParameterContext;
    parameterName(): ParameterNameContext;
    propertyExpressions(): PropertyExpressionsContext;
    propertyExpression(): PropertyExpressionContext;
    propertyKeys(): PropertyKeysContext;
    propertyKeyName(): PropertyKeyNameContext;
    integerLiteral(): IntegerLiteralContext;
    doubleLiteral(): DoubleLiteralContext;
    namespace(): NamespaceContext;
    leftArrowHead(): LeftArrowHeadContext;
    rightArrowHead(): RightArrowHeadContext;
    dash(): DashContext;
    symbolicName(): SymbolicNameContext;
    keyword(): KeywordContext;
    private static readonly _serializedATNSegments;
    private static readonly _serializedATNSegment0;
    private static readonly _serializedATNSegment1;
    private static readonly _serializedATNSegment2;
    private static readonly _serializedATNSegment3;
    private static readonly _serializedATNSegment4;
    private static readonly _serializedATNSegment5;
    private static readonly _serializedATNSegment6;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static get _ATN(): ATN;
}
export declare class CypherContext extends ParserRuleContext {
    cypherPart(): CypherPartContext[];
    cypherPart(i: number): CypherPartContext;
    EOF(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CypherPartContext extends ParserRuleContext {
    cypherQuery(): CypherQueryContext | undefined;
    cypherConsoleCommand(): CypherConsoleCommandContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CypherConsoleCommandContext extends ParserRuleContext {
    cypherConsoleCommandName(): CypherConsoleCommandNameContext;
    SP(): TerminalNode | undefined;
    cypherConsoleCommandParameters(): CypherConsoleCommandParametersContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CypherConsoleCommandNameContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CypherConsoleCommandParametersContext extends ParserRuleContext {
    cypherConsoleCommandParameter(): CypherConsoleCommandParameterContext[];
    cypherConsoleCommandParameter(i: number): CypherConsoleCommandParameterContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CypherConsoleCommandParameterContext extends ParserRuleContext {
    url(): UrlContext | undefined;
    json(): JsonContext | undefined;
    arrowExpression(): ArrowExpressionContext | undefined;
    mapLiteral(): MapLiteralContext | undefined;
    keyValueLiteral(): KeyValueLiteralContext | undefined;
    stringLiteral(): StringLiteralContext | undefined;
    numberLiteral(): NumberLiteralContext | undefined;
    booleanLiteral(): BooleanLiteralContext | undefined;
    subCommand(): SubCommandContext | undefined;
    commandPath(): CommandPathContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ArrowExpressionContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext;
    expression(): ExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UrlContext extends ParserRuleContext {
    uri(): UriContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UriContext extends ParserRuleContext {
    scheme(): SchemeContext;
    host(): HostContext;
    login(): LoginContext | undefined;
    port(): PortContext | undefined;
    path(): PathContext | undefined;
    urlQuery(): UrlQueryContext | undefined;
    frag(): FragContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SchemeContext extends ParserRuleContext {
    string(): StringContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class HostContext extends ParserRuleContext {
    hostname(): HostnameContext | undefined;
    hostnumber(): HostnumberContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class HostnameContext extends ParserRuleContext {
    string(): StringContext[];
    string(i: number): StringContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class HostnumberContext extends ParserRuleContext {
    urlDigits(): UrlDigitsContext[];
    urlDigits(i: number): UrlDigitsContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PortContext extends ParserRuleContext {
    urlDigits(): UrlDigitsContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PathContext extends ParserRuleContext {
    string(): StringContext[];
    string(i: number): StringContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UserContext extends ParserRuleContext {
    string(): StringContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LoginContext extends ParserRuleContext {
    user(): UserContext;
    password(): PasswordContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PasswordContext extends ParserRuleContext {
    string(): StringContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class FragContext extends ParserRuleContext {
    string(): StringContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UrlQueryContext extends ParserRuleContext {
    search(): SearchContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SearchContext extends ParserRuleContext {
    searchparameter(): SearchparameterContext[];
    searchparameter(i: number): SearchparameterContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SearchparameterContext extends ParserRuleContext {
    string(): StringContext[];
    string(i: number): StringContext;
    urlDigits(): UrlDigitsContext | undefined;
    UrlHex(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class StringContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UrlDigitsContext extends ParserRuleContext {
    integerLiteral(): IntegerLiteralContext[];
    integerLiteral(i: number): IntegerLiteralContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class JsonContext extends ParserRuleContext {
    value(): ValueContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ObjContext extends ParserRuleContext {
    pair(): PairContext[];
    pair(i: number): PairContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PairContext extends ParserRuleContext {
    stringLiteral(): StringLiteralContext;
    value(): ValueContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ArrayContext extends ParserRuleContext {
    value(): ValueContext[];
    value(i: number): ValueContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ValueContext extends ParserRuleContext {
    stringLiteral(): StringLiteralContext | undefined;
    numberLiteral(): NumberLiteralContext | undefined;
    obj(): ObjContext | undefined;
    array(): ArrayContext | undefined;
    booleanLiteral(): BooleanLiteralContext | undefined;
    NULL(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class KeyValueLiteralContext extends ParserRuleContext {
    variable(): VariableContext;
    SP(): TerminalNode;
    StringLiteral(): TerminalNode | undefined;
    numberLiteral(): NumberLiteralContext | undefined;
    booleanLiteral(): BooleanLiteralContext | undefined;
    symbolicName(): SymbolicNameContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CommandPathContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    numberLiteral(): NumberLiteralContext[];
    numberLiteral(i: number): NumberLiteralContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SubCommandContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CypherQueryContext extends ParserRuleContext {
    queryOptions(): QueryOptionsContext;
    statement(): StatementContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class QueryOptionsContext extends ParserRuleContext {
    anyCypherOption(): AnyCypherOptionContext[];
    anyCypherOption(i: number): AnyCypherOptionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AnyCypherOptionContext extends ParserRuleContext {
    cypherOption(): CypherOptionContext | undefined;
    explain(): ExplainContext | undefined;
    profile(): ProfileContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CypherOptionContext extends ParserRuleContext {
    CYPHER(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    versionNumber(): VersionNumberContext | undefined;
    configurationOption(): ConfigurationOptionContext[];
    configurationOption(i: number): ConfigurationOptionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class VersionNumberContext extends ParserRuleContext {
    RegularDecimalReal(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ExplainContext extends ParserRuleContext {
    EXPLAIN(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ProfileContext extends ParserRuleContext {
    PROFILE(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ConfigurationOptionContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class StatementContext extends ParserRuleContext {
    command(): CommandContext | undefined;
    query(): QueryContext | undefined;
    systemCommand(): SystemCommandContext | undefined;
    CATALOG(): TerminalNode | undefined;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class QueryContext extends ParserRuleContext {
    regularQuery(): RegularQueryContext | undefined;
    bulkImportQuery(): BulkImportQueryContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RegularQueryContext extends ParserRuleContext {
    singleQuery(): SingleQueryContext;
    union(): UnionContext[];
    union(i: number): UnionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class BulkImportQueryContext extends ParserRuleContext {
    periodicCommitHint(): PeriodicCommitHintContext;
    loadCSVQuery(): LoadCSVQueryContext;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SingleQueryContext extends ParserRuleContext {
    clause(): ClauseContext[];
    clause(i: number): ClauseContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PeriodicCommitHintContext extends ParserRuleContext {
    USING(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    PERIODIC(): TerminalNode;
    COMMIT(): TerminalNode;
    integerLiteral(): IntegerLiteralContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LoadCSVQueryContext extends ParserRuleContext {
    loadCSVClause(): LoadCSVClauseContext;
    clause(): ClauseContext[];
    clause(i: number): ClauseContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UnionContext extends ParserRuleContext {
    UNION(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ALL(): TerminalNode | undefined;
    singleQuery(): SingleQueryContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ClauseContext extends ParserRuleContext {
    loadCSVClause(): LoadCSVClauseContext | undefined;
    startClause(): StartClauseContext | undefined;
    matchClause(): MatchClauseContext | undefined;
    unwindClause(): UnwindClauseContext | undefined;
    mergeClause(): MergeClauseContext | undefined;
    createClause(): CreateClauseContext | undefined;
    createUniqueClause(): CreateUniqueClauseContext | undefined;
    setClause(): SetClauseContext | undefined;
    deleteClause(): DeleteClauseContext | undefined;
    removeClause(): RemoveClauseContext | undefined;
    foreachClause(): ForeachClauseContext | undefined;
    withClause(): WithClauseContext | undefined;
    returnClause(): ReturnClauseContext | undefined;
    call(): CallContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CommandContext extends ParserRuleContext {
    createIndex(): CreateIndexContext | undefined;
    dropIndex(): DropIndexContext | undefined;
    createUniqueConstraint(): CreateUniqueConstraintContext | undefined;
    dropUniqueConstraint(): DropUniqueConstraintContext | undefined;
    createNodeKeyConstraint(): CreateNodeKeyConstraintContext | undefined;
    dropNodeKeyConstraint(): DropNodeKeyConstraintContext | undefined;
    createNodePropertyExistenceConstraint(): CreateNodePropertyExistenceConstraintContext | undefined;
    dropNodePropertyExistenceConstraint(): DropNodePropertyExistenceConstraintContext | undefined;
    createRelationshipPropertyExistenceConstraint(): CreateRelationshipPropertyExistenceConstraintContext | undefined;
    dropRelationshipPropertyExistenceConstraint(): DropRelationshipPropertyExistenceConstraintContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SystemCommandContext extends ParserRuleContext {
    multidatabaseCommand(): MultidatabaseCommandContext | undefined;
    userCommand(): UserCommandContext | undefined;
    privilegeCommand(): PrivilegeCommandContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class MultidatabaseCommandContext extends ParserRuleContext {
    showDatabase(): ShowDatabaseContext | undefined;
    createDatabase(): CreateDatabaseContext | undefined;
    dropDatabase(): DropDatabaseContext | undefined;
    startDatabase(): StartDatabaseContext | undefined;
    stopDatabase(): StopDatabaseContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UserCommandContext extends ParserRuleContext {
    showRoles(): ShowRolesContext | undefined;
    createRole(): CreateRoleContext | undefined;
    dropRole(): DropRoleContext | undefined;
    showUsers(): ShowUsersContext | undefined;
    createUser(): CreateUserContext | undefined;
    dropUser(): DropUserContext | undefined;
    alterUser(): AlterUserContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PrivilegeCommandContext extends ParserRuleContext {
    showPrivileges(): ShowPrivilegesContext | undefined;
    grantPrivilege(): GrantPrivilegeContext | undefined;
    denyPrivilege(): DenyPrivilegeContext | undefined;
    revokePrivilege(): RevokePrivilegeContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ShowRolesContext extends ParserRuleContext {
    SHOW(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ROLES(): TerminalNode;
    ALL(): TerminalNode | undefined;
    WITH(): TerminalNode | undefined;
    USERS(): TerminalNode | undefined;
    POPULATED(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateRoleContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ROLE(): TerminalNode;
    symbolicName(): SymbolicNameContext;
    ifNotExists(): IfNotExistsContext | undefined;
    copyRole(): CopyRoleContext | undefined;
    orReplace(): OrReplaceContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CopyRoleContext extends ParserRuleContext {
    AS(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    COPY(): TerminalNode;
    OF(): TerminalNode;
    symbolicName(): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DropRoleContext extends ParserRuleContext {
    DROP(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ROLE(): TerminalNode;
    symbolicName(): SymbolicNameContext;
    IF(): TerminalNode | undefined;
    EXISTS(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ShowUsersContext extends ParserRuleContext {
    SHOW(): TerminalNode;
    SP(): TerminalNode;
    USERS(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateUserContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    USER(): TerminalNode;
    user(): UserContext;
    setPassword(): SetPasswordContext;
    ifNotExists(): IfNotExistsContext | undefined;
    setStatus(): SetStatusContext | undefined;
    orReplace(): OrReplaceContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DropUserContext extends ParserRuleContext {
    DROP(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    USER(): TerminalNode;
    user(): UserContext;
    ifExists(): IfExistsContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AlterUserContext extends ParserRuleContext {
    ALTER(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    CURRENT(): TerminalNode | undefined;
    USER(): TerminalNode;
    SET(): TerminalNode | undefined;
    PASSWORD(): TerminalNode | undefined;
    FROM(): TerminalNode | undefined;
    TO(): TerminalNode | undefined;
    password(): PasswordContext[];
    password(i: number): PasswordContext;
    parameter(): ParameterContext[];
    parameter(i: number): ParameterContext;
    user(): UserContext | undefined;
    setPassword(): SetPasswordContext | undefined;
    setStatus(): SetStatusContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ShowPrivilegesContext extends ParserRuleContext {
    SHOW(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    PRIVILEGES(): TerminalNode;
    ALL(): TerminalNode | undefined;
    ROLE(): TerminalNode | undefined;
    symbolicName(): SymbolicNameContext | undefined;
    USER(): TerminalNode | undefined;
    user(): UserContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class GrantPrivilegeContext extends ParserRuleContext {
    GRANT(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ROLE(): TerminalNode | undefined;
    roles(): RolesContext;
    TO(): TerminalNode;
    user(): UserContext | undefined;
    datasbasePrivilege(): DatasbasePrivilegeContext | undefined;
    ON(): TerminalNode | undefined;
    databaseScope(): DatabaseScopeContext | undefined;
    grantableGraphPrivileges(): GrantableGraphPrivilegesContext | undefined;
    graphScope(): GraphScopeContext | undefined;
    elementScope(): ElementScopeContext | undefined;
    dbmsPrivilege(): DbmsPrivilegeContext | undefined;
    DBMS(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DenyPrivilegeContext extends ParserRuleContext {
    DENY(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ROLE(): TerminalNode | undefined;
    roles(): RolesContext;
    TO(): TerminalNode;
    user(): UserContext | undefined;
    datasbasePrivilege(): DatasbasePrivilegeContext | undefined;
    ON(): TerminalNode | undefined;
    databaseScope(): DatabaseScopeContext | undefined;
    grantableGraphPrivileges(): GrantableGraphPrivilegesContext | undefined;
    graphScope(): GraphScopeContext | undefined;
    elementScope(): ElementScopeContext | undefined;
    dbmsPrivilege(): DbmsPrivilegeContext | undefined;
    DBMS(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RevokePrivilegeContext extends ParserRuleContext {
    REVOKE(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ROLE(): TerminalNode | undefined;
    roles(): RolesContext;
    FROM(): TerminalNode;
    user(): UserContext | undefined;
    revokePart(): RevokePartContext | undefined;
    GRANT(): TerminalNode | undefined;
    DENY(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RevokePartContext extends ParserRuleContext {
    datasbasePrivilege(): DatasbasePrivilegeContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ON(): TerminalNode;
    databaseScope(): DatabaseScopeContext | undefined;
    revokeableGraphPrivileges(): RevokeableGraphPrivilegesContext | undefined;
    graphScope(): GraphScopeContext | undefined;
    dbmsPrivilege(): DbmsPrivilegeContext | undefined;
    DBMS(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DatabaseScopeContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    DATABASE(): TerminalNode | undefined;
    DATABASES(): TerminalNode | undefined;
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class GraphScopeContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    GRAPH(): TerminalNode | undefined;
    GRAPHS(): TerminalNode | undefined;
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RolesContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class GrantableGraphPrivilegesContext extends ParserRuleContext {
    revokeableGraphPrivileges(): RevokeableGraphPrivilegesContext | undefined;
    MATCH(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    propertiesList(): PropertiesListContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RevokeableGraphPrivilegesContext extends ParserRuleContext {
    TRAVERSE(): TerminalNode | undefined;
    READ(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    propertiesList(): PropertiesListContext | undefined;
    WRITE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DatasbasePrivilegeContext extends ParserRuleContext {
    ACCESS(): TerminalNode | undefined;
    START(): TerminalNode | undefined;
    STOP(): TerminalNode | undefined;
    CREATE(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    INDEX(): TerminalNode | undefined;
    INDEXES(): TerminalNode | undefined;
    DROP(): TerminalNode | undefined;
    MANAGEMENT(): TerminalNode | undefined;
    CONSTRAINT(): TerminalNode | undefined;
    CONSTRAINTS(): TerminalNode | undefined;
    NEW(): TerminalNode | undefined;
    LABEL(): TerminalNode | undefined;
    LABELS(): TerminalNode | undefined;
    NODE(): TerminalNode | undefined;
    TYPE(): TerminalNode | undefined;
    TYPES(): TerminalNode | undefined;
    RELATIONSHIP(): TerminalNode | undefined;
    NAME(): TerminalNode | undefined;
    NAMES(): TerminalNode | undefined;
    PROPERTY(): TerminalNode | undefined;
    ALL(): TerminalNode | undefined;
    PRIVILEGES(): TerminalNode | undefined;
    DATABASE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DbmsPrivilegeContext extends ParserRuleContext {
    ROLE(): TerminalNode;
    SP(): TerminalNode;
    MANAGEMENT(): TerminalNode | undefined;
    CREATE(): TerminalNode | undefined;
    DROP(): TerminalNode | undefined;
    ASSIGN(): TerminalNode | undefined;
    REMOVE(): TerminalNode | undefined;
    SHOW(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ElementScopeContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    propertiesList(): PropertiesListContext;
    RELATIONSHIP(): TerminalNode | undefined;
    RELATIONSHIPS(): TerminalNode | undefined;
    propertyScope(): PropertyScopeContext | undefined;
    NODE(): TerminalNode | undefined;
    NODES(): TerminalNode | undefined;
    ELEMENT(): TerminalNode | undefined;
    ELEMENTS(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertiesListContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertyScopeContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ShowDatabaseContext extends ParserRuleContext {
    SHOW(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    DATABASE(): TerminalNode | undefined;
    DEFAULT(): TerminalNode | undefined;
    DATABASES(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateDatabaseContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    DATABASE(): TerminalNode;
    symbolicName(): SymbolicNameContext;
    ifNotExists(): IfNotExistsContext | undefined;
    orReplace(): OrReplaceContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DropDatabaseContext extends ParserRuleContext {
    DROP(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    DATABASE(): TerminalNode;
    symbolicName(): SymbolicNameContext;
    ifExists(): IfExistsContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class StartDatabaseContext extends ParserRuleContext {
    START(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    DATABASE(): TerminalNode;
    symbolicName(): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class StopDatabaseContext extends ParserRuleContext {
    STOP(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    DATABASE(): TerminalNode;
    symbolicName(): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class IfNotExistsContext extends ParserRuleContext {
    IF(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    NOT(): TerminalNode;
    EXISTS(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class IfExistsContext extends ParserRuleContext {
    IF(): TerminalNode;
    SP(): TerminalNode;
    EXISTS(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class OrReplaceContext extends ParserRuleContext {
    OR(): TerminalNode;
    SP(): TerminalNode;
    REPLACE(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SetPasswordContext extends ParserRuleContext {
    SET(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    PASSWORD(): TerminalNode;
    password(): PasswordContext | undefined;
    parameter(): ParameterContext | undefined;
    passwordStatus(): PasswordStatusContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PasswordStatusContext extends ParserRuleContext {
    CHANGE(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    REQUIRED(): TerminalNode;
    NOT(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SetStatusContext extends ParserRuleContext {
    SET(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    STATUS(): TerminalNode;
    userStatus(): UserStatusContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UserStatusContext extends ParserRuleContext {
    ACTIVE(): TerminalNode | undefined;
    SUSPENDED(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateUniqueConstraintContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    SP(): TerminalNode;
    uniqueConstraint(): UniqueConstraintContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateNodeKeyConstraintContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    SP(): TerminalNode;
    nodeKeyConstraint(): NodeKeyConstraintContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateNodePropertyExistenceConstraintContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    SP(): TerminalNode;
    nodePropertyExistenceConstraint(): NodePropertyExistenceConstraintContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateRelationshipPropertyExistenceConstraintContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    SP(): TerminalNode;
    relationshipPropertyExistenceConstraint(): RelationshipPropertyExistenceConstraintContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateIndexContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    SP(): TerminalNode;
    index(): IndexContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DropUniqueConstraintContext extends ParserRuleContext {
    DROP(): TerminalNode;
    SP(): TerminalNode;
    uniqueConstraint(): UniqueConstraintContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DropNodeKeyConstraintContext extends ParserRuleContext {
    DROP(): TerminalNode;
    SP(): TerminalNode;
    nodeKeyConstraint(): NodeKeyConstraintContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DropNodePropertyExistenceConstraintContext extends ParserRuleContext {
    DROP(): TerminalNode;
    SP(): TerminalNode;
    nodePropertyExistenceConstraint(): NodePropertyExistenceConstraintContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DropRelationshipPropertyExistenceConstraintContext extends ParserRuleContext {
    DROP(): TerminalNode;
    SP(): TerminalNode;
    relationshipPropertyExistenceConstraint(): RelationshipPropertyExistenceConstraintContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DropIndexContext extends ParserRuleContext {
    DROP(): TerminalNode;
    SP(): TerminalNode;
    index(): IndexContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class IndexContext extends ParserRuleContext {
    INDEX(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ON(): TerminalNode;
    nodeLabel(): NodeLabelContext;
    propertyKeys(): PropertyKeysContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UniqueConstraintContext extends ParserRuleContext {
    CONSTRAINT(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ON(): TerminalNode;
    variable(): VariableContext;
    nodeLabel(): NodeLabelContext;
    ASSERT(): TerminalNode;
    propertyExpression(): PropertyExpressionContext;
    IS(): TerminalNode;
    UNIQUE(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NodeKeyConstraintContext extends ParserRuleContext {
    CONSTRAINT(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ON(): TerminalNode;
    variable(): VariableContext;
    nodeLabel(): NodeLabelContext;
    ASSERT(): TerminalNode;
    propertyExpressions(): PropertyExpressionsContext;
    IS(): TerminalNode;
    NODE(): TerminalNode;
    KEY(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NodePropertyExistenceConstraintContext extends ParserRuleContext {
    CONSTRAINT(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ON(): TerminalNode;
    variable(): VariableContext;
    nodeLabel(): NodeLabelContext;
    ASSERT(): TerminalNode;
    EXISTS(): TerminalNode;
    propertyExpression(): PropertyExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipPropertyExistenceConstraintContext extends ParserRuleContext {
    CONSTRAINT(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    ON(): TerminalNode;
    relationshipPatternSyntax(): RelationshipPatternSyntaxContext;
    ASSERT(): TerminalNode;
    EXISTS(): TerminalNode;
    propertyExpression(): PropertyExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipPatternSyntaxContext extends ParserRuleContext {
    dash(): DashContext[];
    dash(i: number): DashContext;
    variable(): VariableContext | undefined;
    relType(): RelTypeContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    rightArrowHead(): RightArrowHeadContext | undefined;
    leftArrowHead(): LeftArrowHeadContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LoadCSVClauseContext extends ParserRuleContext {
    LOAD(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    CSV(): TerminalNode;
    FROM(): TerminalNode;
    expression(): ExpressionContext;
    AS(): TerminalNode;
    variable(): VariableContext;
    WITH(): TerminalNode | undefined;
    HEADERS(): TerminalNode | undefined;
    FIELDTERMINATOR(): TerminalNode | undefined;
    StringLiteral(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class MatchClauseContext extends ParserRuleContext {
    MATCH(): TerminalNode;
    pattern(): PatternContext;
    OPTIONAL(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    hint(): HintContext[];
    hint(i: number): HintContext;
    where(): WhereContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UnwindClauseContext extends ParserRuleContext {
    UNWIND(): TerminalNode;
    expression(): ExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    AS(): TerminalNode;
    variable(): VariableContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class MergeClauseContext extends ParserRuleContext {
    MERGE(): TerminalNode;
    patternPart(): PatternPartContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    mergeAction(): MergeActionContext[];
    mergeAction(i: number): MergeActionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class MergeActionContext extends ParserRuleContext {
    ON(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    MATCH(): TerminalNode | undefined;
    setClause(): SetClauseContext | undefined;
    CREATE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateClauseContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    pattern(): PatternContext;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CreateUniqueClauseContext extends ParserRuleContext {
    CREATE(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    UNIQUE(): TerminalNode;
    pattern(): PatternContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SetClauseContext extends ParserRuleContext {
    SET(): TerminalNode;
    setItem(): SetItemContext[];
    setItem(i: number): SetItemContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SetItemContext extends ParserRuleContext {
    propertyExpression(): PropertyExpressionContext | undefined;
    expression(): ExpressionContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    variable(): VariableContext | undefined;
    nodeLabels(): NodeLabelsContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DeleteClauseContext extends ParserRuleContext {
    DELETE(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    DETACH(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RemoveClauseContext extends ParserRuleContext {
    REMOVE(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    removeItem(): RemoveItemContext[];
    removeItem(i: number): RemoveItemContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RemoveItemContext extends ParserRuleContext {
    variable(): VariableContext | undefined;
    nodeLabels(): NodeLabelsContext | undefined;
    propertyExpression(): PropertyExpressionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ForeachClauseContext extends ParserRuleContext {
    FOREACH(): TerminalNode;
    variable(): VariableContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    IN(): TerminalNode;
    expression(): ExpressionContext;
    clause(): ClauseContext[];
    clause(i: number): ClauseContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class WithClauseContext extends ParserRuleContext {
    WITH(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    returnBody(): ReturnBodyContext;
    DISTINCT(): TerminalNode | undefined;
    where(): WhereContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ReturnClauseContext extends ParserRuleContext {
    RETURN(): TerminalNode;
    returnBody(): ReturnBodyContext;
    DISTINCT(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ReturnBodyContext extends ParserRuleContext {
    returnItems(): ReturnItemsContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    order(): OrderContext | undefined;
    skip(): SkipContext | undefined;
    limit(): LimitContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class FuncContext extends ParserRuleContext {
    procedureInvocation(): ProcedureInvocationContext;
    SP(): TerminalNode | undefined;
    procedureResults(): ProcedureResultsContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ReturnItemsContext extends ParserRuleContext {
    returnItem(): ReturnItemContext[];
    returnItem(i: number): ReturnItemContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    func(): FuncContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ReturnItemContext extends ParserRuleContext {
    expression(): ExpressionContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    AS(): TerminalNode | undefined;
    variable(): VariableContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CallContext extends ParserRuleContext {
    CALL(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    procedureInvocation(): ProcedureInvocationContext;
    procedureResults(): ProcedureResultsContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ProcedureInvocationContext extends ParserRuleContext {
    procedureInvocationBody(): ProcedureInvocationBodyContext;
    SP(): TerminalNode | undefined;
    procedureArguments(): ProcedureArgumentsContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ProcedureInvocationBodyContext extends ParserRuleContext {
    namespace(): NamespaceContext;
    procedureName(): ProcedureNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ProcedureArgumentsContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ProcedureResultsContext extends ParserRuleContext {
    YIELD(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    procedureResult(): ProcedureResultContext[];
    procedureResult(i: number): ProcedureResultContext;
    where(): WhereContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ProcedureResultContext extends ParserRuleContext {
    aliasedProcedureResult(): AliasedProcedureResultContext | undefined;
    simpleProcedureResult(): SimpleProcedureResultContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AliasedProcedureResultContext extends ParserRuleContext {
    procedureOutput(): ProcedureOutputContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    AS(): TerminalNode;
    variable(): VariableContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SimpleProcedureResultContext extends ParserRuleContext {
    procedureOutput(): ProcedureOutputContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ProcedureOutputContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class OrderContext extends ParserRuleContext {
    ORDER(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    BY(): TerminalNode;
    sortItem(): SortItemContext[];
    sortItem(i: number): SortItemContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SkipContext extends ParserRuleContext {
    L_SKIP(): TerminalNode;
    SP(): TerminalNode;
    expression(): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LimitContext extends ParserRuleContext {
    LIMIT(): TerminalNode;
    SP(): TerminalNode;
    expression(): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SortItemContext extends ParserRuleContext {
    expression(): ExpressionContext;
    ASCENDING(): TerminalNode | undefined;
    ASC(): TerminalNode | undefined;
    DESCENDING(): TerminalNode | undefined;
    DESC(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class HintContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    USING(): TerminalNode | undefined;
    INDEX(): TerminalNode | undefined;
    variable(): VariableContext[];
    variable(i: number): VariableContext;
    nodeLabel(): NodeLabelContext | undefined;
    propertyKeys(): PropertyKeysContext | undefined;
    JOIN(): TerminalNode | undefined;
    ON(): TerminalNode | undefined;
    SCAN(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class StartClauseContext extends ParserRuleContext {
    START(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    startPoint(): StartPointContext[];
    startPoint(i: number): StartPointContext;
    where(): WhereContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class StartPointContext extends ParserRuleContext {
    variable(): VariableContext;
    lookup(): LookupContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LookupContext extends ParserRuleContext {
    nodeLookup(): NodeLookupContext | undefined;
    relationshipLookup(): RelationshipLookupContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NodeLookupContext extends ParserRuleContext {
    NODE(): TerminalNode;
    identifiedIndexLookup(): IdentifiedIndexLookupContext | undefined;
    indexQuery(): IndexQueryContext | undefined;
    idLookup(): IdLookupContext | undefined;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipLookupContext extends ParserRuleContext {
    RELATIONSHIP(): TerminalNode | undefined;
    REL(): TerminalNode | undefined;
    identifiedIndexLookup(): IdentifiedIndexLookupContext | undefined;
    indexQuery(): IndexQueryContext | undefined;
    idLookup(): IdLookupContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class IdentifiedIndexLookupContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    StringLiteral(): TerminalNode | undefined;
    parameter(): ParameterContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class IndexQueryContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext;
    StringLiteral(): TerminalNode | undefined;
    parameter(): ParameterContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class IdLookupContext extends ParserRuleContext {
    literalIds(): LiteralIdsContext | undefined;
    parameter(): ParameterContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LiteralIdsContext extends ParserRuleContext {
    integerLiteral(): IntegerLiteralContext[];
    integerLiteral(i: number): IntegerLiteralContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class WhereContext extends ParserRuleContext {
    WHERE(): TerminalNode;
    SP(): TerminalNode;
    expression(): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PatternContext extends ParserRuleContext {
    patternPart(): PatternPartContext[];
    patternPart(i: number): PatternPartContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PatternPartContext extends ParserRuleContext {
    variable(): VariableContext | undefined;
    anonymousPatternPart(): AnonymousPatternPartContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AnonymousPatternPartContext extends ParserRuleContext {
    shortestPathPatternFunction(): ShortestPathPatternFunctionContext | undefined;
    patternElement(): PatternElementContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PatternElementContext extends ParserRuleContext {
    nodePattern(): NodePatternContext | undefined;
    patternElementChain(): PatternElementChainContext[];
    patternElementChain(i: number): PatternElementChainContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    patternElement(): PatternElementContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NodePatternContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    variable(): VariableContext | undefined;
    nodeLabels(): NodeLabelsContext | undefined;
    properties(): PropertiesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PatternElementChainContext extends ParserRuleContext {
    relationshipPattern(): RelationshipPatternContext;
    nodePattern(): NodePatternContext;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipPatternContext extends ParserRuleContext {
    relationshipPatternStart(): RelationshipPatternStartContext;
    relationshipPatternEnd(): RelationshipPatternEndContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    relationshipDetail(): RelationshipDetailContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipPatternStartContext extends ParserRuleContext {
    leftArrowHead(): LeftArrowHeadContext | undefined;
    dash(): DashContext | undefined;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipPatternEndContext extends ParserRuleContext {
    dash(): DashContext | undefined;
    rightArrowHead(): RightArrowHeadContext | undefined;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipDetailContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    variable(): VariableContext | undefined;
    relationshipTypes(): RelationshipTypesContext | undefined;
    rangeLiteral(): RangeLiteralContext | undefined;
    properties(): PropertiesContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertiesContext extends ParserRuleContext {
    mapLiteral(): MapLiteralContext | undefined;
    parameter(): ParameterContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelTypeContext extends ParserRuleContext {
    relTypeName(): RelTypeNameContext;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipTypesContext extends ParserRuleContext {
    relationshipType(): RelationshipTypeContext;
    relationshipTypeOptionalColon(): RelationshipTypeOptionalColonContext[];
    relationshipTypeOptionalColon(i: number): RelationshipTypeOptionalColonContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipTypeContext extends ParserRuleContext {
    relTypeName(): RelTypeNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipTypeOptionalColonContext extends ParserRuleContext {
    relTypeName(): RelTypeNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NodeLabelsContext extends ParserRuleContext {
    nodeLabel(): NodeLabelContext[];
    nodeLabel(i: number): NodeLabelContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NodeLabelContext extends ParserRuleContext {
    labelName(): LabelNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RangeLiteralContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    integerLiteral(): IntegerLiteralContext[];
    integerLiteral(i: number): IntegerLiteralContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LabelNameContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelTypeNameContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ExpressionContext extends ParserRuleContext {
    orExpression(): OrExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class OrExpressionContext extends ParserRuleContext {
    xorExpression(): XorExpressionContext[];
    xorExpression(i: number): XorExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    OR(): TerminalNode[];
    OR(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class XorExpressionContext extends ParserRuleContext {
    andExpression(): AndExpressionContext[];
    andExpression(i: number): AndExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    XOR(): TerminalNode[];
    XOR(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AndExpressionContext extends ParserRuleContext {
    notExpression(): NotExpressionContext[];
    notExpression(i: number): NotExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    AND(): TerminalNode[];
    AND(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NotExpressionContext extends ParserRuleContext {
    comparisonExpression(): ComparisonExpressionContext;
    NOT(): TerminalNode[];
    NOT(i: number): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ComparisonExpressionContext extends ParserRuleContext {
    addOrSubtractExpression(): AddOrSubtractExpressionContext;
    partialComparisonExpression(): PartialComparisonExpressionContext[];
    partialComparisonExpression(i: number): PartialComparisonExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AddOrSubtractExpressionContext extends ParserRuleContext {
    multiplyDivideModuloExpression(): MultiplyDivideModuloExpressionContext[];
    multiplyDivideModuloExpression(i: number): MultiplyDivideModuloExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class MultiplyDivideModuloExpressionContext extends ParserRuleContext {
    powerOfExpression(): PowerOfExpressionContext[];
    powerOfExpression(i: number): PowerOfExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PowerOfExpressionContext extends ParserRuleContext {
    unaryAddOrSubtractExpression(): UnaryAddOrSubtractExpressionContext[];
    unaryAddOrSubtractExpression(i: number): UnaryAddOrSubtractExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class UnaryAddOrSubtractExpressionContext extends ParserRuleContext {
    stringListNullOperatorExpression(): StringListNullOperatorExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class StringListNullOperatorExpressionContext extends ParserRuleContext {
    propertyOrLabelsExpression(): PropertyOrLabelsExpressionContext[];
    propertyOrLabelsExpression(i: number): PropertyOrLabelsExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    IS(): TerminalNode[];
    IS(i: number): TerminalNode;
    NULL(): TerminalNode[];
    NULL(i: number): TerminalNode;
    NOT(): TerminalNode[];
    NOT(i: number): TerminalNode;
    IN(): TerminalNode[];
    IN(i: number): TerminalNode;
    STARTS(): TerminalNode[];
    STARTS(i: number): TerminalNode;
    WITH(): TerminalNode[];
    WITH(i: number): TerminalNode;
    ENDS(): TerminalNode[];
    ENDS(i: number): TerminalNode;
    CONTAINS(): TerminalNode[];
    CONTAINS(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertyOrLabelsExpressionContext extends ParserRuleContext {
    atom(): AtomContext;
    propertyLookup(): PropertyLookupContext[];
    propertyLookup(i: number): PropertyLookupContext;
    nodeLabels(): NodeLabelsContext[];
    nodeLabels(i: number): NodeLabelsContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class FilterFunctionContext extends ParserRuleContext {
    filterFunctionName(): FilterFunctionNameContext | undefined;
    filterExpression(): FilterExpressionContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class FilterFunctionNameContext extends ParserRuleContext {
    FILTER(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ExistsFunctionContext extends ParserRuleContext {
    existsFunctionName(): ExistsFunctionNameContext | undefined;
    expression(): ExpressionContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ExistsFunctionNameContext extends ParserRuleContext {
    EXISTS(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AllFunctionContext extends ParserRuleContext {
    allFunctionName(): AllFunctionNameContext | undefined;
    filterExpression(): FilterExpressionContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AllFunctionNameContext extends ParserRuleContext {
    ALL(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AnyFunctionContext extends ParserRuleContext {
    anyFunctionName(): AnyFunctionNameContext | undefined;
    filterExpression(): FilterExpressionContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AnyFunctionNameContext extends ParserRuleContext {
    ANY(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NoneFunctionContext extends ParserRuleContext {
    noneFunctionName(): NoneFunctionNameContext | undefined;
    filterExpression(): FilterExpressionContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NoneFunctionNameContext extends ParserRuleContext {
    NONE(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SingleFunctionContext extends ParserRuleContext {
    singleFunctionName(): SingleFunctionNameContext | undefined;
    filterExpression(): FilterExpressionContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SingleFunctionNameContext extends ParserRuleContext {
    SINGLE(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ExtractFunctionContext extends ParserRuleContext {
    extractFunctionName(): ExtractFunctionNameContext | undefined;
    filterExpression(): FilterExpressionContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    expression(): ExpressionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ExtractFunctionNameContext extends ParserRuleContext {
    EXTRACT(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ReduceFunctionContext extends ParserRuleContext {
    reduceFunctionName(): ReduceFunctionNameContext | undefined;
    variable(): VariableContext | undefined;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    idInColl(): IdInCollContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ReduceFunctionNameContext extends ParserRuleContext {
    REDUCE(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ShortestPathPatternFunctionContext extends ParserRuleContext {
    shortestPathFunctionName(): ShortestPathFunctionNameContext | undefined;
    patternElement(): PatternElementContext | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    allShortestPathFunctionName(): AllShortestPathFunctionNameContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ShortestPathFunctionNameContext extends ParserRuleContext {
    SHORTESTPATH(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AllShortestPathFunctionNameContext extends ParserRuleContext {
    ALLSHORTESTPATHS(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AtomContext extends ParserRuleContext {
    literal(): LiteralContext | undefined;
    parameter(): ParameterContext | undefined;
    caseExpression(): CaseExpressionContext | undefined;
    COUNT(): TerminalNode | undefined;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    listComprehension(): ListComprehensionContext | undefined;
    patternComprehension(): PatternComprehensionContext | undefined;
    filterFunction(): FilterFunctionContext | undefined;
    extractFunction(): ExtractFunctionContext | undefined;
    reduceFunction(): ReduceFunctionContext | undefined;
    allFunction(): AllFunctionContext | undefined;
    anyFunction(): AnyFunctionContext | undefined;
    noneFunction(): NoneFunctionContext | undefined;
    singleFunction(): SingleFunctionContext | undefined;
    existsFunction(): ExistsFunctionContext | undefined;
    shortestPathPatternFunction(): ShortestPathPatternFunctionContext | undefined;
    relationshipsPattern(): RelationshipsPatternContext | undefined;
    parenthesizedExpression(): ParenthesizedExpressionContext | undefined;
    functionInvocation(): FunctionInvocationContext | undefined;
    variable(): VariableContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LiteralContext extends ParserRuleContext {
    numberLiteral(): NumberLiteralContext | undefined;
    stringLiteral(): StringLiteralContext | undefined;
    booleanLiteral(): BooleanLiteralContext | undefined;
    NULL(): TerminalNode | undefined;
    mapLiteral(): MapLiteralContext | undefined;
    listLiteral(): ListLiteralContext | undefined;
    mapProjection(): MapProjectionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class StringLiteralContext extends ParserRuleContext {
    StringLiteral(): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class BooleanLiteralContext extends ParserRuleContext {
    TRUE(): TerminalNode | undefined;
    FALSE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ListLiteralContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PartialComparisonExpressionContext extends ParserRuleContext {
    addOrSubtractExpression(): AddOrSubtractExpressionContext | undefined;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ParenthesizedExpressionContext extends ParserRuleContext {
    expression(): ExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RelationshipsPatternContext extends ParserRuleContext {
    nodePattern(): NodePatternContext;
    patternElementChain(): PatternElementChainContext[];
    patternElementChain(i: number): PatternElementChainContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class FilterExpressionContext extends ParserRuleContext {
    idInColl(): IdInCollContext;
    where(): WhereContext | undefined;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class IdInCollContext extends ParserRuleContext {
    variable(): VariableContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    IN(): TerminalNode;
    expression(): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class FunctionInvocationContext extends ParserRuleContext {
    functionInvocationBody(): FunctionInvocationBodyContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    DISTINCT(): TerminalNode | undefined;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class FunctionInvocationBodyContext extends ParserRuleContext {
    namespace(): NamespaceContext;
    functionName(): FunctionNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class FunctionNameContext extends ParserRuleContext {
    UnescapedSymbolicName(): TerminalNode | undefined;
    EscapedSymbolicName(): TerminalNode | undefined;
    COUNT(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ProcedureNameContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ListComprehensionContext extends ParserRuleContext {
    filterExpression(): FilterExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    expression(): ExpressionContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PatternComprehensionContext extends ParserRuleContext {
    relationshipsPattern(): RelationshipsPatternContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    variable(): VariableContext | undefined;
    WHERE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertyLookupContext extends ParserRuleContext {
    propertyKeyName(): PropertyKeyNameContext | undefined;
    SP(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CaseExpressionContext extends ParserRuleContext {
    END(): TerminalNode;
    ELSE(): TerminalNode | undefined;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    CASE(): TerminalNode | undefined;
    caseAlternatives(): CaseAlternativesContext[];
    caseAlternatives(i: number): CaseAlternativesContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class CaseAlternativesContext extends ParserRuleContext {
    WHEN(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    THEN(): TerminalNode;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class VariableContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NumberLiteralContext extends ParserRuleContext {
    doubleLiteral(): DoubleLiteralContext | undefined;
    integerLiteral(): IntegerLiteralContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class MapLiteralContext extends ParserRuleContext {
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    literalEntry(): LiteralEntryContext[];
    literalEntry(i: number): LiteralEntryContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class MapProjectionContext extends ParserRuleContext {
    variable(): VariableContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    mapProjectionVariants(): MapProjectionVariantsContext[];
    mapProjectionVariants(i: number): MapProjectionVariantsContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class MapProjectionVariantsContext extends ParserRuleContext {
    literalEntry(): LiteralEntryContext | undefined;
    propertySelector(): PropertySelectorContext | undefined;
    variableSelector(): VariableSelectorContext | undefined;
    allPropertiesSelector(): AllPropertiesSelectorContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LiteralEntryContext extends ParserRuleContext {
    propertyKeyName(): PropertyKeyNameContext;
    expression(): ExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertySelectorContext extends ParserRuleContext {
    variable(): VariableContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class VariableSelectorContext extends ParserRuleContext {
    variable(): VariableContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class AllPropertiesSelectorContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ParameterContext extends ParserRuleContext {
    legacyParameter(): LegacyParameterContext | undefined;
    newParameter(): NewParameterContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LegacyParameterContext extends ParserRuleContext {
    parameterName(): ParameterNameContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NewParameterContext extends ParserRuleContext {
    parameterName(): ParameterNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class ParameterNameContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext | undefined;
    DecimalInteger(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertyExpressionsContext extends ParserRuleContext {
    propertyExpression(): PropertyExpressionContext[];
    propertyExpression(i: number): PropertyExpressionContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertyExpressionContext extends ParserRuleContext {
    atom(): AtomContext;
    propertyLookup(): PropertyLookupContext[];
    propertyLookup(i: number): PropertyLookupContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertyKeysContext extends ParserRuleContext {
    propertyKeyName(): PropertyKeyNameContext[];
    propertyKeyName(i: number): PropertyKeyNameContext;
    SP(): TerminalNode[];
    SP(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class PropertyKeyNameContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class IntegerLiteralContext extends ParserRuleContext {
    HexInteger(): TerminalNode | undefined;
    OctalInteger(): TerminalNode | undefined;
    DecimalInteger(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DoubleLiteralContext extends ParserRuleContext {
    ExponentDecimalReal(): TerminalNode | undefined;
    RegularDecimalReal(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class NamespaceContext extends ParserRuleContext {
    symbolicName(): SymbolicNameContext[];
    symbolicName(i: number): SymbolicNameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class LeftArrowHeadContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class RightArrowHeadContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class DashContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class SymbolicNameContext extends ParserRuleContext {
    keyword(): KeywordContext | undefined;
    UnescapedSymbolicName(): TerminalNode | undefined;
    EscapedSymbolicName(): TerminalNode | undefined;
    HexLetter(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
export declare class KeywordContext extends ParserRuleContext {
    CYPHER(): TerminalNode | undefined;
    EXPLAIN(): TerminalNode | undefined;
    PROFILE(): TerminalNode | undefined;
    USING(): TerminalNode | undefined;
    PERIODIC(): TerminalNode | undefined;
    COMMIT(): TerminalNode | undefined;
    UNION(): TerminalNode | undefined;
    ALL(): TerminalNode | undefined;
    CREATE(): TerminalNode | undefined;
    DROP(): TerminalNode | undefined;
    INDEX(): TerminalNode | undefined;
    ON(): TerminalNode | undefined;
    CONSTRAINT(): TerminalNode | undefined;
    ASSERT(): TerminalNode | undefined;
    IS(): TerminalNode | undefined;
    UNIQUE(): TerminalNode | undefined;
    EXISTS(): TerminalNode | undefined;
    LOAD(): TerminalNode | undefined;
    CSV(): TerminalNode | undefined;
    WITH(): TerminalNode | undefined;
    HEADERS(): TerminalNode | undefined;
    FROM(): TerminalNode | undefined;
    AS(): TerminalNode | undefined;
    FIELDTERMINATOR(): TerminalNode | undefined;
    OPTIONAL(): TerminalNode | undefined;
    MATCH(): TerminalNode | undefined;
    UNWIND(): TerminalNode | undefined;
    MERGE(): TerminalNode | undefined;
    SET(): TerminalNode | undefined;
    DETACH(): TerminalNode | undefined;
    DELETE(): TerminalNode | undefined;
    REMOVE(): TerminalNode | undefined;
    FOREACH(): TerminalNode | undefined;
    IN(): TerminalNode | undefined;
    DISTINCT(): TerminalNode | undefined;
    RETURN(): TerminalNode | undefined;
    ORDER(): TerminalNode | undefined;
    BY(): TerminalNode | undefined;
    L_SKIP(): TerminalNode | undefined;
    LIMIT(): TerminalNode | undefined;
    ASCENDING(): TerminalNode | undefined;
    ASC(): TerminalNode | undefined;
    DESCENDING(): TerminalNode | undefined;
    DESC(): TerminalNode | undefined;
    JOIN(): TerminalNode | undefined;
    SCAN(): TerminalNode | undefined;
    START(): TerminalNode | undefined;
    NODE(): TerminalNode | undefined;
    RELATIONSHIP(): TerminalNode | undefined;
    REL(): TerminalNode | undefined;
    WHERE(): TerminalNode | undefined;
    SHORTESTPATH(): TerminalNode | undefined;
    ALLSHORTESTPATHS(): TerminalNode | undefined;
    OR(): TerminalNode | undefined;
    XOR(): TerminalNode | undefined;
    AND(): TerminalNode | undefined;
    NOT(): TerminalNode | undefined;
    STARTS(): TerminalNode | undefined;
    ENDS(): TerminalNode | undefined;
    CONTAINS(): TerminalNode | undefined;
    NULL(): TerminalNode | undefined;
    COUNT(): TerminalNode | undefined;
    FILTER(): TerminalNode | undefined;
    EXTRACT(): TerminalNode | undefined;
    ANY(): TerminalNode | undefined;
    NONE(): TerminalNode | undefined;
    SINGLE(): TerminalNode | undefined;
    TRUE(): TerminalNode | undefined;
    FALSE(): TerminalNode | undefined;
    REDUCE(): TerminalNode | undefined;
    CASE(): TerminalNode | undefined;
    ELSE(): TerminalNode | undefined;
    END(): TerminalNode | undefined;
    WHEN(): TerminalNode | undefined;
    THEN(): TerminalNode | undefined;
    CALL(): TerminalNode | undefined;
    YIELD(): TerminalNode | undefined;
    KEY(): TerminalNode | undefined;
    CATALOG(): TerminalNode | undefined;
    SHOW(): TerminalNode | undefined;
    DEFAULT(): TerminalNode | undefined;
    DBMS(): TerminalNode | undefined;
    DATABASE(): TerminalNode | undefined;
    DATABASES(): TerminalNode | undefined;
    GRAPH(): TerminalNode | undefined;
    GRAPHS(): TerminalNode | undefined;
    REPLACE(): TerminalNode | undefined;
    IF(): TerminalNode | undefined;
    STOP(): TerminalNode | undefined;
    ROLE(): TerminalNode | undefined;
    ROLES(): TerminalNode | undefined;
    USER(): TerminalNode | undefined;
    USERS(): TerminalNode | undefined;
    POPULATED(): TerminalNode | undefined;
    PASSWORD(): TerminalNode | undefined;
    CHANGE(): TerminalNode | undefined;
    REQUIRED(): TerminalNode | undefined;
    STATUS(): TerminalNode | undefined;
    ACTIVE(): TerminalNode | undefined;
    SUSPENDED(): TerminalNode | undefined;
    ALTER(): TerminalNode | undefined;
    CURRENT(): TerminalNode | undefined;
    TO(): TerminalNode | undefined;
    PRIVILEGES(): TerminalNode | undefined;
    GRANT(): TerminalNode | undefined;
    DENY(): TerminalNode | undefined;
    REVOKE(): TerminalNode | undefined;
    RELATIONSHIPS(): TerminalNode | undefined;
    NODES(): TerminalNode | undefined;
    ELEMENT(): TerminalNode | undefined;
    ELEMENTS(): TerminalNode | undefined;
    COPY(): TerminalNode | undefined;
    OF(): TerminalNode | undefined;
    TRAVERSE(): TerminalNode | undefined;
    READ(): TerminalNode | undefined;
    WRITE(): TerminalNode | undefined;
    ACCESS(): TerminalNode | undefined;
    INDEXES(): TerminalNode | undefined;
    MANAGEMENT(): TerminalNode | undefined;
    NEW(): TerminalNode | undefined;
    LABEL(): TerminalNode | undefined;
    LABELS(): TerminalNode | undefined;
    NAME(): TerminalNode | undefined;
    NAMES(): TerminalNode | undefined;
    TYPE(): TerminalNode | undefined;
    TYPES(): TerminalNode | undefined;
    PROPERTY(): TerminalNode | undefined;
    CONSTRAINTS(): TerminalNode | undefined;
    ASSIGN(): TerminalNode | undefined;
    BTREE(): TerminalNode | undefined;
    EXIST(): TerminalNode | undefined;
    FOR(): TerminalNode | undefined;
    OPTIONS(): TerminalNode | undefined;
    EXECUTE(): TerminalNode | undefined;
    DEFINED(): TerminalNode | undefined;
    FUNCTION(): TerminalNode | undefined;
    FUNCTIONS(): TerminalNode | undefined;
    BOOSTED(): TerminalNode | undefined;
    PROCEDURE(): TerminalNode | undefined;
    PROCEDURES(): TerminalNode | undefined;
    ADMIN(): TerminalNode | undefined;
    ADMINISTRATOR(): TerminalNode | undefined;
    BRIEF(): TerminalNode | undefined;
    VERBOSE(): TerminalNode | undefined;
    OUTPUT(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: CypherListener): void;
    exitRule(listener: CypherListener): void;
    accept<Result>(visitor: CypherVisitor<Result>): Result;
}
