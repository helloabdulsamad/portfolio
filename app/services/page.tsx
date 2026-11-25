import Link from "next/link";
import BandProgress from "@/components/BandProgress";

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

// The three services on the page. The same list feeds the schema below, so
// what search engines and AI answers read matches what people see.
const services = [
  {
    id: "web",
    name: "Web applications",
    promise: "Websites, portals and dashboards your customers and staff use every day.",
    text: "Custom web applications in Next.js and React: customer portals, admin dashboards, online stores, offline point of sale and booking tools.",
    items: [
      "Custom web application development",
      "Customer portals and accounts",
      "Admin dashboards for your team",
      "Online stores and checkout",
      "Point of sale that works offline",
      "Booking, pricing and tracking tools",
    ],
    get: ["Fast pages built for search", "Updates without calling a developer", "Sales that continue when the network drops"],
    tech: "Next.js · React · TypeScript · WooCommerce",
    work: [["jojo-express", "Cargo booking and tracking"], ["tredar-pos", "Point of sale"], ["inkznpaint", "Online print store"], ["eventhome", "Ticketing"]],
  },
  {
    id: "backends",
    name: "Backends and APIs",
    promise: "The systems behind your product, tested so they keep working as you grow.",
    text: "Backend development and API integration in C# and .NET or Node.js on PostgreSQL, with Paystack and Stripe payments, automated tests and deployment to your own server.",
    items: [
      "Backend development and API integration",
      "Payment integrations with Paystack and Stripe",
      "Database design on PostgreSQL",
      "Background jobs and alerts",
      "Automated tests on every change",
      "Deployment to your own server",
    ],
    get: ["Each payment confirmed once", "New features that do not break old ones", "Low running costs"],
    tech: "C# · .NET · ASP.NET Core · Node.js · PostgreSQL · Docker",
    work: [["upsert", "Store platform"], ["upsert-scout", "Job alerts"], ["open-source-the-standard", "Open source"]],
  },
  {
    id: "mobile",
    name: "Mobile development",
    promise: "Apps for iOS and Android, built once and released on both stores.",
    text: "Cross-platform apps in Flutter, released on the App Store and Google Play, in more than one language and connected to your existing backend.",
    items: [
      "Cross-platform apps in Flutter",
      "App Store and Google Play release",
      "Apps in more than one language",
      "Connection to your existing backend",
    ],
    get: ["One codebase for both stores", "Apps ready for new markets"],
    tech: "Flutter · Dart · Firebase",
    work: [["smarttasker-indonesia", "Mobile app"]],
  },
  {
    id: "ai",
    name: "AI development",
    promise: "AI assistants that answer customers and take orders safely.",
    text: "AI sales assistants on WhatsApp that answer from your own catalogue, look up and take orders, send payment links and hand over to a person when needed.",
    items: [
      "Sales assistants on WhatsApp",
      "Answers from your own product catalogue",
      "Order lookup and order taking",
      "Payment links inside the chat",
      "Handover to a person when needed",
    ],
    get: ["Customers answered at any hour", "Each customer sees only their own orders"],
    tech: "WhatsApp Cloud API · DeepSeek · .NET · Paystack",
    work: [["milo", "WhatsApp sales assistant"]],
  },
] as const;

const steps = [
  ["Plan", "A written plan and a fixed quote before any code is written."],
  ["Build", "Clear updates you can follow without a technical background."],
  ["Test", "Automated tests on every change, so what works today keeps working."],
  ["Hand over", "Deployed to your own server, with a handover your next developer can pick up."],
];

// Studio clients, then teams Abdulsamad built for before and alongside the studio.
const clients = [
  ["Jojo Express", "Studio client"],
  ["Inkz 'N' Paint", "Studio client"],
  ["Aspen Publishing", "United States"],
  ["AXA Mansard", "Nigeria"],
  ["Smarttasker", "Australia, launch in Indonesia"],
  ["AIpidata", "United Kingdom"],
  ["BUNKR Essentials", "Lagos"],
  ["SolversBay", "Lagos"],
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
    "Upsert Labs is a software studio in Lagos run by Abdulsamad Osunlana. It builds web applications, backends and APIs, mobile apps and AI assistants. It runs its own products, Upsert, EventHome and Upsert Scout, and takes on client projects from research and design to a full build. Recent client builds are Jojo Express, a cargo platform live at jojosolutions.com, and the Inkz 'N' Paint online print store.",
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
        url: `${site.url}/services#${s.id}`,
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
              Abdulsamad Osunlana runs Upsert Labs, a software studio in Lagos. We build web applications, backends and
              APIs, mobile apps and AI assistants for businesses in Nigeria and abroad. Bring us a full project, or hire Abdulsamad on his own as a
              freelance or contract engineer.
            </p>
            <div className="ci-acts">
              <a className="ci-btn" href={`mailto:${site.email}`}>Start a project</a>
              <a className="ci-tl" href={site.upwork} target="_blank" rel="noopener">Hire Abdulsamad on Upwork</a>
            </div>
          </div>
        </header>

        <BandProgress />
        <section className="sv" aria-labelledby="what">
          <div className="sv-top">
            <h2 id="what">What we do</h2>
            <p>Four services, each led by Abdulsamad from the first plan to launch.</p>
          </div>
          {services.map((s, n) => (
            <section key={s.id} id={s.id} className="sv-band" aria-labelledby={`${s.id}-h`}>
              <div className="sv-in">
                <div className="sv-side">
                  <p className="sv-num">
                    {String(n + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </p>
                  <h3 id={`${s.id}-h`} className="sv-name">{s.name}</h3>
                  <span className="sv-bar" aria-hidden="true"><i /></span>
                </div>
                <div className="sv-detail">
                  <p className="sv-promise">{s.promise}</p>
                  <div className="sv-grid">
                    <div>
                      <h4>What we build</h4>
                      <ul className="sv-list">
                        {s.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>What you get</h4>
                      <ul className="sv-get">
                        {s.get.map((g) => (
                          <li key={g}>{g}</li>
                        ))}
                      </ul>
                      <p className="sv-tech">
                        <span>Built with</span> {s.tech}
                      </p>
                      <h4 className="sv-h-work">Related work</h4>
                      <ul className="sv-work">
                        {s.work.map(([slug, kind]) => {
                          const p = getProject(slug);
                          if (!p) return null;
                          return (
                            <li key={slug}>
                              <Link href={`/work/${slug}`}>
                                <b>{p.name}</b>
                                <span>{kind}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </section>

        <section className="sv-how" aria-labelledby="how">
          <h2 id="how">How we work</h2>
          <ol>
            {steps.map(([name, text], n) => (
              <li key={name}>
                <span>{String(n + 1).padStart(2, "0")}</span>
                <b>{name}</b>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="sv-studio" aria-labelledby="studio">
          <h2 id="studio">About Upsert Labs</h2>
          <p className="sv-say">
            Upsert Labs builds and runs its own products, <Link href="/work/upsert">Upsert</Link>,{" "}
            <Link href="/work/eventhome">EventHome</Link> and <Link href="/work/upsert-scout">Upsert Scout</Link>, so the software we build for
            clients is software we would run ourselves.
          </p>
          <p className="sv-founder">
            Every project is led by Abdulsamad Osunlana, a Senior Software Engineer who has built software since 2019.{" "}
            <Link href="/about">More about Abdulsamad</Link>
          </p>
        </section>

        <section className="sv-clients" aria-labelledby="clients">
          <h2 id="clients">Clients and experience</h2>
          <ul>
            {clients.map(([name, note]) => (
              <li key={name}>
                <b>{name}</b>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="sv-faq ci-faq" aria-labelledby="faq">
          <h2 id="faq">Questions people ask</h2>
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

        <section className="sv-end" aria-labelledby="start">
          <h2 id="start">Tell us what you are building.</h2>
          <div>
            <p>We will reply with a plan and a fixed quote.</p>
            <a className="sv-mail" href={`mailto:${site.email}`}>{site.email}</a>
            <p className="sv-call">
              or call <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
