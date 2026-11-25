import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

// The work cards and their case studies live in site/data.js, which the home
// page loads in the browser. The case study pages read the same file at build
// time, so the two can never drift apart.
export type Project = {
  slug: string;
  name: string;
  oneLine: string;
  hook: string;
  role: string;
  period: string;
  status: string;
  link: string | null;
  problem: string;
  role_text: string;
  approach: string;
  decisions: string;
  outcome: string;
  tag: string;
  ink: string;
  paper: string;
  shot?: string;
  tech?: string[];
};

let cache: Project[] | null = null;

export function getProjects(): Project[] {
  if (cache) return cache;
  const file = path.join(process.cwd(), "site", "data.js");
  const sandbox: { window: { PROJECTS?: Project[] } } = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox);
  cache = sandbox.window.PROJECTS ?? [];
  return cache;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

// The five parts of every case study, in reading order.
export const PARTS: [keyof Project, string][] = [
  ["problem", "The problem"],
  ["role_text", "My role"],
  ["approach", "How it works"],
  ["decisions", "Key decisions"],
  ["outcome", "The outcome"],
];

export const plainName = (p: Project) => p.name.replace(/[’']/g, "'");
