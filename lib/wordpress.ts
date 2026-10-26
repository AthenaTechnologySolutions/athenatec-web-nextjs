import { fetchWpJson } from "@/lib/wp-server";
import postsCacheRaw from "@/lib/posts-cache.json";

const WP_MEDIA_FALLBACK_HOST = "cms.athenatec.com";
const WP_MEDIA_BLOCKED_HOSTS = new Set(["athenatec.com", "www.athenatec.com"]);

export type WPPost = {
  id: number;
  slug: string;
  date: string;
  modified?: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url?: string;
      media_details?: {
        sizes?: {
          medium_large?: {
            source_url: string;
          };
          full?: {
            source_url: string;
          };
        };
      };
    }[];
  };
};

async function fetchWp<T>(path: string, revalidate: number): Promise<T | null> {
  return fetchWpJson<T>(`/wp-json/wp/v2${path}`, {
    next: { revalidate },
  });
}

function normalizeWpMediaUrl(url?: string | null): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (
      (WP_MEDIA_BLOCKED_HOSTS.has(parsed.hostname) ||
        parsed.hostname === WP_MEDIA_FALLBACK_HOST) &&
      parsed.pathname.startsWith("/wp-content/")
    ) {
      parsed.hostname = WP_MEDIA_FALLBACK_HOST;
      parsed.protocol = "http:";
      parsed.port = "";
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

export function getPostImage(post: WPPost): string | null {
  return normalizeWpMediaUrl(
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.full
      ?.source_url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
      ?.medium_large?.source_url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    null,
  );
}

function patchPost(post: WPPost): WPPost {
  if (
    post.slug === "athena-opens-its-new-office-in-portugal" ||
    post.slug === "athena-announces-the-opening-of-its-new-office-in-portugal" ||
    post.slug === "athena-expands-europe-first-office-portugal"
  ) {
    return {
      ...post,
      date: "2026-10-19T15:00:00",
      modified: "2026-10-19T15:00:00",
    };
  }
  return post;
}

const fallbackPosts: WPPost[] = (postsCacheRaw as WPPost[]).map(patchPost);

export async function getPosts(): Promise<WPPost[]> {
  const posts = await fetchWp<WPPost[]>(
    "/posts?_embed&orderby=date&order=desc",
    60,
  );
  if (posts && posts.length > 0) {
    return posts.map(patchPost);
  }
  return fallbackPosts;
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const encodedSlug = encodeURIComponent(slug);
  const data = await fetchWp<WPPost[]>(
    `/posts?slug=${encodedSlug}&_embed`,
    300,
  );
  if (data?.length) return patchPost(data[0]);

  const allPosts = await getAllPosts();
  const matched = allPosts.find((p) => p.slug === slug);
  return matched ? patchPost(matched) : null;
}

export async function getAllPosts(): Promise<WPPost[]> {
  const posts = await fetchWp<WPPost[]>(
    "/posts?_embed&per_page=100&orderby=date&order=desc",
    300,
  );
  if (posts && posts.length > 0) {
    return posts.map(patchPost);
  }
  return fallbackPosts;
}
