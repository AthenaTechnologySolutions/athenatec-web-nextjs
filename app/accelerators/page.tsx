import HeroSection from "../components/HeroSection";
import "./accelerator.scss";
import Image from "next/image";
import CTASection from "../components/CTASection";
import type { Metadata } from "next";
import Link from "next/link";
import InternalLinkCluster, {
  manufacturingSeoLinks,
} from "@/app/components/seo/InternalLinkCluster";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Athena ECO Accelerators | Automate Engineering Change in MES",
  description:
    "Speed up engineering change workflows with Athena ECO Accelerators. Automate redlining, data migration, and testing in MES with full traceability.",
  path: "/accelerators",
  image: "/assets/images/eco-accelerators.webp",
  keywords: [
    "MES accelerators",
    "ECO automation",
    "MES automated testing",
    "master data migration",
    "engineering change automation",
  ],
});

const accelerators = [
  {
    title: "ECO Redliner",
    image:
      "/assets/images/improvement-success-planning-ideas-research-scaled-e1750766063422.webp",
    description: {
      what: "Compares product structures, routings, and key master data across revisions and visually highlights changes.",
      why: "Eliminates manual redlining by providing a digital, visual record of differences—backed by downloadable reports for review and approvals.",
      impact:
        "Identifies downstream impacts of changes across BOMs, routings, and operations—enabling proactive decision-making before deployment.",
    },
  },
  {
    title: "Master Data Migrator",
    image:
      "/assets/images/businessman-using-laptop-while-showing-icon-cloud-files-technology-innovation-virtual-screen-concept-data-management-system-scaled-1.webp",
    description: {
      what: "Automatically transfers and syncs updated master data across MES systems after change approvals.",
      why: "Reduces effort, ensures data consistency across platforms, and includes a detailed export of migrated fields for traceability.",
    },
  },
  {
    title: "Automation Scripting Tool",
    image:
      "/assets/images/futuristic-robot-artificial-intelligence-concept-scaled-1.webp",
    description: {
      what: "Executes automated test scripts for validating rule configurations, field behaviours, and system readiness during ECO implementation.",
      why: "Accelerates deployment while maintaining control. Every run generates a downloadable report for quality and audit teams.",
    },
  },
];
export default function EcoAccelerator() {
  return (
    <>
      <HeroSection
        title="Athena Accelerators"
        description="Speed up your Engineering Change workflows with intelligent automation. Our ECO Accelerators handle every step—tracking, redlining, approvals, and execution—while ensuring traceability and compliance. Built to support MES environments and scale with your needs."
        image="/assets/images/eco-accelerators.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <section className="accelerator-intro">
        <div className="container">
          <h2>Reimagining ECO Change with Automation</h2>

          <p>
            Engineering changes are a part of growth—but executing them
            shouldn’t slow you down.
          </p>

          <p>
            At Athena, we’ve developed a suite of automation accelerators
            <strong>
              {" "}
              specifically engineered to work seamlessly within MES environments
            </strong>
            , streamlining every step of the ECO process.
          </p>

          <p>
            From smart validations to cross-system data migration and automated
            testing, our tools bring precision, speed, and transparency to
            change implementation— while also generating downloadable reports
            for audit, compliance, and traceability.
          </p>
        </div>
      </section>
      <section className="mes-accelerators">
        <div className="container">
          <h2 className="section-title">Our MES-Ready ECO Accelerators</h2>

          <div className="card-grid">
            {accelerators.map((item, index) => (
              <div className="accelerator-card" key={index}>
                <div className="image-wrapper">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="card-image"
                  />
                </div>

                <div className="card-content">
                  <h3>{item.title}</h3>

                  <div className="text-block">
                    <strong>What it does:</strong>
                    <p>{item.description.what}</p>
                  </div>

                  <div className="text-block">
                    <strong>Why it matters:</strong>
                    <p>{item.description.why}</p>
                  </div>

                  {item.description.impact && (
                    <div className="text-block">
                      <strong>Impact analysis:</strong>
                      <p>{item.description.impact}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="cta-row">
            <Link href="/athena-accelerator-get-a-demo" className="primary-btn">
              Get an MES accelerator demo
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="accelerator-highlights">
        <div className="container">
          <h2 className="section-title">What Sets These Accelerators Apart</h2>

          <ul className="highlight-list">
            <li>
              Designed for MES platforms (e.g., Siemens Opcenter, Critical
              Manufacturing)
            </li>
            <li>Generate downloadable reports at each key step</li>
            <li>Improve accuracy and reduce ECO cycle time</li>
            <li>Enable faster, safer implementation of engineering changes</li>
            <li>Full traceability and audit-readiness across the lifecycle</li>
          </ul>
        </div>
      </section>
      <InternalLinkCluster
        links={manufacturingSeoLinks}
        title="Use accelerators inside a broader MES implementation roadmap"
        description="Connect ECO automation with MES implementation services, Siemens Opcenter, Critical Manufacturing, Oracle Agile PLM, Oracle Cloud ERP, and manufacturing case studies."
      />
      <CTASection
        title={
          <>
            A New <br /> Requirement?
          </>
        }
        description="Connect us for expert solutions in MES, PLM, ERP, and more. Reach out today."
        buttonText="Contact Us"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </>
  );
}
