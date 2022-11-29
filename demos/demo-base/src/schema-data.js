/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const consoleCommands = [
  { name: ":clear" },
  { name: ":play" },
  { name: ":help", description: "this is help command" },
  {
    name: ":server",
    commands: [
      {
        name: "user",
        commands: [{ name: "list", description: "listdesc" }, { name: "add" }]
      }
    ]
  },
  { name: ":schema" },
  { name: ":history" },
  { name: ":queries" }
];

export const simpleSchema = {
  consoleCommands,
  labels: [":LabelOne", ":LabelTwo", ":Label Three"],
  relationshipTypes: [":REL_TYPE_ONE", ":REL_TYPE_TWO", ":REL_TYPE THREE"],
  parameters: ["parameter1", "parameter2", "parameter 3"],
  propertyKeys: ["propertyKey1", "propertyKey2", "propertyKey 3"],
  functions: [
    {
      name: "function1",
      signature: "(numbers :: LIST? OF NUMBER?) :: (FLOAT?)"
    },
    {
      name: "function2",
      signature: "(coll :: LIST? OF ANY?, value :: ANY?) :: (BOOLEAN?)"
    },
    {
      name: "function 3",
      signature: "(value :: ANY?) :: (STRING?)"
    },
    {
      name: "db.function",
      signature: "(value :: ANY?) :: (STRING?)"
    }
  ],
  procedures: [
    {
      name: "procedure1",
      signature:
        "(startNode :: NODE?, endNode :: NODE?, relationshipTypesAndDirections :: STRING?, weightPropertyName :: STRING?, latPropertyName :: STRING?, lonPropertyName :: STRING?) :: (path :: PATH?, weight :: FLOAT?)",
      returnItems: [
        {
          name: "path",
          signature: "PATH?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "procedure2",
      signature: "(username :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "procedure 3",
      signature:
        "() :: (username :: STRING?, roles :: LIST? OF STRING?, flags :: LIST? OF STRING?)",
      returnItems: [
        {
          name: "username",
          signature: "STRING?"
        },
        {
          name: "roles",
          signature: "LIST? OF STRING?"
        },
        {
          name: "flags",
          signature: "LIST? OF STRING?"
        }
      ]
    },
    {
      name: "db.procedure",
      signature: "(username :: STRING?) :: VOID",
      returnItems: [
        {
          name: "result",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "foo.procedure",
      signature: "(username :: STRING?) :: VOID",
      returnItems: [
        {
          name: "result",
          signature: "STRING?"
        }
      ]
    }
  ]
};

export const neo4jSchema = {
  consoleCommands: consoleCommands.concat({ name: ":long" }),
  labels: [
    ":Spacey mc spaceface",
    ":Legislator",
    ":State",
    ":Party",
    ":Body",
    ":Bill",
    ":Subject",
    ":Committee",
    ":Congress"
  ],
  relationshipTypes: [
    ":REPRESENTS",
    ":IS_MEMBER_OF",
    ":ELECTED_TO",
    ":PROPOSED_DURING",
    ":SPONSORED_BY",
    ":VOTED ON",
    ":REFERRED_TO",
    ":SERVES_ON",
    ":DEALS_WITH"
  ],
  parameters: ["age", "name", "surname"],
  propertyKeys: [
    "bioguideID",
    "code",
    "name",
    "type",
    "billID",
    "title",
    "thomasID",
    "birthday",
    "wikipediaID",
    "currentParty",
    "state",
    "votesmartID",
    "fecIDs",
    "republicanCount",
    "otherCount",
    "cspanID",
    "democratCount",
    "lastName",
    "firstName",
    "party",
    "opensecretsID",
    "icpsrID",
    "religion",
    "lisID",
    "govtrackID",
    "gender",
    "district",
    "number",
    "enacted",
    "officialTitle",
    "vetoed",
    "active",
    "popularTitle",
    "cosponsor",
    "vote",
    "jurisdiction",
    "url",
    "rank",
    "washpostID"
  ],
  functions: [
    {
      name: "apoc.coll.avg",
      signature: "(numbers :: LIST? OF NUMBER?) :: (FLOAT?)"
    },
    {
      name: "apoc.coll.contains",
      signature: "(coll :: LIST? OF ANY?, value :: ANY?) :: (BOOLEAN?)"
    },
    {
      name: "apoc.coll.containsAll",
      signature:
        "(coll :: LIST? OF ANY?, values :: LIST? OF ANY?) :: (BOOLEAN?)"
    },
    {
      name: "apoc.coll.containsAllSorted",
      signature:
        "(coll :: LIST? OF ANY?, values :: LIST? OF ANY?) :: (BOOLEAN?)"
    },
    {
      name: "apoc.coll.containsSorted",
      signature: "(coll :: LIST? OF ANY?, value :: ANY?) :: (BOOLEAN?)"
    },
    {
      name: "apoc.coll.disjunction",
      signature:
        "(first :: LIST? OF ANY?, second :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.indexOf",
      signature: "(coll :: LIST? OF ANY?, value :: ANY?) :: (INTEGER?)"
    },
    {
      name: "apoc.coll.intersection",
      signature:
        "(first :: LIST? OF ANY?, second :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.max",
      signature: "(values :: LIST? OF ANY?) :: (ANY?)"
    },
    {
      name: "apoc.coll.min",
      signature: "(values :: LIST? OF ANY?) :: (ANY?)"
    },
    {
      name: "apoc.coll.pairs",
      signature: "(list :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.pairsMin",
      signature: "(list :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.removeAll",
      signature:
        "(first :: LIST? OF ANY?, second :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.sort",
      signature: "(coll :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.sortMaps",
      signature: "(coll :: LIST? OF MAP?, prop :: STRING?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.sortNodes",
      signature: "(coll :: LIST? OF NODE?, prop :: STRING?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.subtract",
      signature:
        "(first :: LIST? OF ANY?, second :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.sum",
      signature: "(numbers :: LIST? OF NUMBER?) :: (FLOAT?)"
    },
    {
      name: "apoc.coll.sumLongs",
      signature: "(numbers :: LIST? OF NUMBER?) :: (INTEGER?)"
    },
    {
      name: "apoc.coll.toSet",
      signature: "(values :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.union",
      signature:
        "(first :: LIST? OF ANY?, second :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.unionAll",
      signature:
        "(first :: LIST? OF ANY?, second :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.coll.zip",
      signature:
        "(list1 :: LIST? OF ANY?, list2 :: LIST? OF ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.convert.fromJsonList",
      signature: "(list :: STRING?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.convert.fromJsonMap",
      signature: "(map :: STRING?) :: (MAP?)"
    },
    {
      name: "apoc.convert.getJsonProperty",
      signature: "(node :: NODE?, key :: STRING?) :: (ANY?)"
    },
    {
      name: "apoc.convert.getJsonPropertyMap",
      signature: "(node :: NODE?, key :: STRING?) :: (MAP?)"
    },
    {
      name: "apoc.convert.toBoolean",
      signature: "(bool :: ANY?) :: (BOOLEAN?)"
    },
    {
      name: "apoc.convert.toJson",
      signature: "(value :: ANY?) :: (STRING?)"
    },
    {
      name: "apoc.convert.toList",
      signature: "(list :: ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.convert.toMap",
      signature: "(map :: ANY?) :: (MAP?)"
    },
    {
      name: "apoc.convert.toNode",
      signature: "(node :: ANY?) :: (NODE?)"
    },
    {
      name: "apoc.convert.toRelationship",
      signature: "(relationship :: ANY?) :: (RELATIONSHIP?)"
    },
    {
      name: "apoc.convert.toSet",
      signature: "(list :: ANY?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.convert.toString",
      signature: "(string :: ANY?) :: (STRING?)"
    },
    {
      name: "apoc.create.uuid",
      signature: "() :: (STRING?)"
    },
    {
      name: "apoc.data.domain",
      signature: "(url_or_email_address :: STRING?) :: (STRING?)"
    },
    {
      name: "apoc.date.fields",
      signature:
        "(date :: STRING?, pattern = yyyy-MM-dd HH:mm:ss :: STRING?) :: (MAP?)"
    },
    {
      name: "apoc.date.format",
      signature:
        "(time :: INTEGER?, unit = ms :: STRING?, format = yyyy-MM-dd HH:mm:ss :: STRING?, timezone =  :: STRING?) :: (STRING?)"
    },
    {
      name: "apoc.date.parse",
      signature:
        "(time :: STRING?, unit = ms :: STRING?, format = yyyy-MM-dd HH:mm:ss :: STRING?, timezone =  :: STRING?) :: (INTEGER?)"
    },
    {
      name: "apoc.date.systemTimezone",
      signature: "() :: (STRING?)"
    },
    {
      name: "apoc.date.toYears",
      signature:
        "(value :: ANY?, format = yyyy-MM-dd HH:mm:ss :: STRING?) :: (FLOAT?)"
    },
    {
      name: "apoc.map.clean",
      signature:
        "(map :: MAP?, keys :: LIST? OF STRING?, values :: LIST? OF ANY?) :: (MAP?)"
    },
    {
      name: "apoc.map.flatten",
      signature: "(map :: MAP?) :: (MAP?)"
    },
    {
      name: "apoc.map.fromLists",
      signature: "(keys :: LIST? OF STRING?, values :: LIST? OF ANY?) :: (MAP?)"
    },
    {
      name: "apoc.map.fromNodes",
      signature: "(label :: STRING?, property :: STRING?) :: (MAP?)"
    },
    {
      name: "apoc.map.fromPairs",
      signature: "(pairs :: LIST? OF LIST? OF ANY?) :: (MAP?)"
    },
    {
      name: "apoc.map.fromValues",
      signature: "(values :: LIST? OF ANY?) :: (MAP?)"
    },
    {
      name: "apoc.map.groupBy",
      signature: "(values :: LIST? OF ANY?, key :: STRING?) :: (MAP?)"
    },
    {
      name: "apoc.map.groupByMulti",
      signature: "(values :: LIST? OF ANY?, key :: STRING?) :: (MAP?)"
    },
    {
      name: "apoc.map.merge",
      signature: "(first :: MAP?, second :: MAP?) :: (MAP?)"
    },
    {
      name: "apoc.map.mergeList",
      signature: "(maps :: LIST? OF MAP?) :: (MAP?)"
    },
    {
      name: "apoc.map.removeKey",
      signature: "(map :: MAP?, key :: STRING?) :: (MAP?)"
    },
    {
      name: "apoc.map.removeKeys",
      signature: "(map :: MAP?, keys :: LIST? OF STRING?) :: (MAP?)"
    },
    {
      name: "apoc.map.setEntry",
      signature: "(map :: MAP?, key :: STRING?, value :: ANY?) :: (MAP?)"
    },
    {
      name: "apoc.map.setKey",
      signature: "(map :: MAP?, key :: STRING?, value :: ANY?) :: (MAP?)"
    },
    {
      name: "apoc.map.setLists",
      signature:
        "(map :: MAP?, keys :: LIST? OF STRING?, values :: LIST? OF ANY?) :: (MAP?)"
    },
    {
      name: "apoc.map.setPairs",
      signature: "(map :: MAP?, pairs :: LIST? OF LIST? OF ANY?) :: (MAP?)"
    },
    {
      name: "apoc.map.setValues",
      signature: "(map :: MAP?, pairs :: LIST? OF ANY?) :: (MAP?)"
    },
    {
      name: "apoc.math.round",
      signature:
        "(value :: FLOAT?, precision = 0 :: INTEGER?, mode = HALF_UP :: STRING?) :: (FLOAT?)"
    },
    {
      name: "apoc.meta.isType",
      signature: "(value :: ANY?, type :: STRING?) :: (BOOLEAN?)"
    },
    {
      name: "apoc.meta.type",
      signature: "(value :: ANY?) :: (STRING?)"
    },
    {
      name: "apoc.meta.typeName",
      signature: "(value :: ANY?) :: (STRING?)"
    },
    {
      name: "apoc.meta.types",
      signature: "(properties :: ANY?) :: (MAP?)"
    },
    {
      name: "apoc.node.relationship.exists",
      signature: "(node :: NODE?, types :: STRING?) :: (BOOLEAN?)"
    },
    {
      name: "apoc.nodes.isDense",
      signature: "(node :: NODE?) :: (BOOLEAN?)"
    },
    {
      name: "apoc.number.format",
      signature:
        "(number :: ANY?, pattern =  :: STRING?, lang =  :: STRING?) :: (STRING?)"
    },
    {
      name: "apoc.number.parseFloat",
      signature:
        "(text :: STRING?, pattern =  :: STRING?, lang =  :: STRING?) :: (FLOAT?)"
    },
    {
      name: "apoc.number.parseInt",
      signature:
        "(text :: STRING?, pattern =  :: STRING?, lang =  :: STRING?) :: (INTEGER?)"
    },
    {
      name: "apoc.scoring.existence",
      signature: "(score :: INTEGER?, exists :: BOOLEAN?) :: (FLOAT?)"
    },
    {
      name: "apoc.scoring.pareto",
      signature:
        "(minimumThreshold :: INTEGER?, eightyPercentValue :: INTEGER?, maximumValue :: INTEGER?, score :: INTEGER?) :: (FLOAT?)"
    },
    {
      name: "apoc.text.clean",
      signature: "(text :: STRING?) :: (STRING?)"
    },
    {
      name: "apoc.text.compareCleaned",
      signature: "(text1 :: STRING?, text2 :: STRING?) :: (BOOLEAN?)"
    },
    {
      name: "apoc.text.join",
      signature:
        "(texts :: LIST? OF STRING?, delimiter :: STRING?) :: (STRING?)"
    },
    {
      name: "apoc.text.regreplace",
      signature:
        "(text :: STRING?, regex :: STRING?, replacement :: STRING?) :: (STRING?)"
    },
    {
      name: "apoc.text.replace",
      signature:
        "(text :: STRING?, regex :: STRING?, replacement :: STRING?) :: (STRING?)"
    },
    {
      name: "apoc.text.urldecode",
      signature: "(text :: STRING?) :: (STRING?)"
    },
    {
      name: "apoc.text.urlencode",
      signature: "(text :: STRING?) :: (STRING?)"
    },
    {
      name: "apoc.trigger.nodesByLabel",
      signature: "(labelEntries :: ANY?, label :: STRING?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.trigger.propertiesByKey",
      signature: "(propertyEntries :: ANY?, key :: STRING?) :: (LIST? OF ANY?)"
    },
    {
      name: "apoc.util.md5",
      signature: "(values :: LIST? OF ANY?) :: (STRING?)"
    },
    {
      name: "apoc.util.sha1",
      signature: "(values :: LIST? OF ANY?) :: (STRING?)"
    }
  ],
  procedures: [
    {
      name: "apoc.algo.aStar",
      signature:
        "(startNode :: NODE?, endNode :: NODE?, relationshipTypesAndDirections :: STRING?, weightPropertyName :: STRING?, latPropertyName :: STRING?, lonPropertyName :: STRING?) :: (path :: PATH?, weight :: FLOAT?)",
      returnItems: [
        {
          name: "path",
          signature: "PATH?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.algo.aStarConfig",
      signature:
        "(startNode :: NODE?, endNode :: NODE?, relationshipTypesAndDirections :: STRING?, config :: MAP?) :: (path :: PATH?, weight :: FLOAT?)",
      returnItems: [
        {
          name: "path",
          signature: "PATH?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.algo.allSimplePaths",
      signature:
        "(startNode :: NODE?, endNode :: NODE?, relationshipTypesAndDirections :: STRING?, maxNodes :: INTEGER?) :: (path :: PATH?)",
      returnItems: [
        {
          name: "path",
          signature: "PATH?"
        }
      ]
    },
    {
      name: "apoc.algo.betweenness",
      signature:
        "(types :: LIST? OF STRING?, nodes :: LIST? OF NODE?, direction :: STRING?) :: (node :: NODE?, score :: FLOAT?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        },
        {
          name: "score",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.algo.betweennessCypher",
      signature:
        "(config :: MAP?) :: (nodes :: INTEGER?, relationships :: INTEGER?, readNodeMillis :: INTEGER?, readRelationshipMillis :: INTEGER?, computeMillis :: INTEGER?, writeMillis :: INTEGER?, write :: BOOLEAN?, property :: STRING?)",
      returnItems: [
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "readNodeMillis",
          signature: "INTEGER?"
        },
        {
          name: "readRelationshipMillis",
          signature: "INTEGER?"
        },
        {
          name: "computeMillis",
          signature: "INTEGER?"
        },
        {
          name: "writeMillis",
          signature: "INTEGER?"
        },
        {
          name: "write",
          signature: "BOOLEAN?"
        },
        {
          name: "property",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.algo.cliques",
      signature: "(minSize :: NUMBER?) :: (clique :: LIST? OF NODE?)",
      returnItems: [
        {
          name: "clique",
          signature: "LIST? OF NODE?"
        }
      ]
    },
    {
      name: "apoc.algo.cliquesWithNode",
      signature:
        "(startNode :: NODE?, minSize :: NUMBER?) :: (clique :: LIST? OF NODE?)",
      returnItems: [
        {
          name: "clique",
          signature: "LIST? OF NODE?"
        }
      ]
    },
    {
      name: "apoc.algo.closeness",
      signature:
        "(types :: LIST? OF STRING?, nodes :: LIST? OF NODE?, direction :: STRING?) :: (node :: NODE?, score :: FLOAT?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        },
        {
          name: "score",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.algo.community",
      signature:
        "(times :: INTEGER?, labels :: LIST? OF STRING?, partitionKey :: STRING?, type :: STRING?, direction :: STRING?, weightKey :: STRING?, batchSize :: INTEGER?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.algo.cover",
      signature: "(nodes :: ANY?) :: (rel :: RELATIONSHIP?)",
      returnItems: [
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.algo.dijkstra",
      signature:
        "(startNode :: NODE?, endNode :: NODE?, relationshipTypesAndDirections :: STRING?, weightPropertyName :: STRING?) :: (path :: PATH?, weight :: FLOAT?)",
      returnItems: [
        {
          name: "path",
          signature: "PATH?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.algo.dijkstraWithDefaultWeight",
      signature:
        "(startNode :: NODE?, endNode :: NODE?, relationshipTypesAndDirections :: STRING?, weightPropertyName :: STRING?, defaultWeight :: FLOAT?) :: (path :: PATH?, weight :: FLOAT?)",
      returnItems: [
        {
          name: "path",
          signature: "PATH?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.algo.pageRank",
      signature:
        "(nodes :: LIST? OF NODE?) :: (node :: NODE?, score :: FLOAT?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        },
        {
          name: "score",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.algo.pageRankStats",
      signature:
        "(config :: MAP?) :: (nodes :: INTEGER?, relationships :: INTEGER?, iterations :: INTEGER?, readNodeMillis :: INTEGER?, readRelationshipMillis :: INTEGER?, computeMillis :: INTEGER?, writeMillis :: INTEGER?, write :: BOOLEAN?, property :: STRING?)",
      returnItems: [
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "iterations",
          signature: "INTEGER?"
        },
        {
          name: "readNodeMillis",
          signature: "INTEGER?"
        },
        {
          name: "readRelationshipMillis",
          signature: "INTEGER?"
        },
        {
          name: "computeMillis",
          signature: "INTEGER?"
        },
        {
          name: "writeMillis",
          signature: "INTEGER?"
        },
        {
          name: "write",
          signature: "BOOLEAN?"
        },
        {
          name: "property",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.algo.pageRankWithConfig",
      signature:
        "(nodes :: LIST? OF NODE?, config :: MAP?) :: (node :: NODE?, score :: FLOAT?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        },
        {
          name: "score",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.algo.pageRankWithCypher",
      signature:
        "(config :: MAP?) :: (nodes :: INTEGER?, relationships :: INTEGER?, iterations :: INTEGER?, readNodeMillis :: INTEGER?, readRelationshipMillis :: INTEGER?, computeMillis :: INTEGER?, writeMillis :: INTEGER?, write :: BOOLEAN?, property :: STRING?)",
      returnItems: [
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "iterations",
          signature: "INTEGER?"
        },
        {
          name: "readNodeMillis",
          signature: "INTEGER?"
        },
        {
          name: "readRelationshipMillis",
          signature: "INTEGER?"
        },
        {
          name: "computeMillis",
          signature: "INTEGER?"
        },
        {
          name: "writeMillis",
          signature: "INTEGER?"
        },
        {
          name: "write",
          signature: "BOOLEAN?"
        },
        {
          name: "property",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.algo.wcc",
      signature: "() :: (nodeIds :: LIST? OF INTEGER?, stats :: MAP?)",
      returnItems: [
        {
          name: "nodeIds",
          signature: "LIST? OF INTEGER?"
        },
        {
          name: "stats",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.bitwise.op",
      signature:
        "(a :: INTEGER?, operator :: STRING?, b :: INTEGER?) :: (value :: INTEGER?)",
      returnItems: [
        {
          name: "value",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.cluster.graph",
      signature:
        "() :: (nodes :: LIST? OF NODE?, relationships :: LIST? OF RELATIONSHIP?)",
      returnItems: [
        {
          name: "nodes",
          signature: "LIST? OF NODE?"
        },
        {
          name: "relationships",
          signature: "LIST? OF RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.coll.partition",
      signature:
        "(values :: LIST? OF ANY?, batchSize :: INTEGER?) :: (value :: LIST? OF ANY?)",
      returnItems: [
        {
          name: "value",
          signature: "LIST? OF ANY?"
        }
      ]
    },
    {
      name: "apoc.coll.split",
      signature:
        "(values :: LIST? OF ANY?, value :: ANY?) :: (value :: LIST? OF ANY?)",
      returnItems: [
        {
          name: "value",
          signature: "LIST? OF ANY?"
        }
      ]
    },
    {
      name: "apoc.coll.zipToRows",
      signature:
        "(list1 :: LIST? OF ANY?, list2 :: LIST? OF ANY?) :: (value :: LIST? OF ANY?)",
      returnItems: [
        {
          name: "value",
          signature: "LIST? OF ANY?"
        }
      ]
    },
    {
      name: "apoc.config.list",
      signature: "() :: (key :: STRING?, value :: ANY?)",
      returnItems: [
        {
          name: "key",
          signature: "STRING?"
        },
        {
          name: "value",
          signature: "ANY?"
        }
      ]
    },
    {
      name: "apoc.config.map",
      signature: "() :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.convert.setJsonProperty",
      signature: "(node :: NODE?, key :: STRING?, value :: ANY?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.convert.toTree",
      signature: "(paths :: LIST? OF PATH?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.append",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, documentId :: STRING?, json :: STRING?) :: (id :: STRING?, expiry :: INTEGER?, cas :: INTEGER?, mutationToken :: MAP?, content :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "STRING?"
        },
        {
          name: "expiry",
          signature: "INTEGER?"
        },
        {
          name: "cas",
          signature: "INTEGER?"
        },
        {
          name: "mutationToken",
          signature: "MAP?"
        },
        {
          name: "content",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.exists",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, documentId :: STRING?) :: (value :: BOOLEAN?)",
      returnItems: [
        {
          name: "value",
          signature: "BOOLEAN?"
        }
      ]
    },
    {
      name: "apoc.couchbase.get",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, documentId :: STRING?) :: (id :: STRING?, expiry :: INTEGER?, cas :: INTEGER?, mutationToken :: MAP?, content :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "STRING?"
        },
        {
          name: "expiry",
          signature: "INTEGER?"
        },
        {
          name: "cas",
          signature: "INTEGER?"
        },
        {
          name: "mutationToken",
          signature: "MAP?"
        },
        {
          name: "content",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.insert",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, documentId :: STRING?, json :: STRING?) :: (id :: STRING?, expiry :: INTEGER?, cas :: INTEGER?, mutationToken :: MAP?, content :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "STRING?"
        },
        {
          name: "expiry",
          signature: "INTEGER?"
        },
        {
          name: "cas",
          signature: "INTEGER?"
        },
        {
          name: "mutationToken",
          signature: "MAP?"
        },
        {
          name: "content",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.namedParamsQuery",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, statement :: STRING?, paramNames :: LIST? OF STRING?, paramValues :: LIST? OF ANY?) :: (queryResult :: LIST? OF MAP?)",
      returnItems: [
        {
          name: "queryResult",
          signature: "LIST? OF MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.posParamsQuery",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, statement :: STRING?, params :: LIST? OF ANY?) :: (queryResult :: LIST? OF MAP?)",
      returnItems: [
        {
          name: "queryResult",
          signature: "LIST? OF MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.prepend",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, documentId :: STRING?, json :: STRING?) :: (id :: STRING?, expiry :: INTEGER?, cas :: INTEGER?, mutationToken :: MAP?, content :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "STRING?"
        },
        {
          name: "expiry",
          signature: "INTEGER?"
        },
        {
          name: "cas",
          signature: "INTEGER?"
        },
        {
          name: "mutationToken",
          signature: "MAP?"
        },
        {
          name: "content",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.query",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, statement :: STRING?) :: (queryResult :: LIST? OF MAP?)",
      returnItems: [
        {
          name: "queryResult",
          signature: "LIST? OF MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.remove",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, documentId :: STRING?) :: (id :: STRING?, expiry :: INTEGER?, cas :: INTEGER?, mutationToken :: MAP?, content :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "STRING?"
        },
        {
          name: "expiry",
          signature: "INTEGER?"
        },
        {
          name: "cas",
          signature: "INTEGER?"
        },
        {
          name: "mutationToken",
          signature: "MAP?"
        },
        {
          name: "content",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.replace",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, documentId :: STRING?, json :: STRING?) :: (id :: STRING?, expiry :: INTEGER?, cas :: INTEGER?, mutationToken :: MAP?, content :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "STRING?"
        },
        {
          name: "expiry",
          signature: "INTEGER?"
        },
        {
          name: "cas",
          signature: "INTEGER?"
        },
        {
          name: "mutationToken",
          signature: "MAP?"
        },
        {
          name: "content",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.couchbase.upsert",
      signature:
        "(nodes :: LIST? OF STRING?, bucket :: STRING?, documentId :: STRING?, json :: STRING?) :: (id :: STRING?, expiry :: INTEGER?, cas :: INTEGER?, mutationToken :: MAP?, content :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "STRING?"
        },
        {
          name: "expiry",
          signature: "INTEGER?"
        },
        {
          name: "cas",
          signature: "INTEGER?"
        },
        {
          name: "mutationToken",
          signature: "MAP?"
        },
        {
          name: "content",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.create.addLabels",
      signature:
        "(nodes :: ANY?, label :: LIST? OF STRING?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.node",
      signature:
        "(label :: LIST? OF STRING?, props :: MAP?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.nodes",
      signature:
        "(label :: LIST? OF STRING?, props :: LIST? OF MAP?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.relationship",
      signature:
        "(from :: NODE?, relType :: STRING?, props :: MAP?, to :: NODE?) :: (rel :: RELATIONSHIP?)",
      returnItems: [
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.create.removeLabels",
      signature:
        "(nodes :: ANY?, label :: LIST? OF STRING?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.setLabels",
      signature:
        "(nodes :: ANY?, label :: LIST? OF STRING?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.setProperties",
      signature:
        "(nodes :: ANY?, keys :: LIST? OF STRING?, values :: LIST? OF ANY?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.setProperty",
      signature:
        "(nodes :: ANY?, key :: STRING?, value :: ANY?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.setRelProperties",
      signature:
        "(rels :: ANY?, keys :: LIST? OF STRING?, values :: LIST? OF ANY?) :: (rel :: RELATIONSHIP?)",
      returnItems: [
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.create.setRelProperty",
      signature:
        "(relationships :: ANY?, key :: STRING?, value :: ANY?) :: (rel :: RELATIONSHIP?)",
      returnItems: [
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.create.uuids",
      signature: "(count :: INTEGER?) :: (row :: INTEGER?, uuid :: STRING?)",
      returnItems: [
        {
          name: "row",
          signature: "INTEGER?"
        },
        {
          name: "uuid",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.create.vNode",
      signature:
        "(label :: LIST? OF STRING?, props :: MAP?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.vNodes",
      signature:
        "(label :: LIST? OF STRING?, props :: LIST? OF MAP?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.vPattern",
      signature:
        "(from :: MAP?, relType :: STRING?, props :: MAP?, to :: MAP?) :: (from :: NODE?, rel :: RELATIONSHIP?, to :: NODE?)",
      returnItems: [
        {
          name: "from",
          signature: "NODE?"
        },
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        },
        {
          name: "to",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.vPatternFull",
      signature:
        "(labelsN :: LIST? OF STRING?, n :: MAP?, relType :: STRING?, props :: MAP?, labelsM :: LIST? OF STRING?, m :: MAP?) :: (from :: NODE?, rel :: RELATIONSHIP?, to :: NODE?)",
      returnItems: [
        {
          name: "from",
          signature: "NODE?"
        },
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        },
        {
          name: "to",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.create.vRelationship",
      signature:
        "(from :: NODE?, relType :: STRING?, props :: MAP?, to :: NODE?) :: (rel :: RELATIONSHIP?)",
      returnItems: [
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.cypher.doit",
      signature: "(cypher :: STRING?, params :: MAP?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.cypher.mapParallel",
      signature:
        "(fragment :: STRING?, params :: MAP?, list :: LIST? OF ANY?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.cypher.mapParallel2",
      signature:
        "(fragment :: STRING?, params :: MAP?, list :: LIST? OF ANY?, partitions :: INTEGER?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.cypher.parallel",
      signature:
        "(fragment :: STRING?, params :: MAP?, parallelizeOn :: STRING?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.cypher.parallel2",
      signature:
        "(fragment :: STRING?, params :: MAP?, parallelizeOn :: STRING?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.cypher.run",
      signature: "(cypher :: STRING?, params :: MAP?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.cypher.runFile",
      signature: "(file :: STRING?) :: (row :: INTEGER?, result :: MAP?)",
      returnItems: [
        {
          name: "row",
          signature: "INTEGER?"
        },
        {
          name: "result",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.cypher.runMany",
      signature:
        "(cypher :: STRING?, params :: MAP?) :: (row :: INTEGER?, result :: MAP?)",
      returnItems: [
        {
          name: "row",
          signature: "INTEGER?"
        },
        {
          name: "result",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.cypher.runTimeboxed",
      signature:
        "(cypher :: STRING?, params :: MAP?, timeout :: INTEGER?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.date.expire",
      signature:
        "(node :: NODE?, time :: INTEGER?, timeUnit :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.date.expireIn",
      signature:
        "(node :: NODE?, timeDelta :: INTEGER?, timeUnit :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.es.get",
      signature:
        "(host :: STRING?, index :: STRING?, type :: STRING?, id :: STRING?, query :: ANY?, payload :: ANY?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.es.getRaw",
      signature:
        "(host :: STRING?, path :: STRING?, payload :: ANY?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.es.post",
      signature:
        "(host :: STRING?, index :: STRING?, type :: STRING?, id :: STRING?, query :: ANY?, payload :: ANY?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.es.postRaw",
      signature:
        "(host :: STRING?, path :: STRING?, payload :: ANY?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.es.put",
      signature:
        "(host :: STRING?, index :: STRING?, type :: STRING?, id :: STRING?, query :: ANY?, payload :: ANY?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.es.query",
      signature:
        "(host :: STRING?, index :: STRING?, type :: STRING?, query :: ANY?, payload :: ANY?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.es.stats",
      signature: "(host :: STRING?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.example.movies",
      signature:
        "() :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.csv.all",
      signature:
        "(file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.csv.data",
      signature:
        "(nodes :: LIST? OF NODE?, rels :: LIST? OF RELATIONSHIP?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.csv.graph",
      signature:
        "(graph :: MAP?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.csv.query",
      signature:
        "(query :: STRING?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.cypher.all",
      signature:
        "(file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.cypher.data",
      signature:
        "(nodes :: LIST? OF NODE?, rels :: LIST? OF RELATIONSHIP?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.cypher.graph",
      signature:
        "(graph :: MAP?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.cypher.query",
      signature:
        "(query :: STRING?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.cypherAll",
      signature:
        "(file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.cypherData",
      signature:
        "(nodes :: LIST? OF NODE?, rels :: LIST? OF RELATIONSHIP?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.cypherGraph",
      signature:
        "(graph :: MAP?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.cypherQuery",
      signature:
        "(query :: STRING?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.graphml.all",
      signature:
        "(file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.graphml.data",
      signature:
        "(nodes :: LIST? OF NODE?, rels :: LIST? OF RELATIONSHIP?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.graphml.graph",
      signature:
        "(graph :: MAP?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.export.graphml.query",
      signature:
        "(query :: STRING?, file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.generate.ba",
      signature:
        "(noNodes :: INTEGER?, edgesPerNode :: INTEGER?, label :: STRING?, type :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.generate.complete",
      signature:
        "(noNodes :: INTEGER?, label :: STRING?, type :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.generate.er",
      signature:
        "(noNodes :: INTEGER?, noEdges :: INTEGER?, label :: STRING?, type :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.generate.simple",
      signature:
        "(degrees :: LIST? OF INTEGER?, label :: STRING?, type :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.generate.ws",
      signature:
        "(noNodes :: INTEGER?, degree :: INTEGER?, beta :: FLOAT?, label :: STRING?, type :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.gephi.add",
      signature:
        "(urlOrKey :: STRING?, workspace :: STRING?, data :: ANY?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.get.nodes",
      signature: "(nodes :: ANY?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.get.rels",
      signature: "(relationships :: ANY?) :: (rel :: RELATIONSHIP?)",
      returnItems: [
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.graph.from",
      signature:
        "(data :: ANY?, name :: STRING?, properties :: MAP?) :: (graph :: MAP?)",
      returnItems: [
        {
          name: "graph",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.graph.fromCypher",
      signature:
        "(statement :: STRING?, params :: MAP?, name :: STRING?, properties :: MAP?) :: (graph :: MAP?)",
      returnItems: [
        {
          name: "graph",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.graph.fromDB",
      signature: "(name :: STRING?, properties :: MAP?) :: (graph :: MAP?)",
      returnItems: [
        {
          name: "graph",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.graph.fromData",
      signature:
        "(nodes :: LIST? OF NODE?, relationships :: LIST? OF RELATIONSHIP?, name :: STRING?, properties :: MAP?) :: (graph :: MAP?)",
      returnItems: [
        {
          name: "graph",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.graph.fromPath",
      signature:
        "(path :: PATH?, name :: STRING?, properties :: MAP?) :: (graph :: MAP?)",
      returnItems: [
        {
          name: "graph",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.graph.fromPaths",
      signature:
        "(paths :: LIST? OF PATH?, name :: STRING?, properties :: MAP?) :: (graph :: MAP?)",
      returnItems: [
        {
          name: "graph",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.help",
      signature:
        "(proc :: STRING?) :: (type :: STRING?, name :: STRING?, text :: STRING?, signature :: STRING?, roles :: LIST? OF STRING?, writes :: BOOLEAN?)",
      returnItems: [
        {
          name: "type",
          signature: "STRING?"
        },
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "text",
          signature: "STRING?"
        },
        {
          name: "signature",
          signature: "STRING?"
        },
        {
          name: "roles",
          signature: "LIST? OF STRING?"
        },
        {
          name: "writes",
          signature: "BOOLEAN?"
        }
      ]
    },
    {
      name: "apoc.import.graphml",
      signature:
        "(file :: STRING?, config :: MAP?) :: (file :: STRING?, source :: STRING?, format :: STRING?, nodes :: INTEGER?, relationships :: INTEGER?, properties :: INTEGER?, time :: INTEGER?, rows :: INTEGER?)",
      returnItems: [
        {
          name: "file",
          signature: "STRING?"
        },
        {
          name: "source",
          signature: "STRING?"
        },
        {
          name: "format",
          signature: "STRING?"
        },
        {
          name: "nodes",
          signature: "INTEGER?"
        },
        {
          name: "relationships",
          signature: "INTEGER?"
        },
        {
          name: "properties",
          signature: "INTEGER?"
        },
        {
          name: "time",
          signature: "INTEGER?"
        },
        {
          name: "rows",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.index.addAllNodes",
      signature:
        "(index :: STRING?, structure :: MAP?) :: (label :: STRING?, property :: STRING?, nodeCount :: INTEGER?)",
      returnItems: [
        {
          name: "label",
          signature: "STRING?"
        },
        {
          name: "property",
          signature: "STRING?"
        },
        {
          name: "nodeCount",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.index.addAllNodesExtended",
      signature:
        "(index :: STRING?, structure :: MAP?, options :: MAP?) :: (label :: STRING?, property :: STRING?, nodeCount :: INTEGER?)",
      returnItems: [
        {
          name: "label",
          signature: "STRING?"
        },
        {
          name: "property",
          signature: "STRING?"
        },
        {
          name: "nodeCount",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.index.addNode",
      signature: "(node :: NODE?, properties :: LIST? OF STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.index.addNodeByLabel",
      signature:
        "(label :: STRING?, node :: NODE?, properties :: LIST? OF STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.index.addRelationship",
      signature:
        "(relationship :: RELATIONSHIP?, properties :: LIST? OF STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.index.between",
      signature:
        "(from :: NODE?, type :: STRING?, to :: NODE?, query :: STRING?) :: (rel :: RELATIONSHIP?, weight :: FLOAT?, start :: NODE?, end :: NODE?)",
      returnItems: [
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        },
        {
          name: "start",
          signature: "NODE?"
        },
        {
          name: "end",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.index.forNodes",
      signature:
        "(name :: STRING?, config :: MAP?) :: (type :: STRING?, name :: STRING?, config :: MAP?)",
      returnItems: [
        {
          name: "type",
          signature: "STRING?"
        },
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "config",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.index.forRelationships",
      signature:
        "(name :: STRING?, config :: MAP?) :: (type :: STRING?, name :: STRING?, config :: MAP?)",
      returnItems: [
        {
          name: "type",
          signature: "STRING?"
        },
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "config",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.index.in",
      signature:
        "(to :: NODE?, type :: STRING?, query :: STRING?) :: (node :: NODE?, weight :: FLOAT?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.index.list",
      signature: "() :: (type :: STRING?, name :: STRING?, config :: MAP?)",
      returnItems: [
        {
          name: "type",
          signature: "STRING?"
        },
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "config",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.index.nodes",
      signature:
        "(label :: STRING?, query :: STRING?) :: (node :: NODE?, weight :: FLOAT?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.index.orderedByText",
      signature:
        "(label :: STRING?, key :: STRING?, operator :: STRING?, value :: STRING?, relevance :: BOOLEAN?, limit :: INTEGER?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.index.orderedRange",
      signature:
        "(label :: STRING?, key :: STRING?, min :: ANY?, max :: ANY?, relevance :: BOOLEAN?, limit :: INTEGER?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.index.out",
      signature:
        "(from :: NODE?, type :: STRING?, query :: STRING?) :: (node :: NODE?, weight :: FLOAT?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.index.related",
      signature:
        "(nodes :: LIST? OF NODE?, label :: STRING?, key :: STRING?, relationship :: STRING?, limit :: INTEGER?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.index.relationships",
      signature:
        "(type :: STRING?, query :: STRING?) :: (rel :: RELATIONSHIP?, weight :: FLOAT?, start :: NODE?, end :: NODE?)",
      returnItems: [
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        },
        {
          name: "start",
          signature: "NODE?"
        },
        {
          name: "end",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.index.remove",
      signature:
        "(name :: STRING?) :: (type :: STRING?, name :: STRING?, config :: MAP?)",
      returnItems: [
        {
          name: "type",
          signature: "STRING?"
        },
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "config",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.index.search",
      signature:
        "(index :: STRING?, query :: STRING?) :: (node :: NODE?, weight :: FLOAT?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        },
        {
          name: "weight",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.load.csv",
      signature:
        "(url :: STRING?, config :: MAP?) :: (lineNo :: INTEGER?, list :: LIST? OF ANY?, map :: MAP?)",
      returnItems: [
        {
          name: "lineNo",
          signature: "INTEGER?"
        },
        {
          name: "list",
          signature: "LIST? OF ANY?"
        },
        {
          name: "map",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.load.driver",
      signature: "(driverClass :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.load.jdbc",
      signature: "(jdbc :: STRING?, tableOrSql :: STRING?) :: (row :: MAP?)",
      returnItems: [
        {
          name: "row",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.load.jdbcParams",
      signature:
        "(jdbc :: STRING?, sql :: STRING?, params :: LIST? OF ANY?) :: (row :: MAP?)",
      returnItems: [
        {
          name: "row",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.load.json",
      signature: "(url :: STRING?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.load.jsonArray",
      signature: "(url :: STRING?) :: (value :: ANY?)",
      returnItems: [
        {
          name: "value",
          signature: "ANY?"
        }
      ]
    },
    {
      name: "apoc.load.jsonParams",
      signature:
        "(url :: STRING?, headers :: MAP?, payload :: STRING?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.load.xml",
      signature: "(url :: STRING?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.load.xmlSimple",
      signature: "(url :: STRING?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.lock.all",
      signature:
        "(nodes :: LIST? OF NODE?, rels :: LIST? OF RELATIONSHIP?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.lock.nodes",
      signature: "(nodes :: LIST? OF NODE?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.lock.rels",
      signature: "(rels :: LIST? OF RELATIONSHIP?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.meta.data",
      signature:
        "() :: (label :: STRING?, property :: STRING?, count :: INTEGER?, unique :: BOOLEAN?, index :: BOOLEAN?, existence :: BOOLEAN?, type :: STRING?, array :: BOOLEAN?, sample :: LIST? OF ANY?, leftCount :: INTEGER?, rightCount :: INTEGER?, left :: INTEGER?, right :: INTEGER?, other :: LIST? OF STRING?)",
      returnItems: [
        {
          name: "label",
          signature: "STRING?"
        },
        {
          name: "property",
          signature: "STRING?"
        },
        {
          name: "count",
          signature: "INTEGER?"
        },
        {
          name: "unique",
          signature: "BOOLEAN?"
        },
        {
          name: "index",
          signature: "BOOLEAN?"
        },
        {
          name: "existence",
          signature: "BOOLEAN?"
        },
        {
          name: "type",
          signature: "STRING?"
        },
        {
          name: "array",
          signature: "BOOLEAN?"
        },
        {
          name: "sample",
          signature: "LIST? OF ANY?"
        },
        {
          name: "leftCount",
          signature: "INTEGER?"
        },
        {
          name: "rightCount",
          signature: "INTEGER?"
        },
        {
          name: "left",
          signature: "INTEGER?"
        },
        {
          name: "right",
          signature: "INTEGER?"
        },
        {
          name: "other",
          signature: "LIST? OF STRING?"
        }
      ]
    },
    {
      name: "apoc.meta.graph",
      signature:
        "() :: (nodes :: LIST? OF NODE?, relationships :: LIST? OF RELATIONSHIP?)",
      returnItems: [
        {
          name: "nodes",
          signature: "LIST? OF NODE?"
        },
        {
          name: "relationships",
          signature: "LIST? OF RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.meta.graphSample",
      signature:
        "() :: (nodes :: LIST? OF NODE?, relationships :: LIST? OF RELATIONSHIP?)",
      returnItems: [
        {
          name: "nodes",
          signature: "LIST? OF NODE?"
        },
        {
          name: "relationships",
          signature: "LIST? OF RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.meta.stats",
      signature:
        "() :: (labelCount :: INTEGER?, relTypeCount :: INTEGER?, propertyKeyCount :: INTEGER?, nodeCount :: INTEGER?, relCount :: INTEGER?, labels :: MAP?, relTypes :: MAP?, stats :: MAP?)",
      returnItems: [
        {
          name: "labelCount",
          signature: "INTEGER?"
        },
        {
          name: "relTypeCount",
          signature: "INTEGER?"
        },
        {
          name: "propertyKeyCount",
          signature: "INTEGER?"
        },
        {
          name: "nodeCount",
          signature: "INTEGER?"
        },
        {
          name: "relCount",
          signature: "INTEGER?"
        },
        {
          name: "labels",
          signature: "MAP?"
        },
        {
          name: "relTypes",
          signature: "MAP?"
        },
        {
          name: "stats",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.meta.subGraph",
      signature:
        "(config :: MAP?) :: (nodes :: LIST? OF NODE?, relationships :: LIST? OF RELATIONSHIP?)",
      returnItems: [
        {
          name: "nodes",
          signature: "LIST? OF NODE?"
        },
        {
          name: "relationships",
          signature: "LIST? OF RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.mongodb.count",
      signature:
        "(host :: STRING?, db :: STRING?, collection :: STRING?, query :: MAP?) :: (value :: INTEGER?)",
      returnItems: [
        {
          name: "value",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.mongodb.delete",
      signature:
        "(host :: STRING?, db :: STRING?, collection :: STRING?, query :: MAP?) :: (value :: INTEGER?)",
      returnItems: [
        {
          name: "value",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.mongodb.find",
      signature:
        "(host :: STRING?, db :: STRING?, collection :: STRING?, query :: MAP?, project :: MAP?, sort :: MAP?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.mongodb.first",
      signature:
        "(host :: STRING?, db :: STRING?, collection :: STRING?, query :: MAP?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.mongodb.get",
      signature:
        "(host :: STRING?, db :: STRING?, collection :: STRING?, query :: MAP?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.mongodb.insert",
      signature:
        "(host :: STRING?, db :: STRING?, collection :: STRING?, documents :: LIST? OF MAP?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.mongodb.update",
      signature:
        "(host :: STRING?, db :: STRING?, collection :: STRING?, query :: MAP?, update :: MAP?) :: (value :: INTEGER?)",
      returnItems: [
        {
          name: "value",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.monitor.ids",
      signature:
        "() :: (nodeIds :: INTEGER?, relIds :: INTEGER?, propIds :: INTEGER?, relTypeIds :: INTEGER?)",
      returnItems: [
        {
          name: "nodeIds",
          signature: "INTEGER?"
        },
        {
          name: "relIds",
          signature: "INTEGER?"
        },
        {
          name: "propIds",
          signature: "INTEGER?"
        },
        {
          name: "relTypeIds",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.monitor.kernel",
      signature:
        "() :: (readOnly :: BOOLEAN?, kernelVersion :: STRING?, storeId :: STRING?, kernelStartTime :: STRING?, databaseName :: STRING?, storeLogVersion :: INTEGER?, storeCreationDate :: STRING?)",
      returnItems: [
        {
          name: "readOnly",
          signature: "BOOLEAN?"
        },
        {
          name: "kernelVersion",
          signature: "STRING?"
        },
        {
          name: "storeId",
          signature: "STRING?"
        },
        {
          name: "kernelStartTime",
          signature: "STRING?"
        },
        {
          name: "databaseName",
          signature: "STRING?"
        },
        {
          name: "storeLogVersion",
          signature: "INTEGER?"
        },
        {
          name: "storeCreationDate",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.monitor.locks",
      signature:
        "(minWaitTime :: INTEGER?) :: (advertedDeadLocks :: INTEGER?, lockCount :: INTEGER?, contendedLockCount :: INTEGER?, minimumWaitTimeMs :: INTEGER?, contendedLocks :: LIST? OF MAP?, info :: STRING?)",
      returnItems: [
        {
          name: "advertedDeadLocks",
          signature: "INTEGER?"
        },
        {
          name: "lockCount",
          signature: "INTEGER?"
        },
        {
          name: "contendedLockCount",
          signature: "INTEGER?"
        },
        {
          name: "minimumWaitTimeMs",
          signature: "INTEGER?"
        },
        {
          name: "contendedLocks",
          signature: "LIST? OF MAP?"
        },
        {
          name: "info",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.monitor.store",
      signature:
        "() :: (logSize :: INTEGER?, stringStoreSize :: INTEGER?, arrayStoreSize :: INTEGER?, relStoreSize :: INTEGER?, propStoreSize :: INTEGER?, totalStoreSize :: INTEGER?, nodeStoreSize :: INTEGER?)",
      returnItems: [
        {
          name: "logSize",
          signature: "INTEGER?"
        },
        {
          name: "stringStoreSize",
          signature: "INTEGER?"
        },
        {
          name: "arrayStoreSize",
          signature: "INTEGER?"
        },
        {
          name: "relStoreSize",
          signature: "INTEGER?"
        },
        {
          name: "propStoreSize",
          signature: "INTEGER?"
        },
        {
          name: "totalStoreSize",
          signature: "INTEGER?"
        },
        {
          name: "nodeStoreSize",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.monitor.tx",
      signature:
        "() :: (rolledBackTx :: INTEGER?, peakTx :: INTEGER?, lastTxId :: INTEGER?, currentOpenedTx :: INTEGER?, totalOpenedTx :: INTEGER?, totalTx :: INTEGER?)",
      returnItems: [
        {
          name: "rolledBackTx",
          signature: "INTEGER?"
        },
        {
          name: "peakTx",
          signature: "INTEGER?"
        },
        {
          name: "lastTxId",
          signature: "INTEGER?"
        },
        {
          name: "currentOpenedTx",
          signature: "INTEGER?"
        },
        {
          name: "totalOpenedTx",
          signature: "INTEGER?"
        },
        {
          name: "totalTx",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.nodes.delete",
      signature:
        "(nodes :: ANY?, batchSize :: INTEGER?) :: (value :: INTEGER?)",
      returnItems: [
        {
          name: "value",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.nodes.get",
      signature: "(nodes :: ANY?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.nodes.link",
      signature: "(nodes :: LIST? OF NODE?, type :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.nodes.rels",
      signature: "(relationships :: ANY?) :: (rel :: RELATIONSHIP?)",
      returnItems: [
        {
          name: "rel",
          signature: "RELATIONSHIP?"
        }
      ]
    },
    {
      name: "apoc.path.expand",
      signature:
        "(start :: ANY?, relationshipFilter :: STRING?, labelFilter :: STRING?, minLevel :: INTEGER?, maxLevel :: INTEGER?) :: (path :: PATH?)",
      returnItems: [
        {
          name: "path",
          signature: "PATH?"
        }
      ]
    },
    {
      name: "apoc.path.expandConfig",
      signature: "(start :: ANY?, config :: MAP?) :: (path :: PATH?)",
      returnItems: [
        {
          name: "path",
          signature: "PATH?"
        }
      ]
    },
    {
      name: "apoc.periodic.cancel",
      signature:
        "(name :: STRING?) :: (name :: STRING?, delay :: INTEGER?, rate :: INTEGER?, done :: BOOLEAN?, cancelled :: BOOLEAN?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "delay",
          signature: "INTEGER?"
        },
        {
          name: "rate",
          signature: "INTEGER?"
        },
        {
          name: "done",
          signature: "BOOLEAN?"
        },
        {
          name: "cancelled",
          signature: "BOOLEAN?"
        }
      ]
    },
    {
      name: "apoc.periodic.commit",
      signature:
        "(statement :: STRING?, params :: MAP?) :: (updates :: INTEGER?, executions :: INTEGER?, runtime :: INTEGER?, batches :: INTEGER?, faileBatches :: INTEGER?, batchErrors :: MAP?, failedCommits :: INTEGER?, commitErrors :: MAP?)",
      returnItems: [
        {
          name: "updates",
          signature: "INTEGER?"
        },
        {
          name: "executions",
          signature: "INTEGER?"
        },
        {
          name: "runtime",
          signature: "INTEGER?"
        },
        {
          name: "batches",
          signature: "INTEGER?"
        },
        {
          name: "faileBatches",
          signature: "INTEGER?"
        },
        {
          name: "batchErrors",
          signature: "MAP?"
        },
        {
          name: "failedCommits",
          signature: "INTEGER?"
        },
        {
          name: "commitErrors",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.periodic.iterate",
      signature:
        "(cypherIterate :: STRING?, cypherAction :: STRING?, config :: MAP?) :: (batches :: INTEGER?, total :: INTEGER?, timeTaken :: INTEGER?, committedOperations :: INTEGER?, failedOperations :: INTEGER?, failedBatches :: INTEGER?, errorMessages :: MAP?, batch :: MAP?, operations :: MAP?)",
      returnItems: [
        {
          name: "batches",
          signature: "INTEGER?"
        },
        {
          name: "total",
          signature: "INTEGER?"
        },
        {
          name: "timeTaken",
          signature: "INTEGER?"
        },
        {
          name: "committedOperations",
          signature: "INTEGER?"
        },
        {
          name: "failedOperations",
          signature: "INTEGER?"
        },
        {
          name: "failedBatches",
          signature: "INTEGER?"
        },
        {
          name: "errorMessages",
          signature: "MAP?"
        },
        {
          name: "batch",
          signature: "MAP?"
        },
        {
          name: "operations",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.periodic.list",
      signature:
        "() :: (name :: STRING?, delay :: INTEGER?, rate :: INTEGER?, done :: BOOLEAN?, cancelled :: BOOLEAN?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "delay",
          signature: "INTEGER?"
        },
        {
          name: "rate",
          signature: "INTEGER?"
        },
        {
          name: "done",
          signature: "BOOLEAN?"
        },
        {
          name: "cancelled",
          signature: "BOOLEAN?"
        }
      ]
    },
    {
      name: "apoc.periodic.repeat",
      signature:
        "(name :: STRING?, statement :: STRING?, rate :: INTEGER?) :: (name :: STRING?, delay :: INTEGER?, rate :: INTEGER?, done :: BOOLEAN?, cancelled :: BOOLEAN?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "delay",
          signature: "INTEGER?"
        },
        {
          name: "rate",
          signature: "INTEGER?"
        },
        {
          name: "done",
          signature: "BOOLEAN?"
        },
        {
          name: "cancelled",
          signature: "BOOLEAN?"
        }
      ]
    },
    {
      name: "apoc.periodic.rock_n_roll",
      signature:
        "(cypherIterate :: STRING?, cypherAction :: STRING?, batchSize :: INTEGER?) :: (batches :: INTEGER?, total :: INTEGER?, timeTaken :: INTEGER?, committedOperations :: INTEGER?, failedOperations :: INTEGER?, failedBatches :: INTEGER?, errorMessages :: MAP?, batch :: MAP?, operations :: MAP?)",
      returnItems: [
        {
          name: "batches",
          signature: "INTEGER?"
        },
        {
          name: "total",
          signature: "INTEGER?"
        },
        {
          name: "timeTaken",
          signature: "INTEGER?"
        },
        {
          name: "committedOperations",
          signature: "INTEGER?"
        },
        {
          name: "failedOperations",
          signature: "INTEGER?"
        },
        {
          name: "failedBatches",
          signature: "INTEGER?"
        },
        {
          name: "errorMessages",
          signature: "MAP?"
        },
        {
          name: "batch",
          signature: "MAP?"
        },
        {
          name: "operations",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.periodic.rock_n_roll_while",
      signature:
        "(cypherLoop :: STRING?, cypherIterate :: STRING?, cypherAction :: STRING?, batchSize :: INTEGER?) :: (loop :: ANY?, batches :: INTEGER?, total :: INTEGER?)",
      returnItems: [
        {
          name: "loop",
          signature: "ANY?"
        },
        {
          name: "batches",
          signature: "INTEGER?"
        },
        {
          name: "total",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.periodic.submit",
      signature:
        "(name :: STRING?, statement :: STRING?) :: (name :: STRING?, delay :: INTEGER?, rate :: INTEGER?, done :: BOOLEAN?, cancelled :: BOOLEAN?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "delay",
          signature: "INTEGER?"
        },
        {
          name: "rate",
          signature: "INTEGER?"
        },
        {
          name: "done",
          signature: "BOOLEAN?"
        },
        {
          name: "cancelled",
          signature: "BOOLEAN?"
        }
      ]
    },
    {
      name: "apoc.refactor.categorize",
      signature:
        "(sourceKey :: STRING?, type :: STRING?, outgoing :: BOOLEAN?, label :: STRING?, targetKey :: STRING?, copiedKeys :: LIST? OF STRING?, batchSize :: INTEGER?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.refactor.cloneNodes",
      signature:
        "(nodes :: LIST? OF NODE?) :: (input :: INTEGER?, output :: NODE?, error :: STRING?)",
      returnItems: [
        {
          name: "input",
          signature: "INTEGER?"
        },
        {
          name: "output",
          signature: "NODE?"
        },
        {
          name: "error",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.refactor.cloneNodesWithRelationships",
      signature:
        "(nodes :: LIST? OF NODE?) :: (input :: INTEGER?, output :: NODE?, error :: STRING?)",
      returnItems: [
        {
          name: "input",
          signature: "INTEGER?"
        },
        {
          name: "output",
          signature: "NODE?"
        },
        {
          name: "error",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.refactor.collapseNode",
      signature:
        "(nodes :: ANY?, type :: STRING?) :: (input :: INTEGER?, output :: RELATIONSHIP?, error :: STRING?)",
      returnItems: [
        {
          name: "input",
          signature: "INTEGER?"
        },
        {
          name: "output",
          signature: "RELATIONSHIP?"
        },
        {
          name: "error",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.refactor.extractNode",
      signature:
        "(relationships :: ANY?, labels :: LIST? OF STRING?, outType :: STRING?, inType :: STRING?) :: (input :: INTEGER?, output :: NODE?, error :: STRING?)",
      returnItems: [
        {
          name: "input",
          signature: "INTEGER?"
        },
        {
          name: "output",
          signature: "NODE?"
        },
        {
          name: "error",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.refactor.from",
      signature:
        "(relationship :: RELATIONSHIP?, newNode :: NODE?) :: (input :: INTEGER?, output :: RELATIONSHIP?, error :: STRING?)",
      returnItems: [
        {
          name: "input",
          signature: "INTEGER?"
        },
        {
          name: "output",
          signature: "RELATIONSHIP?"
        },
        {
          name: "error",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.refactor.invert",
      signature:
        "(relationship :: RELATIONSHIP?) :: (input :: INTEGER?, output :: RELATIONSHIP?, error :: STRING?)",
      returnItems: [
        {
          name: "input",
          signature: "INTEGER?"
        },
        {
          name: "output",
          signature: "RELATIONSHIP?"
        },
        {
          name: "error",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.refactor.mergeNodes",
      signature: "(nodes :: LIST? OF NODE?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.refactor.normalizeAsBoolean",
      signature:
        "(entity :: ANY?, propertyKey :: STRING?, true_values :: LIST? OF ANY?, false_values :: LIST? OF ANY?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.refactor.setType",
      signature:
        "(relationship :: RELATIONSHIP?, newType :: STRING?) :: (input :: INTEGER?, output :: RELATIONSHIP?, error :: STRING?)",
      returnItems: [
        {
          name: "input",
          signature: "INTEGER?"
        },
        {
          name: "output",
          signature: "RELATIONSHIP?"
        },
        {
          name: "error",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.refactor.to",
      signature:
        "(relationship :: RELATIONSHIP?, newNode :: NODE?) :: (input :: INTEGER?, output :: RELATIONSHIP?, error :: STRING?)",
      returnItems: [
        {
          name: "input",
          signature: "INTEGER?"
        },
        {
          name: "output",
          signature: "RELATIONSHIP?"
        },
        {
          name: "error",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.schema.assert",
      signature:
        "(indexes :: MAP?, constraints :: MAP?) :: (label :: STRING?, key :: LIST? OF STRING?, unique :: BOOLEAN?, action :: STRING?)",
      returnItems: [
        {
          name: "label",
          signature: "STRING?"
        },
        {
          name: "key",
          signature: "LIST? OF STRING?"
        },
        {
          name: "unique",
          signature: "BOOLEAN?"
        },
        {
          name: "action",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.schema.properties.distinct",
      signature:
        "(label :: STRING?, key :: STRING?) :: (value :: LIST? OF ANY?)",
      returnItems: [
        {
          name: "value",
          signature: "LIST? OF ANY?"
        }
      ]
    },
    {
      name: "apoc.search.multiSearchReduced",
      signature:
        "(LabelPropertyMap :: ANY?, operator :: STRING?, value :: STRING?) :: (id :: INTEGER?, labels :: LIST? OF STRING?, values :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "INTEGER?"
        },
        {
          name: "labels",
          signature: "LIST? OF STRING?"
        },
        {
          name: "values",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.search.node",
      signature:
        "(LabelPropertyMap :: ANY?, operator :: STRING?, value :: STRING?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.search.nodeAll",
      signature:
        "(LabelPropertyMap :: ANY?, operator :: STRING?, value :: STRING?) :: (node :: NODE?)",
      returnItems: [
        {
          name: "node",
          signature: "NODE?"
        }
      ]
    },
    {
      name: "apoc.search.nodeAllReduced",
      signature:
        "(LabelPropertyMap :: ANY?, operator :: STRING?, value :: ANY?) :: (id :: INTEGER?, labels :: LIST? OF STRING?, values :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "INTEGER?"
        },
        {
          name: "labels",
          signature: "LIST? OF STRING?"
        },
        {
          name: "values",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.search.nodeReduced",
      signature:
        "(LabelPropertyMap :: ANY?, operator :: STRING?, value :: STRING?) :: (id :: INTEGER?, labels :: LIST? OF STRING?, values :: MAP?)",
      returnItems: [
        {
          name: "id",
          signature: "INTEGER?"
        },
        {
          name: "labels",
          signature: "LIST? OF STRING?"
        },
        {
          name: "values",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.spatial.geocode",
      signature:
        "(location :: STRING?, maxResults :: INTEGER?) :: (location :: MAP?, data :: MAP?, latitude :: FLOAT?, longitude :: FLOAT?, description :: STRING?)",
      returnItems: [
        {
          name: "location",
          signature: "MAP?"
        },
        {
          name: "data",
          signature: "MAP?"
        },
        {
          name: "latitude",
          signature: "FLOAT?"
        },
        {
          name: "longitude",
          signature: "FLOAT?"
        },
        {
          name: "description",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.spatial.geocodeOnce",
      signature:
        "(location :: STRING?) :: (location :: MAP?, data :: MAP?, latitude :: FLOAT?, longitude :: FLOAT?, description :: STRING?)",
      returnItems: [
        {
          name: "location",
          signature: "MAP?"
        },
        {
          name: "data",
          signature: "MAP?"
        },
        {
          name: "latitude",
          signature: "FLOAT?"
        },
        {
          name: "longitude",
          signature: "FLOAT?"
        },
        {
          name: "description",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.spatial.sortByDistance",
      signature:
        "(paths :: LIST? OF PATH?) :: (path :: PATH?, distance :: FLOAT?)",
      returnItems: [
        {
          name: "path",
          signature: "PATH?"
        },
        {
          name: "distance",
          signature: "FLOAT?"
        }
      ]
    },
    {
      name: "apoc.static.get",
      signature: "(key :: STRING?) :: (value :: ANY?)",
      returnItems: [
        {
          name: "value",
          signature: "ANY?"
        }
      ]
    },
    {
      name: "apoc.static.getAll",
      signature: "(prefix :: STRING?) :: (value :: MAP?)",
      returnItems: [
        {
          name: "value",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "apoc.static.list",
      signature: "(prefix :: STRING?) :: (key :: STRING?, value :: ANY?)",
      returnItems: [
        {
          name: "key",
          signature: "STRING?"
        },
        {
          name: "value",
          signature: "ANY?"
        }
      ]
    },
    {
      name: "apoc.static.set",
      signature: "(key :: STRING?, value :: ANY?) :: (value :: ANY?)",
      returnItems: [
        {
          name: "value",
          signature: "ANY?"
        }
      ]
    },
    {
      name: "apoc.text.format",
      signature:
        "(text :: STRING?, params :: LIST? OF ANY?) :: (value :: STRING?)",
      returnItems: [
        {
          name: "value",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.text.lpad",
      signature:
        "(text :: STRING?, count :: INTEGER?, delim :: STRING?) :: (value :: STRING?)",
      returnItems: [
        {
          name: "value",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.text.phonetic",
      signature: "(value :: ANY?) :: (value :: STRING?)",
      returnItems: [
        {
          name: "value",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.text.phoneticDelta",
      signature:
        "(text1 :: STRING?, text2 :: STRING?) :: (phonetic1 :: STRING?, phonetic2 :: STRING?, delta :: INTEGER?)",
      returnItems: [
        {
          name: "phonetic1",
          signature: "STRING?"
        },
        {
          name: "phonetic2",
          signature: "STRING?"
        },
        {
          name: "delta",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "apoc.text.rpad",
      signature:
        "(text :: STRING?, count :: INTEGER?, delim :: STRING?) :: (value :: STRING?)",
      returnItems: [
        {
          name: "value",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "apoc.trigger.add",
      signature:
        "(name :: STRING?, statement :: STRING?, selector :: MAP?) :: (name :: STRING?, query :: STRING?, selector :: MAP?, installed :: BOOLEAN?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "query",
          signature: "STRING?"
        },
        {
          name: "selector",
          signature: "MAP?"
        },
        {
          name: "installed",
          signature: "BOOLEAN?"
        }
      ]
    },
    {
      name: "apoc.trigger.list",
      signature:
        "() :: (name :: STRING?, query :: STRING?, selector :: MAP?, installed :: BOOLEAN?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "query",
          signature: "STRING?"
        },
        {
          name: "selector",
          signature: "MAP?"
        },
        {
          name: "installed",
          signature: "BOOLEAN?"
        }
      ]
    },
    {
      name: "apoc.trigger.remove",
      signature:
        "(name :: STRING?) :: (name :: STRING?, query :: STRING?, selector :: MAP?, installed :: BOOLEAN?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "query",
          signature: "STRING?"
        },
        {
          name: "selector",
          signature: "MAP?"
        },
        {
          name: "installed",
          signature: "BOOLEAN?"
        }
      ]
    },
    {
      name: "apoc.util.sleep",
      signature: "(duration :: INTEGER?) :: VOID",
      returnItems: []
    },
    {
      name: "apoc.warmup.run",
      signature:
        "() :: (pageSize :: INTEGER?, nodesPerPage :: INTEGER?, nodesTotal :: INTEGER?, nodePages :: INTEGER?, nodesTime :: INTEGER?, relsPerPage :: INTEGER?, relsTotal :: INTEGER?, relPages :: INTEGER?, relsTime :: INTEGER?, totalTime :: INTEGER?)",
      returnItems: [
        {
          name: "pageSize",
          signature: "INTEGER?"
        },
        {
          name: "nodesPerPage",
          signature: "INTEGER?"
        },
        {
          name: "nodesTotal",
          signature: "INTEGER?"
        },
        {
          name: "nodePages",
          signature: "INTEGER?"
        },
        {
          name: "nodesTime",
          signature: "INTEGER?"
        },
        {
          name: "relsPerPage",
          signature: "INTEGER?"
        },
        {
          name: "relsTotal",
          signature: "INTEGER?"
        },
        {
          name: "relPages",
          signature: "INTEGER?"
        },
        {
          name: "relsTime",
          signature: "INTEGER?"
        },
        {
          name: "totalTime",
          signature: "INTEGER?"
        }
      ]
    },
    {
      name: "db.awaitIndex",
      signature: "(index :: STRING?, timeOutSeconds = 300 :: INTEGER?) :: VOID",
      returnItems: []
    },
    {
      name: "db.constraints",
      signature: "() :: (description :: STRING?)",
      returnItems: [
        {
          name: "description",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "db.indexes",
      signature:
        "() :: (description :: STRING?, state :: STRING?, type :: STRING?)",
      returnItems: [
        {
          name: "description",
          signature: "STRING?"
        },
        {
          name: "state",
          signature: "STRING?"
        },
        {
          name: "type",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "db.labels",
      signature: "() :: (label :: STRING?)",
      returnItems: [
        {
          name: "label",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "db.propertyKeys",
      signature: "() :: (propertyKey :: STRING?)",
      returnItems: [
        {
          name: "propertyKey",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "db.relationshipTypes",
      signature: "() :: (relationshipType :: STRING?)",
      returnItems: [
        {
          name: "relationshipType",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "db.resampleIndex",
      signature: "(index :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "db.resampleOutdatedIndexes",
      signature: "() :: VOID",
      returnItems: []
    },
    {
      name: "db.schema",
      signature:
        "() :: (nodes :: LIST? OF NODE?, relationships :: LIST? OF RELATIONSHIP?)",
      returnItems: [
        {
          name: "nodes",
          signature: "LIST? OF NODE?"
        },
        {
          name: "relationships",
          signature: "LIST? OF RELATIONSHIP?"
        }
      ]
    },
    {
      name: "dbms.changePassword",
      signature: "(password :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.components",
      signature:
        "() :: (name :: STRING?, versions :: LIST? OF STRING?, edition :: STRING?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "versions",
          signature: "LIST? OF STRING?"
        },
        {
          name: "edition",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "dbms.functions",
      signature:
        "() :: (name :: STRING?, signature :: STRING?, description :: STRING?, roles :: LIST? OF STRING?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "signature",
          signature: "STRING?"
        },
        {
          name: "description",
          signature: "STRING?"
        },
        {
          name: "roles",
          signature: "LIST? OF STRING?"
        }
      ]
    },
    {
      name: "dbms.killQueries",
      signature:
        "(ids :: LIST? OF STRING?) :: (queryId :: STRING?, username :: STRING?)",
      returnItems: [
        {
          name: "queryId",
          signature: "STRING?"
        },
        {
          name: "username",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "dbms.killQuery",
      signature: "(id :: STRING?) :: (queryId :: STRING?, username :: STRING?)",
      returnItems: [
        {
          name: "queryId",
          signature: "STRING?"
        },
        {
          name: "username",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "dbms.listQueries",
      signature:
        "() :: (queryId :: STRING?, username :: STRING?, query :: STRING?, parameters :: MAP?, startTime :: STRING?, elapsedTime :: STRING?, connectionDetails :: STRING?, metaData :: MAP?)",
      returnItems: [
        {
          name: "queryId",
          signature: "STRING?"
        },
        {
          name: "username",
          signature: "STRING?"
        },
        {
          name: "query",
          signature: "STRING?"
        },
        {
          name: "parameters",
          signature: "MAP?"
        },
        {
          name: "startTime",
          signature: "STRING?"
        },
        {
          name: "elapsedTime",
          signature: "STRING?"
        },
        {
          name: "connectionDetails",
          signature: "STRING?"
        },
        {
          name: "metaData",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "dbms.procedures",
      signature:
        "() :: (name :: STRING?, signature :: STRING?, description :: STRING?, roles :: LIST? OF STRING?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "signature",
          signature: "STRING?"
        },
        {
          name: "description",
          signature: "STRING?"
        },
        {
          name: "roles",
          signature: "LIST? OF STRING?"
        }
      ]
    },
    {
      name: "dbms.queryJmx",
      signature:
        "(query :: STRING?) :: (name :: STRING?, description :: STRING?, attributes :: MAP?)",
      returnItems: [
        {
          name: "name",
          signature: "STRING?"
        },
        {
          name: "description",
          signature: "STRING?"
        },
        {
          name: "attributes",
          signature: "MAP?"
        }
      ]
    },
    {
      name: "dbms.security.activateUser",
      signature:
        "(username :: STRING?, requirePasswordChange = true :: BOOLEAN?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.addRoleToUser",
      signature: "(roleName :: STRING?, username :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.changePassword",
      signature:
        "(password :: STRING?, requirePasswordChange = false :: BOOLEAN?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.changeUserPassword",
      signature:
        "(username :: STRING?, newPassword :: STRING?, requirePasswordChange = true :: BOOLEAN?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.clearAuthCache",
      signature: "() :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.createRole",
      signature: "(roleName :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.createUser",
      signature:
        "(username :: STRING?, password :: STRING?, requirePasswordChange = true :: BOOLEAN?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.deleteRole",
      signature: "(roleName :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.deleteUser",
      signature: "(username :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.listRoles",
      signature: "() :: (role :: STRING?, users :: LIST? OF STRING?)",
      returnItems: [
        {
          name: "role",
          signature: "STRING?"
        },
        {
          name: "users",
          signature: "LIST? OF STRING?"
        }
      ]
    },
    {
      name: "dbms.security.listRolesForUser",
      signature: "(username :: STRING?) :: (value :: STRING?)",
      returnItems: [
        {
          name: "value",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "dbms.security.listUsers",
      signature:
        "() :: (username :: STRING?, roles :: LIST? OF STRING?, flags :: LIST? OF STRING?)",
      returnItems: [
        {
          name: "username",
          signature: "STRING?"
        },
        {
          name: "roles",
          signature: "LIST? OF STRING?"
        },
        {
          name: "flags",
          signature: "LIST? OF STRING?"
        }
      ]
    },
    {
      name: "dbms.security.listUsersForRole",
      signature: "(roleName :: STRING?) :: (value :: STRING?)",
      returnItems: [
        {
          name: "value",
          signature: "STRING?"
        }
      ]
    },
    {
      name: "dbms.security.removeRoleFromUser",
      signature: "(roleName :: STRING?, username :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.security.showCurrentUser",
      signature:
        "() :: (username :: STRING?, roles :: LIST? OF STRING?, flags :: LIST? OF STRING?)",
      returnItems: [
        {
          name: "username",
          signature: "STRING?"
        },
        {
          name: "roles",
          signature: "LIST? OF STRING?"
        },
        {
          name: "flags",
          signature: "LIST? OF STRING?"
        }
      ]
    },
    {
      name: "dbms.security.suspendUser",
      signature: "(username :: STRING?) :: VOID",
      returnItems: []
    },
    {
      name: "dbms.setTXMetaData",
      signature: "(data :: MAP?) :: VOID",
      returnItems: []
    }
  ]
};
