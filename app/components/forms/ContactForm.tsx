"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronDown, User, Mail, Phone,
  MessageSquare, Send, AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ── Validation ────────────────────────────────────────────────────────────────
const schema = z.object({
  full_name:   z.string().min(1,  "Full name is required"),
  email:       z.string().email(  "Enter a valid email address"),
  phone:       z.string().min(10, "Enter a valid phone number"),
  inquiryType: z.string().min(1,  "Please select an inquiry type"),
  message:     z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof schema>;

interface ContactFormProps {
  inquiryOptions: string[];
  pageName:       string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const InputWrapper = ({
  icon, error, children,
}: {
  icon: React.ReactNode; error?: string; children: React.ReactNode;
}) => (
  <div className="relative group">
    <div className={`flex items-start gap-3 w-full rounded-xl px-4 py-3 border-2 bg-white
      transition-all duration-300 focus-within:border-[#1c4584] focus-within:shadow-[0_0_0_4px_rgba(28,69,132,0.08)]
      ${error ? "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-gray-200 hover:border-gray-300"}`}>
      <span className={`mt-0.5 flex-shrink-0 transition-colors duration-200
        ${error ? "text-red-400" : "text-gray-400 group-focus-within:text-[#1c4584]"}`}>
        {icon}
      </span>
      {children}
    </div>
    {error && (
      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500 font-medium pl-1">
        <AlertCircle size={12} /> {error}
      </p>
    )}
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactForm({ inquiryOptions, pageName }: ContactFormProps) {
  const [open,            setOpen]            = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState("");
  const [isSubmitting,    setIsSubmitting]    = useState(false);
  const [submitError,     setSubmitError]     = useState("");
  const [pageUrl,          setPageUrl]         = useState("");
  const router = useRouter();

  const {
    register, handleSubmit, setValue, trigger,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const fd = new FormData();

      // ── Your form fields (must match CF7 form body exactly) ─────────────────
      fd.append("your-name",    data.full_name);
      fd.append("your-email",   data.email);
      fd.append("your-phone",   data.phone);
      fd.append("your-subject", data.inquiryType);
      fd.append("your-message", data.message);
      fd.append("your-page",    pageName);
      fd.append("page-url",     pageUrl);

      const res  = await fetch("/api/contact", { method: "POST", body: fd });
      const json = await res.json();

      if (json.status === "mail_sent") {
        router.push("/thank-you");
        return;
      }

      setSubmitError(
        json.message ||
          (json.status === "validation_failed"
            ? "Please check your inputs and try again."
            : "Message could not be sent. Please try again.")
      );
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input type="hidden" name="page-url" value={pageUrl} readOnly />

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1.5 tracking-wide uppercase text-[11px]">
          Full Name <span className="text-red-500">*</span>
        </label>
        <InputWrapper icon={<User size={16} />} error={errors.full_name?.message}>
          <input {...register("full_name")} placeholder="Full name"
            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none" />
        </InputWrapper>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1.5 tracking-wide uppercase text-[11px]">
          Email Address <span className="text-red-500">*</span>
        </label>
        <InputWrapper icon={<Mail size={16} />} error={errors.email?.message}>
          <input {...register("email")} type="email" placeholder="Your email"
            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none" />
        </InputWrapper>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1.5 tracking-wide uppercase text-[11px]">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <InputWrapper icon={<Phone size={16} />} error={errors.phone?.message}>
          <input {...register("phone")} type="tel" placeholder="Phone Number"
            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none" />
        </InputWrapper>
      </div>

      {/* Inquiry Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1.5 tracking-wide uppercase text-[11px]">
          Inquiry Type <span className="text-red-500">*</span>
        </label>
        <input type="hidden" {...register("inquiryType")} />
        <div className="relative">
          <div onClick={() => setOpen(!open)}
            className={`flex items-center justify-between w-full rounded-xl px-4 py-3 border-2 bg-white cursor-pointer
              transition-all duration-300 hover:border-gray-300
              ${open ? "border-[#1c4584] shadow-[0_0_0_4px_rgba(28,69,132,0.08)]" : ""}
              ${errors.inquiryType ? "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-gray-200"}`}>
            <span className={`text-sm ${selectedInquiry ? "text-gray-800 font-medium" : "text-gray-400"}`}>
              {selectedInquiry || "Select an inquiry type…"}
            </span>
            <ChevronDown size={16}
              className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180 text-[#1c4584]" : ""}`} />
          </div>

          {open && (
            <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-56 overflow-y-auto">
              {inquiryOptions.map((option, i) => (
                <div key={option}
                  onClick={() => { setSelectedInquiry(option); setValue("inquiryType", option); trigger("inquiryType"); setOpen(false); }}
                  className={`px-4 py-3 cursor-pointer text-sm text-gray-700 hover:bg-[#e8f5fd] hover:text-[#1c4584]
                    transition-colors duration-150 ${i < inquiryOptions.length - 1 ? "border-b border-gray-50" : ""}`}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.inquiryType && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500 font-medium pl-1">
            <AlertCircle size={12} /> {errors.inquiryType.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1.5 tracking-wide uppercase text-[11px]">
          Message <span className="text-red-500">*</span>
        </label>
        <InputWrapper icon={<MessageSquare size={16} />} error={errors.message?.message}>
          <textarea {...register("message")} rows={4} placeholder="Tell us how we can help you…"
            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none resize-none leading-relaxed" />
        </InputWrapper>
      </div>
      {/* Global error */}
      {submitError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          <AlertCircle size={16} className="flex-shrink-0" /> {submitError}
        </div>
      )}

      {/* Submit */}
      <button type="submit" disabled={isSubmitting}
        className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-white font-semibold text-sm
          transition-all duration-300 tracking-wide
          ${isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#1c4584] hover:bg-[#17ace4] hover:shadow-[0_10px_24px_rgba(23,172,228,0.25)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"}`}>
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <><Send size={16} /> Send Message</>
        )}
      </button>

      <p className="text-center text-xs text-gray-400 pt-1">
        We typically respond within 24 hours.
      </p>
    </form>
  );
}
