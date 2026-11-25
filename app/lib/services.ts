// Which service on /services each case study belongs to, so a case study can
// link back to its service and the service can link to the case study.
const map: Record<string, [id: string, name: string]> = {
  "jojo-express": ["web", "web applications"],
  "tredar-pos": ["web", "web applications"],
  inkznpaint: ["web", "web applications"],
  eventhome: ["web", "web applications"],
  upsert: ["backends", "backends and APIs"],
  "upsert-scout": ["backends", "backends and APIs"],
  "open-source-the-standard": ["backends", "backends and APIs"],
  "smarttasker-indonesia": ["mobile", "mobile development"],
  milo: ["ai", "AI development"],
};

export function serviceFor(slug: string) {
  const s = map[slug];
  return s ? { href: `/services#${s[0]}`, name: s[1] } : { href: "/services", name: "our services" };
}
