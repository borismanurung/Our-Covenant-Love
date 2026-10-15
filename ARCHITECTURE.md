# Architecture & System Design: Our Covenant Love

This document details the architectural principles, design patterns, and operational boundaries of the **Our Covenant Love** platform.

---

## 1. High-Level Architectural Pattern

The platform is designed as a **Modular Monolith** built on **Next.js 14 App Router**. This avoids unnecessary microservice operational overhead while strictly maintaining modular domain boundaries for future extension (e.g. mobile apps, private couples journals, and formation pathways).

```mermaid
flowchart TD
    subgraph ClientLayer["Client & Device Layer"]
        WebDesktop["Desktop Browser"]
        WebMobile["Mobile / Tablet Browser"]
        FutureApps["Future Couples Native Mobile App"]
    end

    subgraph EdgeRouting["Edge & Middleware Layer"]
        Middleware["Next.js Middleware (src/middleware.ts)"]
        LocaleDetector["Bilingual Detection (/id, /en)"]
        SessionGuard["Admin Session Authentication Guard"]
    end

    subgraph PresentationLayer["Presentation Layer (App Router)"]
        PublicApp["Public Ministry Portal (src/app/[locale]/...)"]
        AdminApp["Admin CMS Portal (src/app/[locale]/admin/...)"]
        APIRoutes["Route Handlers (src/app/api/...)"]
    end

    subgraph DomainServiceLayer["Domain Services & Staged Modules"]
        ContentSvc["Content Service (src/services/content.service.ts)"]
        InquirySvc["Inquiry Service (src/services/inquiry.service.ts)"]
        AuthSvc["Auth & Session Library (src/lib/auth.ts)"]
        CouplesDomain["Couples Staged Domain (src/modules/couples/...)"]
    end

    subgraph DataLayer["Persistence Layer"]
        PrismaClient["Prisma ORM Client (src/lib/prisma.ts)"]
        Database[("Relational Database (SQLite / PostgreSQL)")]
    end

    ClientLayer --> EdgeRouting
    EdgeRouting --> PresentationLayer
    PresentationLayer --> DomainServiceLayer
    DomainServiceLayer --> DataLayer
```

---

## 2. Bilingual Engine Architecture

Localization is built with zero runtime penalty and full SEO compliance:

1. **Routing Strategy**:
   - Every public and admin page is nested under `src/app/[locale]/`.
   - Locales supported: `id` (Indonesian, default) and `en` (English).
   - Middleware handles prefix resolution (`/` $\rightarrow$ `/id`) and validates route parameters.

2. **Static Dictionaries vs Dynamic Relational Content**:
   - **Static UI Elements** (buttons, nav labels, form placeholders, footers) are resolved via type-safe dictionary lookups in `src/i18n/dictionaries/id.ts` and `en.ts`.
   - **Dynamic Content** (articles, sermons, songs, events) uses relational modeling in the database:
     - `ContentItem`: Parent concept holding type, publication status, featured flag, timestamps, and media references.
     - `ContentTranslation`: Holds the localized `title`, `slug`, `excerpt`, `body`, `lyrics`, and SEO metadata for that specific locale.
     - Slugs are independent per locale (e.g. `/id/articles/pernikahan-adalah-kovenan` vs `/en/articles/marriage-is-a-covenant`), optimizing organic search discovery in both languages.

---

## 3. Security & Authentication Architecture

1. **Password Hashing**:
   - Implemented in `src/lib/auth.ts` using Node.js native `crypto.pbkdf2Sync` with SHA-512, 100,000 iterations, and a unique 16-byte cryptographic salt per user.
   - Password comparisons use `crypto.timingSafeEqual` to prevent timing attacks.

2. **Session Verification**:
   - Secure, `HttpOnly`, `SameSite=Lax` cookie `ocl_session` containing a cryptographically random 32-byte hex token.
   - Sessions are verified server-side against the `Session` table in Prisma with automatic expiration (7 days).

3. **Spam & Abuse Protection**:
   - Contact form uses a **Honeypot field** (`website_hp`) combined with server-side length and email regex validations. Bot submissions filling the hidden trap are rejected without exposing errors.
   - Administrative actions (login, content creation, content deletion) are recorded in the `AuditLog` table with IP and timestamp metadata.

---

## 4. Staged Couples Application Boundary (`src/modules/couples/`)

To prevent feature creep from bloating the public CMS while preparing for the ministry’s future mobile and interactive initiatives, an isolated domain module is established in `src/modules/couples/`:

```
src/modules/couples/
├── index.ts              # Module configuration and exports
└── types.ts              # Partner consent contracts, prompt interfaces, and check-in models
```

### Architectural Consent Invariants:
1. **Explicit Consent**: Account linking between partners does not automatically expose personal drafts or reflections.
2. **Double Opt-In**: A check-in reflection only becomes visible to the spouse when `isSharedWithPartner === true`.
3. **Data Boundary**: Future private journaling tables will remain separate from the public `ContentItem` schema.

---

## 5. Deployment Guidelines

### Local Development:
- Uses SQLite (`prisma/dev.db`) configured in `.env` as `file:./dev.db`.
- Requires zero external database services.

### Production Deployment (e.g. Vercel, Railway, Fly.io, AWS):
1. Set `DATABASE_URL` to a production PostgreSQL connection string (e.g. `postgresql://user:pass@host:5432/ocl_prod?sslmode=require`).
2. Update `provider = "postgresql"` in `prisma/schema.prisma` or use Prisma Postgres adapter.
3. Run `npx prisma migrate deploy` in the deployment pipeline.
4. Set `NODE_ENV=production`.
