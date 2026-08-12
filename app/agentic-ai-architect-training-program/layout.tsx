import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Agentic AI Architect Training Program | Athenatec",
  description:
    "Join the Agentic AI Architect Training Program by Athenatec. 15-week certification pathway covering LLMs, multi-agent frameworks, advanced RAG, and labs.",
  path: "/agentic-ai-architect-training-program",
  image: "/assets/images/agentic-ai/banner-1.webp",
  keywords: [
    "Agentic AI Architect Training Program",
    "AI Architect Certification",
    "LLM Training Program",
    "RAG",
    "Multi-Agent Systems",
    "LangChain",
    "LlamaIndex",
    "CrewAI",
    "Athenatec",
    "AI Training Fremont",
  ],
});

export default function AgenticAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
