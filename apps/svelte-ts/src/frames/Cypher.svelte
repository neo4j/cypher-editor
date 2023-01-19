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
  import { isInt, type QueryResult } from "neo4j-driver";
  import CopyIcon from "../CopyIcon.svelte";
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
  function copy(what: string) {
    navigator.clipboard.writeText(what);
  }
</script>

<table>
  <thead
    ><tr>
      {#each recordObjs.keys as key}
        <th>
          {key}
        </th>
      {/each}
    </tr></thead
  >
  <tbody>
    {#each recordObjs.rows as row}
      <tr>
        {#each row as col}
          <td
            ><pre>{col}</pre>
            <button class="copy-icon" on:click={() => copy(col)}
              ><CopyIcon /></button
            ></td
          >
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .copy-icon {
    border: 0;
    margin: 0;
    padding: 1px;
    width: 16px;
    height: 16px;
    position: absolute;
    right: 10px;
    top: 20px;
    cursor: pointer;
    display: none;
    background-color: transparent;
  }
  :global(.copy-icon svg) {
    fill: #bbb;
  }
  :global(.copy-icon:active svg) {
    fill: #888;
  }
  table {
    width: 100%;
    border-spacing: 16px 8px;
    border-collapse: separate;
    text-align: left;
  }
  th {
    border-bottom: 1px solid #ccc;
    font-size: 1rem;
  }

  tr {
    vertical-align: top;
  }

  td {
    white-space: nowrap;
    min-width: 100px;
    position: relative;
    border-bottom: 1px solid #efefef;
  }
  td:hover .copy-icon {
    display: block;
  }
  pre {
    background-color: #fafafa;
    border-radius: 6px;
    padding: 8px;
    white-space: pre-wrap;
  }
</style>
