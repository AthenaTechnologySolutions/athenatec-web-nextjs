import type { Metadata } from "next";
import WebinarsClient from "./webinarsClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Manufacturing and MES Webinars | Athenatec",
  description:
    "Access Athenatec's webinar library on MES accelerators, real-time visibility, and digital transformation for medical device and high-tech industries.",
  path: "/webinars",
  image: "/assets/images/webinars.webp",
  keywords: [
    "manufacturing webinars",
    "MES webinars",
    "medical device manufacturing",
    "digital manufacturing",
  ],
});

export default function Page() {
  return <WebinarsClient />;
}
