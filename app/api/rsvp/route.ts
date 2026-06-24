import {
  enforceSameOrigin,
  rateLimit,
  isValidEmail,
} from "@/lib/request-guard";
import { getWpApiUrl } from "@/lib/wp";

const CF7_FORM_ID = "233200";
const CF7_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";

export async function POST(req: Request) {
  try {
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const limitError = rateLimit(req, { keyPrefix: "rsvp", limit: 8 });
    if (limitError) return limitError;

    const body = (await req.json()) as Record<string, unknown>;
    const asString = (value: unknown) => typeof value === "string" ? value.trim() : "";
    const {
      fullName,
      firstName,
      lastName,
      email,
      phone,
      city,
      company,
      jobTitle,
      industry,
      interests,
      source,
      useCase,
      consent,
    } = body;

    const firstNameValue = asString(firstName);
    const lastNameValue = asString(lastName);
    const name = `${firstNameValue} ${lastNameValue}`.trim() || asString(fullName);
    const emailValue = asString(email);
    const phoneValue = asString(phone);
    const cityValue = asString(city);
    const companyValue = asString(company);
    const jobTitleValue = asString(jobTitle);
    const industryValue = asString(industry);
    const sourceValue = asString(source);
    const useCaseValue = asString(useCase);
    const interestList = Array.isArray(interests)
      ? interests
        .filter((interest): interest is string => typeof interest === "string" && interest.trim().length > 0)
        .map(interest => interest.trim())
      : [];

    if (
      !name ||
      !firstNameValue ||
      !lastNameValue ||
      !isValidEmail(emailValue) ||
      !/^\d{10}$/.test(phoneValue) ||
      !cityValue ||
      !companyValue ||
      !jobTitleValue ||
      !industryValue ||
      interestList.length === 0 ||
      !sourceValue ||
      !useCaseValue ||
      consent !== true
    ) {
      return Response.json(
        {
          status: "validation_failed",
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const message = `
Phone: ${phoneValue}
City: ${cityValue}
Company: ${companyValue}
Job Title: ${jobTitleValue}
Industry: ${industryValue}

Areas of Interest:
${interestList.join(', ')}

How did you hear about us: ${sourceValue}

Use Case:
${useCaseValue}
    `.trim();

    const fd = new FormData();
    fd.append("_wpcf7", CF7_FORM_ID);
    fd.append("_wpcf7_version", "5.9");
    fd.append("_wpcf7_locale", "en_US");
    fd.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
    fd.append("_wpcf7_container_post", "0");
    fd.append("first-name", firstNameValue);
    fd.append("last-name", lastNameValue);
    fd.append("your-email", emailValue);
    fd.append("your-phone", phoneValue);
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
