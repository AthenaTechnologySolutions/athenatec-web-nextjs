"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import "./whoWeAre.scss";

// ── Animated counter ───────────────────────────────────────────────────────────
function AnimatedCounter({
  end,
  suffix = "+",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// ── Video player ───────────────────────────────────────────────────────────────
function VideoPlayer() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="wwa-video-wrap">
      {isLoaded ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="none"
          poster="/assets/images/video_banner.webp"
          className="wwa-video"
        >
          <source src="/assets/videos/aps.mp4" type="video/mp4" />
        </video>
      ) : (
        <button
          type="button"
          className="wwa-video-poster"
          aria-label="Play Athena professional services video"
          onClick={() => setIsLoaded(true)}
        >
          <Image
            src="/assets/images/video_banner.webp"
            alt="Athena application support video"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
            quality={75}
          />
          <span className="wwa-video-overlay" aria-hidden />
          <span className="wwa-play-btn" aria-hidden>
            <span className="wwa-play-icon" />
          </span>
        </button>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function WhoWeAre() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          WHO WE ARE — Hero intro section
      ═══════════════════════════════════════════════════ */}
      <section className="wwa-section" id="who-we-are">
        <div className="wwa-bg" aria-hidden>
          <div className="wwa-bg__grid" />
          <div className="wwa-bg__blob wwa-bg__blob--1" />
          <div className="wwa-bg__blob wwa-bg__blob--2" />
        </div>

        <div className="container wwa-grid">
          {/* Content */}
          <motion.div
            className="wwa-content"
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="wwa-eyebrow">Who We Are</span>

            <h2 className="wwa-title">
              Seamless Support from{" "}
              <span className="wwa-title--accent">Prototyping</span> to Delivery
            </h2>

            <p className="wwa-desc">
              Athena specializes in the implementation of MES (Manufacturing
              Execution Systems) and integration, seamlessly connecting with all
              other enterprise systems and Equipment to optimize the entire
              manufacturing process. From prototyping to delivery, our dedicated
              teams work closely with clients to ensure smooth, efficient program
              execution, enabling greater visibility and control at every stage.
            </p>

            <Link href="/about" className="wwa-btn">
              <span>Explore Us</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            className="wwa-image-wrap"
            initial={{ opacity: 0, x: 48, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="wwa-image-frame">
              <Image
                src="/assets/images/Prototyping-to-Delivery.webp"
                alt="Prototyping to Delivery"
                width={600}
                height={400}
                className="wwa-image"
                quality={85}
              />
              <div className="wwa-image-glow" aria-hidden />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PARTNERS
      ═══════════════════════════════════════════════════ */}
      <section className="partners-section" id="partners">
        <div className="container">
          <motion.h3
            className="partners-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Our Strategic Technology Partnerships
          </motion.h3>

          <div className="partners-grid">
            <div className="partner-card">
              <Image
                src="/assets/images/images-3.webp"
                alt="Siemens"
                width={180}
                height={72}
                className="partner-logo h-auto w-auto object-contain"
                quality={80}
              />

              <h4>Siemens Alliance Partner</h4>

              <p>
                As a trusted Siemens Alliance Partner, Athena boasts an
                excellent team specializing in the implementation and upgrade of
                Opcenter solutions, driving innovation and operational
                efficiency across industries including Semiconductor,
                Electronics, Medical Devices, Discrete Manufacturing, and Clean
                Energy.
              </p>
              <Link href="/siemens-opcenter-mes" className="partner-btn">
                Know More
              </Link>
            </div>

            <div className="partner-card">
              <Image
                src="/assets/images/critical_manufacturing_logo-e1727901256634-1.webp"
                alt="Critical Manufacturing"
                width={180}
                height={72}
                className="partner-logo h-auto w-auto object-contain"
                quality={80}
              />

              <h4>Critical Manufacturing Premier Partner</h4>

              <p>
                As a Critical Manufacturing Premier Partner, our certified team
                of experts specializes in implementing Critical Manufacturing
                MES, delivering customized solutions that ensure seamless
                integration and optimize performance throughout your entire
                manufacturing process.
              </p>

              <Link href="/critical-manufacturing" className="partner-btn">
                Know More
              </Link>
            </div>

            {/* <div className="partner-card">
              <Image
                src="/assets/images/00.webp"
                alt="Eyelit"
                width={180}
                height={72}
                className="partner-logo h-auto w-auto object-contain"
                quality={80}
              />

              <h4>Eyelit Implementation Partner</h4>

              <p>
                As an implementation partner of Eyelit Technologies, Athena
                Technology Solutions brings extensive expertise in deploying
                both Eyelit MES and Equipment Connect across various industries
                such as semiconductor, solar, LED/laser diode, and medical
                devices.
              </p>

              <Link href="/eyelit" className="partner-btn">
                Know More
              </Link>
            </div> */}
            <div className="partner-card">
              <Image
                src="/assets/Clients/twinzo-img.webp"
                alt="Twinzo"
                width={180}
                height={72}
                className="partner-logo h-auto w-auto object-contain"
                quality={80}
              />

              <h4>Twinzo Authorized Reseller Partner</h4>

              <p>
                Authorized Twinzo reseller and implementation partner providing
                industrial digital twin and smart factory solutions. We help
                manufacturers adopt real-time visualization, performance
                monitoring, and data-driven operations across sectors.
              </p>

              <Link
                href="/blog/authorised-reseller-partnership-with-twinzo"
                className="partner-btn"
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          WHAT WE DO
      ═══════════════════════════════════════════════════ */}
      <section className="what-we-do" id="what-we-do">
        <div className="what-container">
          <div className="what-media">
            <div className="what-image-wrapper">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-md"
              >
                <source src="/assets/videos/aps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <motion.div className="what-content">
            <span className="section-eyebrow">WHAT WE DO</span>

            <h2 className="what-title">
              Comprehensive Professional <br /> and Managed Services
            </h2>

            <p className="what-text">
              Central to our expertise is a robust suite of professional
              services, focused on the end-to-end implementation of MES
              (Manufacturing Execution Systems), as well as PLM, ERP, CMMS,
              Smart Factory Analytics, and customized Managed Services, all
              engineered to enhance efficiency and drive digital transformation.
            </p>

            <div className="divider" />

            <div className="stats">
              <div className="stat">
                <div className="stat-value">
                  <AnimatedCounter end={100} />
                </div>
                <div className="stat-label">Project Excellence</div>
              </div>
              <div className="stat">
                <div className="stat-value">
                  <AnimatedCounter end={60} />
                </div>
                <div className="stat-label">Client Success Stories</div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>
    </>
  );
}
