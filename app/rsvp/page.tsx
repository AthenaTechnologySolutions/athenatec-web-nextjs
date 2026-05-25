"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, CheckCircle, Mail, User, Phone, Briefcase, Loader2, CheckCircle2 } from 'lucide-react';

export default function RsvpPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      jobTitle: formData.get("jobTitle"),
      industry: formData.get("industry"),
      interests: formData.getAll("interests"), // Multiple checkboxes
      source: formData.get("source"),
      useCase: formData.get("useCase"),
      consent: formData.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      
      if (res.ok && result.status === "mail_sent") {
        setStatus("success");
      } else {
        throw new Error(result.message || "Failed to submit RSVP");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 mt-6">
            <Image 
              src="/assets/logo/Athenatec-Logo.png" 
              alt="Athenatec" 
              width={240} 
              height={60} 
              className="h-12 w-auto mx-auto object-contain"
              priority
            />
          </Link>
          <div className="flex items-center justify-center gap-3 text-sm font-semibold text-brand-primary tracking-wider uppercase mb-4">
            <span className="w-10 h-px bg-brand-primary/30"></span>
            FabOrchestrator.AI
            <span className="w-10 h-px bg-brand-primary/30"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Inaugural Agentic AI Research Lab
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for the inaugural launch. Connect, learn, and explore what's next in agentic AI. 
            Light breakfast and lunch will be provided.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
              <p className="font-semibold text-gray-900">Saturday, June 13</p>
              <p className="text-sm text-brand-primary font-medium mt-0.5">RSVP by Sunday, June 1</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Time</p>
              <p className="font-semibold text-gray-900">10:00 AM PST</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 sm:col-span-2">
            <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Venue</p>
              <p className="font-semibold text-gray-900">Fremont Downtown Event Center</p>
              <p className="text-sm text-gray-500 mt-1">Capitol Room · 3500 Capitol Ave, Fremont, CA 94538</p>
            </div>
          </div>
        </div>

        {/* Highlight Alert */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-2xl mb-10 flex gap-4 items-start shadow-sm">
          <div className="bg-amber-100 text-amber-600 p-2 rounded-lg shrink-0 mt-1">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-amber-800 font-bold text-sm uppercase tracking-wider mb-1">Key Highlight</h3>
            <p className="text-amber-950 leading-relaxed">
              At the event, we are launching our <strong>12-week Claude Architect</strong> industry-driven, research-based learning program.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">RSVP Confirmed!</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for registering for the Inaugural Agentic AI Research Lab. We look forward to seeing you there!
                </p>
                <Link 
                  href="/"
                  className="inline-block bg-[#1c4584] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-[#15356e] transition-colors"
                >
                  Return Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">First name <span className="text-red-500">*</span></label>
                      <input name="firstName" type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all" placeholder="Jane" required disabled={status === "submitting"} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last name <span className="text-red-500">*</span></label>
                      <input name="lastName" type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all" placeholder="Doe" required disabled={status === "submitting"} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input name="email" type="email" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all" placeholder="jane.doe@company.com" required disabled={status === "submitting"} />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                      <div className="relative">
                        <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input name="phone" type="tel" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all" placeholder="(555) 123-4567" disabled={status === "submitting"} />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Professional Details */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    Professional Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company / organization</label>
                      <input name="company" type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all" placeholder="Acme Inc." disabled={status === "submitting"} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job title</label>
                      <input name="jobTitle" type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all" placeholder="Data Scientist" disabled={status === "submitting"} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Industry / sector <span className="text-red-500">*</span></label>
                      <select name="industry" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all appearance-none" required disabled={status === "submitting"}>
                        <option value="">Select an option</option>
                        <option value="Government / Public Sector">Government / Public Sector</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Areas of Interest */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Areas of Interest</h2>
                  
                  <label className="flex items-center gap-3 p-4 border-2 border-amber-300 bg-amber-50 rounded-xl cursor-pointer hover:bg-amber-100/50 transition-colors mb-4 group">
                    <input name="interests" value="12-week Claude Architect program" type="checkbox" className="w-5 h-5 text-[#1c4584] rounded border-gray-300 focus:ring-[#1c4584] cursor-pointer" disabled={status === "submitting"} />
                    <span className="font-semibold text-gray-900 group-hover:text-[#1c4584] transition-colors">12-week Claude Architect program</span>
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ml-auto">New</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-5 rounded-xl border border-gray-100">
                    {[
                      "Document Intelligence",
                      "Agentic Workflows",
                      "Claude Code Solutions",
                      "MCP Integrations",
                      "Custom Pilot Project",
                      "RAG vs. Agentic Architecture"
                    ].map((interest) => (
                      <label key={interest} className="flex items-center gap-3 cursor-pointer group">
                        <input name="interests" value={interest} type="checkbox" className="w-4.5 h-4.5 text-[#1c4584] rounded border-gray-300 focus:ring-[#1c4584] cursor-pointer" disabled={status === "submitting"} />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Additional Information */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">How did you hear about us?</label>
                    <select name="source" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all appearance-none" disabled={status === "submitting"}>
                      <option value="">Select an option</option>
                      <option value="Personal invitation">Personal invitation</option>
                      <option value="Referral">Referral</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Email">Email</option>
                      <option value="Event / conference">Event / conference</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tell us about your use case (optional)</label>
                    <textarea 
                      name="useCase"
                      rows={3} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1c4584]/20 focus:border-[#1c4584] outline-none transition-all resize-y" 
                      placeholder="Briefly describe what you'd like to explore..."
                      disabled={status === "submitting"}
                    ></textarea>
                  </div>
                </div>

                {/* Consent */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input name="consent" type="checkbox" className="w-4.5 h-4.5 mt-0.5 text-[#1c4584] rounded border-gray-300 focus:ring-[#1c4584] cursor-pointer" required disabled={status === "submitting"} />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      I agree to be contacted by Athena Technology Solutions and FabOrchestrator.AI about programs, research updates, and opportunities relevant to my interests.
                    </span>
                  </label>
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full flex justify-center items-center gap-2 bg-[#1c4584] hover:bg-[#15356e] disabled:bg-[#1c4584]/70 disabled:cursor-not-allowed text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg shadow-[#1c4584]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Submitting...
                    </>
                  ) : (
                    "Confirm RSVP"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
