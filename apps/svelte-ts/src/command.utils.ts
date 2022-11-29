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

import type { GenericResult } from "./frames/Generic.types";

type Commands = {
  [key: string]: Command;
};
type Command = {
  name: string;
  match: (input: string) => boolean;
  exec: () => GenericResult;
};

export const commands: Commands = {
  HELP: {
    name: ":help",
    match: (input: string) => input === ":help",
    exec: () => ({
      data: "- Cmd / Ctrl + Enter to run command or query\n- Cmd / Ctrl + Up / Down to step in history"
    })
  }
};
export const consoleCommands = Object.keys(commands).map((c) => ({
  name: commands[c].name
}));

export function runCommand(cmd: string): Promise<GenericResult> {
  const c = cmd.trim();
  for (let command in commands) {
    const checkCommand = commands[command];
    if (checkCommand.match(c)) {
      return new Promise((res) => res(checkCommand.exec()));
    }
  }
}

export function isCommand(str: string) {
  return str.startsWith(":");
}
