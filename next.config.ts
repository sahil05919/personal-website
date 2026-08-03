import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP second, original as the final fallback. Next only
    // encodes the format the requesting browser actually accepts, so this
    // costs nothing for clients that support neither.
    //
    // AVIF encodes more slowly than WebP on first request but lands roughly
    // 20-30% smaller at equivalent quality — worth it on a page whose whole
    // payload is photographs.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;