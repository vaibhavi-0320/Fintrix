<div align="center">

<br/>

# ◈ FINTRIX

### Safe DeFi Simulation Layer for Invoice Finance on Stellar

*Fintrix brings institutional invoice financing on-chain — simulation-first, production-ready, AI-powered.*
*Businesses tokenize invoices. Funders earn yield. The AI Risk Detector protects every decision.*
*No bank. No broker. No black box.*

<br/>

[![Stellar](https://img.shields.io/badge/Stellar-Testnet-1a1a2e?style=flat-square&logo=stellar&logoColor=4fc3f7&labelColor=0d0d1a)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-Integrated-0d0d1a?style=flat-square&labelColor=1a1a2e&color=4fc3f7)](https://soroban.stellar.org)
[![React](https://img.shields.io/badge/React-19-0d0d1a?style=flat-square&logo=react&logoColor=4fc3f7&labelColor=1a1a2e)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-0d0d1a?style=flat-square&logo=typescript&logoColor=90caf9&labelColor=1a1a2e)](https://typescriptlang.org)
[![Node](https://img.shields.io/badge/Node.js-Backend-0d0d1a?style=flat-square&logo=node.js&logoColor=4fc3f7&labelColor=1a1a2e)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-0d0d1a?style=flat-square&labelColor=1a1a2e&color=90caf9)](LICENSE)

<br/>

![CI](https://github.com/vaibhavi-0320/StellerFund/actions/workflows/main.yml/badge.svg)

[🎬 **Watch Demo**](https://www.loom.com/share/15ca447c73c246ccafb7e6cb7cf675a9) &nbsp;&nbsp;|&nbsp;&nbsp;
[🔴 **Live App**](https://fintrix-frontend-r4hn.vercel.app/) &nbsp;&nbsp;|&nbsp;&nbsp;
[⚙️ **CI/CD Pipeline**](https://github.com/vaibhavi-0320/StellerFund/actions) &nbsp;&nbsp;|&nbsp;&nbsp;
[📋 **User Feedback**](https://docs.google.com/spreadsheets/d/1Z_g-usNOPdgCqJD8ugVWBnagJsbDabLCqWhYH1XF3yA/edit#gid=13758662)

<br/>

</div>

---

<div align="center">

## What makes Fintrix different?

</div>

> Invoice financing is a $3 trillion global market — and almost entirely locked inside banks, credit brokers, and opaque intermediaries. Businesses wait 30–90 days to get paid. Funders have no transparent way to evaluate risk.
>
> Fintrix puts the entire lifecycle on-chain with a **Soroban-powered simulation layer** and an **AI Risk Detector** that reads the market before you commit a single XLM. The rules are transparent. The risk analysis is instant. The yield is real.

```
Business lists invoice  →  AI scores risk  →  Funder commits XLM  →  Repayment closes position
                                             →  Risk too high?    →  AI warns before you fund
```


---

## 🚀 Product Summary

Fintrix is a **safe DeFi simulation layer for invoice finance** built on Stellar. It bridges real-world trade finance with on-chain transparency — letting businesses, funders, and developers experience the full invoice financing lifecycle without real capital at risk.

The platform is designed as a **production-grade MVP** with live telemetry, AI-assisted risk analysis, and a Soroban-compatible transaction flow — ready to graduate from testnet to mainnet.

**Core surfaces:**
- **Marketplace** — browse and filter live invoice funding opportunities
- **Funding Workflow** — commit XLM to invoices with AI risk pre-screening
- **Repayment Lifecycle** — track active positions from funding to settlement
- **Simulation Command Center** — run funding scenarios in a safe testnet environment
- **Activity Feed** — real-time log of all platform transactions
- **AI Assistant** — context-aware guidance and proactive Risk Detector

---

## 📸 App Screenshots

### Marketplace — Browse Invoice Opportunities

> *Filter by sector, yield, and risk tier. Every card shows AI-computed risk score before you commit.*

---

### AI Risk Detector — Pre-Decision Analysis

> *The assistant surfaces warnings before high-risk funding decisions — proactive, not reactive.*

---

### Funding Workflow — Commit XLM to an Invoice

> *Select amount, review risk summary, sign with Freighter. Full animated loading overlay tracks confirmation.*

---

### Simulation Command Center

> *Run funding simulations in a sandboxed environment. Test strategies without real capital.*

---

### Metrics Dashboard — Live Product Telemetry

> *DAU proxy, managed asset volume, active deals, and transaction count — all wired to live data.*

---

## ✨ Features at a Glance

| Feature | What it does |
| :------ | :----------- |
| 🧾 Invoice Marketplace | Browse real-time funding opportunities filtered by risk, yield, and sector |
| 🤖 AI Risk Detector | Proactive warning layer that analyses invoices before every funding decision |
| 💰 Funding Workflow | Commit XLM to invoices with Freighter signing and on-chain confirmation |
| 🔁 Repayment Lifecycle | Track active positions from funding through settlement |
| 🧪 Simulation Center | Run invoice funding scenarios safely on Stellar Testnet |
| 📊 Metrics Dashboard | Live DAU proxy, transaction volume, managed assets, active deals |
| 📡 Activity Feed | Real-time log of all platform events |
| 👛 Freighter Wallet | Connect, view XLM balance, sign transactions — all in the browser |
| 📱 Mobile Responsive | Fluid layout, hamburger nav, clamp() typography — every screen size |
| 🔁 CI/CD | GitHub Actions validates frontend and contracts on every push to `main` |
| 🔐 Security Layer | Input validation, safe fallbacks, no server-side key storage |
| 📈 Visitor Telemetry | Persistent visitor tracking for retention and DAU metrics |

---

## 📈 Metrics Dashboard

Live product metrics are surfaced through an integrated telemetry pipeline.

| Metric | Status | Data Source |
| :-- | :--: | :-- |
| DAU proxy | ✅ Live | Unique tracked visitor IDs per day |
| Transaction volume | ✅ Live | List / fund / repay records |
| Retention proxy | ✅ Live | Repeat visits per visitor ID |
| Managed assets | ✅ Live | Aggregate invoice amount in XLM |
| Active deals | ✅ Live | Active invoice count by status |

**Implementation references:**
- `frontend/src/App.tsx`
- `frontend/backend/service.ts`
- `frontend/backend/store.ts`

---

## 🧠 Advanced Feature — AI Risk Detector

The AI Risk Detector is a proactive decision-support layer embedded in the Fintrix assistant UX.

**How it works:**
- Before a funder commits XLM, the Risk Detector analyses the invoice's sector, tenor, counterparty profile, and yield spread
- If risk thresholds are exceeded, the assistant surfaces a structured warning — not just a generic alert
- Context-aware guidance adapts per surface: marketplace browsing, simulation runs, and activity review each get tailored signals
- The assistant also answers open questions about DeFi, invoice finance mechanics, and Stellar/Soroban

This is not a chatbot bolted on. It's **integrated into the decision flow** — making Fintrix meaningfully safer for non-expert funders.

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────┐
│                  User's Browser                  │
│                                                  │
│   React 19  ·  TypeScript 5.x  ·  Tailwind CSS  │
│   Vite  ·  Framer Motion                         │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│              Freighter Extension                 │
│                                                  │
│   Builds transactions  ·  Signs locally          │
│   Private key never leaves the device            │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│             Node.js Backend Service              │
│                                                  │
│   REST API  ·  Invoices / Transactions           │
│   Visitor telemetry  ·  AI assistant proxy       │
│   invoices.json  ·  transactions.json            │
│   visitors.json  ·  /api/health                  │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│          @stellar/stellar-sdk  v14               │
│                                                  │
│   Constructs XDR  ·  Simulates  ·  Submits       │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│          Soroban RPC  ·  Stellar Testnet          │
│   soroban-testnet.stellar.org                    │
└──────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```text
fintrix/
│
├── .github/
│   └── workflows/
│       └── main.yml                GitHub Actions — parallel frontend + contract jobs
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── IMPLEMENTATION_GUIDE.md
│   ├── USER_FEEDBACK.md
│   ├── SECURITY_CHECKLIST.md
│   ├── METRICS_DASHBOARD.md
│   ├── USER_GUIDE.md
│   └── PRODUCTION_REFACTOR.md
│
├── frontend/
│   ├── src/
│   │   ├── components/             Reusable UI — cards, badges, overlays, toasts
│   │   ├── hooks/                  useWallet, useToast, useRiskDetector
│   │   ├── lib/
│   │   │   └── stellar.ts          All blockchain logic — SDK v14 + Freighter v6
│   │   ├── pages/
│   │   │   ├── Marketplace.tsx     Invoice opportunity browser
│   │   │   ├── Fund.tsx            Funding workflow with AI pre-check
│   │   │   ├── Repayment.tsx       Active position tracker
│   │   │   ├── Simulation.tsx      Command center for testnet scenarios
│   │   │   ├── Activity.tsx        Real-time event feed
│   │   │   └── App.tsx             Root — metrics dashboard, routing
│   │   └── types/
│   │       └── index.ts            Shared TypeScript interfaces
│   │
│   └── backend/
│       ├── service.ts              Invoice, transaction, visitor API layer
│       ├── store.ts                JSON persistence — invoices, transactions, visitors
│       └── ai.ts                   AI Risk Detector + assistant proxy
│
├── package.json
├── vite.config.ts
├── tsconfig.json                   Strict mode enabled
└── vercel.json                     SPA rewrite rules
```

---

## 🔐 Security Checklist

| Control | Status | Notes |
| :-- | :--: | :-- |
| API input validation | ✅ | All create / fund / repay and tracking routes validated |
| Error-safe responses | ✅ | Service layer returns safe fallbacks, no stack traces exposed |
| No server-side key storage | ✅ | Private keys never leave the user's Freighter extension |
| Client-signed wallet actions | ✅ | All transactions signed locally in-browser |
| External dependency fallbacks | ✅ | Safe degradation when Stellar RPC or AI service is unavailable |
| Minimal analytics retention | ✅ | Only visitor ID, first-seen, last-seen, and visit count persisted |

Full details: `docs/SECURITY_CHECKLIST.md`

---

## 📡 Monitoring and Logging

| Signal | Status | Location |
| :-- | :--: | :-- |
| Health endpoint | ✅ Active | `GET /api/health` |
| Invoice records | ✅ Persisted | `invoices.json` |
| Transaction records | ✅ Persisted | `transactions.json` |
| Visitor telemetry | ✅ Persisted | `visitors.json` |
| Runtime error handling | ✅ Active | API and AI flows wrapped in structured error boundaries |
| Telemetry pipeline | ✅ Active | Tracking events captured and aggregated for metrics surface |

---

## 🗂️ Data Indexing

Fintrix maintains structured records across three primary entities. The schema is query-ready and designed for seamless migration to a relational store.

| Entity | Fields | Notes |
| :-- | :-- | :-- |
| `invoices` | id, issuer, amount, tenor, sector, status, yield, riskScore | Full lifecycle tracking |
| `transactions` | id, type, invoiceId, funderAddress, amount, timestamp | Fund / repay / cancel |
| `visitors` | id, firstSeen, lastSeen, visits | DAU and retention proxy |

---

## 🧪 Feedback and Iteration

**Feedback collection:**
- Form: [User Feedback Form](https://docs.google.com/forms/d/e/1FAIpQLSd0gPeNOEnbcRU0Ld6SxiL9ShnmChXzCGci0pdPFaqKBft8LQ/viewform?usp=dialog)

- Analysis: `docs/USER_FEEDBACK.md`

**Iteration completed:**
> Testers reported the marketplace appeared empty on first load, reducing perceived product value. The fix introduced fallback invoice data, richer filter controls, and redesigned opportunity cards with visible risk scores and yield previews. Retention on the marketplace surface improved post-iteration.

---

## 🔁 CI/CD Pipeline

```text
Push or pull request to main
    │
    ├── job: frontend
    │     ├── setup Node.js
    │     ├── install dependencies
    │     ├── lint + type check
    │     ├── production build
    │     └── upload frontend artifact
    │
    └── job: deploy
          ├── waits for all checks to pass
          ├── runs on main branch only
          └── deploys to Vercel when secrets are available
```

Workflow: [`.github/workflows/main.yml`](.github/workflows/main.yml)

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Install |
| :--- | :--- | :------ |
| Node.js | ≥ 20 | [nodejs.org](https://nodejs.org) |
| Freighter extension | Latest | [freighter.app](https://freighter.app) |
| Stellar CLI | Latest | `cargo install --locked stellar-cli --features opt` |

### Run locally

```bash
# Clone
git clone https://github.com/vaibhavi-0320/StellerFund
cd StellerFund

# Install
npm install

# Configure
cp .env.example .env.local
# → Set VITE_STELLAR_CONTRACT_ID and AI key in .env.local

# Start
npm run dev
# → http://localhost:3000
```

### Get free testnet XLM

Go to [Stellar Friendbot](https://laboratory.stellar.org/#account-creator?network=test), paste your `G...` wallet address, click **Create Account** — 10,000 XLM arrives instantly.

---

## 🚢 Deployment

### Frontend

```bash
npm run build
vercel --prod
# Add environment variables in the Vercel dashboard
```

The app is live at: [fintrix-frontend-r4hn.vercel.app](https://fintrix-frontend-r4hn.vercel.app/)

---

## 📝 Commit History

```text
feat: project scaffold — React 19, TypeScript, Tailwind CSS, Vite
feat: invoice marketplace — cards, filters, sector/yield/risk views
feat: funding workflow — XLM commit flow with Freighter signing
feat: repayment lifecycle — position tracking from fund to settlement
feat: simulation center — testnet scenario runner and command UI
feat: AI Risk Detector — proactive warnings before funding decisions
feat: activity feed — real-time platform event log
feat: metrics dashboard — DAU proxy, transactions, managed assets
feat: visitor telemetry — tracking pipeline and retention proxy
feat: mobile responsive — hamburger nav, clamp() typography, CSS grid
feat: backend service layer — invoice, transaction, visitor API
feat: GitHub Actions CI/CD — frontend build and deploy on every push
fix: marketplace empty-state — fallback data, richer filters post-feedback
fix: AI assistant context — surface-aware guidance per page
feat: security hardening — input validation, safe fallbacks, error boundaries
feat: full documentation — architecture, security, metrics, user guide
```

---

## 👥 Community Contribution

Technical documentation and implementation guides are maintained in `docs/` and are open to contribution. The guides cover:
- Architecture decisions and data flow
- Soroban integration patterns for invoice workflows
- AI assistant integration with DeFi decision surfaces
- Security practices for browser-signed transaction apps

Contributors are welcome to open issues, submit PRs, or extend the feedback forms.

---

## 📚 Documentation Index

| Document | Description |
| :-- | :-- |
| `docs/ARCHITECTURE.md` | System design, data flow, component map |
| `docs/IMPLEMENTATION_GUIDE.md` | Step-by-step technical implementation reference |
| `docs/USER_FEEDBACK.md` | Collected feedback and iteration log |
| `docs/SECURITY_CHECKLIST.md` | Security controls and validation coverage |
| `docs/METRICS_DASHBOARD.md` | Telemetry schema and dashboard implementation |
| `docs/USER_GUIDE.md` | End-user walkthrough of all platform surfaces |
| `docs/PRODUCTION_REFACTOR.md` | Notes on the MVP-to-production refactor pass |

---

## 🔗 Links

| | Link |
|:-|:-----|
| 🔴 Live App | [fintrix-frontend-r4hn.vercel.app](https://fintrix-frontend-r4hn.vercel.app/) |
| 🎬 Demo Video | [loom.com/share/15ca447c...](https://www.loom.com/share/15ca447c73c246ccafb7e6cb7cf675a9) |
| 📋 Feedback Form | [Google Forms](https://docs.google.com/forms/d/e/1FAIpQLSd0gPeNOEnbcRU0Ld6SxiL9ShnmChXzCGci0pdPFaqKBft8LQ/viewform?usp=dialog) |
| 📊 Feedback Responses | [Google Sheets](https://docs.google.com/spreadsheets/d/1Z_g-usNOPdgCqJD8ugVWBnagJsbDabLCqWhYH1XF3yA/edit#gid=13758662) |
| ⚙️ CI/CD Pipeline | [GitHub Actions](https://github.com/vaibhavi-0320/StellerFund/actions) |
| 💧 Free XLM | [Stellar Friendbot](https://laboratory.stellar.org/#account-creator?network=test) |
| 👛 Freighter Wallet | [freighter.app](https://freighter.app) |
| 📚 Soroban Docs | [soroban.stellar.org](https://soroban.stellar.org/docs) |
| 📚 Stellar Docs | [developers.stellar.org](https://developers.stellar.org) |

---

<div align="center">

<br/>

*Built for the Stellar Journey to Mastery program — Level 5 + Level 6*

[![Stellar](https://img.shields.io/badge/Built_on-Stellar-0d0d1a?style=for-the-badge&logo=stellar&logoColor=4fc3f7&labelColor=1a1a2e)](https://stellar.org)

**[⬆ Back to Top](#-fintrix)**

<br/>

</div>
