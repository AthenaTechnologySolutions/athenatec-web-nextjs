import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/app/components/HeroSection";
import type { Metadata } from "next";
import { LOGO_PATH, absoluteUrl, buildMetadata, stripHtml, truncate } from "@/lib/seo";
import { getAllPosts, getPostImage, type WPPost } from "@/lib/wordpress";

export const revalidate = 300;

const NEWSROOM_SLUGS = [
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
        url: `https://www.athenatec.com/blog/${post.slug}`,
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
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Newsroom</h2>

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-gray-400 text-lg">
                News articles are coming soon. Check back later.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post: WPPost) => {
                const imageSrc = getPostImage(post);

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
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

                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-3">
                        {stripHtml(post.title.rendered)}
                      </h2>

                      <p className="text-gray-600 text-sm mb-4">
                        {truncate(stripHtml(post.excerpt.rendered), 140)}
                      </p>

                      <p className="text-xs text-gray-400 mb-4">
                        {new Date(post.date).toLocaleDateString("en-US")}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[#1c4584] font-medium hover:underline"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
