"use client";

import { useState, useEffect, useRef, SetStateAction } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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

const slides = [
  {
    title:
      "Building the Future of Manufacturing: Achieving Scalability and Compliance with Siemens and Athena.",
    cta: "Download Now",
    link: "/webinars/building-future-manufacturing-siemens-athena",
    image: "/assets/images/webiner-banner.webp",
  },
  // {
  //   title: "Gain End-to-End Visibility in Medical Device Manufacturing",
  //   desc: "Watch the on-demand webinar to learn how manufacturers achieve visibility, compliance, and operational excellence.",
  //   cta: "Download Now",
  //   image: "/assets/images/MDM.webp",
  // },
  {
    title: "Digitizing the Manufacturing Enterprise Since 2011",
    desc: "Leveraging deep expertise to enhance partnerships and drive long-term manufacturing success.",
    cta: "Connect Us",
    link: "/contact",
    image: "/assets/images/DME.webp",
  },
  {
    title: "About Us",
    desc: "Athena is an Industry 4.0 Enterprise Manufacturing Solutions provider, assisting companies and driving their Industry 4.0 roadmap, centered on Digital Transformation.",
    cta: "About Us",
    link: "/about",
    image: "/assets/images/aboutus.webp",
  },
  {
    title: "Expertise in MES, PLM, ERP & More",
    desc: "Specialized in MES, PLM, ERP, CMMS, and smart factory analytics.",
    cta: "MES, PLM & More",
    link: "/solutions/mes",
    image: "/assets/images/mlsandpls.webp",
  },
  {
    title: "Siemens Alliance Partner",
    desc: "Experienced in implementing and upgrading Opcenter MES across versions, from Camstar 3.2 to Opcenter 2410, ensuring seamless transitions and optimized performance.",
    cta: "Siemens Alliance Partner",
    link: "/siemens-opcenter-mes",
    image: "/assets/images/s8.webp",
  },
  {
    title: "Critical Manufacturing Premier Implementation Partner",
    desc: "Athena specializes in the implementation, upgrade, and customization of CM MES, along with seamless integrations with PLM, ERP, LIMS, and Camline.",
    cta: "Critical Manufacturing",
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
  // {
  //   title: "Eyelit Implementation Partner",
  //   desc: "As an official Eyelit Technologies partner, Athena delivers expertise in deploying Eyelit MES and Equipment Connect across semiconductor, solar, LED/laser diode, and medical device industries.",
  //   cta: "Eyelit",
  //   link: "/eyelit",
  //   image: "/assets/images/eyelitsbanner.webp",
  // },
  {
    title: "ECO Accelerators",
    desc: "Speed up engineering change workflows with intelligent automation. ECO Accelerators handle tracking, approvals, execution, and traceability while ensuring compliance.",
    cta: "Accelerators",
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
  const titleVariant = getTitleVariant(activeSlide.title);
  const contentShellClassName = `hero-carousel__content-shell mx-auto sm:mx-0 ${
    titleVariant === "very-long"
      ? "hero-carousel__content-shell--very-wide"
      : titleVariant === "long"
        ? "hero-carousel__content-shell--wide"
        : ""
  }`;
  const titleClassName = `hero-carousel__title mb-3 sm:mb-5 ${
    titleVariant === "very-long"
      ? "hero-carousel__title--very-long"
      : titleVariant === "long"
        ? "hero-carousel__title--long"
        : ""
  }`;

   const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const changeSlide = (newIndex: SetStateAction<number>) => {
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
    <section
      className="hero-carousel relative flex min-h-[51vh] w-full items-center overflow-hidden sm:min-h-[57vh] md:min-h-[62vh] lg:min-h-[57vh]"
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
              className={`hero-carousel__image ${
                i === 0 ? "hero-carousel__image--webinar" : ""
              } object-cover transition-opacity duration-700 ease-in-out ${
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          );
        })}
        <div className="hero-carousel__scrim absolute inset-0 z-20" />
      </div>

      <div
        className={`relative z-30 w-full px-4 sm:px-10 md:px-16 lg:px-28 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={contentShellClassName}>
          <h1 className={titleClassName}>
            {activeSlide.title.split(/(Faborchestrator)/gi).map((part, i) =>
              part.toLowerCase() === "faborchestrator" ? (
                <span key={i} style={{ color: "#f5c718" }}>
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </h1>

          <p className="hero-carousel__desc mb-5 sm:mb-7">
            {activeSlide.desc}
          </p>

          <Link
            href={activeSlide.link}
            className="hero-carousel__cta cta-btn relative overflow-hidden inline-flex
                       text-white font-semibold
                       text-sm sm:text-base
                       px-5 sm:px-7 md:px-8
                       py-2.5 sm:py-3
                       rounded-xl cursor-pointer"
          >
            <span className="relative z-10">{activeSlide.cta}</span>
            <span className="shine" />
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex
                   flex items-center justify-center
                   w-9 h-9 sm:w-11 sm:h-11
                   rounded-full cursor-pointer
                   bg-black/50 hover:bg-black/70
                   border border-white/20 hover:border-white/40
                   text-white shadow-lg
                   backdrop-blur-sm
                   transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft size={20} strokeWidth={2.2} />
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex
                   flex items-center justify-center
                   w-9 h-9 sm:w-11 sm:h-11
                   rounded-full cursor-pointer
                   bg-black/50 hover:bg-black/70
                   border border-white/20 hover:border-white/40
                   text-white shadow-lg
                   backdrop-blur-sm
                   transition-all duration-200 hover:scale-110"
      >
        <ChevronRight size={20} strokeWidth={2.2} />
      </button>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 sm:gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 cursor-pointer
              ${
                i === index
                  ? "w-6 sm:w-7 h-2.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
