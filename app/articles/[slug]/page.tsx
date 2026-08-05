import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft, Calendar, Clock, User, CheckCircle2 } from "lucide-react";
import StructuredData from "@/app/components/seo/StructuredData";
import CTASection from "@/app/components/CTASection";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
} from "@/lib/seo";
import { articles, getArticleBySlug } from "@/app/data/articles";
import "../articles.scss";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return buildMetadata({
      title: "Article Not Found | Athena Technology",
      description: "The requested article could not be found.",
      path: `/articles/${slug}`,
    });
  }

  return buildMetadata({
    title: `${article.title} | Athena Technology Articles`,
    description: article.excerpt,
    path: `/articles/${article.slug}`,
    image: article.heroImage,
  });
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbsSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: article.title, path: `/articles/${article.slug}` },
  ]);

  const articleSchema = buildArticleSchema({
    headline: article.title,
    description: article.excerpt,
    path: `/articles/${article.slug}`,
    datePublished: article.date,
    dateModified: article.date,
    image: article.heroImage,
    authorName: article.author.name,
  });

  const faqSchema = article.faqs.length > 0 ? buildFaqSchema(article.faqs) : null;

  return (
    <>
      <StructuredData data={breadcrumbsSchema} id="article-breadcrumb-schema" />
      <StructuredData data={articleSchema} id="article-detail-schema" />
      {faqSchema && <StructuredData data={faqSchema} id="article-faq-schema" />}

      <article className="article-detail-view">
        {/* Header Banner */}
        <header className="article-header">
          <div className="header-container">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <Link href="/articles">Articles</Link>
              <span className="sep">/</span>
              <span className="current" aria-current="page">
                {article.category}
              </span>
            </nav>

            <span className="category-badge">{article.category}</span>
            <h1>{article.title}</h1>
            <p className="article-subtitle">{article.subtitle}</p>

            <div className="meta-bar">
              <div className="author-info">
                <User size={16} />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body Content */}
        <div className="article-body-layout">
          {/* Sidebar Navigation (Table of Contents) */}
          <aside className="toc-sidebar">
            <div className="toc-card">
              <h3>Table of Contents</h3>
              <ul>
                {article.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1c4584] hover:text-[#17ace4] transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Articles</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <div className="main-article-content">
            {/* Intro Paragraphs */}
            {article.content.intro.map((p, idx) => (
              <p key={idx} className="intro-paragraph">
                {p}
              </p>
            ))}

            {/* Sections */}
            {article.content.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="bullets-list">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-[#17ace4] shrink-0 mt-1" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.highlightBox && (
                  <div className="highlight-box">
                    <h4>{section.highlightBox.title}</h4>
                    <p>{section.highlightBox.text}</p>
                  </div>
                )}
              </section>
            ))}

            {/* Webinar Callout Card */}
            {article.content.webinarCallout && (
              <div className="webinar-card-callout">
                <span className="callout-tag">Executive Webinar</span>
                <h3>{article.content.webinarCallout.title}</h3>
                <p>{article.content.webinarCallout.description}</p>
                <div className="webinar-details">
                  <div>
                    <strong className="block text-white font-semibold">Date & Time:</strong>
                    <span className="text-gray-200 text-sm">{article.content.webinarCallout.date}</span>
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Speakers:</strong>
                    <span className="text-gray-200 text-sm">
                      {article.content.webinarCallout.speakers.join(", ")}
                    </span>
                  </div>
                  {article.content.webinarCallout.link.startsWith("http") ? (
                    <a
                      href={article.content.webinarCallout.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-webinar"
                    >
                      Download
                    </a>
                  ) : (
                    <Link
                      href={article.content.webinarCallout.link}
                      className="btn-webinar"
                    >
                      Download
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Conclusion */}
            {article.content.conclusion && (
              <section className="mt-8">
                {article.content.conclusion.map((c, cIdx) => (
                  <p key={cIdx} className="font-medium text-gray-800">
                    {c}
                  </p>
                ))}
              </section>
            )}

            {/* FAQs Section */}
            {article.faqs && article.faqs.length > 0 && (
              <section className="faqs-section">
                <h3>Frequently Asked Questions</h3>
                {article.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="faq-item">
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <CTASection
          title="Transform Shop Floor Efficiency Today"
          description="Learn how Athena's Shop Floor Mobility Accelerator can integrate with your existing MES to deliver live data capture and real-time visibility."
          buttonText="Request Technical Walkthrough"
          buttonLink="/athena-accelerator-get-a-demo"
          backgroundImage="/assets/images/contactus.webp"
        />
      </article>
    </>
  );
}
