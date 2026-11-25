"use client";

import { useEffect } from "react";

// Fills the line under each pinned band title as the reader scrolls through
// that band. Works in every browser, unlike CSS scroll timelines.
export default function BandProgress() {
  useEffect(() => {
    const bands = [...document.querySelectorAll<HTMLElement>(".sv-band")];
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const b of bands) {
        const r = b.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.35 - r.top) / Math.max(1, r.height - vh * 0.35)));
        b.style.setProperty("--p", p.toFixed(3));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
