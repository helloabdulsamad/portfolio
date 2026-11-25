"use client";

import { useEffect } from "react";

// Fills the line under each pinned band title as the reader scrolls through
// that band. The line eases toward the scroll position every frame, so it
// glides instead of stepping with each scroll event. Works in every browser.
export default function BandProgress() {
  useEffect(() => {
    const bands = [...document.querySelectorAll<HTMLElement>(".sv-band")];
    const bars = bands.map((b) => b.querySelector<HTMLElement>(".sv-bar i"));
    const now = bands.map(() => 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const target = (b: HTMLElement) => {
      const vh = window.innerHeight;
      const r = b.getBoundingClientRect();
      return Math.min(1, Math.max(0, (vh * 0.35 - r.top) / Math.max(1, r.height - vh * 0.35)));
    };
    const tick = () => {
      raf = 0;
      let moving = false;
      bands.forEach((b, i) => {
        const t = target(b);
        const d = t - now[i];
        now[i] = reduce || Math.abs(d) < 0.0005 ? t : now[i] + d * 0.12;
        if (now[i] !== t) moving = true;
        bars[i]?.style.setProperty("transform", `scaleX(${now[i].toFixed(4)})`);
      });
      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    bands.forEach((b, i) => { now[i] = target(b); });
    tick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
