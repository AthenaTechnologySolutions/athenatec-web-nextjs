"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CaseStudy = {
  id: number;
  title: string;
  description: string;
  image: string;
  tag?: string;
  link?: string;
};

type Props = {
  title?: string;
  data: CaseStudy[];
  bg?: "light" | "white";
};

export default function CaseStudiesSection({
  title = "Case Studies",
  data,
  bg = "light",
}: Props) {
  return (
    <section
      className={`py-[clamp(60px,8vw,60px)] ${
        bg === "light" ? "bg-[#eef3f8]" : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5">
         <h2 className="text-[clamp(26px,4vw,48px)] font-extrabold text-center text-[#15356e] mb-[clamp(40px,6vw,70px)]">
          {title}
        </h2>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
               <div className="w-full lg:w-1/2 aspect-[16/9] lg:aspect-auto overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={350}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

               <div className="w-full lg:w-1/2 p-[clamp(20px,3vw,30px)] flex flex-col">
                <h3 className="text-[clamp(18px,2.2vw,24px)] font-bold text-[#15356e] mb-3 leading-snug">
                  {item.title}
                </h3>

                {item.tag && (
                  <span className="text-[clamp(14px,1.8vw,18px)] font-semibold text-[#1c4584] mb-2">
                    {item.tag}
                  </span>
                )}

                <p className="text-sm leading-relaxed text-[#15356e] mb-4">
                  {item.description}
                </p>

                {item.link && (
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 mt-auto text-[clamp(14px,2vw,18px)] font-bold text-[#1c4584] transition-all duration-300 hover:text-[#17ace4] "
                  >
                    Download {item.title} case study
                    <ArrowUpRight
                      className="transition-transform duration-300 hover:rotate-44"
                      size={20}
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
