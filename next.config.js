/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // adaymagazine (prod)
      {
        protocol: "https",
        hostname: "adaymagazine.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "adaymagazine.com",
        pathname: "/wp-content/themes/**",
      },

      // khunbaw dev / staging
      {
        protocol: "https",
        hostname: "m1.khunbaw.dev",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
