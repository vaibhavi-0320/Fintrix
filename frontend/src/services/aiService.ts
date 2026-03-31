import { InvoiceParseResult } from "../types";

function fallbackParse(fileBase64: string): InvoiceParseResult {
  const payload = fileBase64.split(",")[1] || "";
  let decoded = "";

  try {
    decoded = atob(payload.slice(0, 512));
  } catch {
    decoded = "";
  }

  const text = decoded.replace(/[^\w\s:/.-]/g, " ");
  const amountMatch = text.match(/(\d[\d,]+(?:\.\d{1,2})?)/);
  const dateMatch = text.match(/(20\d{2}-\d{2}-\d{2})/);
  const invoiceMatch = text.match(/(INV[-\s]?\d[\w-]*)/i);

  return {
    amount: amountMatch ? Number(amountMatch[1].replace(/,/g, "")) : 25000,
    dueDate: dateMatch?.[1] || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10),
    buyerName: "Parsed Buyer",
    invoiceNumber: invoiceMatch?.[1] || `INV-${Date.now()}`,
    summary: "Fallback parser used because the AI endpoint is unavailable.",
  };
}

export async function parseInvoiceWithAI(fileBase64: string, mimeType: string) {
  try {
    const response = await fetch("/api/ai-parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileBase64, mimeType }),
    });

    if (!response.ok) {
      throw new Error("AI parse failed");
    }

    return (await response.json()) as InvoiceParseResult;
  } catch (error) {
    console.warn("Using fallback invoice parser", error);
    return fallbackParse(fileBase64);
  }
}

export async function askFintrixAssistant(input: {
  question: string;
  view: string;
  walletAddress?: string | null;
}) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Assistant unavailable right now.");
  }

  return (await response.json()) as { answer: string };
}
