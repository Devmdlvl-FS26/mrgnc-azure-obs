# Emergency Surge supervisor UI — Angular / TypeScript

A compact **supervisor-facing** emergency intake simulation, built to provide a real frontend for the [Azure application delivery & observability case study](../README.md).

The dashboard models incoming, active and completed/failed/timed-out calls, backend connectivity, and a critical offline state. This is a **public simulation**, not connected to a real hospital system.

Run with `npm install && npm start`. Angular framework packages and `@angular/compiler-cli` are pinned to **20.3.35** to prevent npm peer-dependency conflicts between Angular 20.1.x and 20.3.x. After the first successful install, keep the generated `package-lock.json` in version control and use `npm ci` for repeatable installations. By default it calls `http://localhost:4001`; set `window.EMERGENCY_SURGE_API_BASE_URL` via [`public/app-config.js`](public/app-config.js) to use a different API. No old Azure IP is embedded.

The most interesting frontend implementation is in [`src/app/emergency-store.service.ts`](src/app/emergency-store.service.ts), [`src/app/emergency-api.service.ts`](src/app/emergency-api.service.ts) and [`src/app/app.component.ts`](src/app/app.component.ts). For the broader engineering decisions, see [docs](../docs/application-and-engineering-decisions.md).
