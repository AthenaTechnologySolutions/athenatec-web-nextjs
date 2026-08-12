import Image from "next/image";
import Link from "next/link";
import { HeroSlideData } from "./types";
import { ArrowRight, PlayCircle } from "lucide-react";

interface HeroSlideProps {
  slide: HeroSlideData;
  isActive: boolean;
}

export default function HeroSlide({ slide, isActive }: HeroSlideProps) {
  return (
    <div className="relative flex h-[100vh] w-full items-center pb-36 sm:pb-40 md:pb-44">

      {/* Background Media — fully visible, no dimming */}
     <div className="absolute inset-0 bg-[#15356e]/80 md:bg-gradient-to-r md:from-[#15356e]/90 md:via-[#15356e]/40 md:to-transparent">

        {slide.media.type === "video" ? (
          <video
            src={slide.media.src}
            autoPlay={isActive}
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={slide.media.src}
            alt={slide.media.alt || slide.title}
            fill
            priority
             className="object-cover brightness-110 saturate-110" 
          />
        )}

        {/*
          ✅ AVEVA-style "blind" overlay:
          - Left 55%: strong charcoal/navy shadow so text is readable
          - Fades to transparent on the right so the image shows through clearly
          - No full-bleed dark overlay — background is visible on the right half
        */}
        <div className="absolute inset-0 md:bg-gradient-to-r md:from-[#15356e]/95 md:via-[#15356e]/70 md:to-transparent" />
      </div>

      {/* Content — sits on the left over the gradient blind */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div
          className={`w-full max-w-2xl transform transition-all duration-1000 ease-out ${
            isActive
              ? "translate-y-0 opacity-100 delay-300"
              : "translate-y-8 opacity-0"
          }`}
        >
          {slide.id === "1" ? (
            <h1 
              className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)" }}
            >
              {slide.title}
            </h1>
          ) : (
            <h2 
              className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)" }}
            >
              {slide.title}
            </h2>
          )}

          {/* ✅ Purple accent underline — matches AVEVA style */}
          {/* <div className="mb-5 h-[3px] w-20 rounded-full bg-[#1c4584]" /> */}

          <p 
            className="mb-6 max-w-xl text-base text-white/90 sm:text-lg md:text-xl font-medium"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
          >
            {slide.subtitle}
          </p>

          {slide.ctas && slide.ctas.length > 0 && (
            <div className="flex flex-col gap-3 xs:flex-row sm:flex-row">
              {slide.ctas.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.href}
                  className={`inline-flex w-full items-center justify-center rounded px-6 py-3 text-sm font-semibold transition-all xs:w-auto sm:w-auto ${
                    cta.variant === "secondary"
                      ? "border-2 border-white/60 text-white hover:border-white hover:bg-white/10"
                      : cta.variant === "outline"
                      ? "border-2 border-white text-white hover:bg-white hover:text-slate-900"
                      : "bg-[#17ace4] text-white hover:bg-[#1c4584]"
                  }`}
                >
                  {cta.label}
                  {cta.variant === "secondary" ? (
                    <PlayCircle className="ml-2 h-4 w-4" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}