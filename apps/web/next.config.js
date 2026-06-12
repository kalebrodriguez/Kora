import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

// Default the SQLite path so `npm run dev` works with zero env setup.
const here = path.dirname(fileURLToPath(import.meta.url));
process.env.DATABASE_URL ??= `file:${path.resolve(here, "../../packages/db/dev.db")}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: path.resolve(here, "../..") },
  transpilePackages: ["@kora/db"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
