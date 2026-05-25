"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar, Clock, MapPin, CheckCircle, Mail, User, Phone,
  Briefcase, Loader2, CheckCircle2, ArrowRight, ArrowLeft, Sparkles
} from 'lucide-react';

const STEPS = ["Personal Info", "Professional", "Interests & More"];

const interests = [
  "Document Intelligence",
  "Agentic Workflows",
  "Claude Code Solutions",
  "MCP Integrations",
  "Custom Pilot Project",
  "RAG vs. Agentic Architecture",
];

export default function RsvpPage() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<Record<string, any>>({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", jobTitle: "", industry: "",
    interests: [] as string[],
    source: "", useCase: "", consent: false,
    claudeArchitect: false,
  });

  const update = (field: string, value: any) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const toggleInterest = (val: string) =>
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(val)
        ? prev.interests.filter((i: string) => i !== val)
        : [...prev.interests, val],
    }));

  const handleSubmit = async () => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const allInterests = [
        ...(formData.claudeArchitect ? ["12-week Claude Architect program"] : []),
        ...formData.interests,
      ];
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, interests: allInterests }),
      });
      const result = await res.json();
      if (res.ok && result.status === "mail_sent") {
        setStatus("success");
      } else {
        throw new Error(result.message || "Failed to submit RSVP");
      }
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-60";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-[#f4f6fb] font-sans">
      {/* Top nav bar */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <Link href="/">
          <Image
            src="/assets/logo/Athenatec-Logo.png"
            alt="Athenatec"
            width={180}
            height={45}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <span className="text-xs font-bold tracking-widest uppercase text-[#1c4584] bg-[#1c4584]/8 px-3 py-1.5 rounded-full">
          FabOrchestrator.AI
        </span>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

        {/* ── LEFT PANEL: Event Details ── */}
        <aside className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-24">
          <div className="bg-[#1c4584] rounded-3xl overflow-hidden shadow-xl shadow-[#1c4584]/20">
            {/* Hero band */}
            <div className="px-7 pt-8 pb-6 border-b border-white/10">
              <p className="text-xs font-bold tracking-widest uppercase text-blue-200 mb-2">Inaugural Event</p>
              <h1 className="text-2xl font-extrabold text-white leading-snug">
                Agentic AI<br />Research Lab
              </h1>
            </div>

            {/* Info rows */}
            <div className="px-7 py-6 space-y-5">
              {[
                {
                  icon: <Calendar className="w-5 h-5" />,
                  label: "Date",
                  value: "Saturday, June 13",
                  sub: "RSVP by Sunday, June 1",
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  label: "Time",
                  value: "10:00 AM PST",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Venue",
                  value: "Fremont Downtown Event Center",
                  sub: "Capitol Room · 3500 Capitol Ave, Fremont, CA 94538",
                },
              ].map(({ icon, label, value, sub }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="bg-white/10 p-2.5 rounded-xl text-white shrink-0">{icon}</div>
                  <div>
                    <p className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">{label}</p>
                    <p className="text-white font-semibold text-sm mt-0.5">{value}</p>
                    {sub && <p className="text-blue-200 text-xs mt-0.5 leading-relaxed">{sub}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlight */}
            <div className="mx-5 mb-6 bg-amber-400/15 border border-amber-400/30 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <p className="text-[11px] font-bold text-amber-200 uppercase tracking-wider">Key Highlight</p>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Launching our{" "}
                <span className="font-bold text-amber-300">12-week Claude Architect</span>{" "}
                industry-driven, research-based learning program.
              </p>
            </div>

            <div className="px-7 pb-6">
              <p className="text-blue-200 text-xs leading-relaxed">
                Light breakfast and lunch will be provided. Connect, learn, and explore what's next in agentic AI.
              </p>
            </div>
          </div>
        </aside>

        {/* ── RIGHT PANEL: Form ── */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

            {status === "success" ? (
              /* Success State */
              <div className="text-center py-20 px-8">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">You're In!</h2>
                <p className="text-lg text-gray-500 mb-8 max-w-sm mx-auto">
                  RSVP confirmed for the Inaugural Agentic AI Research Lab. See you on June 13!
                </p>
                <Link
                  href="/"
                  className="inline-block bg-[#1c4584] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-[#15356e] transition-colors"
                >
                  Return Home
                </Link>
              </div>
            ) : (
              <>
                {/* Step Header */}
                <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl font-extrabold text-gray-900">Confirm Your RSVP</h2>
                      <p className="text-sm text-gray-500 mt-0.5">Step {step + 1} of {STEPS.length}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#1c4584] bg-[#1c4584]/8 px-3 py-1.5 rounded-full">
                      {STEPS[step]}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="flex gap-2">
                    {STEPS.map((s, i) => (
                      <div key={s} className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#1c4584] rounded-full transition-all duration-500"
                          style={{ width: i <= step ? "100%" : "0%" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-8 py-7">
                  {/* ── STEP 0: Personal Info ── */}
                  {step === 0 && (
                    <div className="space-y-5">
                      <div className="flex gap-2 mb-1">
                        <User className="w-5 h-5 text-[#1c4584]" />
                        <h3 className="text-base font-bold text-gray-900">Personal Information</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelCls}>First name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Your first name"
                            value={formData.firstName}
                            onChange={e => update("firstName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Last name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Your last name"
                            value={formData.lastName}
                            onChange={e => update("lastName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              className={`${inputCls} pl-11`}
                              placeholder="Your@company.com"
                              value={formData.email}
                              onChange={e => update("email", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Phone</label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                              type="tel"
                              className={`${inputCls} pl-11`}
                              placeholder="(555) 123-4567"
                              value={formData.phone}
                              onChange={e => update("phone", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 1: Professional Details ── */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="flex gap-2 mb-1">
                        <Briefcase className="w-5 h-5 text-[#1c4584]" />
                        <h3 className="text-base font-bold text-gray-900">Professional Details</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelCls}>Company / Organization</label>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Your company"
                            value={formData.company}
                            onChange={e => update("company", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Job Title</label>
                          <input
                            type="text"
                            className={inputCls}
                            placeholder="Your role"
                            value={formData.jobTitle}
                            onChange={e => update("jobTitle", e.target.value)}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Industry / Sector <span className="text-red-500">*</span></label>
                          <select
                            className={inputCls}
                            value={formData.industry}
                            onChange={e => update("industry", e.target.value)}
                            required
                          >
                            <option value="">Select an option</option>
                            <option>Government / Public Sector</option>
                            <option>Technology</option>
                            <option>Healthcare</option>
                            <option>Finance</option>
                            <option>Education</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: Interests + More ── */}
                  {step === 2 && (
                    <div className="space-y-7">
                      {/* Claude Architect highlight */}
                      <label className="flex items-center gap-4 p-4 border-2 border-amber-300 bg-amber-50 rounded-2xl cursor-pointer hover:bg-amber-100/60 transition-colors group">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-[#1c4584] rounded border-gray-300 focus:ring-[#1c4584] cursor-pointer shrink-0"
                          checked={formData.claudeArchitect}
                          onChange={e => update("claudeArchitect", e.target.checked)}
                        />
                        <span className="font-semibold text-gray-900 group-hover:text-[#1c4584] transition-colors flex-1">
                          12-week Claude Architect program
                        </span>
                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                          New
                        </span>
                      </label>

                      {/* Other interests */}
                      <div>
                        <p className="text-sm font-bold text-gray-700 mb-3">Other Areas of Interest</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {interests.map(interest => (
                            <label
                              key={interest}
                              className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                                formData.interests.includes(interest)
                                  ? "border-[#1c4584] bg-[#1c4584]/5"
                                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-[#1c4584] rounded border-gray-300 focus:ring-[#1c4584] cursor-pointer shrink-0"
                                checked={formData.interests.includes(interest)}
                                onChange={() => toggleInterest(interest)}
                              />
                              <span className="text-sm font-medium text-gray-700">{interest}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <hr className="border-gray-100" />

                      {/* Additional info */}
                      <div className="space-y-5">
                        <div>
                          <label className={labelCls}>How did you hear about us?</label>
                          <select
                            className={inputCls}
                            value={formData.source}
                            onChange={e => update("source", e.target.value)}
                          >
                            <option value="">Select an option</option>
                            <option>Personal invitation</option>
                            <option>Referral</option>
                            <option>LinkedIn</option>
                            <option>Email</option>
                            <option>Event / conference</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Tell us about your use case <span className="text-gray-400 font-normal">(optional)</span></label>
                          <textarea
                            rows={3}
                            className={`${inputCls} resize-y`}
                            placeholder="Briefly describe what you'd like to explore..."
                            value={formData.useCase}
                            onChange={e => update("useCase", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Consent */}
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 mt-0.5 text-[#1c4584] rounded border-gray-300 focus:ring-[#1c4584] cursor-pointer shrink-0"
                            checked={formData.consent}
                            onChange={e => update("consent", e.target.checked)}
                            required
                          />
                          <span className="text-sm text-gray-600 leading-relaxed">
                            I agree to be contacted by Athena Technology Solutions and FabOrchestrator.AI about programs, research updates, and opportunities relevant to my interests.
                          </span>
                        </label>
                      </div>

                      {status === "error" && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm">
                          {errorMessage}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Nav */}
                <div className="px-8 pb-8 flex items-center justify-between gap-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2.5 rounded-xl hover:bg-gray-100"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(s => s + 1)}
                      className="flex items-center gap-2 bg-[#1c4584] hover:bg-[#15356e] text-white font-bold py-3 px-7 rounded-xl shadow-md shadow-[#1c4584]/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={status === "submitting" || !formData.consent}
                      className="flex items-center gap-2 bg-[#1c4584] hover:bg-[#15356e] disabled:bg-[#1c4584]/60 disabled:cursor-not-allowed text-white font-bold py-3 px-7 rounded-xl shadow-md shadow-[#1c4584]/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Confirm RSVP
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}