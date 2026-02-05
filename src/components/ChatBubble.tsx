"use client";

import { useState, useEffect } from "react";
import { X, Send, RotateCcw, Sparkles, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const API_URL =
  process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:3002";

// Parse bot response for navigation commands
function parseResponse(response: string) {
  const navigationRegex = /\[NAVIGATE:(\w+)\]/g;
  let navigation = null;

  const match = navigationRegex.exec(response);
  if (match) {
    navigation = match[1];
  }

  const text = response.replace(navigationRegex, "").trim();
  return { text, navigation };
}

// Navigate to a section on the portfolio
function navigateToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Bonjour, hi there! 👋 I'm Mufi's AI assistant. Ask me anything about her skills, experience, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const suggestions = [
    "What is Mufida's tech stack?",
    "Tell me about her experience",
    "What projects has she built?",
    "Is she available for work?",
    "What's her accessibility expertise?",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage = { role: "user", content: trimmedInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = newMessages.slice(1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput, history }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.response },
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content:
              data.error || "Oops! Something went wrong. Please try again! 🙏",
          },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Unable to connect. Please try again later!",
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    setTimeout(() => {
      const form = document.querySelector("form");
      form?.requestSubmit();
    }, 100);
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Bonjour, hi there! 👋 I'm Mufi's AI assistant. Ask me anything about her skills, experience, or projects!",
      },
    ]);
  };

  // Listen for navigation messages from chatbot
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "MUFI_NAVIGATE" && event.data.section) {
        const element = document.getElementById(event.data.section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false); // Close chat after navigation
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[380px] h-[500px] z-50 bg-background rounded-2xl border border-border shadow-2xl shadow-primary/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/chatbot-icon.svg"
                    alt="Mufi's AI Assistant avatar"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm">
                    Mufi&apos;s Assistant
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {isLoading ? "Thinking..." : "Online"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation and start over"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar"
              role="log"
              aria-live="polite"
              aria-label="Chat conversation"
            >
              {messages.map((message, index) => {
                const { text, navigation } =
                  message.role === "assistant"
                    ? parseResponse(message.content)
                    : { text: message.content, navigation: null };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <Image
                          src="/chatbot-icon.svg"
                          alt="AI Assistant"
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] ${message.role === "user" ? "" : "space-y-2"}`}
                    >
                      <div
                        className={`${
                          message.role === "user"
                            ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl rounded-tr-sm"
                            : "bg-card border border-border rounded-2xl rounded-tl-sm"
                        } px-4 py-3`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {text}
                        </p>
                      </div>

                      {/* Navigation button */}
                      {navigation && message.role === "assistant" && (
                        <button
                          onClick={() => {
                            navigateToSection(navigation);
                            setIsOpen(false); // Close chat after navigation
                          }}
                          className="inline-flex items-center gap-1 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
                          aria-label={`Navigate to ${navigation} section and close chat`}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Go to {navigation}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <Image
                      src="/chatbot-icon.svg"
                      alt="AI Assistant is typing"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && suggestions.length > 0 && (
              <div className="px-4 py-3 border-t border-border bg-card/30">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-2">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>Try asking:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      disabled={isLoading}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted hover:border-primary/50 transition-all duration-200 disabled:opacity-50"
                      aria-label={`Ask: ${question}`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border bg-card/30"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Mufi..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all disabled:opacity-50"
                  maxLength={1000}
                  aria-label="Type your question about Mufida"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl max-w-[250px]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm text-foreground font-medium">
              Have questions about Mufi?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Click here to chat! 💬
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-md transition-all duration-300 z-50 flex items-center justify-center overflow-hidden ${
          isOpen
            ? "bg-card border border-border hover:bg-muted"
            : "bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-md hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Image
            src="/chatbot-icon.svg"
            alt="Open chat with Mufi's AI Assistant"
            width={32}
            height={32}
            className="object-contain cursor-pointer"
          />
        )}
      </motion.button>
    </>
  );
}
