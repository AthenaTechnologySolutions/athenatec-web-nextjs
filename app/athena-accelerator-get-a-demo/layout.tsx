import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Get an Athena MES Accelerator Demo",
  description:
    "Request a demo of Athena ECO accelerators for MES redlining, master data migration, automated testing, traceability, and engineering change control.",
  path: "/athena-accelerator-get-a-demo",
  image: "/assets/images/eco-accelerators.webp",
});

export default function AcceleratorDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
