# Local development and reproducibility

The historical Azure environment was decommissioned. You can inspect or run the application **locally without Azure**; the original screenshots are historical proof.

## API (Node.js)

```bash
cd backend
npm ci
npm test
npm start
```

`GET http://localhost:4001/health` and `GET http://localhost:4001/loadtest/ping` are available by default. The source includes controlled *simulation* endpoints (`/simulate/dispatch`, `/simulate/collapse`). Avoid using the collapse endpoint on a shared/production process: it intentionally terminates the API.

The `start` script preloads optional Azure Monitor OpenTelemetry. Without `APPLICATIONINSIGHTS_CONNECTION_STRING`, the API runs without exporting telemetry. **Do not put a connection string in Git or the browser config.**

## UI (Angular / TypeScript)

```bash
cd frontend
npm install
npm start
```

The provided source archive did not contain a frontend lockfile, so the UI currently uses `npm install` rather than `npm ci`. The corrected consolidated package pins Angular framework packages and compiler CLI to **20.3.35** following an npm peer-resolution conflict; some toolchain dependencies still use semver ranges. A new lockfile from a successful install would improve future reproducibility. The backend includes its original `package-lock.json`.

The browser API base URL is configured in `frontend/public/app-config.js`, defaulting to `http://localhost:4001`. This replaces the expired Azure IP previously embedded in the source. For an independent environment, update that file and rebuild the frontend, or serve a matching `app-config.js` alongside the static UI assets. Avoid an HTTPS frontend calling an HTTP API (mixed content), and configure CORS/TLS appropriately for a real deployment.

## Docker

Dockerfiles remain in `backend/` and `frontend/`. The backend uses `npm ci --omit=dev` and `npm start` (which runs the telemetry preload); the frontend uses the original Angular build and nginx static hosting approach. No container images were built or deployed as part of this consolidation.

## What isn't a runnable Azure recipe

`deployment/azure/historical/` preserves original, separately rooted Azure DevOps YAML and AKS manifests. Path references, old image tags, unavailable agent connections, old AKS namespaces, and deployment-time secrets need adaptation before any new cloud deployment. Nothing in this repository silently provisions or connects to Azure.

## Local functional verification — November 7, 2026

The consolidated project was run on Windows with Node.js **20.20.0** and Angular 20. After aligning Angular framework/compiler versions, frontend `npm install` succeeded and `ng serve` completed an application bundle. The Node.js service listened on `localhost:4001`; the dashboard at `localhost:4200` reported a healthy backend.

A **Regional flooding** simulation with 25 calls, sequential intake and degraded conditions completed with **16 completed / 4 failed / 5 timed out**. The UI returned to **Ready**, while structured backend logs showed dispatch correlation IDs, status transitions, and intentional **502** and **504** responses for selected simulated failure/timeout paths. This validates local execution and intentional failure handling, **not** cloud performance, Azure service availability, or a production SLA.

See [controls](../screenshots/13-local-scenario-configuration.png), [local structured logs](../screenshots/14-local-correlated-failure-timeout-logs.png) and [final dashboard](../screenshots/15-local-completed-25-call-run.png).

`npm install` reported dependency security advisories. These should be triaged with `npm audit` before treating the project as a production deployment; no forced major-version upgrades have been assumed here.
