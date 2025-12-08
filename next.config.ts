import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "gearshift2images.s3.eu-north-1.amazonaws.com"
    ],
  },
};

export default nextConfig;
