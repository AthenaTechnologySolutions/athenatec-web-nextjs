export type WebinarSeo = {
  slug: string;
  title: string;
  description: string;
  image: string;
  keywords: string[];
};

export const webinarSeoItems: WebinarSeo[] = [
  {
    slug: "building-future-manufacturing-siemens-athena",
    title: "Future Manufacturing Scalability Webinar | Athenatec",
    description:
      "Watch Siemens and Athena discuss how manufacturers connect PLM, MES, and shop-floor execution to scale operations while protecting compliance.",
    image: "/assets/images/webiner-banner.webp",
    keywords: [
      "manufacturing scalability webinar",
      "Siemens Opcenter webinar",
      "MES compliance",
      "PLM MES integration",
    ],
  },
  {
    slug: "medical-device-visibility",
    title: "Medical Device Manufacturing Visibility Webinar | Athenatec",
    description:
      "Access the on-demand webinar on real-time medical device manufacturing visibility, traceability, quality control, and audit-ready compliance.",
    image: "/assets/images/Gain-End-to-End-Visibility-in-Medical-Device.webp",
    keywords: [
      "medical device manufacturing webinar",
      "manufacturing visibility",
      "MES traceability",
      "medical device compliance",
    ],
  },
  {
    slug: "medtech-mes-accelerator",
    title: "Modern MES Accelerator for MedTech Webinar | Athenatec",
    description:
      "Learn how a modern MES accelerator helps MedTech manufacturers automate testing, simplify compliance, and accelerate new device introduction.",
    image: "/assets/images/Med-Mes.webp",
    keywords: [
      "MedTech MES webinar",
      "MES accelerator",
      "medical device automation",
      "new device introduction",
    ],
  },
];

export function getWebinarSeo(slug: string) {
  return webinarSeoItems.find((item) => item.slug === slug);
}
