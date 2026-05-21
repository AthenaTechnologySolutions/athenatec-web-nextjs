import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Thank You | Athenatec",
  description: "Your submission has been received by Athenatec.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(117.23deg,_#e8f1fb_3.22%,_#e6f7fd_83.01%)] p-6">
      <div className=" max-w-xl w-full text-center p-12">
        
        <Image
          src="/assets/images/logo.webp"
          alt="Athena Logo"
          width={180}
          height={180}
          className="mx-auto"
        />

        <h1 className="mt-6 text-4xl font-bold text-[#1c4584]">Thank You</h1>

        <p className="mt-4 text-gray-600 leading-relaxed text-[20px]">
          Your submission has been received. Our team will review it and contact
          you shortly.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#1c4584] to-[#17ace4] transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
