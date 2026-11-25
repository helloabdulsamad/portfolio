import { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Required for `output: "export"`. Otherwise Next treats this route as
// dynamic and the static export fails to collect its data.
export const dynamic = "force-static";

// Search engines and AI answer engines may read every page. The AI crawlers
// are named one by one so the choice is explicit and easy to change later.
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AGENTS, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
