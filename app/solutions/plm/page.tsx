import HeroSection from "@/app/components/HeroSection";
import Image from "next/image";
import "./plm.scss";
import PracticeSection from "@/app/components/PracticeSection";
import CTASection from "@/app/components/CTASection";
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
import { oracleAgilePlmFaqs } from "@/app/data/seoContent";

export const metadata = buildMetadata({
  title: "Oracle Agile PLM Implementation Services",
  description:
    "Implement Oracle Agile PLM with ERP and MES integrations, BOM governance, change control, migration, validation, and long-term support.",
  path: "/solutions/plm",
  image: "/assets/images/PLM.webp",
  keywords: [
    "Oracle Agile PLM implementation services",
    "Agile PLM implementation",
    "PLM MES integration",
    "PLM ERP integration",
    "manufacturing PLM consulting",
  ],
});
const practiceData = [
  {
    title: "Solutions / Modules",
    icon: "/assets/icons/process.webp",
    items: [
      "Product Portfolio Management",
      "Product Collaboration",
      "Design Center / CAD",
      "Product Quality / Defects",
      "Change Management",
      "Product Costing",
      "Supplier Management",
      "Compliance / Governance",
    ],
  },
  {
    title: "Implementation",
    icon: "/assets/icons/Implementation.webp",
    items: [
      "Project Management",
      "Requirements / Design",
      "Process Reengineering",
      "Systems Integration (ERP / MES)",
      "Custom Development",
      "Automated Testing",
      "User Training",
    ],
  },
  {
    title: "Application Support",
    icon: "/assets/icons/Application-Support.webp",
    items: [
      "Support all PLM Modules",
      "Ticket Based Tracking",
      "Troubleshooting",
      "Minor Enhancements",
      "Reporting",
    ],
  },
];
export default function PlmSolution() {
  const seoSchema = [
    buildWebPageSchema({
      name: "Oracle Agile PLM Implementation Services",
      description:
        "Oracle Agile PLM implementation, migration, upgrades, and ERP/MES integration services for manufacturers.",
      path: "/solutions/plm",
      primaryImage: "/assets/images/PLM.webp",
    }),
    buildServiceSchema({
      name: "Oracle Agile PLM Implementation Services",
      description:
        "Athenatec implements Oracle Agile PLM for product records, BOMs, change management, quality processes, ERP integration, MES integration, migrations, and support.",
      path: "/solutions/plm",
      serviceType: "Oracle Agile PLM Implementation",
      keywords: [
        "Oracle Agile PLM implementation services",
        "Agile PLM implementation",
        "PLM MES integration",
        "PLM ERP integration",
      ],
      areaServed: ["United States", "North America", "APAC", "EMEA"],
      offers: [
        {
          name: "Oracle Agile PLM implementation",
          description:
            "Configuration for product records, BOMs, engineering changes, supplier data, and quality processes.",
        },
        {
          name: "PLM integrations",
          description:
            "Controlled PLM integrations with ERP, MES, quality, supplier, and analytics systems.",
        },
 
      ],
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solutions", path: "/solutions/mes" },
      { name: "Oracle Agile PLM Implementation Services", path: "/solutions/plm" },
    ]),
    buildFaqSchema(oracleAgilePlmFaqs, "/solutions/plm"),
  ];

  return (
    <>
      <StructuredData data={seoSchema} id="oracle-agile-plm-seo-schema" />
      <HeroSection
        title="Oracle Agile PLM Implementation Services"
        description="Implement, migrate, upgrade, and integrate Oracle Agile PLM so product, BOM, change, ERP, and MES data stay controlled across the manufacturing lifecycle."
        image="/assets/images/PLM.webp"
        align="center"
        buttonText="Discuss Oracle Agile PLM implementation"
        buttonLink="/contact"
      />
      <section className="plm-description">
        <div className="plm-description__card">
          <p>
            PLM is considered an essential to most Manufacturing companies. This
            is because Product companies need to have a controlled and
            centralized process to manage the life of their products. A typical
            PLM will manage the Products Life from Concept (MRD), Design (PDM),
            Parts and BOMs (ERP) Manufacturing. (MES), Distribution (ERP/ SCM/
            WMS) with Change Control for same, through the Product’s EOL /
            Retirement. At Athena, we provide Oracle / Agile PLM Implementation
            Services, including; integration with ERP and MES systems to
            accomplish Process Automation along the Product and Production life
            Cycles. Athena also has considerable expertise with Agile PLM
            Migrations and Upgradations.
          </p>
        </div>
      </section>
      <section className="plm-team">
        <div className="plm-team__container">
          <h2 className="plm-team__title">Oracle Agile PLM Closed-Loop System</h2>

          <div className="plm-team__image">
         <Image
  src="/assets/images/05-6.webp"
  alt="Oracle Agile PLM closed-loop change management workflow"
  width={700}
  height={470}
  sizes="(max-width: 768px) 100vw, 700px"
  className="w-full h-auto object-cover"
  quality={75}
/>
          </div>
        </div>
      </section>
      <PracticeSection
        title="Oracle Agile PLM Implementation and Support Services"
        cards={practiceData}
      />
      {/* <FaqSection
        title="Oracle Agile PLM Implementation FAQs"
        intro="Common questions about Agile PLM implementation, migration, change control, and ERP/MES integration."
        faqs={oracleAgilePlmFaqs}
      /> */}
      <InternalLinkCluster
        links={manufacturingSeoLinks}
        title="Connect Oracle Agile PLM with MES and ERP"
        description="Explore MES implementation, Siemens Opcenter, Critical Manufacturing, Oracle Cloud ERP, accelerators, and case studies that support the product-to-production digital thread."
      />
      <CTASection
        title={
          <>
            Let’s talk
            <br /> Got an enquiry?
          </>
        }
        description="Engage Athenatec for Oracle Agile PLM implementation, migration, ERP integration, MES integration, and support."
        buttonText="Request Oracle Agile PLM consulting"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </>
  );
}
