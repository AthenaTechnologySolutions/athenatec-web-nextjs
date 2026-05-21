import Image from "next/image";
import "./about.scss";
import { logos } from "../components/ClientLogos";
import ScrollReveal from "@/app/components/ScrollReveal";
import CTASection from "@/app/components/CTASection";
import HeroSection from "@/app/components/HeroSection";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Athenatec | MES, PLM & Smart Factory Experts",
  description:
    "Athenatec is a trusted MES implementation partner providing PLM, smart factory solutions, and digital transformation for global manufacturers since 2011.",
  path: "/about",
  image: "/assets/images/aboutus.webp",
  keywords: [
    "MES implementation partner",
    "smart factory experts",
    "Industry 4.0 consulting",
    "manufacturing technology experts",
  ],
});

export default function AboutPage() {
  const journey = [
    {
      year: "2011",
      title: "Established Foundations in Fremont California",
      image:
        "/assets/images/businessman-suit-putting-last-piece-pyramid-using-wooden-blocks-500x500.webp",
    },
    {
      year: "2015",
      title: "Expanding Capabilities",
      image:
        "/assets/images/standard-quality-control-collage-concept-500x500.webp",
    },
    {
      year: "2017",
      title: "Achieved ISO 9001 Certification",
      image:
        "/assets/images/iso-9001-concept-quality-control-management-iso-9001-500x500.webp",
    },
    {
      year: "2020",
      title: "Global Growth and Expanded Expertise",
      image:
        "/assets/images/global-business-adventures-expanding-horizons-with-international-connections-diverse-professional-500x500.webp",
    },
  ];
  const services = [
    {
      title: "Semiconductor",
      slug: "semiconductor",
      image: "/assets/images/Chip-Hand-Cropped.webp",
      desc: "Athena offers comprehensive PLM, MES, CMMS, and analytics services for the semiconductor industry, partnering with clients to deliver top solutions.",
    },
    {
      title: "Electronics",
      slug: "electronics",
      image:
        "/assets/images/neon-motherboard-background-scaled-e1724922449899.webp",
      desc: "Athena's MES Solutions for the Electronics Industry streamline high-volume production, ensuring product quality and high yield through efficient PCB, PCBA, Mechanical Assembly, box-build, and testing processes.",
    },
    {
      title: "MED Devices",
      slug: "medical-devices",
      image:
        "/assets/images/close-up-medical-orthodontist-equipment-modern-bright-office-scaled-e1724922792409.webp",
      desc: "Athena's proven expertise in medical device manufacturing and rapid implementations helps customers innovate, cut costs, and achieve high-quality products",
    },
    {
      title: "LED / Battery Manufacturing",
      slug: "led-battery-manufacturing",

      image:
        "/assets/images/futuristic-time-machine-scaled-e1724923036586.webp",
      desc: "Athena excels in addressing complex manufacturing challenges with rapid implementation, delivering a robust, integrated, and scalable data-centric enterprise.",
    },
    {
      title: "Solar",
      slug: "solar",
      image:
        "/assets/images/beautiful-alternative-energy-plant-with-solar-panels-scaled-e1724923416271.webp",
      desc: "Solar manufacturing's complexities, such as Applied Materials and SPC, demand advanced analytics and continuous experimentation. Athena's expertise and passion position us to effectively tackle these challenges.",
    },
  ];
  const testimonials = [
    {
      company: "PsiQuantum",
      name: "Alameda-Basora M",
      role: "Manager, Operations Data Software - PsiQuantum",
      image: "/assets/Clients/PSi-Quantum.webp",
      text: `We partnered with Athenatec to develop and scale our Manufacturing Execution System (MES) as our operations rapidly evolved from tracking individual wafers and decoupled processes to managing multiple production lines, diverse subassembly SKUs, and complex downstream workflows.Athenatec demonstrated a strong understanding of our requirements and consistently delivered high-quality solutions on time. Their ability to quickly develop API services enabled seamless integration between our engineering systems and their manufacturing platform, significantly improving operational efficiency while supporting our custom requirements.What stands out most is their team’s experience and adaptability. They are reliable, responsive, and collaborative, helping us navigate challenges and effectively interface with partners like Siemens to resolve complex issues.Athenatec has been a critical partner in scaling our manufacturing capabilities. I would strongly recommend them to any organization configuring, implementing, or optimizing an MES system.`,
    },
    {
      company: "InnovaFlex Foundry",
      name: "Jon Baker",
      role: "IT Manager – InnovaFlex Foundry",
      image: "/assets/Clients/InnovaFlex_Foundry.webp",
      text: `Athena provides expertise in MES and beyond.  They have proven extremely easy to work with, offering project management, SW development, integration, support and expertise ensuring projects are completed successfully.  I strongly recommend Athena for MES implementations or Opcenter upgrades.`,
    },
    {
      company: "Dexcom",
      name: "Wei Wu",
      role: "Senior Manager, IT",
      image: "/assets/Clients/Dexcom.webp",
      text: `“I strongly recommend Athena based on their exceptional performance and successful completion of our recent Camstar v8.9 launch. Their dedication, expertise, and professionalism have greatly contributed to the success of our project and have exceeded our expectations.
Throughout the project, Athena demonstrated an in-depth understanding of our unique requirements and objectives. They showcased their comprehensive knowledge of manufacturing processes, industry best practices, and Camstar latest version 8.9 solutions. Their ability to translate our complex needs into an efficient and tailored manufacturing execution system was truly remarkable. We have experienced improved productivity, streamlined workflows, enhanced quality control, and real-time visibility into our manufacturing processes. Their commitment to transparency and open communication fostered a strong working relationship, allowing us to have full confidence in their abilities.
Moreover, the post-implementation hypercare support provided by Athena has been exceptional. They have been responsive to our ongoing needs, promptly addressing any questions or concerns that arise. Their dedication to customer satisfaction and their commitment to ensuring the software’s continued optimal performance are highly commendable`,
    },
    {
      company: "Viavi",
      name: "Viavi",
      role: "",
      image: "/assets/Clients/VLAVI.webp",
      text: `Through Athena’s exhaustive efforts and deep domain expertise, we were able to implement a ‘Viavi Aligned Solution’ of Siemens Opcenter 8.x that met our complex MES System requirements. This was done via streamlined manufacturing processes, user friendly UI/ UX, seamless integration with our factory equipment / metrology and a single source for factory insights. Athena utilized Industry 4.0 foundations and architected a cookie-cutter approach that is ready for all our global factories.`,
    },
    {
      company: "MiaSolé Hi-Tech",
      name: "Siva Papaiya",
      role: "Senior Director, MiaSolé Hi-Tech",
      image: "/assets/Clients/Miasole.webp",
      text: `Athena team has unrivalled proficiency in manufacturing and their commitment towards successful execution has been a very positive experience.`,
    },
    {
      company: "GLO-USA",
      name: "GLO-USA",
      role: "",
      image: "/assets/Clients/GLO-USA.webp",
      text: `Great partnership with Athena! We appreciate Athena’s consistent dedication, attention to detail and innovative approach in delivering a Shop Floor Management solution that is enabling better visibility of our manufacturing resulting in improvements in both product quality and cost.`,
    },
    {
      company: "Nevro",
      name: "Alonso Moya",
      role: "Site Director, Nevro",
      image: "/assets/Clients/Nevro.webp",
      text: `Having a commercial partner is vital for an exemplary, seamless implementation, and throughout the development and setup of MES in Nevro Costa Rica, Athena has been a critical piece. With high support for our needs, Athena was always proactive in looking for critical and strategic solutions to the Business’s needs and taking care of the integrity and structure of the systems. It was a satisfactory experience to our liking due to all the knowledge transmitted during this journey of implementing MES in our plant.
An excellent partner for us.`,
    },
    {
      company: "Emcore",
      name: "Jamie Lohrungruang",
      role: "VP of Information Technology",
      image: "/assets/Clients/Emcore.webp",

      text: `We were very fortunate to have found Athena as they helped us turnaround our Opcenter Semi 8.9 MES project after our initial attempt working with a different Solution Integrator was unsuccessful. Their expertise of the OpCenter product along with their experience in semiconductor allowed them to help us completely change the design of the solution to better leverage best practices and meet our business needs. We cannot be happier working with Athena, and can see that they went above and beyond what was documented to make sure we are happy with the solution. They really came through for us. You will not be disappointed working with them.`,
    },
    {
      company: "Marki Microwave",
      name: "Marki Microwave",
      role: "",
      image: "/assets/Clients/Marki.webp",
      text: `We reviewed several MES suppliers and selected Siemens Opscenter MES / APS as the best fit for Marki Microwave. Selecting the platform is part of the journey but a successful implementation requires an experienced system integrator.
We choose Athena Technologies as our implementation partner as they had several successful implementations in the electronics / medical devices customers. The company resourced our project with an experienced project manager and technical team who were flexible and collaborated well with our small internal team to ensure we get the solution that fits the needs of our manufacturing operations. We used a phase and sprint approach to complete our implementation in a 9-month time frame.
We will continue to work together with Athena to carry out continuous process improvement and harmonization to deliver greater efficiency and quality to meet our customers’ demands today and well into the more digital future.`,
    },
    {
      company: "Conformis",
      name: "Conformis",
      role: "",
      image: "/assets/Clients/Conformis.webp",
      text: `A few years ago, Conformis was looking for a boutique Camstar consulting SI. Athena was selected and has continuously delivered on all projects, There was no red tape. as with larger organizations, and while still receiving all the proper documentation and validation.
“I am happy to consider Athena a Conformis partner”.`,
    },
    {
      company: "Neophotonics",
      name: "Aim Khan",
      role: "CIO / VP Neophotonics",
      image: "/assets/Clients/Neophotonics.webp",
      text: `Athena consistently exceeds our business targets, overcomes challenges and goes the extra mile.~ Great Company, Excellent Team and Partner.`,
    },
  ];

  return (
    <div className="about-page">
      <HeroSection
        title="About Us"
        description="Delivering innovative solutions that drive measurable business growth."
        image="/assets/images/aboutus.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <section className="achievements">
        <div className="container">
          <h2 className="section-title">Achievements and Success</h2>

          <div className="about-grid">
            <div className="about-text">
              <h3>About Us</h3>
              <p>
                Athena Technology Solutions provides advanced MES solutions
                tailored for industries such as Medical devices, Semiconductors,
                Discrete manufacturing, and Electronics manufacturing.
              </p>
              <p>
                Athena is an Industry 4.0 Enterprise Manufacturing Solutions
                Provider, assisting companies and driving their Industry 4.0
                roadmap centered on Digital Transformation.
              </p>
              <p>
                Our practice includes a full suite of Professional Services
                implementing PLM, MES, ERP, CMMS, and Smart Factory Analytics.
              </p>
            </div>

            <div className="about-image">
              <Image
                src="/assets/images/industry-4.0.webp"
                alt="Team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img"
              />
            </div>
          </div>

          <h3 className="journey-title">Our Journey of Growth & Excellence</h3>

          <div className="journey-grid">
            {journey.map((item, i) => (
              <div key={i} className="journey-card">
                <div className="card-img">
                  <Image
                    src={item.image}
                    alt={item.year}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="img"
                  />
                </div>
                <h4>{item.year}</h4>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="vision-section">
        <div className="container vision-grid">
          <div className="vision-image">
            <Image
              src="/assets/images/our-mission.webp"
              alt="Vision"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="img"
            />
          </div>

          <div className="vision-content">
            <h3>Our Vision & Mission</h3>
            <p>
              At Athena, we aspire to be a trusted leader in the realms of IIoT
              and Industry 4.0. Our goal is to empower businesses by digitally
              connecting their enterprises, enabling them to thrive in an
              increasingly competitive landscape.
            </p>
            <p>
              We are committed to delivering transformative digital
              manufacturing solutions that enhance operational efficiency and
              drive innovation.
            </p>
            <p>
              Through our dedication to excellence and passion for technology,
              we aim to redefine the future of manufacturing.
            </p>
          </div>
        </div>
      </section>
      <section className="services-section">
        <div className="container">
          <h4 className="small-heading">What we do</h4>
          <h2 className="big-heading">
            Comprehensive Solutions and Tailored Services
          </h2>
          <p className="section-desc">
            The core of our practice includes a full Suite of Professional
            Services, implementing integrated PLM, MES, ERP, CMMS, and Smart
            Factory Analytics, as well as Managed Services tailored to fit
            Customer needs.
          </p>
          <div className="services-grid">
            {services.map((item) => (
              <Link
                key={item.slug}
                href={`/siemens-opcenter-mes/${item.slug}`}
                className="service-card"
              >
                <div
                  className="card-top"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                >
                  <div className="overlay" />
                  <div className="card-content">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.desc}</p>

                    <div className="see-more">
                      <span>View {item.title} MES expertise</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12H19M19 12L13 6M19 12L13 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="customers-section">
        <div className="container">
          <h2 className="customers-title">Our Customers</h2>

          <div className="customers-grid">
            {logos
              .filter((logo) => logo.src.trim() !== "")
              .map((logo, index) => (
                <div key={index} className="customer-logo">
                  <div className="customer-logo-media">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      sizes="130px"
                      className="object-contain"
                      quality={80}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="about-testimonial-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="testimonial-title">Testimonial</h2>
          </ScrollReveal>

          <div className="testimonial-grid">
            {testimonials.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="testimonial-card">
                  <div className="card-header">
                    <div className="company-info">
                      <h4>{item.company}</h4>
                    </div>

                    {item.image && (
                      <div className="testimonial-logo-frame">
                        <Image
                          src={item.image}
                          alt={item.company}
                          fill
                          sizes="120px"
                          className="object-contain"
                          quality={80}
                        />
                      </div>
                    )}
                  </div>

                  <div className="card-body">
                    <p>{item.text}</p>
                  </div>

                  <div className="card-footer">
                    <strong>{item.name || ""}</strong>
                    {item.role && <span>{item.role}</span>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={
          <>
            A New <br /> Requirement?
          </>
        }
        description="Connect us for expert solutions in MES, PLM, ERP, and more. Reach out today."
        buttonText="Contact Us"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </div>
  );
}
