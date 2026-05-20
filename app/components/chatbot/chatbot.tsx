"use client";
import { useState, useRef, useEffect } from "react";
import "./bot.scss";


type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
};

const SERVICE_OPTIONS = [
  { label: "🏭 MES Solutions", value: "MES Solutions" },
  { label: "📊 Analytics & Reporting", value: "Analytics & Reporting" },
  { label: "🔧 System Integration", value: "System Integration" },
  { label: "☁️ Cloud Manufacturing", value: "Cloud Manufacturing" },
  { label: "🤝 Consulting", value: "Consulting" },
  { label: "❓ Other / Not sure yet", value: "Other" },
];

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<"name" | "email" | "services" | "done">("name");
  const [userData, setUserData] = useState({ name: "", email: "", services: "" });
 
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const getTimestamp = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const toggleOpen = () => {
    if (!open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi there! 👋 Welcome to Athenatec!\n\nI'm here to connect you with the right team. Let's start — what's your name?",
          timestamp: getTimestamp(),
        },
      ]);
    }
    setOpen((prev) => !prev);
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const addBotMessage = (content: string, after: Message[]) => {
    return [
      ...after,
      { role: "assistant" as const, content, timestamp: getTimestamp() },
    ];
  };

  const sendMessage = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;

    const userMsg: Message = { role: "user", content: value, timestamp: getTimestamp() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");

    // STEP 1 — Name
    if (step === "name") {
      setUserData((prev) => ({ ...prev, name: value }));
      setMessages(
        addBotMessage(
          `Nice to meet you, ${value}! 😊\n\nWhat's your email address? We'll use it to follow up with you.`,
          updated
        )
      );
      setStep("email");
      return;
    }

    // STEP 2 — Email
    if (step === "email") {
      if (!validateEmail(value)) {
        setMessages(
          addBotMessage(
            "That doesn't look like a valid email. Please try again (e.g. name@company.com).",
            updated
          )
        );
        return;
      }
      setUserData((prev) => ({ ...prev, email: value }));
      setMessages(
        addBotMessage(
          "Great, thanks! 🚀\n\nWhich of our services are you interested in? Pick one below or type your own.",
          updated
        )
      );
      setStep("services");
      return;
    }

    // STEP 3 — Services (typed answer)
    if (step === "services") {
      await submitLead(value, updated);
    }
  };

  const handleServiceChip = async (value: string) => {
    const userMsg: Message = { role: "user", content: value, timestamp: getTimestamp() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    await submitLead(value, updated);
  };

  const submitLead = async (service: string, currentMessages: Message[]) => {
    setLoading(true);
    const finalUserData = { ...userData, services: service };
    setUserData(finalUserData);

    try {
      const res = await fetch("/api/chat/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalUserData.name,
          email: finalUserData.email,
          services: service,
          messages: currentMessages,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages(
          addBotMessage(
            `Perfect! ✅ We've received your details and will reach out to you at **${finalUserData.email}** shortly.\n\nIn the meantime, feel free to explore [athenatec.com](https://athenatec.com) for more information!`,
            currentMessages
          )
        );
        setSubmitted(true);
        setStep("done");
      } else {
        throw new Error("Submission failed");
      }

      setMessages(
        addBotMessage(
          `Perfect. We've received your details and will reach out to you at **${finalUserData.email}** shortly.\n\nIn the meantime, feel free to explore [athenatec.com](https://www.athenatec.com/).`,
          currentMessages,
        ),
      );
      setSubmitted(true);
      setStep("done");
    } catch {
      setMessages(
        addBotMessage(
          "Something went wrong submitting your details. Please try again or reach us directly at [athenatec.com/contact](https://www.athenatec.com/contact/).",
          currentMessages,
        ),
      );
    }

    setLoading(false);
  };

  const formatMessage = (content: string) =>
    content.split("\n").map((line, i) => {
      let formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      formatted = formatted.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      );
      return (
        <span key={i}>
          {i > 0 && <br />}
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
        </span>
      );
    });

  return (
    <>
      <div className="chat-button" onClick={toggleOpen}>
        <div className="chat-icon-wrapper">
          <div className="ai-toy-bot">
            <div className="ai-toy-antenna"></div>
            <div className="ai-toy-head">
              <div className="ai-toy-face">
                <div className="ai-toy-eye"></div>
                <div className="ai-toy-eye"></div>
                <div className="ai-toy-smile"></div>
              </div>
            </div>
            <div className="ai-toy-body">
              <div className="ai-toy-core"></div>
            </div>
          </div>
        </div>
        <span className="pulse-ring"></span>
      </div>

      <div className={`chat-window ${open ? "chat-open" : "chat-closed"}`}>
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M6 10h12v2a6 6 0 0 1-12 0v-2z" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            </div>
            <div>
              <div className="chat-title">Athenatec AI</div>
              <div className="chat-status">
                <span className="status-dot"></span> Online
              </div>
            </div>
          </div>
          <div className="chat-close" onClick={() => setOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-row ${msg.role}`} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="chat-bubble">
                <div className="bubble-content">{formatMessage(msg.content)}</div>
                {msg.timestamp && <div className="bubble-time">{msg.timestamp}</div>}
              </div>
            </div>
          ))}

          {/* Service chips — shown only on services step */}
          {step === "services" && !loading && !submitted && (
            <div className="quick-replies">
              {SERVICE_OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  className="quick-reply-chip"
                  onClick={() => handleServiceChip(opt.value)}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="chat-row assistant">
              <div className="chat-bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>

        {/* Hide input once submitted */}
        {step !== "done" && (
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                step === "name"
                  ? "Enter your name..."
                  : step === "email"
                  ? "Enter your email..."
                  : "Type a service or pick one above..."
              }
              onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="send-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}