#!/usr/bin/env bash

set -Eeuo pipefail

APP_ROOT="/DATA/forsecur/forsecure_app"
NODE_ENV_ROOT="/DATA/forsecur/nodevenv/forsecure_app/22"
VENV_MODULES="$NODE_ENV_ROOT/lib/node_modules"

restore_generated_files() {
  git checkout -- next-env.d.ts 2>/dev/null || true
}

trap restore_generated_files EXIT

cd "$APP_ROOT"
export PATH="$NODE_ENV_ROOT/bin:$PATH"
export NODE_ENV="production"

echo "[Forsecure] Preparing CloudLinux Node.js environment"
mkdir -p "$VENV_MODULES"

if [[ ! -L node_modules ]] || [[ "$(readlink node_modules)" != "$VENV_MODULES" ]]; then
  rm -rf node_modules
  ln -s "$VENV_MODULES" node_modules
fi

echo "[Forsecure] Installing dependencies"
npm install --include=dev --no-audit --no-fund

echo "[Forsecure] Building production application"
rm -rf .next
npm run build
restore_generated_files

echo "[Forsecure] Restarting Passenger application"
mkdir -p tmp
touch tmp/restart.txt

echo "[Forsecure] Deployment complete"
