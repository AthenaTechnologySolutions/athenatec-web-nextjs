"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Lock, UserCheck } from "lucide-react";
import HeroSection from "@/app/components/HeroSection";
import "./cyber.scss";

export default function CyberSecurityServices() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const services = [
    {
      title: "GRC",
      description: "Governance, Risk & Compliance",
      icon: ShieldCheck,
      color: "from-[#1c4584] to-[#17ace4]",
    },
    {
      title: "IT Security",
      description:
        "VAPT / Infrastructure / Cloud Applications / Secure SDLC / SecDevOps",
      icon: Lock,
      color: "from-[#15356e] to-[#1c4584]",
    },
    {
      title: "vCISO",
      description: "Strategic Advisory / Program Management / Cyber Training",
      icon: UserCheck,
      color: "from-[#17ace4] to-[#1c4584]",
    },
  ];
  const products = [
    {
      name: "CyberArk",
      logo: "/assets/images/prd-icon-1.webp",
    },
    {
      name: "Saviynt",
      logo: "/assets/images/prd-icon-2.webp",
    },
    {
      name: "CrowdStrike",
      logo: "/assets/images/prd-icon-3.webp",
    },
    {
      name: "Trand",
      logo: "/assets/images/prd-icon-4.webp",
    },
    {
      name: "Mcafee",
      logo: "/assets/images/prd-icon-5.webp",
    },
    {
      name: "Metric",
      logo: "/assets/images/prd-icon-6.webp",
    },
    {
      name: "Rsa",
      logo: "/assets/images/prd-icon-7.webp",
    },
    {
      name: "Fortify",
      logo: "/assets/images/prd-icon-8.webp",
    },
    {
      name: "Burp",
      logo: "/assets/images/prd-icon-9.webp",
    },
    {
      name: "Nmap",
      logo: "/assets/images/prd-icon-10.webp",
    },
    {
      name: "IBM",
      logo: "/assets/images/prd-icon-11.webp",
    },
    {
      name: "Splunk",
      logo: "/assets/images/prd-icon-12.webp",
    },
    {
      name: "Alien",
      logo: "/assets/images/prd-icon-13.webp",
    },
    {
      name: "Log",
      logo: "/assets/images/prd-icon-14.webp",
    },
    {
      name: "Qualys",
      logo: "/assets/images/prd-icon-15.webp",
    },
    {
      name: "Seclore",
      logo: "/assets/images/prd-icon-16.webp",
    },
    {
      name: "tenable",
      logo: "/assets/images/prd-icon-17.webp",
    },
    {
      name: "Nagios",
      logo: "/assets/images/prd-icon-18.webp",
    },

    {
      name: "meta",
      logo: "/assets/images/prd-icon-19.webp",
    },
    {
      name: "IBM",
      logo: "/assets/images/prd-icon-20.webp",
    },
    {
      name: "onetrust",
      logo: "/assets/images/prd-icon-21.webp",
    },
    {
      name: "oneid",
      logo: "/assets/images/prd-icon-22.webp",
    },
    {
      name: "Ss",
      logo: "/assets/images/prd-icon-23.webp",
    },
    {
      name: "Know",
      logo: "/assets/images/prd-icon-24.webp",
    },
    {
      name: "Proof",
      logo: "/assets/images/prd-icon-25.webp",
    },
    {
      name: "acune",
      logo: "/assets/images/prd-icon-26.webp",
    },
    {
      name: "Immuni",
      logo: "/assets/images/prd-icon-27.webp",
    },
    {
      name: "Digital",
      logo: "/assets/images/prd-icon-28.webp",
    },
    {
      name: "Sop",
      logo: "/assets/images/prd-icon-29.webp",
    },
    {
      name: "Mobile",
      logo: "/assets/images/prd-icon-30.webp",
    },
  ];
  const accordionData = [
    {
      title: "Governance",
      items: [
        "IS Strategy",
        "Security Performance Measurement",
        "COBIT Compliance (IT Governance)",
      ],
    },
    {
      title: "Risk Management",
      items: [
        "Data Classification Solution Consulting",
        "DLP Solution Consulting",
        "IS Awareness Program",
        "IS Risk Assessment & Audit",
        "Secure Network Architecture Review",
      ],
    },
    {
      title: "Compliance",
      items: [
        "ISO 27001, ISO 27701, ISO 27018, ISO 20000, ISO 22301, ISO 9001",
        "PCI DSS, HIPAA",
        "NIST CSF, Integrated Compliance",
      ],
    },
  ];
  const whyAthena = [
    {
      icon: "/assets/icons/aim.svg",
      text: "Understand the organization’s strategy and business environment, its alignment.",
    },
    {
      icon: "/assets/icons/search.svg",
      text: "Evaluate current security posture.",
    },
    {
      icon: "/assets/icons/savings.svg",
      text: "Assist in defining acceptable risk levels and managing risk.",
    },
    {
      icon: "/assets/icons/protection.svg",
      text: "Assist in defining security budgets and cost-effective solutions.",
    },
    {
      icon: "/assets/icons/police-station.svg",
      text: "Institute a Security Program (“Secure by design”) and executive guidance.",
    },
    {
      icon: "/assets/icons/check.svg",
      text: "Anticipate future security and compliance challenges.",
    },
    {
      icon: "/assets/icons/security-check.svg",
      text: "Security policy, process, and procedure development.",
    },
    {
      icon: "/assets/icons/battery.svg",
      text: "Incident response planning.",
    },
    {
      icon: "/assets/icons/target.svg",
      text: "Provide threat analysis and strategy updates in real-time.",
    },
    {
      icon: "/assets/icons/training.svg",
      text: "Guide annual security planning and training.",
    },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Cyber Security Services",
            provider: {
              "@type": "Organization",
              name: "Athenatec",
              url: "https://www.athenatec.com/",
            },
            description:
              "Enterprise cyber security services including GRC, IT security, vCISO advisory, and compliance consulting.",
            areaServed: "Worldwide",
          }),
        }}
      />
      <HeroSection
        title="Cyber Security Service"
        description="Enterprise-grade security solutions tailored to your organization."
        image="/assets/images/CSS.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Cyber Security Services
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Comprehensive enterprise-grade security services designed to
              protect, monitor and strengthen your digital ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-10 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500 rounded-2xl bg-gradient-to-br ${service.color}`}
                  />

                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="text-white w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grc-section">
        <div className="container">
          <h2 className="section-title">GRC – Governance, Risk & Compliance</h2>

          <div className="grc-grid">
            <div className="grc-card">
              <h3>Governance</h3>
              <ul>
                <li>Policy Management, Guidelines & Best Practices</li>
                <li>Risk Management and services</li>
                <li>Cyber security Risk and Maturity</li>
                <li>Vendor / Third Party Risk Assessment</li>
                <li>Consulting, Assessment & Implementation</li>
                <li>ISO 27001, NIST, COBIT, PCI-DSS</li>
              </ul>
            </div>

            <div className="grc-card">
              <h3>Risk Management</h3>
              <ul>
                <li>Disaster Recovery Services</li>
                <li>Privacy requirements – GDPR, CCPA, HIPAA, PIPEDA</li>
                <li>Audits, Assessments & Certification Supports</li>
                <li>ISO, ISMS, ITSM, BCMS</li>
                <li>Information Security & Process</li>
              </ul>
            </div>

            <div className="grc-card">
              <h3>Compliance</h3>
              <ul>
                <li>Cyber awareness/training</li>
                <li>For Leaders & IS Managers</li>
                <li>Privacy Overview & Training</li>
                <li>
                  Technical certification(CompTIA, CEH, CISSP,CRISC, CISM)
                </li>
                <li>Secure SDLC, OWASP, NIST & CIS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="grc-detail">
        <div className="container">
          <div className="grc-detail__grid">
            <div className="grc-detail__visual">
              <Image
                src="/assets/images/06-5-e1732625944349.webp"
                alt="GRC Model"
                width={600}
                height={600}
              />
            </div>

            <div className="grc-detail__content">
              {accordionData.map((item, index) => (
                <div
                  key={index}
                  className={`accordion-item ${
                    activeIndex === index ? "active" : ""
                  }`}
                >
                  <div
                    className="accordion-header"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{item.title}</span>
                    <span className="icon">
                      {activeIndex === index ? "−" : "+"}
                    </span>
                  </div>

                  <div className="accordion-body">
                    <ul>
                      {item.items.map((li, i) => (
                        <li key={i}>{li}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="cyber-overview">
        <div className="container">
          <div className="cyber-overview__top">
            <h2 className="cyber-title">IT Cyber Security</h2>

            <div className="image-wrapper">
              <Image
                src="/assets/images/IT-Cyber-Security.webp"
                alt="IT Cyber Security"
                width={900}
                height={900}
                priority
                className="cyber-image"
              />
            </div>
          </div>

          <div className="why-athena">
            <h2 className="section-title">Why Athena?</h2>

            <div className="why-grid">
              {whyAthena.map((item, index) => (
                <div key={index} className="why-card">
                  <div className="why-icon-wrapper">
                    <div className="why-icon">
                      {" "}
                      <Image
                        src={item.icon}
                        alt="icon"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="why-content">
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="product-landscape">
        <div className="container">
          <h2 className="section-title">Product Landscape</h2>

          <div className="product-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <Image
                  src={product.logo}
                  alt={product.name}
                  width={160}
                  height={64}
                  sizes="160px"
                  className="h-auto w-auto object-contain"
                  quality={80}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
