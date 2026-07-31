import Image from "next/image";
import "./siemens.scss";
import ScrollReveal from "@/app/components/ScrollReveal";
import CTASection from "@/app/components/CTASection";
import HeroSection from "@/app/components/HeroSection";
import CaseStudiesSection from "@/app/components/CaseStudiesSection";
import GallerySection from "@/app/components/events/GallerySection";
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
import { priorityServiceOffers, siemensOpcenterFaqs } from "@/app/data/seoContent";

export const metadata = buildMetadata({
  title: "Siemens Opcenter MES Implementation Partner | Athenatec",
  description:
    "Athenatec, a Siemens Alliance Partner, implements and upgrades Opcenter MES for semiconductor, medical device, and electronics manufacturers worldwide.",
  path: "/siemens-opcenter-mes",
  image: "/assets/images/siemens.webp",
  keywords: [
    "Siemens Opcenter MES implementation services",
    "Opcenter MES partner",
    "Camstar upgrade services",
    "semiconductor MES implementation",
    "medical device MES implementation",
  ],
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

const services = [
  {
    title: "Siemens Opcenter Execution – Semiconductor",
    slug: "semiconductor",
    desc: `Opcenter Execution Semiconductor (formerly known as “Camstar Semiconductor Suite”) replaces legacy manufacturing systems that haven’t kept pace with the demanding needs of semiconductor manufacturing. `,
    video: "/assets/videos/semiconductor.mp4",
  },
  {
    title: "Siemens Opcenter Execution – Electronics",
    slug: "electronics",
    desc: `Opcenter Execution Electronics (formerly known as “Camstar Electronics Suite”) is a comprehensive manufacturing solution for the electronics industry. `,
    video: "/assets/videos/electronics.mp4",
  },
  {
    title: "Siemens Opcenter Execution – Medical Devices",
    slug: "medical-devices",
    desc: `Siemens Opcenter MES for Medical Devices (formerly known as Camstar) is a unified and holistic application to drive digital initiatives faster and further to gain the benefits from Industry 4.0.`,
    video: "/assets/videos/medical-devices.mp4",
  },
  {
    title: "Siemens Opcenter Execution – Discrete",
    slug: "discrete",
    desc: `Siemens Opcenter Core (formerly known as Camstar Enterprise Platform) is the global MES platform for Production and Quality Management.`,
    video: "/assets/videos/discrete.mp4",
  },
  {
    title: "Siemens APS – Advance Planning & Scheduling",
    slug: "advance-planning-scheduling",
    desc: `In Manufacturing, product variability, available production resources and customer order changes directly affect the time sensitive work effort of optimizing Jobs on the Shop Floor.`,
    video: "/assets/videos/aps.mp4",
  },
  {
    title: "Siemens Mendix",
    slug: "siemens-mendix",
    desc: `Low Code and Analytics features of Mendix helps to design KPIs and Dashboards for better visibility of the Data.`,
    video: "/assets/videos/mendix.mp4",
  },
  {
    title: "Siemens Opcenter Execution – LED / Battery Manufacturing",
    slug: "led-battery-manufacturing",
    desc: `Athena excels in addressing complex manufacturing challenges in LED and Battery manufacturing with rapid implementation, delivering a robust, integrated, and scalable data-centric enterprise.`,
    video: "/assets/videos/electronics.mp4",
  },
  {
    title: "Siemens Opcenter Execution – Solar",
    slug: "solar",
    desc: `Solar manufacturing's complexities, such as Applied Materials and SPC, demand advanced analytics and continuous experimentation.`,
    video: "/assets/videos/electronics.mp4",
  },
];
const testimonials = [
  {
    company: "PsiQuantum",
    name: "Alameda-Basora M",
    role: "Manager, Operations Data Software - PsiQuantum",
    image: "/assets/Clients/PSi-Quantum.webp",
    text: `We partnered with Athenatec to develop and scale our Manufacturing Execution System (MES) as our operations rapidly evolved from tracking individual wafers and decoupled processes to managing multiple production lines, diverse subassembly SKUs, and complex downstream workflows.Athenatec demonstrated a strong understanding of our requirements and consistently delivered high-quality solutions on time. Their ability to quickly develop API services enabled seamless integration between our engineering systems and their manufacturing platform, significantly improving operational efficiency while supporting our custom requirements.What stands out most is their team’s experience and adaptability. They are reliable, responsive, and collaborative, helping us navigate challenges and effectively interface with partners like Siemens to resolve complex issues.Athenatec has been a critical partner in scaling our manufacturing capabilities. I would strongly recommend them to any organization configuring, implementing, or optimizing an MES system.`,
  },
  {
    company: "InnovaFlex Foundry",
    name: "Jon Baker",
    role: "IT Manager – InnovaFlex Foundry",
    image: "/assets/Clients/InnovaFlex_Foundry.webp",
    text: `Athena provides expertise in MES and beyond.  They have proven extremely easy to work with, offering project management, SW development, integration, support and expertise ensuring projects are completed successfully.  I strongly recommend Athena for MES implementations or Opcenter upgrades.`,
  },
  {
    company: "Nevro",
    name: "Alonso Moya",
    role: "Site Director, Nevro",
    image: "/assets/Clients/Nevro.webp",
    text: `Having a commercial partner is vital for an exemplary, seamless implementation, and throughout the development and setup of MES in Nevro Costa Rica, Athena has been a critical piece. With high support for our needs, Athena was always proactive in looking for critical and strategic solutions to the Business’s needs and taking care of the integrity and structure of the systems. It was a satisfactory experience to our liking due to all the knowledge transmitted during this journey of implementing MES in our plant.
An excellent partner for us.`,
  },
  {
    company: "Dexcom",
    name: "Wei Wu",
    role: "Senior Manager, IT",
    image: "/assets/Clients/Dexcom.webp",
    text: `“I strongly recommend Athena based on their exceptional performance and successful completion of our recent Camstar v8.9 launch. Their dedication, expertise, and professionalism have greatly contributed to the success of our project and have exceeded our expectations.
Throughout the project, Athena demonstrated an in-depth understanding of our unique requirements and objectives. They showcased their comprehensive knowledge of manufacturing processes, industry best practices, and Camstar latest version 8.9 solutions. Their ability to translate our complex needs into an efficient and tailored manufacturing execution system was truly remarkable. We have experienced improved productivity, streamlined workflows, enhanced quality control, and real-time visibility into our manufacturing processes. Their commitment to transparency and open communication fostered a strong working relationship, allowing us to have full confidence in their abilities.
Moreover, the post-implementation hypercare support provided by Athena has been exceptional. They have been responsive to our ongoing needs, promptly addressing any questions or concerns that arise. Their dedication to customer satisfaction and their commitment to ensuring the software’s continued optimal performance are highly commendable`,
  },
  {
    company: "Marki Microwave",
    name: "Marki Microwave",
    role: "",
    image: "/assets/Clients/Marki.webp",
    text: `We reviewed several MES suppliers and selected Siemens Opscenter MES / APS as the best fit for Marki Microwave. Selecting the platform is part of the journey but a successful implementation requires an experienced system integrator.
We choose Athena Technologies as our implementation partner as they had several successful implementations in the electronics / medical devices customers. The company resourced our project with an experienced project manager and technical team who were flexible and collaborated well with our small internal team to ensure we get the solution that fits the needs of our manufacturing operations. We used a phase and sprint approach to complete our implementation in a 9-month time frame.
We will continue to work together with Athena to carry out continuous process improvement and harmonization to deliver greater efficiency and quality to meet our customers’ demands today and well into the more digital future.`,
  },
  {
    company: "Viavi",
    name: "Viavi",
    role: "",
    image: "/assets/Clients/VLAVI.webp",
    text: `Through Athena’s exhaustive efforts and deep domain expertise, we were able to implement a ‘Viavi Aligned Solution’ of Siemens Opcenter 8.x that met our complex MES System requirements. This was done via streamlined manufacturing processes, user friendly UI/ UX, seamless integration with our factory equipment / metrology and a single source for factory insights. Athena utilized Industry 4.0 foundations and architected a cookie-cutter approach that is ready for all our global factories.`,
  },
  {
    company: "MiaSolé Hi-Tech",
    name: "Siva Papaiya",
    role: "Senior Director, MiaSolé Hi-Tech",
    image: "/assets/Clients/Miasole.webp",
    text: `Athena team has unrivalled proficiency in manufacturing and their commitment towards successful execution has been a very positive experience.`,
  },

  {
    company: "Emcore",
    name: "Jamie Lohrungruang",
    role: "VP of Information Technology",
    image: "/assets/Clients/Emcore.webp",

    text: `We were very fortunate to have found Athena as they helped us turnaround our Opcenter Semi 8.9 MES project after our initial attempt working with a different Solution Integrator was unsuccessful. Their expertise of the OpCenter product along with their experience in semiconductor allowed them to help us completely change the design of the solution to better leverage best practices and meet our business needs. We cannot be happier working with Athena, and can see that they went above and beyond what was documented to make sure we are happy with the solution. They really came through for us. You will not be disappointed working with them.`,
  },

  {
    company: "Conformis",
    name: "Conformis",
    role: "",
    image: "/assets/Clients/Conformis.webp",
    text: `A few years ago, Conformis was looking for a boutique Camstar consulting SI. Athena was selected and has continuously delivered on all projects, There was no red tape. as with larger organizations, and while still receiving all the proper documentation and validation.
“I am happy to consider Athena a Conformis partner”.`,
  },
  {
    company: "Neophotonics",
    name: "Aim Khan",
    role: "CIO / VP Neophotonics",
    image: "/assets/Clients/Neophotonics.webp",
    text: `Athena consistently exceeds our business targets, overcomes challenges and goes the extra mile.~ Great Company, Excellent Team and Partner.`,
  },
];

const logos = [
  "/assets/Clients/Conformis.webp",
  "/assets/Clients/Dexcom.webp",
  "/assets/Clients/Edtech.webp",
  "/assets/Clients/Emcore.webp",
  "/assets/Clients/Enovix.webp",
  "/assets/Clients/Finisar.webp",
  "/assets/Clients/InnovaFlex_Foundry.webp",
  "/assets/Clients/Lumentum.webp",
  "/assets/Clients/Marki.webp",
  "/assets/Clients/Miasole.webp",
  "/assets/Clients/mission-solar.webp",
  "/assets/Clients/Neophotonics.webp",
  "/assets/Clients/Nevro.webp",
  "/assets/Clients/Penumbra.webp",
  "/assets/Clients/PSi-Quantum.webp",
  "/assets/Clients/View-Dynamic-Glass.webp",
  "/assets/Clients/Raxium.webp",
  "/assets/Clients/VLAVI.webp",
];
const caseStudies = [
  {
    id: 1,
    title: "Surgical Plan Approval",
    tag: "Case Study #1",
    description:
      "Our Medical device customer had an external system to get approval for Surgical Plans from the surgeon which had to be integrated to Opcenter in several Operations.",
    image: "/assets/images/freepik-export-202412191322302WRy-1920x1280.webp",
    link: "/surgical-plan-approval",
  },
  {
    id: 2,
    title: "Factory Separation",
    tag: "Case Study #2",
    description:
      "Customer has Multiple Factories where they manufacture different devices. Required to Display Modeling and WIP Data based on the Employee Role and Factory​",
    image: "/assets/images/FS.webp",
    link: "/factory-separation",
  },
  {
    id: 3,
    title: "Manage Shipper Case",
    tag: "Case Study #3",
    description:
      "Customer had a requirement to implement Shipper case association to the Container during Packaging Process.​",
    image: "/assets/images/freepik-export-20241219133957E1bW-1920x1280.webp",
    link: "/manage-shipper-case",
  },
  {
    id: 4,
    title: "Optimize Opcenter Execution Electronics Production Client",
    tag: "Case Study #4",
    description:
      "Optimize Opcenter Execution Electronics Production Client which is a main UI for Operator in Electronics Suite was Optimized to cover maximum WIP transactions​.​.",
    image: "/assets/images/close-up-computer-keyboard-1920x1280.webp",
    link: "/optimize-production-client-ui",
  },
  {
    id: 5,
    title: "Optimize Opcenter Execution Semiconductor Suite WIP Main",
    tag: "Case Study #5",
    description:
      "Optimize Opcenter Execution Semiconductor Suite WIP Main page which is Key UI for all the WIP transactions in Semi Suite was optimized to reduce clicks and scrolls and enhanced color codes for better user experience and quick navigations​.",
    image:
      "/assets/images/WhatsApp-Image-2024-07-17-at-10.11.32-e1734616151384.webp",
    link: "/wip-main-optimization",
  },
  {
    id: 6,
    title: "Data Correction",
    tag: "Case Study #6",
    description:
      "Customer had a requirement to correct the collected data and also record Audit Trail for the same.",
    image:
      "/assets/images/businessman-compliance-rules-law-regulation-policy-virtual-screen-documents-with-checkbox-lists-1920x1277.webp",
    link: "/data-correction",
  },
];
const galleryItems = [
  {
    title: "Realize Live Americas 2025",
    image: "/assets/images/Media-9-768x576.webp",
    slug: "realize-live-americas-2025",
  },
  {
    title: "Americas Partner Conference 2025",
    image: "/assets/images/Media-2-768x576.webp",
    slug: "americas-partner-conference-2025",
  },
  {
    title: "Realize Live Americas 2024",
    image: "/assets/images/Media-26-768x576.webp",
    slug: "realize-live-americas-2024",
  },
  {
    title: "Realize Live Europe 2024",
    image: "/assets/images/Media-17-768x1024.webp",
    slug: "realize-live-europe-2024",
  },
  {
    title: "Realize Live Americas 2023",
    image: "/assets/images/shared-image-8-1-768x576.webp",
    slug: "realize-live-americas-2023",
  },
];
export default function SiemensOpcenter() {
  const seoSchema = [
    buildWebPageSchema({
      name: "Siemens Opcenter MES Implementation Services",
      description:
        "Siemens Opcenter MES implementation, upgrades, integration, testing, and support for complex manufacturers.",
      path: "/siemens-opcenter-mes",
      primaryImage: "/assets/images/siemens.webp",
    }),
    buildServiceSchema({
      name: "Siemens Opcenter MES Implementation Services",
      description:
        "Athenatec implements, upgrades, integrates, validates, and supports Siemens Opcenter MES for semiconductor, electronics, medical device, and discrete manufacturers.",
      path: "/siemens-opcenter-mes",
      serviceType: "Siemens Opcenter MES Implementation",
      keywords: [
        "Siemens Opcenter MES implementation services",
        "Camstar implementation partner",
        "Opcenter MES upgrade",
        "semiconductor MES implementation",
        "medical device MES implementation",
      ],
      areaServed: ["United States", "North America", "APAC", "EMEA"],
      offers: priorityServiceOffers,
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "MES Implementation Services", path: "/mes-implementation-services" },
      { name: "Siemens Opcenter MES Implementation Services", path: "/siemens-opcenter-mes" },
    ]),
    buildFaqSchema(siemensOpcenterFaqs, "/siemens-opcenter-mes"),
  ];

  return (
    <main>
      <StructuredData data={seoSchema} id="siemens-opcenter-seo-schema" />

      <HeroSection
        title="Siemens Opcenter MES Implementation Services"
        description="Implementation, upgrades, integrations, testing, training, and hypercare for Siemens Opcenter MES in complex manufacturing environments."
        image="/assets/images/siemens.webp"
        buttonText="Discuss a Siemens Opcenter MES project"
        buttonLink="/contact"
      />

      <section className="soc-description">
        <div className="soc-description__card">
          <p>
            Siemens Opcenter (formally known as Siemens Camstar) is a
            comprehensive Manufacturing Solution enabling a complete
            digitalization of manufacturing operations.   All Opcenter MES
            Solutions provide end-to-end control and visibility into the
            production manufacturing process. As a Siemens Alliance Partner,
            Athena leverages Industry specific Opcenter solutions for;
            Semiconductor, Electronics, Medical Devices and Discrete
            Manufacturing.   A typical MES Implementation will replace multiple
            disconnected point solutions with one, fully integrated and
            centralized MES factory system. Ultimately, MES Opcenter seamlessly
            operates across multiple functional areas and roles with built-in
            integration capabilities with all factory equipment types, as well
            as both ancillary factory and business systems.
          </p>
        </div>
      </section>
      <section className="soc-services">
        <div className="soc-services__container">
          <div className="soc-services__grid">
            {services.map((service, index) => (
              <div className="soc-card" key={index}>
                <div className="soc-card__media">
                  <video
                    src={service.video}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                </div>

                <div className="soc-card__content">
                  <h3>
                    <Link href={`/siemens-opcenter-mes/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h3>

                  <p>{service.desc}</p>

                  <Link
                    href={`/siemens-opcenter-mes/${service.slug}`}
                    className="learn-more"
                  >
                    Explore {service.title} implementation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="soc-expertise">
        <div className="soc-expertise__container">
          <div className="soc-expertise__content">
            <h2>Siemens Opcenter MES Implementation Expertise</h2>

            <p>
              Since 2011, Athena’s expertise in Camstar/Opcenter has expanded
              across diverse industries such as Semi Conductors, Medical
              Devices, Electronics, and Clean energy. Our experience includes
              working with product versions ranging from v3.x to v8.9, and
              versions 2304, 2310, and 2404 of Opcenter, MIO, and APS.
            </p>

            <p>
              Our team possesses specialized skills in Designer, Portal Studio,
              APS, and Mendix.
            </p>
          </div>

          <div className="soc-expertise__timeline">
            <Image
              src="/assets/images/Seimens-Roadmap.webp"
              alt="Opcenter Timeline"
              width={900}
              height={500}
              sizes="(max-width: 768px) 100vw, 900px"
              className="w-full h-auto"
              quality={80}
            />
          </div>
        </div>
      </section>
      <section className="soc-team">
        <div className="soc-team__container">
          <h2 className="soc-team__title">
            Siemens Opcenter MES Delivery Team and Center of Excellence
          </h2>

          <div className="soc-team__image">
            <Image
              src="/assets/images/siemens-img.webp"
              alt="Athena Opcenter Team"
              width={700}
              height={470}
              sizes="(max-width: 768px) 100vw, 700px"
              className="w-full h-auto object-cover"
              quality={75}
            />
          </div>
        </div>
      </section>

      <section className="soc-factory">
        <div className="soc-factory__container">
          <h2 className="soc-factory__title">
            Siemens Opcenter Factory System Integration
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
            <div className="relative mt-8 aspect-[5/3] w-full max-w-[1000px] m-auto">
              <Image
                src="/assets/images/02-8.webp"
                alt="Factory System Integration Diagram"
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <PracticeSection
        title="Enterprise Systems Practice MES and Factory Systems"
        cards={practiceData}
      />
      <section className="siemens-analytics">
        <div className="container">
          <div className="analytics-diagram">
            <Image
              src="/assets/images/07-4.webp"
              alt="Manufacturing Process Flow"
              width={1200}
              height={600}
              priority
            />
          </div>

          <div className="analytics-content">
            <h2 className="analytics-title">Analytics</h2>

            <p>
              Industry 4.0 Smart Factory Analytics add enormous value to the
              Manufacturing Enterprise versus historical reporting platforms.
              Smart Factory Analytics collect data from factory digital assets
              and systems enabling production visibility in real-time,
              trend-based, descriptive and predictive formats.
            </p>

            <p>
              One of the key benefits is driving production toward KPI targets
              and enabling accurate root cause analysis. Organizations strive
              for yield, equipment utilization, and quality performance.
            </p>

            <p>
              Smart Factory Analytics provide daily cycles of learning with
              rapid issue identification to support faster remediation.
            </p>
          </div>

          <h2 className="analytics-title">Smart Factory Analytics</h2>

          <div className="analytics-block">
            <Image
              src="/assets/images/10-1.webp"
              alt="Smart Factory Analytics"
              width={1400}
              height={700}
            />
          </div>

          <div className="analytics-block dmaic-section">
            <div className="relative aspect-[12/5] w-full">
              <Image
                src="/assets/images/04-6.webp"
                alt="DMAIC Process"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="clients-section">
        <div className="container">
          <div className="clients-header">
            <h2 className="clients-title">Siemens Opcenter MES Customer Proof</h2>
          </div>
          <div className="logos-grid">
            {logos.map((logo, index) => (
              <div key={index} className="logo-item">
                <div className="logo-item__media">
                  <Image
                    src={logo}
                    alt="client logo"
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="siemens-testimonial-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="testimonial-title">Manufacturing Client Testimonials</h2>
          </ScrollReveal>

          <div className="testimonial-grid">
            {testimonials.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="testimonial-card">
                  <div className="card-header">
                    <div className="company-info">
                      <h4>{item.company}</h4>
                    </div>

                    {item.image && (
                      <div className="testimonial-logo-frame">
                        <Image
                          src={item.image}
                          alt={item.company}
                          fill
                          sizes="120px"
                          className="object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  <div className="card-body">
                    <p>{item.text}</p>
                  </div>

                  <div className="card-footer">
                    <strong>{item.name || ""}</strong>
                    {item.role && <span>{item.role}</span>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CaseStudiesSection title="Case Studies" data={caseStudies} bg="light" />
      <GallerySection title="Event Gallery" data={galleryItems} bg="light" />
      {/* <FaqSection
        title="Siemens Opcenter MES Implementation FAQs"
        intro="Common questions from manufacturers evaluating Opcenter implementation, upgrades, integrations, and production support."
        faqs={siemensOpcenterFaqs}
      /> */}
      <InternalLinkCluster
        links={manufacturingSeoLinks}
        title="Plan the connected factory around Siemens Opcenter"
        description="Compare related MES, ERP, PLM, accelerators, case studies, and Industry 4.0 resources that support a Siemens Opcenter roadmap."
      />
      <CTASection
        title={
          <>
            Let’s talk <br />
            Got an enquiry?
          </>
        }
        description="Talk with Athenatec about Siemens Opcenter MES implementation, upgrades, enterprise integrations, and production support."
        buttonText="Request Siemens Opcenter MES consulting"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </main>
  );
}
