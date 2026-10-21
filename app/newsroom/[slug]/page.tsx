import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getAllPosts, getPost, getPostImage, type WPPost } from "@/lib/wordpress";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  stripHtml,
  truncate,
} from "@/lib/seo";
import StructuredData from "@/app/components/seo/StructuredData";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "@/app/blog/[slug]/post.scss";

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

type TocItem = {
  id: string;
  text: string;
  level: number;
};

const NEWSROOM_SLUGS = [
  "athena-expands-europe-first-office-portugal",
  "athena-opens-its-new-office-in-portugal",
  "athena-featured-in-digital-it-news-national-it-service-provider-day",
  "athena-launches-faborchestrator-agentic-ai-for-manufacturing",
  "athena-and-tech-mahindra-announce-partnership",
  "authorised-reseller-partnership-with-twinzo",
];

const NEWSROOM_SLUG_SET = new Set(NEWSROOM_SLUGS);

function getPostBadge(slug: string): string {
  if (slug === "athena-expands-europe-first-office-portugal") {
    return "Press Release";
  }
  if (
    slug === "athena-opens-its-new-office-in-portugal" ||
    slug === "athena-announces-the-opening-of-its-new-office-in-portugal"
  ) {
    return "Grand Opening";
  }
  if (slug.includes("partnership") || slug.includes("reseller")) {
    return "Partnership";
  }
  return "Announcement";
}

function getPostDescription(post: WPPost) {
  const excerpt = stripHtml(post.excerpt?.rendered || "");
  const content = stripHtml(post.content?.rendered || "");
  return truncate(excerpt || content, 160);
}

function getPostTitle(post: WPPost) {
  return stripHtml(post.title.rendered);
}

function sanitizePostHtml(html: string, slug?: string): string {
  if (!html) return "";
  let sanitized = html
    .replace(/http:\/\/www\.athenatec\.com/g, "https://www.athenatec.com")
    .replace(/http:\/\/athenatec\.com/g, "https://www.athenatec.com")
    .replace(/<h1(\s|>)/gi, "<h2$1")
    .replace(/<\/h1>/gi, "</h2>");

  if (slug === "athena-expands-europe-first-office-portugal") {
    // 0. Format the post intro title/header with proper bold styling and spacing
    const titlePattern =
      /<p[^>]*>[\s\S]*?Athena Technology Solutions Expands into Europe and Opens Its First European Office in Portugal[\s\S]*?<\/p>/i;
    if (titlePattern.test(sanitized)) {
      sanitized = sanitized.replace(
        titlePattern,
        `<p class="post-content-title"><strong>Athena Technology Solutions Expands into Europe and Opens Its First European Office in Portugal</strong></p>`,
      );
    }

    // 1. Insert YouTube video embed right after the subtitle paragraph
    const subtitlePattern =
      /(The U\.S\. MES implementation specialist brings[\s\S]*?<\/p>)/i;
    const videoEmbed = `\n<div class="post-video-wrapper">\n  <iframe src="https://www.youtube-nocookie.com/embed/GVbHZwqj1Do" title="Athena is now in Porto!" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n</div>\n`;

    if (!sanitized.includes("GVbHZwqj1Do") && subtitlePattern.test(sanitized)) {
      sanitized = sanitized.replace(subtitlePattern, `$1${videoEmbed}`);
    }

    // 2. Normalize and fix the "About Athena Technology Solutions" section
    const aboutPattern =
      /<p[^>]*>\s*<span[^>]*>\s*<b>\s*About Athena Technology Solutions\s*<\/b>\s*<\/span>\s*<\/p>[\s\S]*?(?:<h6[^>]*>[\s\S]*?<\/h6>|<p[^>]*>[\s\S]*?<\/p>)(?=\s*(?:<p><!-- \/wp:paragraph -->|<\/div>|$))/i;

    const cleanAboutBlock = `\n<h2>About Athena Technology Solutions</h2>\n<p>Founded in 2011 and headquartered in Fremont, California, Athena Technology Solutions integrates, implements and supports Manufacturing Execution Systems (MES) for high-tech and discrete manufacturers in the semiconductor, electronics, medical device, solar and battery industries. Athena works on a hybrid delivery model with teams in the U.S. and India, now joined by Porto, Portugal, and employs about 200 people. Its portfolio also includes PLM, ERP and Managed Services, and FabOrchestrator.AI™, an agentic AI orchestration layer for manufacturing operations. More information at <a href="https://www.athenatec.com/" target="_blank" rel="noopener noreferrer">www.athenatec.com</a>.</p>\n`;

    if (aboutPattern.test(sanitized)) {
      sanitized = sanitized.replace(aboutPattern, cleanAboutBlock);
    }

    // 3. Strip conflicting inline font-family, font-size, line-height, letter-spacing, and color overrides
    sanitized = sanitized
      .replace(/<\/?font[^>]*>/gi, "")
      .replace(/style="([^"]*)"/gi, (match, styleContent) => {
        const cleaned = styleContent
          .split(";")
          .map((s: string) => s.trim())
          .filter(
            (s: string) =>
              !/^(font-family|font-size|line-height|letter-spacing|margin|margin-bottom|margin-top|margin-left|margin-right|color|text-align):/i.test(
                s,
              ),
          )
          .join("; ");
        return cleaned ? `style="${cleaned}"` : "";
      });
  }

  return sanitized;
}

function slugifyHeading(input: string) {
  return stripHtml(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function getTableOfContents(html: string) {
  const headings: TocItem[] = [];
  const seen = new Map<string, number>();
  const headingPattern = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
  let match;

  while ((match = headingPattern.exec(html)) !== null) {
    const text = stripHtml(match[2]);
    if (!text) continue;

    const baseId = slugifyHeading(text) || `section-${headings.length + 1}`;
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);
    headings.push({
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
      text,
      level: Number(match[1]),
    });
  }

  return headings.slice(0, 8);
}

function addHeadingIds(html: string, headings: TocItem[]) {
  let index = 0;

  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (full, level, attrs, body) => {
    const heading = headings[index];
    index += 1;

    if (!heading || /\sid=/.test(attrs)) return full;
    return `<h${level}${attrs} id="${heading.id}">${body}</h${level}>`;
  });
}

function buildNewsroomFaqs(title: string) {
  return [
    {
      question: `How does this announcement impact Athenatec's global operations?`,
      answer: `${title} supports Athenatec's mission to deliver leading MES implementation, smart manufacturing consulting, and Industry 4.0 solutions across North America, Europe, and Asia.`,
    },
    {
      question: "How can businesses connect with Athenatec regarding this news?",
      answer:
        "Interested partners, clients, and press can reach out directly via Athenatec's contact page or contact our team for inquiries and collaboration.",
    },
    {
      question: "Which manufacturing solutions does Athenatec provide?",
      answer:
        "Athenatec specializes in Siemens Opcenter MES, Critical Manufacturing MES, Oracle Cloud ERP, PLM systems, AI-driven shopfloor orchestration, and smart factory integrations.",
    },
  ];
}

export async function generateStaticParams() {
  return NEWSROOM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Newsroom | Athenatec",
      description: "Latest news, announcements, and partnerships from Athenatec.",
      path: `/newsroom/${slug}`,
      type: "article",
      noIndex: true,
    });
  }

  const rawTitle = getPostTitle(post);
  const metaTitle =
    rawTitle.length > 40 ? `${truncate(rawTitle, 40)} | Athenatec Newsroom` : `${rawTitle} | Athenatec Newsroom`;

  let heroImage = getPostImage(post);
  if (
    (slug === "athena-opens-its-new-office-in-portugal" ||
      slug === "athena-announces-the-opening-of-its-new-office-in-portugal") &&
    (!heroImage || heroImage.includes("demo6"))
  ) {
    heroImage = "/assets/images/Porto-River-Digital-Panorama.webp";
  }

  return buildMetadata({
    title: metaTitle,
    description: getPostDescription(post),
    path: `/newsroom/${slug}`,
    image: heroImage ?? undefined,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modified,
  });
}

export default async function NewsroomPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "athena-announces-the-opening-of-its-new-office-in-portugal") {
    redirect("/newsroom/athena-opens-its-new-office-in-portugal");
  }
  const post = await getPost(slug);

  if (!post) notFound();

  const allPosts = await getAllPosts();
  const title = getPostTitle(post);
  const rawContentHtml = post.content?.rendered || "";
  const contentHtml = sanitizePostHtml(rawContentHtml, slug);

  const relatedPosts = allPosts.filter(
    (p) => NEWSROOM_SLUG_SET.has(p.slug) && p.slug !== post.slug,
  );

  let heroImage = getPostImage(post);
  if (
    (slug === "athena-opens-its-new-office-in-portugal" ||
      slug === "athena-announces-the-opening-of-its-new-office-in-portugal") &&
    (!heroImage || heroImage.includes("demo6"))
  ) {
    heroImage = "/assets/images/portugal-announcement.png";
  } else if (slug === "athena-expands-europe-first-office-portugal" && !heroImage) {
    heroImage = "/assets/images/portugal-announcement.png";
  }

  const isPortugalPost =
    slug === "athena-opens-its-new-office-in-portugal" ||
    slug === "athena-announces-the-opening-of-its-new-office-in-portugal";

  const formattedDate = isPortugalPost
    ? "October 19, 2026 at 3:00 PM"
    : new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const readTime = Math.ceil(
    contentHtml.replace(/<[^>]+>/g, "").split(" ").length / 200,
  );
  const tocItems = getTableOfContents(contentHtml);
  const contentWithHeadingIds = addHeadingIds(contentHtml, tocItems);
  const articleFaqs = buildNewsroomFaqs(title);

  const articleSchema = buildArticleSchema({
    headline: title,
    description: getPostDescription(post),
    path: `/newsroom/${slug}`,
    image: heroImage ?? undefined,
    datePublished: post.date,
    dateModified: post.modified,
  });
  const seoSchema = [
    articleSchema,
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Newsroom", path: "/newsroom" },
      { name: title, path: `/newsroom/${slug}` },
    ]),
    buildFaqSchema(articleFaqs, `/newsroom/${slug}`),
  ];

  return (
    <div className="post-wrapper">
      <StructuredData data={seoSchema} id="newsroom-post-seo-schema" />
      <header className="post-hero">
        {heroImage && (
          <div className="post-hero__bg">
            <Image
              src={heroImage}
              alt={title}
              fill
              sizes="100vw"
              className="post-hero__img"
              priority
              unoptimized
            />
            <div className="post-hero__overlay" />
          </div>
        )}

        <div className="post-hero__content">
          <Link href="/newsroom" className="post-hero__back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M7 12l-4-4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Newsroom
          </Link>

          <div className="post-hero__meta">
            <span className="post-hero__badge text-[rgba(255,255,255,0.65)]">
              {getPostBadge(slug)}
            </span>
            <time className="post-hero__date">{formattedDate}</time>
            <span className="post-hero__dot">.</span>
            <span className="post-hero__read">{readTime} min read</span>
          </div>

          <h1 className="post-hero__title">{title}</h1>
        </div>
      </header>

      <div className="post-layout">
        <article className="post-article">
          <nav className="post-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/newsroom">Newsroom</Link>
            <span>/</span>
            <span>{title}</span>
          </nav>

          {tocItems.length > 0 && (
            <nav className="post-toc" aria-label="Table of contents">
              <h2>Table of Contents:</h2>
              <ol>
                {tocItems.map((item) => (
                  <li
                    className={item.level === 3 ? "post-toc__item--nested" : ""}
                    key={item.id}
                  >
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: contentWithHeadingIds }}
          />

          <section className="post-faq" aria-labelledby="post-faq-title">
            <h2 id="post-faq-title">Article FAQs</h2>
            {articleFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </section>
        </article>
      </div>

      {relatedPosts.length > 0 && (
        <section className="related-section">
          <div className="related-header">
            <span className="related-eyebrow">
              <span className="eyebrow-line" />
              More Newsroom Announcements
              <span className="eyebrow-line" />
            </span>
          </div>

          <div className="related-grid">
            {relatedPosts.map((item, index) => {
              const img =
                item.slug === "athena-opens-its-new-office-in-portugal" ||
                item.slug === "athena-announces-the-opening-of-its-new-office-in-portugal"
                  ? "/assets/images/portugal-announcement.png"
                  : getPostImage(item);
              const itemTitle = getPostTitle(item);
              const isPortugalRelated =
                item.slug === "athena-opens-its-new-office-in-portugal" ||
                item.slug === "athena-announces-the-opening-of-its-new-office-in-portugal";
              const itemDate = isPortugalRelated
                ? "October 19, 2026 at 3:00 PM"
                : new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

              return (
                <Link
                  key={item.id}
                  href={`/newsroom/${item.slug}`}
                  className="related-card"
                  style={{ "--i": index } as CSSProperties}
                >
                  <div className="related-card__img-wrap">
                    {img ? (
                      <Image
                        src={img}
                        alt={itemTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="related-card__img"
                      />
                    ) : (
                      <div className="related-card__no-img" />
                    )}
                    <div className="related-card__shine" />
                  </div>
                  <div className="related-card__body">
                    <time className="related-card__date">{itemDate}</time>
                    <h3 className="related-card__title">{itemTitle}</h3>
                    <span className="related-card__cta">
                      Read announcement
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
