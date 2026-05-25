import HeroSection from "@/app/components/HeroSection";
import PracticeSection from "@/app/components/PracticeSection";
import CTASection from "@/app/components/CTASection";
import "./cloud.scss";
import Image from "next/image";
// import FaqSection from "@/app/components/seo/FaqSection";
import InternalLinkCluster, {
  manufacturingSeoLinks,
} from "@/app/components/seo/InternalLinkCluster";
import StructuredData from "@/app/components/seo/StructuredData";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo";
import { oracleCloudFaqs } from "@/app/data/seoContent";

export const metadata = buildMetadata({
  title: "Oracle Cloud ERP Implementation Services",
  description:
    "Implement Oracle Cloud ERP, SCM, and HCM with Athenatec. Align cloud applications with MES, PLM, finance, supply chain, and manufacturing.",
  path: "/solutions/oracle-cloud",
  image: "/assets/images/oracle-cloud.webp",
  keywords: [
    "Oracle Cloud ERP implementation services",
    "Oracle Cloud implementation",
    "Oracle ERP manufacturing integration",
    "Oracle SCM Cloud implementation",
    "Oracle Cloud MES integration",
  ],
});

const practiceData = [
  {
    title: "ERP Cloud",
    icon: "/assets/icons/process.webp",
    items: [
      "Financial Management",
      "Project Portfolio Operations",
      "Procurement & Payables",
      "Revenue Management",
      "Enterprise Performance",
      "Risk & Compliance",
    ],
  },
  {
    title: "SCM Cloud",
    icon: "/assets/icons/Implementation.webp",
    items: [
      "Supply Chain Planning",
      "Inventory Management",
      "Order Management",
      "Digital Logistics",
      "Manufacturing Execution",
      "End-to-End Visibility",
    ],
  },
  {
    title: "HCM Cloud",
    icon: "/assets/icons/Application-Support.webp",
    items: [
      "Human Resources",
      "Talent Management",
      "Payroll Processing",
      "Workforce Management",
      "Learning & Development",
      "HR Analytics",
    ],
  },
];

const pathData = [
  {
    icon: "/assets/icons/idea.svg",
    title: "Net New Implementations",
    desc: "We conduct rigorous pre-implementation assessments, develop strategic project roadmaps, and perform detailed gap analyses to ensure your cloud environment is built for success from day one.",
  },
  {
    icon: "/assets/icons/sharing.svg",
    title: "Cloud Migrations",
    desc: "Our consultants manage the transition from your legacy on-prem systems, ensuring your new plat m is scalable, secure, and perfectly aligned with your long-term business objectives.",
  },
];

export default function OracleCloud() {
  const seoSchema = [
    buildWebPageSchema({
      name: "Oracle Cloud ERP Implementation Services",
      description:
        "Oracle Cloud ERP, SCM, and HCM implementation services for manufacturers modernizing enterprise operations.",
      path: "/solutions/oracle-cloud",
      primaryImage: "/assets/images/oracle-cloud.webp",
    }),
    buildServiceSchema({
      name: "Oracle Cloud ERP Implementation Services",
      description:
        "Athenatec implements Oracle Cloud ERP, SCM, and HCM and integrates Oracle Cloud with MES, PLM, supply chain, finance, and manufacturing systems.",
      path: "/solutions/oracle-cloud",
      serviceType: "Oracle Cloud ERP Implementation",
      keywords: [
        "Oracle Cloud ERP implementation services",
        "Oracle Cloud ERP manufacturing",
        "Oracle SCM Cloud implementation",
        "Oracle Cloud MES integration",
      ],
      areaServed: ["United States", "North America", "APAC", "EMEA"],
      offers: [
        {
          name: "Oracle Cloud ERP implementation",
          description:
            "Finance, procurement, inventory, project, and enterprise performance workflows.",
        },
        {
          name: "Oracle Cloud SCM implementation",
          description:
            "Supply chain planning, order management, inventory, manufacturing, and digital logistics.",
        },
        {
          name: "Oracle Cloud integrations",
          description:
            "Integration with MES, PLM, quality, analytics, and shop-floor applications.",
        },
      ],
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solutions", path: "/solutions/mes" },
      { name: "Oracle Cloud ERP Implementation Services", path: "/solutions/oracle-cloud" },
    ]),
    buildFaqSchema(oracleCloudFaqs, "/solutions/oracle-cloud"),
  ];

  return (
    <>
      <StructuredData data={seoSchema} id="oracle-cloud-seo-schema" />

      <HeroSection
        title="Oracle Cloud"
        description="Comprehensive cloud applications built for performance, security, and enterprise-scale growth."
        image="/assets/images/oracle-cloud.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />

      <section className="oracle-description">
        <div className="oracle-description__card">
          <p>
            Oracle Cloud delivers a comprehensive suite of integrated business
            applications designed to help organizations operate more efficiently
            and respond quickly to change. Built on Oracle Cloud Infrastructure,
            it provides the performance, security, and scalability required to
            run mission-critical enterprise operations. With continuous
            innovation delivered through quarterly release cycles, Oracle Cloud
            enables businesses to simplify operations, gain better visibility,
            and support sustainable growth. Oracle embeds Modern Best Practices
            across Oracle Cloud applications helping the organization&apos;s business
            processes to automatically align with industry-leading standards.
          </p>
        </div>
      </section>

      {/* ── Athenatec Expertise ── */}
      <section className="oracle-expertise">
        <div className="oracle-expertise__container">
          <h2 className="oracle-expertise__title">
            Athenatec&apos;s Oracle Cloud Expertise
          </h2>
          <p className="oracle-expertise__subtitle">
            Athenatec&apos;s team of Oracle Certified Consultants delivers premier
            implementation and managed services for cloud-based environments. We
            leverage deep domain expertise to help organizations transition to
            the Cloud with confidence, offering comprehensive support across the
            following pillars.
          </p>
        </div>
      </section>

      {/* ── Practice Cards ── */}
      <PracticeSection
        title="Oracle Cloud ERP, SCM, and HCM Service Pillars"
        cards={practiceData}
      />

      {/* ── Path to Success ── */}
      <section className="oracle-path">
        <div className="oracle-path__container">
          <h2 className="oracle-path__title">Our Structured Path to Success</h2>
          <p className="oracle-path__subtitle">
            Whether you are a new customer launching a cloud initiative or an
            existing user transitioning from on-prem systems, we provide a
            structured path to success.
          </p>

          <div className="oracle-path__grid">
            {pathData.map((item) => (
              <div className="oracle-path__card" key={item.title}>
                 <div className="oracle-path__card-header">
                  <Image
                    src={item.icon}
                    width={33}
                    height={33}
                    alt={item.title}
                    className="oracle-path__card-icon"
                  />
                  <h3>{item.title}</h3>
                </div>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      {/* <FaqSection
        title="Oracle Cloud ERP Implementation FAQs"
        intro="Common questions about Oracle Cloud ERP, SCM, integrations, migration, and manufacturing transformation."
        faqs={oracleCloudFaqs}
      /> */}
      <InternalLinkCluster
        links={manufacturingSeoLinks}
        title="Connect Oracle Cloud ERP with MES and PLM"
        description="Explore the MES, Siemens Opcenter, Critical Manufacturing, PLM, accelerators, case studies, and blog resources that complete the digital manufacturing architecture."
      />

      <CTASection
        title={
          <>
            Ready to Move
              to the Cloud?
          </>
        }
        description="Let Athenatec's Oracle Certified Consultants design and deploy the right Oracle Cloud strategy for your business."
        buttonText="Contact Us"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </>
  );
}
