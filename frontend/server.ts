import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import net from "net";
import path from "path";
import { createServer as createViteServer } from "vite";
import { askAssistant, createInvoice, fundInvoice, jsonError, listInvoices, listTransactions, listVisitors, parseInvoice, repayInvoice, trackVisitor } from "./backend/service";

dotenv.config();

const DEFAULT_PORT = 4517;

async function resolveAvailablePort(startPort: number): Promise<number> {
  const tryPort = (port: number) =>
    new Promise<number>((resolve, reject) => {
      const tester = net.createServer();

      tester.once("error", (error: NodeJS.ErrnoException) => {
        tester.close();
        if (error.code === "EADDRINUSE") {
          console.warn(`Port ${port} is busy. Retrying on ${port + 1}...`);
          resolve(tryPort(port + 1));
          return;
        }
        reject(error);
      });

      tester.once("listening", () => {
        tester.close(() => resolve(port));
      });

      tester.listen(port, "127.0.0.1");
    });

  return tryPort(startPort);
}

async function startServer() {
  const app = express();
  const preferredPort = Number(process.env.PORT || process.env.APP_PORT || DEFAULT_PORT);
  const resolvedPort = await resolveAvailablePort(preferredPort);
  const httpServer = http.createServer(app);

  app.use(cors());
  app.use(express.json({ limit: "10mb" }));

  app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "stellar99-api", port: resolvedPort }));
  app.get("/api/invoices", (_req, res) => res.json(listInvoices()));
  app.get("/api/transactions", (_req, res) => res.json(listTransactions()));
  app.get("/api/visitors", (_req, res) => res.json(listVisitors()));

  app.post("/api/invoices", (req, res) => {
    try {
      res.status(201).json(createInvoice(req.body));
    } catch (error) {
      res.status(400).json(jsonError(error));
    }
  });

  app.post("/api/invoice-action", (req, res) => {
    try {
      if (req.query.action === "fund") {
        res.json(fundInvoice(String(req.query.id || ""), req.body?.funder || "UNKNOWN"));
        return;
      }
      if (req.query.action === "repay") {
        res.json(repayInvoice(String(req.query.id || "")));
        return;
      }
      res.status(400).json({ error: "Unknown action." });
    } catch (error) {
      res.status(400).json(jsonError(error));
    }
  });

  app.post("/api/ai-parse", async (req, res) => {
    try {
      res.json(await parseInvoice(req.body?.fileBase64 || "", req.body?.mimeType || "application/octet-stream"));
    } catch (error) {
      res.status(500).json(jsonError(error));
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      res.json(await askAssistant({
        question: String(req.body?.question || ""),
        walletAddress: req.body?.walletAddress,
        view: req.body?.view,
      }));
    } catch (error) {
      res.status(500).json(jsonError(error));
    }
  });

  app.post("/api/track-visitor", (req, res) => {
    try {
      const visitor = trackVisitor({
        id: String(req.body?.id || ""),
        userAgent: String(req.body?.userAgent || req.headers["user-agent"] || ""),
        language: String(req.body?.language || req.headers["accept-language"] || ""),
        platform: String(req.body?.platform || ""),
      });
      res.status(201).json(visitor);
    } catch (error) {
      res.status(400).json(jsonError(error));
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      root: process.cwd(),
      server: {
        middlewareMode: { server: httpServer },
        hmr: { server: httpServer, port: resolvedPort, host: "127.0.0.1" },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  httpServer.listen(resolvedPort, "127.0.0.1", () => {
    console.log(`stellar99 dev server running on http://127.0.0.1:${resolvedPort}`);
  });
}

void startServer();


