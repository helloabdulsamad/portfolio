// Writes the work cards and the structured data into the built home page.
//
// The home page (site/index.html) draws its cards with JavaScript, and many
// search and AI crawlers never run JavaScript. This step, run by the Dockerfile
// after the build, puts the same cards into the HTML itself, each one a real
// link to its case study page, and adds the schema.org graph that the Next.js
// pages already carry, so every page describes the owner the same way.
//
// Usage: node scripts/prerender-home.mjs out
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const outDir = process.argv[2] || "out";
const SITE = "https://helloabdulsamad.com";
const fail = (msg) => {
  console.error(`prerender-home: ${msg}`);
  process.exit(1);
};

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync("site/data.js", "utf8"), sandbox);
const projects = sandbox.window.PROJECTS || [];
if (!projects.length) fail("no projects in site/data.js");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Same markup as the cards main.js builds.
const cards = projects
  .map(
    (p, i) => `<li class="${p.shot ? "card" : "card no-shot"}${p.solid ? " solid" : ""}" style="background:${esc(p.ink)};color:${esc(p.paper)}">
      <a class="card-btn" href="/work/${esc(p.slug)}" data-open="${i}">
        <span class="card-top"><span>${esc(p.status)} · ${esc(p.period)}</span></span>
        <span>
          <h3 class="card-name">${esc(p.name)}</h3>
          ${p.tech ? `<p class="card-tech">${p.tech.map(esc).join(" · ")}</p>` : ""}
        </span>
        <span class="card-bottom">
          <p class="card-hook">${esc(p.tag)}</p>
          <span class="card-cta"><span>Read the story</span></span>
        </span>
      </a>
      ${p.shot ? `<span class="card-shot" aria-hidden="true"><img src="${esc(p.shot)}" alt="" loading="lazy" width="1600" height="1000" /></span>` : ""}
      <span class="card-shade" aria-hidden="true"></span></li>`,
  )
  .join("\n");

// The shared graph (WebSite, Person, Upsert Labs) comes from a built Next.js
// page, so lib/schema.ts stays the one place it is written.
const about = fs.readFileSync(path.join(outDir, "about.html"), "utf8");
const blocks = [...about.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
const shared = blocks.find((b) => (b["@graph"] || []).some((n) => n["@type"] === "WebSite"));
if (!shared) fail("shared schema graph not found in about.html");

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    ...shared["@graph"],
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#page`,
      url: `${SITE}/`,
      name: "Abdulsamad Osunlana · Senior Software Engineer in Lagos, Nigeria",
      isPartOf: { "@id": `${SITE}/#website` },
      mainEntity: { "@id": `${SITE}/#person` },
      primaryImageOfPage: `${SITE}/img/me-800.webp`,
      inLanguage: "en",
      hasPart: { "@id": `${SITE}/#work` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE}/#work`,
      name: "Selected work",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/work/${p.slug}`,
        name: p.name,
      })),
    },
  ],
};

const file = path.join(outDir, "index.html");
let html = fs.readFileSync(file, "utf8");
const STACK = '<ol class="stack" data-stack></ol>';
if (!html.includes(STACK)) fail(`"${STACK}" not found in index.html`);
html = html.replace(STACK, `<ol class="stack" data-stack>\n${cards}\n</ol>`);
if (!html.includes("</head>")) fail("no </head> in index.html");
const ld = JSON.stringify(graph).replace(/</g, "\\u003c");
html = html.replace("</head>", `  <script type="application/ld+json">${ld}</script>\n</head>`);
fs.writeFileSync(file, html);
console.log(`prerender-home: ${projects.length} cards and ${graph["@graph"].length} schema nodes written to ${file}`);
