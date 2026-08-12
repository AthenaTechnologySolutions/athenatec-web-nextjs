type ParagraphContent =
  | string
  | {
      text: string;
      href: string;
      external?: boolean;
    };

type CaseSection = {
  heading?: string;
  paragraphs?: ParagraphContent[][];
  bullets?: string[];
};

export type CaseStudy = {
desc?: string;
  slug: string;
  title: string;
  fullTitle: string;
  shortDesc: string;
  summary: string[];
  sections: CaseSection[];
  image: string;
};

export const caseStudies: CaseStudy[] = [

  {
    slug: "medical-device-mes-modernization",
    title: "Enabling Continuous Innovation in Medical Device",
    fullTitle:
      "Enabling Continuous Innovation in Medical Device Manufacturing Through MES Modernization & Integration",
    shortDesc:
      "Modernization & integration of advanced MES systems.",
    summary: [
      "Discover how a global leader in continuous glucose monitoring (CGM) partnered with Athena to modernize and integrate their Manufacturing Execution System (MES). By upgrading across multiple Siemens Opcenter versions, enabling real-time system integration, and supporting advanced R&D initiatives, Athena helped the client achieve scalable, reliable, and future-ready manufacturing operations."
      ,"Read the full case study to see how Athena drives MES performance, accelerates innovation, and empowers medical device leaders to deliver life-changing technologies at scale."],
        sections: [
    {
      heading: "Business Context",
      paragraphs: [
        [
        { text: "Nevro", href: "https://www.nevro.com ", external: true },
             " a globally recognized medical device company headquartered in California, is dedicated to transforming the lives of individuals with chronic pain through advanced neuromodulation therapies.",
        "With increasing production complexity and tightening compliance requirements, the organization recognized a growing gap between operational capacity and the demand for faster innovation.",
        "To enable a fully digital, future-ready environment, the client partnered with Athena to implement Siemens Opcenter Medical Device Suite 2310."
      ],
      ]
    },
    {
      heading: "Athena’s Engagement",
      bullets: [
        "Rapid Proof of Concept delivered in just 3 weeks",
        "First phase implemented within 4 months",
        "OOB deployment with custom enhancements",
        "Seamless integrations across enterprise systems"
      ]
    },
    {
      heading: "Benefits Delivered",
      bullets: [
        "Paperless operations with real-time visibility",
        "Faster time-to-value",
        "Improved productivity",
        "Enhanced compliance and analytics"
      ]
    },
    {
      heading: "Technology Used",
      bullets: [
        "Siemens Opcenter Medical Device Suite 2310",
        "Manufacturing Integration and Orchestration (MIO)"
      ]
    }
  ],
    image: "/assets/images/case-study.webp",
  },
{
  slug: "nevro-paperless-mes",
  title: "From Paper to Paperless – Modernizing MES",
  fullTitle:
    "From Paper to Paperless – Modernizing MES for Nevro Corp - a Global Medical Device Manufacturer",
  shortDesc:
    "Replacing paper workflows with validated digital MES.",

  summary: [
    "Discover how Nevro, a global innovator in neuromodulation therapies, partnered with Athena to replace paper-based workflows with a fully digital, validated MES environment. In less than four months, Athena delivered a scalable Siemens Opcenter solution with seamless integrations, automated line clearance, and enhanced compliance—empowering Nevro to accelerate innovation, boost productivity, and ensure real-time visibility across manufacturing operations.",
    "Read the full case study to see how Athena helps medical device manufacturers transform operations without compromising quality or compliance."
  ],

sections: [
  {
    heading: "Business Context",
    paragraphs: [
      [
       { text: "Nevro", href: "https://www.nevro.com", external: true },
       " a globally recognized medical device company headquartered in California, is dedicated to transforming the lives of individuals with chronic pain through advanced neuromodulation therapies. Founded in the mid-2000s, the company has pioneered spinal cord stimulation technology and has become a trusted innovator in the field.",
      "With increasing production complexity and tightening compliance requirements, the organization recognized a growing gap between operational capacity and the demand for faster innovation. Historically, it relied on paper travelers to manage production workflows, approvals, and quality checks. While functional, this manual approach introduced bottlenecks in traceability, delayed decision-making, and restricted visibility into real-time manufacturing performance.",
      "To enable a fully digital, future-ready environment, the client partnered with Athena to implement Siemens Opcenter Medical Device Suite 2310. The objective was clear: move from paper-based operations to a validated, paperless MES environment with seamless integrations to existing systems."
    ],
    ]
  },
  {
    heading: "Athena’s Engagement",
    paragraphs: [
      [
      "Athena was engaged to design and implement a comprehensive MES modernization program. Key steps included:"
    ],
    ],
    
    bullets: [
      "Rapid Proof of Concept (POC): Delivered a working MES demonstration in just 3 weeks, ensuring early stakeholder alignment.",
      "Phased Implementation: Delivered the first phase within 4 months, cutting the typical time-to-value for MES rollouts.",
      "Out-of-the-Box (OOB) Deployment with Custom Enhancements: Leveraged standard Siemens Opcenter functionality while adding custom workflows to meet the client’s unique manufacturing and compliance needs.",
      "Seamless Integrations: Connected MES with external enterprise systems to ensure smooth data flow across the production ecosystem."
    ]
  },
  {
    heading: "Key Highlights",
    bullets: [
      "New MES implementation to replace paper travelers with digital workflows.",
      "Enhanced line clearance logic tailored to the client’s regulatory and operational requirements.",
      "Extended secondary test and rework logic to support complex medical device manufacturing processes.",
      "Delivered end-to-end operator training to ensure smooth adoption and long-term scalability."
    ]
  },
  {
    heading: "Approach",
    paragraphs: [
      [
      "Athena followed a structured, collaborative approach that combined deep industry expertise, rigorous project governance, and close engagement with cross-functional stakeholders. By aligning IT, manufacturing, and quality teams early in the process, Athena ensured that both regulatory and operational requirements were fully addressed.",
      "The methodology emphasized rapid prototyping, phased validation, and seamless integration, enabling the client to realize quick wins while laying a scalable foundation for long-term digital transformation."
    ],
  ],
    bullets: [
      "Workshops & Requirement Analysis – Engaged stakeholders across manufacturing, IT, and quality to define business needs.",
      "System Design & Configuration – Implemented Opcenter modules with custom functionality for rework and clearance workflows.",
      "Integration Enablement – Leveraged Manufacturing Integration and Orchestration (MIO) to connect MES with external systems for real-time data exchange.",
      "Validation & Go-Live – Executed validation cycles aligned with regulatory standards, ensuring the system met compliance requirements before going live.",
      "Training & Adoption – Delivered comprehensive training and support to operators, driving user adoption across the plant."
    ]
  },
  {
    heading: "Benefits Delivered",
    bullets: [
      "Paperless Operations: Transitioned from manual processes to digital workflows, enabling real-time visibility and compliance-ready data.",
      "Faster Time-to-Value: Proof of Concept in 3 weeks, with first-phase validation in less than 4 months.",
      "Improved Productivity: Automated workflows reduced delays in line clearance, testing, and rework.",
      "Scalability: Designed a flexible, configurable solution that adapts to evolving business requirements.",
      "Stronger Compliance & Analytics: Enhanced traceability and enabled advanced analytics for better decision-making."
    ]
  },
  {
    heading: "Technology Used",
    bullets: [
      "Siemens Opcenter Medical Device Suite 2310",
      "Manufacturing Integration and Orchestration (MIO)"
    ]
  },
  {
    heading: "Conclusion",
    paragraphs: [
      [
      "Every medical device manufacturer faces similar challenges to those encountered by Nevro—how to modernize operations without compromising productivity, throughput, or quality. Athena’s proven approach makes this possible: combining phased implementation, strong executive alignment, and iterative development to deliver systems that not only address today’s requirements but also scale with future growth.",
      "To learn how Athena can support your modernization journey, contact us today.",
      "Discover how Nevro partnered with Athena to replace paper-based workflows with a fully digital, validated MES environment. In less than four months, Athena delivered a scalable Siemens Opcenter solution with seamless integrations, automated line clearance, and enhanced compliance—empowering Nevro to accelerate innovation, boost productivity, and ensure real-time visibility across manufacturing operations.",
      "Read the full case study to see how Athena helps medical device manufacturers transform operations without compromising quality or compliance."
    ],
    ],
  }
],

  image: "/assets/images/From-Paper.webp",
}
]