# Metrics Dashboard

## Goal

Provide live product metrics for Level 6 readiness using currently available telemetry and transaction data.

## Tracked Metrics

- **DAU proxy:** unique visitor IDs active per day
- **Transactions:** list/fund/repay event volume
- **Retention proxy:** repeat visitor count (`visits > 1`)
- **Managed assets:** total invoice notional tracked in app state
- **Active deals:** active invoice count

## Data Sources

- `frontend/data/visitors.json`
- `frontend/data/transactions.json`
- `frontend/data/invoices.json`

## Collection Pipeline

1. Frontend creates or reuses local visitor ID.
2. Frontend POSTs to `/api/track-visitor`.
3. Backend upserts visitor record and increments visit count.
4. UI surfaces metrics via computed stats components.

## Endpoints

- `POST /api/track-visitor`
- `GET /api/transactions`
- `GET /api/invoices`
- `GET /api/health`

## Dashboard Surfaces

- Marketplace stats card
- Simulation command-center KPI cards
- Activity history panels
