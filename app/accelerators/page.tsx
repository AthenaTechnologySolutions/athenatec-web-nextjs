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
  title:
    "Manufacturing Accelerators | Extend Your MES Investment | Athena",
  description:
    "Purpose-built manufacturing accelerators that extend MES capabilities—engineering change management, quality validation, and Shop Floor mobility—without replacing your existing MES.",
  path: "/accelerators",
  image: "/assets/images/AMA.webp",
  keywords: [
    "MES accelerators",
    "extend MES capabilities",
    "engineering change management software",
    "MES automated testing",
    "Shop Floor mobility",
    "manufacturing execution system add-ons",
  ],
});

/* ---------- Icons (inline, no new dependency) ---------- */

const IconExtend = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 24h20M28 14l10 10-10 10"
      stroke="#17ace4"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="24" r="4" stroke="#1c4584" strokeWidth="3" />
  </svg>
);

const IconAccelerate = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 34 20 22l6 6 14-14"
      stroke="#17ace4"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 14h8v8"
      stroke="#1c4584"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconInvestment = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 6 40 14v10c0 10-7 16-16 18C15 40 8 34 8 24V14L24 6Z"
      stroke="#1c4584"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M18 24l4 4 8-8"
      stroke="#17ace4"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconTimeToValue = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="26" r="14" stroke="#1c4584" strokeWidth="3" />
    <path
      d="M24 18v8l6 4"
      stroke="#17ace4"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M17 6h14" stroke="#1c4584" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ---------- Content ---------- */

const valueProps = [
  {
    icon: IconExtend,
    title: "Extend MES Capabilities",
    description: "Enhance your existing MES without heavy customization.",
  },
  {
    icon: IconAccelerate,
    title: "Accelerate Operations",
    description: "Reduce manual effort and improve execution speed.",
  },
  {
    icon: IconInvestment,
    title: "Maximize Existing Investments",
    description: "Continue leveraging your current MES.",
  },
  {
    icon: IconTimeToValue,
    title: "Faster Time to Value",
    description:
      "Purpose-built solutions delivering measurable business outcomes.",
  },
];

const portfolioGroups = [
  {
    category: "Engineering Change Management",
    accelerators: [
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
          impact:
            "Minimizes synchronization errors and data inconsistency across MES instances, ensuring seamless compliance and traceability.",
        },
      },
      {
        title: "Automation Scripting Tool",
        image: "/assets/images/futuristic-robot-artificial-intelligence-concept-scaled-1.webp",
        description: {
          what: "Executes automated test scripts for validating rule configurations, field behaviours, and system readiness during ECO implementation.",
          why: "Accelerates deployment while maintaining control. Every run generates a downloadable report for quality and audit teams.",
          impact:
            "Speeds up validation cycles and ensures system reliability by finding potential execution defects early.",
        },
      },
    ],
  },
];

const shopFloorBenefits = [
  "Reduce operator movement",
  "Improve real-time data capture",
  "Perform barcode scanning and MES transactions on handheld devices",
  "Reduce workstation dependency",
  "Minimize cable clutter",
];

const outcomeTiles = [
  "Improve Operator Productivity",
  "Reduce Manual Engineering Effort",
  "Improve Data Accuracy",
  "Accelerate Manufacturing Execution",
  "Protect Existing MES Investments",
  "Purpose Built by Manufacturing Experts",
];

export default function EcoAccelerator() {
  return (
    <>
      <HeroSection
        title="Purpose Built Manufacturing Accelerators"
        description="Extend your MES beyond standard functionality with purpose-built accelerators that improve engineering change management, Shop Floor productivity, quality validation, and operational efficiency—without replacing your existing MES."
        image="/assets/images/AMA.webp"
        align="center"
        buttonText="Explore Our Accelerators"
        buttonLink="#accelerator-portfolio"
        secondaryButtonText="Request a Demo"
        secondaryButtonLink="/athena-accelerator-get-a-demo"
      />

      <section className="why-athena">
        <div className="container">
          <h2 className="section-title">Why Athena Accelerators</h2>
          <div className="value-grid">
            {valueProps.map((item) => (
              <div className="value-card" key={item.title}>
                <div className="value-icon">{item.icon()}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="accelerator-portfolio" id="accelerator-portfolio">
        <div className="container">

          <h2 className="section-title">Athena Accelerator Portfolio</h2>

             <div className="portfolio-group">
            <h3 className="group-title">
              Shop Floor Productivity
              <span className="group-badge">Featured</span>
            </h3>

            <div className="featured-accelerator">
              <div className="featured-image-wrapper">
                <Image
                  src="/assets/images/shopfloor-mobility.webp"
                  alt="Shop Floor Mobility Accelerator"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="card-image"
                />
                <span className="new-badge">New</span>
              </div>

              <div className="featured-content">
                <h4>Shop Floor Mobility Accelerator</h4>
                <p className="featured-tagline">
                  Bring MES directly to the point of work.
                </p>

                <ul className="benefit-list">
                  {shopFloorBenefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>

                <div className="cta-row">
                  <Link
                    href="/athena-accelerator-get-a-demo"
                    className="primary-btn"
                  >
                    Watch Demo
                    <span className="arrow">→</span>
                  </Link>
                  <Link href="#accelerator-portfolio" className="text-link">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {portfolioGroups.map((group) => (
            <div className="portfolio-group" key={group.category}>
              <h3 className="group-title">{group.category}</h3>
              <div className="card-grid">
                {group.accelerators.map((item) => (
                  <div className="accelerator-card" key={item.title}>
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
                      <h4>{item.title}</h4>
                      {typeof item.description === "string" ? (
                        <p>{item.description}</p>
                      ) : (
                        <div className="space-y-4 mt-3">
                          <div>
                            <strong className="block font-bold mb-0.5">What it does:</strong>
                            <p>{item.description.what}</p>
                          </div>
                          <div>
                            <strong className="block font-bold mb-0.5">Why it matters:</strong>
                            <p>{item.description.why}</p>
                          </div>
                          {item.description.impact && (
                            <div>
                              <strong className="block font-bold mb-0.5">Impact analysis:</strong>
                              <p>{item.description.impact}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
       
        </div>
      </section>

      <section className="why-customers">
        <div className="container">
          <h2 className="section-title">Why Customers Choose Athena</h2>
          <div className="outcome-grid">
            {outcomeTiles.map((outcome) => (
              <div className="outcome-tile" key={outcome}>
                <p>{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <InternalLinkCluster
        links={manufacturingSeoLinks}
        title="Use accelerators inside a broader MES implementation roadmap"
        description="Connect ECO automation with MES implementation services, Siemens Opcenter, Critical Manufacturing, Oracle Agile PLM, Oracle Cloud ERP, and manufacturing case studies."
      /> */}

      <CTASection
        title={
          <>
            Unlock More Value <br /> from Your MES
          </>
        }
        description="Discover how Athena Manufacturing Accelerators help manufacturers improve productivity, simplify operations, and extend the value of their MES investment."
        buttonText="Schedule a Demo"
        buttonLink="/athena-accelerator-get-a-demo"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </>
  );
}