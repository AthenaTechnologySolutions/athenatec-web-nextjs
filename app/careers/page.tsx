import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers at Athenatec | MES & Manufacturing Technology Jobs",
  description:
    "Join Athenatec's team building intelligent manufacturing solutions. Explore roles in Oracle SCM, .NET, and AI/ML across Chennai, Bangalore, and Hyderabad.",
  path: "/careers",
});

export default function CareersPage() {
  return <CareersClient />;
}
