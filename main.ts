import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { setFlagsFromString } from "node:v8";
import { run } from "./solve.js";

setFlagsFromString("--no-incremental-marking --max-semi-space-size=64 --no-flush-bytecode");

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? "/input";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const cases = JSON.parse(readFileSync(join(INPUT_DIR, "cases.json"), "utf8")) as { id: string; input: unknown }[];
const answers: unknown[] = [];
for (let i = 0; i < cases.length; i++) {
  answers.push(run(cases[i].input));
}

writeFileSync(join(OUTPUT_DIR, "answers.json"), JSON.stringify(answers));
process.exit(0);
