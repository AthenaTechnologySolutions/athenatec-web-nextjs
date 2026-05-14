import Image from "next/image";
import Link from "next/link";
import "./eyelit.scss";
import HeroSection from "@/app/components/HeroSection";
import CTASection from "@/app/components/CTASection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eyelit MES & Equipment Connect Partner | Athenatec",
  description:
    "Athenatec implements Eyelit MES and Equipment Connect. Gain real-time visibility, advanced planning, and predictive maintenance for your factory.",
  path: "/eyelit",
  image: "/assets/images/eyelitsbanner1.webp",
});
export default function EyelitPage() {
  return (
    <main className="eyelit-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Eyelit MES Implementation",
            provider: {
              "@type": "Organization",
              name: "Athenatec",
              url: "https://athenatec.com",
            },
            description:
              "Eyelit MES and Equipment Connect implementation, integration, and optimization services.",
            areaServed: "Worldwide",
          }),
        }}
      />
      <HeroSection
        title="Eyelit"
        description="Advanced manufacturing execution systems built for scale."
        image="/assets/images/eyelitsbanner1.webp"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <section className="eyelit-hero">
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-content">
              <h1>
                Your Trusted Implementation Partner for
                <span> Eyelit MES & Equipment Connect</span>
              </h1>

              <p>
                At Athena, we specialize in delivering advanced manufacturing
                solutions through our partnership with Eyelit Technologies. As a
                certified implementation partner, we offer deep expertise in
                Eyelit&apos;s Manufacturing Execution System (MES) and Equipment
                Connect, empowering your operations with real-time data
                visibility, enhanced control, and seamless integration.
              </p>

              <div className="hero-actions">
                <Link
                  href="https://eyelit.ai/mesaps/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-btn"
                >
                  Learn More
                </Link>

                <Link href="/contact" className="secondary-btn">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="expertise-section">
        <div className="container">
          <div className="expertise-grid">
            <div className="expertise-content">
              <h2 className="expertise-title">Our Expertise</h2>

              <ul className="expertise-list">
                <li>
                  <strong>Proven Experience:</strong> With extensive experience
                  in implementing Eyelit MES and Equipment Connect, we ensure a
                  smooth transition and integration into your existing systems.
                </li>

                <li>
                  <strong>Tailored Solutions:</strong> We collaborate closely
                  with you to design and implement MES solutions that align with
                  your specific business needs, enhancing productivity and
                  operational efficiency.
                </li>

                <li>
                  <strong>Seamless Integration:</strong> Our team ensures the
                  seamless connection of Eyelit&apos;s MES and Equipment Connect with
                  your existing systems, driving a more efficient and automated
                  production environment.
                </li>
                <li>
                  <strong>Ongoing Support:</strong> Beyond implementation, we
                  provide continuous support, maintenance, and optimization,
                  ensuring that your MES system evolves with your business.
                </li>
              </ul>
            </div>

            <div className="expertise-image">
              <Image
                src="/assets/images/1722014978283.webp"
                alt="Expertise"
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto object-cover"
                quality={75}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="eyelit-features">
        <div className="container">
          <div className="section-header">
            <h2>Eyelit MES: Streamline Your Manufacturing Operations</h2>
            <p>
              Eyelit&apos;s MES offers a comprehensive suite of applications designed
              to optimize manufacturing processes. Key features include:
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-head">
                <Image
                  src="/assets/icons/dashboard.svg"
                  alt=""
                  width={44}
                  height={44}
                  aria-hidden="true"
                />
                <h3>Real-Time Data Visibility</h3>
              </div>
              <p>
                Gain immediate insights into production activities, enabling
                informed decision-making and rapid response to operational
                changes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-head">
                <Image
                  src="/assets/icons/scheduling.svg"
                  alt=""
                  width={44}
                  height={44}
                  aria-hidden="true"
                />
                <h3>Advanced Planning and Scheduling (APS)</h3>
              </div>
              <p>
                Utilize real-time planning capabilities to dynamically adjust
                production schedules based on actual conditions, ensuring
                efficient resource allocation and addressing supply chain
                variability.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-head">
                <Image
                  src="/assets/icons/data-visualization.svg"
                  alt=""
                  width={44}
                  height={44}
                  aria-hidden="true"
                />
                <h3>Production Process Monitoring</h3>
              </div>
              <p>
                Monitor and control production processes in real-time, from
                tracking Work in Progress (WIP) to inventory management,
                ensuring complete visibility into production schedules and
                workflows.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-head">
                <Image
                  src="/assets/icons/regulatory-compliance.svg"
                  alt=""
                  width={44}
                  height={44}
                  aria-hidden="true"
                />
                <h3>Regulatory Compliance</h3>
              </div>
              <p>
                Features for traceability, electronic signatures, and adherence
                to industry standards, supporting compliance with regulations
                such as FDA 21 CFR Part 11.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="equipment-connect">
        <div className="container">
          <div className="equipment-grid">
            <div className="equipment-image">
              <Image
                src="/assets/images/Eyelit-Equipment.webp"
                alt="Equipment Connect"
                width={700}
                height={470}
                sizes="(max-width: 768px) 100vw, 700px"
                className="w-full h-auto object-cover"
                quality={75}
              />
            </div>

            <div className="equipment-content">
              <h2>
                Eyelit Equipment Connect:
                <span> Maximizing Equipment Performance</span>
              </h2>

              <p className="section-desc">
                Eyelit&apos;s Equipment Connect integrates your shop floor equipment
                with your MES, providing valuable insights into equipment
                performance, utilization, and downtime. Benefits include:
              </p>

              <div className="benefits-list">
                <div className="benefit-item">
                  <Image
                    src="/assets/icons/check-mark.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                  <div>
                    <h4>Real-Time Monitoring and Diagnostics</h4>
                    <p>
                      Enable immediate detection and resolution of equipment
                      issues, reducing unplanned downtime and improving
                      equipment reliability.
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <Image
                    src="/assets/icons/check-mark.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                  <div>
                    <h4>Predictive Maintenance</h4>
                    <p>
                      Utilize data-driven insights to anticipate maintenance
                      needs, enhancing operational efficiency and extending
                      equipment lifespan.
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <Image
                    src="/assets/icons/check-mark.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                  <div>
                    <h4>Enhanced Operational Efficiency</h4>
                    <p>
                      Streamline production processes by ensuring equipment is
                      operating at optimal performance levels, contributing to
                      overall productivity improvements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTASection
        title={
          <>
            A New <br /> Requirement?
          </>
        }
        description="At Athena, our team guides your Industry 4.0 journey with deep expertise in digital transformation and manufacturing solutions. "
        buttonText="Contact Us"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </main>
  );
}
