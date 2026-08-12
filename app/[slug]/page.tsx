import { caseStudyContent } from "@/app/data/caseStudyContent";
import { buildMetadata, stripHtml, truncate } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "./DownloadNow";
import HeroSection from "@/app/components/HeroSection";
import "./casecontent.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudyContent.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const study = caseStudyContent.find((item) => item.slug === slug);

  if (!study) {
    return buildMetadata({
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
      path: `/${slug}`,
      noIndex: true,
    });
  }

  const metaTitle =
    study.seoTitle ||
    (study.fullTitle.length > 50
      ? `${truncate(study.fullTitle, 45)} | Athenatec`
      : `${study.fullTitle} | Athenatec`);

  const metaDesc = study.seoDescription || truncate(stripHtml(study.description), 155);

  return buildMetadata({
    title: metaTitle,
    description: metaDesc,
    path: `/${study.slug}`,
    image: study.image,
    keywords: ["case study", "manufacturing", "MES", "Athenatec"],
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const study = caseStudyContent.find((item) => item.slug === slug);

  if (!study) return notFound();

  return (
    <>
      <HeroSection
        title={study.fullTitle}
        description="Leave us a little info, and we’ll be in touch."
        image={study.image}
        align="left"
        buttonText="Send us Email"
        buttonLink="mailto:info@athenatec.com"
      />

      <CaseStudy study={study} />
    </>
  );
}
