import type { Metadata } from "next";
import { site, ids } from "@/lib/site";
import { breadcrumb, graph, ldJson } from "@/lib/schema";

const title = "About Abdulsamad Osunlana";
const description =
  "Abdulsamad Osunlana is a Senior Software Engineer working with teams worldwide, building software since 2019. He works with Aspen Publishing and founded Upsert Labs, which builds EventHome, Upsert, Upsert Scout and Tredar.";

export const metadata: Metadata = {
  title: { absolute: `${title} · Senior Software Engineer` },
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", title, description, url: "/about", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Abdulsamad Osunlana, Senior Software Engineer" }] },
  twitter: { title, description, images: ["/opengraph-image"] },
};

const jsonLd = graph(
  {
    "@type": "ProfilePage",
    "@id": `${site.url}/about#page`,
    url: `${site.url}/about`,
    name: title,
    description,
    isPartOf: { "@id": ids.website },
    mainEntity: { "@id": ids.person },
    inLanguage: "en",
  },
  breadcrumb([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]),
);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      {children}
    </>
  );
}
