"use client";

import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, COPILOT_MESSAGES } from "@/data/mockData";
import { Send, Sparkles } from "lucide-react";

export default function MunicipalityCopilotPage() {
  const user = DEMO_USERS.find((u) => u.role === "municipality")!;
  const [messages, setMessages] = useState(COPILOT_MESSAGES.municipality);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newId = messages.length + 1;
    const userMessage = { id: newId, sender: "user" as const, text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    setTimeout(() => {
      const aiResponses = [
        "Let me check the permit queue and flight alerts for you.",
        "Based on today's data, you have 2 high-priority permits to review.",
        "Revenue projections for this month show a 15% increase if we approve more corridor requests.",
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((prev) => [...prev, { id: newId + 1, sender: "ai" as const, text: randomResponse }]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <AppShell role="municipality" user={user}>
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)" }}>
        <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
            <Sparkles size={24} style={{ color: "var(--accent)" }} />
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text)", margin: 0 }}>SkyOS AI Copilot</h2>
              <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}>Ask about permits, alerts, or revenue</p>
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px", paddingBottom: "16px" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backgroundColor: msg.sender === "user" ? "var(--accent)" : "var(--card-secondary)",
                    color: msg.sender === "user" ? "#fff" : "var(--text)",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something like 'Show pending permits'..."
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: "14px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                backgroundColor: "var(--card-secondary)",
                color: "var(--text)",
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                backgroundColor: "var(--accent)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              <Send size={18} style={{ marginRight: "8px" }} />
              Send
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
