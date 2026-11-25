"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { serviceFor } from "@/lib/services";

type Part = [keyof Project, string];

// The story sheet from the home page, on the work page. A plain click on a card
// slides the story up over the list instead of loading a new page. The card
// links still point at /work/<slug>, so a new tab, a crawler or a reader with
// scripts off gets the full case study page.
export default function WorkSheet({
  projects,
  parts,
  email,
}: {
  projects: Project[];
  parts: Part[];
  email: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closing = useRef(false);

  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const close = useCallback(async () => {
    const el = sheet.current;
    if (!el || closing.current) return;
    closing.current = true;
    const done = () => {
      document.documentElement.classList.remove("ws-open");
      setIndex(null);
      closing.current = false;
      opener.current?.focus({ preventScroll: true });
    };
    if (reduce()) return done();
    const { gsap } = await import("gsap");
    gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut", onComplete: done });
  }, []);

  // Open from any card link with data-open.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-open]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      opener.current = a;
      setIndex(Number(a.dataset.open));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Slide in when a story opens.
  useEffect(() => {
    const el = sheet.current;
    if (index === null || !el || closing.current) return;
    if (el.dataset.shown === "1") return;
    el.dataset.shown = "1";
    document.documentElement.classList.add("ws-open");
    el.scrollTop = 0;
    (el.querySelector(".ws-close") as HTMLElement | null)?.focus({ preventScroll: true });
    if (reduce()) {
      el.style.clipPath = "inset(0 0 0 0)";
      return;
    }
    (async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "expo.inOut" });
      gsap.from(el.querySelectorAll(".sh-title, .sh-hook"), { y: 60, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.35 });
    })();
  }, [index]);

  useEffect(() => {
    if (index === null && sheet.current) sheet.current.dataset.shown = "";
  }, [index]);

  // Escape closes, Tab stays inside the sheet.
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && sheet.current) {
        const items = [...sheet.current.querySelectorAll<HTMLElement>("a,button")];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close]);

  const next = async () => {
    if (index === null) return;
    const i = (index + 1) % projects.length;
    const el = sheet.current;
    if (!el || reduce()) {
      setIndex(i);
      if (el) el.scrollTop = 0;
      return;
    }
    const { gsap } = await import("gsap");
    gsap.to(inner.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        setIndex(i);
        el.scrollTop = 0;
        gsap.to(inner.current, { opacity: 1, duration: 0.4 });
      },
    });
  };

  const p = index === null ? null : projects[index];
  const n = index === null ? null : projects[(index + 1) % projects.length];
  const tone = p ? { background: p.ink, color: p.paper } : undefined;

  return (
    <div
      ref={sheet}
      className="ws"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ws-title"
      hidden={p === null}
    >
      {p && n && (
        <div ref={inner} className="ws-inner">
          <button type="button" className="sh-back" style={tone} onClick={close}>
            All work
          </button>
          <button type="button" className="ws-close sh-close" onClick={close}>
            Close
          </button>
          <header className="sh-head" style={tone}>
            <p className="sh-kicker">
              {p.role} · {p.status} · {p.period}
            </p>
            <h2 id="ws-title" className="sh-title">{p.name}</h2>
            <p className="sh-hook">{p.hook}</p>
            {p.tech && (
              <p className="sh-tech">
                <span>Built with</span>
                {p.tech.join(" · ")}
              </p>
            )}
            {p.link && (
              <a className="sh-link" href={p.link} target="_blank" rel="noopener">
                Visit {p.link.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            )}
            {p.shot && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="sh-shot" src={`/${p.shot}`} alt="" width={1600} height={1000} decoding="async" />
            )}
          </header>
          <div className="sh-body">
            {parts.filter(([k]) => p[k]).map(([k, label]) => (
              <section key={k} className="sh-part">
                <h3>{label}</h3>
                <p>{p[k] as string}</p>
              </section>
            ))}
            <section className="sh-part sh-ask">
              <h3>Work with me</h3>
              <p>
                Need something like {p.name} for your business? See our <a href={serviceFor(p.slug).href}>{serviceFor(p.slug).name} service</a> or email{" "}
                <a href={`mailto:${email}`}>{email}</a>.
              </p>
            </section>
          </div>
          <button type="button" className="sh-next" onClick={next}>
            <small>Next project</small>
            <strong>{n.name}</strong>
          </button>
        </div>
      )}
    </div>
  );
}
