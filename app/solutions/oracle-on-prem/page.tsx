import HeroSection from "@/app/components/HeroSection";
import PracticeSection from "@/app/components/PracticeSection";
import CTASection from "@/app/components/CTASection";
import Image from "next/image";
import "./prem.scss";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Oracle On-Premise Implementation & Support | Athenatec",
  description:
    "Athenatec delivers Oracle E-Business Suite and Agile PLM on-premise solutions since 2012. End-to-end implementation and 24/7 support.",
  path: "/solutions/oracle-on-prem",
  image: "/assets/images/oracle.webp",
});

const implementationData = [
  {
    title: "Implementation & Roll-out",
    icon: "/assets/icons/process.webp",
    items: [
      "Strategic Planning & Roadmap",
      "Pre-Implementation Assessments",
      "Gap Analysis",
      "System Design & Integration",
      "Business Process Alignment",
      "Third-Party App Integration",
    ],
  },
  {
    title: "Data & Technical Execution",
    icon: "/assets/icons/Implementation.webp",
    items: [
      "Data Migration Strategies",
      "Precise Data Mapping",
      "Secure Data Conversion",
      "Infrastructure Upgrades",
      "Application Customization",
      "Reporting Tools Development",
    ],
  },
  {
    title: "Support & Maintenance",
    icon: "/assets/icons/Application-Support.webp",
    items: [
      "L1, L2, L3 Functional Support",
      "24/7 Production Support",
      "System Health Checks",
      "Patch Management",
      "Performance Tuning",
      "Change Management",
    ],
  },
];

export default function OracleOnPrem() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Oracle On-Premise Solutions",
            provider: {
              "@type": "Organization",
              name: "Athenatec",
              url: "https://www.athenatec.com/",
            },
            description:
              "Oracle E-Business Suite and Agile PLM implementation, support, and managed services since 2012.",
            serviceType: "Oracle On-Premise Implementation",
            areaServed: "Worldwide",
          }),
        }}
      />

      {/* ── Hero ── */}
      <HeroSection
        title="Oracle On-Premise"
        description="Delivering Oracle E-Business Suite excellence since 2012 — end-to-end implementation, support, and managed services."
        image="/assets/images/oracle.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />

      {/* ── Overview Card ── */}
      <section className="onprem-description">
        <div className="onprem-description__card">
          <p>
            Delivering Oracle E-Business Suite excellence since 2012, Athenatec
            provides comprehensive implementation and support for multinational
            clients. Our proven expertise across a wide range of Oracle
            applications ensures our customers extract maximum value from their
            digital infrastructure. Athenatec offers end-to-end implementation
            for on-premise applications, including Oracle E-Business Suite and
            Agile PLM. Since 2012, we have specialized in the full lifecycle of
            on-premise solutions—from managing complex new installations to
            tailoring existing applications through custom development to meet
            specific business needs of customers.
          </p>
        </div>
      </section>

      {/* ── Since 2012 Stats ── */}
      <section className="onprem-stats">
        <div className="onprem-stats__container">
          <div className="onprem-stats__item">
            <span className="onprem-stats__number">2012</span>
            <span className="onprem-stats__label">Founded</span>
          </div>
          <div className="onprem-stats__divider" />
          <div className="onprem-stats__item">
            <span className="onprem-stats__number">10+</span>
            <span className="onprem-stats__label">
              Years of Oracle Expertise
            </span>
          </div>
          <div className="onprem-stats__divider" />
          <div className="onprem-stats__item">
            <span className="onprem-stats__number">24/7</span>
            <span className="onprem-stats__label">Support Coverage</span>
          </div>
          <div className="onprem-stats__divider" />
          <div className="onprem-stats__item">
            <span className="onprem-stats__number">Global</span>
            <span className="onprem-stats__label">Multinational Clients</span>
          </div>
        </div>
      </section>

       <PracticeSection
        title="Our Oracle On-Premise Services"
        cards={implementationData}
      />
       <section className="onprem-support">
        <div className="onprem-support__container">
          <h2 className="onprem-support__title">
            Oracle Support &amp; Maintenance
          </h2>
          <p className="onprem-support__subtitle">
            We provide proactive, 24/7 support models designed to ensure system
            stability, minimize downtime, and keep your Oracle environment
            running at peak performance.
          </p>

          <div className="onprem-support__grid">
            {[
              {
                icon: "/assets/icons/product-management.svg",
                title: "Production Support",
                desc: "Level 1, Level 2, and Level 3 functional and technical support for day-to-day operations.",
              },
              {
                icon: "/assets/icons/diagnostic.svg",
                title: "System Health Checks",
                desc: "Periodic audits, performance tuning, and preventative maintenance to identify and resolve bottlenecks.",
              },
              {
                icon: "/assets/icons/patch-management.svg",
                title: "Patch Management",
                desc: "Evaluation, testing, and application of Oracle security patches and functional updates.",
              },
              {
                icon: "/assets/icons/change-management.svg",
                title: "Change Management",
                desc: "Managed services for minor enhancements, report developments, and system configuration updates.",
              },
            ].map((item) => (
              <div className="onprem-support__card" key={item.title}>
                <div className="onprem-support__card-header">
                  {/* ✅ Fixed: src={item.icon} instead of {item.icon} as children */}
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={33}
                    height={33}
                    className="onprem-support__card-icon"
                  />
                  <h3>{item.title}</h3>
                </div>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       <CTASection
        title={
          <>
            Let&apos;s Build
             Something Exceptional
          </>
        }
        description="Our Oracle Certified Consultants are ready to guide your journey from implementation to long-term success."
        buttonText="Contact Us"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </>
  );
}
