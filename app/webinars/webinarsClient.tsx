"use client";

import { useState } from "react";
import Link from "next/link";
import "./web.scss";
import HeroSection from "@/app/components/HeroSection";
import Image from "next/image";

type WebinarType = "live" | "ondemand";

interface Webinar {
  title: string;
  slug: string;
  image: string;
  type: WebinarType;
  date: string;
  time: string;
  description: string;
  externalUrl?: string;
  ctaText?: string;
}

const webinarData: Webinar[] = [
  {
    title: "Athena introduces its Shop Floor Mobility Accelerator",
    slug: "shop-floor-mobility-accelerator-webinar",
    image: "/assets/images/shopfloor.webp",
    type: "ondemand",
    date: "July 30, 2026",
    time: "",
    description:
      "Watch our webinar on how the Shop Floor Mobility Accelerator unlocks real dollar and productivity benefits.",
    ctaText: "Download Now",
  },
  {
    title:
      "Building the Future of Manufacturing: Achieving Scalability and Compliance with Siemens and Athena",
    slug: "building-future-manufacturing-siemens-athena",
    image: "/assets/images/webiner-banner.webp",
    type: "ondemand",
    date: "",
    time: "",
    description:
      "How top manufacturers are closing the gap between PLM, MES, and shop floor execution.",
  },
  {
    title: "Gain End-to-End Visibility in Medical Device Manufacturing",
    slug: "medical-device-visibility",
    image: "/assets/images/Gain-End-to-End-Visibility-in-Medical-Device.webp",
    type: "ondemand",
    date: "",
    time: "",
    description:
      "Explore how real-time data visibility transforms quality control and compliance across the entire production lifecycle.",
  },
  {
    title: "Accelerate MedTech Manufacturing with a Modern MES Accelerator",
    slug: "medtech-mes-accelerator",
    image: "/assets/images/Med-Mes.webp",
    type: "ondemand",
    date: "",
    time: "",
    description:
      "Learn how digital transformation streamlines production systems and accelerates time-to-market for medical devices.",
  },
];

export default function Webinars() {
  const [filter, setFilter] = useState<"all" | WebinarType>("all");

  const filtered =
    filter === "all"
      ? webinarData
      : webinarData.filter((item) => item.type === filter);

  return (
    <>
      <HeroSection
        title="Webinars"
        description="Leave us a little info, and we'll be in touch."
        image="/assets/images/webinars.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />

      <div className="webinars-page">
         <section className="webinars-filter">
          <div className="filter-inner">
            <p className="filter-label">Browse by:</p>
            <div className="filter-tabs">
              {["all", "live", "ondemand"].map((tab) => (
                <button
                  key={tab}
                  className={`filter-btn ${filter === tab ? "active" : ""}`}
                  onClick={() => setFilter(tab as "all" | WebinarType)}
                >
                  {tab === "all"
                    ? "All Sessions"
                    : tab === "live"
                      ? "Upcoming Live"
                      : "On-Demand"}
                </button>
              ))}
            </div>
          </div>
        </section>

         <div className="webinars-count">
          <span>{filtered.length} session{filtered.length !== 1 ? "s" : ""} found</span>
        </div>

         <section className="webinars-grid">
          {filtered.map((webinar, i) => (
            <article
              key={webinar.slug}
              className="webinar-card"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="card-image">
                <Image
                  src={webinar.image}
                  width={600}
                  height={380}
                  alt={webinar.title}
                />
                <div className="card-image-overlay" />
                <span className={`badge badge--${webinar.type}`}>
                  {webinar.type === "live" ? (
                    <><span className="badge-dot" />Live</>
                  ) : (
                    "On‑Demand"
                  )}
                </span>
              </div>

              <div className="card-body">
                {(webinar.date || webinar.time) && (
                  <div className="card-meta">
                    {webinar.date && (
                      <span className="meta-item">
                        <Image
                          src="/assets/icons/calendar.svg"
                          width={14}
                          height={14}
                          alt="date"
                        />
                        {webinar.date}
                      </span>
                    )}
                    {webinar.date && webinar.time && <span className="meta-divider" />}
                    {webinar.time && (
                      <span className="meta-item">
                        <Image
                          src="/assets/icons/clock.svg"
                          width={14}
                          height={14}
                          alt="time"
                        />
                        {webinar.time}
                      </span>
                    )}
                  </div>
                )}

                <h3 className="card-title">{webinar.title}</h3>
                <p className="card-description">{webinar.description}</p>

                <div className="card-footer">
                  {webinar.externalUrl ? (
                    <a
                      href={webinar.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-btn"
                    >
                      <span>{webinar.ctaText || "Register Now"}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={`/webinars/${webinar.slug}`}
                      className="card-btn"
                    >
                      <span>{webinar.ctaText || "Download Now"}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        {filtered.length === 0 && (
          <div className="webinars-empty">
            <p>No sessions found for this filter.</p>
          </div>
        )}
      </div>
    </>
  );
}
