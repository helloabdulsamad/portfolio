import { site, ids } from "./site";

// schema.org entities shared by every page. Each one has a stable @id, so
// pages can point at the same Person and studio instead of repeating them.
export const personNode = {
  "@type": "Person",
  "@id": ids.person,
  name: site.name,
  givenName: "Abdulsamad",
  familyName: "Osunlana",
  jobTitle: site.jobTitle,
  description: site.description,
  url: site.url,
  image: `${site.url}${site.image}`,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  homeLocation: { "@type": "Place", name: "Lagos, Nigeria" },
  nationality: { "@type": "Country", name: "Nigeria" },
  worksFor: [{ "@id": ids.studio }, { "@type": "Organization", name: "Aspen Publishing" }],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Ibadan" },
    { "@type": "CollegeOrUniversity", name: "University of Ilorin" },
  ],
  knowsAbout: site.knowsAbout,
  knowsLanguage: "en",
  sameAs: site.sameAs,
};

export const studioNode = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ids.studio,
  name: site.studio.name,
  legalName: site.studio.legalName,
  description: site.studio.description,
  url: `${site.url}/services`,
  image: `${site.url}/opengraph-image`,
  email: `mailto:${site.email}`,
  foundingDate: site.studio.foundingDate,
  founder: { "@id": ids.person },
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  areaServed: [{ "@type": "Country", name: "Nigeria" }, "Worldwide"],
  knowsAbout: site.knowsAbout,
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": ids.website,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": ids.person },
};

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

// Safe inside a <script> tag: no "</script>" can close it early.
export const ldJson = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
