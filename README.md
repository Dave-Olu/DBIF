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

The website's starting content lives in `src/data/`. Admin-editable content
uses the local JSON store during development by default, or Supabase Postgres
and Storage when configured. See the Vercel persistence setup
below before deploying admin features.

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

1. Copy `.env.example` to `.env.local`. Generate a unique `SESSION_SECRET` for each environment with
   `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` and configure `ADMIN_USERS`
   and the Paystack key. Never reuse the example or another environment's secret.
2. `npm run dev`, then sign in at `/admin/login`.
3. Paystack card giving stays off until `GIVING_ENABLED=true` (PRD: subject to leadership approval). The `/give` page also lists the approved bank-transfer accounts.
4. In the Paystack dashboard set the webhook URL to `<site>/api/paystack/webhook`.

**Vercel persistence (Supabase)**

Vercel functions do not have a persistent local filesystem. For hosted deployments, configure these
environment variables in Vercel for every environment you use:

- `DATABASE_URL`: Supabase session pooler connection string (keep the database password private).
- `SUPABASE_URL`: project URL, such as `https://<project-ref>.supabase.co`.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only service role/secret key. Never expose it with a `NEXT_PUBLIC_` prefix.
- `SESSION_SECRET` and `ADMIN_USERS`: unique production values; do not copy credentials from an example file.

Apply `supabase/migrations/20261028000000_initial.sql` in the Supabase SQL Editor. It creates the content
table and a public-read `gallery` Storage bucket. The application uses Postgres for editable content,
contact messages, and the donation ledger; gallery image bytes are stored in Supabase Storage. The service
key is used only in server routes and server actions. Gallery uploads are capped at 4 MB to stay within
Vercel's request-size limit.

To migrate existing local admin data, first configure `DATABASE_URL`, `SUPABASE_URL`, and
`SUPABASE_SERVICE_ROLE_KEY` in `.env.local`, then run:

```bash
npm run migrate:file-store
```

The script imports `.data/*.json` and uploads locally stored gallery images from `.data/uploads/`.
By default, existing database rows are preserved. `npm run migrate:file-store -- --overwrite`
replaces matching database content with the local files, so back up the database before using that option.
Once migration completes, add the same environment variables to Vercel and redeploy. Without
`DATABASE_URL`, local development continues to use `.data`; a Vercel deployment fails explicitly rather
than silently writing data to ephemeral storage.

**Online giving flow:** `/give` -> `POST /api/give/initialize` (amount in kobo, unique reference, pending
ledger entry) -> Paystack checkout -> return page and webhook both call `confirmPayment()`
(`src/lib/paystack.ts`), the only place a payment becomes "success". It requires Paystack to report
success and the amount and currency to match. Webhooks are rejected without a valid HMAC-SHA512
signature. Confirming twice is safe.

**Admin:** roles are `editor` (events, sermons, locations, announcement, gallery, contact details) and `super` (also
donations report + CSV, and contact messages). Editors can change or clear the announcement and upload or remove
gallery images (JPEG, PNG, or WebP, up to 4 MB each). Every admin page and action re-checks the session,
not only the middleware. Users are defined in `ADMIN_USERS`; adding or removing one means editing
that env var and restarting locally or redeploying on Vercel.

**Data storage:** local development uses `.data/` by default. Hosted deployments use Supabase Postgres
and Supabase Storage; configure the environment and apply the migration described above before enabling
admin editing or gallery uploads. The files in `src/data/` are starting content (the sample events,
sermons and testimonies still have to be replaced before launch).

**Email:** receipts and contact alerts use Resend if `RESEND_API_KEY` and `MAIL_FROM` are set;
otherwise they are logged and skipped (`src/lib/mail.ts`).

**Still open**
- Giving purposes: `givingPurposes` in `src/data/site.ts` holds one neutral default until DBIF confirms the list.
- Testimonies are not admin-editable yet (needs a moderation flow, PRD Phase 2).
- Rate limits are in-memory (per server instance).
- No user-management screen or password reset (needs a database).
- Analytics is not wired in (PRD §12: subject to privacy requirements).
- Add a giving/donor data section to the privacy policy once DBIF approves giving.
