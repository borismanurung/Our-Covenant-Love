# Our Covenant Love (Web Platform)

> *"Marriage & Family Exist to Reflect the Image and Glory of God, Making God's Character Visible to the World."*
> 
> *"Pernikahan & Keluarga Ada untuk Memancarkan Gambar dan Kemuliaan Allah, Menyatakan Karakter Allah kepada Dunia."*

**Our Covenant Love** is a modern, production-ready, bilingual digital platform for a Christian marriage and family ministry. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma ORM.

---

## 🌟 Core Ministry Values (I - M - A - G - E)

- **I** — **Imago Dei**: Marriage reflects the triune God’s communal nature (*Genesis 1:26–27*).
- **M** — **Mission Before Comfort**: Families are sending bases for Kingdom impact (*Joshua 24:15*).
- **A** — **Agape Love**: Covenant commitment elevated over conditional feelings (*1 Corinthians 13*).
- **G** — **Grace & Growth**: Continual transformation through repentance and forgiveness (*Colossians 3:13*).
- **E** — **Excellence for God’s Glory**: Integrity and quality in all ministry stewardship (*1 Corinthians 10:31*).

---

## 🚀 Key Features

### 1. First-Class Bilingual Localization (ID / EN)
- URL prefix localization (`/id` for Indonesian, `/en` for English).
- Type-safe dictionary system with seamless automatic fallback.
- Database-backed relational content translations with independent slugs and SEO metadata.

### 2. Comprehensive Public Ministry Sections
- **Home**: Vision hero, core values breakdown, featured teachings, original music, and interactive couples module roadmap.
- **Our Story**: Theological foundation (Genesis, Malachi, Ephesians), founders' letter, 5-point mission, and ministry declaration.
- **Marriage & Family**: Worldly contract vs divine covenant, 8 formation pillars (Covenant, Emotional Intimacy, Spiritual Intimacy, Communication, Forgiveness, Conflict Resolution, Parenting, Family Altars), and practical couple habits.
- **Articles & Devotionals**: Searchable catalog, category filtering, estimated reading times, markdown rich text, scripture references, and WhatsApp sharing.
- **Sermons & Video Teachings**: Embedded video player (YouTube/Vimeo), speaker profiles, scripture references, series classifications, and study outlines.
- **Original Music & Worship**: In-browser audio player, bilingual song lyrics, testimony behind the song, and monospace chord charts.
- **Ministry & Events**: Upcoming conferences, workshops (Dating & Marriage formation), registration routing, and local church seminar invitations.
- **Contact Us**: Official ministry headquarters (VMM Serpong), direct WhatsApp CTA, and contact form with anti-spam honeypot.

### 3. Secure Admin CMS Portal
- Dedicated admin login at `/[locale]/admin/login`.
- Session cookie verification with server-side authentication (`PBKDF2-SHA512` password hashing).
- Admin Dashboard with live metrics (articles, sermons, songs, events, inquiries).
- Content Manager: Create, preview, and delete bilingual content items with automatic slugification.
- Inquiries Inbox: View, filter, and reply directly to pastoral inquiries and prayer requests.

### 4. Staged Couples App Architecture
- Isolated domain module staged at `src/modules/couples/`.
- Ready interfaces for Covenant Passport, Date Night Challenges, and Daily Intimacy Prompts with partner privacy boundaries.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & `@tailwindcss/typography`
- **Icons**: [Lucide React](https://lucide.dev/)
- **ORM & Database**: [Prisma ORM](https://www.prisma.io/) with SQLite for local development, seamlessly compatible with PostgreSQL in production.

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Push Prisma database schema
npm run db:push

# 3. Seed bilingual ministry content and admin user
npm run db:seed

# 4. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. Automatic locale detection will route you to `/id` or `/en`.

---

## 🔑 Default Admin Credentials

For testing and administrative access:
- **URL**: `http://localhost:3000/id/admin/login` (or `/en/admin/login`)
- **Email**: `admin@ourcovenantlove.org`
- **Password**: `Covenant2026!`

---

## 📜 Available NPM Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `next dev` | Start local development server |
| `npm run build` | `next build` | Compile optimized production build |
| `npm run start` | `next start` | Run compiled production server |
| `npm run typecheck` | `tsc --noEmit` | Validate TypeScript types |
| `npm run db:push` | `prisma db push` | Push schema changes to database |
| `npm run db:seed` | `node prisma/seed.js` | Seed sample bilingual content & admin |

---

## 📍 Ministry Contact Information

- **Office Address**: VMM, Blok i-11 No.26, Serpong (15323)
- **Contact Person**: Ita Kitting: `0815 8641 8641`
- **Social Media**: `@OurCovenantLove` (Instagram, TikTok, Facebook)

---

## 📄 License
Copyright © 2026 Our Covenant Love Ministry. All rights reserved.
