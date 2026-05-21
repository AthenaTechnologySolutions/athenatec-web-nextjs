import { HeroProps } from "./types";

export const heroData: HeroProps = {
  slides: [
    {
      id: "slide-1",
      title: "Digitizing the Manufacturing Enterprise Since 2011",
      subtitle:
        "Leveraging deep expertise to enhance partnerships and drive long-term manufacturing success.",
      media: {
        type: "image",
        src: "/assets/images/DME.webp",
        alt: "Digitizing the Manufacturing Enterprise",
      },
      ctas: [
        {
          label: "Connect Us",
          href: "/contact",
          variant: "primary",
        },
      ],
    },
    {
      id: "slide-2",
      title: "About Us",
      subtitle:
        "Athena is an Industry 4.0 Enterprise Manufacturing Solutions provider, assisting companies and driving their Industry 4.0 roadmap, centered on Digital Transformation.",
      media: {
        type: "image",
        src: "/assets/images/aboutus.webp",
        alt: "About Athena",
      },
      ctas: [
        {
          label: "About Us",
          href: "/about",
          variant: "primary",
        },
      ],
    },
    {
      id: "slide-3",
      title: "Expertise in MES, PLM, ERP & More",
      subtitle:
        "Specialized in MES, PLM, ERP, CMMS, and smart factory analytics.",
      media: {
        type: "image",
        src: "/assets/images/mlsandpls.webp",
        alt: "MES PLM ERP Expertise",
      },
      ctas: [
        {
          label: "MES, PLM & More",
          href: "/solutions/mes",
          variant: "primary",
        },
      ],
    },
    {
      id: "slide-4",
      title: "Siemens Alliance Partner",
      subtitle:
        "Experienced in implementing and upgrading Opcenter MES across versions, from Camstar 3.2 to Opcenter 2410, ensuring seamless transitions and optimized performance.",
      media: {
        type: "image",
        src: "/assets/images/s8.webp",
        alt: "Siemens Alliance Partner",
      },
      ctas: [
        {
          label: "Siemens Alliance Partner",
          href: "/siemens-opcenter-mes",
          variant: "primary",
        },
      ],
    },
    {
      id: "slide-5",
      title: "Critical Manufacturing Premier Implementation Partner",
      subtitle:
        "Athena specializes in the implementation, upgrade, and customization of CM MES, along with seamless integrations with PLM, ERP, LIMS, and Camline.",
      media: {
        type: "image",
        src: "/assets/images/CMC.webp",
        alt: "Critical Manufacturing Partner",
      },
      ctas: [
        {
          label: "Critical Manufacturing",
          href: "/critical-manufacturing",
          variant: "primary",
        },
      ],
    },
    {
      id: "slide-6",
      title: "Athena Announces Strategic Authorised Reseller Partnership with twinzo",
      subtitle:
        "Strengthening smart manufacturing visibility and operational intelligence through Twinzo's digital twin platform.",
      media: {
        type: "image",
        src: "/assets/images/twinzobanners.webp",
        alt: "twinzo Partnership",
      },
      ctas: [
        {
          label: "twinzo",
          href: "/twinzo",
          variant: "primary",
        },
      ],
    },
    // Eyelit route is disabled for now; keep this slide commented for future reuse.
    // {
    //   id: "slide-7",
    //   title: "Eyelit Implementation Partner",
    //   subtitle:
    //     "As an official Eyelit Technologies partner, Athena delivers expertise in deploying Eyelit MES and Equipment Connect across semiconductor, solar, LED/laser diode, and medical device industries.",
    //   media: {
    //     type: "image",
    //     src: "/assets/images/eyelitsbanner.webp",
    //     alt: "Eyelit Implementation Partner",
    //   },
    //   ctas: [
    //     {
    //       label: "Eyelit",
    //       href: "/eyelit",
    //       variant: "primary",
    //     },
    //   ],
    // },
    {
      id: "slide-8",
      title: "ECO Accelerators",
      subtitle:
        "Speed up engineering change workflows with intelligent automation. ECO Accelerators handle tracking, approvals, execution, and traceability while ensuring compliance.",
      media: {
        type: "image",
        src: "/assets/images/eco-accelerators.webp",
        alt: "ECO Accelerators",
      },
      ctas: [
        {
          label: "Accelerators",
          href: "/accelerators",
          variant: "primary",
        },
      ],
    },
  ],

  bottomStats: [
    {
      id: "stat-1",
      label: "Founded",
      value: "2011",
      description: "13+ years experience",
    },
    {
      id: "stat-2",
      label: "Team Strength",
      value: "150+",
      description: "Industry experts",
    },
    {
      id: "stat-3",
      label: "Global HQ",
      value: "USA",
      description: "California",
    },
    {
      id: "stat-4",
      label: "Delivery Centers",
      value: "India",
      description: "Bangalore, Hyderabad, Chennai & Trichy",
    },
  ],
};
