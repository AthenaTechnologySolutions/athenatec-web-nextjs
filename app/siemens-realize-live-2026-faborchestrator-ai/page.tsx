import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SiemensBanClient from "./SiemensBanClient";
import "./siemens-ban.scss";

const PAGE_PATH = "/siemens-realize-live-2026-faborchestrator-ai";

export const metadata: Metadata = buildMetadata({
  title: "Meet Athenatec at Siemens Realize LIVE 2026 | FabOrchestrator.AI",
  description:
    "Book a meeting with Athenatec at Siemens Realize LIVE 2026 in Detroit to explore Opcenter capabilities, accelerators, and FabOrchestrator.AI.",
  path: PAGE_PATH,
  image: "/assets/images/siemens-live.webp",
  keywords: [
    "Siemens Realize LIVE 2026",
    "FabOrchestrator.AI",
    "Athena Opcenter",
    "Siemens Opcenter accelerators",
    "manufacturing AI",
  ],
});

export default function SiemensBanPage() {
  return <SiemensBanClient />;
}
