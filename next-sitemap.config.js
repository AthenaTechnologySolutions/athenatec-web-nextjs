module.exports = {
  siteUrl: "https://www.athenatec.com",
  generateRobotsTxt: false,
  trailingSlash: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,
  exclude: [
    "/hero-option-1",
    "/thank-you",
    "/partners/twinzo",
    "/api/*",
    "/icon.png",
  ],
  transform: async (config, path) => {
    const normalizedPath = path !== "/" ? path.replace(/\/$/, "") : path;
    const priorityMap = new Map([
      ["/", 1.0],
      ["/mes-implementation-services", 0.95],
      ["/siemens-opcenter-mes", 0.9],
      ["/critical-manufacturing", 0.9],
      ["/solutions/oracle-cloud", 0.85],
      ["/solutions/plm", 0.85],
      ["/accelerators", 0.8],
      ["/case-studies", 0.8],
      ["/blog", 0.75],
    ]);

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap.get(normalizedPath) ?? config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
