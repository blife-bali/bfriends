# BFriends Technical Audit Report

**Project:** `bfriends` (Next.js 16 / React 19)  
**Audit date:** May 15, 2026  
**Auditor role:** Senior Frontend Engineer & Technical Auditor  
**Scope:** Read-only analysis — no code was modified during this audit.

---

## Executive Summary

BFriends is a **marketing site + custom MySQL-backed CMS** for a wellness brand (Kerobokan, Bali). The stack is modern (Next.js App Router, React 19, Tailwind CSS v4, CSS Modules, iron-session admin auth, Cloudflare R2 uploads). The **production build succeeds** (`npm run build` — 65 routes compiled).

The project is **visually and structurally mature** for a pre-launch brand site: rich home/about/program/community/membership flows, cohesive design tokens, and a broad admin surface. It is **not yet production-hardened**: almost all public routes are `force-dynamic`, CMS typing is loose, there are no automated tests or CI, admin UI auth is mostly client-gated, and several UX/performance optimizations remain open.

| Area | Rating (1–5) | Notes |
|------|--------------|-------|
| Architecture & code quality | **3.5** | Clear App Router layout; CMS layer needs typing and query optimization |
| Performance & UX | **3.0** | Strong visual craft; caching, media, and client boundaries need work |
| Security & reliability | **2.5** | API auth exists; gaps in middleware, defaults, observability |
| Production readiness | **2.5** | Build passes; missing tests, docs, error UX, caching strategy |

**Estimated overall progress:** **~72%** toward a shippable MVP; **~55%** toward a hardened production deployment.

---

## 1. Overall Architecture & Quality

### 1.1 Stack & Project Shape

| Layer | Technology |
|-------|------------|
| Framework | Next.js **16.2.4** (Turbopack in dev/build) |
| UI | React **19.2.0**, CSS Modules (**56** files), Tailwind v4 (`@import "tailwindcss"`) |
| Data | **mysql2** connection pool (`lib/db.ts`), query helpers in `lib/cms.ts` |
| Auth (admin) | **iron-session** + bcrypt (`lib/session.ts`, `lib/auth.ts`) |
| Media | **AWS SDK S3** → Cloudflare R2 (`app/api/admin/upload/route.ts`) |
| Animation | **framer-motion**, **gsap**, **animejs**, **embla-carousel-react** (overlapping concerns) |

**Folder structure (high level):**

```
app/           # Routes: marketing pages, admin, API
components/    # Shared UI (Navbar, PageHeader, VideoBlock, admin kit)
lib/           # CMS, DB, auth, legacy *-data.ts seeds/types
contexts/      # SoundContext (global ambience)
public/        # Fonts (woff2), images, videos, audio
```

This is a **sensible App Router layout**: page-specific UI often lives under `app/<route>/`, shared primitives under `components/`. Admin is isolated under `app/admin/` with its own root layout and styles.

### 1.2 Strengths

1. **Design system foundation** — `app/styles/brand-tokens.css` and `app/globals.css` define palette scales (blue/cream/beige/green), typography roles (The Seasons via Typekit, Libre Bodoni, Sweet Sans Pro local woff2), and layout tokens (`--section-max-width`, padding, radius). Tailwind `@theme inline` exposes these for utility use.

2. **CMS-driven marketing content** — Home, about, programs, events, news, membership, FAQ, and page headers/SEO are loaded from MySQL via `lib/cms.ts`, with sensible helpers like `resolvePageHeader()` and `getPageSeo()`.

3. **Strict TypeScript compiler** — `strict: true` in `tsconfig.json`; production build runs `tsc` successfully.

4. **Admin API consistency** — CRUD routes under `app/api/admin/*` generally call `requireAuth()` before mutations.

5. **Upload hardening (partial)** — MIME whitelist, extension check, size limits, auth required on POST.

6. **SEO basics** — Root metadata, per-page `generateMetadata`, `sitemap.ts`, `robots.ts` (disallows `/admin/`).

### 1.3 Weaknesses & Risks

#### Type safety

- `lib/cms.ts` relies heavily on **`any`** (~39 usages) and silent `try/catch` fallbacks (`tryDb` returns `[]` on any error).
- Public shapes like `PublicProgram` are well-defined, but DB row mapping remains untyped.
- Legacy static modules (`lib/programs-data.ts`, `news-data.ts`, etc.) still supply **types and seed data**, creating **dual sources of truth** (DB vs static files).

#### State management

- No global state library; appropriate for this site.
- **Sound/startup state** is global via `SoundContext` + `PageEntry` (loader → startup overlay → content). This wraps **all** non-admin routes through root layout — good UX intent, but increases client JS on every page.

#### Scalability of data layer

- **N+1 query patterns:**
  - `getProcessSteps()` — one query per step for subpoints.
  - `getPrograms()` / `getPublicPrograms()` — per-program session/type queries in loops.
- **In-memory filtering:** `getHeroByPage()` / `getIntroByPage()` fetch all active rows then filter by `page` in JS.
- **Silent degradation:** DB outages surface as empty sections, not errors — fine for preview, risky for production monitoring.

#### Routing & rendering model conflict

Several routes declare **both** `export const dynamic = "force-dynamic"` **and** `generateStaticParams()` (e.g. `app/programs/[slug]/page.tsx`, event/news slugs). With `force-dynamic`, static generation benefits are largely negated; every request hits the server + DB.

#### Admin architecture

- **No `middleware.ts`** — admin routes are not protected at the edge.
- Most admin pages use **client-side** `fetch('/api/admin/auth/session')` + `router.push('/login')` — UI can flash, and HTML shells are technically reachable without server redirect.
- Only `app/admin/page.tsx` uses server `getSession()` + `redirect()`.
- **Separate `<html>` in `app/admin/layout.tsx`** — valid pattern, but duplicates Typekit/font setup from marketing layout.

#### Dead / legacy code

- `components/LandingPage/` — **not referenced** by any `app/` route (possible “coming soon” remnant).
- Static `lib/*-data.ts` files — used for **seed** and **TypeScript types** in a few components, not as runtime CMS fallback on public pages.
- `app/page.tsx` re-exports `app/home/page.tsx` with redundant `force-dynamic`.

#### Tooling & documentation

- **README.md** is still the default `create-next-app` boilerplate (no env vars, DB setup, or deploy steps).
- **No `.env.example`** found in repo.
- **No tests** (`*.test.*` / `*.spec.*` — 0 files).
- **No GitHub Actions / CI** (`.github/` absent).
- **ESLint** configured (`eslint-config-next`) but no `typecheck` or `test` scripts in `package.json`.

### 1.4 Client vs Server Boundaries

~**40** files use `"use client"`. Notable boundary choices:

| Component | Impact |
|-----------|--------|
| `MainLayout` | Client wrapper → **Navbar + Floater** hydrate on all marketing pages |
| `PageEntryClient` | Dynamic import `ssr: false` for entry overlay |
| `ProgramContent` | Large client page (~400+ lines) with framer-motion scroll effects |
| Most `app/home/*` sections | Client-driven animations/carousels |

Server Components are used well on **data-fetching pages** (home, about, program slug), but the **root client shell** limits how much of the tree can stay server-only.

---

## 2. Performance & UX/UI Implementation

### 2.1 Build & Runtime Characteristics

- **Build:** Successful; **65 routes**; most marketing routes marked **ƒ (Dynamic)** in build output.
- **Implication:** Higher TTFB and DB dependency on every visit unless caching/ISR is introduced.

### 2.2 Asset & Media Optimization

| Asset type | Current approach | Concern |
|------------|------------------|---------|
| Images | `next/image` in ~20 components | Good where used |
| Images | Raw `<img>` in admin previews, `LandingPage`, `Footer` | No automatic optimization |
| Video | Native `<video>` (Hero, VideoBlock, programs) | No streaming/CDN abstraction; **Hero uses `preload="auto"`** |
| Fonts | Typekit CDN + local woff2 (Sweet Sans) | **Typekit loaded twice** (`globals.css` `@import` + `<link>` in `app/layout.tsx` and admin layout) |
| Audio | `/audio/main.mp3` via SoundContext | Loaded for users who opt into ambience |

**`next.config.ts`** configures `images.remotePatterns` for R2 and `storageb.awancode.com` — appropriate for CMS media.

### 2.3 JavaScript & Animation Payload

Four animation/carousel dependencies coexist:

- `framer-motion` — scroll reveals, program page, video in-view
- `gsap` — philosophy sections, passport content, etc.
- `animejs` — landing/subscription flows
- `embla-carousel-react` — home process carousel

**Recommendation area (audit only):** consolidate to one primary motion stack + lazy-load GSAP/anime on routes that need them. None of this is done today.

**Code splitting:** Only `PageEntry` uses `next/dynamic`. Heavy pages (`ProgramContent`, `home/system/Section` with GSAP) load synchronously.

### 2.4 Rendering & Caching

| Pattern | Usage | Assessment |
|---------|-------|------------|
| `force-dynamic` | Home, about, FAQ, journal, membership, root `/`, etc. | Disables static/ISR; increases server load |
| `generateStaticParams` | Programs, events, news slugs | Undermined by `force-dynamic` |
| `revalidate` / tags | Not found | No cache invalidation strategy |
| `loading.tsx` | **0 files** | No route-level streaming skeletons |
| `error.tsx` / `not-found.tsx` | **0 custom files** | Default Next.js fallbacks only |

### 2.5 Responsiveness & Layout Precision

**Strengths:**

- Global responsive tokens in `globals.css` (`--section-padding-*` adjust at breakpoints).
- CSS Modules per section with dedicated spacing/typography — supports **high-fidelity** brand layout.
- `ProgramContent.module.css` (655 lines) and home sections show **investment in visual polish**.

**Gaps:**

- No systematic use of `prefers-reduced-motion` — motion-heavy UX may fail accessibility expectations.
- Scroll-driven blur on Hero runs on **every scroll event** (mitigated with `passive: true`, but still main-thread work).
- Startup overlay locks `document.body.overflow` — correct for overlay UX, but delays first interaction on home.

### 2.6 UX Flows

| Flow | Status |
|------|--------|
| Home (hero → services → system → why → video → FAQ → location → news) | **Complete**, CMS-fed |
| About / philosophy | **Partial** — several sections commented out in JSX |
| Programs (`/programs/[slug]`) | **Strong** — rich layout, session groups, video, CTA |
| Community (journal, events, articles) | **Present** |
| Membership (passport, charm) | **Present** |
| FAQ | **Present** |
| First-visit loader + sound choice | **Implemented** via PageEntry/Startup |
| Program prev/next nav | **Disabled** (`{false && ...}` in ProgramContent) |
| Custom 404 / error pages | **Missing** |

### 2.7 Accessibility (spot check)

- Positive: `aria-label` on some sections (e.g. home video), carousel controls, navbar patterns.
- Gaps: decorative videos marked `aria-hidden` (OK), but **no skip link**, inconsistent heading hierarchy audit, **no reduced-motion** path, newsletter/forms need verified labels/errors.

---

## 3. Gaps & Imperfections

### 3.1 Security

| Issue | Severity | Detail |
|-------|----------|--------|
| `SESSION_SECRET` default fallback | **High** | `lib/session.ts` ships a hardcoded 32+ char default if env missing |
| Admin UI auth | **Medium** | Client-only gate on most admin pages; no middleware |
| `GET /api/admin/seed` | **Medium** | Returns table row counts **without `requireAuth()`** — information disclosure |
| Login endpoint | **Medium** | No rate limiting / lockout visible |
| Input validation | **Medium** | No Zod/Yup; API trusts JSON bodies + manual checks |
| `console.error` in APIs | **Low** | ~45+ occurrences — avoid leaking internals in production logs |

### 3.2 Error Handling & Observability

- CMS layer **swallows DB errors** → empty UI with no user-facing “content unavailable” state.
- No **Sentry/Datadog** or structured logging integration found.
- No custom **error boundaries** for marketing or admin.

### 3.3 Hardcoded & Fallback Values

Examples observed:

- `BOOK_NOW_URL` / WhatsApp links in hero and CTAs
- `FRAMEWORK_IMAGE_FALLBACK`, `PROGRAM_VIDEO_FALLBACK` in `ProgramContent`
- `getSiteSettings()` hardcoded phone/WhatsApp when DB fails
- Cafe/climbing CTA hiding via slug/name string checks

### 3.4 Incomplete / Commented Features

**`app/about/page.tsx`** (active route imports but does not render):

- `WhyBFriends` — commented out
- `Manifesto`, `CoreBeliefs`, `IntegratedSelf` — fetched but not rendered
- `SiteLocation` — commented out

**`app/programs/[slug]/ProgramContent.tsx`:**

- Program navigation footer intentionally disabled

**`app/home/hero/Hero.tsx`:**

- “Learn More” CTA commented out

### 3.5 Data & CMS Edge Cases

- Schema migration tolerance (e.g. `hidden_in_home`, `page_key`) is handled with nested try/catch — good for rollout, hard to reason about.
- `getIntroByPage("home")` used on **About** page — may be intentional (shared intro) or copy-paste; worth confirming with content team.
- Sitemap uses `getProgramSlugs()` while pages use `getPublicProgramSlugs()` — should stay in sync (currently both query active programs).

### 3.6 Dependency & Config Notes

- Package name still `bfriends-soon`.
- `eslint-config-next` **16.0.5** vs Next **16.2.4** — minor version drift.
- `allowJs: true` — no strong issue, but mostly TS codebase.
- `crypto-browserify` / `path-browser` in devDependencies — suggests past bundler workarounds; verify necessity.

### 3.7 Git / Workspace Hygiene

Untracked duplicates appear in git status (`app\admin\...` vs `app/admin/...` on Windows) — same paths, but line-ending or tooling noise may confuse reviews. Worth normalizing `.gitattributes` / editor defaults.

---

## 4. Progress & Roadmap

### 4.1 Progress Estimate

| Workstream | Completion | Rationale |
|------------|------------|-----------|
| Marketing pages & design | **~85%** | Core routes built; about page sections incomplete |
| CMS / Admin | **~80%** | Broad CRUD coverage; auth UX & validation need hardening |
| Data layer | **~70%** | Functional queries; needs typing, caching, query batching |
| Performance | **~50%** | Visual polish high; caching/media/JS diet immature |
| Security & compliance | **~45%** | Baseline auth; secrets, rate limits, middleware missing |
| QA & DevOps | **~15%** | No tests, CI, or real README |

**Weighted overall: ~72%** to “launchable marketing + CMS MVP”  
**~55%** to “production-grade” (tests, monitoring, caching, security hardening, docs)

### 4.2 Feature Inventory

| Route / Feature | Status |
|-----------------|--------|
| `/` (home) | ✅ CMS-driven |
| `/about`, `/about/journey` | ⚠️ About partial |
| `/programs/[slug]` | ✅ |
| `/community/journal`, `/community/event-workshop` | ✅ |
| `/community/event/[slug]`, `/community/news/[slug]` | ✅ |
| `/membership/*` | ✅ |
| `/faq` | ✅ |
| Admin CMS | ✅ extensive |
| Landing / coming soon page | ❌ component exists, unused |
| Automated tests | ❌ |
| Custom 404/error | ❌ |

---

## 5. Prioritized Production Checklist

### P0 — Before production launch

1. **Set and enforce secrets** — `SESSION_SECRET`, DB credentials, R2 keys; remove default session password fallback.
2. **Protect admin routes server-side** — Add `middleware.ts` (or layout-level server auth) for `/admin/*` except `/admin/login`.
3. **Authenticate `GET /api/admin/seed`** (or disable in production).
4. **Add rate limiting** on `POST /api/admin/auth/login`.
5. **Replace silent CMS failures** with logging + optional user-visible fallback for critical sections.
6. **Document environment** — `.env.example` + README (DB migrate, `seed.sql`, R2, GA ID).
7. **Complete About page** — uncomment or remove dead fetches; align content with design sign-off.
8. **Review `force-dynamic`** — adopt ISR/`revalidate` for stable pages; keep dynamic only where necessary.

### P1 — Performance & UX (first month)

9. **Deduplicate Typekit** — single load path (prefer `next/script` or one CSS import).
10. **Optimize video strategy** — poster images, `preload="metadata"` on hero, consider HLS/hosted CDN.
11. **Batch CMS queries** — JOINs or parallelized maps for programs/process steps.
12. **Split client boundaries** — server wrapper layout; lazy-load GSAP/framer on below-fold sections.
13. **Add `loading.tsx`** for heavy routes (programs, journal).
14. **Custom `not-found.tsx` and `error.tsx`** on-brand.
15. **`prefers-reduced-motion`** — disable/limit parallax and scroll animations.
16. **Consolidate animation libraries** — pick primary stack, remove unused deps.

### P2 — Quality & operations

17. **Type `lib/cms.ts`** — replace `any` with DB row types / Zod parse at boundary.
18. **Input validation** on all admin POST/PATCH bodies (Zod shared schemas).
19. **Automated tests** — smoke e2e (Playwright): home, program slug, admin login; unit tests for `cms` mappers.
20. **CI pipeline** — lint, `tsc`, build on PR.
21. **Monitoring** — error tracking + uptime on DB/API.
22. **Remove or wire `LandingPage`** — delete dead code or route for pre-launch mode.
23. **Admin auth consistency** — server redirect on all admin pages (match `app/admin/page.tsx`).

### P3 — Polish & growth

24. **Image audit** — migrate remaining `<img>` to `next/image` where beneficial.
25. **Newsletter integration** — verify backend, GDPR/consent, error states (currently light).
26. **i18n** — if Bali/international audience needs Indonesian copy paths.
27. **Analytics events** — expand beyond startup choice (program CTA, book now).
28. **Cache invalidation** — on CMS publish, revalidate tagged routes.

---

## 6. Appendix

### 6.1 Key Files Referenced

| File | Role |
|------|------|
| `app/layout.tsx` | Root marketing layout, fonts, SoundProvider, MainLayout |
| `app/admin/layout.tsx` | Separate admin HTML shell |
| `lib/cms.ts` | Public CMS data access |
| `lib/db.ts` | MySQL pool (limit 60) |
| `lib/session.ts` | iron-session config |
| `app/styles/brand-tokens.css` | Design tokens |
| `components/PageEntry/PageEntry.tsx` | Loader + startup gate |
| `next.config.ts` | Redirects, image domains |

### 6.2 Build Output Snapshot (May 2026)

- Next.js **16.2.4**, compiled in ~6.5s
- TypeScript check passed
- **65** generated routes
- Marketing routes predominantly **dynamic (ƒ)**

### 6.3 Dependency Summary (production)

```
next, react, react-dom, mysql2, iron-session, bcryptjs,
@aws-sdk/client-s3, framer-motion, gsap, animejs,
embla-carousel-react, lucide-react, clsx, tailwind-merge, geist
```

---

## 7. Conclusion

BFriends demonstrates **strong brand-forward frontend execution** and a **functional custom CMS** suitable for a 2026 wellness launch. The codebase is maintainable at current scale but will strain under traffic or editorial velocity without **caching, stricter typing, server-side admin protection, and operational tooling**.

The highest-impact path to production is not more features—it is **hardening auth/secrets**, **fixing the rendering/caching strategy**, **finishing the About page**, and **adding observability and tests** around the MySQL-backed content layer.

---

*End of report — generated by automated codebase audit. No source files were modified.*
