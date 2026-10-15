# Product Roadmap: Our Covenant Love Platform

## Phase 1: Core Ministry Platform & Bilingual CMS (Completed)

- [x] **Next.js 14 App Router + TypeScript Foundation**: Production setup with Tailwind CSS and typography styling.
- [x] **Prisma Database Schema & Relational Translations**: Content items linked to bilingual Indonesian (`id`) and English (`en`) translations.
- [x] **Core Public Ministry Pages**:
  - [x] Home (`/[locale]`) with Vision, IMAGE values, and featured resources.
  - [x] Our Story (`/[locale]/our-story`) with theological foundations, founders' letter, and declaration.
  - [x] Marriage & Family (`/[locale]/marriage-family`) with 8 formation pillars and covenant vs contract guide.
  - [x] Articles & Devotionals (`/[locale]/articles`, `/[locale]/articles/[slug]`) with category filtering and search.
  - [x] Sermons & Videos (`/[locale]/sermons`, `/[locale]/sermons/[slug]`) with video player embeds and study outlines.
  - [x] Original Music (`/[locale]/music`, `/[locale]/music/[slug]`) with audio player, bilingual lyrics, and chord charts.
  - [x] Ministry & Events (`/[locale]/events`, `/[locale]/events/[slug]`) with registration flow and church invitation CTA.
  - [x] Contact Us (`/[locale]/contact`) with office details, direct WhatsApp link, and honeypot-protected form.
- [x] **Administrative CMS Portal**:
  - [x] Admin Login (`/[locale]/admin/login`) with session management and PBKDF2 password security.
  - [x] Admin Dashboard (`/[locale]/admin`) with metrics overview.
  - [x] Content Manager (`/[locale]/admin/content`) with bilingual creation drawer, filters, and deletion.
  - [x] Inquiries Inbox (`/[locale]/admin/inquiries`) with mailto responder.
- [x] **Staged Couples Architecture Boundary**: `src/modules/couples/` domain definition.

---

## Phase 2: Interactive Couples Formation Module (Next Milestone)

- [ ] **Couple Account Linking & Authentication**:
  - Magic link or invite code pairing between spouses.
  - Privacy and consent controls for shared vs private notes.
- [ ] **Covenant Passport (30-Day Relational Journey)**:
  - Daily bite-sized covenant reflection prompts.
  - Progress tracking and milestone celebration badges.
- [ ] **Date Night Challenge Pack**:
  - Curated, gamified conversation deck with categories: Childhood & Family of Origin, Dreams & Calling, Spiritual Unity, Romance & Appreciation.
- [ ] **Reconciliation Exercise Guide**:
  - Step-by-step biblical peacemaking pathways (Confession, Forgiveness, Rebuilding Trust).

---

## Phase 3: Mobile Apps & Community Expansion

- [ ] **Cross-Platform Mobile App (iOS / Android)**:
  - React Native or Flutter client consuming `/api/v1/couples/*` endpoints.
  - Daily push notifications for morning couple prayer and evening gratitude check-ins.
- [ ] **Offline Reading & Audio Listening**:
  - Downloadable devotional audio and worship tracks for offline meditation.
- [ ] **Church Partner Portal**:
  - Resource kits, slide decks, and facilitator guides for local church small groups and marriage mentors.
