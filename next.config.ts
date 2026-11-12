import type { NextConfig } from "next";

// The GitHub Pages workflow sets GITHUB_PAGES=true. The repo is named
// helloabdulsamad.github.io (GitHub's user site name), so Pages serves it from
// the domain root: no basePath, just a static export.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Defaults to ".next". Set NEXT_BUILD_DIR to run a check build without
  // touching the dev server's ".next".
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  ...(isGithubPages ? { output: "export" } : {}),
  // A static export has no image optimisation server.
  ...(isGithubPages ? { images: { unoptimized: true } } : {}),
};

export default nextConfig;
