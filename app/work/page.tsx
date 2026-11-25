import Link from "next/link";
import type { Metadata } from "next";
import PageShell, { Crumbs } from "../components/PageShell";
import { getProjects, plainName } from "@/lib/projects";
import { site, ids } from "@/lib/site";
import { breadcrumb, graph, ldJson } from "@/lib/schema";

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
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <Crumbs items={[{ name: "Home", href: "/" }, { name: "Work" }]} />
      <h1 className="font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.01em] sm:text-[44px] pb-5">Work</h1>
      <p className="lead pb-8">
        Products I have built and run, client builds from Upsert Labs and open source work. Each story covers the problem, my role, how it
        works, the key decisions and the outcome.
      </p>
      <ol className="work-list">
        {projects.map((p) => (
          <li key={p.slug} className="work-row">
            <Link href={`/work/${p.slug}`}>
              <h2 className="work-name">{p.name}</h2>
              <p className="text-base leading-7 pt-1">{p.oneLine}</p>
              <p className="text-sm text-custom-gray-500 dark:text-app-link-text-default pt-1">
                {p.status} · {p.period}
              </p>
            </Link>
          </li>
        ))}
      </ol>
      <p className="pt-8 text-base leading-7">
        At Aspen Publishing I build core services that other teams and partners build on. That code is private, and I am happy to walk
        through it in an interview.
      </p>
    </PageShell>
  );
}
