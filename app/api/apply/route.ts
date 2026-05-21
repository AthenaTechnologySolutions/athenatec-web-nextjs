import {
  enforceSameOrigin,
  formText,
  isValidEmail,
  rateLimit,
} from "@/lib/request-guard";
import { getWpApiUrl } from "@/lib/wp";

const WP_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function isUploadFile(value: FormDataEntryValue | null): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "size" in value &&
    "type" in value
  );
}

function getFileExtension(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : "";
}

export async function POST(req: Request) {
  try {
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const limitError = rateLimit(req, {
      keyPrefix: "apply",
      limit: 5,
      windowMs: 60_000,
    });
    if (limitError) return limitError;

    const incoming = await req.formData();
    const jobId = formText(incoming, "job_id", 40);
    const name = formText(incoming, "name", 120);
    const email = formText(incoming, "email", 254);
    const phone = formText(incoming, "phone", 40);
    const coverLetter = formText(incoming, "cover_letter", 4_000);
    const resume = incoming.get("resume");

    if (!jobId || !name || !isValidEmail(email) || !phone || coverLetter.length < 30) {
      return Response.json(
        {
          success: false,
          message: "Please complete all required application fields.",
        },
        { status: 400 },
      );
    }

    if (!isUploadFile(resume)) {
      return Response.json(
        {
          success: false,
          message: "Please upload your resume as a PDF, DOC, or DOCX file.",
        },
        { status: 400 },
      );
    }

    const extension = getFileExtension(resume.name);
    const mimeTypeAllowed =
      !resume.type || ALLOWED_RESUME_TYPES.has(resume.type);

    if (
      resume.size <= 0 ||
      resume.size > MAX_RESUME_BYTES ||
      !ALLOWED_RESUME_EXTENSIONS.has(extension) ||
      !mimeTypeAllowed
    ) {
      return Response.json(
        {
          success: false,
          message: "Resume must be a PDF, DOC, or DOCX file under 5 MB.",
        },
        { status: 400 },
      );
    }

    const fd = new FormData();
    fd.append("job_id", jobId);
    fd.append("name", name);
    fd.append("email", email);
    fd.append("phone", phone);
    fd.append("cover_letter", coverLetter);
    fd.append("resume", resume);

    const response = await fetch(
      getWpApiUrl("/wp-json/athenatec/v1/apply", WP_SITE_URL),
      {
        method: "POST",
        body: fd,
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        redirect: "follow",
      },
    );

    const text = await response.text();

    try {
      return Response.json(JSON.parse(text), {
        status: response.ok ? 200 : response.status,
      });
    } catch {
      return Response.json(
        {
          success: false,
          message: "Application service returned an unexpected response.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("APPLICATION PROXY ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Application could not be submitted. Please try again.",
      },
      { status: 500 },
    );
  }
}
