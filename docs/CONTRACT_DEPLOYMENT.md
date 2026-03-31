# Contract Deployment

## Local test

```bash
cd contracts/lumensflow-stream
cargo test
```

## Build

```bash
cd contracts/lumensflow-stream
cargo build --target wasm32-unknown-unknown --release
```

## Notes

- Contract source is organized into `lib.rs`, `contract.rs`, `storage.rs`, `types.rs`, and `errors.rs`.
- This Soroban contract currently covers the simulation lifecycle: create, fund, and repay invoice flows.
- For production deployment, set the final network, keys, and contract ID values before wiring frontend invocation.
