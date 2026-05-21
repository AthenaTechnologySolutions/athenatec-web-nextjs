"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import Image from "next/image";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const isDesktop = () => window.innerWidth >= 900;
    const apply = () => {
      document.body.style.overflow = !isDesktop() && mobileOpen ? "hidden" : "";
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", apply);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={[
        "fixed top-0 z-50 w-full bg-white transition-all duration-300",
        scrolled
          ? "shadow-[0_2px_20px_rgba(28,69,132,0.10)] border-b border-gray-100"
          : "shadow-sm",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <div className="relative h-11 w-[220px] sm:h-12 sm:w-[240px] min-[1180px]:h-14 min-[1180px]:w-[290px]">
            <Image
              src="/assets/logo/Athenatec-Logo.png"
              alt="Athena Technology Solutions"
              fill
              sizes="(max-width: 899px) 220px, (max-width: 1179px) 240px, 290px"
              className="object-contain"
              priority
              quality={90}
            />
          </div>
        </Link>

        <nav className="hidden min-[900px]:flex items-center gap-0 min-[1180px]:gap-1 text-[13px] min-[1180px]:text-[14.5px] font-medium text-gray-700">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/accelerators">
            <span className="min-[1180px]:hidden">Accelerators</span>
            <span className="hidden min-[1180px]:inline">
              Athena Accelerators
            </span>
          </NavLink>

          <HeaderMenu variant="desktop" />

          <NavLink href="/careers">Career</NavLink>

          <Link
            href="/contact"
            className="ml-2 min-[1180px]:ml-3 inline-flex items-center whitespace-nowrap rounded-lg bg-[#1c4584] px-3.5 min-[1180px]:px-5 py-2.5 text-[13px] min-[1180px]:text-sm font-semibold text-white
                       transition-all duration-200 hover:bg-[#17ace4] hover:shadow-[0_4px_14px_rgba(23,172,228,0.4)]"
          >
            <span className="min-[1180px]:hidden">Contact</span>
            <span className="hidden min-[1180px]:inline">Contact Us</span>
          </Link>
        </nav>

        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center rounded-lg
                     min-[900px]:hidden
                     transition-colors hover:bg-gray-100"
        >
          <span
            className={`absolute h-[2.5px] w-[22px] rounded-full bg-gray-800
              transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)]
              ${mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-[6px]"}`}
          />
          <span
            className={`absolute h-[2.5px] w-[22px] rounded-full bg-gray-800
              transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)]
              ${mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-[2.5px] w-[22px] rounded-full bg-gray-800
              transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)]
              ${mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-[6px]"}`}
          />
        </button>
      </div>

      <div
        className={[
          "min-[900px]:hidden",
          "bg-white border-t border-gray-100",
          "overflow-hidden transition-all duration-300 ease-[cubic-bezier(.23,1,.32,1)]",
          mobileOpen
            ? "max-h-[calc(100dvh-72px)] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <nav
          className="flex flex-col gap-0 px-5 py-4 text-[15px] text-gray-700
                        max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain"
        >
          <MobileNavLink href="/about" onClick={closeMobile}>
            About
          </MobileNavLink>
          <MobileNavLink href="/accelerators" onClick={closeMobile}>
            Athena Accelerators
          </MobileNavLink>

          <HeaderMenu variant="mobile" onNavigate={closeMobile} />

          <MobileNavLink href="/careers" onClick={closeMobile}>
            Career
          </MobileNavLink>

          <div className="mt-4 pb-2">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="flex w-full items-center justify-center rounded-xl
                         bg-[#1c4584] py-3 text-sm font-semibold text-white
                         transition hover:bg-[#17ace4]"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
}) {
  const classes = `relative whitespace-nowrap px-2 min-[1180px]:px-3 py-2 rounded-lg text-gray-700 transition-colors duration-150
                 hover:text-[#1c4584] hover:bg-[#1c4584]/5
                 after:absolute after:bottom-1 after:left-2 after:right-2 after:h-[2px]
                 after:rounded-full after:bg-[#17ace4] after:scale-x-0 after:origin-left
                 after:transition-transform after:duration-200
                 hover:after:scale-x-100 ${className}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center py-3.5 border-b border-gray-100 font-medium
                 text-gray-700 hover:text-[#1c4584] transition-colors duration-150"
    >
      {children}
    </Link>
  );
}
