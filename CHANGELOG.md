# 417 Freelancers - Site Update Log

Simple running log of site updates. Newest entries at the top.

## 2026-08-03

- **Contract generator: disclaimer, toggles, and branding** (`40854c9`) - Removed the legal disclaimer text from the generated PDF and moved it to the intake form instead, now with a required checkbox users must check before they can generate a contract. Added on/off toggles for the Start/Completion date, Payment section, and Late fee, so any of those can be left out of the document. Added logo upload (2MB limit, PNG/JPG) and a primary color picker that both apply to the generated PDF's branding, and both are remembered in the browser for next time.
- **Publish rate calculator + link new tools** (`77e8767`) - Published the rate calculator tool that had been sitting unpublished, added it and the contract generator to the footer nav and the Resources page, and added both to the sitemap. Also synced the dependency lockfile and local tooling config that had drifted out of the last commit.
- **Publish contract generator** (`8fcad14`) - Published the `/contract-generator` page, its form/PDF export component, and the `/api/contract-lead` route that emails a notification when someone generates a contract. This tool existed in the project files but had never been pushed to GitHub, so it wasn't live on the site.
- **Directory filter links fixed** (`5dea75b`) - The category filter buttons and the "view all freelancers" link on `/directory` used plain HTML links, causing full page reloads. Switched both to Next.js's `Link` component for faster, client-side navigation, matching the rest of the site.

## Process note

The recurring every-2-day site update task was also adjusted this session: its default behavior now leans toward small, rotating copy tweaks (a heading or paragraph reworded on a different page each run) as a Google freshness signal, rather than always doing a code change. Real bugs still take priority over a copy tweak when found.
