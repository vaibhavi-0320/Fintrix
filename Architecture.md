# Architecture

The main architecture document is available at:

- `docs/ARCHITECTURE.md`

## Quick Overview

Fintrix uses a layered MVP architecture:

1. **Frontend (React + Vite)** for dashboard, marketplace, simulation, activity, and AI assistant UX.
2. **API Layer (Express + Vercel routes)** for invoices, transactions, assistant, parsing, health, and visitor tracking.
3. **Service Layer** for invoice lifecycle, telemetry tracking, and business logic.
4. **Persistence Layer** using structured JSON stores (`invoices`, `transactions`, `visitors`).
5. **Stellar/Soroban Integration** for testnet-oriented finance simulation workflows.

For the complete technical breakdown, data flow, and production hardening path, open `docs/ARCHITECTURE.md`.
