import { getWpApiUrl } from "@/lib/wp";

const CF7_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";

const ALLOWED_CF7_FORM_IDS = new Set([
  "227902",
  "228423",
  "230890",
  "231155",
  "231536",
  "232878",
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
]);

function sanitizeText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") return "";

  return value
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ formId: string }> },
) {
  try {
    const { formId } = await params;

    if (!/^\d+$/.test(formId)) {
      return Response.json(
        { status: "validation_failed", message: "Invalid form id." },
        { status: 400 },
      );
    }

    if (!ALLOWED_CF7_FORM_IDS.has(formId)) {
      return Response.json(
        { status: "validation_failed", message: "Form id is not allowed." },
        { status: 403 },
      );
    }

    const incoming = await req.formData();
    const requiresAcceptanceValidation =
      ACCEPTANCE_VALIDATION_FORM_IDS.has(formId);
    const acceptanceField = formId === "232878" ? "consent" : "checkbox-649";
    const hasAcceptedTerms =
      sanitizeText(incoming.get(acceptanceField), 200).length > 0;

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
      if (
        !RESERVED_CF7_FIELDS.has(key) &&
        ALLOWED_CF7_FIELDS.has(key) &&
        typeof value === "string"
      ) {
        const maxLength =
          key === "textarea-11" || key === "message" ? 2_000 : 500;
        fd.append(key, sanitizeText(value, maxLength));
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
  } catch (error) {
    console.error("CF7 PROXY ERROR:", error);

    return Response.json(
      {
        status: "mail_failed",
        message: "Message could not be sent. Please try again.",
      },
      { status: 500 },
    );
  }
}
