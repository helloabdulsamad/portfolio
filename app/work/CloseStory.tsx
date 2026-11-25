"use client";

import Link from "next/link";

// Close on a case study page: back to where the reader came from on this site,
// or to the work list when they landed here from search or a shared link.
export default function CloseStory() {
  return (
    <Link
      className="sh-close"
      href="/work"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        try {
          if (document.referrer && new URL(document.referrer).origin === location.origin && history.length > 1) {
            e.preventDefault();
            history.back();
          }
        } catch {}
      }}
    >
      Close
    </Link>
  );
}
