import HeroSection from "@/app/components/HeroSection";
import Image from "next/image";
import "./mes.scss";
import CTASection from "@/app/components/CTASection";
import PracticeSection from "@/app/components/PracticeSection";
import Link from "next/link";
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
import { mesImplementationFaqs, priorityServiceOffers } from "@/app/data/seoContent";

export const metadata = buildMetadata({
  title: "MES Implementation & Integration Services",
  description:
    "Athenatec integrates MES with ERP, PLM, and factory equipment. Gain real-time visibility, traceability, and control across your manufacturing process.",
  path: "/solutions/mes",
  image: "/assets/images/Mes-solution.webp",
});

const practiceData = [
  {
    title: "Process / Modules",
    icon: "/assets/icons/process.webp",
    items: [
      "WIP Workflow Management",
      "Asset and Durables",
      "Dispatching",
      "Product Costing",
      "ERP / PLM Integration",
      "Equipment Integration",
    ],
  },
  {
    title: "Implementation",
    icon: "/assets/icons/Implementation.webp",
    active: true,
    items: [
      "Project Management",
      "Requirements / Design",
      "Process Reengineering",
      "Systems Integration Test",
      "Custom Development",
      "Automated Testing",
      "User Training",
    ],
  },
  {
    title: "Application Support",
    icon: "/assets/icons/Application-Support.webp",
    items: [
      "Support all MES Modules",
      "Ticket based Tracking",
      "Troubleshooting",
      "Enhancements / Reporting",
    ],
  },
];
export default function MESPage() {
  const seoSchema = [
    buildWebPageSchema({
      name: "MES Implementation & Integration Services",
      description:
        "Manufacturing execution system implementation and integration services connecting ERP, PLM, and factory systems.",
      path: "/solutions/mes",
      primaryImage: "/assets/images/Mes-solution.webp",
    }),
    buildServiceSchema({
      name: "MES Implementation & Integration Services",
      description:
        "MES implementation and integration services for manufacturers connecting ERP, PLM, equipment, quality systems, and analytics.",
      path: "/solutions/mes",
      serviceType: "Manufacturing Execution System Implementation",
      keywords: [
        "MES implementation",
        "MES integration services",
        "manufacturing execution system implementation",
        "Industry 4.0 MES",
      ],
      offers: priorityServiceOffers,
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "MES Implementation Services", path: "/mes-implementation-services" },
      { name: "MES Implementation & Integration Services", path: "/solutions/mes" },
    ]),
    buildFaqSchema(mesImplementationFaqs, "/solutions/mes"),
  ];

  return (
    <>
      <StructuredData data={seoSchema} id="mes-solution-seo-schema" />
      <HeroSection
        title="MES Implementation and Integration Services"
        description="Manufacturing execution system implementation that connects ERP, PLM, equipment, quality, analytics, and shop-floor execution for Industry 4.0 programs."
        image="/assets/images/Mes-solution.webp"
        align="center"
        buttonText="Explore MES implementation services"
        buttonLink="/mes-implementation-services"
      />
      {/* <div className="bg-white py-6">
        <div className="container">
          <Link
            href="/mes-implementation-services"
            className="font-semibold text-[#1c4584] hover:text-[#17ace4]"
          >
            Read the complete MES implementation services guide
          </Link>
        </div>
      </div> */}
      <section className="who-we-are">
        <div className="container">
           <div className="who-content">
            <h2 className="who-title">
              Seamless Support from Prototyping to Delivery
            </h2>

            <p className="who-description">
              Athena specializes in the implementation of MES (Manufacturing
              Execution Systems) and integration , seamlessly connecting with
              all other enterprise systems and Equipments to optimize the entire
              manufacturing process. From prototyping to delivery, our dedicated
              teams work closely with clients to ensure smooth, efficient
              program execution, enabling greater visibility and control at
              every stage of implementation.
            </p>
            <Link href="/about">
              <button className="who-button">Meet our MES implementation experts</button>
            </Link>
          </div>

           <div className="who-image">
            <Image
              src="/assets/images/Prototyping-to-Delivery.webp"
              alt="Prototyping to Delivery"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </section>
      <section className="soc-factory">
        <div className="soc-factory__container">
          <h2 className="soc-factory__title">
            MES Factory System Overview and Integration
          </h2>

          <div className="soc-factory__grid">
            <div className="soc-factory__card">
              <div className="soc-factory__stars">★★★★★</div>
              <p>
                The <strong> Factory MES System</strong> has become the heart of
                the Industry 4.0 / Smart Factory trend. Unlike ERP / SFC
                systems, MES Systems effectively Control and Track the flow of
                Product in the factory with full traceability. MES Systems also
                intelligently communicate with Factory Equipment, Automation
                Cells and a variety of Quality and other Factory Applications,
                resulting in a more Automated Production Process. At Athena,
                Siemens Opcenter MES is the Centerpiece of our MOM Consulting
                Practice. With Siemens, a well established leader in MOM /
                Manufacturing Operations Management, we are likewise proud to be
                a Siemens Strategic Alliance Partner.
              </p>
              <p className="mt-6">
                <strong>Factory Systems Integration</strong> creates intelligent
                connections between Factory Systems and Factory Assets. The key
                is to first align around the Production Life Cycle and then to
                digitally connect all the Digitally capable Assets within for
                each Operational step. In the Smart Factory, PLM, ERP, MES and
                CMMS are integrated along their respective process life Cycles.
                Likewise, to gain the value of a Smart Factory, the MES System
                is also integrated with; Factory Equipment, Quality Systems,
                Automation Controls and other Digitally capable Factory Systems
                to achieve orders of magnitude in Production benefits. These
                include; Higher Yield, Increased Production output, reduced
                human dependencies and Product cost.{" "}
                <strong>
                  In Summary, The Smart Factory is essentially a ‘Connected
                  Factory’.
                </strong>
              </p>
            </div>
            <div className="relative mt-8 aspect-[5/3] w-full max-w-[1200px]">
              <Image
                src="/assets/images/02-8.webp"
                alt="Factory System Integration Diagram"
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <PracticeSection
        title="Enterprise MES Implementation and Factory Systems Practice"
        cards={practiceData}
        bottomImage="/assets/images/07-4.webp"
      />
      {/* <FaqSection
        title="MES Implementation and Integration FAQs"
        intro="Common questions about MES consulting, implementation scope, integrations, validation, and support."
        faqs={mesImplementationFaqs}
      /> */}
      <InternalLinkCluster
        links={manufacturingSeoLinks}
        title="Compare MES implementation paths and supporting systems"
        description="Explore the MES services hub, Siemens Opcenter, Critical Manufacturing, Oracle Cloud ERP, Oracle Agile PLM, accelerators, and case studies."
      />
      <CTASection
        title={
          <>
            Let’s talk
            <br /> Got an enquiry?
          </>
        }
        description="Talk with Athenatec about MES implementation, integration, validation, and long-term manufacturing application support."
        buttonText="Request MES implementation consulting"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </>
  );
}
