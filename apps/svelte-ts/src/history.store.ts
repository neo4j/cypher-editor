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

import { get, writable } from "svelte/store";

type HistoryStoreEvents =
  | "PUSH_CURRENT"
  | "STEP_BACK"
  | "STEP_FORWARD"
  | "SET_CURRENT";
type EventPayload = string;

export function historyStore(initValue: string = "", stackSize: number = 20) {
  let stackIndex: number | null = null;
  let stack = [];
  let editBuffer = "";

  const store = writable<string>(initValue);

  const send = (event: HistoryStoreEvents, payload?: EventPayload): void => {
    switch (event) {
      case "PUSH_CURRENT":
        stack.push(get(store));
        stack = stack.slice(-1 * stackSize);
        stackIndex = null;
        store.set("");
        break;
      case "STEP_BACK":
        if (stackIndex === null && stack.length) {
          editBuffer = get(store);
          stackIndex = stack.length;
        }
        if (stackIndex > 0) {
          stackIndex--;
          store.set(stack[stackIndex]);
        }
        break;
      case "STEP_FORWARD":
        if (stackIndex < stack.length - 1 && stackIndex !== null) {
          stackIndex++;
          store.set(stack[stackIndex]);
        } else if (stackIndex === stack.length - 1) {
          stackIndex = null;
          store.set(editBuffer);
        }
        break;
      case "SET_CURRENT":
        store.set(payload);
        stackIndex = null;
        break;
      default:
        break;
    }
  };

  return { subscribe: store.subscribe, set: store.set, send };
}
