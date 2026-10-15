import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/app/components/HeroSection";
import type { Metadata } from "next";
import { LOGO_PATH, absoluteUrl, buildMetadata, stripHtml, truncate } from "@/lib/seo";
import { getAllPosts, getPostImage, type WPPost } from "@/lib/wordpress";

export const revalidate = 300;

const NEWSROOM_SLUGS = [
  "athena-opens-its-new-office-in-portugal",
  "athena-featured-in-digital-it-news-national-it-service-provider-day",
  "athena-launches-faborchestrator-agentic-ai-for-manufacturing",
  "athena-and-tech-mahindra-announce-partnership",
  "authorised-reseller-partnership-with-twinzo",
];

const NEWSROOM_SLUG_SET = new Set(NEWSROOM_SLUGS);

const NEWSROOM_HERO_IMAGE = "/assets/images/newsroom-banner.webp";

async function getPosts(): Promise<WPPost[]> {
  const posts = await getAllPosts();

  return posts
    .filter((post) => NEWSROOM_SLUG_SET.has(post.slug))
    .sort(
      (a, b) =>
        NEWSROOM_SLUGS.indexOf(a.slug) - NEWSROOM_SLUGS.indexOf(b.slug),
    );
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Athenatec Newsroom | Partnerships & Updates",
    description:
      "Stay updated with Athenatec's latest news, strategic partnerships, and smart manufacturing announcements.",
    path: "/newsroom",
    keywords: [
      "Athenatec newsroom",
      "Athenatec updates",
      "manufacturing news",
      "industry partnerships",
    ],
    image: NEWSROOM_HERO_IMAGE,
  });
}

export default async function NewsRoom() {
  const posts = await getPosts();
  const featuredPost = posts[0] ?? null;
  const remainingPosts = posts.slice(1);

  const featuredImage =
    featuredPost?.slug === "athena-opens-its-new-office-in-portugal" ||
    featuredPost?.slug === "athena-announces-the-opening-of-its-new-office-in-portugal"
      ? "/assets/images/portugal-announcement.png"
      : featuredPost
        ? getPostImage(featuredPost)
        : null;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Newsroom",
    description:
      "Latest company news, partnerships and digital manufacturing updates from Athenatec.",
    url: "https://www.athenatec.com/newsroom",
    publisher: {
      "@type": "Organization",
      name: "Athenatec",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(LOGO_PATH),
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.athenatec.com/newsroom/${post.slug}`,
        name: stripHtml(post.title.rendered),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      <HeroSection
        title="News Room"
        description="Latest announcements, partnerships and digital manufacturing updates from Athenatec"
        image={NEWSROOM_HERO_IMAGE}
        align="center"
        buttonText="Discuss a manufacturing technology announcement"
        buttonLink="/contact"
      />
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-bold mb-10 text-gray-900">Newsroom</h2>

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-gray-400 text-lg">
                News articles are coming soon. Check back later.
              </p>
            </div>
          ) : (
            <>
              {/* ── Featured Top Announcement Card ── */}
              {featuredPost && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-16 grid md:grid-cols-2 items-stretch hover:shadow-md transition">
                  <div className="relative min-h-[300px] md:min-h-[400px] w-full bg-gradient-to-br from-blue-50 to-slate-100">
                    {featuredImage ? (
                      <Image
                        src={featuredImage}
                        alt={stripHtml(featuredPost.title.rendered)}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
                    )}
                  </div>

                  <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block bg-[#1c4584] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                        FEATURED
                      </span>
                    </div>

                    <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-3">
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-serif mb-4 leading-snug">
                      <Link
                        href={`/newsroom/${featuredPost.slug}`}
                        className="hover:text-[#1c4584] transition"
                      >
                        {stripHtml(featuredPost.title.rendered)}
                      </Link>
                    </h3>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-normal">
                      {truncate(stripHtml(featuredPost.excerpt.rendered), 160)}
                    </p>

                    <div>
                      <Link
                        href={`/newsroom/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 text-[#1c4584] font-semibold hover:text-[#17ace4] transition text-sm group"
                      >
                        Read Article <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Remaining Announcements Grid ── */}
              {remainingPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {remainingPosts.map((post: WPPost) => {
                    const imageSrc = getPostImage(post);

                    return (
                      <article
                        key={post.id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col border border-gray-100"
                      >
                        <div className="relative h-60">
                          {imageSrc ? (
                            <Image
                              src={imageSrc}
                              alt={stripHtml(post.title.rendered)}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200"
                            />
                          )}
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <h2 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2">
                            {stripHtml(post.title.rendered)}
                          </h2>

                          <Link
                            href={`/newsroom/${post.slug}`}
                            className="block text-gray-600 text-sm mb-4 hover:text-[#1c4584]"
                          >
                            {truncate(stripHtml(post.excerpt.rendered), 140)}
                          </Link>

                          <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 text-xs">
                            <span className="text-gray-400">
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>

                            <Link
                              href={`/newsroom/${post.slug}`}
                              className="text-[#1c4584] font-medium hover:underline inline-flex items-center gap-1"
                            >
                              Read More →
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
