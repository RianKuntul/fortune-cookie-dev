// Fortune Cookie Wisdom for Developers — entry program (Node 22).
//
// Writes a single original fortune-cookie line for a software developer
// to <MAKEFUN_OUTPUT_DIR>/entry.txt (default /output/entry.txt).
// The line must be 1-120 characters, a single line, with no trailing
// newline in the file (the file holds exactly the line).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune: a "rough estimate" is a wish while you say it, a promise
// once the calendar hears it — and the code remembers the difference,
// keeping score against every shortcut the estimate forced.
const LINE =
  "You called it a rough estimate; the calendar heard a promise, and the code is keeping score.";

// Hard guard: the gate rejects anything over 120 characters, empty,
// whitespace-only, or spanning more than one line.
function validateFortune(line: string): void {
  if (line.length === 0 || line.length > 120) {
    throw new Error(`fortune must be 1-120 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("fortune must be a single line with no newline");
  }
}

validateFortune(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Round-trip check: what landed on disk must be exactly the guarded line.
if (readFileSync(outFile, "utf8") !== LINE) {
  throw new Error("written entry.txt does not match the fortune");
}
console.log(`wrote ${LINE.length}-character fortune to ${outFile}`);
