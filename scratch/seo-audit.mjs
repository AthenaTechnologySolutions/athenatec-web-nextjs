/*
 * Throwaway production audit. Run with: node scratch/seo-audit.mjs
 * Set SEO_AUDIT_BASE to audit a preview/local deployment instead of production.
 */
import { mkdir, writeFile } from "node:fs/promises";

const base = (process.env.SEO_AUDIT_BASE ?? "https://www.athenatec.com").replace(/\/$/, "");
const origin = new URL(base).origin;
const reportDirectory = new URL("./seo-audit-output/", import.meta.url);

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function cleanUrl(value, pageUrl = base) {
  try {
    const url = new URL(value, pageUrl);
    url.hash = "";
    if (url.hostname === new URL(base).hostname || url.hostname === "athenatec.com") {
      url.protocol = "https:";
      url.hostname = new URL(base).hostname;
      if (!/\.[a-z0-9]{2,5}$/i.test(url.pathname) && !url.pathname.endsWith("/")) {
        url.pathname += "/";
      }
    }
    return url.toString();
  } catch {
    return null;
  }
}

function attributeValues(html, attribute) {
  const values = [];
  const pattern = new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, "gis");
  for (const match of html.matchAll(pattern)) values.push(decodeHtmlEntities(match[2].trim()));
  return values;
}

function tagValues(html, tag, attribute) {
  const values = [];
  const pattern = new RegExp(`<${tag}\\b[^>]*\\b${attribute}\\s*=\\s*(["'])(.*?)\\1[^>]*>`, "gis");
  for (const match of html.matchAll(pattern)) values.push(decodeHtmlEntities(match[2].trim()));
  return values;
}

function imageSourceUrl(value, pageUrl) {
  const normalized = cleanUrl(value, pageUrl);
  if (!normalized) return null;

  const url = new URL(normalized);
  if (url.pathname === "/_next/image" || url.pathname === "/_next/image/") {
    const source = url.searchParams.get("url");
    return source ? cleanUrl(source, pageUrl) : normalized;
  }

  return normalized;
}

function firstMeta(html, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gis) ?? [];
  for (const tag of tags) {
    const attributes = Object.fromEntries(
      [...tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gis)].map((match) => [match[1].toLowerCase(), match[3]]),
    );
    if (attributes[key] === value) return attributes.content ?? "";
  }
  return "";
}

function stripMarkup(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:#x?[0-9a-f]+|\w+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleOf(html) {
  return (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").replace(/\s+/g, " ").trim();
}

function sourceFor(url) {
  const path = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
  if (!path) return "app/page.tsx";
  const parts = path.split("/");
  const first = parts[0];
  const dynamic = {
    articles: "app/articles/[slug]/page.tsx",
    blog: "app/blog/[slug]/page.tsx",
    "case-studies": "app/case-studies/[slug]/page.tsx",
    careers: "app/careers/[slug]/page.tsx",
    gallery: "app/gallery/[slug]/page.tsx",
    leadership: "app/leadership/[slug]/page.tsx",
    newsroom: "app/newsroom/[slug]/page.tsx",
    webinars: "app/webinars/[slug]/layout.tsx",
  };
  if (dynamic[first] && parts.length > 1) return dynamic[first];
  if (first === "siemens-opcenter-mes" && parts.length > 1) return "app/siemens-opcenter-mes/[industry]/page.tsx";
  if (["data-correction", "equipment-integration-cm-mes", "factory-separation", "manage-shipper-case", "optimize-production-client-ui", "sap-cm-mes-integration", "surgical-plan-approval", "wip-main-optimization"].includes(first)) return "app/[slug]/page.tsx";
  return `app/${path}/page.tsx`;
}

function extractJsonLd(html) {
  const scripts = html.matchAll(/<script\b[^>]*type\s*=\s*(["'])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gis);
  const entries = [];
  for (const match of scripts) {
    try {
      entries.push({ valid: true, value: JSON.parse(match[2].trim()) });
    } catch (error) {
      entries.push({ valid: false, error: String(error) });
    }
  }
  return entries;
}

function flattenSchemas(value) {
  if (Array.isArray(value)) return value.flatMap(flattenSchemas);
  if (value && typeof value === "object" && Array.isArray(value["@graph"])) return value["@graph"].flatMap(flattenSchemas);
  return value && typeof value === "object" ? [value] : [];
}

function isArticlePage(url) {
  return ["/articles/", "/blog/", "/newsroom/"].some((segment) => new URL(url).pathname.startsWith(segment)) &&
    !["/articles/", "/blog/", "/newsroom/"].includes(new URL(url).pathname);
}

async function fetchResponse(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    return await fetch(url, { redirect: "manual", signal: controller.signal, headers: { "user-agent": "Athenatec SEO audit" }, ...options });
  } finally {
    clearTimeout(timer);
  }
}

async function sitemapUrls(sitemapUrl, seen = new Set()) {
  if (seen.has(sitemapUrl)) return [];
  seen.add(sitemapUrl);
  const response = await fetchResponse(sitemapUrl);
  if (!response.ok) throw new Error(`Could not read ${sitemapUrl}: ${response.status}`);
  const xml = await response.text();
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/gis)].map((match) => match[1].trim());
  if (/<sitemapindex\b/i.test(xml)) {
    return (await Promise.all(locs.map((loc) => sitemapUrls(loc, seen)))).flat();
  }
  return locs.map((loc) => cleanUrl(loc)).filter(Boolean);
}

async function mapLimit(values, limit, task) {
  const results = [];
  const queue = [...values];
  await Promise.all(Array.from({ length: limit }, async () => {
    while (queue.length) {
      const value = queue.shift();
      results.push(await task(value));
    }
  }));
  return results;
}

async function inspectImage(url) {
  if (!/^https?:/i.test(url) || url.startsWith("data:")) return { url, status: null, bytes: null };
  try {
    let response = await fetchResponse(url, { method: "HEAD" });
    if (response.status === 405) response = await fetchResponse(url, { method: "GET" });
    return { url, status: response.status, bytes: Number(response.headers.get("content-length")) || null };
  } catch (error) {
    return { url, status: "ERROR", bytes: null, error: String(error) };
  }
}

async function auditPage(url) {
  const source = sourceFor(url);
  try {
    const response = await fetchResponse(url);
    const location = response.headers.get("location");
    const target = location ? cleanUrl(location, url) : null;
    if (response.status >= 300 && response.status < 400) return { url, source, status: response.status, target };
    const html = await response.text();
    const links = tagValues(html, "a", "href").map((href) => cleanUrl(href, url)).filter(Boolean);
    const internalLinks = [...new Set(links.filter((link) => new URL(link).origin === origin))];
    const images = [
      ...tagValues(html, "img", "src"),
      ...tagValues(html, "source", "src"),
      ...attributeValues(html, "srcset").flatMap((srcset) => srcset.split(",").map((entry) => entry.trim().split(/\s+/)[0])),
      ...[...html.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gis)].map((match) => match[2]),
    ]
      .filter((image) => image && !image.startsWith("data:") && !image.startsWith("#"))
      .map((image) => imageSourceUrl(decodeHtmlEntities(image), url))
      .filter(Boolean);
    const title = titleOf(html);
    const description = firstMeta(html, "name", "description");
    const h1Count = (html.match(/<h1\b[^>]*>/gi) ?? []).length;
    const schemas = extractJsonLd(html);
    const schemaValues = schemas.filter((entry) => entry.valid).flatMap((entry) => flattenSchemas(entry.value));
    const articleSchema = schemaValues.find((schema) => ["Article", "NewsArticle", "BlogPosting"].includes(schema["@type"]));
    const httpUrls = [...html.matchAll(/(?:src|href)\s*=\s*(["'])\s*(http:\/\/[^"']+)\1|url\(\s*(["']?)(http:\/\/[^)'"\s]+)\2\s*\)/gis)]
      .map((match) => decodeHtmlEntities(match[2] || match[4]));
    return {
      url, source, status: response.status, target, title, titleLength: title.length,
      description, descriptionLength: description.length, h1Count,
      wordCount: stripMarkup(html).split(/\s+/).filter(Boolean).length,
      internalLinks, images: [...new Set(images)], httpUrls: [...new Set(httpUrls)],
      og: Boolean(firstMeta(html, "property", "og:title")),
      twitter: Boolean(firstMeta(html, "name", "twitter:card")),
      jsonLd: { present: schemas.length > 0, valid: schemas.every((entry) => entry.valid), count: schemas.length },
      articleSchema: Boolean(articleSchema),
      articleSchemaMissingFields: articleSchema
        ? ["headline", "image", "datePublished", "dateModified", "author", "publisher"].filter((field) => !articleSchema[field])
        : ["headline", "image", "datePublished", "dateModified", "author", "publisher"],
    };
  } catch (error) {
    return { url, source, status: "ERROR", error: String(error) };
  }
}

function issueLine(page, detail = "") {
  return `${page.url} — ${page.source}${detail ? ` — ${detail}` : ""}`;
}

async function main() {
  await mkdir(reportDirectory, { recursive: true });
  const sitemap = await sitemapUrls(`${base}/sitemap.xml`);
  const homepage = await auditPage(`${base}/`);
  const discoveredFromHome = homepage.internalLinks ?? [];
  const urls = [...new Set([...sitemap, ...discoveredFromHome])].sort();
  const pages = await mapLimit(urls, 8, auditPage);
  const imageUrls = [...new Set(pages.flatMap((page) => page.images ?? []))];
  const images = await mapLimit(imageUrls, 10, inspectImage);
  const imageMap = new Map(images.map((image) => [image.url, image]));
  const pageImageIssues = pages.flatMap((page) => (page.images ?? []).map((url) => ({ page, image: imageMap.get(url) })))
    .filter(({ image }) => image && (image.status !== 200 || (image.bytes ?? 0) > 1_000_000));

  const issues = {
    sitemapRedirects: pages.filter((page) => sitemap.includes(page.url) && typeof page.status === "number" && page.status >= 300 && page.status < 400),
    redirects: pages.filter((page) => typeof page.status === "number" && page.status >= 300 && page.status < 400),
    errors: pages.filter((page) => page.status !== 200),
    missingDescriptions: pages.filter((page) => page.status === 200 && !page.description),
    shortDescriptions: pages.filter((page) => page.status === 200 && page.descriptionLength > 0 && page.descriptionLength < 110),
    longDescriptions: pages.filter((page) => page.status === 200 && page.descriptionLength > 160),
    longTitles: pages.filter((page) => page.status === 200 && page.titleLength > 60),
    missingH1: pages.filter((page) => page.status === 200 && page.h1Count === 0),
    lowWords: pages.filter((page) => page.status === 200 && page.wordCount < 200),
    noOutgoingLinks: pages.filter((page) => page.status === 200 && page.internalLinks.length === 0),
    oneOutgoingLink: pages.filter((page) => page.status === 200 && page.internalLinks.length === 1),
    mixedContent: pages.filter((page) => page.status === 200 && page.httpUrls.length > 0),
    missingSocial: pages.filter((page) => page.status === 200 && (!page.og || !page.twitter)),
    invalidJsonLd: pages.filter((page) => page.status === 200 && page.jsonLd.present && !page.jsonLd.valid),
    missingArticleSchema: pages.filter((page) => page.status === 200 && isArticlePage(page.url) && !page.articleSchema),
    incompleteArticleSchema: pages.filter((page) => page.status === 200 && isArticlePage(page.url) && page.articleSchema && page.articleSchemaMissingFields.length),
    brokenImages: pageImageIssues.filter(({ image }) => image.status !== 200),
    largeImages: pageImageIssues.filter(({ image }) => (image.bytes ?? 0) > 1_000_000),
  };

  const report = { base, generatedAt: new Date().toISOString(), sitemapUrls: sitemap, homepageDiscoveredUrls: discoveredFromHome, pages, images, issues };
  await writeFile(new URL("report.json", reportDirectory), JSON.stringify(report, null, 2));
  const output = [
    `Audited ${pages.length} unique pages (${sitemap.length} sitemap URLs; ${discoveredFromHome.length} homepage links).`,
    ...Object.entries(issues).map(([name, entries]) => `\n${name} (${entries.length})\n${entries.length ? entries.map((entry) => {
      if (entry.page) return issueLine(entry.page, `${entry.image.url} [${entry.image.status}${entry.image.bytes ? `, ${Math.round(entry.image.bytes / 1024)} KB` : ""}]`);
      const detail = name === "mixedContent" ? entry.httpUrls.join(", ")
        : ["sitemapRedirects", "redirects", "errors"].includes(name) ? entry.target
        : name === "incompleteArticleSchema" ? entry.articleSchemaMissingFields.join(", ")
        : "";
      return issueLine(entry, detail);
    }).join("\n") : "None"}`),
  ].join("\n");
  await writeFile(new URL("report.txt", reportDirectory), `${output}\n`);
  console.log(output);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
