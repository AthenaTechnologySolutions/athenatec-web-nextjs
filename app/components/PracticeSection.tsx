"use client";

import Image from "next/image";

interface CardItem {
  title: string;
  icon: string;
  items: string[];
}

interface PracticeSectionProps {
  title: string;
  cards: CardItem[];
  bottomImage?: string;
}

export default function PracticeSection({
  title,
  cards,
  bottomImage,
}: PracticeSectionProps) {
  return (
    <section className="py-10 px-5">
      <div className="max-w-[1200px] mx-auto bg-[#e9eef5] rounded-[20px] px-10 py-[70px] md:px-6 md:py-12">
        <h2 className="text-center text-[32px] md:text-2xl font-bold text-[#1c4584] mb-[60px]">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative bg-[#f7f9fc] p-10 rounded-[10px] overflow-hidden group transition-all duration-300 hover:shadow-xl"
            >
              <div className="absolute top-0 left-0 h-1 w-0 bg-[#1c4584] transition-all duration-300 group-hover:w-full" />

              <div className="mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-lg">
                <div className="relative h-full w-full">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    fill
                    sizes="80px"
                    className="object-contain"
                    quality={85}
                  />
                </div>
              </div>

              <h3 className="text-[18px] mb-5 text-[#1c4584] font-semibold">
                {card.title}
              </h3>

              <ul className="space-y-3">
                {card.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-[14px] text-[#3a3a3a] relative pl-5 before:content-['✔'] before:absolute before:left-0 before:text-[#1c4584] before:text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {bottomImage && (
        <Image
          src={bottomImage}
          alt="Section Image"
          className="mx-auto mt-10"
          width={1200}
          height={600}
        />
      )}
    </section>
  );
}
