import Link from "next/link";
import type { Metadata } from "next";
import PageShell, { Crumbs } from "../components/PageShell";
import { site, ids } from "@/lib/site";
import { breadcrumb, graph, ldJson } from "@/lib/schema";
import { getProject } from "@/lib/projects";

const title = "Hire a senior software engineer in Lagos, Nigeria";
const description =
  "Hire Abdulsamad Osunlana, a Senior Software Engineer in Lagos, or his studio Upsert Labs. Payments, APIs, web apps, online stores, point of sale and mobile apps in .NET, TypeScript and Next.js.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ${site.name}` },
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Abdulsamad Osunlana, Senior Software Engineer" }] },
  twitter: { title, description, images: ["/opengraph-image"] },
};

const services = [
  {
    name: "Payments and checkout",
    text: "Paystack payments, subscriptions, split payouts and webhooks, built so every payment is matched to its order and confirmed once.",
    proof: [["EventHome", "eventhome"], ["Upsert", "upsert"]],
  },
  {
    name: "Backends and APIs",
    text: "Backends and public APIs in C# and .NET or Node.js on PostgreSQL, with automated tests so new changes do not break what already works.",
    proof: [["Upsert Scout", "upsert-scout"], ["Open source with The Standard", "open-source-the-standard"]],
  },
  {
    name: "Web applications",
    text: "Full web applications in Next.js and React, from the screens your customers use to the admin your staff run the business from.",
    proof: [["Jojo Express", "jojo-express"]],
  },
  {
    name: "Online stores and point of sale",
    text: "WooCommerce stores your staff can manage on their own, and a till that keeps selling when the network drops and syncs when it returns.",
    proof: [["Tredar", "tredar-pos"], ["Inkz 'N' Paint", "inkznpaint"]],
  },
  {
    name: "Mobile apps",
    text: "Flutter apps released on the App Store and Google Play, in more than one language.",
    proof: [["SmartTasker Indonesia", "smarttasker-indonesia"]],
  },
  {
    name: "Hosting and care after launch",
    text: "Deployment to your own server with Docker, so running costs stay low, and fixes when something goes wrong after launch.",
    proof: [["Tredar", "tredar-pos"]],
  },
] as const;

// The page shows the six services as four capability rows, each proved by two
// pieces of work. The full list of six still goes into the schema below.
const capabilities = [
  {
    name: "Payments and checkout",
    text: "Paystack payments, subscriptions, split payouts and webhooks. Every payment is matched to its order and confirmed once.",
    work: [["eventhome", "Ticketing"], ["upsert", "Online stores"]],
  },
  {
    name: "Backends and APIs",
    text: "C# and .NET or Node.js on PostgreSQL, with automated tests so new changes do not break what already works.",
    work: [["upsert-scout", "Job alerts"], ["open-source-the-standard", "Open source"]],
  },
  {
    name: "Web applications",
    text: "Next.js and React, from the screens your customers use to the admin your staff run the business from.",
    work: [["jojo-express", "Cargo platform"], ["inkznpaint", "Print store"]],
  },
  {
    name: "Stores, point of sale and mobile",
    text: "A till that keeps selling when the network drops, WooCommerce stores your staff can run, and Flutter apps on both app stores.",
    work: [["tredar-pos", "Point of sale"], ["smarttasker-indonesia", "Mobile app"]],
  },
] as const;

const steps = [
  ["Plan", "A written plan and a fixed quote before any code is written."],
  ["Update", "Clear updates you can follow without a technical background."],
  ["Test", "Automated tests on every change, so what works today keeps working."],
  ["Hand over", "A clean handover your next developer can pick up straight away."],
];

const faqs: [string, string][] = [
  [
    "Who is Abdulsamad Osunlana?",
    "Abdulsamad Osunlana is a Senior Software Engineer in Lagos, Nigeria, and the founder of Upsert Labs. He has built software since 2019, works with Aspen Publishing, a US publisher, and built products such as Tredar, EventHome, Upsert and Upsert Scout.",
  ],
  [
    "Can I hire you as a freelance or contract developer?",
    "Yes. I am open to freelance, contract and full time work, including fully remote roles. You can email me directly or hire me through Upwork.",
  ],
  [
    "What is Upsert Labs?",
    "Upsert Labs is my software studio in Lagos. It builds its own products, Upsert, EventHome and Upsert Scout, and takes on client projects from research and design to a full build. Recent client builds are Jojo Express, a cargo platform live at jojosolutions.com, and the Inkz 'N' Paint online print store.",
  ],
  [
    "Do you work with clients outside Nigeria?",
    "Yes. I work remotely with Aspen Publishing in the United States, and I helped Smarttasker, an Australian company, launch its app in Indonesia. Earlier I worked remotely for AIpidata in the United Kingdom.",
  ],
  [
    "What time zone do you work in?",
    "I work from Lagos on West Africa Time, which is UTC+1. That covers the full working day in the UK and most of Europe, and the morning on the US East Coast.",
  ],
  [
    "Which technologies do you use?",
    "C# and .NET, ASP.NET Core, TypeScript, Next.js, React, Node.js, PostgreSQL, Microsoft Azure, Docker and Flutter. For payments I use Paystack and Stripe.",
  ],
  [
    "Can you integrate Paystack into my product?",
    "Yes. EventHome uses Paystack split payments, so organisers are paid straight into their own accounts. Upsert bills merchants monthly with Paystack subscriptions. In both, every payment is checked against its order and confirmed once.",
  ],
  [
    "How do you stop double charges and overselling?",
    "I put the rule that stops it inside the database, so two buyers clicking at the same second cannot both win. In an EventHome test, 200 buyers raced for 100 tickets. Exactly 100 got one, and no seat was sold twice.",
  ],
  [
    "How much does a project cost?",
    "It depends on the scope. Every project starts with a written plan and a fixed quote, so you know the price before any work begins.",
  ],
  [
    "How do we get started?",
    `Email ${site.email} and tell me what you are building and where it hurts. I will reply with a plan and a fixed quote.`,
  ],
];

const jsonLd = graph(
  {
    "@type": "WebPage",
    "@id": `${site.url}/services#page`,
    url: `${site.url}/services`,
    name: title,
    description,
    isPartOf: { "@id": ids.website },
    about: [{ "@id": ids.person }, { "@id": ids.studio }],
    mainEntity: { "@id": `${site.url}/services#faq` },
    inLanguage: "en",
  },
  {
    "@type": "FAQPage",
    "@id": `${site.url}/services#faq`,
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
  {
    "@type": "OfferCatalog",
    "@id": `${site.url}/services#catalog`,
    name: "Software development services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.text,
        provider: [{ "@id": ids.person }, { "@id": ids.studio }],
        areaServed: "Worldwide",
      },
    })),
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]),
);

export default function Services() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <div className="ci">
        <Crumbs items={[{ name: "Home", href: "/" }, { name: "Services" }]} />

        <header className="ci-hero">
          <h1>{title}</h1>
          <div>
            <p className="ci-lede">
              I am Abdulsamad Osunlana, a Senior Software Engineer in Lagos and the founder of Upsert Labs. Since 2019 I have built payments,
              online stores, point of sale, ticketing and web apps for businesses in Nigeria and abroad. Hire me on my own as a freelance or
              contract engineer, or bring a full project to Upsert Labs.
            </p>
            <div className="ci-acts">
              <a className="ci-btn" href={`mailto:${site.email}`}>Email me</a>
              <a className="ci-tl" href={site.upwork} target="_blank" rel="noopener">Hire me on Upwork</a>
            </div>
          </div>
        </header>

        <h2 className="sr-only">What I build</h2>
        {capabilities.map((c, n) => (
          <section key={c.name} className="ci-row" aria-labelledby={`cap-${n}`}>
            <div>
              <p className="ci-num">{String(n + 1).padStart(2, "0")}</p>
              <h3 id={`cap-${n}`} className="ci-h">{c.name}</h3>
              <p className="ci-text">{c.text}</p>
            </div>
            <ul className="ci-shots">
              {c.work.map(([slug, kind]) => {
                const p = getProject(slug);
                if (!p) return null;
                return (
                  <li key={slug}>
                    <Link href={`/work/${slug}`}>
                      <span className="ci-fig">
                        {p.shot && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={`/${p.shot}`} alt={`${p.name} screenshot`} width={1600} height={1000} loading="lazy" decoding="async" />
                        )}
                      </span>
                      <span className="ci-cap">
                        {p.name} <i>{kind}</i>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="ci-row" aria-labelledby="how">
          <h2 id="how" className="ci-h">How I work</h2>
          <ol className="ci-steps">
            {steps.map(([name, text]) => (
              <li key={name}>
                <b>{name}</b>
                {text}
              </li>
            ))}
          </ol>
        </section>

        <section className="ci-row" aria-labelledby="studio">
          <h2 id="studio" className="ci-h">Upsert Labs</h2>
          <div className="ci-prose">
            <p>
              My software studio builds its own products, <Link href="/work/upsert">Upsert</Link>,{" "}
              <Link href="/work/eventhome">EventHome</Link> and <Link href="/work/upsert-scout">Upsert Scout</Link>, and takes on client
              projects. For a client, we run the job from research and design to a full build, then deploy it to your own server and keep it
              running.
            </p>
            <p>
              Recent client builds are <Link href="/work/jojo-express">Jojo Express</Link>, a cargo platform that prices, books and tracks
              parcels from Nigeria to the UK, Europe and North America, and the <Link href="/work/inkznpaint">Inkz &rsquo;N&rsquo; Paint</Link>{" "}
              online print store.
            </p>
          </div>
        </section>

        <section className="ci-clients" aria-labelledby="clients">
          <h2 id="clients">Where I have worked</h2>
          <p>
            Aspen Publishing in the United States, AXA Mansard in Nigeria, Smarttasker of Australia for its Indonesian launch, AIpidata in the
            United Kingdom, BUNKR Essentials and SolversBay in Lagos, and Upsert Labs clients Jojo Express and Inkz &rsquo;N&rsquo; Paint.{" "}
            <Link href="/about">More about me</Link>.
          </p>
        </section>

        <section className="ci-row ci-faq" aria-labelledby="faq">
          <h2 id="faq" className="ci-h">Questions people ask</h2>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  <h3 className="contents">{q}</h3>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="ci-end" aria-labelledby="start">
          <h2 id="start">Tell me what you are building.</h2>
          <div>
            <p>I will reply with a plan and a fixed quote.</p>
            <a className="ci-btn" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
