#!/usr/bin/env bash
set -e

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Running frontend checks..."
npm run lint
npm run build

echo "Running Soroban contract tests..."
cd ../contracts/lumensflow-stream
cargo test

echo "Deployment preparation complete."
