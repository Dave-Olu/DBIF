# DBIF Website

Next.js (App Router) + TypeScript + Tailwind CSS codebase for the Destiny
Builders International Fellowship (DBIF) website, built from
`DBIF_Website_PRD_v1_1.docx`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## Project structure

```
src/
  app/            Routes (App Router). One folder per PRD §8 sitemap page.
  components/     Reusable UI pieces (Header, Footer, EventCard, etc.)
  data/           Site content as typed TypeScript data — see below.
  lib/            Shared types (types.ts) and helpers (utils.ts).
```

There's no CMS or database wired in yet (PRD §23 recommends Sanity.io for
content, with a managed Postgres option for structured/relational data).
Until that's connected, everything in `src/data/` is the content source —
edit those files directly to change what the site shows.

## Content that still needs DBIF leadership's input

Per PRD §24 ("the developer will not invent missing organizational
information"), anything DBIF leadership hasn't confirmed yet is left as a
`null` placeholder in the data files rather than invented text, and renders
as a visible "Pending" notice on the page instead. Search the codebase for
`Pending` and `null as string | null` to find every spot, or check the PRD's
own §22 (Open Items) — they map 1:1. The main ones:

- `src/data/site.ts` — CAC registration details, founder name/title, contact
  info, social handles, vision/mission statements, core values, Bible
  passages
- `src/data/leadership.ts` — leadership names, titles, bios, photos
- `src/data/locations.ts` — exact branch names/addresses (state-level
  presence is PRD-sourced fact; branch specifics are not)
- `src/data/partners.ts` — confirmed partner list and relationship wording

`src/data/events.ts`, `src/data/sermons.ts`, `src/data/testimonies.ts`, and
`src/data/gallery.ts` currently hold **sample/illustrative content** to
demonstrate the page layouts — swap these out for real content before
launch; don't publish them as-is.

## Design system

Tailwind tokens are defined in `tailwind.config.ts`:

- Colors: `ink` (deep navy — text/dark sections), `paper` (warm ivory
  background), `gold` (accent), `forest` (secondary accent), `slate`
  (muted text/borders).
- Type: `font-display` (Fraunces, serif — headings) and `font-body` (Work
  Sans — everything else), loaded via `next/font/google` in
  `src/app/layout.tsx`.
- The small trapezoid mark (`src/components/Keystone.tsx`) is the one
  recurring graphic device, used in the header, footer, and page headers.

## Giving (Paystack) and admin

Implements the flows in `DBIF_System_Flow_and_Features_v1.docx`.

**Setup**

1. `cp .env.example .env.local` and fill it in (`SESSION_SECRET`, `ADMIN_USERS`, Paystack key).
2. `npm run dev`, then sign in at `/admin/login`.
3. Giving stays off until `GIVING_ENABLED=true` (PRD: subject to leadership approval).
4. In the Paystack dashboard set the webhook URL to `<site>/api/paystack/webhook`.

**Giving flow:** `/give` -> `POST /api/give/initialize` (amount in kobo, unique reference, pending
ledger entry) -> Paystack checkout -> return page and webhook both call `confirmPayment()`
(`src/lib/paystack.ts`), the only place a payment becomes "success". It requires Paystack to report
success and the amount and currency to match. Webhooks are rejected without a valid HMAC-SHA512
signature. Confirming twice is safe.

**Admin:** roles are `editor` (events, sermons, locations, contact details) and `super` (also
donations report + CSV, and contact messages). Every admin page and action re-checks the session,
not only the middleware. Users are defined in `ADMIN_USERS`; adding or removing one means editing
that env var and restarting.

**Data storage (read this before deploying):** admin edits, the donations ledger and contact
messages live in JSON files under `.data/` (`src/lib/store.ts`). That needs a persistent, writable
disk (VPS or Docker volume). It will not persist on Vercel or other read-only hosts. For those,
replace `readJson`/`updateJson` in `store.ts` with a managed database (Supabase/Neon, PRD §24);
nothing else has to change. The files in `src/data/` are the starting content (the sample events,
sermons and testimonies still have to be replaced before launch).

**Email:** receipts and contact alerts use Resend if `RESEND_API_KEY` and `MAIL_FROM` are set;
otherwise they are logged and skipped (`src/lib/mail.ts`).

**Still open**
- Giving purposes: `givingPurposes` in `src/data/site.ts` holds one neutral default until DBIF confirms the list.
- Gallery and testimonies are not admin-editable yet (needs an image host / moderation flow, PRD Phase 2).
- Rate limits are in-memory (single server process).
- No user-management screen or password reset (needs a database).
- Analytics is not wired in (PRD §12: subject to privacy requirements).
- Add a giving/donor data section to the privacy policy once DBIF approves giving.
