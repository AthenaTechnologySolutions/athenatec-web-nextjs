import type { Metadata } from "next";
import CyberSecurityServices from "./CyberSecurityServices";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Enterprise Cyber Security & GRC Services | Athenatec",
  description:
    "Athenatec delivers GRC, VAPT, and vCISO services. Aligns with ISO 27001, NIST, and compliance frameworks to protect your digital ecosystem.",
  path: "/solutions/cyber-security-service",
});

export default function Page() {
  return <CyberSecurityServices />;
}
