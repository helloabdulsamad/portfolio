import type { Metadata } from "next";
import PageShell, { Crumbs, tone } from "../components/PageShell";
import { getProjects, plainName, PARTS } from "@/lib/projects";
import { site, ids } from "@/lib/site";
import { breadcrumb, graph, ldJson } from "@/lib/schema";
import WorkStack from "./WorkStack";
import WorkSheet from "./WorkSheet";

const title = "Work and case studies";
const description =
  "Case studies of software built by Abdulsamad Osunlana and Upsert Labs: Tredar point of sale, EventHome ticketing, Upsert online stores, Upsert Scout, Jojo Express cargo and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { title, description, url: "/work", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Abdulsamad Osunlana, Senior Software Engineer" }] },
  twitter: { title, description, images: ["/opengraph-image"] },
};

export default function Work() {
  const projects = getProjects();
  const jsonLd = graph(
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/work#page`,
      url: `${site.url}/work`,
      name: title,
      description,
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.person },
      inLanguage: "en",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${site.url}/work/${p.slug}`,
          name: plainName(p),
        })),
      },
    },
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
    ]),
  );

  return (
    <PageShell bar>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <Crumbs items={[{ name: "Home", href: "/" }, { name: "Work" }]} />
      <header className="wk-head">
        <h1 className="wk-title">Work</h1>
        <p className="wk-lead">
          Products I have built and run, client builds from Upsert Labs and open source work. Each story covers the problem, my role, how it
          works, the key decisions and the outcome.
        </p>
      </header>
      <WorkStack>
        {projects.map((p, i) => (
          <li key={p.slug} className={p.shot ? "wk-card" : "wk-card no-shot"} style={tone(p)}>
            <a href={`/work/${p.slug}`} className="wk-link" data-open={i}>
              <span className="wk-meta">
                {p.status} · {p.period}
              </span>
              <span className="wk-mid">
                <h2 className="wk-name">{p.name}</h2>
                <span className="wk-tech">{p.oneLine}</span>
              </span>
              <span className="wk-bottom">
                <span className="wk-tag">{p.tag}</span>
                <span className="wk-more">Read the story</span>
              </span>
            </a>
            {p.shot && (
              <span className="wk-shot" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/${p.shot}`} alt="" width={1600} height={1000} loading="lazy" decoding="async" />
              </span>
            )}
            <span className="wk-shade" aria-hidden="true" />
          </li>
        ))}
      </WorkStack>
      <WorkSheet projects={projects} parts={PARTS} email={site.email} />
      <p className="wk-note">
        At Aspen Publishing I build core services that other teams and partners build on. That code is private, and I am happy to walk
        through it in an interview.
      </p>
    </PageShell>
  );
}
