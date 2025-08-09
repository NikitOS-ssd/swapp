# SWApp — React + TypeScript + Vite + MUI + PWA + i18n + Docker + Firebase

Star Wars directory (list + search + details) with local editing, offline support (PWA), containerized build, and Firebase Hosting deployment without exposing your Firebase account to other developers.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Firebase Hosting](#-firebase-hosting)
- [Internationalization (i18n)](#-internationalization-i18n)
- [Progressive Web App (PWA)](#-progressive-web-app-pwa)
- [Docker Support](#-docker-support)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🛠 Tech Stack

- **React 18**, **TypeScript**, **Vite**
- **Material UI (MUI)**, **@tanstack/react-query**, **zustand**
- **i18next** (EN/RU) with language detector & localStorage
- **vite-plugin-pwa** (offline + installable)
- **Docker** (multi-stage, Nginx), **Firebase Hosting**

---

## ⚙️ Prerequisites

- Node.js **>= 18** (recommend 20+)
- Yarn (classic): `npm i -g yarn` (optional if you prefer npm)
- (Optional) Docker Desktop (for container run)
- Firebase CLI (global or via `npx`): `npm i -g firebase-tools`

---

## 🚀 Getting Started

### 1) Clone and install

```bash
git clone <REPO_URL> swapp
cd swapp
yarn
```

### 2) Run in development

```bash
yarn dev
# open http://localhost:5173
```

---

## 📁 Project Structure

```
src/
  api/               # SWAPI client + React Query hooks
  app/               # Providers (theme, router, query), theme builder
  components/        # Layout, toggles, reusable UI
  features/people/   # List & detail pages for characters
  hooks/             # Shared hooks (debounce, etc.)
  i18n/              # i18next init + locales (en.json, ru.json)
  store/             # zustand stores (theme, local edits)
  pwa.ts             # PWA service worker registration
```

---

## 📜 Available Scripts

### Development & Build
```bash
# Dev / Build / Preview
yarn dev
yarn build
yarn preview
```

### Docker (optional)
```bash
yarn docker:build
yarn docker:up
```

### Firebase (CLI helpers)
```bash
yarn firebase:login      # one-time login (local machine)
yarn firebase:token      # generate CI token if needed
yarn firebase:serve      # local Hosting preview at http://localhost:5000
```

### Build + (optional) Deploy to Firebase Hosting
```bash
yarn build:firebase
```

`yarn build:firebase` runs `scripts/build-firebase.sh` which:
- builds the app,
- generates `.firebaserc` from environment variables (not committed),
- deploys only if `FIREBASE_TOKEN` is provided.

---

## 🔐 Environment Variables

Create a local `.env` (never commit) based on `.env.example`:

```ini
FIREBASE_PROJECT_ID=your-firebase-project-id
# Optional: for non-interactive deploys (local or CI)
FIREBASE_TOKEN=your_firebase_ci_token
```

Get a token via: `yarn firebase:token`.

We do not commit `.firebaserc`. It's generated at build time from `FIREBASE_PROJECT_ID`, so you can easily swap projects/accounts without changing code.

---

## 🔥 Firebase Hosting: Build & Preview/Deploy

### Local build (and optional deploy if token present)
```bash
yarn build:firebase
```

If `FIREBASE_TOKEN` is set in your environment, this will deploy to your project.

If not, it will only build and generate `.firebaserc`.

### Local preview (no deploy)
```bash
yarn firebase:serve
# open http://localhost:5000
```

### One-time login (if you prefer manual CLI auth locally)
```bash
yarn firebase:login
```

---

## 🌐 Internationalization (i18n)

Locales: `src/i18n/locales/en.json`, `src/i18n/locales/ru.json`

Language is auto-detected (localStorage → querystring `?lng=` → navigator) and can be switched in the app bar.

---

## 📱 Progressive Web App (PWA)

`vite-plugin-pwa` with:
- precache of build assets
- runtime caching for SWAPI requests (NetworkFirst)
- service worker auto-update enabled

Icons in `public/` (`pwa-192x192.png`, `pwa-512x512.png`, `maskable-512x512.png`)

Check with:
```bash
yarn build && yarn preview
# then run Lighthouse (PWA) in Chrome DevTools
```

---

## 🐳 Docker (optional)

Build and run the production image with Nginx (SPA history fallback + proper caching):

```bash
yarn docker:build
yarn docker:up
# open http://localhost:8080
```

---

## 🔧 Troubleshooting

### `cross-env: command not found`
`yarn add -D cross-env` or remove it from scripts and set `NODE_ENV` in the shell script.

### `EACCES` when running `scripts/build-firebase.sh`
```bash
chmod +x scripts/build-firebase.sh
```
Optionally: `git update-index --chmod=+x scripts/build-firebase.sh`

### Type errors for `virtual:pwa-register`
Ensure `src/vite-env.d.ts` includes:
```typescript
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
```

If IDE still complains, add a shim:
```typescript
// src/shims-pwa.d.ts
declare module 'virtual:pwa-register' {
  export function registerSW(options?: {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
  }): (reloadPage?: boolean) => void
}
```

### Pagination doesn't change page
Never mutate `URLSearchParams` in-place. Create a new instance before `setParams`.

---

## 📄 License

MIT (or your preferred license)