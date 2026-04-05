# SmartCV

## Current State
- Resume builder uses a split layout: left form panel + right live preview panel, both wrapped in `overflow-hidden` at the outer container. The right preview panel has a `ScrollArea` but the outer `div` has `overflow-hidden` which may prevent scrolling the preview pane independently.
- Job listings page (`Jobs.tsx`) imports from `mockJobs` in `data/jobs.ts` — 12 hardcoded fake jobs.
- Color scheme: warm professional with cream/off-white background, dark brown sidebar, amber/gold accents, deep slate primary (`--primary: 0.28 0.04 252`).
- Hero section (`Landing.tsx`) CTA banner uses a dark brown gradient background with white text.
- Hero headline reads: "Build Your Dream Career with SmartCV"

## Requested Changes (Diff)

### Add
- CV Builder: scrollable live preview on the right side — the preview panel must be independently scrollable so users can scroll up and down through the full resume preview while the form panel stays in place.
- Jobs page: fetch real job listings from a public jobs API (e.g. Remotive.io public API at `https://remotive.com/api/remote-jobs?limit=20`) to display real remote jobs. Show job title, company, location, job type, and a link to apply. Include proper loading and error states.
- Hero CTA Banner: update to "Build your dream CV with SmartCV" in white text on a solid dark blue background.

### Modify
- `index.css`: Change primary color token from current deep slate (`0.28 0.04 252`) to a more vibrant dark blue — use `0.35 0.18 255` (OKLCH dark blue). Update all references throughout.
- `ResumeWizard.tsx`: Ensure the right panel (live preview) has proper `overflow-y-auto` on its scroll container so users can scroll the preview vertically. The `ScrollArea` is present but the parent container may be blocking scroll.
- `Jobs.tsx` + `data/jobs.ts`: Replace mock data with a `useEffect` fetch from `https://remotive.com/api/remote-jobs?limit=20` (public, no auth needed, CORS-friendly). Map API response fields to the existing `JobCard` interface format. Show loading spinner and error message when needed.
- `Landing.tsx` CTA Banner: Change from dark brown gradient to solid dark blue background. Update headline text to "Build your dream CV with SmartCV".

### Remove
- `data/jobs.ts`: Remove all 12 `mockJobs` entries (or replace with empty array fallback). The live data will come from the API.

## Implementation Plan
1. Update `index.css` — change `--primary` token to dark blue OKLCH value. Update sidebar and badge colors accordingly.
2. Fix `ResumeWizard.tsx` — ensure right panel preview container is independently scrollable (check outer container overflow and ScrollArea setup).
3. Update `Jobs.tsx` — replace mock data with fetch from Remotive public API. Add loading/error states. Map API fields to `JobCard` props.
4. Update `data/jobs.ts` — keep the `Job` interface but replace `mockJobs` with empty array or remove it.
5. Update `Landing.tsx` CTA Banner — change background to solid dark blue, update headline to "Build your dream CV with SmartCV", white text.
