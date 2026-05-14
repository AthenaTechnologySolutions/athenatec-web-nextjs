"use client";
import HeroCarousel from "./HeroCarousel";
import "./hero.scss";
import { useEffect, useState, useRef } from "react";
import { logos } from "@/app/components/ClientLogos";
import Image from "next/image";
import { Building2, Globe2, MapPin, UsersRound } from "lucide-react";

const statItems = [
  {
    title: "Founded",
    value: 2011,
    subtitle: "15+ years experience",
    icon: Building2,
  },
  {
    title: "Team Strength",
    value: 150,
    suffix: "+",
    subtitle: "Industry experts",
    icon: UsersRound,
  },
  {
    title: "Global HQ",
    value: "USA",
    subtitle: "California",
    icon: Globe2,
  },
  {
    title: "Delivery Centers",
    value: "India",
    subtitle: "Bangalore, Hyderabad, Chennai & Trichy",
    icon: MapPin,
  },
];

export default function HeroSection() {
  const [cloneMarquee, setCloneMarquee] = useState(false);

  useEffect(() => {
    const scheduleClone = () => {
      const requestIdle =
        window.requestIdleCallback ?? ((callback) => window.setTimeout(callback, 1));
      const cancelIdle =
        window.cancelIdleCallback ?? ((id) => window.clearTimeout(id));
      const idleId = requestIdle(() => setCloneMarquee(true));

      return () => cancelIdle(idleId);
    };

    if (document.readyState === "complete") {
      return scheduleClone();
    }

    let cleanup: void | (() => void);
    const onLoad = () => {
      cleanup = scheduleClone();
    };

    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      cleanup?.();
    };
  }, []);

  const marqueeLogos = cloneMarquee ? [...logos, ...logos] : logos;

  return (
    <>
      <section className="relative overflow-hidden bg-[#f5fafd] pt-[72px]">
        <div className="relative">
          <HeroCarousel />
        </div>

        <div className="relative overflow-hidden border-t border-[#dbe9f3] bg-[#f5fafd] py-3 text-[#10233f] shadow-[0_-12px_34px_rgba(28,69,132,0.08)] sm:py-4">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(23,172,228,0.13),rgba(255,255,255,0.78)_42%,rgba(28,69,132,0.08))]" />
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#17ace4]/60 to-transparent" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6">
            <div className="mb-3 flex flex-col items-center justify-between gap-2 text-center md:mb-4">
              {/* <span className="rounded-full border border-[#17ace4]/35 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1c4584] shadow-sm">
                Athena at a glance
              </span> */}
              <h2 className="max-w-[21rem] text-balance break-words text-lg font-semibold leading-tight text-[#07152d] sm:max-w-3xl sm:text-2xl">
                A Decade of Delivering Manufacturing Excellence
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 text-[#10233f] sm:grid-cols-2 md:grid-cols-4 md:gap-4">
              {statItems.map((item) =>
                typeof item.value === "number" ? (
                  <StatCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    suffix={item.suffix}
                    subtitle={item.subtitle}
                    icon={item.icon}
                  />
                ) : (
                  <InfoCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    subtitle={item.subtitle}
                    icon={item.icon}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-16 overflow-hidden">
        <div className="mx-auto px-6 mb-8">
          <h3 className="text-center text-lg text-gray-600 font-bold">
            Trusted by Global Manufacturing Leaders
          </h3>
        </div>

        <div className="relative overflow-hidden w-full">
          <div className={`marquee-track ${cloneMarquee ? "is-animated" : ""}`}>
            {marqueeLogos.map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="relative h-[88px] w-[160px] shrink-0"
                aria-hidden={i >= logos.length}
              >
                <Image
                  src={logo.src}
                  alt={i >= logos.length ? "" : logo.name}
                  width={160}
                  height={88}
                  sizes="160px"
                  className="h-full w-full object-contain opacity-80"
                  loading="lazy"
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
function InfoCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
}) {
  return (
    <div className="group relative min-h-[116px] overflow-hidden rounded-xl border border-[#d9e7f2] bg-white/90 p-3 text-center shadow-[0_10px_26px_rgba(28,69,132,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#17ace4]/70 hover:bg-white hover:shadow-[0_18px_36px_rgba(28,69,132,0.16)] md:min-h-[124px] md:p-4">
      <div className="absolute inset-x-5 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-[#17ace4] to-[#1c4584] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf8fe] text-[#1c4584] ring-1 ring-[#17ace4]/25 transition-all duration-300 group-hover:bg-[#17ace4] group-hover:text-white group-hover:ring-[#17ace4]">
        <Icon size={18} strokeWidth={2.2} />
      </div>
      <p className="mb-1 text-sm font-medium text-[#5f6b7c]">{title}</p>
      <p className="mb-1 text-2xl font-semibold text-[#07152d] sm:text-3xl">
        {value}
      </p>
      <p className="mx-auto max-w-[15rem] text-xs leading-snug text-[#3f4f64] sm:text-sm">
        {subtitle}
      </p>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  suffix?: string;
  subtitle: string;
  icon: React.ElementType;
};

function StatCard({
  title,
  value,
  suffix = "",
  subtitle,
  icon: Icon,
}: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const animateCount = () => {
      const duration = 1500;
      const startTime = performance.now();

      const update = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div
      ref={ref}
      className="group relative min-h-[116px] overflow-hidden rounded-xl border border-[#d9e7f2] bg-white/90 p-3 text-center shadow-[0_10px_26px_rgba(28,69,132,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#17ace4]/70 hover:bg-white hover:shadow-[0_18px_36px_rgba(28,69,132,0.16)] md:min-h-[124px] md:p-4"
    >
      <div className="absolute inset-x-5 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-[#17ace4] to-[#1c4584] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf8fe] text-[#1c4584] ring-1 ring-[#17ace4]/25 transition-all duration-300 group-hover:bg-[#17ace4] group-hover:text-white group-hover:ring-[#17ace4]">
        <Icon size={18} strokeWidth={2.2} />
      </div>
      <p className="mb-1 text-sm font-medium text-[#5f6b7c]">{title}</p>
      <p className="mb-1 text-2xl font-semibold text-[#07152d] sm:text-3xl">
        {count}
        {suffix}
      </p>
      <p className="text-xs leading-snug text-[#3f4f64] sm:text-sm">
        {subtitle}
      </p>
    </div>
  );
}
