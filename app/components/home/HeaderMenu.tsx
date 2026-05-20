"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type Props = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};


const partnerLinks = [
  { label: "Siemens Opcenter", href: "/siemens-opcenter-mes" },
  { label: "Critical Manufacturing", href: "/critical-manufacturing" },
  { label: "Eyelit", href: "/eyelit" },
  {
    label: "Twinzo",
    href: "/blog/authorised-reseller-partnership-with-twinzo",
  },
];

const mesSolutionLinks = [
  // { label: "MES Implementation Services", href: "/mes-implementation-services" },
  { label: "Siemens Opcenter MES Implementation", href: "/siemens-opcenter-mes" },
  { label: "Critical Manufacturing MES Implementation", href: "/critical-manufacturing" },
  // { label: "Eyelit MES", href: "/eyelit" },
  // { label: "Twinzo Digital Twin", href: "/twinzo" },
];

const otherSolutionLinks = [
  { label: "Oracle On-Prem +", href: "/solutions/oracle-on-prem" },
  { label: "Oracle Cloud",     href: "/solutions/oracle-cloud" },   
  { label: "PLM",              href: "/solutions/plm" },             
  { label: "Cyber Security",   href: "/solutions/cyber-security-service" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "News Room", href: "/newsroom" },
  { label: "Webinars", href: "/webinars" },
];
  
const itemCls =
  "flex items-center gap-2 w-full px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium text-gray-700 \
   hover:text-[#1c4584] hover:bg-[#1c4584]/6 transition-colors duration-150 group";

export default function HeaderMenu({ variant = "desktop", onNavigate }: Props) {
  const isMobile = variant === "mobile";

  const [open, setOpen] = useState<string | null>(null);
  const [openMES, setOpenMES] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (menu: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(menu);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(null);
      setOpenMES(false);
    }, 160);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const toggle = (menu: string) =>
    setOpen((prev) => (prev === menu ? null : menu));

  // ── MOBILE ────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <MobileAccordion
          label="Partners"
          isOpen={open === "partners"}
          onToggle={() => toggle("partners")}
        >
          {partnerLinks.map((l) => (
            <MobileSubLink key={l.href} href={l.href} onClick={onNavigate}>
              {l.label}
            </MobileSubLink>
          ))}
        </MobileAccordion>

        <MobileAccordion
          label="Solutions & Services"
          isOpen={open === "solutions"}
          onToggle={() => toggle("solutions")}
        >
          <MobileAccordion
            label="MES Solutions"
            href="/solutions/mes"
            isOpen={openMES}
            onToggle={() => setOpenMES((v) => !v)}
            nested
          >
            {mesSolutionLinks.map((l) => (
              <MobileSubLink
                key={l.href}
                href={l.href}
                onClick={onNavigate}
                deep
              >
                {l.label}
              </MobileSubLink>
            ))}
          </MobileAccordion>

          {otherSolutionLinks.map((l) => (
            <MobileSubLink key={l.href} href={l.href} onClick={onNavigate}>
              {l.label}
            </MobileSubLink>
          ))}
        </MobileAccordion>

        <MobileAccordion
          label="Resources"
          isOpen={open === "resources"}
          onToggle={() => toggle("resources")}
        >
          {resourceLinks.map((l) => (
            <MobileSubLink key={l.href} href={l.href} onClick={onNavigate}>
              {l.label}
            </MobileSubLink>
          ))}
        </MobileAccordion>
      </div>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────────────────────
  return (
    <>
      <DesktopDropdownWrapper
        label="Partners"
        compactLabel="Partners"
        isOpen={open === "partners"}
        onEnter={() => openMenu("partners")}
        onLeave={scheduleClose}
      >
        <DropdownPanel onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          {partnerLinks.map((l) => (
            <Link key={l.href} href={l.href} className={itemCls}>
              {/* <span className="h-1.5 w-1.5 rounded-full bg-[#17ace4] opacity-0 group-hover:opacity-100 transition-opacity" /> */}
              {l.label}
            </Link>
          ))}
        </DropdownPanel>
      </DesktopDropdownWrapper>

      <DesktopDropdownWrapper
        label="Solutions & Services"
        compactLabel="Solutions"
        isOpen={open === "solutions"}
        onEnter={() => openMenu("solutions")}
        onLeave={scheduleClose}
      >
        <DropdownPanel
          wide
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div
            className="relative"
            onMouseEnter={() => setOpenMES(true)}
            onMouseLeave={() => setOpenMES(false)}
          >
            <Link
              href="/solutions/mes"
              className={`${itemCls} justify-between`}
            >
              <span className="flex items-center gap-2">
                {/* <span className="h-1.5 w-1.5 rounded-full bg-[#17ace4] opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                MES Solutions
              </span>
              <ChevronRight
                size={13}
                className={`text-gray-400 transition-transform duration-200 ${
                  openMES ? "rotate-90" : ""
                }`}
              />
            </Link>

            {openMES && (
              <div
                className="absolute left-full top-0 z-10 w-56 rounded-xl bg-white
                            shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100
                            p-2 animate-fadeIn"
              >
                {mesSolutionLinks.map((l) => (
                  <Link key={l.href} href={l.href} className={itemCls}>
                    {/* <span className="h-1.5 w-1.5 rounded-full bg-[#17ace4] opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="my-1.5 h-px bg-gray-100 mx-2" />

          {otherSolutionLinks.map((l) => (
            <Link key={l.href} href={l.href} className={itemCls}>
              {/* <span className="h-1.5 w-1.5 rounded-full bg-[#17ace4] opacity-0 group-hover:opacity-100 transition-opacity" /> */}
              {l.label}
            </Link>
          ))}
        </DropdownPanel>
      </DesktopDropdownWrapper>

      <DesktopDropdownWrapper
        label="Resources"
        compactLabel="Resources"
        isOpen={open === "resources"}
        onEnter={() => openMenu("resources")}
        onLeave={scheduleClose}
      >
        <DropdownPanel onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          {resourceLinks.map((l) => (
            <Link key={l.href} href={l.href} className={itemCls}>
              {/* <span className="h-1.5 w-1.5 rounded-full bg-[#17ace4] opacity-0 group-hover:opacity-100 transition-opacity" /> */}
              {l.label}
            </Link>
          ))}
        </DropdownPanel>
      </DesktopDropdownWrapper>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.18s ease both; }
      `}</style>
    </>
  );
}

// ── DESKTOP SUB-COMPONENTS ────────────────────────────────────────────────

function DesktopDropdownWrapper({
  label,
  compactLabel,
  isOpen,
  onEnter,
  onLeave,
  children,
}: {
  label: string;
  compactLabel?: string;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className={[
          "flex items-center gap-1.5 whitespace-nowrap px-2 min-[1180px]:px-3 py-2 rounded-lg text-[13px] min-[1180px]:text-[14.5px] font-medium",
          "transition-colors duration-150",
          isOpen
            ? "text-[#1c4584] bg-[#1c4584]/6"
            : "text-gray-700 hover:text-[#1c4584] hover:bg-[#1c4584]/5",
        ].join(" ")}
      >
        {compactLabel && compactLabel !== label ? (
          <>
            <span className="min-[1180px]:hidden">{compactLabel}</span>
            <span className="hidden min-[1180px]:inline">{label}</span>
          </>
        ) : (
          label
        )}
        <ChevronDown
          size={14}
          strokeWidth={2.2}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && children}
    </div>
  );
}

function DropdownPanel({
  wide = false,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  wide?: boolean;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={[
        "absolute left-0 top-[calc(100%+6px)] z-50 rounded-xl bg-white p-2",
        "shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100",
        "animate-fadeIn",
        wide ? "w-80" : "w-60",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

// ── MOBILE SUB-COMPONENTS ─────────────────────────────────────────────────

function MobileAccordion({
  label,
  href,
  isOpen,
  onToggle,
  nested = false,
  children,
}: {
  label: string;
  href?: string;         
  isOpen: boolean;
  onToggle: () => void;
  nested?: boolean;
  children: React.ReactNode;
}) {
  const labelBaseCls = [
    "font-medium transition-colors duration-150",
    nested
      ? "pl-3 text-[13.5px] text-gray-600"
      : "text-[15px] text-gray-700",
    isOpen ? "text-[#1c4584]" : "hover:text-[#1c4584]",
  ].join(" ");

  return (
    <div className={nested ? "w-full" : "border-b border-gray-100 w-full"}>
      <div className={`flex w-full items-center ${nested ? "py-0" : "py-0"}`}>
        {href ? (
          <>
            <Link
              href={href}
              className={`flex-1 py-3.5 ${labelBaseCls}`}
            >
              {label}
            </Link>
            <button
              onClick={onToggle}
              aria-label={`Toggle ${label} submenu`}
              className="px-2 py-3.5 hover:text-[#1c4584] transition-colors duration-150"
            >
              <ChevronDown
                size={15}
                strokeWidth={2.2}
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </>
        ) : (
          <button
            onClick={onToggle}
            className={`flex w-full items-center justify-between py-3.5 ${labelBaseCls}`}
          >
            {label}
            <ChevronDown
              size={15}
              strokeWidth={2.2}
              className={`transition-transform duration-200 mr-1 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      <div
        className={[
          "overflow-hidden transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)]",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col pb-2">{children}</div>
      </div>
    </div>
  );
}

function MobileSubLink({
  href,
  onClick,
  deep = false,
  children,
}: {
  href: string;
  onClick?: () => void;
  deep?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "flex items-center gap-2 py-2 text-gray-600 hover:text-[#1c4584] transition-colors duration-150",
        deep ? "pl-8 text-[13px]" : "pl-4 text-[13.5px]",
      ].join(" ")}
    >
      <span className="h-1 w-1 rounded-full bg-[#17ace4] flex-shrink-0" />
      {children}
    </Link>
  );
}