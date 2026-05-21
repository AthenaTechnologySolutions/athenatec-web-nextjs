"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const SIEMENS_LIVE_SLIDE_ID = "siemens-realize-live-2026";
// Count through May 31 using Detroit/US Eastern daylight time.
const SIEMENS_COUNTDOWN_END_TIME = new Date(
  "2026-06-01T00:00:00-04:00",
).getTime();
const SIEMENS_LIVE_END_TIME = new Date("2026-06-05T00:00:00-04:00").getTime();
const DAY_IN_MS = 24 * 60 * 60 * 1000;

type HeroSlide = {
  id?: string;
  title: string;
  desc?: string;
  cta: string;
  link?: string;
  image: string;
  imageClassName?: string;
  action?: "siemens-live-registration";
};

function getTitleVariant(title: string) {
  const wordCount = title.trim().split(/\s+/).length;
  const characterCount = title.length;

  if (characterCount >= 52 || wordCount >= 7) {
    return "very-long";
  }

  if (characterCount >= 34 || wordCount >= 5) {
    return "long";
  }

  return "default";
}

function getSiemensLiveCountdown(now = new Date()) {
  const currentTime = now.getTime();

  if (currentTime >= SIEMENS_LIVE_END_TIME) {
    return { value: "0", label: "event complete" };
  }

  if (currentTime >= SIEMENS_COUNTDOWN_END_TIME) {
   return {
  value: "LIVE",
  label: "HAPPENING NOW • DETROIT",
};
  }

 const remainingTime = SIEMENS_COUNTDOWN_END_TIME - currentTime;

const days = Math.floor(remainingTime / DAY_IN_MS);

if (days >= 1) {
  return {
    value: days.toString(),
    label: days === 1 ? "DAY LEFT TO MAY 31" : "DAYS LEFT TO MAY 31",
  };
}

const hours = Math.floor(
  (remainingTime % DAY_IN_MS) / (1000 * 60 * 60),
);

const minutes = Math.floor(
  (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
);

return {
  value: `${hours}H ${minutes}M`,
  label: "EVENT STARTING SOON",
};
}

const slides: HeroSlide[] = [
  {
    id: SIEMENS_LIVE_SLIDE_ID,
    title: "Siemens Realize LIVE 2026",
    desc: "Infinite possibilities. Intelligent tomorrow. Join Athenatec at Realize LIVE 2026 to discover how Athena Opcenter, Opcenter Accelerators, and FabOrchestrator.AI drive innovation, efficiency, and intelligence across manufacturing enterprises.",
    cta: "Book a meeting",
    link: "/siemens-realize-live-2026-faborchestrator-ai",
    image: "/assets/images/siemens-realize-live2026.webp",
    imageClassName: "hero-carousel__image--siemens-live",
  },

  {
    title:
      "Building the Future of Manufacturing: Achieving Scalability and Compliance with Siemens and Athena.",
    cta: "Download Now",
    link: "/webinars/building-future-manufacturing-siemens-athena",
    image: "/assets/images/webiner-banner.webp",
    imageClassName: "hero-carousel__image--webinar",
  },
  {
    title: "Digitizing the Manufacturing Enterprise Since 2011",
    desc: "Leveraging deep expertise to enhance partnerships and drive long-term manufacturing success.",
    cta: "Discuss your manufacturing roadmap",
    link: "/contact",
    image: "/assets/images/DME.webp",
  },
  {
    title: "About Us",
    desc: "Athena is an Industry 4.0 Enterprise Manufacturing Solutions provider, assisting companies and driving their Industry 4.0 roadmap, centered on Digital Transformation.",
    cta: "Meet our manufacturing experts",
    link: "/about",
    image: "/assets/images/aboutus.webp",
  },
  {
    title: "Expertise in MES, PLM, ERP & More",
    desc: "Specialized in MES, PLM, ERP, CMMS, and smart factory analytics.",
    cta: "Explore MES consulting services",
    link: "/solutions/mes",
    image: "/assets/images/mlsandpls.webp",
  },
  {
    title: "Siemens Alliance Partner",
    desc: "Experienced in implementing and upgrading Opcenter MES across versions, from Camstar 3.2 to Opcenter 2410, ensuring seamless transitions and optimized performance.",
    cta: "Siemens Opcenter MES implementation",
    link: "/siemens-opcenter-mes",
    image: "/assets/images/s8.webp",
  },
  {
    title: "Critical Manufacturing Premier Implementation Partner",
    desc: "Athena specializes in the implementation, upgrade, and customization of CM MES, along with seamless integrations with PLM, ERP, LIMS, and Camline.",
    cta: "Critical Manufacturing MES implementation",
    link: "/critical-manufacturing",
    image: "/assets/images/CMC.webp",
  },
  {
    title: "Athena Announces Strategic Authorised Reseller Partnership with twinzo",
    desc: "Strengthening smart manufacturing visibility and operational intelligence through Twinzo's digital twin platform.",
    cta: "twinzo",
    link: "/critical-manufacturing",
    image: "/assets/images/twinzobanners.webp",
  },
  // Eyelit route is disabled for now; keep this slide commented for future reuse.
  {
    title: "ECO Accelerators",
    desc: "Speed up engineering change workflows with intelligent automation. ECO Accelerators handle tracking, approvals, execution, and traceability while ensuring compliance.",
    cta: "MES accelerators for ECO automation",
    link: "/accelerators",
    image: "/assets/images/eco-accelerators.webp",
  },
  {
    title: "Athena Unveils Faborchestrator",
    desc: "The manufacturing industry's first Agentic AI Foundry designed to eliminate operational inefficiencies and unlock unprecedented productivity. Stop chasing data across disconnected systems and start commanding your factory with intelligent AI agents that work alongside your team.",
    cta: "FabOrchestrator AI",
    link: "https://243988893.hs-sites-na2.com/faborchestratorai",
    image: "/assets/images/FabOrchestratorAI.webp",
  },

  // {
  //   title: "Gain End-to-End Visibility in Medical Device Manufacturing",
  //   desc: "Watch the on-demand webinar to learn how manufacturers achieve visibility, compliance, and operational excellence.",
  //   cta: "Download Now",
  //   image: "/assets/images/MDM.webp",
  // },

  // {
  //   title: "Eyelit Implementation Partner",
  //   desc: "As an official Eyelit Technologies partner, Athena delivers expertise in deploying Eyelit MES and Equipment Connect across semiconductor, solar, LED/laser diode, and medical device industries.",
  //   cta: "Eyelit",
  //   link: "/eyelit",
  //   image: "/assets/images/eyelitsbanner.webp",
  // },
  // {
  //   title:
  //     "Athena and Tech Mahindra Announce Partnership to Accelerate Smart Manufacturing",
  //   desc: "Driving AI-enabled MES solutions to accelerate smart manufacturing adoption and digital transformation.",
  //   cta: "Tech Mahindra",
  //   image: "/assets/images/tech-mahindra.webp",
  // },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [renderDeferredSlides, setRenderDeferredSlides] = useState(false);
  const total = slides.length;
  const activeSlide = slides[index];
  const isSiemensLiveSlide = activeSlide.id === SIEMENS_LIVE_SLIDE_ID;
  const titleVariant = getTitleVariant(activeSlide.title);
  const contentShellClassName = `hero-carousel__content-shell mx-auto sm:mx-0 ${
    isSiemensLiveSlide
      ? "hero-carousel__content-shell--siemens-live"
      : titleVariant === "very-long"
        ? "hero-carousel__content-shell--very-wide"
        : titleVariant === "long"
          ? "hero-carousel__content-shell--wide"
          : ""
  }`;
  const titleClassName = `hero-carousel__title mb-3 sm:mb-5 ${
    isSiemensLiveSlide
      ? "hero-carousel__title--siemens-live"
      : titleVariant === "very-long"
        ? "hero-carousel__title--very-long"
        : titleVariant === "long"
          ? "hero-carousel__title--long"
          : ""
  }`;

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const changeSlide = (newIndex: number) => {
    setFade(false);
    setTimeout(() => {
      setIndex(newIndex);
      setFade(true);
    }, 300);
  };

  const prev = () => changeSlide(index === 0 ? total - 1 : index - 1);
  const next = () => changeSlide(index === total - 1 ? 0 : index + 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      isSwiping.current = true;
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !isSwiping.current) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 50;

    if (deltaX < -SWIPE_THRESHOLD) {
      next();
    } else if (deltaX > SWIPE_THRESHOLD) {
      prev();
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide(index === total - 1 ? 0 : index + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [index, total]);

  useEffect(() => {
    const scheduleDeferredImages = () => {
      const requestIdle =
        window.requestIdleCallback ?? ((callback) => window.setTimeout(callback, 1));
      const cancelIdle =
        window.cancelIdleCallback ?? ((id) => window.clearTimeout(id));
      const idleId = requestIdle(() => setRenderDeferredSlides(true));

      return () => cancelIdle(idleId);
    };

    if (document.readyState === "complete") {
      return scheduleDeferredImages();
    }

    let cleanup: void | (() => void);
    const onLoad = () => {
      cleanup = scheduleDeferredImages();
    };

    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      cleanup?.();
    };
  }, []);

  return (
    <>
      <section
        className={`hero-carousel relative flex min-h-[51vh] w-full items-center overflow-hidden sm:min-h-[57vh] md:min-h-[62vh] lg:min-h-[57vh] ${
          isSiemensLiveSlide ? "hero-carousel--siemens-live" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        <div className="absolute inset-0">
          {slides.map((slide, i) => {
            const shouldRender = i === 0 || i === index || renderDeferredSlides;

            if (!shouldRender) return null;

            return (
              <Image
                key={i}
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                sizes="100vw"
                quality={75}
                className={`hero-carousel__image ${slide.imageClassName ?? ""} object-cover transition-opacity duration-700 ease-in-out ${
                  i === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            );
          })}
          <div className="hero-carousel__scrim absolute inset-0 z-20" />
        </div>

        <div
          className={`relative z-30 w-full px-4 transition-opacity duration-500 sm:px-10 md:px-16 lg:px-28 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={contentShellClassName}>
            <h1 className={titleClassName}>{renderSlideTitle(activeSlide)}</h1>

            {renderSlideDescription(activeSlide)}

            {activeSlide.link ? (
              <Link
                href={activeSlide.link}
                className="hero-carousel__cta cta-btn relative inline-flex cursor-pointer overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold text-white sm:px-7 sm:py-3 sm:text-base md:px-8"
              >
                <span className="relative z-10">{activeSlide.cta}</span>
                <span className="shine" />
              </Link>
            ) : null}

            {isSiemensLiveSlide && <SiemensLiveEventInfo />}
          </div>
        </div>

        {isSiemensLiveSlide && <SiemensLiveCountdownBadge />}

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-40 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-white/40 hover:bg-black/70 sm:left-4 sm:h-11 sm:w-11 md:flex"
        >
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>

        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-40 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-white/40 hover:bg-black/70 sm:right-4 sm:h-11 sm:w-11 md:flex"
        >
          <ChevronRight size={20} strokeWidth={2.2} />
        </button>

        <div className="hero-carousel__dots absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2 sm:bottom-6 sm:gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => changeSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                i === index
                  ? "h-2.5 w-6 bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)] sm:w-7"
                  : "h-2.5 w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function renderSlideTitle(slide: HeroSlide) {
  if (slide.id === SIEMENS_LIVE_SLIDE_ID) {
    return (
      <>
        <span className="hero-carousel__siemens-eyebrow">SIEMENS</span>
        <span className="hero-carousel__siemens-title">
          Realize <span>LIVE 2026</span>
        </span>
      </>
    );
  }

  return slide.title.split(/(Faborchestrator)/gi).map((part, i) =>
    part.toLowerCase() === "faborchestrator" ? (
      <span key={i} style={{ color: "#f5c718" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function renderSlideDescription(slide: HeroSlide) {
  if (slide.id === SIEMENS_LIVE_SLIDE_ID) {
    return (
      <p className="hero-carousel__desc hero-carousel__desc--siemens mb-5 sm:mb-7">
        <span>Infinite possibilities. Intelligent tomorrow.</span>
        Join Athenatec at Realize LIVE 2026 to discover how{" "}
        <strong>Athena Opcenter</strong>, <strong>Opcenter Accelerators</strong>
        , and <strong>FabOrchestrator.AI &trade;</strong> drive innovation,
        efficiency, and intelligence across manufacturing enterprises.
      </p>
    );
  }

  if (!slide.desc) return null;

  return <p className="hero-carousel__desc mb-5 sm:mb-7">{slide.desc}</p>;
}

function SiemensLiveCountdownBadge() {
  const [countdown, setCountdown] = useState(() => getSiemensLiveCountdown());

  useEffect(() => {
    const updateCountdown = () => setCountdown(getSiemensLiveCountdown());
    const timer = window.setInterval(updateCountdown, 60 * 1000);

    updateCountdown();

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-carousel__siemens-countdown" aria-live="polite">
      <span className="hero-carousel__siemens-countdown-value">
        {countdown.value}
      </span>
      <span className="hero-carousel__siemens-countdown-label">
        {countdown.label}
      </span>
    </div>
  );
}

function SiemensLiveEventInfo() {
  return (
    <div
      className="hero-carousel__siemens-event"
      aria-label="Siemens Realize LIVE 2026 event details"
    >
      <div className="hero-carousel__siemens-event-column">
        <p className="hero-carousel__siemens-event-heading">
          <strong>Athena</strong> is heading to <span>Detroit</span>
        </p>
        <ul className="hero-carousel__siemens-event-list">
          <li>
            <CalendarDays size={19} />
            <span>June 1-4, 2026</span>
          </li>
          <li>
            <MapPin size={20} />
            <span>Huntington Place, Detroit</span>
          </li>
          <li>
            <Building2 size={19} />
            <span>Booth No: P2</span>
          </li>
        </ul>
      </div>

      <div className="hero-carousel__siemens-event-divider" />

      <div className="hero-carousel__siemens-event-column">
        <p className="hero-carousel__siemens-talk-heading">
          What we will talk about
        </p>
        <ul className="hero-carousel__siemens-talk-list">
          <li>
            <CheckCircle2 size={20} />
            <span>Athena Opcenter Capabilities</span>
          </li>
          <li>
            <CheckCircle2 size={20} />
            <span>Opcenter Accelerators</span>
          </li>
          <li>
            <CheckCircle2 size={20} />
            <span>FabOrchestrator.AI&trade;</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
