import type { Metadata } from "next";
import Link from "next/link";
import "./privacy-policy.scss";

export const metadata: Metadata = {
  title: "Privacy Policy | Athena Technology Solutions – Data Protection & Security",
  description:
    "Athena Technology Solutions' Privacy Policy explains how we collect, use, and protect your personal data across our MES, PLM, ERP, CMMS, and Smart Factory Analytics services. ISO 9001 certified data security.",
  keywords: [
    "Athena Technology Solutions privacy policy",
    "manufacturing software data privacy",
    "MES data protection",
    "PLM ERP data security",
    "Industry 4.0 privacy",
    "smart factory data policy",
    "ISO 9001 data security",
    "enterprise manufacturing solutions privacy",
    "athenatec.com privacy",
    "GDPR manufacturing software",
  ],
  alternates: {
    canonical: "https://athenatec.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Athena Technology Solutions",
    description:
      "Learn how Athena Technology Solutions collects, uses, and safeguards your information across our Industry 4.0 manufacturing software and services.",
    url: "https://athenatec.com/privacy-policy",
    siteName: "Athena Technology Solutions",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page" itemScope itemType="https://schema.org/WebPage">
      <div className="legal-hero">
        <div className="container">
          <h1 itemProp="name">Privacy Policy</h1>
          <div className="effective-date">
            <time dateTime="2025-01-01">Effective Date: January 1, 2025</time>
            {" | "}
            <time dateTime="2025-03">Last Updated: March 2025</time>
          </div>
        </div>
      </div>

      <div className="legal-content-wrapper" itemProp="description">

        {/* ── 1. Overview ─────────────────────────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-overview">
          <h2 id="section-overview">1. Overview</h2>
          <p>
            Athena Technology Solutions, Inc.
            is an{" "}
            <strong>Industry 4.0 Enterprise Manufacturing Solutions Provider</strong>{" "}
            delivering specialized services including{" "}
            <strong>Manufacturing Execution Systems (MES)</strong>,{" "}
            <strong>Product Lifecycle Management (PLM)</strong>,{" "}
            <strong>Enterprise Resource Planning (ERP)</strong>,{" "}
            <strong>Computerized Maintenance Management Systems (CMMS)</strong>,
            and <strong>Smart Factory Analytics</strong> to clients across the
            semiconductor, electronics, medical device, and clean energy
            industries.
          </p>
          <p>
            This Privacy Policy describes how we collect, use, disclose, and
            protect information about you when you visit our website at{" "}
            <Link href="/">athenatec.com</Link>, engage with our services, or
            communicate with our team. By accessing our website or engaging with
            our services, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </p>
        </section>

        {/* ── 2. Information We Collect ────────────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-collect">
          <h2 id="section-collect">2. Information We Collect</h2>
          <p>
            We collect information to provide better services to our clients
            and fulfill our contractual obligations. The types of information we
            may collect include:
          </p>
          <ul>
            <li>
              <strong>Personal Identifiers:</strong> Name, job title, company
              name, professional email address, phone number, and business
              mailing address.
            </li>
            <li>
              <strong>Professional Information:</strong> Industry, company size,
              manufacturing environment details, project scope, and technology
              infrastructure specifics shared during engagements.
            </li>
            <li>
              <strong>Technical &amp; Usage Data:</strong> IP address, browser
              type, pages visited, time spent on site, referring URLs, device
              type, and operating system.
            </li>
            <li>
              <strong>Communication Data:</strong> Messages sent via contact
              forms, emails, support tickets, chat interactions, and records of
              consultations or demo requests.
            </li>
          </ul>
          <p>
            We collect this information through direct submission (forms,
            emails), automated technologies (cookies, analytics), and
            third-party sources such as business directories, partner referrals,
            and professional networks.
          </p>
        </section>

        {/* ── 3. How We Use Your Information ──────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-use">
          <h2 id="section-use">3. How We Use Your Information</h2>
          <p>
            Athena uses collected information solely for legitimate business
            purposes. <strong>We do not sell personal data to third parties.</strong>{" "}
            Your information may be used to:
          </p>
          <ul>
            <li>
              <strong>Deliver services:</strong> Fulfill project engagements
              including MES implementation, PLM configuration, ERP integration,
              and managed services support.
            </li>
            <li>
              <strong>Client communication:</strong> Respond to inquiries,
              schedule consultations, send project updates, and provide
              post-implementation support.
            </li>
            <li>
              <strong>Business development:</strong> Share relevant case
              studies, white papers, industry insights, and information about
              new service offerings relevant to your business.
            </li>
            <li>
              <strong>Website improvement:</strong> Analyze usage patterns to
              enhance navigation, content quality, and overall user experience
              on athenatec.com.
            </li>
            <li>
              <strong>Legal compliance:</strong> Fulfill legal obligations,
              prevent fraud, resolve disputes, and enforce our agreements.
            </li>
            <li>
              <strong>Security monitoring:</strong> Protect our systems,
              intellectual property, and client data from unauthorized access
              or misuse.
            </li>
          </ul>
        </section>

        {/* ── 4. Information Sharing & Disclosure ─────────────────────── */}
        <section className="legal-section" aria-labelledby="section-sharing">
          <h2 id="section-sharing">4. Information Sharing &amp; Disclosure</h2>
          <p>
            Athena does not sell, trade, or rent your personal information. We
            may share your information only in the following limited
            circumstances:
          </p>
          <ul>
            <li>
              <strong>Technology Partners:</strong> With authorized technology
              partners such as Siemens (Opcenter), Critical Manufacturing,
              Eyelit Technologies, and Oracle, where necessary to deliver
              contracted services. These partners are bound by confidentiality
              agreements.
            </li>
            <li>
              <strong>Service Providers:</strong> With trusted vendors who
              assist us with IT infrastructure, cloud hosting, CRM, email
              delivery, and analytics — all under strict data processing
              agreements.
            </li>
            <li>
              <strong>Legal Requirements:</strong> Where required by applicable
              law, court order, or regulatory authority, or to protect the
              rights and safety of Athena, its employees, or clients.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger,
              acquisition, or sale of substantially all assets, where data may
              be transferred as part of the transaction (with advance notice to
              affected parties).
            </li>
            <li>
              <strong>With Your Consent:</strong> In any other case, only with
              your explicit prior consent.
            </li>
          </ul>
        </section>

        {/* ── 5. Data Security ────────────────────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-security">
          <h2 id="section-security">5. Data Security</h2>
          <p>
            As an <strong>ISO 9001 certified organization since 2017</strong>,
            Athena applies rigorous quality management standards to data
            security. We implement industry-standard technical and
            organizational measures including SSL/TLS encryption, role-based
            access controls, secure data storage, regular security audits, staff
            confidentiality agreements, incident response procedures, and data
            minimization practices.
          </p>
          <p>
            While no system is completely impenetrable, we continuously evaluate
            and update our security practices. In the event of a data breach
            affecting your personal information, we will notify you promptly in
            accordance with applicable legal requirements.
          </p>
        </section>

        {/* ── 6. Data Retention ───────────────────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-retention">
          <h2 id="section-retention">6. Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to fulfill
            the purposes outlined in this policy, or as required by law:
          </p>
          <ul>
            <li>
              Client project data is retained for the duration of the project
              engagement plus a minimum of <strong>7 years post-project</strong>,
              to comply with audit, warranty, and regulatory obligations.
            </li>
            <li>
              Contact and inquiry data is retained for up to{" "}
              <strong>3 years</strong> from the date of last contact, after
              which it is securely deleted or anonymized.
            </li>
            <li>
              Website analytics data is retained in aggregate, anonymized form
              for no more than <strong>26 months</strong>.
            </li>
            <li>
              Employee and contractor records are maintained as required by
              applicable employment law in each jurisdiction where we operate.
            </li>
          </ul>
        </section>

        {/* ── 7. Your Rights ──────────────────────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-rights">
          <h2 id="section-rights">7. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the following rights
            regarding your personal information:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of personal data we hold
              about you.
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate or
              incomplete data.
            </li>
            <li>
              <strong>Erasure:</strong> Request deletion of your personal data
              where applicable.
            </li>
            <li>
              <strong>Objection:</strong> Object to processing for direct
              marketing or legitimate interests.
            </li>
            <li>
              <strong>Portability:</strong> Receive your data in a structured,
              machine-readable format.
            </li>
            <li>
              <strong>Restriction:</strong> Request we limit processing in
              specific circumstances.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:info@athenatec.com" aria-label="Email Athena Technology Solutions privacy team">
              info@athenatec.com
            </a>
            . We will respond within <strong>30 days</strong> of receiving your
            request.
          </p>
        </section>

        {/* ── 8. Cookies & Tracking Technologies ──────────────────────── */}
        <section className="legal-section" aria-labelledby="section-cookies">
          <h2 id="section-cookies">8. Cookies &amp; Tracking Technologies</h2>
          <p>
            Our website uses cookies and similar technologies to enhance your
            browsing experience and analyze site performance:
          </p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for basic website
              functionality. Cannot be disabled.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how
              visitors interact with our website. These are anonymized and
              aggregated.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember your preferences
              such as language settings or form data.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to display relevant
              content and track the effectiveness of our outreach. Only used
              with your consent.
            </li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences.
            Disabling certain cookies may affect website functionality.
          </p>
        </section>

        {/* ── 9. Third-Party Services ──────────────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-third-party">
          <h2 id="section-third-party">9. Third-Party Services</h2>
          <p>
            Our website and services may contain links to third-party websites,
            including technology partners such as Siemens, Oracle, Critical
            Manufacturing, and Eyelit Technologies. This Privacy Policy applies
            only to Athena Technology Solutions and our direct digital
            properties. We are not responsible for the privacy practices of
            third-party websites and encourage you to review their respective
            privacy policies.
          </p>
        </section>

        {/* ── 10. International Data Transfers ─────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-international">
          <h2 id="section-international">10. International Data Transfers</h2>
          <p>
            Athena operates from offices in the <strong>United States</strong>{" "}
            and internationally, including <strong>India (Chennai and Bengaluru)</strong>.
            Data collected from users in different regions may be transferred to
            and processed in countries that may not have equivalent data
            protection laws to your home jurisdiction. When transferring data
            internationally, we use appropriate safeguards including contractual
            clauses and data processing agreements.
          </p>
        </section>

        {/* ── 11. Children's Privacy ───────────────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-children">
          <h2 id="section-children">11. Children&apos;s Privacy</h2>
          <p>
            Our website and services are directed exclusively at business
            professionals and are not intended for individuals under the age of{" "}
            <strong>16</strong>. We do not knowingly collect personal information
            from children. If you believe we have inadvertently collected
            information from a child, please contact us immediately.
          </p>
        </section>

        {/* ── 12. Policy Updates ───────────────────────────────────────── */}
        <section className="legal-section" aria-labelledby="section-updates">
          <h2 id="section-updates">12. Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make
            material changes, we will post the updated policy on this page with
            a revised &quot;Last Updated&quot; date, send an email notification to active
            clients and registered contacts, and display a prominent notice on
            our website homepage. Your continued use of our website after the
            effective date constitutes your acceptance of the updated policy.
          </p>
        </section>

        {/* ── 13. Contact Us ───────────────────────────────────────────── */}
        <section
          className="legal-section"
          aria-labelledby="section-contact"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <h2 id="section-contact">13. Contact Us</h2>
          <p>
            For questions, concerns, or requests relating to this Privacy
            Policy:
          </p>
          <address>
            <strong itemProp="name">Athena Technology Solutions, Inc.</strong>
            <br />
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@athenatec.com"
              itemProp="email"
              aria-label="Email Athena Technology Solutions"
            >
              info@athenatec.com
            </a>
            <br />
            <span itemProp="addressLocality">Fremont</span>,{" "}
            <span itemProp="addressRegion">California</span>,{" "}
            <span itemProp="addressCountry">USA</span>
            <br />
            <Link href="/" itemProp="url">
              athenatec.com
            </Link>
          </address>
        </section>

      </div>
    </div>
  );
}
