import type { Metadata } from "next";
import Hero from "@/app/components/home/hero/hero";
import WhoWeAre from "./components/home/who-we-are/WhoWeAre";
import Services from "./components/home/services/services";
import Leadership from "./components/home/services/Leadership";
// import InternalLinkCluster, {
//   manufacturingSeoLinks,
// } from "@/app/components/seo/InternalLinkCluster";
import StructuredData from "@/app/components/seo/StructuredData";
import { homeFaqs } from "@/lib/home-faqs";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Best MES Solution Provider | Athenatec",
  description:
    "Athenatec delivers MES, PLM, and smart factory solutions for medical device, semiconductor, and electronics manufacturers. Start your Industry 4.0 journey.",
  path: "/",
  keywords: [
    "MES implementation services",
    "Siemens Opcenter partner",
    "Critical Manufacturing MES implementation",
    "Oracle Cloud ERP implementation",
    "Oracle Agile PLM implementation",
    "Industry 4.0 consulting",
  ],
});

export default function Home() {
  const homeSchema = [
    buildWebPageSchema({
      name: "MES Implementation Services & Siemens Opcenter Partner",
      description:
        "MES implementation, Siemens Opcenter, Critical Manufacturing, Oracle ERP, PLM, and Industry 4.0 consulting for manufacturers.",
      path: "/",
      primaryImage: "/assets/images/webiner-banner.webp",
    }),
    buildServiceSchema({
      name: "MES Implementation Services",
      description:
        "Enterprise MES implementation, integration, upgrades, and support for Siemens Opcenter, Critical Manufacturing, ERP, PLM, and smart factory programs.",
      path: "/",
      serviceType: "Manufacturing Execution System Implementation",
      keywords: [
        "MES implementation services",
        "Siemens Opcenter partner",
        "Critical Manufacturing MES implementation",
        "Industry 4.0 consulting",
      ],
    }),
    buildBreadcrumbSchema([{ name: "Home", path: "/" }]),
    buildFaqSchema(homeFaqs.map((item) => ({ question: item.q, answer: item.a })), "/"),
  ];

  return (
    <>
      <StructuredData data={homeSchema} id="home-seo-schema" />
      <Hero />
      <WhoWeAre />
      <Leadership />
      <Services />
      {/* <InternalLinkCluster
        links={manufacturingSeoLinks}
        title="Build your MES implementation roadmap"
        description="Explore Athenatec's core implementation services, technology partner expertise, accelerators, case studies, and manufacturing thought leadership."
      /> */}
    </>
  );
}
