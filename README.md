[![Task Manager CI](https://github.com/Jahnvi007/portfolio-D25IT122/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Jahnvi007/portfolio-D25IT122/actions/workflows/ci.yml)

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

  ## Practical 8 — Performance Optimization and Lazy Loading

  `Projects`, `Login`, `Tasks`, `Contact`, and `NotFound` are now loaded with `React.lazy()`,
  wrapped in a single `Suspense` around the `Routes` block (fallback: `Spinner`). `Home` stays
  a normal eager import.

  **Before:** one bundle, `index-CnAL7m90.js` — 252.93 kB
  **After:** main chunk `index-DXWa4D_L.js` — 240.36 kB, plus route chunks (Login, Contact,
  Projects, Tasks, NotFound) totaling ~14 kB, loaded on demand.

  Screenshots: `docs/practical8-before.png`, `docs/practical8-after.png`, `docs/practical8-fallback.png`
## Docker Setup

The application can be run using Docker and Docker Compose. The setup includes the React frontend, Node.js backend API, and MongoDB database.

### Prerequisites

- Docker Desktop installed and running.
- A JWT secret for backend authentication.

### Start the Application

From the project root directory, set the JWT secret in PowerShell:

```powershell
$env:JWT_SECRET = "your-private-jwt-secret"
```

Build the images and start all services:

```powershell
docker compose up --build -d
```

Check the status of the containers:

```powershell
docker compose ps
```

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

The frontend communicates with the backend API, while the backend connects to MongoDB through the Docker Compose network.

### Database Persistence

MongoDB uses a named Docker volume, `portfolio-data`, to retain database files when containers are restarted or recreated.

Stop the application:

```powershell
docker compose down
```

Start it again:

```powershell
docker compose up -d
```

The named volume is retained when using `docker compose down`, so database data remains available.

**Note:** Avoid `docker compose down -v` if you need to preserve the database, because this removes the Compose-managed volume.

### View Logs

View logs for all services:

```powershell
docker compose logs
```

View logs for an individual service:

```powershell
docker compose logs frontend
docker compose logs backend
docker compose logs mongodb
```
