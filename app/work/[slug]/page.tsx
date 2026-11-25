import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell, { Crumbs, tone } from "../../components/PageShell";
import { getProject, getProjects, PARTS, plainName } from "@/lib/projects";
import { site, ids } from "@/lib/site";
import { breadcrumb, graph, ldJson } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${plainName(p)} case study`;
  const url = `/work/${p.slug}`;
  const description = `${p.oneLine} ${p.status}, ${p.period}. A case study by ${site.name}.`;
  const images = p.shot ? [{ url: `/${p.shot}`, width: 1600, height: 1000, alt: `${plainName(p)} screens` }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url, images },
    twitter: { title, description, images: images?.map((i) => i.url) },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const all = getProjects();
  const next = all[(all.indexOf(p) + 1) % all.length];
  const url = `${site.url}/work/${p.slug}`;
  const name = plainName(p);

  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: `${name} case study`,
      description: p.oneLine,
      isPartOf: { "@id": ids.website },
      mainEntity: { "@id": `${url}#work` },
      inLanguage: "en",
      ...(p.shot ? { primaryImageOfPage: `${site.url}/${p.shot}` } : {}),
    },
    {
      "@type": "CreativeWork",
      "@id": `${url}#work`,
      name,
      headline: `${name} case study`,
      abstract: p.hook,
      description: p.oneLine,
      url,
      ...(p.shot ? { image: `${site.url}/${p.shot}` } : {}),
      author: { "@id": ids.person },
      creator: { "@id": ids.person },
      creativeWorkStatus: p.status,
      temporalCoverage: p.period,
      keywords: (p.tech ?? []).join(", "),
      about: {
        "@type": "SoftwareApplication",
        name,
        description: p.oneLine,
        applicationCategory: "BusinessApplication",
        ...(p.link ? { url: p.link } : {}),
      },
      hasPart: PARTS.filter(([k]) => p[k]).map(([k, label]) => ({
        "@type": "WebPageElement",
        name: label,
        text: p[k] as string,
      })),
    },
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name, path: `/work/${p.slug}` },
    ]),
  );

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <Crumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name }]} />

      <article>
        <header className="cs-hero" style={tone(p)}>
          <p className="cs-kicker">
            {p.role} · {p.status}
          </p>
          <h1 className="cs-title">{p.name}</h1>
          <p className="cs-tag">{p.tag}</p>
          <p className="cs-lead">{p.hook}</p>
          <dl className="cs-facts">
            <div>
              <dt>When</dt>
              <dd>{p.period}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{p.status}</dd>
            </div>
            {p.tech && (
              <div className="cs-facts-wide">
                <dt>Built with</dt>
                <dd>{p.tech.join(" · ")}</dd>
              </div>
            )}
          </dl>
          {p.link && (
            <a className="cs-cta" href={p.link} target="_blank" rel="noopener">
              Visit {p.link.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          )}
          {p.shot && (
            <figure className="cs-shot">
              {/* Plain img: the static export has no image server, and the file is already sized. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/${p.shot}`} alt={`${name}: ${p.tag}`} width={1600} height={1000} fetchPriority="high" decoding="async" />
            </figure>
          )}
        </header>

        <div className="cs-body">
          {PARTS.filter(([k]) => p[k]).map(([k, label]) => (
            <section key={k} className="cs-part">
              <h2>
                <span className="cs-dot" style={{ background: p.ink }} aria-hidden="true" />
                {label}
              </h2>
              <p>{p[k] as string}</p>
            </section>
          ))}
        </div>
      </article>

      <aside className="cs-ask">
        <p className="cs-ask-big">Need something like {name} for your business?</p>
        <p className="cs-ask-row">
          <Link className="cs-cta" href="/services">See how I can help</Link>
          <a className="cs-cta" href={`mailto:${site.email}`}>Email {site.email}</a>
        </p>
      </aside>

      <a className="cs-next" href={`/work/${next.slug}`} style={tone(next)}>
        <small>Next project</small>
        <strong>{next.name}</strong>
        <span>{next.tag}</span>
      </a>
    </PageShell>
  );
}
