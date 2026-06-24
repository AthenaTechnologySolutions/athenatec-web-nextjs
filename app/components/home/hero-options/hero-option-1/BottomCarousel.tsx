"use client";

import { CarouselStat } from "./types";

interface BottomCarouselProps {
  stats: CarouselStat[];
  description?: string; // e.g. "Achieve a fast time to value..."
}

export default function BottomCarousel({ stats, description }: BottomCarouselProps) {
  if (!stats || stats.length === 0) return null;

  return (
     
    <div className="pointer-events-none w-full border-white/10 py-4 sm:py-5">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">

        {/* Optional description text — matches "Achieve a fast time to value..." */}
        {description && (
          <p className="mx-auto mb-4 max-w-3xl text-sm text-white/90 sm:mb-6 sm:text-base md:text-lg">
            {description}
          </p>
        )}

        {/* ✅ Centered stat cards — flex wrap, justify-center */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-center transition-colors hover:bg-white/15 sm:px-6 sm:py-4"
            >
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-widest text-[#17ace4] sm:text-[10px]">
                {stat.label}
              </span>
              <span className="block text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </span>
              {stat.description && (
                <span className="mt-1 block text-[10px] text-white/60 sm:text-xs">
                  {stat.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    );
}
