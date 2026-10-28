import type { Metadata } from "next";
import FabOrchestratorClient from "./FabOrchestratorClient";
import {
  buildMetadata,
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
  buildFaqSchema,
  canonicalUrl,
  ORGANIZATION_ID,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FabOrchestrator.AI | Agentic AI for Manufacturing & MES Intelligence | Athenatec",
  description:
    "FabOrchestrator.AI is an Agentic AI Foundry for smart manufacturing. Unify shop-floor data, automate root-cause support, model MES changes, and build modules with FabInsight, Modeling, Programming & Support AI Agents.",
  path: "/faborchestrator",
  keywords: [
    "FabOrchestrator.AI",
    "Agentic AI manufacturing",
    "Manufacturing AI platform",
    "MES AI intelligence",
    "FabInsight",
    "Modeling Agent",
    "Programming Agent",
    "AI Support Agent",
    "Siemens Opcenter AI",
    "Critical Manufacturing MES AI",
    "Smart factory orchestration",
    "Manufacturing execution systems AI",
    "Predictive manufacturing analytics",
    "Automated root cause analysis manufacturing",
    "Athena Technology Solutions",
  ],
  image: "/assets/images/FabOrchestrator-part.webp",
});

export default function FabOrchestratorPage() {
  const serviceSchema = buildServiceSchema({
    name: "FabOrchestrator.AI",
    description:
      "Agentic AI Foundry for smart manufacturing—combining Athena MES domain expertise, operational context, and autonomous AI agents for instant intelligence, impact analysis, code generation, and automated support.",
    path: "/faborchestrator",
    serviceType: "Manufacturing Artificial Intelligence & MES Orchestration",
    keywords: [
      "FabInsight",
      "Modeling Agent",
      "Programming Agent",
      "AI Support Agent",
      "Agentic AI",
      "Smart Manufacturing",
      "Siemens Opcenter",
      "Critical Manufacturing",
    ],
    offers: [
      {
        name: "FabInsight",
        description:
          "Operational intelligence & predictive analysis. Bring data from MES, quality, and equipment into one view with automated reports, trends, and alerts.",
      },
      {
        name: "Modeling Agent",
        description:
          "Master data validation and change impact analysis. Model proposed changes across product lines and processes before deploying to MES.",
      },
      {
        name: "Programming Agent",
        description:
          "From requirements to MES-ready modules. Automatically generate UI, backend code, scripts, queries, and master data objects ready for export.",
      },
      {
        name: "AI Support Agent",
        description:
          "Contextual 24/7 issue resolution. Connect to support systems, diagnose root causes from historical data, recommend actions, and route escalations.",
      },
    ],
  });

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl("/faborchestrator")}#software`,
    name: "FabOrchestrator.AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud, Web-based, On-Premise MES Integration",
    url: canonicalUrl("/faborchestrator"),
    description:
      "Agentic AI Foundry built for smart manufacturing operations, multi-agent orchestration, and MES intelligence.",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    featureList: [
      "FabInsight: Unified factory data, operational dashboards & predictive analytics",
      "Modeling Agent: Engineering change impact analysis & master data validation",
      "Programming Agent: Automated MES logic, script & UI module generation",
      "AI Support Agent: Automated shop-floor troubleshooting & root-cause intelligence",
    ],
  };

  const faqSchema = buildFaqSchema(
    [
      {
        question: "What is FabOrchestrator.AI?",
        answer:
          "FabOrchestrator.AI is the manufacturing industry's first Agentic AI Foundry, designed to eliminate operational inefficiencies, automate troubleshooting, and provide real-time factory intelligence on top of MES platforms like Siemens Opcenter and Critical Manufacturing.",
      },
      {
        question: "What are the core capabilities of FabOrchestrator.AI?",
        answer:
          "FabOrchestrator.AI features four specialized AI capabilities: FabInsight (operational intelligence and predictive reporting), Modeling Agent (master data modeling and change impact analysis), Programming Agent (automated MES logic and module development), and AI Support Agent (24/7 automated issue resolution and root cause analysis).",
      },
      {
        question: "How does FabOrchestrator.AI integrate with existing MES systems?",
        answer:
          "FabOrchestrator.AI acts as a non-invasive intelligence layer connecting with MES, SCADA, ERP, and shop-floor equipment via standard APIs and MCP-native agentic protocols without requiring custom core code rewrites or system disruptions.",
      },
      {
        question: "Which industries benefit from FabOrchestrator.AI?",
        answer:
          "FabOrchestrator.AI is engineered for high-complexity discrete and process manufacturing environments including semiconductors, medical devices, clean energy, automotive, and industrial electronics.",
      },
    ],
    "/faborchestrator",
  );

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FabOrchestrator.AI", path: "/faborchestrator" },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: "FabOrchestrator.AI — Manufacturing Intelligence, Orchestrated by AI",
    description:
      "FabOrchestrator.AI brings AI-powered intelligence into the heart of manufacturing—combining Athena's deep MES expertise, context, proven accelerators, and AI agents.",
    path: "/faborchestrator",
    primaryImage: "/assets/images/FabOrchestrator-part.webp",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <FabOrchestratorClient />
    </>
  );
}
