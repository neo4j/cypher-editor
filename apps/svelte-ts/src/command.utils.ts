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
