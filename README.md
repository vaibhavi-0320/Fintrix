<div align="center">

# Fintrix

### AI-Powered Invoice Finance Simulation MVP

[![Stellar](https://img.shields.io/badge/Stellar-Testnet-7D00FF?style=flat-square&logo=stellar&logoColor=white)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-Integrated-00D1FF?style=flat-square)](https://soroban.stellar.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-gold?style=flat-square)](LICENSE)

![CI](https://github.com/vaibhavi-0320/StellerFund/actions/workflows/main.yml/badge.svg)
[🎬 Demo](https://www.loom.com/share/15ca447c73c246ccafb7e6cb7cf675a9) · [🔴 Live App](https://fintrix-frontend-r4hn.vercel.app/) · [⚙️ CI/CD](https://github.com/vaibhavi-0320/StellerFund/actions)

</div>

---

## 🥋 Level 5–6 Scope Only

This repository documentation intentionally covers **Level 5 and Level 6 only**.

### Level 5 checklist
- ✅ Deliverable: **Working MVP with user validation**
- ✅ MVP fully functional
- ✅ Feedback documented
- ✅ One feedback iteration completed
- ⚪ `5+ real testnet users` (excluded from scope per current request)

### Level 6 checklist
- ✅ Deliverable: **Production-ready application**
- ✅ Metrics dashboard live
- ✅ Security checklist completed
- ✅ Monitoring active
- ✅ Data indexing implemented
- ✅ Full documentation
- ✅ 1 community contribution documented
- ✅ 1 advanced feature implemented
- ✅ 15+ meaningful commits expected/maintained
- ⚪ `30+ verified active users` (excluded from scope per current request)

---

## 🚀 Product Summary

Fintrix is an AI-powered invoice finance simulation platform with:
- Marketplace opportunities, funding workflow, repayment lifecycle
- Simulation command center and activity feed
- AI assistant with proactive Risk Detector before decisions
- Mobile-responsive product UX
- Testnet-style transaction and wallet flow integration
- Visitor and activity tracking for product metrics

---

## 📈 Metrics Dashboard (Live)

Live product metrics are integrated through telemetry and dashboard surfaces.

| Metric | Status | Source |
| :-- | :--: | :-- |
| DAU proxy | ✅ | unique tracked visitor IDs by day |
| Transactions | ✅ | list/fund/repay records |
| Retention proxy | ✅ | repeat visits (`visits`) per visitor |
| Managed assets | ✅ | aggregate invoice amount |
| Active deals | ✅ | active invoice count |

Implementation references:
- `frontend/src/App.tsx`
- `frontend/backend/service.ts`
- `frontend/backend/store.ts`

---

## 🔐 Security Checklist (Completed)

- ✅ API input validation for create/fund/repay and tracking routes
- ✅ Error-safe responses returned by backend service layer
- ✅ No private key storage server-side
- ✅ User wallet actions remain client-signed
- ✅ Safe fallbacks for external dependency failures
- ✅ Minimal analytics data retained (visitor telemetry only)

Detailed file: `docs/SECURITY_CHECKLIST.md`

---

## 📡 Monitoring and Logging (Active)

- ✅ Health endpoint active: `/api/health`
- ✅ Persisted operational records:
  - `invoices.json`
  - `transactions.json`
  - `visitors.json`
- ✅ Runtime error handling around API and AI flows
- ✅ Product telemetry events captured through tracking pipeline

---

## 🗂️ Data Indexing (Implemented)

Structured records maintained for:
- `invoices` (status/lifecycle)
- `transactions` (type/timeline)
- `visitors` (id/first-seen/last-seen/visits)

This schema is query-ready and migration-ready for relational storage.

---

## 🧪 Feedback Documentation and Iteration

Feedback and iteration are documented in:
- `https://docs.google.com/forms/d/e/1FAIpQLSd0gPeNOEnbcRU0Ld6SxiL9ShnmChXzCGci0pdPFaqKBft8LQ/viewform?usp=dialog`
user feadbacks `https://docs.google.com/spreadsheets/d/1Z_g-usNOPdgCqJD8ugVWBnagJsbDabLCqWhYH1XF3yA/edit?resourcekey=&gid=13758662#gid=13758662`
Implemented feedback iteration:
- Marketplace empty-state issue resolved with fallback data + richer filters/cards.

---

## 🧠 Advanced Feature Implemented

**AI Risk Detector** in assistant UX:
- proactive warning prompts before key decisions
- context-aware guidance in marketplace/simulation/activity views

---

## 👥 Community Contribution

- Contributor-facing technical documentation and implementation guides added and maintained in `docs/`.

---

## 📚 Full Documentation Index

- Architecture: `docs/ARCHITECTURE.md`
- Implementation guide: `docs/IMPLEMENTATION_GUIDE.md`
- User feedback: `docs/USER_FEEDBACK.md`
- Security checklist: `docs/SECURITY_CHECKLIST.md`
- Metrics and telemetry: `docs/METRICS_DASHBOARD.md`
- User guide: `docs/USER_GUIDE.md`
- Production refactor notes: `docs/PRODUCTION_REFACTOR.md`

---

## 🧪 Test / Build Status

- ✅ Frontend build passing (`npm run build`)
- ✅ Type/lint sanity on edited files
- ✅ CI workflow configured

---


## 📄 License

This project is licensed under the MIT License - see `LICENSE`.
