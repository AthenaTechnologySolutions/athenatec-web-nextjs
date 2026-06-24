import Link from "next/link";

export type InternalLinkItem = {
  href: string;
  label: string;
  description?: string;
};

type InternalLinkClusterProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  links: InternalLinkItem[];
};

export const manufacturingSeoLinks: InternalLinkItem[] = [
  {
    href: "/mes-implementation-services",
    label: "MES implementation services",
    description:
      "Plan, implement, validate, integrate, and support a manufacturing execution system program.",
  },
  {
    href: "/siemens-opcenter-mes",
    label: "Siemens Opcenter MES implementation services",
    description:
      "Deploy Opcenter for semiconductor, electronics, medical device, and discrete manufacturing.",
  },
  {
    href: "/critical-manufacturing",
    label: "Critical Manufacturing MES implementation",
    description:
      "Implement, customize, upgrade, and integrate Critical Manufacturing MES across global factories.",
  },
  {
    href: "/solutions/oracle-cloud",
    label: "Oracle Cloud ERP implementation services",
    description:
      "Connect cloud ERP, SCM, finance, and manufacturing operations with shop-floor systems.",
  },
  {
    href: "/solutions/plm",
    label: "Oracle Agile PLM implementation services",
    description:
      "Control product records, change management, BOMs, and PLM-to-MES handoffs.",
  },
  {
    href: "/accelerators",
    label: "MES accelerators for ECO automation",
    description:
      "Use redlining, master data migration, and automated testing accelerators for faster change cycles.",
  },
  {
    href: "/case-studies",
    label: "MES and smart manufacturing case studies",
    description:
      "Review manufacturing transformation stories across regulated and high-tech operations.",
  },
  {
    href: "/blog",
    label: "MES implementation and Industry 4.0 insights",
    description:
      "Read practical guidance on MES selection, digital transformation, AI, and smart factory strategy.",
  },
];

export default function InternalLinkCluster({
  eyebrow = "Related manufacturing expertise",
  title = "Explore Athenatec's MES, ERP, PLM, and Industry 4.0 resources",
  description =
    "Use these related service and resource pages to evaluate the right implementation path for your manufacturing environment.",
  links,
}: InternalLinkClusterProps) {
  return (
    <section className="bg-[#f5fafd] py-16 sm:py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#17ace4]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#15356e] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            {description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <Link
              className="group rounded-lg border border-[#dbe9f3] bg-white p-5 shadow-[0_10px_30px_rgba(28,69,132,0.06)] transition hover:-translate-y-1 hover:border-[#17ace4]/70 hover:shadow-[0_18px_38px_rgba(28,69,132,0.12)]"
              href={link.href}
              key={link.href}
            >
              <span className="text-base font-semibold leading-snug text-[#1c4584] group-hover:text-[#17ace4]">
                {link.label}
              </span>
              {link.description && (
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {link.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
