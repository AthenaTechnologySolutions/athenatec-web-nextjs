import { caseStudies } from "@/app/data/caseStudies";
import { buildMetadata, stripHtml, truncate } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";
import HeroSection from "@/app/components/HeroSection";
import "./studies.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return buildMetadata({
      title: "Case Study Not Found",
      description: "The requested case study could not be found.",
      path: `/case-studies/${slug}`,
      noIndex: true,
    });
  }

  const descriptionSource = study.summary.join(" ");
  const metaTitle = `${study.title} | Athenatec Case Study`;

  return buildMetadata({
    title: metaTitle,
    description: truncate(stripHtml(descriptionSource), 160),
    path: `/case-studies/${study.slug}`,
    image: study.image,
    keywords: ["case study", "manufacturing", "MES", "Athenatec"],
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) return notFound();

  return (
    <>
      <HeroSection
        title={study.fullTitle}
        description={"Leave us a little info, and we’ll be in touch."}
        image={study.image}
        align="left"
        buttonText="Send us Email"
        buttonLink="mailto:info@athenatec.com"
      />

      <CaseStudyClient study={study} />
    </>
  );
}
