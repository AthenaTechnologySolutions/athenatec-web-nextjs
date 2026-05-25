import type { Metadata } from "next";

const FILE_PATH_PATTERN = /\.[a-z0-9]{2,5}$/i;

export const SITE_URL = "https://www.athenatec.com";
export const SITE_NAME = "Athenatec";
export const ORGANIZATION_NAME = "Athena Technology Solutions";
export const LOGO_PATH = "/assets/images/logo.webp";
export const DEFAULT_OG_IMAGE = absoluteUrl(LOGO_PATH);
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const CONTACT_URL = canonicalUrl("/contact");
export const DEFAULT_AUTHOR_NAME = "Athenatec Manufacturing Technology Experts";
export const DEFAULT_AUTHOR_ID = `${SITE_URL}/#manufacturing-technology-experts`;

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

type QuestionAnswer = {
  question: string;
  answer: string;
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
  return new URL(normalizePath(path, { trailingSlash: false }), SITE_URL).toString();
}

export function normalizePath(
  path = "/",
  options: { trailingSlash?: boolean } = {},
) {
  const trailingSlash = options.trailingSlash ?? true;
  const url = path.startsWith("http://") || path.startsWith("https://")
    ? new URL(path)
    : null;
  let pathname = url?.pathname ?? path;

  pathname = pathname.split("#")[0].split("?")[0] || "/";
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  pathname = pathname.replace(/\/{2,}/g, "/");

  const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? "";
  const isFilePath = FILE_PATH_PATTERN.test(lastSegment);

  if (trailingSlash && pathname !== "/" && !pathname.endsWith("/") && !isFilePath) {
    pathname = `${pathname}/`;
  }

  if (!trailingSlash && pathname.length > 1 && pathname.endsWith("/") && !isFilePath) {
    pathname = pathname.slice(0, -1);
  }

  return pathname;
}

export function canonicalUrl(path = "/") {
  if (!path) return `${SITE_URL}/`;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    const url = new URL(path);
    return new URL(normalizePath(url.pathname), SITE_URL).toString();
  }

  return new URL(normalizePath(path), SITE_URL).toString();
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
  const canonical = canonicalUrl(path);
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
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
    foundingDate: "2011",
    slogan: "Digitizing the manufacturing enterprise",
    knowsAbout: [
      "MES implementation",
      "Siemens Opcenter",
      "Critical Manufacturing MES",
      "Oracle Cloud ERP",
      "Oracle Agile PLM",
      "Industry 4.0",
      "Smart factory integration",
      "Semiconductor manufacturing",
      "Medical device manufacturing",
      "Electronics manufacturing",
    ],
    areaServed: ["United States", "India", "North America", "APAC", "EMEA"],
    award: [
      "ISO 9001 certified organization",
      "Siemens Alliance Partner",
      "Critical Manufacturing Premier Partner",
    ],
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
      item: canonicalUrl(item.path),
    })),
  };
}

export function buildWebPageSchema(input: {
  name: string;
  description: string;
  path: string;
  primaryImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl(input.path)}#webpage`,
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.path),
    inLanguage: "en-US",
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": ORGANIZATION_ID,
    },
    primaryImageOfPage: input.primaryImage
      ? {
          "@type": "ImageObject",
          url: absoluteUrl(input.primaryImage),
        }
      : undefined,
  };
}

export function buildServiceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  keywords?: string[];
  areaServed?: string[];
  offers?: Array<{ name: string; description: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.path),
    serviceType: input.serviceType,
    keywords: input.keywords?.join(", "),
    provider: {
      "@id": ORGANIZATION_ID,
    },
    brand: {
      "@id": ORGANIZATION_ID,
    },
    areaServed: (input.areaServed ?? ["Worldwide"]).map((name) => ({
      "@type": "Place",
      name,
    })),
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        "Manufacturing executives, IT leaders, operations leaders, and quality teams",
    },
    hasOfferCatalog: input.offers?.length
      ? {
          "@type": "OfferCatalog",
          name: `${input.name} offerings`,
          itemListElement: input.offers.map((offer) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: offer.name,
              description: offer.description,
            },
          })),
        }
      : undefined,
  };
}

export function buildFaqSchema(faqs: QuestionAnswer[], path?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(path
      ? {
          "@id": `${canonicalUrl(path)}#faq`,
          url: canonicalUrl(path),
        }
      : {}),
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildItemListSchema(input: {
  name: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonicalUrl(input.path)}#itemlist`,
    name: input.name,
    url: canonicalUrl(input.path),
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.path),
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
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl(input.path)}#article`,
    headline: input.headline,
    description: input.description,
    url: canonicalUrl(input.path),
    image: [absoluteUrl(input.image || DEFAULT_OG_IMAGE)],
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl(input.path),
    },
    author: {
      "@type": "Organization",
      "@id": DEFAULT_AUTHOR_ID,
      name: input.authorName || DEFAULT_AUTHOR_NAME,
      url: canonicalUrl("/about"),
      parentOrganization: {
        "@id": ORGANIZATION_ID,
      },
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
    url: canonicalUrl(input.path),
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
