"use client";
import { useRouter } from "next/navigation";
import "./services.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import { homeFaqs } from "@/lib/home-faqs";
export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const router = useRouter();

  const autoScroll = useRef(
    AutoScroll({
      speed: 0.6, // lower = slower
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      containScroll: false,
    },
    [autoScroll.current],
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const faqs = homeFaqs;

  const testimonials = [
    {
      name: "Alameda-Basora M",
      image: "/assets/Clients/PSi-Quantum.webp",
      role: "Manager, Operations Data Software - PsiQuantum",
      text: "We partnered with Athenatec to develop and scale our Manufacturing Execution System (MES) as our operations rapidly evolved from tracking individual wafers and decoupled processes to managing multiple production lines, diverse subassembly SKUs, and complex downstream workflows.Athenatec demonstrated a strong understanding of our requirements and consistently delivered high-quality solutions on time. Their ability to quickly develop API services enabled seamless integration between our engineering systems and their manufacturing platform, significantly improving operational efficiency while supporting our custom requirements.What stands out most is their team’s experience and adaptability. They are reliable, responsive, and collaborative, helping us navigate challenges and effectively interface with partners like Siemens to resolve complex issues.Athenatec has been a critical partner in scaling our manufacturing capabilities. I would strongly recommend them to any organization configuring, implementing, or optimizing an MES system.",
    },
    {
      name: "Jon Baker",
      image: "/assets/Clients/InnovaFlex_Foundry.webp",
      role: "IT Manager – InnovaFlex Foundry",
      text: "Athena provides expertise in MES and beyond.  They have proven extremely easy to work with, offering project management, SW development, integration, support and expertise ensuring projects are completed successfully.  I strongly recommend Athena for MES implementations or Opcenter upgrades.",
    },
    {
      name: "Wei Wu",
      image: "/assets/Clients/Dexcom.webp",
      role: "Senior Manager, IT",
      text: "I strongly recommend Athena based on their exceptional performance and successful completion of our recent Camstar v8.9 launch. Their dedication, expertise, and professionalism have greatly contributed to the success of our project and have exceeded our expectations.Throughout the project, Athena demonstrated an in-depth understanding of our unique requirements and objectives.",
    },
    {
      name: "Siva Papaiya",
      image: "/assets/Clients/Miasole.webp",
      role: "Senior Director, MiaSole Hi-Tech",
      text: "Athena team has unrivalled proficiency in manufacturing and their commitment towards successful execution has been a very positive experience.",
    },
    {
      name: "Alonso Moya",
      image: "/assets/Clients/Nevro.webp",
      role: "Site Director, Nevro",
      text: "Having a commercial partner is vital for an exemplary, seamless implementation, and throughout the development and setup of MES in Nevro Costa Rica, Athena has been a criticalpiece. With high support for our needs, Athena was always proactive in looking for critical and strategic solutions to the Business’s needs and taking care of the integrity and structure of the systems. It was a satisfactory experience to our liking due to all the knowledge transmitted during this journey of implementing MES in our plant.An excellent partner for us.",
    },

    {
      name: "Viavi",
      image: "/assets/Clients/VLAVI.webp",
      text: "Through Athena’s exhaustive efforts and deep domain expertise, we were able to implement a ‘Viavi Aligned Solution’ of Siemens Opcenter 8.x that met our complex MES System requirements. This was done via streamlined manufacturing processes, user friendly UI/ UX, seamless integration with our factory equipment / metrology and a single source for factory insights. Athena utilized Industry 4.0 foundations and architected a cookie-cutter approach that is ready for all our global factories.",
    },
    {
      name: "Jamie Lohrungruang",
      image: "/assets/Clients/Emcore.webp",
      role: "VP of Information Technology",
      text: "We were very fortunate to have found Athena as they helped us turnaround our Opcenter Semi 8.9 MES project after our initial attempt working with a different Solution Integrator was unsuccessful. Their expertise of the OpCenter product along with their experience in semiconductor allowed them to help us completely change the design of the solution to better leverage best practices and meet our business needs. We cannot be happier working with Athena, and can see that they went above and beyond what was documented to make sure we are happy with the solution. They really came through for us. You will not be disappointed working with them.",
    },
    {
      name: "Aim Khan",
      image: "/assets/Clients/Neophotonics.webp",
      role: "CIO / VP, Neophotonics",
      text: "Athena consistently exceeds our business targets, overcomes challenges and goes the extra mile.~ Great Company, Excellent Team and Partner.",
    },
    {
      name: "Glo-USA",
      image: "/assets/Clients/GLO-USA.webp",
      // role: "Manufacturing Leadership Team",
      text: "Great partnership with Athena! We appreciate Athena’s consistent dedication, attention to detail and innovative approach in delivering a Shop Floor Management solution that is enabling better visibility of our manufacturing resulting in improvements in both product quality and cost.",
    },
    {
      name: "Marki Microwave",
      image: "/assets/Clients/Marki.webp",
      // role: "Manufacturing Operations",
      text: "We reviewed several MES suppliers and selected Siemens Opscenter MES / APS as the best fit for Marki Microwave. Selecting the platform is part of the journey but a successful implementation requires an experienced system integrator.We choose Athena Technologies as our implementation partner as they had several successful implementations in the electronics / medical devices customers. The company resourced our project with an experienced project manager and technical team who were flexible and collaborated well with our small internal team to ensure we get the solution that fits the needs of our manufacturing operations. We used a phase and sprint approach to complete our implementation in a 9-month time frame.We will continue to work together with Athena to carry out continuous process improvement and harmonization to deliver greater efficiency and quality to meet our customers’ demands today and well into the more digital future.",
    },
    {
      name: "Conformis",
      image: "/assets/Clients/Conformis.webp",
      // role: "Manufacturing Systems",
      text: "A few years ago, Conformis was looking for a boutique Camstar consulting SI. Athena was selected and has continuously delivered on all projects, There was no red tape. as with larger organizations, and while still receiving all the proper documentation and validation.“I am happy to consider Athena a Conformis partner”.",
    },
  ];

  const managedServices = [
    {
      title: "Application Support",
      headlinePrefix: "Enterprise-grade IT stability for",
      headlineHighlight: "Application Support",
      badge: "24/7 Operations",
      description:
        "Athena's global application experts deliver dedicated around-the-clock maintenance and support across mission-critical enterprise applications, ensuring continuous manufacturing uptime.",
      points: [
        "Athena's Global Application experts offer support for a wide range of Enterprise Applications.",
        "Supported platforms include Oracle R12 EBS, Agile PLM, and Siemens MOM Camstar MES.",
        "Flexible pricing structures are available, tailored to meet customer needs and budgets.",
      ],
      bgImage:
        "/assets/images/businessman-using-laptop-while-showing-icon-cloud-files-technology-innovation-virtual-screen-concept-data-management-system-scaled-1.webp",
      bgPosition: "left top",
    },
    {
      title: "Automation Testing",
      headlinePrefix: "Zero-defect releases powered by",
      headlineHighlight: "Automation Testing",
      badge: "Quality Assurance",
      description:
        "Our Automated Systems Testing Suite delivers rigorous script-based validation for manufacturing execution systems, accelerating release cycles while eliminating production disruption.",
      points: [
        "Our Automated Systems Testing Suite delivers rigorous script-based testing for production releases.",
        "Ensures a smooth, error free release process.",
        "Achieves faster, more cost-effective deployments.",
      ],
      bgImage:
        "/assets/images/sap-system-software-automation-concept-virtual-screen-data-center-scaled.webp",
    },
    {
      title: "Defect & Ticket Tracking",
      headlinePrefix: "Closed-loop issue management with",
      headlineHighlight: "Defect Tracking",
      badge: "Continuous Improvement",
      description:
        "In manufacturing, effective issue tracking and remediation require a strong Root Cause Analysis (RCA) process. We implement CaPa-driven resolution to eliminate recurring operational setbacks.",
      points: [
        "In manufacturing, effective issue tracking and remediation require a strong Root Cause Analysis (RCA) process.",
        "Manufacturers that implement a closed-loop system for tracking issues through RCA, along with corrective and preventative actions, become industry leaders.",
        "We provide timely notifications at critical threshold levels, ensuring issues are addressed before they impact users or business operations.",
      ],
      bgImage:
        "/assets/images/businessman-compliance-rules-law-regulation-policy-virtual-screen-documents-with-checkbox-lists-1920x1277.webp",
    },
    {
      title: "Remote Monitoring",
      headlinePrefix: "Proactive 24/7 visibility & uptime with",
      headlineHighlight: "Remote Monitoring",
      badge: "Real-Time Observability",
      description:
        "Always-on telemetry and real-time health monitoring across applications, databases, networks, and server hardware, alerting engineers before issues reach the factory floor.",
      points: [
        "The quality of services depends on uptime and performance.",
        "Athena offers flexible solutions for remote monitoring and remediation across Applications, Databases, Networks, OS, and Server Hardware.",
        "We provide timely notifications at critical threshold levels, ensuring issues are addressed before they impact users or business operations.",
      ],
      bgImage:
        "/assets/images/man-hard-hat-is-holding-tablet-front-blue-white-background-scaled.webp",
    },
    {
      title: "Staff Augmentation",
      headlinePrefix: "Scale domain engineering teams with",
      headlineHighlight: "Staff Augmentation",
      badge: "Specialized Talent",
      description:
        "On-demand MES, PLM, and software engineering talent to navigate peak workloads, migrations, and specialized implementations without lengthy recruitment delays.",
      points: [
        "Athena understands that during challenging times, temporary expertise is often preferred over permanent hires to manage peak workloads.",
        "Our Staff Augmentation Services cover a wide range of needs, including Enterprise Application Support, Software Development and Testing, and Infrastructure Support.",
        "We offer flexible pricing models based on Off-shore or Near-shore solutions to meet each customer’s specific requirements.",
      ],
      bgImage: "/assets/images/careers.webp",
    },
  ];

  const [managedSliderRef, managedSliderApi] = useEmblaCarousel({
    loop: true,
    duration: 35,
  });

  const onManagedSelect = useCallback(() => {
    if (!managedSliderApi) return;
    setActive(managedSliderApi.selectedScrollSnap());
  }, [managedSliderApi]);

  useEffect(() => {
    if (!managedSliderApi) return;
    managedSliderApi.on("select", onManagedSelect);
    return () => {
      managedSliderApi.off("select", onManagedSelect);
    };
  }, [managedSliderApi, onManagedSelect]);

  const handleManagedTabChange = (index: number) => {
    setActive(index);
    managedSliderApi?.scrollTo(index);
  };

  const scrollPrevManaged = () => managedSliderApi?.scrollPrev();
  const scrollNextManaged = () => managedSliderApi?.scrollNext();

  const [isSliderHovered, setIsSliderHovered] = useState(false);
  useEffect(() => {
    if (!managedSliderApi || isSliderHovered) return;
    const interval = setInterval(() => {
      managedSliderApi.scrollNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [managedSliderApi, isSliderHovered]);


  return (
    <>
      <section className="services">
        <div className="container">
          <h2 className="services-title">Athena Professional Services</h2>

          <div className="services-timeline">
            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/discover.svg"
                  alt="Discovery"
                  width={80}
                  height={80}
                />
              }
              title="Discovery"
              items={[
                "Requirements",
                "POC’s",
                "Software Selection",
                "Scope Definition",
                "Project Planning",
              ]}
            />

            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/design.svg"
                  alt="Design"
                  width={80}
                  height={80}
                />
              }
              title="Design"
              items={[
                "Solution Design",
                "Custom Requirements",
                "Functional Specifications",
                "Use Cases",
              ]}
            />

            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/deploy.svg"
                  alt="Develop"
                  width={80}
                  height={80}
                />
              }
              title="Develop"
              items={[
                "Software Development",
                "Unit / System Testing",
                "Source Code Control",
                "Package / Delivery",
              ]}
            />

            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/implement.svg"
                  alt="Implement"
                  width={80}
                  height={80}
                />
              }
              title="Implement"
              items={[
                "Integration Testing",
                "Conference Room Pilots",
                "User Acceptance",
                "User Training",
                "Cutover Strategy",
              ]}
            />

            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/technical-support.svg"
                  alt="Support"
                  width={80}
                  height={80}
                />
              }
              title="Support"
              items={[
                "Sustained Support",
                "User Adoption",
                "Continuous Improvement",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="managed-switch">
        <div className="container">
          <div className="managed-header">
            <h2 className="managed-title">Athena Managed Services</h2>
          </div>

          {/* Horizontal Tabs Bar (matching modern reference) */}
          <div className="managed-tabs-container">
            <div className="managed-tabs-nav" role="tablist">
              {managedServices.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`managed-tab-item ${i === active ? "active" : ""}`}
                  onClick={() => handleManagedTabChange(i)}
                >
                  <span className="tab-label">{item.title}</span>
                  {i === active && <span className="tab-indicator" />}
                </button>
              ))}
            </div>
          </div>

          {/* Smooth Slider Viewport & Banner Card */}
          <div
            className="managed-slider-viewport"
            ref={managedSliderRef}
            onMouseEnter={() => setIsSliderHovered(true)}
            onMouseLeave={() => setIsSliderHovered(false)}
          >
            <div className="managed-slider-container">
              {managedServices.map((item, i) => (
                <div className="managed-slider-slide" key={i}>
                  <div className="managed-banner-card">
                    {/* Background Photography Image */}
                    <div className="managed-banner-media">
                      <Image
                        src={item.bgImage}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1240px) 100vw, 1240px"
                        priority={i === 0}
                        className="managed-bg-image"
                        style={item.bgPosition ? { objectPosition: item.bgPosition } : undefined}
                        quality={85}
                      />
                      <div className="managed-banner-overlay" />
                    </div>

                    {/* Floating White Card on Left */}
                    <div className="managed-floating-card">
                      <span className="managed-service-badge">{item.badge}</span>
                      <h3 className="managed-card-title">
                        {item.headlinePrefix}{" "}
                        <span className="managed-card-highlight">{item.headlineHighlight}</span>
                      </h3>
                      <p className="managed-card-desc">{item.description}</p>

                      <ul className="managed-card-points">
                        {item.points.map((pt, idx) => (
                          <li key={idx}>
                            <CheckCircle2 className="point-icon" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Slider Navigation Arrows */}
                    <div className="managed-slider-controls">
                      <button
                        type="button"
                        onClick={scrollPrevManaged}
                        className="managed-control-btn"
                        aria-label="Previous service"
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        type="button"
                        onClick={scrollNextManaged}
                        className="managed-control-btn"
                        aria-label="Next service"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="why-us">
        <div className="container why-us-grid">
          <div className="why-us-content">
            <span className="why-us-label">WHY US</span>
            <h2>MES Implementation Expertise, Innovation, and Global Delivery</h2>
            <p>
              At Athena, we blend deep industry expertise with a commitment to
              excellence, offering a comprehensive range of services tailored to
              meet your unique needs. From our origins in Fremont, California,
              to our global presence today, our track record of innovation and
              client satisfaction underscores why we are a trusted partner in
              technology and manufacturing solutions.
            </p>
            <Link href="/about" className="why-us-btn">
              Review Athenatec manufacturing expertise
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <h2 className="testimonial-title">Meet Our Happy Customers</h2>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="embla__slide"
                onClick={() => router.push("/about")}
              >
                <div className="testimonial-card">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={110}
                    height={72}
                    className="avatar rounded-full object-cover"
                    quality={80}
                  />
                  <h3>{item.name}</h3>
                  <div className="role">{item.role}</div>
                  <p className="testimonial-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-overlay" />

          <div className="cta-content">
            <h2>
              A New <br />
              Requirement?
            </h2>

            <p>
              Connect us for expert solutions in MES, PLM, ERP, and more. Reach
              out today. Our dedicated team is here to assist you!
            </p>

            <Link href="/contact" className="cta-button">
              Talk to an MES implementation consultant
            </Link>

            <span className="cta-subtext">
              We typically respond within 24 hours.
            </span>
          </div>
        </div>
      </section>

      <section className="why-us-faq">
        <div className="container">
          <h2 className="faq-title">FAQ</h2>

          <div className="faq-grid">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <div className="faq-left">
                      <span className="faq-number">{i + 1}</span>
                      <span className="faq-text">{item.q}</span>
                    </div>

                    <span className="faq-arrow">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {isOpen && <p className="faq-answer">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
function TimelineStep({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="timeline-step">
      <div className="timeline-node">{icon}</div>

      <div className="timeline-content">
        <h3>{title}</h3>
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
