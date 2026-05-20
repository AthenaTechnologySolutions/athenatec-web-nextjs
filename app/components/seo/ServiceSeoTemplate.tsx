import Image from "next/image";
import Link from "next/link";
// import FaqSection, { type FaqItem } from "./FaqSection";
import InternalLinkCluster, {
  manufacturingSeoLinks,
  type InternalLinkItem,
} from "./InternalLinkCluster";

type TextBlock = {
  heading?: string;
  body: string[];
};

type NamedItem = {
  title: string;
  description: string;
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type ServiceSeoTemplateData = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
  intro: TextBlock;
  services: NamedItem[];
  industries: NamedItem[];
  process: ProcessStep[];
  integrations: NamedItem[];
  benefits: NamedItem[];
  proof: NamedItem[];
  caseStudies: Array<NamedItem & { href: string }>;
  // faqs: FaqItem[];
  cta: {
    title: string;
    description: string;
    href: string;
    label: string;
  };
  links?: InternalLinkItem[];
};

export default function ServiceSeoTemplate({ data }: { data: ServiceSeoTemplateData }) {
  return (
    <main>
      <section className="relative flex min-h-[72vh] items-center overflow-hidden pt-[72px] text-white">
        <Image
          src={data.hero.image}
          alt={data.hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,33,0.86),rgba(2,7,33,0.58)_48%,rgba(2,7,33,0.24))]" />
        <div className="container relative z-10 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9de7ff]">
            {data.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {data.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
            {data.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={data.hero.primaryCta.href}
              className="rounded-lg bg-[#17ace4] px-6 py-3 font-semibold text-white transition hover:bg-[#138fc4]"
            >
              {data.hero.primaryCta.label}
            </Link>
            {data.hero.secondaryCta && (
              <Link
                href={data.hero.secondaryCta.href}
                className="rounded-lg border border-white/50 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                {data.hero.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#17ace4]">
              Keyword-focused implementation guide
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#10233f] sm:text-4xl">
              {data.intro.heading}
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-gray-700">
            {data.intro.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <SeoGrid
        eyebrow="Implementation services"
        title="Manufacturing execution system implementation services"
        items={data.services}
      />

      <SeoGrid
        eyebrow="Industries served"
        title="MES implementation experience for complex manufacturers"
        items={data.industries}
        muted
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#17ace4]">
              Delivery process
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#10233f] sm:text-4xl">
              A proven MES implementation process from blueprint to hypercare
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-5">
            {data.process.map((item) => (
              <article
                className="rounded-lg border border-[#dbe9f3] bg-[#f8fbfd] p-5"
                key={item.step}
              >
                <p className="text-sm font-semibold text-[#17ace4]">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[#10233f]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SeoGrid
        eyebrow="Enterprise integrations"
        title="Connect MES with ERP, PLM, equipment, quality, and analytics"
        items={data.integrations}
      />

      <SeoGrid
        eyebrow="Business outcomes"
        title="Commercial benefits of a well-run MES program"
        items={data.benefits}
        muted
      />

      <SeoGrid
        eyebrow="EEAT and delivery proof"
        title="Why manufacturers choose Athenatec for MES consulting services"
        items={data.proof}
      />

      <section className="bg-[#f5fafd] py-16 sm:py-20">
        <div className="container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#17ace4]">
                Case studies
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#10233f] sm:text-4xl">
                MES implementation case study CTAs for manufacturing leaders
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="font-semibold text-[#1c4584] hover:text-[#17ace4]"
            >
              Explore MES and smart manufacturing case studies
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {data.caseStudies.map((item) => (
              <Link
                className="rounded-lg border border-[#dbe9f3] bg-white p-6 shadow-[0_10px_30px_rgba(28,69,132,0.06)] transition hover:-translate-y-1 hover:border-[#17ace4]/70"
                href={item.href}
                key={item.href}
              >
                <h3 className="text-xl font-semibold text-[#1c4584]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* <FaqSection
        title="MES Implementation Services FAQs"
        intro="Answers to common questions from manufacturing executives, IT leaders, quality teams, and operations owners evaluating MES consulting services."
        faqs={data.faqs}
      /> */}

      <InternalLinkCluster links={data.links ?? manufacturingSeoLinks} />

      <section className="bg-[#10233f] py-16 text-white sm:py-20">
        <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              {data.cta.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              {data.cta.description}
            </p>
          </div>
          <Link
            href={data.cta.href}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#17ace4] px-6 py-3 font-semibold text-white transition hover:bg-[#138fc4]"
          >
            {data.cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}

function SeoGrid({
  eyebrow,
  title,
  items,
  muted = false,
}: {
  eyebrow: string;
  title: string;
  items: NamedItem[];
  muted?: boolean;
}) {
  return (
    <section className={`${muted ? "bg-[#f5fafd]" : "bg-white"} py-16 sm:py-20`}>
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#17ace4]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#10233f] sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              className="rounded-lg border border-[#dbe9f3] bg-white p-6 shadow-[0_10px_30px_rgba(28,69,132,0.06)]"
              key={item.title}
            >
              <h3 className="text-xl font-semibold text-[#1c4584]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
