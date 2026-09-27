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

  /**
   * The Questions chapter moved from `/question` to `/questions` so that the
   * route and the label the page uses for itself finally agree.
   *
   * The old path has been live and linked from the navbar, from Home's
   * contents, from the search index and from an errata entry, so it stays
   * reachable permanently rather than becoming a 404. 308 (`permanent: true`)
   * rather than 307: this is not a temporary alias, and a permanent redirect is
   * what transfers the old URL's search history to the new one.
   */
  async redirects() {
    return [{ source: "/question", destination: "/questions", permanent: true }];
  },
};

export default nextConfig;