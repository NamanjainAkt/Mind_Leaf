# Wiki Change Log

## [2026-08-22] Mobile App UI Audit & Comprehensive Screen Fixes
- Replaced blank placeholder screens in `app/(tabs)/index.tsx` (Home), `library.tsx` (Library), and `profile.tsx` (Profile) with rich interactive screens
- Built Home feed with Daily Spark hero quote, reading stats row, curated 10-book carousel, and spaced repetition flashcard CTA
- Built Library shelf with Segmented controls ("Reading", "Saved", "Finished"), reading progress bars, and empty states
- Built Profile screen with user stats grid, GoalSetter widget, reader theme switcher (Light, Dark, Sepia), and notification preferences
- Connected Discover screen to live catalog with real-time search filtering and category chips
- Fixed Book Detail screen (`app/book/[slug].tsx`) to dynamically load any of the 10 seeded books with complete key takeaways
- Enhanced Summary Reader (`app/book/[slug]/summary.tsx`) to render real book markdown, dynamic chapter headers, and text highlighting
- Enhanced Flashcards screen (`app/book/[slug]/flashcards.tsx`) with dynamic card loading, swipe/flip controls, and completed screen back-navigation
- Fixed API endpoint paths in `lib/api.ts` to match backend routes (`/api/books`, `/api/user/*`)

## [2026-08-22] MindLeaf Admin Panel Implementation
- Implemented embedded Next.js 14 App Router Admin Panel in `mindleaf-api` (`/admin`)
- Built Edge Session authentication (`lib/admin-auth.ts`, `middleware.ts`, `/admin/login`)
- Created Book CRUD with split-pane live Markdown editor and Cloudinary cover uploader
- Created Chapter Lessons and Flashcards deck managers (`/admin/books/[slug]/lessons`, `/admin/books/[slug]/flashcards`)
- Created User Retention, Streaks, Highlights feed, and Media Asset management pages
- Updated root landing page (`/`) with portal navigation

## [2026-05-27] Initial wiki bootstrap
- Created SCHEMA.md, index.md, log.md, overview.md
- Created AGENTS.md with wiki configuration block
- Seeded raw/ from source directories (mindleaf-api/src/, mindleaf-app/)

