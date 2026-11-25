import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/projects";

// Required for `output: "export"`. Otherwise Next treats this route as
// dynamic and the static export fails to collect its data.
export const dynamic = "force-static";

const BASE_URL = site.url;

// The home page is site/index.html, copied over the export by the Dockerfile.
// Every case study also has its own page under /work.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...getProjects().map((p) => ({
      url: `${BASE_URL}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(p.shot ? { images: [`${BASE_URL}/${p.shot}`] } : {}),
    })),
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/milo/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
