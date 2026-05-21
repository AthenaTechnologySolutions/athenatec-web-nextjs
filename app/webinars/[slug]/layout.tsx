import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getWebinarSeo, webinarSeoItems } from "../webinar-seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return webinarSeoItems.map((webinar) => ({ slug: webinar.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const webinar = getWebinarSeo(slug);

  if (!webinar) {
    return buildMetadata({
      title: "Webinar Not Found | Athenatec",
      description: "The requested Athenatec webinar could not be found.",
      path: `/webinars/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: webinar.title,
    description: webinar.description,
    path: `/webinars/${webinar.slug}`,
    image: webinar.image,
    type: "article",
    keywords: webinar.keywords,
  });
}

export default function WebinarSlugLayout({ children }: Props) {
  return children;
}
