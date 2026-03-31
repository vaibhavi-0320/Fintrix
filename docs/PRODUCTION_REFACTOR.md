# Production Refactor

## Current demo-safe pieces

- UI/UX shell and marketplace flow
- AI parsing endpoint with fallback behavior
- Soroban contract structure and tests
- Freighter connection and bridge-ready Albedo / Phyto onboarding

## Needed before production

- replace JSON/in-memory persistence with PostgreSQL
- add real wallet signing flows for Albedo and Phyto
- replace escrow preview logic with real Soroban contract invocation
- add auth, rate limiting, and audit logging
- add environment separation for local, preview, and production networks
- reduce frontend bundle size with route/component splitting
