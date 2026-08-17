import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    loadPaths: [path.join(__dirname, "styles")],
    silenceDeprecations: ["import"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],
    qualities: [75, 80, 85, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      { protocol: "https", hostname: "athenatec.com" },
      { protocol: "https", hostname: "www.athenatec.com" },
      { protocol: "https", hostname: "cms.athenatec.com" },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

   transpilePackages: [],

  async redirects() {
    return [
      {
        source: "/faborchestrator-ai",
        destination: "/faborchestrator/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "athenatec.com",
          },
        ],
        destination: "https://www.athenatec.com/:path*",
        statusCode: 301,
      },
      {
        source: "/mes/siemens-opcenter-mes",
        destination: "/siemens-opcenter-mes",
        permanent: true,
      },
      {
        source: "/solutions/mes/siemens-opcenter-mes-mes",
        destination: "/siemens-opcenter-mes",
        permanent: true,
      },
      {
        source: "/mes/critical-manufacturing",
        destination: "/critical-manufacturing",
        permanent: true,
      },
      {
        source: "/solutions/mes/critical-manufacturing",
        destination: "/critical-manufacturing",
        permanent: true,
      },
      {
        source: "/solutions/enterprise-erp",
        destination: "/solutions/oracle-cloud",
        permanent: true,
      },
      {
        source: "/enterprise-erp",
        destination: "/solutions/oracle-cloud",
        permanent: true,
      },
      {
        source: "/eyelet",
        destination: "/mes-implementation-services",
        permanent: true,
      },
      {
        source: "/eyelit",
        destination: "/mes-implementation-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
