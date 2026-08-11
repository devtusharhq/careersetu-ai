import { useState } from "react";
import { Bot, Loader2, Send, Sparkles, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  "Which exam should I take after B.Tech CSE?",
  "How to prepare for UPSC CSE alongside college?",
  "Best high-paying government careers in India",
  "Scholarships available for OBC/EWS students",
];

export function CareerChatbot({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Namaste! I am CareerSetu AI Assistant. Ask me anything about streams, top careers, government exams (UPSC, GATE, SSC, NEET), study strategies, or scholarships!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env['VITE_GEMINI_API_KEY'] || import.meta.env['GEMINI_API_KEY'];
      let botResponseText = "";

      if (apiKey) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are CareerSetu AI, an empathetic, highly knowledgeable career advisor for Indian students (Class 10 to Post Graduate). Keep your answer helpful, structured, concise, and actionable for Indian competitive exams or career choices. Question: ${userText}`,
                    },
                  ],
                },
              ],
            }),
          }
        );
        const data = await response.json();
        botResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }

      if (!botResponseText) {
        // Fallback intelligent career guidance answers
        const lower = userText.toLowerCase();
        if (lower.includes("b.tech") || lower.includes("cse") || lower.includes("tech")) {
          botResponseText = "For B.Tech CSE graduates, top competitive routes include:\n1. **GATE CS**: Unlocks M.Tech in IITs & PSU jobs at ISRO, BARC, IOCL.\n2. **UPSC CSE**: For IAS/IPS/IFS if interested in civil service.\n3. **CAT**: For top IIM MBA management roles.\n4. **Software Engineering Careers**: AI/ML Engineer, Full Stack, DevOps.";
        } else if (lower.includes("upsc") || lower.includes("ias")) {
          botResponseText = "To prepare for UPSC CSE alongside college:\n1. Start reading **NCERTs (Class 6-12)** for History, Geography & Polity.\n2. Read The Hindu/Indian Express daily for current affairs.\n3. Choose your Optional Subject early based on interest & college major.\n4. Solve past 10 years prelims papers.";
        } else if (lower.includes("scholarship")) {
          botResponseText = "Top Indian Scholarships:\n1. **NSP Merit-cum-Means**: For general/minority students (₹20,000/yr).\n2. **State Post-Matric Scholarships**: Covers full tuition for reserved categories.\n3. **INSPIRE Scholarship (DST)**: ₹80,000/yr for Top 1% in Science stream.";
        } else {
          botResponseText = `Great question regarding "${userText}". In India, combining a strong foundation in core subjects with early aptitude practice (Quant, Logical Reasoning, Verbal) gives you an edge across both corporate placements and exam benchmarks like GATE, UPSC, and SSC CGL. Would you like a step-by-step 6-month study roadmap?`;
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "I'm having a brief connection delay, but I recommend exploring CareerSetu's AI Career Assessment & Exam Finder for detailed guidance!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass flex flex-col h-[500px] w-full max-w-lg rounded-3xl border-primary/20 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="gradient-brand px-5 py-4 flex items-center justify-between text-primary-foreground">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-white/20 backdrop-blur">
            <Bot className="size-5" />
          </span>
          <div>
            <h3 className="font-bold text-sm leading-none flex items-center gap-1.5">
              CareerSetu AI Chatbot
              <Sparkles className="size-3.5 fill-amber-300 text-amber-300" />
            </h3>
            <p className="text-[11px] opacity-80 mt-0.5">Online · Powered by Gemini AI</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-primary-foreground hover:bg-white/20 rounded-full">
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs sm:text-sm">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                m.sender === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-foreground"
              }`}
            >
              {m.sender === "user" ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-line leading-relaxed ${
                m.sender === "user"
                  ? "gradient-brand text-primary-foreground rounded-tr-none shadow-soft"
                  : "bg-card border border-border/70 text-foreground rounded-tl-none shadow-xs"
              }`}
            >
              {m.text}
              <p className={`mt-1.5 text-[10px] text-right ${m.sender === "user" ? "opacity-75" : "text-muted-foreground"}`}>
                {m.timestamp}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground italic pl-9">
            <Loader2 className="size-3.5 animate-spin text-primary" />
            <span>CareerSetu AI is analyzing your question...</span>
          </div>
        )}
      </div>

      {/* Suggested prompts */}
      {messages.length < 3 && (
        <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none">
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="shrink-0 rounded-lg bg-accent/60 hover:bg-accent px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors border border-border/40"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="p-3 bg-card border-t border-border flex items-center gap-2"
      >
        <Input
          placeholder="Ask AI about exams, careers, cutoffs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-10 rounded-xl bg-background border-border text-xs sm:text-sm"
        />
        <Button
          type="submit"
          disabled={!input.trim() || loading}
          size="icon"
          className="gradient-brand size-10 shrink-0 rounded-xl text-primary-foreground shadow-glow"
        >
          <Send className="size-4" />
        </Button>
      </form>
    </Card>
  );
}
