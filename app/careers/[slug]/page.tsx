import { jobs } from "@/app/data/jobs";
import { buildJobPostingSchema, buildMetadata, stripHtml } from "@/lib/seo";
import "./job-details.scss";
import ApplyForm from "./ApplyForm";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

function buildTitle(jobTitle: string, locations: string[]): string {
  const SUFFIX = " | Careers at Athenatec";
  const MAX = 60;
  const MIN = 50;

  const maxJobLen = MAX - SUFFIX.length;
  const t =
    jobTitle.length > maxJobLen
      ? jobTitle.slice(0, maxJobLen - 1).trim() + "…"
      : jobTitle;

  let full = t + SUFFIX;

  if (full.length < MIN) {
    const padded = t + " in " + locations[0] + SUFFIX;
    full = padded.length <= MAX ? padded : full;
  }

  return full;
}

function buildDesc(
  jobTitle: string,
  type: string,
  locations: string[],
  overview?: string
): string {
  const MAX = 160;
  const MIN = 150;
  const clean = stripHtml(overview ?? "");
  const locStr = locations.join(", ");
  const prefix = `Hiring ${jobTitle} (${type}) in ${locStr}. `;
  const ELLIPSIS = "...";

  let budget = MAX - prefix.length - ELLIPSIS.length;
  let desc: string;

  if (budget >= 20) {
    desc = prefix + clean.slice(0, budget) + ELLIPSIS;
  } else {
    const shortPrefix = `Hiring ${jobTitle} (${type}) in ${locations[0]}. `;
    budget = MAX - shortPrefix.length - ELLIPSIS.length;
    desc = shortPrefix + clean.slice(0, budget) + ELLIPSIS;
  }

  if (desc.length < MIN) {
    const base = desc.replace(ELLIPSIS, "").trimEnd();
    const PAD =
      ". Join Athenatec and work on cutting-edge MES and manufacturing technology solutions across India.";
    desc = (base + PAD).slice(0, MAX);
  }

  return desc.slice(0, MAX);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return buildMetadata({
      title: "Job Not Found",
      description: "This job listing is no longer available.",
      path: `/careers/${slug}`,
      noIndex: true,
    });
  }

  const title = buildTitle(job.title, job.locations);
  const description = buildDesc(
    job.title,
    job.type,
    job.locations,
    job.overview
  );

  return buildMetadata({
    title,
    description,
    path: `/careers/${slug}`,
    type: "website",
    keywords: ["careers", "jobs", job.title, ...job.locations],
  });
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return <div style={{ padding: "100px" }}>Job Not Found</div>;
  }

  const jobDescription = [
    job.overview,
    ...(job.responsibilities ?? []),
    ...(job.requirements ?? []),
  ]
    .filter(Boolean)
    .join(" ");

  const jobPostingSchema = buildJobPostingSchema({
    title: job.title,
    description: stripHtml(jobDescription),
    path: `/careers/${slug}`,
    employmentType: job.type,
    locations: job.locations,
    datePosted: job.datePosted,
  });

  return (
    <div className="job-details-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <div className="container job-layout">
        <div className="job-info">
          <h1>{job.title}</h1>

          <div className="meta">
            <p>
              <strong>Job Type:</strong> {job.type}
            </p>
            <p>
              <strong>Experience:</strong> {job.experience}
            </p>
            <p>
              <strong>Location:</strong> {job.locations.join(", ")}
            </p>
          </div>

          <p className="overview">{job.overview}</p>

          <h3 className="font-bold py-5">Key Responsibilities</h3>
          <ul className="description-list">
            {job.responsibilities?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-bold py-5">Requirements</h3>
          <ul className="description-list">
            {job.requirements?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <ApplyForm jobTitle={job.title} jobId={job.wpJobId ?? ""} />
      </div>
    </div>
  );
}
