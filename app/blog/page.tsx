import { getPostImage, getPosts, type WPPost } from "@/lib/wordpress";
import Link from "next/link";
import Image from "next/image";
import "./blog.scss";
import HeroSection from "@/app/components/HeroSection";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { buildMetadata, stripHtml, truncate } from "@/lib/seo";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
const EXCLUDED_BLOG_SLUGS = new Set([
  "athena-featured-in-digital-it-news-national-it-service-provider-day",
  "athena-and-tech-mahindra-announce-partnership",
  "authorised-reseller-partnership-with-twinzo",
  "athena-launches-faborchestrator-agentic-ai-for-manufacturing",
]);

const BLOG_HERO_IMAGE = "/assets/images/Blog-banner.webp";

function filterBlogPosts(posts: WPPost[]) {
  return posts.filter((post) => !EXCLUDED_BLOG_SLUGS.has(post.slug));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Athenatec Blog | MES & Industry 4.0 Insights",
    description:
      "Explore expert insights on MES implementation, Industry 4.0 trends, digital transformation challenges, and smart manufacturing best practices.",
    path: "/blog",
    image: BLOG_HERO_IMAGE,
  });
}

export default async function BlogPage() {
  const allPosts = await getPosts();

  const posts = filterBlogPosts(allPosts);
  const featuredPost = posts[0] ?? null;
  const remainingPosts = posts.slice(1);

  const getExcerpt = (post: WPPost, length = 160) =>
    truncate(stripHtml(post.excerpt?.rendered ?? ""), length);

  return (
    <>
      <HeroSection
        title="Blog"
        description="Leave us a little info, and we'll be in touch."
        image={BLOG_HERO_IMAGE}
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <section className="blogs">
        <div className="blog-wrapper">
          <div className="blog-header">
            <div className="blog-header__eyebrow">
              <span className="eyebrow-line" />
              <span className="eyebrow-text">Our Journal</span>
              <span className="eyebrow-line" />
            </div>
            <h1 className="blog-header__title">Latest Insights</h1>
            <p className="blog-header__subtitle">
              Perspectives, ideas, and stories worth reading
            </p>
          </div>

          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="featured-post">
              <div className="featured-post__image-wrap">
                {getPostImage(featuredPost) && (
                  <Image
                    src={getPostImage(featuredPost)!}
                    alt={stripHtml(featuredPost.title.rendered)}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="featured-post__image"
                    priority
                  />
                )}
                <div className="featured-post__overlay" />
              </div>

              <div className="featured-post__content">
                <span className="featured-badge">Featured</span>
                <time className="post-date">
                  {formatDate(featuredPost.date)}
                </time>
                <h2 className="featured-post__title">
                  {stripHtml(featuredPost.title.rendered)}
                </h2>
                <p className="featured-post__excerpt">
                  {getExcerpt(featuredPost, 200)}
                </p>
                <span className="cta-link">
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
          )}

          <div className="blog-grid">
            {remainingPosts.map((post, i) => {
              const image = getPostImage(post);
              const excerpt = getExcerpt(post, 120);

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                  style={{ "--delay": `${i * 0.07}s` } as CSSProperties}
                >
                  <div className="blog-card__image-wrap">
                    {image && (
                      <Image
                        src={image}
                        alt={stripHtml(post.title.rendered)}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="blog-card__image"
                      />
                    )}
                    <div className="blog-card__shimmer" />
                  </div>

                  <div className="blog-card__body">
                    <time className="post-date">{formatDate(post.date)}</time>
                    <h3 className="blog-card__title">
                      {stripHtml(post.title.rendered)}
                    </h3>
                    <p className="blog-card__excerpt">{excerpt}</p>

                    <span className="cta-link cta-link--sm">
                      Read More
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
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
        </div>
      </section>
    </>
  );
}
