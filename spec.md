# SmartCV

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- **Authentication**: Signup/Login with email and password, password reset, principal-based identity via Caffeine authorization component
- **Resume Builder**: Multi-step form (Personal Info, Education, Experience, Skills, Projects, Certifications, Summary), drag-and-drop section reordering, real-time preview panel
- **Cover Letter Builder**: Rich text editor, pre-designed templates, AI-assisted writing suggestions (simulated on free tier, indicated as premium for advanced)
- **Templates**: 40 templates total (15 Free, 15 Paid, 10 Premium) with unique names, preview thumbnails, ATS-friendly designs — all rendered in-app as styled HTML/CSS layouts
- **PDF Export**: Client-side PDF generation using html2canvas + jsPDF; supports template selection before export
- **AI Features**: Grammar/phrasing improvement suggestions (simulated), missing section detection, section strength scores; advanced features gated behind premium
- **Job Listings**: Search/filter by role, location, skills; bookmark/save jobs; promoted listing badges
- **Dark/Light mode toggle**: Persisted in localStorage
- **Landing Page**: Hero, features overview, testimonials/reviews, pricing tiers, CTA sections
- **About Us Page**: Team/mission/values content
- **Contact Page**: Form with name, email, message fields
- **Privacy Policy Page**: Complete policy text
- **Terms of Service Page**: Professional TOS text
- **Monetization UI**: Freemium badges, upgrade prompts for paid/premium templates, subscription plan display
- **Reviews/Testimonials Section**: Star ratings, user feedback cards, realistic content

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- User profiles: store resume data, cover letter data, saved jobs, bookmarks, plan tier (free/paid/premium)
- Resume CRUD: create, read, update, delete resumes with full section data
- Cover letter CRUD: create, read, update, delete cover letters
- Job listings: store job data with search/filter support, bookmark toggle
- Template access control: return accessible templates based on user plan
- Contact form submissions: store messages

### Frontend (React + TypeScript)
- App shell with routing: Landing, Dashboard, Resume Builder, Cover Letter Builder, Templates, Jobs, About, Contact, Privacy, Terms
- Authentication flow using Caffeine authorization component
- Resume builder wizard with step navigation and live preview
- Cover letter editor with template selector
- Template gallery with tier badges and lock icons for paid/premium
- PDF export using jsPDF + html2canvas
- Job listings page with search, filters, bookmark actions
- Dark/light theme toggle with Tailwind CSS
- Pricing/upgrade prompts integrated throughout
- Responsive layout for mobile/desktop
- Smooth animations with Tailwind transitions
