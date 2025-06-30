import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "picsum.photos",
      "gallery-v3.classicmarble.com", // ✅ Required
      "ypafaxfcutwjamwcaclp.supabase.co", // ✅ In case you're using direct Supabase image srcs
    ],
  },
};

export default nextConfig;