# Azure application delivery, CI/CD, and release validation

This is the **application delivery** portion of the case study. It is intentionally not an infrastructure-provisioning tutorial.

## What the historical implementation did

1. Source was maintained in GitHub, integrated with Azure DevOps.
2. Docker images for the Node.js backend and Angular frontend were **built/pushed to Azure Container Registry manually** during the historical exercise.
3. Application-specific Azure DevOps YAML ran from a **self-hosted agent** on the `develop` branch. Each pipeline checked the Kubernetes context, applied its Dev Deployment and Service manifests, waited for `kubectl rollout status`, and listed the namespace's resources.
4. AKS namespaces represented **Dev, QA and Prod**. Environment image tags and promotion work included **manual operations**, evidenced by historical screenshots. This was not a fully automated promotion or approval chain.
5. A controlled Prod image/version and communication failure scenario was exercised; screenshots capture a broken frontend/backend path followed by a working state.

### What was automated vs. manual

| Step | Historical status |
|---|---|
| Deploy existing backend image into AKS Dev | **Azure DevOps pipeline** using `kubectl apply` and `kubectl rollout status` |
| Deploy existing frontend image into AKS Dev | **Azure DevOps pipeline** using `kubectl apply` and `kubectl rollout status` |
| Docker image build and ACR push | **Manual** steps in the recorded exercise |
| QA / Prod image tagging and promotion | **Manual** steps in the recorded exercise |
| Prod rollback and connectivity recovery | **Controlled manual drill**, not automated rollback |
| Infrastructure provisioning | Performed historically but **excluded** from this case-study repo |
| Automated unit/integration/security gates | **Not established** by historical deployment YAML |

The pipeline files are not modified and intentionally live beneath [`deployment/azure/historical/`](../deployment/azure/historical/README.md), not in the repository root. They reference the original separate-repository `k8s/dev/...` relative paths and a self-hosted agent associated with a retired environment. **They will not run directly from this monorepo, and should not be interpreted as a reusable production pipeline.**

## Practical proof, not just configuration

- [Azure-hosted frontend](../screenshots/03-azure-hosted-frontend.png)
- [Backend Dev pipeline succeeded](../screenshots/04-azure-devops-backend-pipeline.png)
- [Frontend Dev pipeline succeeded](../screenshots/05-azure-devops-frontend-pipeline.png)
- [Controlled production communication failure](../screenshots/06-prod-recovery-failure.png)
- [Connectivity restored](../screenshots/07-prod-recovery-success.png)

The release exercise shows a software engineer participating in **deployment execution, application integration validation, and recovery assessment**. It does not claim ownership of a production operations team or any hands-off auto-remediation system.

## The observation that matters

The running application could be healthy from an HTTP perspective while its monitoring setup was incomplete. One issue was the old Docker startup command directly invoking `node src/server.js`: it bypassed the Node `--import ./src/instrumentation.js` preload configured in `npm start`. Changing the container startup to `npm start`, and correcting runtime configuration of the telemetry connection string, allowed Azure Monitor instrumentation to initialize on AKS.

This is **application-level delivery diagnosis**: knowing how runtime startup, container packaging, and telemetry code interact. See [observability and performance](performance-and-observability.md).

## Reproduction boundaries

Re-running against a new AKS cluster would require a new self-hosted agent/service connection, actual ACR images/tags, namespaces, network configuration, appropriate secrets, updated YAML paths, and a separately chosen image build/publish workflow. **These have not been created or validated here**, and deploying AKS would incur charges. The historical records are deliberately preserved without implying they're active.
