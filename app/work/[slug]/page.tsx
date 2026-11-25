import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell, { Crumbs } from "../../components/PageShell";
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
        <header>
          <p className="section-kicker">Case study · {p.status}</p>
          <h1 className="font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.01em] sm:text-[44px] pb-5">{p.name}</h1>
          <p className="lead pb-6">{p.hook}</p>
          <dl className="facts pb-8">
            <dt>Role</dt>
            <dd>{p.role}</dd>
            <dt>When</dt>
            <dd>{p.period}</dd>
            <dt>Status</dt>
            <dd>{p.status}</dd>
            {p.tech && (
              <>
                <dt>Built with</dt>
                <dd>{p.tech.join(", ")}</dd>
              </>
            )}
            {p.link && (
              <>
                <dt>Live at</dt>
                <dd>
                  <a className="link-underline" href={p.link} target="_blank" rel="noopener">
                    {p.link.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </dd>
              </>
            )}
          </dl>
          {p.shot && (
            <figure className="shot">
              {/* Plain img: the static export has no image server, and the file is already sized. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/${p.shot}`} alt={`${name}: ${p.tag}`} width={1600} height={1000} fetchPriority="high" decoding="async" />
            </figure>
          )}
        </header>

        <div className="pt-10">
          {PARTS.filter(([k]) => p[k]).map(([k, label]) => (
            <section key={k} className="prose-block">
              <h2>{label}</h2>
              <p>{p[k] as string}</p>
            </section>
          ))}
        </div>
      </article>

      <aside className="pt-12">
        <div className="cta-box">
          <p className="text-base leading-7">
            Need something like {name} for your business?{" "}
            <Link className="link-underline" href="/services">See how I can help</Link> or email{" "}
            <a className="link-underline" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
        <p className="pt-8 text-base">
          <span className="text-custom-gray-500 dark:text-app-link-text-default">Next project: </span>
          <a className="link-underline" href={`/work/${next.slug}`}>{next.name}</a>
        </p>
      </aside>
    </PageShell>
  );
}
