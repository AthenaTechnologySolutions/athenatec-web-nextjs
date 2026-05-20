import type { Metadata } from "next";
import ServiceSeoTemplate, {
  type ServiceSeoTemplateData,
} from "@/app/components/seo/ServiceSeoTemplate";
import StructuredData from "@/app/components/seo/StructuredData";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo";
import {
  mesImplementationFaqs,
  priorityServiceOffers,
} from "@/app/data/seoContent";

const PAGE_PATH = "/mes-implementation-services";

export const metadata: Metadata = buildMetadata({
  title: "MES Implementation Services & Consulting",
  description:
    "MES implementation and consulting for manufacturing execution system planning, Opcenter, Critical Manufacturing, ERP, PLM, and factory integration.",
  path: PAGE_PATH,
  image: "/assets/images/Mes-solution.webp",
  keywords: [
    "mes implementation",
    "manufacturing execution system implementation",
    "MES consulting services",
    "MES implementation services",
    "MES integration services",
    "Siemens Opcenter implementation",
    "Critical Manufacturing MES implementation",
  ],
});

const pageData: ServiceSeoTemplateData = {
  hero: {
    eyebrow: "Manufacturing execution system implementation",
    title: "MES Implementation Services for Manufacturers",
    description:
      "Athenatec helps manufacturers plan, implement, integrate, validate, and support MES programs across Siemens Opcenter, Critical Manufacturing, Oracle Cloud ERP, Oracle Agile PLM, equipment systems, quality workflows, and Industry 4.0 architectures.",
    image: "/assets/images/Mes-solution.webp",
    primaryCta: {
      label: "Talk to an MES implementation consultant",
      href: "/contact",
    },
    secondaryCta: {
      label: "Explore Siemens Opcenter services",
      href: "/siemens-opcenter-mes",
    },
  },
  intro: {
    heading:
      "MES implementation is the control layer between enterprise planning and real factory execution",
    body: [
      "Manufacturing execution system implementation is not simply a software deployment. It is the work of turning production strategy, quality expectations, product definitions, equipment behavior, operator workflows, and enterprise data into a controlled digital operating model. A strong MES implementation connects what the business plans in ERP and PLM with what actually happens on the production floor. It gives operators, supervisors, engineers, quality teams, planners, and executives a shared system of record for production execution.",
      "For manufacturers in semiconductor, electronics, medical device, discrete manufacturing, solar, clean energy, and industrial equipment, MES has become the foundation for traceability, compliance, throughput improvement, yield learning, and operational scale. The system must model production routes, collect manufacturing data, manage WIP, enforce quality checks, integrate with tools and test equipment, synchronize with ERP and PLM, and expose reliable analytics. When these elements are designed in isolation, the implementation becomes fragile. When they are designed as one manufacturing architecture, MES becomes a true Industry 4.0 platform.",
      "Athenatec provides MES consulting services for companies that need a practical partner through every stage of the program. We help teams define the right scope, choose and configure the right MES platform, build integrations, migrate and validate data, automate testing, train users, support go-live, and stabilize the system after launch. Our implementation experience spans Siemens Opcenter, Critical Manufacturing, Oracle Cloud ERP, Oracle Agile PLM, shop-floor equipment, quality systems, analytics, and custom applications.",
      "The best MES programs begin with manufacturing clarity. Before workflows are configured, the team needs to understand how products move, how exceptions are handled, how quality decisions are made, how operators interact with equipment, how engineering changes reach production, how data is reviewed, and how management will measure success. Athenatec brings business analysts, solution architects, integration engineers, application developers, reporting specialists, and project leaders together so each decision supports the full production lifecycle.",
      "Many manufacturers come to MES after years of paper travelers, spreadsheets, point solutions, or custom systems that worked well at one stage of growth but became difficult to scale. Others already have MES but need a version upgrade, a global template, a new plant rollout, a regulated workflow, stronger equipment integration, or a more reliable way to connect MES with ERP and PLM. In each case, the implementation must balance speed, control, and long-term maintainability. Athenatec's role is to help manufacturers make that balance explicit and executable.",
    ],
  },
  services: [
    {
      title: "MES assessment and implementation blueprint",
      description:
        "We map current manufacturing processes, identify gaps, define future-state workflows, document integration needs, and create a practical implementation roadmap that aligns operations, IT, quality, engineering, and executive stakeholders.",
    },
    {
      title: "Siemens Opcenter MES implementation",
      description:
        "Athenatec implements and upgrades Siemens Opcenter MES for semiconductor, electronics, medical device, and discrete manufacturing. Our services include configuration, customization, MIO integrations, APS alignment, validation support, and hypercare.",
    },
    {
      title: "Critical Manufacturing MES implementation",
      description:
        "We implement, customize, upgrade, and integrate Critical Manufacturing MES with a dedicated Center of Excellence that supports solution architecture, development, reporting, project management, and production support.",
    },
    {
      title: "Manufacturing execution system integration",
      description:
        "MES must exchange accurate data with ERP, PLM, equipment, LIMS, quality, maintenance, scheduling, and analytics systems. Athenatec designs and builds integrations that protect data quality and reduce manual handoffs.",
    },
    {
      title: "MES validation, testing, and release readiness",
      description:
        "For regulated and high-risk environments, we support validation planning, test strategy, automated test scripts, UAT, conference room pilots, cutover rehearsal, release readiness, and post-go-live stabilization.",
    },
    {
      title: "MES application support and continuous improvement",
      description:
        "After go-live, we support incidents, enhancements, reporting, user adoption, performance tuning, master data changes, version upgrades, and continuous improvement so MES keeps pace with production needs.",
    },
  ],
  industries: [
    {
      title: "Semiconductor MES implementation",
      description:
        "Semiconductor operations need strong WIP control, equipment integration, traceability, dispatching, engineering data, rework logic, yield visibility, and global template discipline. Athenatec supports wafer, assembly, test, and advanced manufacturing environments.",
    },
    {
      title: "Medical device MES implementation",
      description:
        "Medical device manufacturers need paperless execution, quality enforcement, validation readiness, controlled workflows, line clearance, electronic records, auditability, and reliable production data. Athenatec supports regulated MES deployments and modernization programs.",
    },
    {
      title: "Electronics and SMT manufacturing",
      description:
        "Electronics manufacturers need materials visibility, equipment and test integration, route control, box-build workflows, traceability, defect capture, and high-volume production support. MES helps teams reduce manual effort and improve throughput.",
    },
    {
      title: "Discrete and industrial manufacturing",
      description:
        "Discrete manufacturers use MES to control complex routings, manage operators and resources, connect production events to ERP, improve schedule adherence, and create a scalable digital foundation across plants.",
    },
    {
      title: "Solar, LED, battery, and clean energy",
      description:
        "Clean energy manufacturers rely on MES for process consistency, experiment control, data collection, quality learning, equipment connectivity, and faster scale-up from pilot lines to production factories.",
    },
    {
      title: "Global multi-site manufacturing",
      description:
        "Multi-site manufacturers need common templates, controlled localization, data governance, phased rollout planning, and global support. Athenatec helps balance standardization with plant-specific requirements.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discover",
      description:
        "Align stakeholders, capture current-state processes, define business outcomes, assess data readiness, and identify integration and compliance requirements.",
    },
    {
      step: "02",
      title: "Design",
      description:
        "Create the MES blueprint, future-state workflows, master data model, integration architecture, reporting needs, role model, and release plan.",
    },
    {
      step: "03",
      title: "Build",
      description:
        "Configure MES modules, develop extensions, build integrations, prepare data, create reports, and validate that the solution supports actual production behavior.",
    },
    {
      step: "04",
      title: "Validate",
      description:
        "Run SIT, UAT, automated regression where appropriate, validation support, training, cutover preparation, and go-live readiness reviews.",
    },
    {
      step: "05",
      title: "Scale",
      description:
        "Support hypercare, production stabilization, template improvement, additional line or site rollouts, managed support, and continuous improvement.",
    },
  ],
  integrations: [
    {
      title: "ERP to MES integration",
      description:
        "ERP systems manage orders, inventory, costs, procurement, and financial execution. MES consumes and returns production data so planners and finance teams can see reliable factory progress and material movement.",
    },
    {
      title: "PLM to MES integration",
      description:
        "PLM controls product structures, BOMs, revisions, and engineering changes. MES needs approved product and process data at the right time so production executes the correct configuration with full traceability.",
    },
    {
      title: "Equipment and automation integration",
      description:
        "Equipment integration allows MES to collect process data, trigger transactions, control recipes, capture measurements, and reduce manual operator input. This is essential for high-volume and high-complexity manufacturing.",
    },
    {
      title: "Quality and LIMS integration",
      description:
        "Quality systems, LIMS, inspections, nonconformance workflows, and audit records must connect with production activity so quality decisions are made with current, complete, and traceable data.",
    },
    {
      title: "Analytics and smart factory integration",
      description:
        "MES is a core data source for dashboards, OEE, yield, throughput, cycle time, genealogy, and predictive analytics. Athenatec helps manufacturers design data flows that produce trustworthy operational insight.",
    },
    {
      title: "Accelerators and automated testing",
      description:
        "Athenatec accelerators support ECO redlining, master data migration, and automated testing so MES changes can move faster while preserving review, traceability, and release confidence.",
    },
  ],
  benefits: [
    {
      title: "Real-time production visibility",
      description:
        "MES gives teams immediate visibility into WIP, status, exceptions, quality holds, equipment interaction, and production progress instead of relying on delayed manual reporting.",
    },
    {
      title: "Stronger traceability and compliance",
      description:
        "A well-implemented manufacturing execution system records who did what, when it happened, what material and equipment were involved, and which quality checks were performed.",
    },
    {
      title: "Reduced manual effort and fewer handoffs",
      description:
        "MES integrations reduce duplicate entry between ERP, PLM, equipment, quality, and analytics systems. Operators and engineers spend less time reconciling data and more time improving production.",
    },
    {
      title: "Faster change execution",
      description:
        "When product, process, and master data changes are connected across PLM, ERP, and MES, manufacturers can implement engineering changes with better control and less disruption.",
    },
    {
      title: "Improved yield, throughput, and cycle time",
      description:
        "MES helps expose bottlenecks, recurring defects, recipe issues, waiting time, rework patterns, and equipment dependencies that can be improved through structured operational learning.",
    },
    {
      title: "Scalable global operations",
      description:
        "A templated MES model allows manufacturers to standardize core workflows, reuse integrations, and roll out consistent production control across plants while supporting local needs.",
    },
  ],
  proof: [
    {
      title: "Manufacturing-first delivery teams",
      description:
        "Athenatec combines MES solution architects, business analysts, developers, integration engineers, reporting specialists, project managers, and support teams who understand plant operations as well as enterprise systems.",
    },
    {
      title: "Technology partner credibility",
      description:
        "Athenatec is a Siemens Alliance Partner and Critical Manufacturing Premier Partner with dedicated implementation practices and Centers of Excellence for complex manufacturing platforms.",
    },
    {
      title: "Enterprise system depth",
      description:
        "MES projects rarely stand alone. Athenatec also brings Oracle Cloud ERP, Oracle E-Business Suite, Oracle Agile PLM, integrations, analytics, managed services, and automation testing expertise.",
    },
    {
      title: "Regulated and high-tech experience",
      description:
        "Our teams support medical device, semiconductor, electronics, clean energy, and industrial manufacturing environments where traceability, validation discipline, system reliability, and data integrity matter.",
    },
    {
      title: "Customer proof and case studies",
      description:
        "Athenatec's public case studies and customer proof points show practical MES modernization, paperless manufacturing, Opcenter upgrades, Critical Manufacturing integrations, and global rollout experience.",
    },
    {
      title: "Post-go-live accountability",
      description:
        "Implementation value is proven after launch. Athenatec supports hypercare, application support, enhancements, reporting, training, and continuous improvement so the system stays useful.",
    },
  ],
  caseStudies: [
    {
      title: "Medical device MES modernization",
      description:
        "See how a global medical device manufacturer modernized MES operations with Siemens Opcenter, integration support, and scalable manufacturing execution capabilities.",
      href: "/case-studies/medical-device-mes-modernization",
    },
    {
      title: "From paper to paperless MES",
      description:
        "Review how Nevro moved from paper-based workflows to a validated digital MES environment with line clearance, training, integration, and real-time visibility.",
      href: "/case-studies/nevro-paperless-mes",
    },
    {
      title: "Critical Manufacturing MES integration",
      description:
        "Explore Critical Manufacturing MES case studies covering equipment integration, SAP integration, product customization, upgrades, and global manufacturing programs.",
      href: "/critical-manufacturing",
    },
  ],
  cta: {
    title: "Ready to plan a practical MES implementation roadmap?",
    description:
      "Bring Athenatec into your MES planning process before scope, data, integrations, validation, and rollout assumptions become expensive. We will help you define the right implementation path.",
    href: "/contact",
    label: "Request MES consulting",
  },
};

export default function MesImplementationServicesPage() {
  const seoSchema = [
    buildWebPageSchema({
      name: "MES Implementation Services for Manufacturers",
      description:
        "Long-form guide and service page for MES implementation, manufacturing execution system implementation, and MES consulting services.",
      path: PAGE_PATH,
      primaryImage: "/assets/images/Mes-solution.webp",
    }),
    buildServiceSchema({
      name: "MES Implementation Services",
      description:
        "Athenatec provides MES implementation, manufacturing execution system integration, MES consulting, testing, validation support, training, go-live, hypercare, and managed support for manufacturers.",
      path: PAGE_PATH,
      serviceType: "Manufacturing Execution System Implementation",
      keywords: [
        "mes implementation",
        "manufacturing execution system implementation",
        "MES consulting services",
        "MES integration services",
        "Siemens Opcenter implementation",
        "Critical Manufacturing MES implementation",
      ],
      areaServed: ["United States", "North America", "APAC", "EMEA"],
      offers: priorityServiceOffers,
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "MES Implementation Services", path: PAGE_PATH },
    ]),
    buildFaqSchema(mesImplementationFaqs, PAGE_PATH),
  ];

  return (
    <>
      <StructuredData data={seoSchema} id="mes-implementation-seo-schema" />
      <ServiceSeoTemplate data={pageData} />
    </>
  );
}
