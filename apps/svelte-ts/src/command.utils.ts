import type { GenericResult } from "./frames/Generic.types";

export function runCommand(cmd: string): Promise<GenericResult> {
  if (cmd.trim() === ":help") {
    return new Promise((res) =>
      res({ data: "- Cmd / Ctrl + Enter to run command or query" })
    );
  }
}

export function isCommand(str: string) {
  return str.startsWith(":");
}
