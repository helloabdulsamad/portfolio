import { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for `output: "export"` (GH Pages build) — otherwise Next treats
// this route as dynamic and the static export fails to collect its data.
export const dynamic = "force-static";

const BASE_URL = site.url;

// The home page is site/index.html (copied over the export by the deploy
// workflow). Its case studies open in a sheet on that page, not as separate URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/milo/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
  ];
}
