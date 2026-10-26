import "server-only";

import { DEFAULT_WP_SITE_URL, getWpApiUrl } from "@/lib/wp";

const LEGACY_WP_SITE_URL = "https://cms.athenatec.com";
const HTTP_WP_SITE_URL = "http://cms.athenatec.com";

function normalizeWpSiteUrl(url: string) {
  return url.replace(/\/wp-json(?:\/.*)?$/i, "").replace(/\/+$/, "");
}

function getWpSiteUrls() {
  const urls = [
    process.env.WP_SITE_URL,
    process.env.NEXT_PUBLIC_WP_SITE_URL,
    process.env.NEXT_PUBLIC_WP_API_URL,
    LEGACY_WP_SITE_URL,
    HTTP_WP_SITE_URL,
    DEFAULT_WP_SITE_URL,
  ]
    .filter((value): value is string => Boolean(value))
    .map(normalizeWpSiteUrl);

  return [...new Set(urls)];
}

type WpFetchOptions = Omit<RequestInit, "signal"> & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  timeoutMs?: number;
};

export async function fetchWpJson<T>(
  path: string,
  options: WpFetchOptions = {},
): Promise<T | null> {
  const { timeoutMs = 8000, ...init } = options;

  for (const siteUrl of getWpSiteUrls()) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(getWpApiUrl(path, siteUrl), {
        ...init,
        signal: controller.signal,
      });

      if (!res.ok) {
        console.warn(
          `WordPress fetch failed at ${siteUrl}: ${res.status} ${res.statusText}`,
        );
        continue;
      }

      return (await res.json()) as T;
    } catch (error) {
      console.warn(`WordPress fetch error at ${siteUrl}:`, error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return null;
}
