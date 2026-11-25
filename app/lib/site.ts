// Single source of truth for site wide SEO constants and the facts that
// search engines and AI answer engines read about the owner.
// Keep every claim here true and matching LinkedIn, GitHub and Upwork.
export const site = {
  name: "Abdulsamad Osunlana",
  shortName: "helloabdulsamad",
  url: "https://helloabdulsamad.com", // no trailing slash
  title: "Abdulsamad Osunlana · Senior Software Engineer in Lagos, Nigeria",
  jobTitle: "Senior Software Engineer",
  description:
    "Senior Software Engineer in Lagos, Nigeria, and founder of Upsert Labs. I build payments, online stores, point of sale and web apps that businesses can trust with their money, in .NET, TypeScript and Next.js.",
  email: "osunlanaabdulsamad@gmail.com",
  phone: "+2348166814024",
  phoneDisplay: "+234 816 681 4024",
  twitter: "",
  locale: "en_GB",
  image: "/img/me-800.webp",
  upwork: "https://www.upwork.com/freelancers/~01b37892b37a65770a",
  sameAs: [
    "https://www.linkedin.com/in/helloabdulsamad/",
    "https://github.com/helloabdulsamad",
    "https://www.upwork.com/freelancers/~01b37892b37a65770a",
  ],
  knowsAbout: [
    "Software engineering",
    "Payments integration",
    "Paystack",
    "Point of sale software",
    "E-commerce",
    "Ticketing platforms",
    "Offline first web apps",
    "REST APIs",
    "C#",
    ".NET",
    "ASP.NET Core",
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Microsoft Azure",
    "Docker",
    "Flutter",
    "Test driven development",
  ],
  studio: {
    name: "Upsert Labs",
    legalName: "Upsert Labs Limited",
    description:
      "Upsert Labs is a software studio in Lagos, Nigeria, founded by Abdulsamad Osunlana. It builds its own products, Upsert, EventHome and Upsert Scout, and takes client projects from research and design to a full build, then runs them after launch.",
    foundingDate: "2026-06",
  },
} as const;

export const ids = {
  website: `${site.url}/#website`,
  person: `${site.url}/#person`,
  studio: `${site.url}/#upsert-labs`,
};
