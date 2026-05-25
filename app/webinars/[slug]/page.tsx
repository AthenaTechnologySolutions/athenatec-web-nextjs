"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import "./webinar.scss";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  companyName: string;
  jobTitle: string;
  industry: string;
  receiveUpdates: boolean;
  agreePolicy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  companyName?: string;
  jobTitle?: string;
  industry?: string;
  agreePolicy?: string;
}

const INDUSTRIES = ["Medical Devices", "Other"];

const MEDTECH_MES_RECORDING_URL =
  "https://zoom.us/rec/share/IPqPCIvoKLPUDAj8UkwaYArrT8lLUTe1ZTs7cv63Cvp_xT-727JtF97t0o5OzEtT.OZG81X_pSQ8vnj8t";

const FUTURE_MANUFACTURING_RECORDING_URL =
  "https://zoom.us/rec/play/i2q4e14SuIQYUychdC-32YIrFkJLsIl0_EA3vbwYFWUsgKG4iIHn_YlmKCUvdvtaxDMQvBG9H1u_vPol.L3nkTxEkM-MY0Y0u?eagerLoadZvaPages=sidemenu.billing.plan_management&accessLevel=meeting&canPlayFromShare=true&from=share_recording_detail&startTime=1777562686000&oldStyle=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fzoom.us%2Frec%2Fshare%2FDSO9sNYMc62nKqYRVZ5l1OuQRqTBN5wZCLF9ORotWW5RnjY_shFT53HoSGn9upbo.E_pZlfSoUzCVdqP3%3FstartTime%3D1777562686000";

interface WebinarFormProps {
  recordingUrl?: string;
}

function WebinarForm({
  recordingUrl = MEDTECH_MES_RECORDING_URL,
}: WebinarFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    jobTitle: "",
    industry: "",
    receiveUpdates: false,
    agreePolicy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Full name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email address.";
    if (!formData.companyName.trim())
      e.companyName = "Company name is required.";
    if (!formData.jobTitle.trim()) e.jobTitle = "Job title is required.";
    if (!formData.industry) e.industry = "Please select your industry.";
    if (!formData.agreePolicy)
      e.agreePolicy = "You must agree to the privacy policy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setSubmitting(true);

    try {
      const CF7_FORM_ID = "231536";
      const CF7_URL = `/api/cf7/${CF7_FORM_ID}`;

      const fd = new FormData();
      fd.append("_wpcf7", CF7_FORM_ID);
      fd.append("_wpcf7_version", "5.9");
      fd.append("_wpcf7_locale", "en_US");
      fd.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
      fd.append("_wpcf7_container_post", "0");

      fd.append("your-name", formData.name.trim());
      fd.append("your-email", formData.email.trim().toLowerCase());
      fd.append("company-name", formData.companyName.trim());
      fd.append("job", formData.jobTitle.trim());
      fd.append("industries", formData.industry);
      fd.append("page-url", window.location.href);

      if (formData.receiveUpdates) {
        fd.append(
          "receive",
          "I would like to receive relevant updates and resources from Athena Technology Solutions.",
        );
      }

      if (formData.agreePolicy) {
        fd.append("checkbox-649", "I agree*");
      }

      const res = await fetch(CF7_URL, { method: "POST", body: fd });
      const json = await res.json();

      if (json.status !== "mail_sent")
        throw new Error(json.message || "Something went wrong.");
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const val = type === "checkbox" ? target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ── Success ─────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="wf-success">
        <div className="wf-success__icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3>You&apos;re all set!</h3>
        <p>
          Your webinar access is ready for <strong>{formData.email}</strong>.
          <br />
          Use the button below to open the webinar replay.
        </p>
        <a
          href={recordingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wf-watch-btn"
        >
          Download Webinar Replay →
        </a>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <form className="wf-form" onSubmit={handleSubmit} noValidate>
      <div className={`wf-field ${errors.name ? "wf-field--error" : ""}`}>
        <label htmlFor="wf-name">
          Full Name <span className="wf-required">*</span>
        </label>
        <div className="wf-input-wrap">
          <svg
            className="wf-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <input
            id="wf-name"
            name="name"
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        {errors.name && <span className="wf-error-msg">{errors.name}</span>}
      </div>

      <div className={`wf-field ${errors.email ? "wf-field--error" : ""}`}>
        <label htmlFor="wf-email">
          Work Email <span className="wf-required">*</span>
        </label>
        <div className="wf-input-wrap">
          <svg
            className="wf-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <input
            id="wf-email"
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <span className="wf-error-msg">{errors.email}</span>}
      </div>

      <div className="wf-row">
        <div
          className={`wf-field ${errors.companyName ? "wf-field--error" : ""}`}
        >
          <label htmlFor="wf-company">
            Company <span className="wf-required">*</span>
          </label>
          <div className="wf-input-wrap">
            <svg
              className="wf-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
            <input
              id="wf-company"
              name="companyName"
              type="text"
              placeholder="Company name"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          {errors.companyName && (
            <span className="wf-error-msg">{errors.companyName}</span>
          )}
        </div>

        <div className={`wf-field ${errors.jobTitle ? "wf-field--error" : ""}`}>
          <label htmlFor="wf-jobtitle">
            Job Title <span className="wf-required">*</span>
          </label>
          <div className="wf-input-wrap">
            <svg
              className="wf-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <input
              id="wf-jobtitle"
              name="jobTitle"
              type="text"
              placeholder="Your role"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>
          {errors.jobTitle && (
            <span className="wf-error-msg">{errors.jobTitle}</span>
          )}
        </div>
      </div>

      <div className={`wf-field ${errors.industry ? "wf-field--error" : ""}`}>
        <label htmlFor="wf-industry">
          Industry <span className="wf-required">*</span>
        </label>
        <div className="wf-select-wrap">
          <svg
            className="wf-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          <select
            id="wf-industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          >
            <option value="">Select your industry…</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          <svg
            className="wf-chevron"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {errors.industry && (
          <span className="wf-error-msg">{errors.industry}</span>
        )}
      </div>

      <label className="wf-checkbox">
        <input
          type="checkbox"
          name="receiveUpdates"
          checked={formData.receiveUpdates}
          onChange={handleChange}
        />
        <span className="wf-checkbox__box" />
        <span className="wf-checkbox__label">
          I&apos;d like to receive relevant updates and resources from Athena
          Technology Solutions.
        </span>
      </label>

      <p className="wf-privacy-note">
        By registering, you agree to our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> and consent to
        receive communications about this event and related content.
      </p>

      <label
        className={`wf-checkbox ${errors.agreePolicy ? "wf-checkbox--error" : ""}`}
      >
        <input
          type="checkbox"
          name="agreePolicy"
          checked={formData.agreePolicy}
          onChange={handleChange}
        />
        <span className="wf-checkbox__box" />
        <span className="wf-checkbox__label">
          I agree <span className="wf-required">*</span>
        </span>
      </label>
      {errors.agreePolicy && (
        <span className="wf-error-msg">{errors.agreePolicy}</span>
      )}

      {submitError && (
        <div className="wf-submit-error">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {submitError}
        </div>
      )}

      <button type="submit" className="wf-submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="wf-spinner" /> Submitting…
          </>
        ) : (
          <>
            Download Now
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root Page — client-side slug routing
// ─────────────────────────────────────────────────────────────────────────────

export default function WebinarSinglePage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  if (slug === "building-future-manufacturing-siemens-athena")
    return <FutureManufacturingLayout />;
  if (slug === "medical-device-visibility") return <MedicalVisibilityLayout />;
  if (slug === "medtech-mes-accelerator") return <MedtechMESLayout />;

  return (
    <div style={{ padding: "140px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: 32 }}>404 — Page not found</h1>
    </div>
  );
}

function FutureManufacturingLayout() {
  return (
    <>
      <section className="single-hero webinar-siemens-hero">
        <Image
          src="/assets/images/webiner-banner.webp"
          alt="Smart manufacturing operations"
          fill
          priority
          className="hero-img"
        />
        <div className="overlay" />
        <div className="hero-content">
          <h1>
            Building the Future of Manufacturing: Achieving Scalability and
            Compliance with Siemens and Athena
          </h1>
          <a href="#watch-webinar" className="solution-btn">
            Download Now
          </a>
        </div>
      </section>

      <section className="webinar-detail-page">
        <div className="webinar-detail-layout">
          <article className="webinar-detail-content">
            <p className="webinar-detail-lead">
              Thank you for joining our webinar: Building the Future of Manufacturing: Achieving Scalability and Compliance with Siemens and Athena.
            </p>

            <p>
              We hope you left with a clear view of how Opcenter capabilities
              and Athena&apos;s deep shop-floor integration help MedTech and
              Semiconductor manufacturers scale without trading off on key KPIs.
            </p>

            <p>
              As promised, here is everything you need to revisit the session or
              share it with your team:
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Webinar Replay:
            </h2>
            <a href="#watch-webinar" className="solution-btn">
              Download Now
            </a>
          </article>

          <aside className="webinar-detail-card">
            <h2>Webinar Replay</h2>
            <dl>
              <div>
                <dt>Duration</dt>
                <dd>45 minutes + Q&amp;A</dd>
              </div>
              <div>
                <dt>Presented by</dt>
                <dd>Siemens and Athena Technology Solutions</dd>
              </div>
            </dl>
            <a href="#watch-webinar" className="webinar-register-card-btn">
              Download Now
            </a>
          </aside>
        </div>
      </section>

      {/* <section className="webinar-final-cta">
        <div className="webinar-final-cta__inner">
          <div>
            <span className="solution-tag">Webinar replay</span>
            <h2>Revisit the session or share it with your team.</h2>
            <p>
              Get access to Building the Future of Manufacturing: Achieving
              Scalability and Compliance with Siemens and Athena.
            </p>
          </div>
          <a href="#watch-webinar" className="solution-btn">
            Download Now
          </a>
        </div>
      </section> */}

      <section id="watch-webinar" className="webinar-form-split">
        <div className="split-container">
          <div className="split-image">
            <Image
              src="/assets/images/siemens-and-athenatec.webp"
              alt="Smart manufacturing"
              fill
              className="split-img"
            />
          </div>

          <div className="split-form">
            <div className="form-inner">
              <div className="form-badge">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Webinar Replay
              </div>

              <h2>Fill out the form below to download the webinar replay</h2>

              <WebinarForm recordingUrl={FUTURE_MANUFACTURING_RECORDING_URL} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Medical Visibility Layout
// ─────────────────────────────────────────────────────────────────────────────

function MedicalVisibilityLayout() {
  return (
    <>
      <section className="single-hero">
        <Image
          src="/assets/images/Gain-End-to-End-Visibility-in-Medical-Device.webp"
          alt="Medical Device Visibility"
          fill
          priority
          className="hero-img"
        />
        <div className="overlay" />
        <div className="hero-content">
          <h1>Gain End-to-End Visibility in Medical Device Manufacturing</h1>
        </div>
      </section>

      <section className="single-content">
        <div className="content-grid">
          <div className="image-side">
            <Image
              src="/assets/images/Medical-Device-Manufacturing-5.webp"
              alt="Medical Device"
              width={600}
              height={400}
            />
          </div>
          <div className="text-side">
            <h2>Stop Manufacturing Blind Spots</h2>
            <p>
              Get instant access to the full webinar recording, slides, and key
              insights from industry experts at Critical Manufacturing, Athena
              Technology Solutions, and Twinzo.
            </p>
            <a
              href="https://zoom.us/rec/share/IPqPCIvoKLPUDAj8UkwaYArrT8lLUTe1ZTs7cv63Cvp_xT-727JtF97t0o5OzEtT.OZG81X_pSQ8vnj8t"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              Download the Full Webinar Now
            </a>
          </div>
        </div>
      </section>

      <section className="challenge-section">
        <div className="challenge-container">
          <div className="challenge-header">
            <h2>How Do We Solve Our Biggest Operational Challenges?</h2>
            <p>
              If you&apos;re navigating the relentless pressures of speed,
              quality, and compliance, you&apos;re not alone. This webinar was
              created for leaders facing:
            </p>
          </div>
          <div className="challenge-list">
            {[
              "Time-to-Market Delays from siloed data.",
              "Unpredictable Yield & Uptime.",
              "Spiraling Costs from quality events and scrap.",
              "The constant burden of Audit Readiness & Regulatory Compliance.",
            ].map((text, i) => (
              <div className="challenge-item" key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="solution-section">
        <div className="solution-container">
          <div className="solution-content">
            <span className="solution-tag">Webinar Session</span>
            <h2>
              The Solution Explored: A Unified Tech Stack for True Visibility
            </h2>
            <p>
              In this 45-minute session, our experts provide a clear roadmap to
              an intelligent, transparent operation.
            </p>
            <a
              href="https://zoom.us/rec/share/IPqPCIvoKLPUDAj8UkwaYArrT8lLUTe1ZTs7cv63Cvp_xT-727JtF97t0o5OzEtT.OZG81X_pSQ8vnj8t"
              target="_blank"
              rel="noopener noreferrer"
              className="solution-btn"
            >
              Download the Full Webinar Now
            </a>
          </div>
          <div className="solution-image">
            <Image
              src="/assets/images/shutterstock_1096141913.webp"
              alt="Manufacturing Automation"
              width={600}
              height={450}
            />
          </div>
        </div>
      </section>

      <section className="learn-section">
        <div className="learn-container">
          <div className="learn-header">
            <h2>What You&apos;ll Learn in This Webinar Recording</h2>
            <p>Watch the recording to get a detailed breakdown of:</p>
          </div>
          <div className="learn-grid">
            {[
              {
                title: "The Automated Foundation",
                body: "How Critical Manufacturing's MES creates the backbone for flawless traceability and automated compliance (FDA 21 CFR Part 820, MDR/IVDR).",
              },
              {
                title: "The Connective Tissue",
                body: "Why Athena Technology Solutions' expert implementation is critical for seamless integration across ERP, PLM, and QMS to eliminate data silos.",
              },
              {
                title: "The Living Intelligence Layer",
                body: "How Twinzo's real-time 3D Digital Twin visualizes your entire operation to optimize capacity and enable predictive decision-making.",
              },
              {
                title: "Unified Live Demonstration",
                body: "See a real-world scenario where these technologies unite to detect, analyze, and resolve a non-conformance event.",
              },
            ].map((item, i) => (
              <div className="learn-item" key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>
                  <strong>{item.title}:</strong> {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="speakers-section">
        <div className="speakers-container">
          <div className="speakers-header">
            <h2>Featured Expert Speakers</h2>
          </div>
          <div className="speakers-grid">
            {[
              {
                name: "Will Trodon",
                role: "Sales Leader | Partners and Alliances, Critical Manufacturing",
              },
              {
                name: "Jason Adams",
                role: "Global Vice President, Industry, Athena Technology Solutions",
              },
              { name: "Tomas Vojtek", role: "Chief Strategy Officer, Twinzo" },
            ].map((s) => (
              <div className="speaker-card" key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="audience-container">
          <div className="audience-image">
            <Image
              src="/assets/images/AdobeStock_819976268-scaled-1.webp"
              alt="Manufacturing Line"
              width={650}
              height={450}
            />
          </div>
          <div className="audience-content">
            <h2>This Webinar is Essential For:</h2>
            <div className="audience-list">
              {[
                "VPs & Directors of Manufacturing, Operations, and Engineering",
                "Heads of Quality Assurance & Regulatory Compliance",
                "Digital Transformation and Industry 4.0 Leads",
                "Operations & Plant Managers",
                "IT Leaders supporting manufacturing",
              ].map((item, i) => (
                <div className="audience-item" key={i}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="takeaways-section">
        <div className="takeaways-container">
          <div className="takeaways-header">
            <h2>Key Takeaways You&apos;ll Gain</h2>
            <p>By watching, you will understand how to:</p>
          </div>
          <div className="takeaways-grid">
            {[
              "Reduce Time-to-Market with streamlined, automated processes.",
              "Maximize Yield & Uptime through real-time monitoring.",
              "Control Costs by minimizing scrap and unplanned downtime.",
              "Automate Compliance and ensure 24/7 audit readiness.",
              "Leverage Predictive AI & Data Analytics to become proactive.",
            ].map((item, i) => (
              <div className="takeaway-item" key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="takeaways-cta">
            <a
              href="https://zoom.us/rec/share/IPqPCIvoKLPUDAj8UkwaYArrT8lLUTe1ZTs7cv63Cvp_xT-727JtF97t0o5OzEtT.OZG81X_pSQ8vnj8t"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              Download the Full Webinar Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MedTech MES Layout
// ─────────────────────────────────────────────────────────────────────────────

function MedtechMESLayout() {
  return (
    <>
      <section className="single-hero">
        <Image
          src="/assets/images/Gain-End-to-End-Visibility-in-Medical-Device.webp"
          alt="MedTech MES"
          fill
          priority
          className="hero-img"
        />
        <div className="overlay" />
        <div className="hero-content">
          <h1>
            Download Webinar: Accelerate MedTech Manufacturing with a Modern MES
            Accelerator
          </h1>
        </div>
      </section>

      <section className="mes-hero">
        <div className="mes-hero-container">
          <div className="mes-hero-image">
            <Image
              src="/assets/images/MV.webp"
              alt="MES Accelerator"
              width={750}
              height={600}
              className="mes-img"
            />
          </div>
          <div className="mes-hero-content">
            <h2>Is Manual Testing Holding Your MedTech Innovation Back?</h2>
            <h3 className="sub-heading">
              Stop Letting Manual Processes Dictate Your Pace
            </h3>
            <p>
              In the race to bring life-saving MedTech innovations to market,
              speed and compliance are non-negotiable. Yet, many manufacturers
              are trapped by outdated, manual testing and validation methods
              that create bottlenecks and introduce risk.
            </p>
            <ul className="hero-list">
              <li>Painfully slow time-to-market</li>
              <li>The constant threat of human error in documentation.</li>
              <li>A compliance tracking nightmare.</li>
            </ul>
            <p>....then our recently concluded webinar is for you.</p>
          </div>
        </div>
      </section>

      <section className="mes-discovery-section">
        <div className="mes-container">
          <div className="discovery-intro">
            <h2>You Will Discover</h2>
            <div className="intro-grid">
              <div>
                <h4>The True Cost of Inefficiency</h4>
                <p>
                  Understand how manual processes create delays, increase human
                  error, and make compliance tracking a nightmare—costing
                  millions and slowing your time-to-market.
                </p>
              </div>
              <div>
                <h4>The Industry Reality</h4>
                <p>
                  See why MedTech needs speed without compromising compliance,
                  and how disconnected systems are holding manufacturers back.
                </p>
              </div>
            </div>
          </div>

          <div className="solution-split">
            <div className="solution-content">
              <h2>The Modern Solution: A Path to Digital Control</h2>
              <p>
                Get a live introduction to the Modern MES Accelerator for
                MedTech—a plug-and-play solution designed to:
              </p>
              <ul>
                <li>1. Automate testing and traceability</li>
                <li>2. Simplify compliance documentation</li>
                <li>3. Integrate seamlessly with existing systems</li>
                <li>4. Accelerate new device introduction</li>
              </ul>
            </div>
            <div className="solution-image">
              <Image
                src="/assets/images/Med-Mes.webp"
                alt="Modern MES Solution"
                width={700}
                height={550}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="webinar-form-split">
        <div className="split-container">
          <div className="split-image">
            <Image
              src="/assets/images/form-img.webp"
              alt="MedTech"
              fill
              className="split-img"
            />
          </div>

          <div className="split-form">
            <div className="form-inner">
              <div className="form-badge">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Free Webinar Access
              </div>

              <h2>Fill out the form below to view the webinar</h2>

              <WebinarForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
