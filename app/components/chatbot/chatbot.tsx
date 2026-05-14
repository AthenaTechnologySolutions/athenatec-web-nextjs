"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import "./bot.scss";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
};

const SERVICE_OPTIONS = [
  { label: "MES Solutions", value: "MES Solutions" },
  { label: "Analytics & Reporting", value: "Analytics & Reporting" },
  { label: "System Integration", value: "System Integration" },
  { label: "Cloud Manufacturing", value: "Cloud Manufacturing" },
  { label: "Consulting", value: "Consulting" },
  { label: "Other / Not sure yet", value: "Other" },
];

const INLINE_MARKDOWN_PATTERN =
  /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)|\*\*([^*]+)\*\*/g;

function renderInlineMarkdown(line: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  INLINE_MARKDOWN_PATTERN.lastIndex = 0;

  while ((match = INLINE_MARKDOWN_PATTERN.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      const href = match[2];
      const isExternal = href.startsWith("http");

      nodes.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      nodes.push(<strong key={`${match[3]}-${match.index}`}>{match[3]}</strong>);
    }

    lastIndex = INLINE_MARKDOWN_PATTERN.lastIndex;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }

  return nodes;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"name" | "email" | "services" | "done">(
    "name",
  );
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    services: "",
  });
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const getTimestamp = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const toggleOpen = () => {
    if (!open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi there! Welcome to Athenatec.\n\nI'm here to connect you with the right team. Let's start: what's your name?",
          timestamp: getTimestamp(),
        },
      ]);
    }

    setOpen((prev) => !prev);
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const addBotMessage = (content: string, after: Message[]) => [
    ...after,
    { role: "assistant" as const, content, timestamp: getTimestamp() },
  ];

  const sendMessage = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;

    const userMsg: Message = {
      role: "user",
      content: value,
      timestamp: getTimestamp(),
    };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");

    if (step === "name") {
      setUserData((prev) => ({ ...prev, name: value }));
      setMessages(
        addBotMessage(
          `Nice to meet you, ${value}.\n\nWhat's your email address? We'll use it to follow up with you.`,
          updated,
        ),
      );
      setStep("email");
      return;
    }

    if (step === "email") {
      if (!validateEmail(value)) {
        setMessages(
          addBotMessage(
            "That doesn't look like a valid email. Please try again, for example name@company.com.",
            updated,
          ),
        );
        return;
      }

      setUserData((prev) => ({ ...prev, email: value }));
      setMessages(
        addBotMessage(
          "Great, thanks.\n\nWhich of our services are you interested in? Pick one below or type your own.",
          updated,
        ),
      );
      setStep("services");
      return;
    }

    if (step === "services") {
      await submitLead(value, updated);
    }
  };

  const handleServiceChip = async (value: string) => {
    const userMsg: Message = {
      role: "user",
      content: value,
      timestamp: getTimestamp(),
    };
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

      if (!res.ok || !data.success) {
        throw new Error("Submission failed");
      }

      setMessages(
        addBotMessage(
          `Perfect. We've received your details and will reach out to you at **${finalUserData.email}** shortly.\n\nIn the meantime, feel free to explore [athenatec.com](https://athenatec.com).`,
          currentMessages,
        ),
      );
      setSubmitted(true);
      setStep("done");
    } catch {
      setMessages(
        addBotMessage(
          "Something went wrong submitting your details. Please try again or reach us directly at [athenatec.com/contact](https://athenatec.com/contact).",
          currentMessages,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (content: string) =>
    content.split("\n").map((line, index) => (
      <span key={`${line}-${index}`}>
        {index > 0 && <br />}
        {renderInlineMarkdown(line)}
      </span>
    ));

  return (
    <>
      <button
        type="button"
        className="chat-button"
        aria-label={open ? "Close Athenatec AI chat" : "Open Athenatec AI chat"}
        aria-expanded={open}
        aria-controls="athenatec-chat-window"
        onClick={toggleOpen}
      >
        <span className="chat-icon-wrapper" aria-hidden="true">
          <span className="ai-toy-bot">
            <span className="ai-toy-antenna" />
            <span className="ai-toy-head">
              <span className="ai-toy-face">
                <span className="ai-toy-eye" />
                <span className="ai-toy-eye" />
                <span className="ai-toy-smile" />
              </span>
            </span>
            <span className="ai-toy-body">
              <span className="ai-toy-core" />
            </span>
          </span>
        </span>
        <span className="pulse-ring" aria-hidden="true" />
      </button>

      <div
        id="athenatec-chat-window"
        className={`chat-window ${open ? "chat-open" : "chat-closed"}`}
      >
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M6 10h12v2a6 6 0 0 1-12 0v-2z" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            </div>
            <div>
              <div className="chat-title">Athenatec AI</div>
              <div className="chat-status">
                <span className="status-dot" aria-hidden="true" /> Online
              </div>
            </div>
          </div>
          <button
            type="button"
            className="chat-close"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div
              key={`${msg.timestamp}-${index}`}
              className={`chat-row ${msg.role}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="chat-bubble">
                <div className="bubble-content">{formatMessage(msg.content)}</div>
                {msg.timestamp && (
                  <div className="bubble-time">{msg.timestamp}</div>
                )}
              </div>
            </div>
          ))}

          {step === "services" && !loading && !submitted && (
            <div className="quick-replies">
              {SERVICE_OPTIONS.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  className="quick-reply-chip"
                  onClick={() => handleServiceChip(option.value)}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="chat-row assistant">
              <div className="chat-bubble typing" aria-label="Sending">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        {step !== "done" && (
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label={
                step === "name"
                  ? "Enter your name"
                  : step === "email"
                    ? "Enter your email"
                    : "Type a service"
              }
              placeholder={
                step === "name"
                  ? "Enter your name..."
                  : step === "email"
                    ? "Enter your email..."
                    : "Type a service or pick one above..."
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  void sendMessage();
                }
              }}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => void sendMessage()}
              disabled={loading || !input.trim()}
              className="send-btn"
              aria-label="Send message"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
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
