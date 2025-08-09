#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! command -v npx >/dev/null 2>&1; then
  echo "npx not found. Install Node.js >= 18"; exit 1
fi

if [ -f "$ROOT_DIR/.env" ]; then
  source "$ROOT_DIR/.env"
fi

PROJECT_ID="${FIREBASE_PROJECT_ID:-}"
TOKEN="${FIREBASE_TOKEN:-}"

echo "==> Building app with Vite"
cd "$ROOT_DIR"
yarn build

if [ -z "${PROJECT_ID}" ]; then
  echo "WARNING: FIREBASE_PROJECT_ID is not set."
  echo "You can still preview locally with: npx firebase-tools hosting:serve"
else
  cat > "$ROOT_DIR/.firebaserc" <<EOF
{
  "projects": {
    "default": "${PROJECT_ID}"
  }
}
EOF
  echo "Generated .firebaserc for project: ${PROJECT_ID}"
fi

if [ -n "${TOKEN}" ] && [ -n "${PROJECT_ID}" ]; then
  echo "==> Deploying to Firebase Hosting (project: ${PROJECT_ID})"
  npx firebase-tools deploy --only hosting --project "${PROJECT_ID}" --token "${TOKEN}"
  echo "✅ Deploy complete."
else
  echo "No FIREBASE_TOKEN or FIREBASE_PROJECT_ID provided. Skipping deploy."
  echo "You can run a local preview with:"
  echo "  npx firebase-tools hosting:serve"
  echo "Or deploy with:"
  echo "  FIREBASE_PROJECT_ID=xxx FIREBASE_TOKEN=yyy ./scripts/build-firebase.sh"
fi
