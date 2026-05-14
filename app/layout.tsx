import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/app/components/home/header";
import Footer from "@/app/components/home/footer";
import "./globals.css";
import AIChatbot from "@/app/components/chatbot/chatbot";
import ScrollToTop from "@/app/components/ScrollToTop";
import SmoothScrollProvider from "@/app/components/providers/SmoothScrollProvider";
import ScrollProgressBar from "@/app/components/ui/ScrollProgressBar";
import {
  SITE_NAME,
  SITE_URL,
  buildMetadata,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo";
import { homeFaqs } from "@/lib/home-faqs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const rootMetadata = buildMetadata({
  title: "Best MES Solution Provider | Athenatec",
  description:
    "Athenatec delivers MES, PLM, and smart factory solutions for medical device, semiconductor, and electronics manufacturers. Start your Industry 4.0 journey.",
  path: "/",
  keywords: [
    "MES implementation services",
    "Manufacturing execution systems",
    "Semiconductor MES solutions",
    "Manufacturing digital transformation",
    "PLM and ERP integration",
    "Industrial automation solutions",
  ],
});

export const metadata: Metadata = {
  ...rootMetadata,
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  applicationName: SITE_NAME,
  title: {
    default: "Best MES Solution Provider | Athenatec",
    template: "%s",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = buildWebSiteSchema();
  const organizationSchema = buildOrganizationSchema();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5L4F5JNK');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5L4F5JNK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <SmoothScrollProvider>
          <ScrollProgressBar />
           
          <Header />
          {children}
          <AIChatbot />
          <ScrollToTop />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
