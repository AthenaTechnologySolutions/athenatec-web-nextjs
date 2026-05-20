"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AIChatbot = dynamic(() => import("@/app/components/chatbot/chatbot"), {
  ssr: false,
  loading: () => null,
});

export default function DeferredChatbot() {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => setShowChatbot(true), {
        timeout: 2500,
      });
    } else {
      timeoutId = setTimeout(() => setShowChatbot(true), 1200);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return showChatbot ? <AIChatbot /> : null;
}
