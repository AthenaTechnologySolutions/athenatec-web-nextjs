import type { Metadata } from "next";

export const SITE_URL = "https://www.athenatec.com";
export const SITE_NAME = "Athenatec";
export const ORGANIZATION_NAME = "Athena Technology Solutions";
export const LOGO_PATH = "/assets/images/logo.webp";
export const DEFAULT_OG_IMAGE = absoluteUrl(LOGO_PATH);
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const CONTACT_URL = absoluteUrl("/contact");

const ORGANIZATION_DESCRIPTION =
  "Athena Technology Solutions provides MES, PLM, ERP, and smart manufacturing services for digital transformation initiatives.";

type SEOInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

const HTML_ENTITY_MAP: Record<string, string> = {
  amp: "&",
  apos: "'",
  bull: "\u2022",
  copy: "\u00a9",
  emsp: " ",
  ensp: " ",
  gt: ">",
  hellip: "\u2026",
  ldquo: "\u201c",
  lsquo: "\u2018",
  lt: "<",
  mdash: "\u2014",
  nbsp: " ",
  ndash: "\u2013",
  quot: '"',
  rdquo: "\u201d",
  reg: "\u00ae",
  rsquo: "\u2019",
  thinsp: " ",
  trade: "\u2122",
};

export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return new URL(path, SITE_URL).toString();
}

export function decodeHtmlEntities(input: string) {
  let output = input;

  for (let pass = 0; pass < 2; pass += 1) {
    const decoded = output.replace(
      /&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]+);/g,
      (entity, token: string) => {
        if (token.startsWith("#")) {
          const isHex = token[1]?.toLowerCase() === "x";
          const value = Number.parseInt(token.slice(isHex ? 2 : 1), isHex ? 16 : 10);

          if (!Number.isFinite(value)) {
            return entity;
          }

          try {
            return String.fromCodePoint(value);
          } catch {
            return entity;
          }
        }

        return HTML_ENTITY_MAP[token] ?? entity;
      }
    );

    if (decoded === output) {
      break;
    }

    output = decoded;
  }

  return output;
}

export function stripHtml(input: string) {
  return decodeHtmlEntities(input.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(input: string, max: number) {
  if (input.length <= max) return input;
  if (max <= 3) return input.slice(0, max);
  return `${input.slice(0, max - 3).trim()}...`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords,
  noIndex = false,
  publishedTime,
  modifiedTime,
}: SEOInput): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedImage = absoluteUrl(image);

  const openGraph = {
    title,
    description,
    url: canonical,
    siteName: SITE_NAME,
    locale: "en_US",
    type,
    ...(type === "article" && publishedTime
      ? {
          publishedTime,
          modifiedTime: modifiedTime || publishedTime,
        }
      : {}),
    images: [
      {
        url: resolvedImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  } satisfies NonNullable<Metadata["openGraph"]>;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-US",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: ORGANIZATION_NAME,
    url: SITE_URL,
    description: ORGANIZATION_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO_PATH),
    },
    image: absoluteUrl(LOGO_PATH),
    email: "info@athenatec.com",
    telephone: "+1-510-687-0900",
    address: {
      "@type": "PostalAddress",
      streetAddress: "859 Corporate Way",
      addressLocality: "Fremont",
      addressRegion: "CA",
      postalCode: "94539",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+1-510-687-0900",
        email: "info@athenatec.com",
        url: CONTACT_URL,
        areaServed: ["US", "IN"],
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@athenatec.com",
        url: CONTACT_URL,
        areaServed: ["US", "IN"],
        availableLanguage: ["en"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/athenatecindia/",
      "https://www.instagram.com/athenatecofficial",
      "https://x.com/athena_tec",
      "https://www.linkedin.com/company/athena-technology-solutions/",
      "https://www.youtube.com/@AthenaTechnologySolutions/",
    ],
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleSchema(input: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(input.path)}#article`,
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    image: [absoluteUrl(input.image || DEFAULT_OG_IMAGE)],
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.path),
    },
    author: {
      "@id": ORGANIZATION_ID,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(LOGO_PATH),
      },
    },
  };
}

export function buildJobPostingSchema(input: {
  title: string;
  description: string;
  path: string;
  employmentType: string;
  locations: string[];
  datePosted?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    employmentType: input.employmentType,
    datePosted: input.datePosted,
    url: absoluteUrl(input.path),
    directApply: true,
    hiringOrganization: {
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: absoluteUrl(LOGO_PATH),
    },
    jobLocation: input.locations.map((location) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: location,
        addressCountry: "IN",
      },
    })),
  };
}

export function buildContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${CONTACT_URL}#webpage`,
    url: CONTACT_URL,
    name: `Contact ${SITE_NAME}`,
    description:
      "Contact Athena Technology Solutions for MES, PLM, ERP, and smart manufacturing consulting and implementation services.",
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": ORGANIZATION_ID,
    },
    mainEntity: {
      "@id": ORGANIZATION_ID,
    },
  };
}
