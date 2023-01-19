<!--
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
-->
<script lang="ts">
  import { Node, isInt, type QueryResult } from "neo4j-driver";
  export let result: QueryResult;
  const recordObjs: { keys: string[]; rows: any[] } = result.records.reduce(
    (all, r, index) => {
      const keys = r.keys;
      if (index === 0) {
        all.keys = [...keys];
      }
      all.rows.push(
        keys.map((key) => JSON.stringify(formatValue(r.get(key)), null, 2))
      );
      return all;
    },
    { keys: [], rows: [] }
  );
  function formatValue(x: any) {
    if (isInt(x)) {
      return x.toInt();
    }
    if (Number(x) === x) {
      // Not loving that we get quotes around floats,
      // but it's the only way to differenciate ints from floats
      // without having to write our own JSON.stringify
      return Number.isInteger(x) ? x.toFixed(1) : x;
    }
    if (typeof x === "string" && !x.startsWith("{")) {
      return x;
    }
    // JSON strings, do not quote
    if (typeof x === "string") {
      return JSON.parse(x);
    }

    if (x === null) {
      return x;
    }

    if (Array.isArray(x)) {
      return x.map((v) => formatValue(v));
      return x;
    }

    if (typeof x === "object") {
      let out = {};
      Object.keys(x).forEach((key) => {
        out[key] = formatValue(x[key]);
      });
      return out;
    }

    return x;
  }
</script>

<table>
  <thead
    ><tr>
      {#each recordObjs.keys as key}
        <td>{key}</td>
      {/each}
    </tr></thead
  >
  <tbody>
    {#each recordObjs.rows as row}
      <tr>
        {#each row as col}
          <td><pre>{col}</pre></td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
  }
  thead td {
    border-bottom: 1px solid #ccc;
    font-size: 1rem;
  }

  td {
    min-width: 200px;
  }
  pre {
    background-color: #fafafa;
    border-radius: 6px;
    padding: 8px;
    overflow-x: auto;
  }
</style>
