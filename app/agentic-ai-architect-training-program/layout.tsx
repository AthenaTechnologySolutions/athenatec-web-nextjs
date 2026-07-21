import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentic AI Architect Training Program | Athenatec",
  description: "Join the Agentic AI Architect Training Program by Athenatec. A comprehensive 15-week certification pathway covering LLMs, multi-agent frameworks, advanced RAG, and hands-on labs in Fremont, CA or remote. Complimentary lunch included.",
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
    "AI Training Fremont"
  ],
};

export default function AgenticAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
