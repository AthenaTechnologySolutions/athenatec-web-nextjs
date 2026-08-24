"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

const mesSolutions = [
  { name: "MES Implementation Services", href: "/mes-implementation-services" },
  { name: "Siemens Opcenter MES Implementation", href: "/siemens-opcenter-mes" },
  { name: "Critical Manufacturing MES Implementation", href: "/critical-manufacturing" },
  // { name: "Eyelit", href: "/eyelit" },
  // { name: "Twinzo", href: "/twinzo" },
];

const otherSolutions = [
  { name: "Oracle On-Prem", href: "/solutions/oracle-on-prem" },  
  { name: "Oracle Cloud", href: "/solutions/oracle-cloud" }, 
  { name: "PLM", href: "/solutions/plm" }, 
  { name: "Cyber Security Services", href: "/solutions/cyber-security-service" },
];

const partners = [
  { name: "Siemens", href: "/siemens-opcenter-mes" },
  { name: "Critical Manufacturing", href: "/critical-manufacturing" },
  // Eyelit route is disabled for now; keep this entry commented for future reuse.
  // { name: "Eyelit Technologies", href: "/eyelit" },
  { name: "Twinzo", href: "/blog/authorised-reseller-partnership-with-twinzo" },
];

const resources = [
  { name: "About Us", href: "/about" },
  { name: "Athena Accelerators", href: "/accelerators" },
  { name: "Articles", href: "/articles" },
  { name: "Blog", href: "/blog" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Webinars", href: "/webinars" },
  { name: "Event Gallery", href: "/gallery" },
  { name: "Agentic AI Training", href: "/agentic-ai-architect-training-program" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.2 2.25h6.963l4.259 5.635 4.822-5.635Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socials = [
  {
    label: "Facebook",
    ariaLabel: "Follow us on Facebook",
    href: "https://www.facebook.com/athenatecindia/",
    icon: <Facebook size={16} strokeWidth={1.8} />,
    hoverBg: "#1877F2",
    hoverShadow: "rgba(24,119,242,0.55)",
  },
  {
    label: "Instagram",
    ariaLabel: "Follow us on Instagram",
    href: "https://www.instagram.com/athenatecofficial?igsh=MTN6eXFwYmdhNjdvNw==",
    icon: <Instagram size={16} strokeWidth={1.8} />,
    hoverBg: "linear-gradient(45deg, #FCB045, #FD1D1D, #E1306C, #833AB4)",
    hoverShadow: "rgba(225,48,108,0.55)",
    isGradient: true,
  },
  {
    label: "X",
    ariaLabel: "Follow us on X",
    href: "https://x.com/athena_tec",
    icon: <XIcon />,
    hoverBg: "#000000",
    hoverShadow: "rgba(255,255,255,0.2)",
  },
  {
    label: "LinkedIn",
    ariaLabel: "Follow us on LinkedIn",
    href: "https://www.linkedin.com/company/athena-technology-solutions/",
    icon: <Linkedin size={16} strokeWidth={1.8} />,
    hoverBg: "#0A66C2",
    hoverShadow: "rgba(10,102,194,0.55)",
  },
  {
    label: "YouTube",
    ariaLabel: "Follow us on YouTube",
    href: "https://www.youtube.com/@Athena-tec",
    icon: <Youtube size={16} strokeWidth={1.8} />,
    hoverBg: "#FF0000",
    hoverShadow: "rgba(255,0,0,0.55)",
  },
];

export default function Footer() {
  return (
<footer className="bg-[radial-gradient(circle_at_82%_10%,#17ace414,#0000_28%),linear-gradient(135deg,#1c4584_0%,#0b244c_68%,#071c3c_100%)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="space-y-6 lg:col-span-2">
            <div className="relative h-12 w-[180px]">
              <Image
                src="/assets/logo/footer-logo.webp"
                alt="Athena"
                fill
                sizes="180px"
                className="object-contain"
                quality={90}
              />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#c7d4f1]">
              Athena Technology Solutions delivers enterprise-grade digital
              solutions that scale, secure, and simplify complex manufacturing
              ecosystems.
            </p>

            <div className="space-y-1 text-sm">
              <p className="font-semibold text-white mb-3">United States</p>
              <p className="font-medium text-white">Headquarters:</p>
              <Link
                href="https://maps.app.goo.gl/HF6t3r3L8aRoPsYy7"
                target="_blank"
                className="leading-relaxed text-[#c7d4f1] hover:underline"
              >
                859 Corporate Way <br />
                Fremont, California <br /> 94539
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#c7d4f1] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:scale-110 hover:text-white"
                  style={
                    {
                      "--hover-bg": s.hoverBg,
                      "--hover-shadow": s.hoverShadow,
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    if ("isGradient" in s && s.isGradient) {
                      el.style.backgroundImage = s.hoverBg;
                      el.style.borderColor = "transparent";
                    } else {
                      el.style.backgroundColor = s.hoverBg;
                      el.style.borderColor = s.hoverBg;
                    }
                    el.style.boxShadow = `0 4px 20px ${s.hoverShadow}, 0 0 30px ${s.hoverShadow}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = "";
                    el.style.backgroundImage = "";
                    el.style.borderColor = "";
                    el.style.boxShadow = "";
                  }}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {s.icon}
                  </span>

                  <span
                    className={[
                      "pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2",
                      "whitespace-nowrap rounded-md px-2.5 py-1",
                      "text-[11px] font-medium text-white shadow-lg",
                      "opacity-0 scale-90 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100",
                    ].join(" ")}
                    style={
                      "isGradient" in s && s.isGradient
                        ? { backgroundImage: s.hoverBg }
                        : { backgroundColor: s.hoverBg }
                    }
                  >
                    {s.label}
                    <span
                      className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent"
                      style={{ borderTopColor: "isGradient" in s && s.isGradient ? "#E1306C" : s.hoverBg }}
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <h4 className="border-b border-[#1c4584]/40 pb-2 text-base font-semibold text-white">
              MES Solutions
            </h4>
            {mesSolutions.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-[#c7d4f1] transition hover:text-[#17ace4]"
              >
                {item.name}
              </Link>
            ))}

            <div className="space-y-4 pt-3">
              <h4 className="border-b border-[#1c4584]/40 pb-2 text-base font-semibold text-white">
                Services
              </h4>
              {otherSolutions.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-[#c7d4f1] transition hover:text-[#17ace4]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <h4 className="border-b border-[#1c4584]/40 pb-2 text-base font-semibold text-white">
              Partners
            </h4>
            {partners.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-[#c7d4f1] transition hover:text-[#17ace4]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="space-y-4 text-sm">
            <h4 className="border-b border-[#1c4584]/40 pb-2 text-base font-semibold text-white">
              Company
            </h4>
            {resources.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-[#c7d4f1] transition hover:text-[#17ace4]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="space-y-6 text-sm">
            <h4 className="border-b border-[#1c4584]/40 pb-2 text-base font-semibold text-white">
              Get In Touch
            </h4>

            <div className="space-y-1">
              <p className="font-semibold text-white">Work Inquiries</p>
              <Link
                href="mailto:info@athenatec.com"
                className="block text-[#c7d4f1] transition hover:text-[#17ace4]"
              >
                info@athenatec.com
              </Link>
            </div>

            <div className="space-y-1">
              <p className="font-semibold text-white">Phone</p>
              <Link
                href="tel:510-687-0900"
                className="block text-[#c7d4f1] transition hover:text-[#17ace4]"
              >
                510-687-0900
              </Link>
            </div>

            <Link
              href="/contact"
              className="inline-block rounded-md bg-[#17ace4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1c4584]"
            >
              Get a Demo →
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#1c4584]/40 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#c7d4f1]">
            © 2026 Athena Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[#c7d4f1] hover:text-[#17ace4]">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="text-[#c7d4f1] hover:text-[#17ace4]">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
