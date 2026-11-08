# Application context and engineering decisions

## Why Node.js, and what was really being evaluated?

One healthcare-related client requested a **Node.js MVP** deployable/testable/observable through Azure-native tooling. The purpose was to **evaluate Node.js and Azure as possible backend/platform choices** for future work, not promote Node.js as a personal specialization.

An existing triage system already handled normal incidents; the MVP demonstrated a supervisor-facing module for large-scale emergency intake. The dashboard and API formed a **real application target** for a broader application-delivery and observability exercise.

## Working software, scoped deliberately

- **Angular / TypeScript / Signals:** active, waiting and finalized call presentation, derived business counters, scenario controls, connectivity checks, and critical offline mode.
- **Node.js / Express:** simulation dispatch, explicit failed/timed-out outcomes, collapse/recovery scenario, HTTP `/health`, lightweight `/loadtest/ping`.
- **Request logging:** generated or propagated correlation ID, JSON logs recording route/status/response time, domain outcome transitions.
- **Optional telemetry:** OpenTelemetry/Azure Monitor bootstrap on application startup; not required for local execution.

## Decisions that matter to a reviewer

1. **Supervisor UX ≠ developer dashboard.** Operational state (incoming call pressure, failures, timeouts, backend availability) belongs in the UI; percentiles, technical error details, and trace analysis belong in logs/Application Insights.
2. **A compact simulation before distribution.** A queue-oriented model communicates the emergency lifecycle without pretending to have live hospital operators, message brokers, persistent storage, or an enterprise integration fabric.
3. **Dedicated measurement target.** `/loadtest/ping` isolates a predictable backend request from the simulator's artificial durations. The result describes that endpoint, not the full application.
4. **Runtime reality counts.** A deployment succeeded yet emitted no AKS telemetry until the startup path and configuration were corrected.
5. **Clear failure states.** Offline UI, restored frontend/backend connectivity, and explicitly modeled failed/timed-out calls are part of the story, not last-minute exception screens.

## What this is not

This isn't a real emergency dispatch platform, production-grade hospital system, distributed architecture, or a demonstration of .NET implementation. It is **cross-stack software delivery evidence**: implementing enough functional software to verify Azure CI/CD deployment, release checks, performance measurement, and runtime observability. The later production stack was outside this MVP's scope.
