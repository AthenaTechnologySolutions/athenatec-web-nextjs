import { buildSystemPrompt } from "@/app/data/knowledgeBase";
import {
  enforceSameOrigin,
  isPlainObject,
  rateLimit,
  sanitizeText,
} from "@/lib/request-guard";
import OpenAI from "openai";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  try {
    const originError = enforceSameOrigin(req);
    if (originError) return originError;

    const limitError = rateLimit(req, { keyPrefix: "chat", limit: 12 });
    if (limitError) return limitError;

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "Chat service is not configured." },
        { status: 503 },
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const payload = await req.json();

    if (!isPlainObject(payload) || !Array.isArray(payload.messages)) {
      return Response.json(
        { error: "Messages array is required." },
        { status: 400 },
      );
    }

    const userName = sanitizeText(payload.userName, 80);
    const safeMessages = payload.messages
      .filter(
        (msg): msg is { role: "user" | "assistant"; content: string } =>
          isPlainObject(msg) &&
          (msg.role === "user" || msg.role === "assistant") &&
          typeof msg.content === "string",
      )
      .map((msg) => ({
        role: msg.role,
        content: sanitizeText(msg.content, 2_000),
      }))
      .filter((msg) => msg.content.length > 0)
      .slice(-10);

    if (safeMessages.length === 0) {
      return Response.json(
        { error: "At least one valid message is required." },
        { status: 400 },
      );
    }

    const systemPrompt = buildSystemPrompt(userName);

    const chatMessages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...safeMessages,
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply =
      response.choices[0]?.message?.content ||
      "I'm sorry, I couldn't process that. Please try again.";

    return Response.json({ reply });
  } catch (error: unknown) {
    console.error("OPENAI CHAT ERROR:", error);

    const fallbackMessage =
      "I'm having trouble connecting right now. Please try again in a moment, or visit our contact page at https://athenatec.com/contact for immediate assistance.";

    return Response.json(
      { reply: fallbackMessage, error: true },
      { status: 500 },
    );
  }
}
