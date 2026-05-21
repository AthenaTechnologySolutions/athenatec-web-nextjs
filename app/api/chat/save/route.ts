import {
  enforceSameOrigin,
  isPlainObject,
  isValidEmail,
  rateLimit,
  sanitizeText,
} from "@/lib/request-guard";
import { getWpApiUrl } from "@/lib/wp";

const CF7_FORM_ID = "224297";
const CF7_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";

type LeadMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
};

export async function POST(req: Request) {
  try {
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const limitError = rateLimit(req, {
      keyPrefix: "chat-lead",
      limit: 6,
      windowMs: 60_000,
    });
    if (limitError) return limitError;

    const payload = await req.json();

    if (!isPlainObject(payload)) {
      return Response.json(
        { error: "Invalid request payload." },
        { status: 400 },
      );
    }

    const name = sanitizeText(payload.name, 120);
    const email = sanitizeText(payload.email, 254);

    if (!name || !isValidEmail(email)) {
      return Response.json(
        { error: "A valid name and email are required." },
        { status: 400 },
      );
    }

    const safeService =
      typeof payload.services === "string" && payload.services.trim()
        ? sanitizeText(payload.services, 180)
        : "Not specified";

    const safeMessages: LeadMessage[] = Array.isArray(payload.messages)
      ? payload.messages
          .filter(
            (msg): msg is LeadMessage =>
              isPlainObject(msg) &&
              (msg.role === "user" || msg.role === "assistant") &&
              typeof msg.content === "string",
          )
          .map((msg) => ({
            role: msg.role,
            content: sanitizeText(msg.content, 2_000),
            timestamp: sanitizeText(msg.timestamp, 40),
          }))
          .filter((msg) => msg.content.length > 0)
          .slice(-20)
      : [];

    const transcript = safeMessages
      .map(
        (msg) =>
          `[${msg.role === "user" ? "User" : "Assistant"}${
            msg.timestamp ? ` ${msg.timestamp}` : ""
          }]: ${msg.content}`,
      )
      .join("\n\n");

    const chatSummary = `
--- Chatbot Lead ---
Name:     ${name}
Email:    ${email}
Services: ${safeService}
Time:     ${new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })}
--------------------

${transcript}
    `.trim();

    const cf7Url = getWpApiUrl(
      `/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
      CF7_SITE_URL,
    );

    const fd = new FormData();
    fd.append("_wpcf7", CF7_FORM_ID);
    fd.append("_wpcf7_version", "5.9");
    fd.append("_wpcf7_locale", "en_US");
    fd.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
    fd.append("_wpcf7_container_post", "0");
    fd.append("your-name", name);
    fd.append("your-email", email);
    fd.append("your-message", chatSummary);
    fd.append("your-service", safeService);
    fd.append("your-page", "Chatbot");
    fd.append("your-source", "chatbot-widget");

    const response = await fetch(cf7Url, {
      method: "POST",
      body: fd,
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      redirect: "follow",
    });

    const text = await response.text();

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      return Response.json(
        { error: "Invalid response from WordPress" },
        { status: 502 },
      );
    }

    if (data.status === "mail_sent") {
      return Response.json({ success: true });
    }

    return Response.json(
      {
        success: false,
        cf7Status: data.status,
        details: data,
      },
      { status: response.ok ? 200 : response.status },
    );
  } catch (err) {
    console.error("SAVE LEAD ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
