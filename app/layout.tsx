import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

// Display face for the hero and headings. Body stays on SF Pro.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
import PageTransition from "./components/PageTransition";
import Menu from "./components/Menu";
import { ThemeProvider } from "./components/ThemeProvider";
import { site } from "./lib/site";
import { graph, ldJson, personNode, studioNode, websiteNode } from "./lib/schema";


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // Stop browsers from auto-linking detected emails, phone numbers and addresses.
  formatDetection: { email: false, telephone: false, address: false },
  applicationName: site.shortName,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  // Each page sets its own canonical URL. None here, so no page inherits the home page's.
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    types: { "text/plain": [{ url: "/llms.txt", title: "LLM summary" }] },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#161616" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = graph(websiteNode, personNode, studioNode);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement,th=localStorage.getItem("theme");if(th==="dark"||((!th||th==="system")&&matchMedia("(prefers-color-scheme: dark)").matches))d.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      {/* Next injects <head> from metadata/viewport */}
      <body
        className={`${bricolage.variable} antialiased bg-white text-custom-gray-900 dark:bg-app-bg-dark dark:text-app-text-dark`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }}
        />
        <ViewTransitions>
          <ThemeProvider>
            <Menu />
            <PageTransition>{children}</PageTransition>
          </ThemeProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
