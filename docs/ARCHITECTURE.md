# Fintrix Architecture

## System Overview

Fintrix is a full-stack MVP that simulates invoice financing workflows with AI assistance, wallet-first UX, and telemetry.

```text
Client (React + Vite)
  ├─ Landing / Dashboard / Marketplace / Simulation / Activity
  ├─ Fintrix AI Assistant + Risk Detector
  └─ Metrics surfaces (managed assets, active deals, telemetry-derived KPIs)
        |
        v
API Layer (Express dev server + Vercel API routes)
  ├─ /api/invoices
  ├─ /api/invoice-action
  ├─ /api/transactions
  ├─ /api/chat
  ├─ /api/ai-parse
  ├─ /api/track-visitor
  └─ /api/health
        |
        v
Service Layer (business logic)
  ├─ invoice lifecycle operations
  ├─ transaction recording
  ├─ assistant responses
  └─ visitor tracking
        |
        v
Persistence Layer (MVP)
  ├─ invoices.json
  ├─ transactions.json
  └─ visitors.json
        |
        v
Blockchain Integration
  ├─ Stellar testnet connectivity
  └─ Soroban contract path in /contracts
```

## Major Components

### Frontend (`frontend/src`)
- Main product shell and responsive navigation
- Marketplace filtering and funding interactions
- Simulation command center and execution history
- AI assistant panel with proactive risk prompts
- Wallet onboarding and portfolio/activity pages

### API and Service Layer (`frontend/server.ts`, `frontend/backend`)
- Request routing and validation
- Invoice create/fund/repay/list operations
- AI parse and assistant orchestration
- Visitor telemetry capture and storage
- Health checks and operational endpoints

### Persistence (`frontend/data`)
- `invoices.json`: source of truth for invoice simulation objects
- `transactions.json`: event stream for financial lifecycle operations
- `visitors.json`: product telemetry for DAU/retention proxies

## Data Model Summary

- **Invoice:** id, buyer, amount, due, status, risk, yield, funder
- **Transaction:** type, amount, status, time
- **Visitor:** id, firstSeenAt, lastSeenAt, visits, device metadata

## Runtime Flow

1. User opens app; visitor ID is created/reused and tracked.
2. UI loads invoices, transactions, and network summary.
3. User creates or funds simulation opportunities.
4. Backend updates store and app reflects new state.
5. AI assistant provides contextual support and risk nudges.

## Security and Reliability Notes

- Input validation across mutation endpoints
- Error boundaries and safe server responses
- Wallet signature remains user-side
- Graceful fallbacks when external providers fail

## Production Hardening Path

- Migrate JSON persistence to relational DB
- Add auth and role-based access controls
- Add structured logging and alerting sinks
- Introduce caching and query indexes at data layer
- Split frontend bundles and optimize critical rendering
