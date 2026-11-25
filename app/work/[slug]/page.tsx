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
    <PageShell sheet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <Link className="sh-back" href="/work" style={tone(p)}>
        All work
      </Link>

      <article>
        <header className="sh-head" style={tone(p)}>
          <div className="sh-crumbs">
            <Crumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name }]} />
          </div>
          <p className="sh-kicker">
            {p.role} · {p.status} · {p.period}
          </p>
          <h1 className="sh-title">{p.name}</h1>
          <p className="sh-hook">{p.hook}</p>
          {p.tech && (
            <p className="sh-tech">
              <span>Built with</span>
              {p.tech.join(" · ")}
            </p>
          )}
          {p.link && (
            <a className="sh-link" href={p.link} target="_blank" rel="noopener">
              Visit {p.link.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          )}
          {p.shot && (
            // Plain img: the static export has no image server, and the file is already sized.
            // eslint-disable-next-line @next/next/no-img-element
            <img className="sh-shot" src={`/${p.shot}`} alt={`${name}: ${p.tag}`} width={1600} height={1000} fetchPriority="high" decoding="async" />
          )}
        </header>

        <div className="sh-body">
          {PARTS.filter(([k]) => p[k]).map(([k, label]) => (
            <section key={k} className="sh-part">
              <h2>{label}</h2>
              <p>{p[k] as string}</p>
            </section>
          ))}
          <section className="sh-part sh-ask">
            <h2>Work with me</h2>
            <p>
              Need something like {name} for your business? <Link href="/services">See how I can help</Link> or email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
        </div>
      </article>

      <a className="sh-next" href={`/work/${next.slug}`}>
        <small>Next project</small>
        <strong>{next.name}</strong>
      </a>
    </PageShell>
  );
}
