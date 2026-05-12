"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./download.scss";

const CF7_FORM_ID = "231155";
const CF7_URL = `/api/cf7/${CF7_FORM_ID}`;

type FormData = {
  name: string;
  email: string;
  company: string;
  industry: string;
  country: string;
  consent: boolean;
};

const INDUSTRIES = [
  "Semiconductor",
  "Electronics",
  "Medical Devices",
  "Discrete Manufacturing",
  "Solar",
];

function FloatingInput({ id, label, type = "text", register, error, icon, optional = false }: {
  id: string; label: string; type?: string; register: object;
  error?: string; icon: React.ReactNode; optional?: boolean;
}) {
  return (
    <div className="df-field">
      <div className={`df-input-wrap ${error ? "df-input-wrap--error" : ""}`}>
        <span className="df-input-icon">{icon}</span>
        <input id={id} type={type} placeholder=" " className="df-input" autoComplete="off" {...register} />
        <label htmlFor={id} className="df-label">
          {label}{optional && <span className="df-label-optional"> (optional)</span>}
        </label>
        <span className="df-focus-bar" />
      </div>
      {error && (
        <p className="df-error" role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

type Props = { onSuccess?: () => void };

export default function DownloadForm({ onSuccess }: Props) {
  const { register, handleSubmit, setValue, trigger, formState: { errors, isSubmitting } } =
    useForm<FormData>({ mode: "onTouched" });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIndustry, setIndustry] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onSubmit = async (data: FormData) => {
    setSubmitError("");
    try {
      const fd = new FormData();
      // Required CF7 hidden fields
      fd.append("_wpcf7",                CF7_FORM_ID);
      fd.append("_wpcf7_version",        "5.9");
      fd.append("_wpcf7_locale",         "en_US");
      fd.append("_wpcf7_unit_tag",       `wpcf7-f${CF7_FORM_ID}-o1`);
      fd.append("_wpcf7_container_post", "0");
      // CF7 field names
      fd.append("your-name",    data.name.trim());
      fd.append("your-email",   data.email.trim().toLowerCase());
      fd.append("company-name", data.company.trim());
      fd.append("industries",   data.industry);
      fd.append("country",      data.country.trim());
      fd.append("checkbox-649", data.consent ? "I agree*" : "");
      fd.append("page-url",     window.location.href);

      const res  = await fetch(CF7_URL, { method: "POST", body: fd });
      const json = await res.json();

      if (json.status !== "mail_sent") throw new Error(json.message || "Something went wrong.");
      setSubmittedEmail(data.email.trim());
      setSubmitted(true);
      onSuccess?.();
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="df-card df-card--success" aria-live="polite">
        <div className="df-success-ring">
          <div className="df-success-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>
        <div className="df-success-badge">Case Study Unlocked</div>
        <h3 className="df-success-title">Check Your Inbox!</h3>
        <p className="df-success-body">We&apos;ve sent the full case study to</p>
        <p className="df-success-email">{submittedEmail}</p>
        <p className="df-success-sub">Usually arrives within a minute. Check spam if you don&apos;t see it.</p>
        <div className="df-success-divider"/>
        <div className="df-success-steps">
          <div className="df-success-step"><span className="df-step-num">1</span><span>Check your email</span></div>
          <div className="df-success-step"><span className="df-step-num">2</span><span>Open the PDF link</span></div>
          <div className="df-success-step"><span className="df-step-num">3</span><span>Read the full story</span></div>
        </div>
        <p className="df-success-hint">You can also scroll down to preview the document ↓</p>
      </div>
    );
  }

  return (
    <div className="df-card">
      <div className="df-header">
        <h3 className="df-title">Fill out the form below to download the document.</h3>
      </div>
      <div className="df-divider"/>
      <form onSubmit={handleSubmit(onSubmit)} className="df-form" noValidate>

        <div className="df-row">
          <FloatingInput id="df-name" label="Full Name *"
            register={register("name", { required: "Full name is required.", minLength: { value: 2, message: "At least 2 characters." } })}
            error={errors.name?.message}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>}
          />
          <FloatingInput id="df-email" label="Work Email *" type="email"
            register={register("email", { required: "Email is required.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." } })}
            error={errors.email?.message}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
          />
        </div>

        <FloatingInput id="df-company" label="Company Name *"
          register={register("company", { required: "Company name is required.", minLength: { value: 2, message: "At least 2 characters." } })}
          error={errors.company?.message}
          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/></svg>}
        />

        <div className="df-row">
          {/* Industry dropdown */}
          <div className="df-field" ref={dropdownRef}>
            <input type="hidden" {...register("industry", { required: true })} />
            <button type="button" onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox" aria-expanded={dropdownOpen}
              className={["df-dropdown-btn", errors.industry ? "df-dropdown-btn--error" : "", dropdownOpen ? "df-dropdown-btn--open" : ""].join(" ")}>
              <span className="df-dropdown-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </span>
              <span className={selectedIndustry ? "df-dropdown-value" : "df-dropdown-placeholder"}>
                {selectedIndustry || "Industry *"}
              </span>
              <svg className={`df-dropdown-chevron ${dropdownOpen ? "df-dropdown-chevron--open" : ""}`}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="df-dropdown-menu" role="listbox">
                {INDUSTRIES.map((option) => (
                  <div key={option} role="option" aria-selected={selectedIndustry === option}
                    className={`df-dropdown-option ${selectedIndustry === option ? "df-dropdown-option--active" : ""}`}
                    onClick={() => { setIndustry(option); setValue("industry", option); trigger("industry"); setDropdownOpen(false); }}>
                    {selectedIndustry === option && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                    {option}
                  </div>
                ))}
              </div>
            )}
            {errors.industry && (
              <p className="df-error" role="alert">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Please select your industry.
              </p>
            )}
          </div>

          <FloatingInput id="df-country" label="Country *"
            register={register("country", { required: "Country is required." })}
            error={errors.country?.message}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>}
          />
        </div>

        {/* Consent */}
        <div className={`df-consent ${errors.consent ? "df-consent--error" : ""}`}>
          <p className="df-consent-text">
            By submitting this form, you agree to receive communications with related content and can unsubscribe at any time.
          </p>
          <label className="df-consent-label">
            <input type="checkbox" className="df-consent-checkbox"
              {...register("consent", { required: "You must agree to continue." })} />
            <span className="df-consent-box" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span className="df-consent-agree">I agree<span className="df-consent-required">*</span></span>
          </label>
          {errors.consent && (
            <p className="df-error df-consent-err" role="alert">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {errors.consent.message}
            </p>
          )}
        </div>

        {submitError && (
          <div className="df-submit-error" role="alert">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {submitError}
          </div>
        )}

        <button type="submit" className="df-submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? (
            <><span className="df-spinner" aria-hidden="true"/> Sending…</>
          ) : (
            <>Get the Case Study
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v13M5 15l7 7 7-7"/>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
