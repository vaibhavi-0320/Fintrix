import React, { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Send, Sparkles, X } from "lucide-react";
import { askFintrixAssistant } from "../services/aiService";
import { formatAddress } from "../lib/utils";

interface ChatMessage {
  role: "assistant" | "user";
  text: string;
}

export function FintrixAssistant({ view, walletAddress, notification }: { view: string; walletAddress?: string | null; notification?: string | null }) {
  const [open, setOpen] = useState(false);
  const [showRiskNudge, setShowRiskNudge] = useState(true);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "I am Fintrix AI. Ask me about wallet connection, invoice funding, portfolio tracking, repayments, or how to use this MVP.",
    },
  ]);

  const riskContext = useMemo(() => {
    if (view === "marketplace") {
      return {
        level: "High Attention",
        suggestion: "Before funding, verify risk score, yield consistency, and repayment horizon.",
      };
    }
    if (view === "upload") {
      return {
        level: "Medium Attention",
        suggestion: "Before creating a simulation, re-check buyer identity, due date, and invoice amount.",
      };
    }
    if (view === "activity") {
      return {
        level: "Review",
        suggestion: "Before repayment actions, confirm status flow and expected settlement amount.",
      };
    }
    return {
      level: "Standard",
      suggestion: "Use risk checks before each decision to reduce avoidable funding mistakes.",
    };
  }, [view]);

  function applyPrompt(prompt: string) {
    setOpen(true);
    setQuestion(prompt);
  }

  useEffect(() => {
    if (!notification) return;
    setMessages((current) => [...current, { role: "assistant", text: notification }]);
  }, [notification]);

  async function submitQuestion() {
    const nextQuestion = question.trim();
    if (!nextQuestion || loading) return;

    setMessages((current) => [...current, { role: "user", text: nextQuestion }]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await askFintrixAssistant({
        question: nextQuestion,
        view,
        walletAddress,
      });
      setMessages((current) => [...current, { role: "assistant", text: response.answer }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: error instanceof Error ? error.message : "I hit a problem while answering. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-24 right-4 z-[85] flex flex-col items-end gap-4 lg:bottom-6 lg:right-6">
      {!open && showRiskNudge ? (
        <div className="max-w-[320px] rounded-2xl border border-yellow-300/30 bg-[#151a25]/95 px-4 py-3 text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="mt-0.5 text-yellow-300" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-yellow-200">Risk Detector</p>
              <p className="mt-1 text-xs leading-5 text-white/80">{riskContext.suggestion}</p>
            </div>
            <button onClick={() => setShowRiskNudge(false)} className="text-white/45 hover:text-white/80" aria-label="Dismiss risk suggestion">
              <X size={14} />
            </button>
          </div>
        </div>
      ) : null}

      {open ? (
        <div className="w-[min(92vw,380px)] overflow-hidden rounded-[28px] border border-white/10 bg-[#07152d]/95 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#123766] text-white shadow-[inset_0_0_30px_rgba(255,255,255,0.12)]">
                <img src="/fintrix-ai-logo.png" alt="Fintrix AI logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-headline text-lg font-semibold">FINTRIX AI</p>
                <p className="text-xs text-white/60">{walletAddress ? `Wallet ${formatAddress(walletAddress)}` : "No wallet connected"}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full bg-white/10 p-2 text-white/75 transition hover:bg-white/15 hover:text-white">
              <X size={16} />
            </button>
          </div>

          <div className="max-h-[420px] space-y-3 overflow-y-auto px-5 py-4">
            <div className="rounded-2xl border border-yellow-300/30 bg-yellow-500/10 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-yellow-200">Pre-decision Risk Detector: {riskContext.level}</p>
              <p className="mt-1 text-xs text-white/80">{riskContext.suggestion}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => applyPrompt("Run a risk check before I fund this invoice. What should I verify first?")} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 hover:bg-white/10">
                Pre-funding checklist
              </button>
              <button onClick={() => applyPrompt("What are the top red flags in this decision based on current context?")} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 hover:bg-white/10">
                Detect red flags
              </button>
            </div>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "assistant" ? "mr-8 rounded-2xl bg-white/8 px-4 py-3 text-sm leading-6 text-white/80" : "ml-8 rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-black"}>
                {message.text}
              </div>
            ))}
            {loading ? <div className="mr-8 rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/60">Thinking through your question...</div> : null}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-[22px] border border-white/10 bg-black/30 p-2">
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void submitQuestion();
                  }
                }}
                rows={3}
                placeholder="Ask about wallets, funding, invoices, portfolio, or troubleshooting..."
                className="w-full resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/35"
              />
              <div className="flex items-center justify-between px-2 pb-1 pt-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/30">Context: {view}</span>
                <button onClick={() => void submitQuestion()} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black">
                  Send <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((current) => !current)}
        className="group relative flex h-[88px] w-[88px] items-center justify-center rounded-full transition hover:scale-[1.01]"
        aria-label="Open Fintrix AI assistant"
      >
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(69,123,199,0.24),transparent_52%)] blur-xl" />
        <span className="relative">
          <img src="/fintrix-ai-logo.png" alt="Fintrix AI" className="h-[78px] w-[78px] rounded-full border border-white/10 object-cover shadow-[0_12px_30px_rgba(0,0,0,0.35)]" />
        </span>
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[9px] font-black text-black">
          !
        </span>
      </button>
    </div>
  );
}
