# How to Handle News & Events Dynamically (GoGaddi)

## Current state

- **Data:** Static array in `my-medusa-store-storefront/src/data/news-events.ts` (`NEWS_AND_EVENTS`).
- **Used in:**
  - Home: `LatestCarUpdates` (first 3 items).
  - `/news-events`: full list + featured article.
- **Shape:** `id`, `slug`, `title`, `excerpt`, `date`, `image`.

---

## Options

### Option 1: Medusa custom module (recommended)

**Idea:** Add a `news_events` (or `content`) module in the Medusa backend: table, store API, and Admin UI to manage entries. Frontend fetches from the store API.

**Pros**

- Same stack as rest of the app (Medusa + PostgreSQL).
- One admin (Medusa Admin) for products, orders, seller submissions, and news/events.
- Reuses patterns you already have (e.g. cars module, store routes).

**Cons**

- Requires backend work (model, migration, API, admin widget).

**Rough steps**

1. **Backend (Medusa)**  
   - New model, e.g. `NewsEvent`: `id`, `slug`, `title`, `excerpt`, `date`, `image` (and optional `body`, `published`, `created_at`, `updated_at`).  
   - Migration to create the table.  
   - Service to list/get by slug (and optionally filter by `published`).  
   - Store API routes, e.g.:
     - `GET /store/news-events` (list, with limit/offset).
     - `GET /store/news-events/:slug` (single by slug).  
   - (Optional) Admin API + widget in Medusa Admin to create/edit/delete entries.

2. **Frontend (Next.js)**  
   - Data layer: e.g. `@lib/data/news-events.ts` with `listNewsEvents()`, `getNewsEventBySlug(slug)` that call the store API.  
   - Replace `NEWS_AND_EVENTS` in:
     - `LatestCarUpdates` → fetch from API (e.g. latest 3).
     - `/news-events` page → fetch list + featured from API (or server component that fetches and passes data).  
   - Keep the existing `NewsEventItem`-style type, but source it from API response.

3. **Images**  
   - Keep storing image URLs (e.g. from uploads or external CDN) in the `image` field; no change to how you use them in the UI.

---

### Option 2: Next.js API + PostgreSQL only

**Idea:** Add a table in the same DB (or a DB the storefront can reach), and a Next.js API route that reads/writes it. No new Medusa module.

**Pros**

- No Medusa backend changes.
- Quick to add: one migration (or SQL script) and one API route.

**Cons**

- Admin is separate (custom page or script); not inside Medusa Admin.
- Two places to manage content (Medusa Admin for products/orders, another UI for news).

**Rough steps**

1. **Database**  
   - Table, e.g. `news_events`: `id`, `slug`, `title`, `excerpt`, `date`, `image`, `created_at`, etc.  
   - Use your existing PostgreSQL (e.g. same DB as Medusa) and run a migration or SQL.

2. **Next.js API**  
   - `GET /api/news-events` → list (with optional limit/offset).  
   - `GET /api/news-events/[slug]` → one by slug.  
   - Use a DB client (e.g. Prisma, `pg`, or Medusa’s DB if you have access from the storefront).

3. **Frontend**  
   - Data layer that calls `fetch('/api/news-events')` and `/api/news-events/[slug]`.  
   - Same as above: replace static import in `LatestCarUpdates` and `/news-events` with this data layer.

4. **Admin**  
   - Simple protected page (e.g. `/admin/news-events`) or a separate small app that uses the same API with POST/PUT/DELETE (and auth).

---

### Option 3: Headless CMS

**Idea:** Use Contentful, Strapi, Sanity, etc. Model “News” / “Event” there and fetch via their API.

**Pros**

- Rich editor, media, workflows, no DB/migrations in your app.

**Cons**

- Extra service, API keys, and possibly cost.  
- Different from your current “everything in Medusa/PostgreSQL” setup.

**Rough steps**

1. Model “News/Event” in the CMS (title, slug, excerpt, date, image, body).  
2. Frontend data layer: fetch from CMS API (e.g. in `getServerSideProps` or server components).  
3. Replace static data in `LatestCarUpdates` and `/news-events` with that fetch.

---

## Recommendation

- **Option 1 (Medusa module)** is the best fit if you want one admin, one stack, and consistency with cars/seller submissions.  
- **Option 2 (Next.js API + DB)** is the fastest way to get off static data without touching Medusa.

---

## Data shape to keep (for frontend)

Keep your current frontend type so the UI changes are minimal:

```ts
// Keep this shape from API responses
type NewsEventItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
}
```

Optional fields to add later: `body` (full HTML/markdown), `published` (boolean), `created_at`, `updated_at`.

---

## Minimal frontend change (after API exists)

1. **Data module** (e.g. `lib/data/news-events.ts`):

   - `listNewsEvents({ limit?, offset? })` → returns `NewsEventItem[]`.
   - `getNewsEventBySlug(slug)` → returns `NewsEventItem | null`.

2. **Home (LatestCarUpdates)**  
   - In the page that renders it (or inside the component if you use server fetch), call `listNewsEvents({ limit: 3 })` and pass the result as props.  
   - Remove import of `NEWS_AND_EVENTS` from `data/news-events`.

3. **`/news-events` page**  
   - Convert to server component (or keep client and fetch in parent).  
   - Fetch list (e.g. `listNewsEvents({ limit: 20 })`), compute featured (e.g. first item), pass to current UI.  
   - Remove import of `NEWS_AND_EVENTS`.

4. **Detail page (optional)**  
   - Add `/news-events/[slug]` and use `getNewsEventBySlug(slug)` to show full article (if you add `body`).

Once you choose Option 1 or 2, the next step is to implement the backend/API and then this frontend data layer and prop wiring.
