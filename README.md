# Maulana Hafiz Ali

Islamic consultation website built with Next.js 16 (App Router), Tailwind CSS v4, and Supabase (PostgreSQL) via Prisma. Includes a full CRM-style **Lead Management Admin Panel** at `/admin`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Supabase PostgreSQL pooler connection string (port `6543`, `sslmode=require`) |
| `JWT_SECRET` | Long random string used to sign admin session cookies (`openssl rand -base64 32`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin bootstrap account used by the seed script |
| `WEB3FORMS_ACCESS_KEY` | Optional web3forms key (email fallback on form submission) |

## Database Setup (Prisma 7)

Prisma 7 uses `prisma.config.ts`; the client is generated into `src/generated/prisma` and connects through the `@prisma/adapter-pg` driver adapter.

```bash
# Generate the client
npx prisma generate

# Apply existing migrations to the database
npx prisma migrate deploy

# Seed statuses, tags, admin user, and sample leads
npx tsx prisma/seed.ts
```

> Note: `prisma migrate dev` does not work against the Supabase pooler ("bouncer config error").
> For schema changes, generate SQL with `prisma migrate diff` and apply it with `prisma migrate deploy`.

## Admin Panel

- URL: `/admin` (redirects to `/admin/login` when unauthenticated)
- Default admin (from seed): `admin@maulanahafizali.com` / `ChangeMe123!` — **change both before going live**
- Features: lead list (search, filters, sort, pagination, bulk actions), lead detail (notes, follow-ups, tags, status history, Call/WhatsApp/Imo/Email), status management, team management, tag management, trash/restore, CSV export, CSV/XLSX import, dashboard with trends, notifications.
- Roles: `ADMIN`, `MANAGER`, `AGENT`.

## Deployment (Vercel)

Push to `main`; Vercel auto-deploys. Set all `.env` values in the Vercel project settings (env variables), then run `npx prisma migrate deploy` once against the production database (e.g. in a local terminal — the pooler does not support `migrate dev`).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)