# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Practical 3 — API Integration and Data Rendering

The Projects page now includes a **GitHub Repositories** section built for Practical 3
(API Integration and Data Rendering in React).

**API used:** [GitHub REST API](https://docs.github.com/en/rest) — the public `GET /users/{username}/repos`
endpoint, which requires no authentication/API key.

**Setup:**
1. Open `src/components/Projects.jsx`.
2. Replace the `GITHUB_USERNAME` constant near the top of the file with your own GitHub username.
3. Run `npm run dev` and open the Projects page to see your repositories load.

**What was implemented:**
- `useEffect` fetches the repo list on mount (and again whenever Retry is clicked).
- Three states are tracked: `repos`, `loading`, and `error`.
- A `Spinner` component displays while the request is in progress.
- An `ErrorMessage` component (with a **Retry** button) displays if the request fails —
  try it by temporarily changing `GITHUB_USERNAME` to an invalid value.
- Each repository card shows its name, star count, description, and links out to its GitHub URL.
- A search input filters the rendered repository list by name.
