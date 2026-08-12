export type CaseStudyType = {
  slug: string;
  fullTitle: string;
  seoTitle?: string;
  seoDescription?: string;
  image: string;
  description: string;
  formType: "siemens" | "cmf";
};

export const caseStudyContent: CaseStudyType[] = [
  {
    slug: "surgical-plan-approval",
    fullTitle: "Surgical Plan Approval",
    seoTitle: "Surgical Plan Approval Case Study | Athenatec",
    seoDescription:
      "Learn how Athena integrated an external surgical plan approval system with Siemens Opcenter MES for a leading medical device manufacturer.",
    image: "/assets/images/freepik-export-202412191322302WRy-1920x1280.webp",
    description:
      "Our Medical device customer had an external system to get approval for Surgical Plans from the surgeon which had to be integrated to Opcenter in several Operations.",
    formType: "siemens",
  },
  {
    slug: "factory-separation",
    fullTitle: "Factory Separation",
    seoTitle: "Factory Separation Case Study | Athenatec",
    seoDescription:
      "Discover how Athena implemented a factory separation model within Siemens Opcenter MES across multiple medical device manufacturing facilities.",
    image: "/assets/images/FS.webp",
    description:
      "Our customer operates multiple factories manufacturing different medical devices across several production environments. The challenge was to implement a clear factory separation model within the MES system while maintaining visibility of production data and WIP across facilities. Athena designed and implemented a scalable factory modeling solution within Siemens Opcenter that enabled each factory to operate independently while still allowing enterprise-level monitoring and reporting.",
    formType: "siemens",
  },
  {
    slug: "manage-shipper-case",
    fullTitle: "Manage Shipper Case",
    seoTitle: "Manage Shipper Case Study | Athenatec",
    seoDescription:
      "See how Athena enhanced packaging workflows and container traceability in Siemens Opcenter MES for medical device manufacturing.",
    image: "/assets/images/freepik-export-20241219133957E1bW-1920x1280.webp",
    description:
      "The customer required an enhanced packaging process where shipper cases needed to be associated with containers during the packaging stage. Athena implemented a solution within Siemens Opcenter MES that allowed operators to efficiently associate shipper cases with container records while ensuring accurate traceability and compliance. This improved packaging workflow efficiency while providing better shipment tracking and quality assurance.",
    formType: "siemens",
  },
  {
    slug: "optimize-production-client-ui",
    fullTitle: "Optimize Opcenter Execution Electronics Production Client",
    seoTitle: "Opcenter UI Optimization Case Study | Athenatec",
    seoDescription:
      "Explore how Athena optimized the Siemens Opcenter Execution Electronics Production Client UI to streamline shop-floor WIP transactions.",
    image: "/assets/images/close-up-computer-keyboard-1920x1280.webp",
    description:
      "Production Client which is a main UI for Operator in Electronics Suite was optimized to cover maximum WIP transactions.",
    formType: "siemens",
  },
  {
    slug: "wip-main-optimization",
    fullTitle: "Optimize Opcenter Execution Semiconductor Suite WIP Main",
    seoTitle: "Semiconductor WIP UI Optimization | Athenatec",
    seoDescription:
      "Learn how Athena optimized the Opcenter Semiconductor Suite WIP Main UI to reduce clicks, streamline navigation, and improve operator efficiency.",
    image:
      "/assets/images/WhatsApp-Image-2024-07-17-at-10.11.32-e1734616151384.webp",
    description:
      "WIP Main page which is key UI for all the WIP transactions in Semi Suite was optimized to reduce clicks and scrolls and enhanced color codes for better user experience.",
    formType: "siemens",
  },
  {
    slug: "data-correction",
    fullTitle: "Data Correction",
    seoTitle: "MES Data Correction Case Study | Athenatec",
    seoDescription:
      "Discover how Athena implemented an audit-compliant data correction and tracking workflow within Siemens Opcenter MES.",
    image:
      "/assets/images/businessman-compliance-rules-law-regulation-policy-virtual-screen-documents-with-checkbox-lists-1920x1277.webp",
    description:
      "Customer had a requirement to correct collected data and record audit trails for the same.",
    formType: "siemens",
  },
  {
    slug: "equipment-integration-cm-mes",
    fullTitle:
      "Equipment Integration with CM MES for a Global Leader in Semiconductors",
    seoTitle: "Equipment Integration CM MES | Athenatec",
    seoDescription:
      "Discover how Athena delivered global equipment and process integration for CM MES across semiconductor facilities using IoT and SECS/GEM.",
    image: "/assets/images/form-img.webp",
    description:
      "This project aims to provide solution to implement equipment & processes integration globally through robust backend systems. This phase is part of the CM MES implementation that is spread in various manufacturing factories worldwide. The backend system ensures seamless equipment connectivity and optimized workflows by leveraging IoT integration, real-time data insights, and advanced automation. It supports various equipment protocols, including SECS/GEM, OPC-UA, Modbus, Serial (RS-232), and file formats such as XML, CSV, XLSX, and HTML.",
    formType: "cmf",
  },
  {
    slug: "sap-cm-mes-integration",
    fullTitle:
      "Integration Between SAP and CM MES Across Five Manufacturing Factories Worldwide",
    seoTitle: "SAP and CM MES Integration | Athenatec",
    seoDescription:
      "See how Athena implemented real-time enterprise integration between SAP and Critical Manufacturing MES across five factories worldwide.",
    image:
      "/assets/images/sap-system-software-automation-concept-virtual-screen-data-center-scaled.webp",
    description:
      "Athena was involved with implementing enterprise integration with real time synchronization of the data between SAP and CM MES. Integration was achieved by IoT / equipment integration using OPC-UA, file driver protocols, and features achieved with parts movement and real time data insights, including customization on the material management, maintenance model, and material logistics model.",
    formType: "cmf",
  },
  {
    slug: "cm-mes-solar-panel-implementation",
    fullTitle:
      "CM MES Product Implementation & Customization for a State-of-the-Art Solar Panel Manufacturer in North America",
    seoTitle: "Solar Panel CM MES Case Study | Athenatec",
    seoDescription:
      "Learn how Athena implemented and customized Critical Manufacturing MES for a leading North American solar panel manufacturer.",
    image: "/assets/images/CaseStudy-03.webp",
    description:
      "Currently the client has implemented a home grown MES solution for their main factory. Athena's scope is to conduct the CM MES product implementation to the latest version, implement additional customization, industry best practices, reports, and post deployment support.",
    formType: "cmf",
  },
  {
    slug: "cm-mes-semiconductor-implementation",
    fullTitle:
      "CM MES Product Implementation & Customization for a Semiconductor Manufacturer",
    seoTitle: "Semiconductor CM MES Case Study | Athenatec",
    seoDescription:
      "Explore how Athena delivered Critical Manufacturing MES implementation and real-time SAP integration for semiconductor manufacturing.",
    image: "/assets/images/CaseStudy-01.webp",
    description:
      "Client offers a unique product and technology portfolio for sensing, illumination and visualization, from prime-quality light emitters and optical components to micro-modules, light sensors, ICs and related software. This project, involved with enterprise integration, has been implemented with real time synchronization of the data between SAP, SPACE, and CM.",
    formType: "cmf",
  },
  {
    slug: "cm-mes-sensor-fab-upgrade",
    fullTitle:
      "CM MES Product Upgrade & Customization for a State-of-the-Art Sensor Fab Manufacturing Facility in North America",
    seoTitle: "Sensor Fab CM MES Upgrade | Athenatec",
    seoDescription:
      "Discover how Athena executed a Critical Manufacturing MES upgrade and enterprise customization for a state-of-the-art sensor fab.",
    image: "/assets/images/image-1.webp",
    description:
      "Currently the client has implemented a CM MES solution for one of the large factory. The scope is for Athena to provide the CM MES product upgrade to the latest version, implement additional customization, include industry best practices, reports, and post deployment support.",
    formType: "cmf",
  },
];
