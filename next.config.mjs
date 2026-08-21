import path from "node:path";
import { fileURLToPath } from "node:url";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A stray pnpm-lock.yaml above this repo makes Next infer the wrong
  // workspace root. Pin it to the project directory instead.
  turbopack: { root: projectRoot },
}

export default nextConfig;

// Lets `next dev` talk to the Cloudflare adapter so Workers bindings resolve
// locally the same way they do in the deployed Worker.
initOpenNextCloudflareForDev();
