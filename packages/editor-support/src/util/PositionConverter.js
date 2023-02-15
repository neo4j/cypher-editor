export class PositionConverter {
  newLines = [];

  constructor(input) {
    for (let i = 0; i < input.length; i += 1) {
      if (input[i] === "\n") {
        this.newLines.push(i);
      }
    }
  }

  toAbsolute(line, column) {
    return (this.newLines[line - 2] || -1) + column + 1;
  }

  toRelative(abs) {
    for (let i = this.newLines.length - 1; i >= 0; i -= 1) {
      const column = abs - this.newLines[i];
      if (column >= 1) {
        return { line: i + 2, column: column - 1 };
      }
    }

    return { line: 1, column: abs };
  }
}
