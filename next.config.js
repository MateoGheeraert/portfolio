/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Remove the i18n config as we're using middleware for app router internationalization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      // Add more domains as needed
      {
        protocol: "https",
        hostname: "**", // This allows all HTTPS domains - use with caution
      },
    ],
  },
};

module.exports = nextConfig;
