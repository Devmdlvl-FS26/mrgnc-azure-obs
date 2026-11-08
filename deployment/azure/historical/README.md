# Historical Azure application deployment artifacts

These are **unchanged archived Azure DevOps deployment YAML files and Kubernetes manifests** from the original Angular and Node.js repositories.

- [`backend/azure-pipelines.yml`](backend/azure-pipelines.yml): Dev deployment via `kubectl apply` and `kubectl rollout status`.
- [`frontend/azure-pipelines.yml`](frontend/azure-pipelines.yml): same, for the supervisor UI.
- [`backend/k8s`](backend/k8s) and [`frontend/k8s`](frontend/k8s): Dev, QA and Prod image tags, namespace-scoped Deployment and Service definitions.

**Important:** These are *not* monorepo-ready CI/CD pipelines. They contain original `k8s/dev/...` relative paths, reference an unavailable self-hosted agent, retired image/cluster resources and historical networking configurations. The checked-in Dev backend manifest doesn't fully document the later Kubernetes Secret wiring used during Application Insights troubleshooting; that historical runtime step is described in the observability narrative, not falsely presented as directly reproducible here.

This project intentionally excludes the Terraform provisioning code, Terraform state files, provider executables, remote state instructions, and the old infrastructure-heavy repository. The valuable application-delivery steps remain visible and technically inspectable. For automation-versus-manual boundaries, see [Azure release narrative](../../../docs/azure-delivery-and-release-validation.md).
