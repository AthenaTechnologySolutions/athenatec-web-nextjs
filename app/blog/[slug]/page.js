import { getPost, getAllPosts, getPostImage } from "@/lib/wordpress";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  stripHtml,
  truncate,
} from "@/lib/seo";
import StructuredData from "@/app/components/seo/StructuredData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./post.scss";
const NEWSROOM_SLUGS = new Set([
  "athena-and-tech-mahindra-announce-partnership",
  "authorised-reseller-partnership-with-twinzo",
  "athena-launches-faborchestrator-agentic-ai-for-manufacturing",
]);

function getPostDescription(post) {
  const excerpt = stripHtml(post.excerpt?.rendered || "");
  const content = stripHtml(post.content?.rendered || "");
  return truncate(excerpt || content, 160);
}

function getPostTitle(post) {
  return stripHtml(post.title.rendered);
}

function slugifyHeading(input) {
  return stripHtml(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function getTableOfContents(html) {
  const headings = [];
  const seen = new Map();
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

function addHeadingIds(html, headings) {
  let index = 0;

  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (full, level, attrs, body) => {
    const heading = headings[index];
    index += 1;

    if (!heading || /\sid=/.test(attrs)) return full;
    return `<h${level}${attrs} id="${heading.id}">${body}</h${level}>`;
  });
}

function buildBlogFaqs(title) {
  return [
    {
      question: `How does this article relate to MES implementation?`,
      answer: `${title} is part of Athenatec's manufacturing technology guidance for teams evaluating MES implementation, Industry 4.0, enterprise integrations, and operational improvement.`,
    },
    {
      question: "Can Athenatec help apply these ideas in a real manufacturing environment?",
      answer:
        "Yes. Athenatec provides MES consulting services, Siemens Opcenter implementation, Critical Manufacturing MES implementation, Oracle Cloud ERP, Oracle Agile PLM, integration, testing, and support services.",
    },
    {
      question: "Which teams should read this manufacturing technology article?",
      answer:
        "Manufacturing IT, operations, quality, engineering, supply chain, and executive teams can use this guidance when planning digital manufacturing, MES, ERP, PLM, AI, or smart factory initiatives.",
    },
  ];
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Blog",
      description: "Insights, updates, and articles from Athenatec.",
      path: `/blog/${slug}`,
      type: "article",
      noIndex: true,
    });
  }

  const title = stripHtml(post.title.rendered);
  const description = getPostDescription(post);
  const image = getPostImage(post);

  return buildMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    image,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modified,
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const title = getPostTitle(post);
  const contentHtml = post.content?.rendered || "";
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = allPosts[currentIndex - 1];
  const prevPost = allPosts[currentIndex + 1];

  const isNewsroomPost = NEWSROOM_SLUGS.has(post.slug);

  let relatedPosts = [];

if (isNewsroomPost) {
  // 👉 ONLY those 3 posts
  relatedPosts = allPosts.filter(
    (p) =>
      NEWSROOM_SLUGS.has(p.slug) &&
      p.slug !== post.slug
  );
} else {
  // 👉 Normal blogs → show other normal blogs
  relatedPosts = allPosts
    .filter(
      (p) =>
        !NEWSROOM_SLUGS.has(p.slug) &&
        p.slug !== post.slug
    )
    .slice(0, 3); // limit to 3
}
  const heroImage = getPostImage(post);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readTime = Math.ceil(
    contentHtml.replace(/<[^>]+>/g, "").split(" ").length / 200,
  );
  const tocItems = getTableOfContents(contentHtml);
  const contentWithHeadingIds = addHeadingIds(contentHtml, tocItems);
  const articleFaqs = buildBlogFaqs(title);

  const articleSchema = buildArticleSchema({
    headline: stripHtml(post.title.rendered),
    description: getPostDescription(post),
    path: `/blog/${slug}`,
    image: heroImage,
    datePublished: post.date,
  });
  const seoSchema = [
    articleSchema,
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "MES Implementation Blog", path: "/blog" },
      { name: title, path: `/blog/${slug}` },
    ]),
    buildFaqSchema(articleFaqs, `/blog/${slug}`),
  ];

  return (
    <div className="post-wrapper">
      <StructuredData data={seoSchema} id="blog-post-seo-schema" />
      <header className="post-hero">
        {heroImage && (
          <div className="post-hero__bg">
            <Image
              src={heroImage}
              alt={stripHtml(post.title.rendered)}
              fill
              sizes="100vw"
              className="post-hero__img"
              priority
            />
            <div className="post-hero__overlay" />
          </div>
        )}

        <div className="post-hero__content">
          <Link href="/blog" className="post-hero__back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M7 12l-4-4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Blog
          </Link>

          <div className="post-hero__meta">
            <time className="post-hero__date">{formattedDate}</time>
            <span className="post-hero__dot">·</span>
            <span className="post-hero__read">{readTime} min read</span>
          </div>

          <h1
            className="post-hero__title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      </header>

      <div className="post-layout">
        <article className="post-article">
          <nav className="post-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">MES Implementation Blog</Link>
            <span>/</span>
            <span>{title}</span>
          </nav>

          {/* <section className="post-author" aria-label="Article author">
            <div>
              <p className="post-author__label">Written by</p>
              <h2>Athenatec Manufacturing Technology Experts</h2>
              <p>
                MES, PLM, ERP, integration, and smart manufacturing specialists
                supporting Siemens Opcenter, Critical Manufacturing, Oracle
                Cloud ERP, and Oracle Agile PLM programs.
              </p>
            </div>
            <Link href="/about" className="post-author__link">
              Meet Athenatec&apos;s manufacturing experts
            </Link>
          </section> */}

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

          <nav className="post-nav">
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} className="post-nav__item post-nav__item--prev">
                <span className="post-nav__label">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Previous
                </span>
                <span
                  className="post-nav__title"
                  dangerouslySetInnerHTML={{ __html: prevPost.title.rendered }}
                />
              </Link>
            )}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="post-nav__item post-nav__item--next">
                <span className="post-nav__label">
                  Next
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span
                  className="post-nav__title"
                  dangerouslySetInnerHTML={{ __html: nextPost.title.rendered }}
                />
              </Link>
            )}
          </nav>
        </article>
      </div>

{relatedPosts.length > 0 && (
        <section className="related-section">
          <div className="related-header">
            <span className="related-eyebrow">
              <span className="eyebrow-line" />
      Continue Reading
              <span className="eyebrow-line" />
            </span>
          </div>

          <div className="related-grid">
            {relatedPosts.map((item, i) => {
              const img = getPostImage(item);

              const itemDate = new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="related-card"
                  style={{ "--i": i }}
                >
                  <div className="related-card__img-wrap">
                    {img ? (
              <Image
                        src={img}
                        alt={stripHtml(item.title.rendered)}
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
              <h3
                      className="related-card__title"
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
              />
                    <span className="related-card__cta">
                      Read related article
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
