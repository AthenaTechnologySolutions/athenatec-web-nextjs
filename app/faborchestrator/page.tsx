import type { Metadata } from "next";
import FabOrchestratorClient from "./FabOrchestratorClient";
import {
  buildMetadata,
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FabOrchestrator.AI | AI-Powered Manufacturing Intelligence Layer | Athenatec",
  description:
    "FabOrchestrator.AI brings AI-powered intelligence into manufacturing—combining Athena's MES expertise, context, and AI agents for faster operational decisions, impact analysis, and solution development.",
  path: "/faborchestrator",
  keywords: [
    "FabOrchestrator.AI",
    "Manufacturing AI",
    "Agentic AI manufacturing",
    "MES AI intelligence",
    "Siemens Opcenter AI",
    "Smart factory orchestration",
    "ECO impact analysis AI",
    "Athena Technology Solutions",
  ],
  image: "/assets/images/FabOrchestratorAI.webp",
});

export default function FabOrchestratorPage() {
  const serviceSchema = buildServiceSchema({
    name: "FabOrchestrator.AI",
    description:
      "AI-powered manufacturing intelligence layer combining Athena MES domain expertise, context, and AI agents.",
    path: "/faborchestrator",
    serviceType: "Manufacturing Artificial Intelligence",
    keywords: [
      "FabInsight",
      "AI Support Agent",
      "Modeling Agent",
      "Programming Agent",
    ],
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FabOrchestrator.AI", path: "/faborchestrator" },
  ]);

  const webPageSchema = buildWebPageSchema({
    name: "FabOrchestrator.AI — Manufacturing Intelligence, Orchestrated by AI",
    description:
      "FabOrchestrator.AI brings AI-powered intelligence into the heart of manufacturing—combining Athena's deep MES expertise, context, proven accelerators, and AI agents.",
    path: "/faborchestrator",
    primaryImage: "/assets/images/FabOrchestratorAI.webp",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
