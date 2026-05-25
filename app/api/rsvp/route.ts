import {
  enforceSameOrigin,
  rateLimit,
  isValidEmail,
} from "@/lib/request-guard";
import { getWpApiUrl } from "@/lib/wp";

const CF7_FORM_ID = "232904";
const CF7_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";

export async function POST(req: Request) {
  try {
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const limitError = rateLimit(req, { keyPrefix: "rsvp", limit: 8 });
    if (limitError) return limitError;

    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      industry,
      interests,
      source,
      useCase,
      consent,
    } = body;

    const name = `${firstName || ''} ${lastName || ''}`.trim();

    if (!name || !isValidEmail(email) || !industry || !consent) {
      return Response.json(
        {
          status: "validation_failed",
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const message = `
Company: ${company || 'N/A'}
Job Title: ${jobTitle || 'N/A'}
Industry: ${industry}

Areas of Interest:
${Array.isArray(interests) && interests.length > 0 ? interests.join(', ') : 'None specified'}

How did you hear about us: ${source || 'N/A'}

Use Case:
${useCase || 'N/A'}
    `.trim();

    const fd = new FormData();
    fd.append("_wpcf7", CF7_FORM_ID);
    fd.append("_wpcf7_version", "5.9");
    fd.append("_wpcf7_locale", "en_US");
    fd.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
    fd.append("_wpcf7_container_post", "0");
    fd.append("your-name", name);
    fd.append("your-email", email);
    fd.append("your-phone", phone || 'N/A');
    fd.append("your-subject", "Inaugural Agentic AI Research Lab RSVP");
    fd.append("your-message", message);
    fd.append("your-page", "RSVP Page");
    fd.append("page-url", req.headers.get("referer") || "");

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

    // WordPress CF7 returns status "mail_sent" if successful
    if (data.status !== "mail_sent" && data.status !== "validation_failed") {
        console.error("CF7 Error:", data);
    }

    return Response.json(data, { status: response.ok ? 200 : response.status });
  } catch (error) {
    console.error("RSVP FORM ERROR:", error);

    return Response.json(
      {
        status: "mail_failed",
        message: "RSVP could not be submitted. Please try again.",
      },
      { status: 500 }
    );
  }
}
