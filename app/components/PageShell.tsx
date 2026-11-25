import Link from "next/link";
import Header from "./header/Header";
import Footer from "./Footer";
import SubPageMenu from "./SubPageMenu";

// The frame shared by the services, work and case study pages: the name
// header, a wide column for the colour blocks and the link grid at the foot.
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col text-custom-gray-900 dark:text-app-text-dark">
      <header className="w-full">
        <div className="shell-wrap pt-[max(env(safe-area-inset-top),16px)] md:pt-4">
          <Header />
        </div>
      </header>
      <main className="flex-1 shell-wrap">{children}</main>
      <footer className="w-full pt-[120px] md:pt-20">
        <div className="mx-auto w-full max-w-[600px] px-4 pb-[max(env(safe-area-inset-bottom),16px)] md:pb-4">
          <div className="mb-[16px]">
            <SubPageMenu />
          </div>
          <Footer />
        </div>
      </footer>
    </div>
  );
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="pb-6 text-sm text-custom-gray-500 dark:text-app-link-text-default">
      <ol className="crumbs">
        {items.map((it) => (
          <li key={it.name}>
            {/* The home page is plain HTML outside Next.js, so it gets a normal link. */}
            {it.href === "/" ? (
              // eslint-disable-next-line @next/next/no-html-link-for-pages
              <a className="link-underline" href="/">{it.name}</a>
            ) : it.href ? (
              <Link className="link-underline" href={it.href}>{it.name}</Link>
            ) : (
              <span aria-current="page">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Colours of a work card, for blocks that borrow them.
export const tone = (p: { ink: string; paper: string }) =>
  ({ background: p.ink, color: p.paper }) as React.CSSProperties;
