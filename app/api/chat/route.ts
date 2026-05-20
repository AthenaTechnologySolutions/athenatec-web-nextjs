import { buildSystemPrompt } from "@/app/data/knowledgeBase";
import OpenAI from "openai";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const { messages, userName } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(userName);

    const chatMessages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
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

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("OPENAI CHAT ERROR:", error);

    const fallbackMessage =
      "I'm having trouble connecting right now. Please try again in a moment, or visit our contact page at https://www.athenatec.com/contact/ for immediate assistance.";

    return new Response(
      JSON.stringify({ reply: fallbackMessage, error: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
