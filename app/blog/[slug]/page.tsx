import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getAllPosts, getPost, getPostImage, type WPPost } from "@/lib/wordpress";
import {
  buildArticleSchema,
  buildMetadata,
  stripHtml,
  truncate,
} from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./post.scss";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const NEWSROOM_SLUGS = new Set([
  "athena-and-tech-mahindra-announce-partnership",
  "authorised-reseller-partnership-with-twinzo",
  "athena-launches-faborchestrator-agentic-ai-for-manufacturing",
]);

function getPostDescription(post: WPPost) {
  const excerpt = stripHtml(post.excerpt?.rendered || "");
  const content = stripHtml(post.content?.rendered || "");
  return truncate(excerpt || content, 160);
}

function getPostTitle(post: WPPost) {
  return stripHtml(post.title.rendered);
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

  return buildMetadata({
    title: getPostTitle(post),
    description: getPostDescription(post),
    path: `/blog/${slug}`,
    image: getPostImage(post) ?? undefined,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modified,
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((item) => item.slug === slug);
  const nextPost = allPosts[currentIndex - 1];
  const prevPost = allPosts[currentIndex + 1];
  const isNewsroomPost = NEWSROOM_SLUGS.has(post.slug);
  const relatedPosts: WPPost[] = isNewsroomPost
    ? allPosts.filter(
        (item) => NEWSROOM_SLUGS.has(item.slug) && item.slug !== post.slug,
      )
    : allPosts
        .filter(
          (item) => !NEWSROOM_SLUGS.has(item.slug) && item.slug !== post.slug,
        )
        .slice(0, 3);
  const heroImage = getPostImage(post);
  const title = getPostTitle(post);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const contentHtml = post.content?.rendered || "";
  const readTime = Math.max(
    1,
    Math.ceil(contentHtml.replace(/<[^>]+>/g, "").split(/\s+/).length / 200),
  );

  const articleSchema = buildArticleSchema({
    headline: title,
    description: getPostDescription(post),
    path: `/blog/${slug}`,
    image: heroImage ?? undefined,
    datePublished: post.date,
    dateModified: post.modified,
  });

  return (
    <div className="post-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
            <span className="post-hero__dot">.</span>
            <span className="post-hero__read">{readTime} min read</span>
          </div>

          <h1 className="post-hero__title">{title}</h1>
        </div>
      </header>

      <div className="post-layout">
        <article className="post-article">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <nav className="post-nav">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="post-nav__item post-nav__item--prev"
              >
                <span className="post-nav__label">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 8H3M7 12l-4-4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Previous
                </span>
                <span className="post-nav__title">{getPostTitle(prevPost)}</span>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="post-nav__item post-nav__item--next"
              >
                <span className="post-nav__label">
                  Next
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="post-nav__title">{getPostTitle(nextPost)}</span>
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
            {relatedPosts.map((item, index) => {
              const img = getPostImage(item);
              const itemTitle = getPostTitle(item);
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
                      Read Article
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
