import {
  enforceSameOrigin,
  formText,
  isValidEmail,
  rateLimit,
} from "@/lib/request-guard";
import { getWpApiUrl } from "@/lib/wp";

const CF7_FORM_ID = "17";
const CF7_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";

export async function POST(req: Request) {
  try {
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const limitError = rateLimit(req, { keyPrefix: "contact", limit: 8 });
    if (limitError) return limitError;

    const incoming = await req.formData();

    const name = formText(incoming, "your-name", 120);
    const email = formText(incoming, "your-email", 254);
    const phone = formText(incoming, "your-phone", 40);
    const subject = formText(incoming, "your-subject", 160);
    const message = formText(incoming, "your-message", 4_000);
    const page = formText(incoming, "your-page", 160) || "Contact Page";
    const pageUrl =
      formText(incoming, "page-url", 500) || req.headers.get("referer") || "";

    if (!name || !isValidEmail(email) || !phone || !subject || !message) {
      return Response.json(
        {
          status: "validation_failed",
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const fd = new FormData();
    fd.append("_wpcf7", CF7_FORM_ID);
    fd.append("_wpcf7_version", "5.9");
    fd.append("_wpcf7_locale", "en_US");
    fd.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
    fd.append("_wpcf7_container_post", "0");
    fd.append("your-name", name);
    fd.append("your-email", email);
    fd.append("your-phone", phone);
    fd.append("your-subject", subject);
    fd.append("your-message", message);
    fd.append("your-page", page);
    fd.append("page-url", pageUrl);

    const response = await fetch(
      getWpApiUrl(
        `/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
        CF7_SITE_URL
      ),
      {
        method: "POST",
        body: fd,
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        redirect: "follow",
      }
    );

    const text = await response.text();

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      return Response.json(
        {
          status: "mail_failed",
          message: "Contact service returned an unexpected response.",
        },
        { status: 502 }
      );
    }

    return Response.json(data, { status: response.ok ? 200 : response.status });
  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);

    return Response.json(
      {
        status: "mail_failed",
        message: "Message could not be sent. Please try again.",
      },
      { status: 500 }
    );
  }
}
