"use client";

import { useEffect, useRef } from "react";

// The same scroll motion as the home page cards: each card sticks, shrinks and
// darkens as the next one slides over it, the screenshot drifts up and the
// name rises in. Skipped for people who ask for reduced motion.
export default function WorkStack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let revert = () => {};
    let live = true;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!live) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".wk-card", root);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (next)
            gsap
              .timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top 12%", scrub: true } })
              .to(card, { scale: 0.9, ease: "none" }, 0)
              .to(card.querySelector(".wk-shade"), { opacity: 0.55, ease: "none" }, 0);
          const shot = card.querySelector(".wk-shot");
          if (shot)
            gsap.fromTo(shot, { yPercent: 16 }, { yPercent: -3, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 10%", scrub: true } });
          gsap.from(card.querySelector(".wk-name"), { yPercent: 40, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 75%" } });
        });
      }, root);
      revert = () => ctx.revert();
    })();
    return () => {
      live = false;
      revert();
    };
  }, []);

  return (
    <ol ref={ref} className="wk-stack">
      {children}
    </ol>
  );
}
