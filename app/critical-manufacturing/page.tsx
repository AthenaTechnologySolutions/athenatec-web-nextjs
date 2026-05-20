import HeroSection from "@/app/components/HeroSection";
import Image from "next/image";
import "./critical.scss";
import CaseStudiesSection from "@/app/components/CaseStudiesSection";
import GallerySection from "@/app/components/events/GallerySection";
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
import { criticalManufacturingFaqs, priorityServiceOffers } from "@/app/data/seoContent";

export const metadata = buildMetadata({
  title: "Critical Manufacturing MES Partner | Athenatec",
  description:
    "Athenatec is a Premier Critical Manufacturing partner with a dedicated CoE. We implement CM MES for semiconductor and medical device industries.",
  path: "/critical-manufacturing",
  image: "/assets/images/CMC.webp",
  keywords: [
    "Critical Manufacturing MES implementation",
    "CM MES implementation partner",
    "Critical Manufacturing integration",
    "semiconductor MES implementation",
    "medical device MES implementation",
  ],
});
const caseStudies = [
  {
    id: 1,
    title:
      "Equipment Integration with CM MES for a global leader in Semiconductors.",
    tag: "Case Study #1",
    description:
      "This project aims to provide solution to implement equipment & processes integration globally through robust backend systems. This phase is part of the CM MES implementation that is spread across various manufacturing locations.",
    image: "/assets/images/2506-1707.webp",
    link: "/equipment-integration-cm-mes",
  },
  {
    id: 2,
    title:
      "Integration Between SAP and CM MES across five manufacturing factories worldwide.",
    tag: "Case Study #2",
    description:
      "Athena was involved in implementing enterprise integration with real-time synchronization of data between SAP and CM MES across five global manufacturing factories.",
    image:
      "/assets/images/sap-system-software-automation-concept-virtual-screen-data-center-scaled.webp",
    link: "/sap-cm-mes-integration",
  },
  {
    id: 3,
    title:
      "CM MES product implementation & customization for a state-of-the-art Solar Panel Manufacturer in North America.",
    tag: "Case Study #3",
    description:
      "Currently, the client has implemented a home-grown MES solution for their main factory. Athena’s scope is to conduct full CM MES implementation and customization to enhance operational efficiency.",
    image:
      "/assets/images/CaseStudy-03.webp",
    link: "/cm-mes-solar-panel-implementation",
  },
  {
    id: 4,
    title:
      "CM MES product implementation & customization for a Semiconductor manufacturer.",
    tag: "Case Study #4",
    description:
      "The client offers a unique product and technology portfolio for sensing, illumination and visualization, from prime-quality light emitters and optical components to micro-modules and light sensors.",
    image:
      "/assets/images/CaseStudy-01.webp",
    link: "/cm-mes-semiconductor-implementation",
  },
  {
    id: 5,
    title:
      "CM MES product upgrade & customization for state-of-the-art Sensor Fab Manufacturing in North America.",
    tag: "Case Study #5",
    description:
      "Currently, the client has implemented a CM MES solution for one of its large factories. Athena’s role includes upgrading and customizing the solution to support advanced manufacturing processes.",
    image: "/assets/images/image-1.webp",
    link: "/cm-mes-sensor-fab-upgrade",
  },
];
const galleryItems = [
  {
    title:
      "MES Industry Summit 2025 MES & Industry 4.0 International Summit 2025",
    image: "/assets/images/shared-image.webp",
    slug: "mes-industry-4-0-international-summit-2025",
  },
  {
    title: "Hannover Messe 2025",
    image: "/assets/images/content.webp",
    slug: "hannover-messe-2025",
  },
  {
    title: "Industry 4.0 International Summit 2023",
    image: "/assets/images/Media-18.webp",
    slug: "industry-4-0-international-summit-2023",
  },
];
type ListItemProps = {
  icon: string;
  text: string;
};

const ListItem = ({ icon, text }: ListItemProps) => {
  return (
    <li className="icon-item">
      <Image src={icon} alt={text} width={33} height={33} />
      <span>{text}</span>
    </li>
  );
};

export default function CriticalManufacturingPage() {
  const seoSchema = [
    buildWebPageSchema({
      name: "Critical Manufacturing MES Implementation",
      description:
        "Critical Manufacturing MES implementation, upgrades, customization, integration, and support for complex manufacturers.",
      path: "/critical-manufacturing",
      primaryImage: "/assets/images/CMC.webp",
    }),
    buildServiceSchema({
      name: "Critical Manufacturing MES Implementation",
      description:
        "Athenatec implements, upgrades, customizes, integrates, and supports Critical Manufacturing MES with a dedicated Center of Excellence.",
      path: "/critical-manufacturing",
      serviceType: "Critical Manufacturing MES Implementation",
      keywords: [
        "Critical Manufacturing MES implementation",
        "CM MES implementation",
        "Critical Manufacturing integration",
        "Critical Manufacturing upgrade",
      ],
      areaServed: ["United States", "North America", "APAC", "EMEA"],
      offers: priorityServiceOffers,
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "MES Implementation Services", path: "/mes-implementation-services" },
      { name: "Critical Manufacturing MES Implementation", path: "/critical-manufacturing" },
    ]),
    buildFaqSchema(criticalManufacturingFaqs, "/critical-manufacturing"),
  ];

  return (
    <>
      <StructuredData data={seoSchema} id="critical-manufacturing-seo-schema" />
      <HeroSection
        title="Critical Manufacturing MES Implementation"
        description="Implementation, upgrades, customization, and enterprise integrations for Critical Manufacturing MES across semiconductor, medical device, electronics, and industrial manufacturing."
        image="/assets/images/CMC.webp"
        align="center"
        buttonText="Discuss a Critical Manufacturing MES project"
        buttonLink="/contact"
      />

      <section className="partner-section">
        <div className="container">
          <h2 className="section-title">Critical Manufacturing Premier Implementation Partner</h2>

          <div className="partner-badge">
            <Image
              src="/assets/images/CMC2.webp"
              alt="Critical Manufacturing Premier Partner"
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>
      <section className="awards-section">
        <div className="container">
          <h2 className="section-title">Awards</h2>

          <div className="awards-grid">
            <div className="award-card">
              <Image
                src="/assets/images/image-3.webp"
                alt="Marketing Award 2025"
                width={500}
                height={350}
              />
              <p>Partner of Marketing award from CM for the year 2025</p>
            </div>

            <div className="award-card">
              <Image
                src="/assets/images/Cm-02.webp"
                alt="Knowledge Award 2023"
                width={500}
                height={350}
              />
              <p>Partner of Knowledge award from CM for the year 2023</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cmf-section">
        <div className="container cmf-grid">
          <div className="cmf-content">
            <h2>Critical Manufacturing MES Platform Overview</h2>
            <p>
              Critical Manufacturing is dedicated to empowering manufacturers of
              complex, high tech discrete products with a manufacturing
              execution and intelligence system to achieve their goals, with
              special focus on the semiconductor, electronics, repetitive
              flow/batch and medical device industries. Critical Manufacturing’s
              operations are geographically diverse across EMEA, North America
              and Asia/Pacific (APAC). The Critical Manufacturing MES has strong
              data management, analytics and extended MES capability, supported
              by a sophisticated platform that manages both IoT and
              transactional MES data in the same data model. Inherently designed
              to accommodate the Industrial Internet of Things (IIoT), mobile
              devices, automation and sensors, etc. With revolutionary
              technologies such as an IoT data platform, factory automation,
              augmented reality, and a factory digital twin, focus on leveraging
              the data. Critical Manufacturing is continuing to add global
              system integrators (SIs) to further expand its market presence.
              Its product roadmap, leveraging its unique data management
              capabilities, continues its expansion into extended MES, with
              features including new product introduction (NPI), material
              logistics and factory automation. It is focusing on simplifying
              deployments and upgrades in multiple environments, including
              Microsoft Azure. Critical Manufacturing MES is truly an Industry
              4.0 hub that provides manufacturers in demanding discrete
              industries a platform for digital transformation success.
            </p>
          </div>

          <div className="cmf-image">
            <Image
              src="/assets/images/figure1.webp"
              alt="CMF Overview Chart"
              width={600}
              height={450}
            />
          </div>
        </div>
      </section>
      <section className="templatization-section">
        <div className="container">
           <h2 className="section-title">Critical Manufacturing MES Templatization Solution</h2>

           <div className="templatization-diagram">
            <Image
              src="/assets/images/16-02-1.webp"
              alt="Templatization Solution"
              width={600}
              height={600}
            />
          </div>

           <h2 className="section-title benefits-title">
            Critical Manufacturing MES Templatization Benefits
          </h2>

           <div className="benefits-diagram">
            <Image
              src="/assets/images/16-1.webp"
              alt="Templatization Benefits"
              width={700}
              height={700}
            />
          </div>

           <h2 className="section-title modules-title">
            Critical Manufacturing MES Modules and OneFab Solution
          </h2>

          <p className="modules-subtitle">
            Critical Manufacturing MES is the most comprehensive, modular MES
            solution for complex, global manufacturers on the path to digital
            transformation
          </p>
          <div className="modules-diagram">
            <Image
              src="/assets/images/CMS-Module1.webp"
              alt="Templatization Benefits"
              width={1000}
              height={900}
            />
          </div>
        </div>
      </section>
      <section className="partner-profile-section">
        <div className="container">
          <h2 className="section-title">Critical Manufacturing Partner Profile</h2>

          <div className="profile-grid">
             <div className="profile-card">
              <div className="card-header">
                <Image
                  src="/assets/icons/manufacturer.svg"
                  alt="Industries"
                  width={60}
                  height={60}
                />
                <h3>Industries</h3>
              </div>

              <ul className="icon-list">
                <ListItem
                  icon="/assets/icons/Partner-Profile/Semiconductor.svg"
                  text="Semiconductor"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Electronics.svg"
                  text="Electronics"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Medical-Device.svg"
                  text="Medical Device"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/IEM.svg"
                  text="Industrial Equipment Manufacturing"
                />
              </ul>
            </div>

             <div className="profile-card">
              <div className="card-header">
                <Image
                  src="/assets/icons/cloud-computing.svg"
                  alt="Solution Platform"
                  width={60}
                  height={60}
                />
                <h3>Solution Platform</h3>
              </div>

              <ul className="icon-list">
                <ListItem
                  icon="/assets/icons/Partner-Profile/OneFab.svg"
                  text="OneFab"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/CIOT.svg"
                  text="Connect IoT"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Fab-live.svg"
                  text="Fab Live"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/AR.svg"
                  text="Augmented Reality"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/SPC.svg"
                  text="SPC"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Maintenance-Management.svg"
                  text="Maintenance Management"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Labor-Management.svg"
                  text="Labor Management"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Product-Experience.svg"
                  text="Product Experience: v7.2, 8.x, 9.0 & 10.x"
                />
              </ul>
            </div>

             <div className="profile-card">
              <div className="card-header">
                <Image
                  src="/assets/icons/practice.webp"
                  alt="Athena Practice"
                  width={60}
                  height={60}
                />
                <h3>Athena Practice</h3>
              </div>

              <ul className="icon-list">
                <ListItem
                  icon="/assets/icons/Partner-Profile/Certified-Resources.svg"
                  text="Certified Resources"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Solution-Architect.svg"
                  text="Solution Architect"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/PPM.svg"
                  text="Project / Program Managers"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Business-Analysts.svg"
                  text="Business Analysts"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Application-Developer.svg"
                  text="Application Developer"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Integrated-Engineers.svg"
                  text="Integrated Engineers"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/Reporting-Analyst.svg"
                  text="Reporting Analyst"
                />
              </ul>
            </div>

             <div className="profile-card">
              <div className="card-header">
                <Image
                  src="/assets/icons/job.svg"
                  alt="Customer Locations"
                  width={60}
                  height={60}
                />
                <h3>Customer Locations</h3>
              </div>

              <ul className="icon-list">
                <ListItem
                  icon="/assets/icons/Partner-Profile/Americas.svg"
                  text="Americas"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/APAC.svg"
                  text="APAC"
                />
                <ListItem
                  icon="/assets/icons/Partner-Profile/EMEA.svg"
                  text="EMEA"
                />
              </ul>
            </div>
          </div>

           <div className="capability-section">
            <div className="capability-content">
              <h2>Critical Manufacturing MES Capability and Center of Excellence</h2>
              <p>
                Athena is a premier services partner supporting various client
                projects working closely with CM services group. We have
                established a dedicated Athena – Critical Manufacturing Center
                of Excellence (CoE) based in Chennai, India.
                <br />
                <br />
                Athena has a structured internal training program on MES, CM
                certification programs, and strong execution experience across
                v7.2, 8.x, 9.0 & 10.x implementations, upgrades, customization,
                and post go-live support.
              </p>
            </div>

            <div className="capability-image">
              <Image
                src="/assets/images/man-hard-hat-is-holding-tablet-front-blue-white-background-scaled.webp"
                alt="CM MES Capability"
                width={600}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <CaseStudiesSection title="Case Studies" data={caseStudies} bg="light" />
      <GallerySection title="Event Gallery" data={galleryItems} bg="light" />
      {/* <FaqSection
        title="Critical Manufacturing MES Implementation FAQs"
        intro="Answers for manufacturers evaluating Critical Manufacturing MES deployment, customization, integration, and support."
        faqs={criticalManufacturingFaqs}
      /> */}
      <InternalLinkCluster
        links={manufacturingSeoLinks}
        title="Connect Critical Manufacturing MES with the broader digital thread"
        description="Use these related service pages and resources to plan ERP, PLM, Opcenter, accelerators, and case study research around your MES roadmap."
      />
      <CTASection
        title={
          <>
            Let’s talk
            <br />
            Got an enquiry?
          </>
        }
        description="Engage Athenatec for Critical Manufacturing MES implementation, integration, upgrade, customization, and production support."
        buttonText="Request Critical Manufacturing MES consulting"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </>
  );
}
