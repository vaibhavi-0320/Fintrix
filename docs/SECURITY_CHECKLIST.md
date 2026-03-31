# Security Checklist

## Status

All currently scoped MVP security controls are implemented for Level 5–6 readiness.

## Application Security

- [x] Input validation on mutable API routes
- [x] Controlled error responses (`jsonError`) to avoid raw stack leakage
- [x] API payload handling with bounded JSON body size
- [x] Wallet operations remain user-controlled and client-signed
- [x] No private key storage in backend persistence

## Data and Privacy

- [x] Minimal telemetry persistence (visitor id + coarse client metadata)
- [x] No sensitive secrets persisted in JSON store files
- [x] Store writes constrained to known data files (`invoices`, `transactions`, `visitors`)

## Reliability and Abuse Resistance

- [x] Health endpoint available for uptime checks
- [x] Fallback paths for external dependency failures
- [x] Backend catches and reports operation failures safely
- [x] Frontend error boundary present for runtime UI resilience

## Operational Follow-ups (Production)

- [ ] Add authentication and authorization controls
- [ ] Add rate-limiting and abuse throttling
- [ ] Add audit trails with structured logging sink
- [ ] Add persistent database encryption policies
