"use client";

import Image from "next/image";
import Link from "next/link";

interface CTAProps {
  title: React.ReactNode;
  description: string;
  buttonText: string;
  buttonLink: string;
  note?: string;
  backgroundImage: string;
}

export default function CTASection({
  title,
  description,
  buttonText,
  buttonLink,
  note,
  backgroundImage,
}: CTAProps) {
  return (
 <section className="py-20 bg-gray-100">
  <div className="relative mx-auto max-w-[1200px] h-[300px] rounded-3xl overflow-hidden m-5  ">

     <Image
      src={backgroundImage}
      alt="CTA Background" 
      fill
      sizes="(max-width: 1200px) 100vw, 1200px"
      className="object-cover"
    />

     <div className="absolute inset-0 bg-black/55" />

     <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
      <div className="max-w-2xl text-white">

        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {title}
        </h2>

        <p className="text-sm md:text-base mb-6 opacity-95">
          {description}
        </p>

        <Link
          href={buttonLink}
          className="inline-block bg-[#17ace4] hover:bg-[#1c4584] transition-all duration-300 px-8 py-3 rounded-full font-semibold hover:-translate-y-1"
        >
          {buttonText}
        </Link>

        {note && (
          <p className="mt-4 text-xs opacity-80">
            {note}
          </p>
        )}

      </div>
    </div>

  </div>
</section>

  );
}
