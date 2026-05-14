import { notFound } from "next/navigation";
import { industries } from "@/app/data/industries";
import Image from "next/image";
import "./industry.scss";
import Link from "next/link";
import CTASection from "@/app/components/CTASection";
import type { Metadata } from "next";
import { buildMetadata, truncate } from "@/lib/seo";

type PageProps = {
  params: Promise<{ industry: string }>;
};

export function generateStaticParams() {
  return Object.keys(industries).map((industry) => ({ industry }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { industry } = await params;
  const data = industries[industry];

  if (!data) {
    return buildMetadata({
      title: "Siemens Opcenter MES | Athenatec",
      description:
        "Athenatec implements Siemens Opcenter MES solutions for advanced manufacturing operations.",
      path: `/siemens-opcenter-mes/${industry}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${data.title} | Athenatec`,
    description: truncate(data.intro, 155),
    path: `/siemens-opcenter-mes/${industry}`,
    image: data.heroImage,
  });
}

export default async function IndustryPage({ params }: PageProps) {
  const { industry } = await params;

  const data = industries[industry];

  if (!data) return notFound();

  return (
    <div className="industry-page">
       <section className="hero">
        <Image
          src={data.heroImage}
          alt={data.title}
          fill
          priority
          sizes="100vw"
        />

        <div className="overlay">
          <div>
            <h1>{data.title}</h1>

            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

       <section className="intro container">
        <p>{data.intro}</p>
      </section>

       {data.videoUrl && (
        <section className="video container">
          <div className="video-wrapper">
            <video autoPlay loop muted playsInline preload="metadata">
              <source
                src={data.videoUrl}
                title="Industry Video"
                type="video/mp4"
              />
            </video>
          </div>
        </section>
      )}

       <section className="content container">
        {data.sections.map((sec, i) => (
          <div key={i} className="section-block">
            {/* <h2>{sec.heading}</h2> */}
            {sec.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </section>
      <CTASection
        title={
          <>
            Let&apos;s talk
            <br /> Got an enquiry?
          </>
        }
        description="At Athena, our team guides your Industry 4.0 journey with deep expertise in digital transformation and manufacturing solutions."
        buttonText="Contact Us"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </div>
  );
}
