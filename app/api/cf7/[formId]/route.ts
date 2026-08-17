import {
  enforceSameOrigin,
  rateLimit,
  sanitizeText,
} from "@/lib/request-guard";
import { getWpApiUrl } from "@/lib/wp";

const CF7_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";

const ALLOWED_CF7_FORM_IDS = new Set([
  "227902",
  "228423",
  "230890",
  "231155",
  "231536",
  "232878",
  "233209",
  "233708",
]);

const ACCEPTANCE_VALIDATION_FORM_IDS = new Set(["232878"]);

const RESERVED_CF7_FIELDS = new Set([
  "_wpcf7",
  "_wpcf7_version",
  "_wpcf7_locale",
  "_wpcf7_unit_tag",
  "_wpcf7_container_post",
]);

const ALLOWED_CF7_FIELDS = new Set([
  "checkbox-649",
  "consent",
  "company-name",
  "country",
  "full-name",
  "industry",
  "industries",
  "job",
  "job-title",
  "meeting-focus",
  "message",
  "page-url",
  "receive",
  "support-needed",
  "textarea-11",
  "work-email",
  "topic",
  "your-email",
  "your-name",
  "your-phone",
  "first-name",
  "last-name",
  "city-state",
  "employer",
  "linkedin",
  "years-experience",
  "education",
  "experience",
  "other-experience",
  "attendance-mode",
  "heard-about",
  "signature",
  "resume",
  "signature-file",
  "your-subject",
  "your-message",
  "your-page",
  "decl-resume",
  "decl-interview",
  "decl-lab-fee",
]);

export async function POST(
  req: Request,
  { params }: { params: Promise<{ formId: string }> },
) {
  try {
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const limitError = rateLimit(req, { keyPrefix: "cf7", limit: 8 });
    if (limitError) return limitError;

    const { formId } = await params;

    if (!ALLOWED_CF7_FORM_IDS.has(formId)) {
      return Response.json(
        { status: "validation_failed", message: "Invalid form id." },
        { status: 400 },
      );
    }

    const incoming = await req.formData();
    const requiresAcceptanceValidation =
      ACCEPTANCE_VALIDATION_FORM_IDS.has(formId);
    const acceptanceField = formId === "232878" ? "consent" : "checkbox-649";
    const hasAcceptedTerms =
      typeof incoming.get(acceptanceField) === "string" &&
      sanitizeText(incoming.get(acceptanceField) as string, 200).length > 0;

    if (requiresAcceptanceValidation && !hasAcceptedTerms) {
      return Response.json({
        status: "validation_failed",
        message: "One or more fields have an error. Please check and try again.",
        invalid_fields: [
          {
            field: acceptanceField,
            message:
              "You must accept the terms and conditions before sending your message.",
          },
        ],
      });
    }

    const fd = new FormData();

    fd.append("_wpcf7", formId);
    fd.append("_wpcf7_version", "5.9");
    fd.append("_wpcf7_locale", "en_US");
    fd.append("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);
    fd.append("_wpcf7_container_post", "0");

    if (requiresAcceptanceValidation) {
      fd.append("_wpcf7_acceptance_as_validation", "1");
    }

    for (const [key, value] of incoming.entries()) {
      if (!RESERVED_CF7_FIELDS.has(key) && ALLOWED_CF7_FIELDS.has(key)) {
        if (typeof value === "string") {
          const maxLength =
            key === "textarea-11" || key === "message" || key === "your-message" ? 4000 : 500;
          fd.append(key, sanitizeText(value, maxLength));
        } else if (
          typeof value === "object" &&
          value !== null &&
          "name" in value &&
          "size" in value &&
          "type" in value
        ) {
          fd.append(key, value as File);
        }
      }
    }

    if (!incoming.has("page-url")) {
      fd.append("page-url", req.headers.get("referer") || "");
    }

    const response = await fetch(
      getWpApiUrl(
        `/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
        CF7_SITE_URL,
      ),
      {
        method: "POST",
        body: fd,
        headers: {
          Accept: "application/json",
          "User-Agent": req.headers.get("user-agent") || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
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
          status: "mail_failed",
          message: "Contact service returned an unexpected response.",
        },
        { status: 502 },
      );
    }
  } catch (error: any) {
    console.error("CF7 PROXY ERROR:", error);

    let errorMessage = error instanceof Error ? error.message : String(error);
    if (error && error.cause) {
      const causeMessage = error.cause instanceof Error ? error.cause.message : String(error.cause);
      errorMessage += ` (Cause: ${causeMessage})`;
    }
    return Response.json(
      {
        status: "mail_failed",
        message: `Message could not be sent. Error: ${errorMessage}`,
      },
      { status: 500 },
    );
  }
}
