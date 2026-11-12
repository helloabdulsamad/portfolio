import type { NextConfig } from "next";

// The Dockerfile sets STATIC_EXPORT=true. Next then writes plain HTML files to
// out/, and nginx serves them with the pages in site/.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // Defaults to ".next". Set NEXT_BUILD_DIR to run a check build without
  // touching the dev server's ".next".
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  ...(isStaticExport ? { output: "export" } : {}),
  // A static export has no image optimisation server.
  ...(isStaticExport ? { images: { unoptimized: true } } : {}),
};

export default nextConfig;
