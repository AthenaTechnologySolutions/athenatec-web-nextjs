"use client";

import { useState } from "react";
import DownloadForm from "@/app/components/casestudies-form/DownloadForm";

type ParagraphItem =
  | string
  | {
      text: string;
      href: string;
      external?: boolean;
    };

type Section = {
  heading?: string;
  paragraphs?: ParagraphItem[][];
  bullets?: string[];
};

type Study = {
  fullTitle: string;
  summary: string[];
  sections: Section[];
};

export default function CaseStudyClient({ study }: { study: Study }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <section className="case-detail py-20">
      <div className="container grid lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6">{study.fullTitle}</h2>

          {!isUnlocked &&
            study.summary.map((para, index) => (
              <p key={index} className="text-gray-600 leading-8 mb-4">
                {para}
              </p>
            ))}

          {isUnlocked &&
            study.sections.map((section, index) => (
              <div key={index} className="space-y-4 mt-10">
                {section.heading && (
                  <h2 className="text-2xl font-semibold mt-8">
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs?.map((para, i) => (
                  <p key={i} className="text-gray-600 leading-8">
                    {para.map((item, index) =>
                      typeof item === "string" ? (
                        item
                      ) : (
                        <a
                          key={index}
                          href={item.href}
                          target={item.external ? "_blank" : "_self"}
                          rel={item.external ? "noopener noreferrer" : ""}
                          className="text-[#1c4584] font-medium underline hover:opacity-80 transition"
                        >
                          {item.text}
                        </a>
                      ),
                    )}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    {section.bullets.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>

         <div>
          {!isUnlocked ? (
            <DownloadForm onSuccess={() => setIsUnlocked(true)} />
          ) : (
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-[#1c4584]">
                Thank You!
              </h3>
              <p className="text-gray-600 mt-2">
                You now have access to the full case study.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
