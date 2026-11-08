# Performance testing and backend observability

**Two distinct datasets, two different questions.** This page connects the original images to the implementation without overstating the results.

## A. Azure Load Testing — measured P90

The historical Azure Load Testing run targeted `GET /loadtest/ping` on the AKS-hosted Node.js API.

| Captured statistic | Value |
|---|---:|
| Total HTTP requests | **79,334** |
| Duration shown | **2 min, 5 sec** |
| Reported throughput | **708.34 requests/sec** |
| P90 response time | **9.00 ms** |
| Request error percentage | **0%** |

**Source:** [original Azure Load Testing result](../screenshots/08-azure-loadtest-p90.png); [additional charts/statistics](../screenshots/09-azure-loadtest-stats.png).

The separate endpoint was a conscious engineering choice: unlike `/simulate/dispatch`, it avoids staged simulation delays, queue/outcome logic, and frontend-browser timing. This helps evaluate the reachable backend path under a defined lightweight workload. It **does not** measure the normal dispatch workflow, realistic hospital load, or any production service-level objective.

The `0%` figure describes **request errors in this historical test run only**; it cannot establish that the product was universally error-free.

## B. Application Insights — measured P50 / P95

The backend initialized Azure Monitor's OpenTelemetry integration **before** Express startup via `npm start`:

```json
"start": "node --import ./src/instrumentation.js src/server.js"
```

`src/instrumentation.js` reads `APPLICATIONINSIGHTS_CONNECTION_STRING` from the server environment. Without a connection string, local execution continues and logging is still available. The original AKS setup used a Kubernetes Secret for injection into the running backend; no secret value is stored in this repository.

The instrumentation investigation identified a container startup problem: an earlier Dockerfile used direct `node src/server.js`, bypassing the preload. The corrected Dockerfile runs **`npm start`**, allowing telemetry setup to execute. [Startup evidence](../screenshots/10-telemetry-startup-fix.png) · [AKS request/role proof](../screenshots/11-aks-telemetry-role.png).

The **separate** KQL screenshot captured this *much smaller* request sample:

| Request name | Count | P50 duration | P95 duration | Failures |
|---|---:|---:|---:|---:|
| `GET /loadtest/ping` | **21** | **1.319 ms** | **1.9605 ms** | **0** |
| `GET /health` | **1** | 6.503 ms | 6.503 ms | 0 |

**Source:** [original Application Insights/KQL screenshot](../screenshots/12-appinsights-p50-p95.png). These are **not percentiles across the 79,334 load-test requests**. Do not combine them to claim a larger traffic sample.

## KQL exploration example

The query below is an **illustrative equivalent** for a workspace-based Application Insights `AppRequests` table, not a verbatim replay and not rerun against a currently live subscription. Table/field names may differ depending on the Azure Logs experience.

```kusto
AppRequests
| where TimeGenerated > ago(30m)
| where AppRoleInstance startswith "emergency-surge-backend"
| summarize requestCount=count(),
            avgDurationMs=avg(DurationMs),
            p50DurationMs=percentile(DurationMs, 50),
            p95DurationMs=percentile(DurationMs, 95),
            failures=countif(Success == false)
            by Name
| order by requestCount desc
```

The historical query showed request duration percentiles and role-instance provenance from the AKS-hosted backend. Structured JSON application logs also carried request method, path, status, response time and correlation ID (`backend/src/middleware`). These are **distinct from** Application Insights automatically collected request telemetry.

## What the exercise demonstrates

- Separate operational UI state from technical diagnostics.
- Instrument before traffic is handled; preserve preload order inside Docker.
- Validate deployed health and actual AKS request traces, not only successful pipeline status.
- Understand what a percentile represents, which endpoint was exercised, and how many observations support the measurement.
- Turn a telemetry gap into a reproducible diagnosis and verified correction.

Azure resources from the original exercise are no longer active. The original screenshots are preserved unaltered for historical review.
