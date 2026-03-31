# Implementation Guide

## Repository Layout

- `frontend/`
  React UI, Express dev server, Vercel API routes, demo persistence, AI assistant, wallet flows, and deployment config
- `contracts/lumensflow-stream/`
  Soroban Rust smart contract with create, fund, repay, listing, and test coverage
- `docs/`
  implementation, architecture, deployment, production, and user feedback documentation
- `.github/workflows/`
  CI for frontend checks and contract tests

## MVP Feature Development

The current MVP is built around a simple but complete financing simulation loop:

1. user connects a wallet
2. exporter uploads an invoice
3. AI parser extracts structured invoice fields
4. invoice is listed in the marketplace
5. investor funds the invoice through the simulated XLM-backed flow
6. repayment completes the lifecycle
7. portfolio and activity views show the outcome

## User Acquisition And Onboarding

The onboarding design is intentionally lightweight:

- landing page communicates the product clearly and drives users to connect a wallet or start a simulation
- non-landing pages expose marketplace, portfolio, activity, and simulation views immediately
- Fintrix AI assistant helps users recover from confusion without leaving the app
- wallet UX prioritizes Freighter first, with Albedo support for broader Stellar onboarding

## Collecting And Implementing Feedback

Feedback is captured through:

- UI and navigation refinements driven by user review sessions
- wallet connection error handling and troubleshooting improvements
- documentation in `docs/USER_FEEDBACK.md`
- iteration tracking in `docs/USER_FEEDBACK_CHANGELOG.md`

## Contract Flow

1. `create_invoice`
2. `fund_invoice`
3. `repay_invoice`
4. `get_invoice`
5. `list_invoice_ids`

## Local Commands

```bash
cd frontend && npm install && npm run dev
cd frontend && npm run lint
cd frontend && npm run build
cd contracts/lumensflow-stream && cargo test
```
