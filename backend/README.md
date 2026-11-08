# Emergency Surge API — Node.js / Express

Intentionally small simulation API used as the **runtime target** for historical Azure deployment, load testing, and App Insights observability.

`npm ci && npm test && npm start` (no Azure account required). Endpoints: `GET /health`, `GET /loadtest/ping`, `POST /simulate/dispatch`, `POST /simulate/collapse`, `DELETE /simulate/collapse`. The collapse endpoint deliberately ends the process to simulate outage; do not expose it in a real service without access control.

Review [`src/instrumentation.js`](src/instrumentation.js), [`src/middleware`](src/middleware), [`src/routes/index.js`](src/routes/index.js) and [`Dockerfile`](Dockerfile). `npm start` preloads instrumentation **before** Express; this startup order was an actual AKS troubleshooting point.

The backend is not presented as evidence of a Node.js specialization or a production-grade emergency dispatch system. See the [project README](../README.md) and [observability details](../docs/performance-and-observability.md).
