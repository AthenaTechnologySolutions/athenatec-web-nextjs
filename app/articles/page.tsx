import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/app/components/HeroSection";
import CTASection from "@/app/components/CTASection";
import StructuredData from "@/app/components/seo/StructuredData";
import { buildBreadcrumbSchema, buildItemListSchema, buildMetadata } from "@/lib/seo";
import { articles } from "@/app/data/articles";
import "./articles.scss";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Articles & Manufacturing Technology Insights | Athena Technology",
    description:
      "Explore in-depth articles on shop floor mobility, MES data capture, digital manufacturing, Industry 4.0, and shop floor automation.",
    path: "/articles",
    image: "/assets/images/shopfloor-mobility.webp",
  });
}

export default function ArticlesPage() {
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  const articlesSchema = [
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Articles", path: "/articles" },
    ]),
    buildItemListSchema({
      name: "Athena Technology Manufacturing & MES Articles",
      path: "/articles",
      items: articles.map((art) => ({
        name: art.title,
        path: `/articles/${art.slug}`,
      })),
    }),
  ];

  return (
    <>
      <StructuredData data={articlesSchema} id="articles-collection-schema" />

      <HeroSection
        title="Articles & Manufacturing Technology Insights"
        description="In-depth analysis, technical perspectives, and operational guides for manufacturing IT, MES implementation, and shop floor mobility."
        image="/assets/images/shopfloor.webp"
        align="center"
        buttonText="Discuss Your Project"
        buttonLink="/contact"
      />

      <main className="articles-landing">
        <div className="articles-grid-container">
          <div className="section-header">
            <div className="eyebrow">
              <span>Featured Article</span>
            </div>
            <h2>Shop Floor Mobility Accelerator</h2>
          </div>

          {featuredArticle && (
            <Link
              href={`/articles/${featuredArticle.slug}`}
              className="featured-article-card"
            >
              <div className="image-container">
                <Image
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="content-container">
                <span className="badge">{featuredArticle.category}</span>
                <h3>{featuredArticle.title}</h3>
                <p>{featuredArticle.excerpt}</p>
                <div className="card-footer-flex">
                  <div className="meta">
                    <span>{featuredArticle.date}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <span className="read-more-btn">
                    Read Full Article
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {otherArticles.length > 0 && (
            <>
              <div className="section-header" style={{ marginTop: "3rem" }}>
                <h2>More Articles</h2>
              </div>
              <div className="articles-grid">
                {otherArticles.map((art) => (
                  <Link
                    key={art.slug}
                    href={`/articles/${art.slug}`}
                    className="article-card"
                  >
                    <div className="card-img-wrap">
                      <Image
                        src={art.heroImage}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="card-body">
                      <span className="badge">{art.category}</span>
                      <h4>{art.title}</h4>
                      <p>{art.excerpt}</p>
                      <div className="card-footer-flex">
                        <div className="card-meta">
                          <span>{art.date}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </div>
                        <span className="read-more-link">
                          Read Article
                          <ArrowRight size={15} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        <CTASection
          title="Ready to Accelerate Your Shop Floor Data Capture?"
          description="Schedule a consultation with our MES and shop floor mobility experts to evaluate handheld integration for your facility."
          buttonText="Get a Demo"
          buttonLink="/athena-accelerator-get-a-demo"
          backgroundImage="/assets/images/let-connect.webp"
        />
      </main>
    </>
  );
}
