import { fetchWpJson } from "@/lib/wp-server";
import postsCacheRaw from "@/lib/posts-cache.json";

const WP_MEDIA_FALLBACK_HOST = "cms.athenatec.com";
const WP_MEDIA_BLOCKED_HOSTS = new Set(["athenatec.com", "www.athenatec.com"]);

const POST_SEO_DESCRIPTIONS: Record<string, string> = {
  "athena-and-tech-mahindra-announce-partnership":
    "Athenatec and Tech Mahindra partner to help manufacturers accelerate Industry 4.0 adoption with scalable, AI-enabled MES solutions and services.",
  "athena-expands-europe-first-office-portugal":
    "Athenatec expands into Europe with its first office in Portugal, strengthening support for manufacturers pursuing digital transformation and MES innovation.",
  "athena-featured-in-digital-it-news-national-it-service-provider-day":
    "Athenatec is featured by Digital IT News for National IT Service Provider Day, recognizing its work in innovative manufacturing technology services.",
  "athena-launches-faborchestrator-agentic-ai-for-manufacturing":
    "Athenatec launches FabOrchestrator, an agentic AI platform that helps manufacturers analyze data, model MES changes, and automate support.",
  "athena-opens-its-new-office-in-portugal":
    "Athenatec opens its new Porto office, expanding its European presence and bringing MES and digital manufacturing expertise closer to customers.",
  "authorised-reseller-partnership-with-twinzo":
    "Athenatec announces its authorised reseller partnership with twinzo, bringing digital twin capabilities to manufacturers pursuing smarter, connected operations.",
  "beyond-the-software-why-your-mes-selection-needs-a-blueprint-not-just-a-demo":
    "Choosing an MES takes more than a software demonstration. Learn why a practical blueprint is essential for a successful manufacturing transformation.",
  "chips-making-chips-how-virtualization-digital-twins-and-machine-learning-are-accelerating-the-spiral-of-innovation":
    "Explore how digital twins, virtualization, and machine learning are transforming semiconductor innovation, accelerating development and smarter fab operations.",
  "empowering-manufacturers-for-digital-transformation-leveraging-opcenter-for-enhanced-efficiency-and-productivity":
    "See how Siemens Opcenter helps manufacturers improve efficiency, productivity, and digital transformation with connected MES capabilities.",
  "erp-is-your-core-but-is-it-truly-connected":
    "Learn why a connected ERP foundation matters and how integrated manufacturing systems improve visibility, decision-making, and operational resilience.",
  "minimize-idle-time-streamline-ordering-with-a-digital-twin":
    "Discover how digital twin technology helps manufacturers reduce idle time, streamline ordering, and improve operational coordination across the factory.",
  "solving-the-integration-puzzle-in-smt-manufacturing":
    "Learn how integrated MES and SMT systems can improve visibility, traceability, and production flow in complex electronics manufacturing.",
  "the-ai-driven-evolution-of-mes-athenas-viewpoint":
    "Athenatec explores how AI is changing MES, helping manufacturers turn shop-floor data into faster, more informed operational decisions.",
  "the-ai-powered-mes-from-system-of-record-to-system-of-intelligence":
    "Explore how AI-powered MES platforms evolve from systems of record into intelligent systems that support proactive manufacturing decisions.",
  "transforming-manufacturing-key-focus-areas-trends-and-challenges-in-digital-transformation":
    "Explore the key trends, challenges, and focus areas shaping digital transformation for manufacturers pursuing smarter, more resilient operations.",
};

const POST_SEO_TITLES: Record<string, string> = {
  "athena-and-tech-mahindra-announce-partnership": "Athenatec and Tech Mahindra Partnership",
  "athena-expands-europe-first-office-portugal": "European Expansion and Portugal Office",
  "athena-featured-in-digital-it-news-national-it-service-provider-day": "Athenatec in Digital IT News",
  "athena-launches-faborchestrator-agentic-ai-for-manufacturing": "FabOrchestrator AI Launch",
  "athena-opens-its-new-office-in-portugal": "New Office in Porto, Portugal",
  "authorised-reseller-partnership-with-twinzo": "Athenatec and twinzo Partnership",
  "beyond-the-software-why-your-mes-selection-needs-a-blueprint-not-just-a-demo": "MES Selection Blueprint",
  "chips-making-chips-how-virtualization-digital-twins-and-machine-learning-are-accelerating-the-spiral-of-innovation": "Digital Twins in Semiconductor Manufacturing",
  "empowering-manufacturers-for-digital-transformation-leveraging-opcenter-for-enhanced-efficiency-and-productivity": "Opcenter for Manufacturing Transformation",
  "erp-is-your-core-but-is-it-truly-connected": "Connected ERP for Manufacturing",
  "minimize-idle-time-streamline-ordering-with-a-digital-twin": "Digital Twins for Manufacturing Efficiency",
  "solving-the-integration-puzzle-in-smt-manufacturing": "SMT Manufacturing Integration",
  "the-ai-driven-evolution-of-mes-athenas-viewpoint": "AI-Driven MES Evolution",
  "the-ai-powered-mes-from-system-of-record-to-system-of-intelligence": "AI-Powered MES Intelligence",
  "transforming-manufacturing-key-focus-areas-trends-and-challenges-in-digital-transformation": "Manufacturing Digital Transformation",
};

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
      // Keep public image URLs on the HTTPS site. next.config.mjs proxies this
      // path to the legacy CMS server-side, whose public TLS certificate is not
      // suitable for direct browser requests.
      return `${parsed.pathname}${parsed.search}`;
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

export function getPostSeoDescription(post: WPPost): string | null {
  return POST_SEO_DESCRIPTIONS[post.slug] ?? null;
}

export function getPostSeoTitle(post: WPPost): string | null {
  return POST_SEO_TITLES[post.slug] ?? null;
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
