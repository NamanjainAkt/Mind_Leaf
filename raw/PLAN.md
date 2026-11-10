# MindLeaf Build Plan

## Overview

MindLeaf is a mobile reading app for book summaries with flashcards, lessons, highlights, and streak gamification. The app delivers the highest-signal ideas from 10 curated self-development books through markdown summaries, bite-sized lessons with visual media, and spaced-repetition flashcard decks. Built with React Native + Expo for mobile and Next.js for the API backend.

## Project Type

**MOBILE** - React Native + Expo SDK 51 with Next.js API backend

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Mobile Framework | React Native + Expo SDK 51 | Cross-platform mobile app |
| Styling | NativeWind v4 | Tailwind-style utility classes |
| Navigation | Expo Router v3 | File-based routing |
| State Management | Zustand | Global state (theme, user, books) |
| Local Storage | MMKV | Offline progress caching |
| Markdown Rendering | react-native-markdown-display | Summary + lesson rendering |
| Animations | react-native-reanimated v3 | Flashcard flip, transitions |
| Gestures | react-native-gesture-handler v2 | Swipe gestures |
| Images | expo-image | Cached WebP images |
| Notifications | expo-notifications | Daily reminders |
| Fonts | expo-font | Playfair Display + DM Sans |
| Backend | Next.js 14 (App Router) | Serverless API |
| Database | MongoDB Atlas | Primary data store |
| ODM | Mongoose v8 | Schema validation |
| Media CDN | Cloudinary | Asset hosting, transforms |

### User-Provided Credentials

These credentials will be provided at the end of the project build:

| Variable | Purpose | Where to Configure |
|----------|---------|-------------------|
| `MONGODB_URI` | MongoDB Atlas connection string | Next.js `.env.local` |
| `CLOUDINARY_CLOUD_NAME` | Cloud account name | Next.js `.env.local`, Cloudinary SDK |
| `CLOUDINARY_API_KEY` | API key for media operations | Next.js `.env.local` |
| `CLOUDINARY_API_SECRET` | API secret for signed URLs | Next.js `.env.local` (server-side only) |

## Success Criteria

| Phase | Milestone | Verification |
|-------|-----------|---------------|
| 1 | App shell runs, one book seeded in DB | Fetch `/api/books/atomic-habits` returns full book data |
| 2 | Can read full summary end-to-end | Complete reading progress persisted to MMKV |
| 3 | Lesson + flashcard flow complete | Mastery ring shows progress per book |
| 4 | Streak tracks correctly, highlights save | Streak increments on daily activity |
| 5 | App Store ready | Build succeeds, all features functional |

## File Structure

```
mindleaf/
├── mindleaf-app/                 # React Native + Expo app
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── index.tsx        # Home
│   │   │   ├── discover.tsx      # Browse books
│   │   │   ├── library.tsx      # Personal shelf
│   │   │   └── profile.tsx      # Stats & settings
│   │   ├── book/
│   │   │   ├── [slug].tsx      # Book detail
│   │   │   └── [slug]/
│   │   │       ├── summary.tsx   # Read summary
│   │   │       ├── lessons.tsx   # Lessons list
│   │   │       ├── lesson/
│   │   │       │   └── [id].tsx # Single lesson
│   │   │       └── flashcards.tsx # Flashcard deck
│   │   ├── highlights.tsx
│   │   ├── streak.tsx
│   │   └── _layout.tsx
│   ├── components/              # 20+ reusable components
│   ├── store/                 # Zustand stores
│   ├── lib/                   # API, MMKV, notifications
│   └── types/
├── mindleaf-api/               # Next.js 14 API
│   ├── app/api/
│   │   ├── books/
│   │   ├── user/
│   │   └── media/
│   ├── lib/                   # DB, Cloudinary helpers
│   ├── models/                # Mongoose models
│   └── scripts/seed/         # Seeding scripts
└── docs/
    └── PLAN.md               # This file
```

---

## Phase 1 — Foundation (Week 1–2)

**Goal:** Running app shell + one fully seeded book in MongoDB

### Deliverables

- [ ] Expo project initialized with NativeWind v4 + Expo Router v3
- [ ] Tab navigation skeleton (Home, Discover, Library, Profile)
- [ ] Next.js 14 project initialized on Vercel
- [ ] MongoDB Atlas cluster connected with Mongoose
- [ ] Book, Lesson, Flashcard, User schemas defined
- [ ] Seed Atomic Habits: summary + 6 lessons + 15 flashcards
- [ ] Cloudinary account configured with folder structure
- [ ] Uploaded Atomic Habits cover + 3 lesson images + 2 GIFs
- [ ] `GET /api/books` and `GET /api/books/[slug]` endpoints working

### Tasks

| Task ID | Name | Agent | Skills | Priority | Dependencies | Input → Output → Verify |
|--------|------|-------|--------|----------|--------------|----------------------|
| P1.1 | Initialize Expo project | mobile-developer | React Native, Expo, NativeWind | P0 | None | `npx create-expo-app@latest` → Running Expo app with NativeWind → `npm run ios` launches simulator |
| P1.2 | Set up tab navigation | mobile-developer | Expo Router v3 | P0 | P1.1 | Create `app/(tabs)/` with 4 tabs → Navigation works → All 4 tabs render |
| P1.3 | Initialize Next.js API | backend-specialist | Next.js 14, Mongoose | P0 | None | `npx create-next-app@14` → Running Next.js app → `npm run dev` serves API |
| P1.4 | Connect MongoDB | backend-specialist | Mongoose, MongoDB Atlas | P0 | P1.3 | Configure `MONGODB_URI` → DB connection → `db.ts` connects without error |
| P1.5 | Define Mongoose schemas | backend-specialist | Mongoose | P0 | P1.4 | Create Book, Lesson, Flashcard, User models → Schemas valid → No type errors |
| P1.6 | Create books API routes | backend-specialist | Next.js API | P0 | P1.5 | Implement `GET /api/books` and `GET /api/books/[slug]` → Endpoints return JSON → Response matches schema |
| P1.7 | Configure Cloudinary | backend-specialist | Cloudinary Node SDK | P0 | P1.3 | Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` → SDK configured → `getMediaUrl()` returns signed URL |
| P1.8 | Create seed script for Atomic Habits | backend-specialist | Mongoose, seeding | P0 | P1.5, P1.7 | Write `scripts/seed/atomicHabits.ts` → Run seed script → Database has 1 book, 6 lessons, 15 flashcards |
| P1.9 | Upload Atomic Habits media | mobile-developer | Cloudinary upload | P0 | P1.7 | Upload cover, lesson images, GIFs to Cloudinary → Media accessible → URLs return valid images |

### Success Criteria

- [ ] `curl http://localhost:3000/api/books` returns array with Atomic Habits
- [ ] `curl http://localhost:3000/api/books/atomic-habits` returns full book with summaryMarkdown
- [ ] Expo app launches with 4 tab screens rendering
- [ ] MMKV installed and configured in app

### Git Commit Message

```
feat(phase-1): Foundation - App shell + Atomic Habits seeded

- Initialize Expo + NativeWind + Expo Router project
- Implement tab navigation (Home, Discover, Library, Profile)
- Set up Next.js 14 API with Mongoose
- Connect MongoDB Atlas cluster
- Define Book, Lesson, Flashcard, User schemas
- Create GET /api/books and GET /api/books/[slug] endpoints
- Configure Cloudinary with folder structure
- Seed Atomic Habits (summary + 6 lessons + 15 flashcards)
- Upload cover and lesson media to Cloudinary
```

---

## Phase 2 — Core Reader (Week 3–4)

**Goal:** Read a full summary end-to-end

### Deliverables

- [ ] BookCard component with cover, title, read time
- [ ] Discover screen with book grid
- [ ] Book Detail screen (cover, takeaways, action buttons)
- [ ] Markdown Summary Reader screen with scroll tracking
- [ ] Chapter navigation bottom sheet
- [ ] Reading progress bar with Reanimated
- [ ] MMKV progress persistence
- [ ] `PATCH /api/user/progress` endpoint
- [ ] User init flow (deviceId → create or fetch user)

### Tasks

| Task ID | Name | Agent | Skills | Priority | Dependencies | Input → Output → Verify |
|--------|------|-------|--------|----------|--------------|----------------------|
| P2.1 | Create BookCard component | frontend-specialist | React Native, NativeWind | P0 | P1.1 | Build `BookCard.tsx` with cover, title, readTime → Renders correctly → Displays book data |
| P2.2 | Build Discover screen | frontend-specialist | Expo Router | P0 | P1.2, P2.1 | Create `app/(tabs)/discover.tsx` → Grid displays books → Fetch works |
| P2.3 | Build Book Detail screen | frontend-specialist | Expo Router | P0 | P1.2 | Create `app/book/[slug].tsx` → Shows cover, takeaways → Action buttons work |
| P2.4 | Build Summary Reader screen | frontend-specialist | react-native-markdown-display | P0 | P2.3 | Create `app/book/[slug]/summary.tsx` → Markdown renders → Scroll works |
| P2.5 | Add chapter navigation | frontend-specialist | Bottom sheet UI | P0 | P2.4 | Implement `ChapterNav` component → Chapters selectable → Scroll to anchor |
| P2.6 | Add reading progress bar | frontend-specialist | Reanimated | P0 | P2.4 | Implement `ReadingProgressBar.tsx` → Animates on scroll → Percentage accurate |
| P2.7 | Set up MMKV persistence | mobile-developer | MMKV | P0 | P1.1 | Configure `lib/mmkv.ts` → Progress saves → App restart persists |
| P2.8 | Implement user init endpoint | backend-specialist | Next.js API | P0 | P1.5 | Create `POST /api/user/init` → Returns user → Creates if not exists |
| P2.9 | Implement progress endpoint | backend-specialist | Next.js API | P0 | P1.5, P2.8 | Create `PATCH /api/user/progress` → Progress saves → Streak calculates |
| P2.10 | Connect user store to API | mobile-developer | Zustand, API | P0 | P2.7, P2.9 | Build userStore with API sync → Data persists → State updates |

### Success Criteria

- [ ] Discover screen shows Atomic Habits in grid
- [ ] Book Detail shows bigIdea, takeaways list
- [ ] Summary Reader renders full markdown
- [ ] Scroll progress saves to MMKV
- [ ] Progress syncs to MongoDB via API
- [ ] Chapter nav bottom sheet scrolls to chapter

### Git Commit Message

```
feat(phase-2): Core Reader - Full summary reading flow

- Implement BookCard component with cover display
- Build Discover screen with book grid
- Create Book Detail screen with takeaways
- Implement Markdown Summary Reader with scroll tracking
- Add chapter navigation bottom sheet
- Add animated reading progress bar
- Set up MMKV for local progress persistence
- Create user init and progress API endpoints
- Connect user store to Next.js API
```

---

## Phase 3 — Lessons + Flashcards (Week 5–6)

**Goal:** Full lesson + flashcard flow working

### Deliverables

- [ ] Lessons list screen with completion states
- [ ] Lesson detail screen with inline Cloudinary media
- [ ] Key Action banner component
- [ ] Flashcard deck screen
- [ ] Card flip animation with Reanimated + Gesture Handler
- [ ] Swipe left/right mastery tracking
- [ ] `GET /api/books/[slug]/flashcards` endpoint
- [ ] Flashcard progress API + Zustand sync
- [ ] MasteryRing component

### Tasks

| Task ID | Name | Agent | Skills | Priority | Dependencies | Input → Output → Verify |
|--------|------|-------|--------|----------|--------------|----------------------|
| P3.1 | Build Lessons list screen | frontend-specialist | Expo Router | P0 | P2.3 | Create `app/book/[slug]/lessons.tsx` → Displays lessons → Completion states show |
| P3.2 | Build Lesson detail screen | frontend-specialist | expo-image | P0 | P3.1 | Create `app/book/[slug]/lesson/[id].tsx` → Markdown renders �� Images load |
| P3.3 | Create KeyActionBanner | frontend-specialist | NativeWind | P0 | P3.2 | Build `KeyActionBanner.tsx` → Displays action → Tap works |
| P3.4 | Build Flashcard deck screen | frontend-specialist | Reanimated | P0 | P2.3 | Create `app/book/[slug]/flashcards.tsx` → Cards display → Swipe works |
| P3.5 | Implement card flip animation | frontend-specialist | Reanimated v3 | P0 | P3.4 | Create `FlashCard.tsx` with flip → Tap flips card → Animation smooth |
| P3.6 | Implement swipe gestures | frontend-specialist | Gesture Handler v2 | P0 | P3.5 | Add swipe detection → Mastery updates → Progress saves |
| P3.7 | Create flashcards API endpoint | backend-specialist | Next.js API | P0 | P1.5 | Create `GET /api/books/[slug]/flashcards` → Returns cards → Media URLs included |
| P3.8 | Create flashcards progress endpoint | backend-specialist | Next.js API | P0 | P3.7 | Implement `PATCH /api/user/flashcards` → Mastery saves → Review updates |
| P3.9 | Build MasteryRing component | frontend-specialist | SVG, Reanimated | P0 | P3.8 | Create `MasteryRing.tsx` → Animates percentage → Accurate per book |
| P3.10 | Connect flashcard store | mobile-developer | Zustand | P0 | P3.8, P3.9 | Build flashcardStore → API syncs → UI updates |

### Success Criteria

- [ ] Lessons list shows completion checkmarks
- [ ] Lesson detail renders Cloudinary images
- [ ] Key Action displays at lesson end
- [ ] Flashcard flip animation works on tap
- [ ] Swipe right = mastered, swipe left = review
- [ ] MasteryRing shows correct percentage
- [ ] Progress persists to MongoDB

### Git Commit Message

```
feat(phase-3): Lessons + Flashcards - Full learning flow

- Build Lessons list screen with completion states
- Create Lesson detail with Cloudinary media
- Add Key Action banner component
- Implement Flashcard deck with flip animation
- Add swipe gestures for mastery tracking
- Create flashcards API endpoints
- Build MasteryRing component
- Connect flashcard progress to API
```

---

## Phase 4 — Engagement Layer (Week 7–8)

**Goal:** Users have a reason to return daily

### Deliverables

- [ ] Streak system (server-side logic + client display)
- [ ] Highlight long-press + color picker
- [ ] Highlights saved to MongoDB
- [ ] Highlights screen grouped by book
- [ ] Notes on highlights
- [ ] Big Idea share card (Cloudinary transform)
- [ ] Push notification setup with expo-notifications
- [ ] Seed remaining 9 books fully
- [ ] Weekly goal setting on profile

### Tasks

| Task ID | Name | Agent | Skills | Priority | Dependencies | Input → Output → Verify |
|--------|------|-------|--------|----------|--------------|----------------------|
| P4.1 | Implement streak logic | backend-specialist | Streak calculation | P0 | P2.9 | Update progress endpoint with streak logic → Streak increments → Resets on gap |
| P4.2 | Build StreakWidget | frontend-specialist | NativeWind | P0 | P4.1 | Create `StreakWidget.tsx` → Shows streak → Calendar dots work |
| P4.3 | Build highlight menu | frontend-specialist | Gesture Handler | P0 | P2.4 | Create `HighlightMenu.tsx` → 4 colors → Long-press triggers |
| P4.4 | Create highlights API | backend-specialist | Next.js API | P0 | P1.5 | Implement POST/GET/PATCH/DELETE highlights → Saves to MongoDB |
| P4.5 | Build Highlights screen | frontend-specialist | Expo Router | P0 | P4.4 | Create `app/highlights.tsx` → Groups by book → Export works |
| P4.6 | Add notes on highlights | frontend-specialist | Text input | P0 | P4.5 | Add note field → Saves → Displays on tap |
| P4.7 | Create share card component | frontend-specialist | Cloudinary transform | P0 | P1.7 | Create `ShareCard.tsx` → Generates card → Share sheet works |
| P4.8 | Set up push notifications | mobile-developer | expo-notifications | P0 | P1.1 | Configure notifications → Permission asks → Scheduled reminders work |
| P4.9 | Seed remaining 9 books | backend-specialist | Mongoose seeding | P0 | P1.8 | Run seed for 9 more books → DB has 10 books → All lessons + flashcards |
| P4.10 | Add weekly goal setting | frontend-specialist | Settings UI | P0 | P4.9 | Add goal picker on profile → Saves → API updates |

### Success Criteria

- [ ] Streak increments on daily activity
- [ ] Long-press shows color picker
- [ ] Highlights save to MongoDB
- [ ] Highlights screen groups by book
- [ ] Notes save and display
- [ ] Share card generates and shares
- [ ] Push notifications schedule
- [ ] 10 books display in Discover
- [ ] Weekly goal configurable

### Git Commit Message

```
feat(phase-4): Engagement Layer - Streak, highlights, notifications

- Implement server-side streak calculation
- Build StreakWidget component
- Add highlight long-press with color picker
- Create highlights API endpoints
- Build Highlights screen grouped by book
- Add notes on highlights
- Create Big Idea share card with Cloudinary
- Set up expo-notifications
- Seed remaining 9 books
- Add weekly goal setting on profile
```

---

## Phase 5 — Polish + Launch (Week 9–10)

**Goal:** App Store ready

### Deliverables

- [ ] Onboarding flow (3-screen intro + pick 3 books)
- [ ] Screen transition animations
- [ ] Dark / Sepia reader themes
- [ ] App icon + splash screen
- [ ] Performance audit (FlatList optimization, image caching)
- [ ] Offline-first: cache last 2 books in MMKV
- [ ] TestFlight (iOS) + Play Console beta (Android)
- [ ] Error boundary + Sentry integration
- [ ] README + deployment docs

### Tasks

| Task ID | Name | Agent | Skills | Priority | Dependencies | Input → Output → Verify |
|--------|------|-------|--------|----------|--------------|----------------------|
| P5.1 | Build onboarding flow | frontend-specialist | Expo Router | P0 | P4.9 | Create `app/onboarding/` → 3 screens → Book picker works |
| P5.2 | Add screen transitions | frontend-specialist | Reanimated | P0 | P1.1 | Add shared element transitions → Smooth navigation → No jank |
| P5.3 | Implement Dark/Sepia themes | frontend-specialist | NativeWind | P0 | P1.1 | Add theme store options → Switch applies → Reader themed |
| P5.4 | Create app icon + splash | mobile-developer | Expo assets | P0 | P1.1 | Generate icon + splash → Displays correctly → Launch shows splash |
| P5.5 | Performance audit | performance-optimizer | Profiling | P0 | All phases | Run trace → FlatList optimized → Images cached |
| P5.6 | Implement offline cache | mobile-developer | MMKV | P0 | P2.7 | Cache last 2 books → Offline reads work → Sync on connect |
| P5.7 | Create error boundary | mobile-developer | Error handling | P0 | P1.1 | Wrap screens → Errors caught → Recovery works |
| P5.8 | Set up Sentry | mobile-developer | Sentry | P0 | P5.7 | Configure Sentry → Errors track → Source maps work |
| P5.9 | Build iOS for TestFlight | mobile-developer | Expo build | P0 | P5.4 | `eas build --platform ios` → APK/IPA generates → TestFlight ready |
| P5.10 | Build Android beta | mobile-developer | Expo build | P0 | P5.4 | `eas build --platform android` → AAB generates → Play Console ready |
| P5.11 | Write README + docs | documentation-templates | Docs | P0 | All phases | Document setup → Deployment guide → API reference |

### Success Criteria

- [ ] Onboarding flow completes
- [ ] All 3 themes work
- [ ] App icon + splash display
- [ ] Performance scores acceptable
- [ ] Offline reading works
- [ ] Errors capture to Sentry
- [ ] iOS builds for TestFlight
- [ ] Android builds for Play Console
- [ ] Documentation complete

### Git Commit Message

```
feat(phase-5): Polish + Launch - App Store ready

- Build 3-screen onboarding flow with book picker
- Add screen transition animations
- Implement Dark/Sepia reader themes
- Create app icon and splash screen
- Performance audit and optimization
- Implement offline-first caching
- Add error boundary + Sentry integration
- Build for iOS TestFlight
- Build for Android Play Console
- Document setup and deployment
```

---

## User-Provided Credentials

### Where Each Credential Will Be Needed

| Credential | Purpose | Phase | File to Configure |
|------------|---------|-------|------------------|
| `MONGODB_URI` | MongoDB Atlas connection string | 1 | `mindleaf-api/.env.local` |
| `CLOUDINARY_CLOUD_NAME` | Cloud account name | 1 | `mindleaf-api/.env.local`, `mindleaf-app/lib/cloudinary.ts` |
| `CLOUDINARY_API_KEY` | API key for uploads | 1 | `mindleaf-api/.env.local` |
| `CLOUDINARY_API_SECRET` | Secret for signed URLs | 1 | `mindleaf-api/.env.local` (server-only) |

### Configuration Steps

1. **MongoDB Atlas**
   - Create cluster in MongoDB Atlas
   - Get connection string from "Connect" → "Drivers"
   - Replace `<password>` with actual password
   - Add to `.env.local` as `MONGODB_URI=mongodb+srv://...`

2. **Cloudinary**
   - Create Cloudinary account at cloudinary.com
   - Note your `cloud_name` from dashboard
   - Go to Settings → Upload → Add upload preset (unsigned for app)
   - Generate API key/secret from Settings → API Keys
   - Add to `.env.local`

---

## Phase X: Verification

### Pre-Phase Checklist

- [ ] Lint passes: `npm run lint` (if configured)
- [ ] Type check passes: `npx tsc --noEmit`
- [ ] Build succeeds: `expo prebuild && cd ios && xcodebuild build` or `eas build`
- [ ] All API endpoints return valid JSON
- [ ] No hardcoded secrets in client code

### Post-Phase Checklist (Run after Each Phase)

| Phase | Verification | Command |
|-------|--------------|---------|
| 1 | API returns seeded book | `curl http://localhost:3000/api/books/atomic-habits` |
| 2 | Progress persists | Read summary, close app, reopen - progress visible |
| 3 | Flashcard mastery saves | Complete deck, check MasteryRing |
| 4 | Streak increments | Perform daily activity, check streak count |
| 5 | Build succeeds | `eas build --platform ios` completes |

### Phase Completion Markers

```markdown
## Phase 1 Complete
- [x] API returns Atomic Habits: verified
- [x] App shell launches: verified
- Date: [fill in]
- Commit: [SHA]

## Phase 2 Complete
- [x] Summary reader works end-to-end: verified
- [x] Progress saves to MMKV: verified
- Date: [fill in]
- Commit: [SHA]

## Phase 3 Complete
- [x] Lessons show completion states: verified
- [x] Flashcards mastery works: verified
- Date: [fill in]
- Commit: [SHA]

## Phase 4 Complete
- [x] Streak calculates correctly: verified
- [x] Highlights save to DB: verified
- Date: [fill in]
- Commit: [SHA]

## Phase 5 Complete
- [x] iOS build succeeds: verified
- [x] Android build succeeds: verified
- Date: [fill in]
- Commit: [SHA]
```

---

## Next Steps

After this plan is approved:

1. **Start Phase 1** - Initialize Expo project and Next.js API
2. Request credentials (`MONGODB_URI`, Cloudinary keys) before Phase 1 completes
3. Commit after each phase per the commit messages defined above

---

## Notes

- **No authentication in MVP** - Device ID serves as user identifier (see PRD Section 13)
- **10 books, quality over quantity** - Core promise is curated content
- **Mobile-only for v1** - No web version planned
- **Free during beta** - No monetization in v1.0