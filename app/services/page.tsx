import Link from "next/link";
import type { Metadata } from "next";
import PageShell, { Crumbs, tone } from "../components/PageShell";
import { getProject } from "@/lib/projects";
import { site, ids } from "@/lib/site";
import { breadcrumb, graph, ldJson } from "@/lib/schema";

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
    colour: "eventhome",
  },
  {
    name: "Backends and APIs",
    text: "Backends and public APIs in C# and .NET or Node.js on PostgreSQL, with automated tests so new changes do not break what already works.",
    proof: [["Upsert Scout", "upsert-scout"], ["Open source with The Standard", "open-source-the-standard"]],
    colour: "upsert-scout",
  },
  {
    name: "Web applications",
    text: "Full web applications in Next.js and React, from the screens your customers use to the admin your staff run the business from.",
    proof: [["Jojo Express", "jojo-express"]],
    colour: "jojo-express",
  },
  {
    name: "Online stores and point of sale",
    text: "WooCommerce stores your staff can manage on their own, and a till that keeps selling when the network drops and syncs when it returns.",
    proof: [["Tredar", "tredar-pos"], ["Inkz 'N' Paint", "inkznpaint"]],
    colour: "inkznpaint",
  },
  {
    name: "Mobile apps",
    text: "Flutter apps released on the App Store and Google Play, in more than one language.",
    proof: [["SmartTasker Indonesia", "smarttasker-indonesia"]],
    colour: "smarttasker-indonesia",
  },
  {
    name: "Hosting and care after launch",
    text: "Deployment to your own server with Docker, so running costs stay low, and fixes when something goes wrong after launch.",
    proof: [["Tredar", "tredar-pos"]],
    colour: "tredar-pos",
  },
] as const;

const steps = [
  "A written plan and a fixed quote before any code is written.",
  "Clear updates you can follow without a technical background.",
  "Automated tests on every change, so what works today keeps working.",
  "A clean handover your next developer can pick up straight away.",
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

const colours = (slug: string) => {
  const p = getProject(slug);
  return p ? tone(p) : undefined;
};

export default function Services() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <Crumbs items={[{ name: "Home", href: "/" }, { name: "Services" }]} />

      <header className="sv-hero" style={colours("eventhome")}>
        <p className="cs-kicker">Services · Lagos, Nigeria · Remote worldwide</p>
        <h1 className="sv-title">{title}</h1>
        <p className="cs-lead">
          I am Abdulsamad Osunlana, a Senior Software Engineer in Lagos and the founder of Upsert Labs. Since 2019 I have built payments,
          online stores, point of sale, ticketing and web apps for businesses in Nigeria and abroad.
        </p>
        <p className="cs-lead">
          You can hire me on my own as a freelance or contract engineer, or bring a full project to Upsert Labs.
        </p>
        <p className="cs-ask-row">
          <a className="cs-cta" href={`mailto:${site.email}`}>Email me</a>
          <a className="cs-cta" href={site.upwork} target="_blank" rel="noopener">Hire me on Upwork</a>
        </p>
      </header>

      <section className="sv-section" aria-labelledby="what">
        <h2 id="what" className="sv-h2">What I build</h2>
        <ul className="sv-grid">
          {services.map((s) => (
            <li key={s.name} className="sv-card" style={colours(s.colour)}>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <p className="sv-proof">
                See{" "}
                {s.proof.map(([n, slug], i) => (
                  <span key={slug}>
                    {i > 0 && " and "}
                    <a href={`/work/${slug}`}>{n}</a>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="sv-section sv-studio" aria-labelledby="studio" style={colours("upsert")}>
        <h2 id="studio" className="sv-h2">Upsert Labs, my software studio</h2>
        <p>
          Upsert Labs builds its own products, <Link href="/work/upsert">Upsert</Link>, <Link href="/work/eventhome">EventHome</Link> and{" "}
          <Link href="/work/upsert-scout">Upsert Scout</Link>, and takes on client projects. For a client, we run the job from research and
          design to a full build, then deploy it and keep it running.
        </p>
        <p>
          Recent client builds are <Link href="/work/jojo-express">Jojo Express</Link>, a cargo platform that prices, books and tracks parcels
          from Nigeria to the UK, Europe and North America, and the <Link href="/work/inkznpaint">Inkz &rsquo;N&rsquo; Paint</Link> online
          print store.
        </p>
      </section>

      <section className="sv-section sv-how" aria-labelledby="how" style={colours("milo")}>
        <h2 id="how" className="sv-h2">How I work</h2>
        <ol className="sv-steps">
          {steps.map((s, i) => (
            <li key={s}>
              <span className="sv-num" aria-hidden="true">0{i + 1}</span>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sv-section" aria-labelledby="clients">
        <h2 id="clients" className="sv-h2">Where I have worked</h2>
        <p className="sv-clients">
          Aspen Publishing in the United States, AXA Mansard in Nigeria, Smarttasker of Australia for its Indonesian launch, AIpidata in the
          United Kingdom, BUNKR Essentials and SolversBay in Lagos, and Upsert Labs clients Jojo Express and Inkz &rsquo;N&rsquo; Paint.
        </p>
        <p className="pt-4 text-base">
          <Link className="link-underline" href="/about">More about me</Link>
        </p>
      </section>

      <section className="sv-section sv-faq" aria-labelledby="faq">
        <h2 id="faq" className="sv-h2">Questions people ask</h2>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              <h3 className="contents">{q}</h3>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      <section className="sv-section sv-start" aria-labelledby="start" style={colours("tredar-pos")}>
        <h2 id="start" className="cs-kicker">Start a project</h2>
        <p className="sv-start-big">Tell me what you are building and where it hurts.</p>
        <p className="cs-lead">I will reply with a plan and a fixed quote.</p>
        <p className="cs-ask-row">
          <a className="cs-cta" href={`mailto:${site.email}`}>{site.email}</a>
          <a className="cs-cta" href={site.upwork} target="_blank" rel="noopener">Upwork</a>
          <a className="cs-cta" href="https://www.linkedin.com/in/helloabdulsamad/" target="_blank" rel="noopener">LinkedIn</a>
        </p>
      </section>
    </PageShell>
  );
}
