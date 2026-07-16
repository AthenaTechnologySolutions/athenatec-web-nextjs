import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  title: string;
  description?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  align?: "center" | "left";
};

export default function HeroSection({
  title,
  description,
  image,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  align = "center",
}: HeroSectionProps) {
  const isLeft = align === "left";

  return (
    <section className="relative flex min-h-[56vh] w-full items-center overflow-hidden text-white sm:min-h-[70vh]">
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,#163a6b_0%,#1c4584_45%,#17ACE4_100%)]"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(2,7,33,0.78),rgba(2,7,33,0.42),rgba(2,7,33,0.16))]"
      />

      <div
        className={`relative z-20 flex w-full max-w-5xl flex-col gap-4 overflow-hidden px-5 py-16 sm:px-10 lg:px-16 ${
          isLeft
            ? "items-center text-center sm:ml-0 sm:items-start sm:text-left lg:ml-12"
            : "items-center text-center sm:items-start sm:text-left"
        }`}
      >
        <h1 className="max-w-full text-balance break-words text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>

        {description && (
          <p className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            {description}
          </p>
        )}

        {(buttonText && buttonLink) || (secondaryButtonText && secondaryButtonLink) ? (
          <div className="mt-4 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
            {buttonText && buttonLink && (
              <Link
                href={buttonLink}
                className="inline-flex items-center justify-center rounded-lg bg-[#1c4584] px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#17ace4] hover:shadow-[0_4px_14px_#17ace466] active:translate-y-0"
              >
                {buttonText}
              </Link>
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Link
                href={secondaryButtonLink}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-white hover:text-[#1c4584] hover:shadow-[0_4px_14px_rgba(255,255,255,0.25)] active:translate-y-0"
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
