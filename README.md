# Kite-clone (React + Vite)

This repository is a lightweight clone / prototype of a trading dashboard (inspired by platforms like Kite). It is built with React, Vite and Tailwind-like utility classes. The app demonstrates a header with responsive profile menu, a watchlist, basic cart/context usage and multiple pages (Dashboard, Orders, Holdings, Positions, Bids, Funds, Profile, etc.).

This README documents the functionality, project structure, development and usage instructions so you can run, extend and test the app locally.

## Table of contents

- Overview
- Features
- Project structure
- Pages & components (what each does)
- Local setup (install / dev / build)
- Development notes and troubleshooting
- Tests & manual checks
- Contributing
- License

## Overview

Kite-clone is intended as a front-end demo of a trading dashboard. It includes:

- A fixed top header with market tickers, navigation, cart and profile menu.
- A responsive profile menu that shows different options on mobile vs desktop.
- A watchlist with items that can be added to a local cart (Buy / Sell quick actions).
- Example pages (Dashboard, Orders, Holdings, Positions, Bids, Funds, Profile) to demonstrate routing.
- Basic in-memory/local storage cart context to demonstrate adding/removing items.

This project focuses on UI and local state handling; it does not include a production trading backend. There's a `server/` folder in the workspace for experimental server work (if present), but the front-end runs independently.

## Features (user-facing)

- Navigation bar (TopHeader)
  - Market tickers (display-only)
  - Center navigation for primary pages
  - Cart icon with item count
  - Notification icon
  - Profile avatar that opens a profile menu
  - Responsive behavior: desktop shows a dropdown menu, mobile opens a full-screen menu with mobile-specific items
- Watchlist
  - List of symbols from `src/Data/mockData.js`
  - Quick Buy / Sell buttons that add items to cart with type and quantity
- Pages
  - Dashboard: Main overview page
  - Orders, Holdings, Positions, Bids, Funds, Profile: simple page shells for routing demonstration
- Cart / Context
  - A small `CartContext` provides add/remove and count utilities

## Project structure (important files)

Top-level (inside `kite-clone/`):

- `package.json` — scripts and dependencies (Vite, React, lucide-react, tailwindcss)
- `vite.config.js`, `eslint.config.js` — project tooling configs
- `public/` — static assets
- `src/` — application source code

Key `src/` files and folders:

- `src/main.jsx` — entry point, ReactDOM render & router setup
- `src/App.jsx` — app routes and layout
- `src/components/TopHeader.jsx` — header with profile menu (responsive)
- `src/components/WatchlistItem.jsx` — each watchlist row with quick actions
- `src/components/WatchlistSidebar.jsx` — watchlist sidebar (if used)
- `src/Data/mockData.js` — sample watchlist data
- `src/context/CartContext.jsx` — cart context used by watchlist and header
- `src/pages/*` — individual page components (Dashboard, Orders, Holdings, Positions, Bids, Funds, Profile, etc.)

If you add new components, put them under `src/components` and wire them into the routes in `src/App.jsx`.

## How to run (local development)

Prerequisites

- Node.js (recommended v18+). You can check your version with `node -v`.
- npm (bundled with Node) or pnpm/yarn if you prefer.

Install dependencies

```bash
cd kite-clone
npm install
```

Start the dev server (Vite)

```bash
npm run dev
```

Open the app in your browser at the URL Vite prints (usually `http://localhost:5173`).

Build for production

```bash
npm run build
npm run preview   # to preview the production build locally
```

Linting

```bash
npm run lint
```

## How to use the app (quick guide)

- Header
  - Click the logo to go to Dashboard.
  - Use the center nav to switch pages (Dashboard, Orders, Holdings, Positions, Bids, Funds).
  - Click the cart icon to open the cart page (if implemented) — the cart count shows number of items.
  - Click the profile avatar to open the profile menu. On mobile it opens a full-screen menu with mobile-specific items (Holdings, Positions, Orders, Notification preferences, Investment profile, Account). On desktop it shows Console, Support, Keyboard Shortcuts and Settings.

- Watchlist
  - Browse the sample stocks from `src/Data/mockData.js`.
  - Hover a watchlist row to reveal quick action buttons: Buy (B) and Sell (S) add an item to the cart via `CartContext`.

- Cart (example flows)
  - Add items from the watchlist.
  - Cart count updates in the header.
  - Cart data is managed by `CartContext` and may persist to localStorage (if enabled in the context implementation).

## Development notes and common troubleshooting

- JSX / Vite errors
  - If you encounter compile errors from Vite (for example an unclosed JSX fragment), the terminal error message includes a file/line number. Open that file and fix the JSX structure (matching opening/closing tags or add the missing `</>` for fragments).

- Profile menu responsive behavior
  - The profile menu checks the window width at render time in several places. If you open the menu and then resize the window, menu layout may not automatically re-evaluate until a re-render (clicking again or a route change). Consider replacing the `window.innerWidth` checks with a React hook (useEffect + useState listening to resize) if you need live responsiveness.

- If `npm run dev` fails with errors about dependencies, try removing `node_modules` and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

- On Windows inside Git Bash, paths are POSIX-like (e.g. `/c/Users/...`). In PowerShell use normal Windows paths. Use `cd ..` to go up one directory.

## Tests & manual checks

This project doesn't include automated test suites by default. Suggested manual checks:

- Add / remove items from the watchlist using Buy/Sell and verify the header cart counter updates.
- Open the profile menu on desktop and mobile widths and verify the correct item set appears.
- Navigate all pages from the center nav and confirm routing works without errors.

Planned/To-do tests (recommended):

- Unit tests for `CartContext` (add/remove/persist).
- Snapshot or rendering tests for `TopHeader` profile menu variations.

## Contributing

If you'd like to contribute:

1. Fork the repo and create a branch for your feature or fix.
2. Run the project locally and verify your change.
3. Open a PR with a clear description of the change.

Small, safe improvements you can start with:

- Replace direct `window.innerWidth` checks with a responsive hook.
- Add automated tests for cart functionality.
- Improve keyboard accessibility for the profile menu and watchlist quick-actions.

## License

This repository is provided as-is for learning and prototyping. Add a license file if you plan to publish or share it widely.

---

If you want, I can also:

- Add a small Development section that shows how to debug the Vite console errors.
- Replace runtime `window.innerWidth` checks with a responsive React hook and update the `TopHeader` component accordingly.
- Add a small `README` section documenting how the `CartContext` API looks (methods and data shape) by reading the file.

Tell me which of those (if any) you'd like me to do next.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
