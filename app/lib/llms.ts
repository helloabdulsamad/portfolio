import { site } from "./site";
import { getProjects, PARTS, plainName } from "./projects";

// llms.txt (https://llmstxt.org): a plain summary of the site for AI answer
// engines, built from the same facts as the pages so it never goes stale.
export function llmsSummary(): string {
  const projects = getProjects();
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Abdulsamad Osunlana is a Senior Software Engineer who works with teams worldwide, on UTC+1. He has built software since 2019, works with Aspen Publishing, a US publisher, and is the founder of Upsert Labs, a software studio. He is open to freelance, contract and full time work, including fully remote roles. Contact: " +
      site.email +
      " or " +
      site.phoneDisplay +
      ".",
    "",
    "## Pages",
    "",
    `- [Services and FAQ](${site.url}/services): what he builds, how he works, and answers to common hiring questions`,
    `- [Work](${site.url}/work): every case study on one page`,
    `- [About](${site.url}/about): background, experience and stack`,
    `- [Full text for AI tools](${site.url}/llms-full.txt): every case study in full`,
    "",
    "## Case studies",
    "",
    ...projects.map((p) => `- [${plainName(p)}](${site.url}/work/${p.slug}): ${p.oneLine} ${p.status}, ${p.period}.`),
    "",
    "## Profiles",
    "",
    ...site.sameAs.map((u) => `- ${u}`),
    "",
  ].join("\n");
}

export function llmsFull(): string {
  const out = [llmsSummary(), "## Case studies in full", ""];
  for (const p of getProjects()) {
    out.push(`### ${plainName(p)}`, "", `URL: ${site.url}/work/${p.slug}`, `Role: ${p.role}`, `When: ${p.period}`, `Status: ${p.status}`);
    if (p.link) out.push(`Live at: ${p.link}`);
    if (p.tech) out.push(`Built with: ${p.tech.join(", ")}`);
    out.push("", p.hook, "");
    for (const [k, label] of PARTS) if (p[k]) out.push(`#### ${label}`, "", String(p[k]), "");
  }
  return out.join("\n");
}
