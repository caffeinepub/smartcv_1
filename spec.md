# SmartCV

## Current State
- Resume builder wizard has scroll up/down buttons on the preview (right) panel only
- The editor (left) panel uses ScrollArea with navigation buttons fixed at bottom — but when many entries are added (e.g. 3 education entries), the form grows tall and the Previous/Next/Save buttons at the bottom of the page scroll off screen; the buttons are outside the ScrollArea so they stay at panel bottom, but the panel itself may overflow
- Landing page hero section has a plain `bg-background` with text; the CTA banner at bottom has a dark blue gradient but the main hero does not
- Jobs page fetches from Remotive API with `limit=20` — only returns remote tech jobs, no Pakistan jobs, no location-based search, and user can't search by keyword against the live API (only client-side filter on 20 results)
- JobFilters location dropdown has hardcoded US cities only

## Requested Changes (Diff)

### Add
- Hero section on Landing: bold deep blue / vibrant blue gradient background with white text for the main headline and subtext; eye-catching 3D-like color effect (gradient, glow)
- Jobs page: use JSearch (via RapidAPI) or Remotive API with higher limit + user-typed keyword sent to API so results are truly dynamic; add Pakistan as a location filter; show job count dynamically; when user searches "data entry" it should return data entry jobs from Pakistan and worldwide

### Modify
- ResumeWizard left panel: the `<ScrollArea>` wrapping the step content should NOT include the navigation buttons — they must stay sticky/fixed at the bottom of the panel. Currently the buttons are already outside ScrollArea but the panel height might not be constrained. Ensure the left panel is `h-full flex flex-col` with the ScrollArea taking `flex-1 overflow` and the nav buttons pinned at the very bottom always visible.
- Landing hero section: wrap the entire hero `<section>` in a deep vibrant blue gradient background; make headline, subtext, badge all white/light colored so they're clearly readable
- Jobs page search: send the search term to the API rather than only filtering client-side; increase job limit substantially; add Pakistan to location options; update description text to reflect worldwide results

### Remove
- Hardcoded US-only location options in JobFilters

## Implementation Plan
1. Fix ResumeWizard: ensure left panel is `flex flex-col h-full`, ScrollArea is `flex-1 min-h-0`, and the nav div at bottom has `shrink-0` so it never scrolls away
2. Update Landing hero section with a deep vibrant blue gradient background and white text
3. Update Jobs page to search Remotive API by keyword (using their search endpoint), increase limit to 50+, add Pakistan/worldwide location filter options, show results count dynamically
4. Update JobFilters to accept free-text location input or add more global locations including Pakistan
