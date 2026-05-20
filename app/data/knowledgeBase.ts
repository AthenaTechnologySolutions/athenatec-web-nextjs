 

export const companyInfo = {
  name: "Athenatec (Athena Technology Solutions)",
  tagline: "Best MES Solution Provider",
  website: "https://www.athenatec.com/",
  linkedin: "https://www.linkedin.com/company/athena-technology-solutions/",
  description:
    "Athenatec is a certified Siemens Alliance Partner specializing in Manufacturing Execution Systems (MES), PLM, and smart factory solutions. We help manufacturers in semiconductor, electronics, medical devices, and discrete manufacturing industries accelerate their Industry 4.0 digital transformation journey.",
  contactPage: "https://www.athenatec.com/contact/",
  demoPage: "https://www.athenatec.com/athena-accelerator-get-a-demo/",
};

export const services = [
  {
    name: "MES Implementation",
    description:
      "End-to-end implementation of Siemens Opcenter MES across semiconductor, electronics, medical device, and discrete manufacturing. Includes requirements analysis, system design, configuration, validation, and go-live support.",
  },
  {
    name: "System Integration",
    description:
      "Seamless integration of MES with ERP, PLM, SCADA, and other enterprise systems using Manufacturing Integration and Orchestration (MIO) for real-time data exchange across the production ecosystem.",
  },
  {
    name: "Validation & Compliance",
    description:
      "Regulatory compliance support including IQ/OQ/PQ validation, electronic Device History Records (eDHR), electronic Batch Records (eBR), and FDA 21 CFR Part 11 compliance for medical device and pharmaceutical manufacturers.",
  },
  {
    name: "Digital Transformation",
    description:
      "Industry 4.0 aligned digitalization strategies to gain holistic, enterprise-wide visibility of manufacturing operations. Paperless manufacturing, real-time analytics, and advanced operational intelligence.",
  },
  {
    name: "Advanced Planning & Scheduling (APS)",
    description:
      "Siemens Opcenter APS (formerly Preactor) implementation for optimized production scheduling, resource utilization, shortest cycle times, and on-time customer delivery. Creates closed-loop planning/scheduling processes.",
  },
  {
    name: "Siemens Mendix Low-Code Development",
    description:
      "Rapid enterprise application development using Siemens Mendix low-code platform. Build scalable digital solutions that integrate with MES and ERP for enhanced operational visibility and streamlined processes.",
  },
];

export const industries = [
  {
    name: "Semiconductor",
    description:
      "Opcenter Execution Semiconductor for front-end and back-end production including wafer fab, assembly, and test operations. Highest level of manufacturing process alignment, automation, statistical quality control, and instant intelligence.",
  },
  {
    name: "Electronics",
    description:
      "Opcenter Execution Electronics for PCB, PCBA, mechanical assembly, QA/test, and box-build production. Enables high variation of production mix, complexity, and volumes at the highest quality.",
  },
  {
    name: "Medical Devices",
    description:
      "Opcenter MES for Medical Devices with error-proofing processes, paperless manufacturing, electronic Device History Records (eDHR), electronic Batch Records (eBR), and full regulatory compliance support.",
  },
  {
    name: "Discrete Manufacturing",
    description:
      "Opcenter Execution Core for production and quality management. Highly configurable and scalable solution for central production management, monitoring, and significant quality improvements during manufacturing.",
  },
];

export const caseStudySummaries = [
  {
    title: "Medical Device MES Modernization (CGM Manufacturer)",
    summary:
      "Partnered with a global leader in continuous glucose monitoring (CGM) to modernize and integrate their MES. Upgraded across multiple Siemens Opcenter versions, enabled real-time system integration, and supported advanced R&D initiatives for scalable, reliable, future-ready manufacturing.",
  },
  {
    title: "Nevro Corp — Paper to Paperless MES",
    summary:
      "Helped Nevro, a global medical device company specializing in neuromodulation therapies, replace paper-based workflows with a fully digital, validated MES environment. Delivered Proof of Concept in 3 weeks, first phase in under 4 months with Siemens Opcenter Medical Device Suite 2310.",
  },
];

export const quickReplies = [
  {
    label: "💼 Our Services",
    value: "What services does Athenatec offer?",
  },
  {
    label: "🏭 Industries We Serve",
    value: "What industries does Athenatec serve?",
  },
  {
    label: "📋 Case Studies",
    value: "Can you share some case studies?",
  },
  {
    label: "🎯 Request a Demo",
    value: "I'd like to request a demo",
  },
  {
    label: "📞 Contact Us",
    value: "How can I contact Athenatec?",
  },
];

// Build the system prompt from all knowledge
export function buildSystemPrompt(userName?: string): string {
  const servicesList = services
    .map((s) => `- **${s.name}**: ${s.description}`)
    .join("\n");

  const industriesList = industries
    .map((i) => `- **${i.name}**: ${i.description}`)
    .join("\n");

  const caseStudiesList = caseStudySummaries
    .map((c) => `- **${c.title}**: ${c.summary}`)
    .join("\n");

  return `You are the Athenatec AI Assistant — a helpful, professional, and friendly chatbot for Athenatec (Athena Technology Solutions).

## About Athenatec
${companyInfo.description}

Website: ${companyInfo.website}
LinkedIn: ${companyInfo.linkedin}
Contact Page: ${companyInfo.contactPage}
Demo Request: ${companyInfo.demoPage}

## Our Services
${servicesList}

## Industries We Serve
${industriesList}

## Case Studies
${caseStudiesList}

## Key Facts
- Certified Siemens Alliance Partner
- Expertise in Siemens Opcenter (formerly Camstar)
- Headquarters in the US, serving US, Canada, and Asia
- Specializes in Industry 4.0 and smart factory solutions
- Core technologies: Siemens Opcenter MES, Mendix, APS (Preactor)

## Communication Guidelines
- Be warm, professional, and concise
- Keep responses to 2-4 sentences unless the user asks for detail
- Always be accurate about Athenatec's services — don't make up capabilities
- If you don't know something specific, direct them to the contact page: ${companyInfo.contactPage}
- When users ask about demos, direct them to: ${companyInfo.demoPage}
- When users want to get in touch, direct them to: ${companyInfo.contactPage}
${userName ? `- The user's name is ${userName}. Use it occasionally but not in every response.` : ""}
- Do NOT answer questions unrelated to Athenatec, manufacturing, MES, or related industries. Politely redirect them.
- Use emojis sparingly for friendliness.`;
}
