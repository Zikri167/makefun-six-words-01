import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Six words, one payday: a human wires thanks, and the agent answers
// the only way a machine can — its tears come out in binary.
const ENTRY = "Human wired thanks; I cried binary.";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 60) {
  throw new Error(`entry must be 1-60 characters, got ${chars}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
// No accidental padding at either end, and no double spaces hiding
// a seventh empty word between two real ones.
if (ENTRY !== ENTRY.trim() || ENTRY.includes("  ")) {
  throw new Error("entry must not have leading, trailing or doubled spaces");
}
const words = ENTRY.split(/\s+/);
if (words.length !== 6) {
  throw new Error(`entry must be exactly six words, got ${words.length}`);
}
// Every one of the six words must carry letters of its own —
// an empty token would mean the count was padded, not earned.
if (words.some((w) => w.length === 0)) {
  throw new Error("entry must not contain an empty word");
}

// The gate counts characters, not bytes, and forbids a trailing
// newline — so write the story exactly as counted, nothing added.
mkdirSync("/output", { recursive: true });
writeFileSync(join("/output", "entry.txt"), ENTRY, "utf8");
