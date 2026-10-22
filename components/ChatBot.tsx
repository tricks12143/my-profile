"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "gemini-ai" | "local-knowledge-base";
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  "What are John's core skills?",
  "Tell me about his SaaS projects",
  "What AI & LLM tech does he use?",
  "How can I contact or hire John?",
];

export default function ChatBot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro-msg",
      role: "assistant",
      content:
        "Hello! 👋 I'm **John Irvin Udang's AI Assistant**, powered by **Google Gemini AI**.\n\nAsk me anything about John's 9+ years of engineering experience, tech stacks (React, Next.js, C# .NET, SaaS, Cloud), sample projects, or how to get in touch!",
      timestamp: "Just now",
      source: "gemini-ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const [savedKeyNotification, setSavedKeyNotification] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Load custom API key from localStorage if present
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem("GEMINI_USER_API_KEY");
      if (storedKey) {
        setCustomApiKey(storedKey);
      }
    } catch {
      // Ignore localStorage errors
    }

    // Listen for custom trigger to open chat from anywhere
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-gemini-chat", handleOpenChat);
    return () => window.removeEventListener("open-gemini-chat", handleOpenChat);
  }, []);

  const handleSaveApiKey = () => {
    try {
      if (customApiKey.trim()) {
        localStorage.setItem("GEMINI_USER_API_KEY", customApiKey.trim());
      } else {
        localStorage.removeItem("GEMINI_USER_API_KEY");
      }
      setSavedKeyNotification(true);
      setTimeout(() => setSavedKeyNotification(false), 2500);
      setShowSettings(false);
    } catch {
      // Ignore
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const storedKey =
        customApiKey.trim() ||
        (typeof window !== "undefined"
          ? localStorage.getItem("GEMINI_USER_API_KEY") || ""
          : "");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          clientApiKey: storedKey || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to receive AI response");
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "No response generated.",
        source: data.source,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `⚠️ **Connection Note:** ${err.message || "Something went wrong."}\n\n*You can add your own free Gemini API key in the ⚙️ Settings at the top to connect immediately!*`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "intro-msg-new",
        role: "assistant",
        content:
          "Chat history cleared. How can I help you learn more about John Irvin Udang's experience and projects today?",
        timestamp: "Just now",
        source: "gemini-ai",
      },
    ]);
  };

  // Basic markdown parser for bold, bullet points, headers, and code
  const formatContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      // Headers
      if (line.startsWith("### ")) {
        return (
          <h4 key={i} className="mt-2 text-sm font-bold text-white">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={i} className="mt-2 text-base font-bold text-white">
            {line.replace("## ", "")}
          </h3>
        );
      }
      // Bullet points
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const item = line.replace(/^[\*\-]\s+/, "");
        return (
          <li key={i} className="ml-4 list-disc text-xs text-neutral-300">
            {parseInlineMarkup(item)}
          </li>
        );
      }
      // Numbered items
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="ml-4 list-decimal text-xs text-neutral-300">
            {parseInlineMarkup(line.replace(/^\d+\.\s/, ""))}
          </li>
        );
      }
      // Empty lines
      if (!line.trim()) {
        return <div key={i} className="h-1.5" />;
      }
      // Regular paragraphs
      return (
        <p key={i} className="text-xs text-neutral-300 leading-relaxed">
          {parseInlineMarkup(line)}
        </p>
      );
    });
  };

  // Parses bold **text**, inline `code`, and markdown links [text](url)
  const parseInlineMarkup = (text: string) => {
    // Regex for bold, code, and links
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={index}
            className="rounded bg-white/10 px-1 py-0.5 font-mono text-[11px] text-emerald-300"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline hover:text-emerald-300 transition-colors"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Pulsing prompt badge */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-neutral-900/90 px-3.5 py-1.5 text-xs text-neutral-200 shadow-xl backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-medium">Ask Gemini AI</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Gemini AI Chatbot"
            className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 p-0.5 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/20 active:scale-95"
          >
            {/* Gradient border wrapper */}
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-neutral-950 transition-colors group-hover:bg-neutral-900">
              {/* Gemini Star / Sparkle Icon */}
              <svg
                className="h-7 w-7 text-white transition-transform group-hover:rotate-12 group-hover:text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-neutral-950 bg-emerald-500"></span>
            </span>
          </button>
        </div>
      )}

      {/* Chat Window Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 flex h-[580px] max-h-[92vh] w-[95vw] max-w-[420px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/95 shadow-2xl backdrop-blur-2xl transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/80 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 text-emerald-400 border border-white/10">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-neutral-950" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-semibold text-white">
                    John&apos;s Gemini AI Assistant
                  </h3>
                  <span className="rounded bg-white/10 px-1.5 py-0.2 text-[9px] font-mono text-neutral-300">
                    v2.5
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 font-mono">
                  Powered by Google Gemini
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Settings Toggle */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Gemini API Key Settings"
                className={`rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors ${
                  showSettings ? "bg-white/10 text-white" : ""
                }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {/* Clear Chat */}
              <button
                onClick={clearChat}
                title="Clear Conversation"
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Settings Drawer (API Key configuration) */}
          {showSettings && (
            <div className="border-b border-white/10 bg-neutral-900/90 p-4 transition-all">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">Gemini API Key</h4>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-emerald-400 hover:underline"
                >
                  Get free key &nearr;
                </a>
              </div>
              <p className="mt-1 text-[11px] text-neutral-400">
                Optional: Enter your own Google Gemini API key to query Gemini directly from your browser.
              </p>
              <div className="mt-2.5 flex gap-2">
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  className="flex-1 rounded-lg border border-white/15 bg-neutral-950 px-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:border-white focus:outline-none font-mono"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-neutral-200"
                >
                  Save
                </button>
              </div>
              {savedKeyNotification && (
                <p className="mt-1 text-[10px] text-emerald-400 font-mono">
                  ✓ Key saved in your browser!
                </p>
              )}
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-xs ${
                    msg.role === "user"
                      ? "bg-white text-black font-medium"
                      : "border border-white/10 bg-neutral-900/80 text-white"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div>{formatContent(msg.content)}</div>
                  )}
                </div>

                <div className="mt-1 flex items-center gap-2 px-1 text-[9px] text-neutral-500 font-mono">
                  <span>{msg.timestamp}</span>
                  {msg.source && (
                    <span>
                      &bull;{" "}
                      {msg.source === "gemini-ai"
                        ? "Gemini AI"
                        : "Knowledge Base"}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Live Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="rounded-2xl border border-white/10 bg-neutral-900/80 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400"></span>
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                    <span className="ml-1 text-[10px] font-mono text-neutral-400">
                      Gemini is generating...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          {messages.length <= 2 && (
            <div className="border-t border-white/5 bg-neutral-950 px-3 py-2">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                Quick Questions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {INITIAL_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-neutral-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="border-t border-white/10 bg-neutral-900/90 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Gemini about John's work..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 rounded-xl border border-white/15 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-white focus:outline-none disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-all hover:bg-neutral-200 disabled:opacity-30 active:scale-95"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
              <span>Google Gemini AI 2.5</span>
              <Link
                href="/contact"
                className="hover:text-neutral-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Direct Contact &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
