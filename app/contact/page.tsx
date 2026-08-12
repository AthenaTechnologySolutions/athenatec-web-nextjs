import { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import HeroSection from "@/app/components/HeroSection";
import Link from "next/link";
import ContactForm from "@/app/components/forms/ContactForm";
import { buildContactPageSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Athenatec | MES & Smart Factory Experts",
  description:
    "Get in touch with Athenatec for MES, PLM, and smart manufacturing solutions. Contact our global teams in the US and India for rapid response.",
  path: "/contact",
  image: "/assets/images/contactus.webp",
});

export default function ContactPage() {
  const contactPageSchema = buildContactPageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      <HeroSection
        title="Contact"
        description="Leave us a little info, and we'll be in touch."
        image="/assets/images/contactus.webp"
        align="center"
        buttonText="Send us an Email"
        buttonLink="mailto:info@athenatec.com"
      />

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Have questions or need support? Our team will get back to you
                within 1–2 business days.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <MapPin className="text-[#17ace4]" size={28} />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Headquarters</h3>
                  <Link
                    href="https://maps.app.goo.gl/HF6t3r3L8aRoPsYy7"
                    target="_blank"
                    className="text-gray-600 mt-1 hover:text-[#17ace4] hover:underline"
                  >
                    859 Corporate Way <br />
                    Fremont, California 94539, <br />
                    United States
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <Phone className="text-[#17ace4]" size={28} />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Enquiries</h3>
                 <div className="mt-2 space-y-1 text-gray-600">
  <div>
     USA:
    <Link href="tel:+15106870900" className="hover:text-[#17ace4] transition">
      +1 510-687-0900
    </Link>
  </div>

  <div>
    Chennai:
    <Link href="tel:+917401411122" className="ml-1 hover:text-[#17ace4] transition">
      +91 74014 11122
    </Link>
    {" / "}
    <Link href="tel:+914422650558" className="hover:text-[#17ace4] transition">
      044-22650558
    </Link>
  </div>

  <div>
    Bengaluru:
    <Link href="tel:+918023484120" className="ml-1 hover:text-[#17ace4] transition">
      080-2348-4120
    </Link>
  </div>

  <div>
     Hyderabad:
     <Link href="tel:+914040044369" className="hover:text-[#17ace4] transition">
      +91 40400 44369
    </Link>
  </div>
</div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <Mail className="text-[#17ace4]" size={28} />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Email Us</h3>
                  <Link href="mailto:info@athenatec.com"
                    className="block mt-2 hover:text-[#17ace4] hover:underline transition">
                    info@athenatec.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── ContactForm: CF7 endpoint is hardcoded inside the component ── */}
          <div className="bg-white p-10 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <ContactForm
              inquiryOptions={[
                "Siemens Opcenter MES",
                "Critical Manufacturing",
                "PLM Solution",
                "Enterprise ERP",
                "Cyber Security",
                "MES Support",
              ]}
              pageName="Contact Page"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Other Locations</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Opcenter Excellence Center:</h3>
              <p className="text-gray-600 leading-relaxed">
                Edifice, 2nd Floor, F186 BEL Layout, Bharath Nagar, 1st Main Road,
                East West College Road, Anjana Nagar, Magadi Road, Bangalore 560091
              </p>
              <a href="https://maps.app.goo.gl/8HdSooHUkBKTqr9JA" target="_blank"
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[#1c4584] font-medium hover:text-[#17ace4] transition">
                → View Map
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">CMF Excellence Center:</h3>
              <p className="text-gray-600 leading-relaxed">
                SR Towers, 186, 2nd Cross St, Lakshmi Nagar, Shanthi Nagar,
                Chromepet, Chennai, Tamil Nadu 600044
              </p>
              <a href="https://maps.app.goo.gl/Fa5vkvr4sdbpYUnH9" target="_blank"
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[#1c4584] font-medium hover:text-[#17ace4] transition">
                → View Map
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">PLM/ERP Center:</h3>
              <p className="text-gray-600 leading-relaxed">
                3rd Floor, Plot No.21, Kored Infra Building, Kakatiya Hills,
                Guttala Begumpet, Kavuri Hills, Madhapur, Hyderabad, Telangana 500081
              </p>
              <a href="https://maps.app.goo.gl/SFxHh68doyTB4mFb6" target="_blank"
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[#1c4584] font-medium hover:text-[#17ace4] transition">
                → View Map
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">MES Training Center:</h3>
              <p className="text-gray-600 leading-relaxed">
                18, Old Karur Road, Killa Chinthamani, Tiruchirappalli, Tamil Nadu 620002
              </p>
              <a href="https://maps.app.goo.gl/NmdtB37YDYvuVVgi9" target="_blank"
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[#1c4584] font-medium hover:text-[#17ace4] transition">
                → View Map
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
