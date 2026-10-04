/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // No external image domains are configured yet. Once DBIF supplies
    // official photography (PRD §15), either add the CDN/host domain here
    // or move images into /public and reference them locally.
    remotePatterns: [],
  },
};

export default nextConfig;
