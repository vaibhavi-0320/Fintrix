import { GoogleGenAI, Type } from "@google/genai";
import { getStore, persistStore } from "./store";
import { InvoiceRecord, TransactionRecord, VisitorRecord } from "./types";

function now() {
  return new Date().toISOString();
}

function asCurrency(value: number) {
  return `$${value.toLocaleString()}`;
}

function asXlm(value: number) {
  return `${Math.ceil(value / 25)} XLM`;
}

function buildInvoice(input: { amount: number; due: string; buyer: string; number?: string; discount: number; seller: string; notes?: string }) {
  const amount = Number(input.amount);
  const discount = Number(input.discount || 7);
  return {
    id: input.number || `INV-${Date.now()}`,
    buyer: input.buyer.trim(),
    amount,
    discount,
    due: input.due,
    status: "active" as const,
    seller: input.seller,
    yield: Number((discount + (amount >= 50000 ? 1.4 : 0.8)).toFixed(1)),
    funded: 0,
    tags: ["AI Screened", discount >= 10 ? "High Yield" : "Prime"],
    riskScore: Math.min(92, Math.max(18, Math.round(discount * 4 + (amount >= 50000 ? 12 : 4)))),
    aiSummary: input.notes?.trim() || "Invoice parsed and approved for simulated marketplace funding.",
  };
}

export function listInvoices() {
  return getStore().invoices;
}

export function listTransactions() {
  return getStore().transactions;
}

export function listVisitors() {
  return getStore().visitors;
}

export function trackVisitor(input: { id?: string; userAgent?: string; language?: string; platform?: string }) {
  const store = getStore();
  const normalizedId = String(input.id || "").trim() || `anon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const existing = store.visitors.find((visitor) => visitor.id === normalizedId);

  if (existing) {
    existing.lastSeenAt = now();
    existing.visits += 1;
    existing.userAgent = input.userAgent || existing.userAgent;
    existing.language = input.language || existing.language;
    existing.platform = input.platform || existing.platform;
    persistStore();
    return existing;
  }

  const created: VisitorRecord = {
    id: normalizedId,
    firstSeenAt: now(),
    lastSeenAt: now(),
    visits: 1,
    userAgent: input.userAgent,
    language: input.language,
    platform: input.platform,
  };
  store.visitors.unshift(created);
  persistStore();
  return created;
}

export function createInvoice(input: { amount: number; due: string; buyer: string; number?: string; discount: number; seller: string; notes?: string }) {
  if (!input.amount || !input.due || !input.buyer) {
    throw new Error("Amount, due date, and buyer are required.");
  }

  const store = getStore();
  const invoice = buildInvoice(input);
  store.invoices.unshift(invoice);
  store.transactions.unshift({
    type: "List",
    name: `Invoice ${invoice.id} - ${invoice.buyer}`,
    amount: asCurrency(invoice.amount),
    xlm: "-",
    status: "Success",
    time: now(),
  });
  persistStore();
  return invoice;
}

export function fundInvoice(id: string, funder: string) {
  const store = getStore();
  const invoice = store.invoices.find((item) => item.id === id);
  if (!invoice) throw new Error("Invoice not found.");
  if (invoice.status !== "active") throw new Error("Invoice is not available for funding.");

  invoice.status = "funded";
  invoice.funded = invoice.amount;
  invoice.funder = funder;
  store.transactions.unshift({
    type: "Fund",
    name: `Invoice ${invoice.id} - ${invoice.buyer}`,
    amount: asCurrency(invoice.amount),
    xlm: asXlm(invoice.amount),
    status: "Success",
    time: now(),
  });
  persistStore();
  return invoice;
}

export function repayInvoice(id: string) {
  const store = getStore();
  const invoice = store.invoices.find((item) => item.id === id);
  if (!invoice) throw new Error("Invoice not found.");
  if (invoice.status !== "funded") throw new Error("Invoice must be funded before repayment.");

  invoice.status = "repaid";
  store.transactions.unshift({
    type: "Repay",
    name: `Invoice ${invoice.id} - ${invoice.buyer}`,
    amount: asCurrency(invoice.amount + invoice.amount * (invoice.yield / 100)),
    xlm: asXlm(invoice.amount + invoice.amount * (invoice.yield / 100)),
    status: "Success",
    time: now(),
  });
  persistStore();
  return invoice;
}

function fallbackParse(fileBase64: string) {
  return {
    amount: 25000,
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10),
    buyerName: "Parsed Buyer",
    invoiceNumber: `INV-${Date.now()}`,
    summary: `Fallback parser used for payload length ${fileBase64.length}.`,
  };
}

export async function parseInvoice(fileBase64: string, mimeType: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return fallbackParse(fileBase64);
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [
          { inlineData: { data: fileBase64.split(",")[1] || fileBase64, mimeType } },
          { text: "Extract invoice amount, due date (YYYY-MM-DD), buyer name, invoice number, and a one-sentence financing summary. Return JSON only." },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          amount: { type: Type.NUMBER },
          dueDate: { type: Type.STRING },
          buyerName: { type: Type.STRING },
          invoiceNumber: { type: Type.STRING },
          summary: { type: Type.STRING },
        },
        required: ["amount", "dueDate", "buyerName", "invoiceNumber", "summary"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}

function buildAssistantFallback(question: string, walletAddress?: string, view?: string) {
  const store = getStore();
  const lower = question.toLowerCase();
  const funded = store.invoices.filter((invoice) => invoice.status === "funded").length;
  const active = store.invoices.filter((invoice) => invoice.status === "active").length;
  const repaid = store.invoices.filter((invoice) => invoice.status === "repaid").length;

  if (lower.includes("freighter") || lower.includes("wallet") || lower.includes("connect")) {
    return `To connect Freighter, unlock the extension, approve this site, and use the Connect Wallet button. For Albedo in this MVP, paste the public Stellar address. Current view: ${view || "app"}.`;
  }

  if (lower.includes("market") || lower.includes("invoice") || lower.includes("fund")) {
    return `The marketplace currently has ${active} active invoices, ${funded} funded invoices, and ${repaid} repaid invoices. To fund an invoice, connect a wallet first, open Marketplace, and click Fund Invoice on an active listing.`;
  }

  if (lower.includes("portfolio") || lower.includes("balance")) {
    return walletAddress
      ? `Your connected wallet is ${walletAddress}. The portfolio page shows the wallet address, fetched XLM balance, and any related invoices tied to that wallet session.`
      : "Connect a wallet first, then open Portfolio to see the wallet address, XLM balance, and invoice exposure tied to that session.";
  }

  if (lower.includes("repay") || lower.includes("activity") || lower.includes("history")) {
    return `The Activity page shows listing, funding, and repayment events from the backend store. If an invoice is funded, the repayment trigger appears there so you can complete the simulation loop.`;
  }

  if (lower.includes("create") || lower.includes("upload") || lower.includes("ai")) {
    return "Use Create Simulation to upload a PDF or PNG invoice, let AI prefill the draft when available, review the buyer, amount, and due date, then submit it to the live marketplace.";
  }

  return "I can help with wallet setup, marketplace funding, invoice creation, portfolio questions, activity history, and MVP troubleshooting. Ask me something specific and I will guide you step by step.";
}

export async function askAssistant(input: { question: string; walletAddress?: string; view?: string }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { answer: buildAssistantFallback(input.question, input.walletAddress, input.view) };
  }

  const store = getStore();
  const ai = new GoogleGenAI({ apiKey });
  const prompt = [
    "You are Fintrix AI, an assistant for a gamified invoice financing simulation built on Stellar.",
    "Answer clearly, practically, and briefly. If something is not yet fully implemented, say so honestly.",
    `Current view: ${input.view || "unknown"}`,
    `Connected wallet: ${input.walletAddress || "none"}`,
    `Invoices in store: ${store.invoices.length}`,
    `Transactions in store: ${store.transactions.length}`,
    `User question: ${input.question}`,
  ].join("\n");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ parts: [{ text: prompt }] }],
  });

  return { answer: response.text || buildAssistantFallback(input.question, input.walletAddress, input.view) };
}
export function jsonError(error: unknown) {
  return { error: error instanceof Error ? error.message : "Unexpected error." };
}

