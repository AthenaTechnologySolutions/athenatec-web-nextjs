"use client";

import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

const WEBINAR_REGISTRATION_URL =
  "https://zoom.us/webinar/register/WN_vxoyFwkmRXmlK8mAbtDKNA#/registration";

export default function WebinarTopBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("webinar_banner_dismissed");
    if (!isDismissed) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("webinar_banner_dismissed", "true");
  };

  if (dismissed) return null;

  return (
    <div className="hidden md:block relative z-50 w-full overflow-hidden bg-gradient-to-r from-[#09152b] via-[#102a52] to-[#1c4584] text-white shadow-md border-b border-white/10">
      {/* Background ambient lighting subtle decoration */}
      <div className="pointer-events-none absolute -left-10 top-1/2 h-20 w-40 -translate-y-1/2 rounded-full bg-[#17ace4]/20 blur-xl" />
      <div className="pointer-events-none absolute -right-10 top-1/2 h-20 w-40 -translate-y-1/2 rounded-full bg-[#f5c718]/15 blur-xl" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:px-6 lg:px-8 text-xs sm:text-sm">
        <div className="flex flex-1 flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-center sm:text-left">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#17ace4]/20 border border-[#17ace4]/40 px-2.5 py-0.5 text-[11px] font-semibold text-[#6ee7b7] backdrop-blur-sm shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="hidden min-[400px]:inline text-white/90">Upcoming Webinar</span>
            <span className="text-[#f5c718] font-bold">July 30, 9 AM PST</span>
          </span>

          {/* Banner message text */}
          <p className="text-white/95 font-medium leading-tight text-xs sm:text-sm">
            <strong className="font-semibold text-white">
              Athena introduces its Shop Floor Mobility Accelerator
            </strong>
            <span className="hidden md:inline text-white/80 ml-1">
              — Unlock real dollar & productivity benefits!
            </span>
          </p>
        </div>

        {/* CTA Button & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={WEBINAR_REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#17ace4] to-[#0d89c7] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:from-[#1eb8f5] hover:to-[#17ace4] hover:shadow-[0_0_12px_rgba(23,172,228,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Register Now</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-150"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
