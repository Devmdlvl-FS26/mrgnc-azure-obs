# Curated screenshot evidence

**15 unaltered screenshots: 12 historical Azure/application captures plus 3 new local-validation captures.** The evidence is deliberately limited; the original image bytes are retained without generated overlays, edited metrics, or cropping. [`evidence-manifest.json`](evidence-manifest.json) records each image SHA-256 and its source filename.

## Historical project and Azure evidence — original archive

| File | What it proves |
|---|---|
| [01 — Running dashboard](01-application-running.png) | Supervisor-facing Emergency Surge application, historical local run |
| [02 — Offline dashboard](02-application-offline.png) | Application-visible backend failure state |
| [03 — Hosted in Azure](03-azure-hosted-frontend.png) | Frontend historically reachable in Azure |
| [04 — Backend deployment pipeline](04-azure-devops-backend-pipeline.png) | Azure DevOps backend Dev deployment succeeded |
| [05 — Frontend deployment pipeline](05-azure-devops-frontend-pipeline.png) | Azure DevOps frontend Dev deployment succeeded |
| [06 — Recovery drill failure](06-prod-recovery-failure.png) | Frontend/backend communication failure in a controlled drill |
| [07 — Recovery drill result](07-prod-recovery-success.png) | Frontend/backend communication restored |
| [08 — Azure P90 summary](08-azure-loadtest-p90.png) | 79,334 requests, P90 9 ms, 0% errors, throughput for a lightweight endpoint |
| [09 — Load-test statistics](09-azure-loadtest-stats.png) | Additional Azure load-test statistics |
| [10 — Telemetry startup](10-telemetry-startup-fix.png) | Instrumentation initialization after startup correction |
| [11 — AKS telemetry origin](11-aks-telemetry-role.png) | Application Insights evidence associated with an AKS role instance |
| [12 — KQL P50/P95](12-appinsights-p50-p95.png) | Separate small telemetry sample (21 `/loadtest/ping` requests), not the load-test aggregate |

## New local verification — November 7, 2026

These screenshots were taken with the consolidated Angular UI at `localhost:4200` and Node.js API at `localhost:4001`. **They do not establish a new Azure deployment, CI/CD run, cloud load test or Application Insights measurement.** They show the supplied application can run locally and drive the scenario end to end.

| File | Why it was selected |
|---|---|
| [13 — Scenario configuration](13-local-scenario-configuration.png) | UI exposes 25-call workload and deliberate degraded response, timeout and interruption toggles |
| [14 — Correlated dispatch logs](14-local-correlated-failure-timeout-logs.png) | Real local structured log output linking simulated failures/timeouts to dispatch requests and HTTP 502/504 responses |
| [15 — Completed 25-call run](15-local-completed-25-call-run.png) | Run finished with **16 completed + 4 failed + 5 timed out = 25** and dashboard returned to **Ready** |

The uploaded local set also contained intermediate running-dashboard states and a second overlapping log view. Those were not included because they add little beyond these three selected captures.

[`linkedin_images/`](../linkedin_images/README.md) retains exactly **four** originally selected images, unchanged and in publishing order. Those emphasize the application, Azure deployment, P90 load test, and P50/P95 observability—not the local retest.
