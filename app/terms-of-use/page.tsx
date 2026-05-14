import type { Metadata } from "next";
import Link from "next/link";
import "./terms-of-use.scss";

export const metadata: Metadata = {
  title: "Terms of Use | Athena Technology Solutions",
  description: "Terms of Use for Athena Technology Solutions. Please read these terms carefully before using our website or services.",
};

export default function TermsOfUsePage() {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="container">
          <h1>Terms of Use</h1>
          <div className="effective-date">
            Effective Date: January 1, 2025 | Last Updated: March 2025
          </div>
        </div>
      </div>

      <div className="legal-content-wrapper">
        <section className="legal-section">
          <h2>1. Agreement to Terms</h2>
          <p>
            Please read these Terms of Use carefully. By accessing or using the
            Athena Technology Solutions website at athenatec.com (&quot;Site&quot;), or by
            engaging Athena for professional services, you agree to be legally
            bound by these Terms of Use (&quot;Terms&quot;). If you do not agree to these
            Terms in full, you must immediately discontinue use of this Site and
            our services.
          </p>
          <p>
            These Terms apply to all visitors, clients, partners, and any other
            users of our Site. Specific project terms, service-level agreements,
            and contract provisions are detailed separately in applicable Master
            Service Agreements (MSAs) and Statements of Work (SOWs).
          </p>
        </section>

        <section className="legal-section">
          <h2>2. About Athena Technology Solutions</h2>
          <p>
            Athena Technology Solutions, Inc. is an Industry 4.0 Enterprise
            Manufacturing Solutions Provider incorporated in California, USA,
            with operations in the United States and internationally. We deliver
            MES, PLM, ERP, CMMS implementation, Smart Factory Analytics,
            Digital Transformation consulting, and Managed Services to clients
            in the semiconductor, electronics, medical device, discrete
            manufacturing, solar, and clean energy industries. Athena is an
            authorized implementation partner for Siemens Opcenter, Critical
            Manufacturing, Eyelit Technologies, Oracle/Agile PLM, and other
            leading platforms. We are ISO 9001 certified since 2017.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Acceptable Use of This Website</h2>
          <p>
            You agree to use this Site only for lawful purposes and in a manner
            consistent with these Terms.
          </p>
          
          <h3>Permitted Use:</h3>
          <ul>
            <li>Browse our service offerings, case studies, and resources</li>
            <li>Submit contact forms for business inquiries</li>
            <li>Download publicly available whitepapers and materials</li>
            <li>Link to our homepage from your website with proper attribution</li>
            <li>Share our published content with proper attribution</li>
          </ul>

          <h3>Prohibited Use:</h3>
          <ul>
            <li>Scraping, copying, or republishing our content without permission</li>
            <li>Attempting to gain unauthorized access to our systems or servers</li>
            <li>Using automated bots or crawlers to harvest information</li>
            <li>Transmitting malware, spam, or disruptive code</li>
            <li>Misrepresenting your identity or affiliation with Athena</li>
            <li>Engaging in any activity that violates applicable local, state, national, or international laws</li>
          </ul>
          
          <p>
            Athena reserves the right to terminate or restrict access to this
            Site for any user who violates these Terms, without prior notice.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Intellectual Property Rights</h2>
          <p>
            All content on this Site — including text, graphics, logos, icons,
            images, case studies, white papers, technical documentation,
            software, video content, and the overall design — is the exclusive
            property of Athena Technology Solutions, Inc. and is protected by
            applicable United States and international intellectual property
            laws.
          </p>
          <ul>
            <li>
              <strong>Trademarks:</strong> &quot;Athena Technology Solutions,&quot; the
              Athena logo, and all related brand assets are trademarks of Athena
              Technology Solutions, Inc. and may not be used without prior
              written consent.
            </li>
            <li>
              <strong>Proprietary Accelerators:</strong> Our Athena Accelerators
              suite — including MES change comparison, data migration, and
              automated testing tools — constitutes proprietary intellectual
              property and trade secrets of Athena.
            </li>
            <li>
              <strong>Methodologies:</strong> Implementation methodologies,
              delivery frameworks, templates, and best practices developed by
              Athena are proprietary and may not be replicated or disclosed
              without authorization.
            </li>
            <li>
              <strong>Limited License:</strong> You are granted a limited,
              non-exclusive, non-transferable license to access and view this
              Site solely for your internal business evaluation purposes. No
              other rights are granted.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Professional Services Terms</h2>
          <p>
            Engagement of Athena Technology Solutions for professional services
            is governed by separate, executed agreements between Athena and the
            client organization. These Terms do not supersede or replace such
            agreements.
          </p>
          <ul>
            <li>
              <strong>Master Service Agreements (MSA):</strong> All
              professional engagements require an executed MSA outlining scope,
              responsibilities, payment terms, warranties, and dispute
              resolution procedures.
            </li>
            <li>
              <strong>Statements of Work (SOW):</strong> Each individual project
              is defined by a specific SOW detailing deliverables, timelines,
              resource allocation, and acceptance criteria.
            </li>
            <li>
              <strong>Client Obligations:</strong> Clients are responsible for
              providing timely access to required environments, data, personnel,
              and approvals as outlined in the SOW.
            </li>
            <li>
              <strong>Regulatory Compliance:</strong> Clients in regulated
              industries (e.g., medical devices under FDA 21 CFR Part 11) are
              responsible for ensuring their own regulatory compliance. Athena
              provides implementation expertise but does not assume regulatory
              responsibility on behalf of clients.
            </li>
            <li>
              <strong>Post-Implementation Support:</strong> Warranty and
              hypercare support terms, including duration and scope, are
              specified in the applicable MSA and SOW.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Confidentiality</h2>
          <p>
            Athena maintains strict confidentiality with respect to all client
            information shared during sales, project scoping, and delivery
            processes. We operate under Non-Disclosure Agreements (NDAs) where
            required, and all Athena personnel and contractors are bound by
            confidentiality obligations.
          </p>
          <p>
            Any information you share with Athena in connection with project
            discussions, demonstrations, or active engagements — including
            technical environments, manufacturing data, business processes, or
            financial information — will be treated as confidential and will
            not be disclosed to third parties except as required to deliver
            contracted services or comply with applicable law.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Disclaimers</h2>
          <p>
            The content on this Site is provided for general informational and
            marketing purposes only and does not constitute professional advice.
            Athena makes no warranties of any kind regarding:
          </p>
          <ul>
            <li>
              <strong>Accuracy:</strong> Information on this website may not
              reflect the most current service offerings, partner programs, or
              organizational developments.
            </li>
            <li>
              <strong>Availability:</strong> We do not guarantee that this Site
              will be available at all times or free from interruptions, errors,
              or security vulnerabilities.
            </li>
            <li>
              <strong>Fitness for Purpose:</strong> General content is not
              tailored to any specific manufacturing environment or regulatory
              context.
            </li>
            <li>
              <strong>Third-Party Technology:</strong> Descriptions of
              third-party technologies are provided in good faith and may not
              reflect the latest product updates from those vendors.
            </li>
          </ul>
          <p>
            THE SITE AND ITS CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
            WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
            NON-INFRINGEMENT.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Athena Technology
            Solutions, Inc., its officers, directors, employees, agents, and
            partners shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of, or
            inability to access, this website; errors or omissions in website
            content; unauthorized access to your data; or reliance on
            information provided on this Site without formal engagement.
          </p>
          <p>
            In no event shall Athena&apos;s total liability to you for all claims
            arising from your use of this Site exceed the amount, if any, paid
            by you to Athena in the twelve (12) months preceding the claim.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Athena Technology
            Solutions, Inc. and its officers, directors, employees, contractors,
            agents, licensors, and partners from and against any claims,
            damages, obligations, losses, liabilities, costs, or debt arising
            from your violation of these Terms, your violation of any applicable
            laws or regulations, your infringement of any third-party right
            including intellectual property rights, or any content you submit
            to this Site that causes damage to a third party.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Third-Party Links & Content</h2>
          <p>
            This Site may contain links to websites operated by third parties,
            including technology partners, industry associations, and client
            organizations. These links are provided for informational
            convenience only. Athena does not control these external websites
            and is not responsible for their content, privacy practices, or
            security. The inclusion of any third-party link does not imply
            endorsement by Athena.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance
            with the laws of the State of California, United States of America,
            without regard to its conflict of law provisions.
          </p>
          <p>
            Any dispute arising from your use of this Site that cannot be
            resolved informally shall be subject to binding arbitration in
            Alameda County, California, in accordance with the commercial
            arbitration rules of the American Arbitration Association (AAA).
            Nothing in this section prevents either party from seeking
            injunctive or equitable relief in a court of competent jurisdiction
            to protect intellectual property rights or confidential information.
          </p>
        </section>

        <section className="legal-section">
          <h2>12. Modifications to Terms</h2>
          <p>
            Athena reserves the right to modify these Terms of Use at any time.
            Changes will be effective upon posting of the revised Terms on this
            page with an updated &quot;Last Updated&quot; date. Your continued use of
            this Site following the posting of modified Terms constitutes your
            acceptance of the updated Terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>13. Contact Information</h2>
          <p>
            For questions or concerns about these Terms of Use:
            <br />
            <strong>Email:</strong> <a href="mailto:info@athenatec.com">info@athenatec.com</a>
            <br />
            <strong>Athena Technology Solutions, Inc.</strong>
            <br />
            Fremont, California, USA
            <br />
            <Link href="/">athenatec.com</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
