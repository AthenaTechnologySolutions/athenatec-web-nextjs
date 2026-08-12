export type IndustryPage = {
  title: string;
  seoTitle?: string;
  heroImage: string;
  intro: string;
  videoUrl?: string;
  sections: {
    heading: string;
    content: string [];
  }[];

  showContact?: boolean;
  contactLabel?: string;
};

export const industries: Record<string, IndustryPage> = {
semiconductor: {
  title: "Siemens Opcenter Execution – Semiconductor",
  heroImage: "/assets/images/abstract-futuristic-machine-architecture-render-scaled.webp",
  intro:
    "Opcenter Execution Semiconductor (formerly known as “Camstar Semiconductor Suite”) replaces legacy manufacturing systems that haven’t kept pace with the demanding needs of semiconductor manufacturing. With Opcenter Execution Semiconductor, manufacturers are no longer constrained by multiple islands of systems and technologies.  Instead, Manufacturers choosing Opcenter Execution Semiconductor have a comprehensive manufacturing solution that can grow and adapt with their businesses.",
  showContact: true,
  contactLabel: "Contact Us",
  videoUrl: "/assets/videos/semiconductor.mp4",
  sections: [
    {
      heading: "Why Opcenter for Semiconductor?",
      content: [
        "As a Siemens Alliance Partner, Athena has significant experience with Opcenter Execution Semiconductor for both Front-End and Back-End production, including; wafer fab, assembly and test operations, offering the highest level of Manufacturing process alignment, automation, statistical quality control and instant intelligence.  Always with an eye on improving quality, yield, operations efficiencies, lowing production costs.",
        ],
    },
  ],
},
  electronics: {
    title: "Siemens Opcenter Execution – Electronics",
    heroImage: "/assets/images/circuit-board-close-up-with-different-components-scaled.webp",
    intro:
      "Opcenter Execution Electronics (formerly known as “Camstar Electronics Suite”) is a comprehensive manufacturing solution for the electronics industry. This Electronics specific solution embraces PCB, PCBA, mechanical assembly, QA / test and box-build production.With Opcenter Execution Electronics manufacturers can modify and reconfigure manufacturing and quality processes at the speed required to meet increased customer demand and quality requirements while driving down production costs.",
  showContact: true,
  contactLabel: "Contact Us",
  videoUrl: "/assets/videos/electronics.mp4",
  sections: [
    {
      heading: "Why Opcenter for Semiconductor?",
      content: [
        "Athena is well versed in Implementing Siemens Opcenter for the Electronics Industry. Leveraging our deep expertise, we enable Electronics manufacturers to accelerate their digital initiatives in shortening cycle times and lowering the cost of NPI while being flexible and agile enough to produce a high variation of production mix, complexity and volumes at the highest quality.",
        "From an Intelligence standpoint, Industry 4.0 aligned Digitalization is already being embraced by a growing number Electronics manufacturers to gain a holistic, enterprise-wide view of manufacturing operations.",
],

    },
  ],
},
"medical-devices": {
    title: "Siemens Opcenter Execution – Medical Devices",
    heroImage: "/assets/images/white-monitor-with-screen-that-says-mac-it-scaled.webp",
    intro:
      "Siemens Opcenter MES for Medical Devices (formerly known as Camstar) is a unified and holistic application to drive digital initiatives faster and further to gain the benefits from Industry 4.0. Opcenter MES helps to drive control, resilience, compliance and agility across the entire production process, from raw materials to your Customers in the medical community. At Athena, we understand the challenges of balancing cost reductions and regulatory compliance while consistently producing high-quality products for on time delivery.",
  showContact: true,
  contactLabel: "Contact Us",
  videoUrl: "/assets/videos/medical-devices.mp4",
  sections: [
    {
      heading: "",
      content: [
        "Likewise the need to have an MES tailored for the medical device industry that embraces the needs surrounding; error-proofing processes, paperless manufacturing, electronic device history records (eDHR) and electronic batch records (eBR). One of our primary Implementation goals is to enable our Customer’s to shift their operational focus from, managing compliance and risk, to manufacturing agility and product quality.",
 ],

    },
  ],
},
discrete: {
  title: "Siemens Opcenter Execution – Discrete",
  heroImage: "/assets/images/collection-white-gears-clean-surface-symbolizing-teamwork-engineering-creativity-design-scaled.webp",
  intro:
    "Siemens Opcenter Core (formerly known as Camstar Enterprise Platform) is the global MES platform for Production and Quality Management. Opcenter Execution Core opens to the manufacturer a whole new variety of opportunities including the ability to produce product in less time, more transparent, with better quality, faster and even lowering of production costs. Opcenter Core presents itself as a highly configurational and scalable solution for central production management and monitoring tool as well as the significant increase of product quality during the manufacturing process. Within the frame of this closed loop control system products are easier designed and the adjoin production processes that are structured to be leaner and more cost effective.",

  showContact: true,
  contactLabel: "Contact Us",

  videoUrl: "/assets/videos/discrete.mp4",

  sections: [
    {
      heading: "Siemens Opcenter Execution – Discrete",
      content: [
        "Athena is an Certified Siemens Alliance Partner in the area of Manufacturing Operations Management especially when it comes to needs analysis, implementation, maintenance and support of Opcenter Execution Core in the US, Canada and Asia.",
      ],
    },
  
  ],
},

"advance-planning-scheduling": {
  title: "Siemens Opcenter – Advance Planning & Scheduling",
  seoTitle: "Siemens Opcenter APS | Athenatec",
  heroImage: "/assets/images/digital-tablet-with-annual-strategy-background-scaled.webp",

  intro:
    "In Manufacturing, product variability, available production resources and customer order changes directly affect the time sensitive work effort of optimizing Jobs on the Shop Floor. For companies that are have vertically integrated products, this is even more challenging, as the supply chain of many manufacturers is characterized by production sites all over the world. Here, a production lot runs through many company internal as well as external production sites on the way from the raw material to the final product.",

  showContact: true,
  contactLabel: "Contact Us",

  videoUrl: "/assets/videos/aps.mp4",

  sections: [
    {
      heading: "Production Planning Challenges",
      content: [
        "Additionally, from a Production Cost standpoint, maximizing the use of constrained resources for higher utilization is difficult to achieve without an integrated APS solution.",
        "As a result, it’s become imperative for many of Athena’s Customer’s to have a tool that allows for the sometimes daily re-optimization of the Shop Floor based on these and other variables. The solution for this is provided by the proven Siemens APS planning and scheduling software, (formally known as ‘Preactor’) by Siemens Digital Industries Software.",
        "As a Siemens Alliance partner, Athena is well versed on the many APS challenges in optimizing Production for optimal resource utilization, shortest cycle time and on-time Customer delivery. Having implemented Siemens Opcenter MES and APS across multiple industries, our goal is to create a ‘closed loop’ Planning / Scheduling process that replaces the recurring and burdensome human effort otherwise required to accomplish same."
      ],
    },
  ],
},

"siemens-mendix": {
  title: "Siemens Mendix",
  heroImage: "/assets/images/6330206_3229734-scaled.webp",

  intro:
    "Siemens Mendix is a leading low-code application development platform that enables organizations to rapidly build, deploy, and scale enterprise applications. By combining low-code development with powerful analytics capabilities, Mendix empowers businesses to accelerate digital transformation and improve operational visibility.",

  showContact: true,
  contactLabel: "Contact Us",

  videoUrl: "/assets/videos/mendix.mp4",

   sections: [
    {
      heading: "Low-Code Application Development",
      content: [
        "Mendix enables organizations to develop enterprise applications faster using a visual low-code environment. This allows both developers and business users to collaborate and deliver solutions quickly without the complexity of traditional development approaches.",
        "The platform accelerates innovation by reducing development time, simplifying integrations, and enabling rapid iteration of applications across web and mobile platforms."
      ]
    },
    {
      heading: "Analytics and Operational Visibility",
      content: [
        "Low-code and analytics features of Mendix help organizations design KPIs and dashboards that provide better visibility into operational data.",
        "By leveraging real-time insights, companies can monitor performance, identify trends, and make faster data-driven decisions across their manufacturing and business processes."
      ]
    },
    {
      heading: "Athena Expertise",
      content: [
        "Athena helps organizations leverage Siemens Mendix to rapidly develop business applications that integrate with manufacturing systems such as MES and ERP.",
        "Our expertise enables customers to build scalable digital solutions that enhance operational visibility, streamline processes, and accelerate digital transformation initiatives."
      ]
    }
  ]
},

"led-battery-manufacturing": {
  title: "Siemens Opcenter Execution – LED / Battery Manufacturing",
  seoTitle: "Siemens Opcenter LED & Battery MES | Athenatec",
  heroImage: "/assets/images/futuristic-time-machine-scaled-e1724923036586.webp",
  intro:
    "Athena excels in addressing complex manufacturing challenges in LED and Battery manufacturing with rapid implementation, delivering a robust, integrated, and scalable data-centric enterprise. Siemens Opcenter MES provides end-to-end traceability, quality management, and operational efficiency across automated production lines.",
  showContact: true,
  contactLabel: "Contact Us",
  sections: [
    {
      heading: "LED & Battery Manufacturing MES Solutions",
      content: [
        "Athena is well-versed in implementing Siemens Opcenter for LED and Battery Manufacturing operations. Leveraging deep domain expertise, we enable manufacturers to accelerate their digital initiatives, optimize yield, ensure full traceability, and meet stringent quality standards.",
        "From high-volume cell production to battery module assembly and LED packaging, Siemens Opcenter MES delivers real-time visibility, automated quality controls, and seamless shop-floor equipment integration."
      ]
    }
  ]
},

solar: {
  title: "Siemens Opcenter Execution – Solar",
  heroImage: "/assets/images/beautiful-alternative-energy-plant-with-solar-panels-scaled-e1724923416271.webp",
  intro:
    "Solar manufacturing's complexities, such as Applied Materials and Statistical Process Control (SPC), demand advanced analytics, continuous experimentation, and precise operational control. Athena's expertise and passion position us to effectively tackle these challenges using Siemens Opcenter MES.",
  showContact: true,
  contactLabel: "Contact Us",
  sections: [
    {
      heading: "Solar Manufacturing MES Solutions",
      content: [
        "Athena delivers tailored Siemens Opcenter MES solutions for the solar industry, helping solar cell and module manufacturers achieve higher efficiency, real-time shop-floor tracking, and seamless equipment integration.",
        "By implementing advanced analytics, automated SPC, and wafer-to-panel traceability, solar manufacturers can maximize output, reduce scrap, and optimize factory utilization."
      ]
    }
  ]
}
}