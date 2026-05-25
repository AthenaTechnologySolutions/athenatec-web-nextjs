import HeroSection from "@/app/components/HeroSection";
import Image from "next/image";
import "./case.scss";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "MES Case Studies & Manufacturing Success Stories",
  description:
    "See MES implementation, ERP, PLM, and smart manufacturing success stories for medical device, semiconductor, and high-tech manufacturers.",
  path: "/case-studies",
  image: "/assets/images/casestudie-banner.webp",
});

type CaseStudy = {
  slug: string;
  title: string;
  image: string;
  desc: string;
  tag: string;
 
};

const caseStudies: CaseStudy[] = [
  {
    slug: "medical-device-mes-modernization",
    title: "Enabling Continuous Innovation in Medical Device",
    image: "/assets/images/form-img.webp",
    desc: "A U.S.-based global leader in CGM has been pioneering real-time health insights for over 25 years.",
    tag: "Medical Device",
 
  },
  {
    slug: "nevro-paperless-mes",
    title: "From Paper to Paperless – Modernizing MES",
    image: "/assets/images/From-Paper.webp",
    desc: "Nevro, a globally recognized medical device company, is transforming operations with digital MES.",
    tag: "MES Modernization",
 
  },
];

export default function CaseStudies() {
  return (
    <>
      <HeroSection
        title="MES Case Studies and Manufacturing Success Stories"
        description="Real-world MES implementation, paperless manufacturing, ERP, PLM, and smart factory transformation stories from complex manufacturers."
        image="/assets/images/casestudie-banner.webp"
        align="center"
        buttonText="Discuss a similar MES implementation"
        buttonLink="/contact"
      />

      <section className="case-study-section">
         <div className="bg-grid" aria-hidden="true" />

        <div className="container">
          <div className="section-header">
            <h2>
              Case Studies
              <br />
            </h2>
            <p>Real transformation stories from our clients</p>
          </div>

          <div className="case-grid">
            {caseStudies.map((item, index) => (
              <Link
                href={`/case-studies/${item.slug}`}
                target="_blank"
                key={item.slug}
                className="case-card"
                style={{ "--index": index } as React.CSSProperties}
              >
                 <div className="case-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="img"
                  />
                  <div className="image-overlay" />
                  <span className="case-tag">{item.tag}</span>
                </div>

                 <div className="case-content">
                  <div className="case-content-inner">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>

                  <div className="case-footer">
                    <span className="case-btn">
                      <span>Read Case Study</span>
                      <svg
                        className="arrow-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

  
        </div>
      </section>
    </>
  );
}
