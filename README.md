# CXC Ace — Caribbean Exam Prep

> Smart, modern exam preparation platform for **CSEC** and **CAPE** students across the Caribbean.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Features

| Category | Features |
|----------|----------|
| **Quiz Engine** | MCQ practice by subject & topic, 3 difficulty levels (Easy/Medium/Hard), instant feedback with detailed explanations, bookmark questions for review |
| **AI Tutor** | Real AI-powered tutoring with conversation history, subject-aware responses, Caribbean curriculum context |
| **Flashcards** | Create custom decks, SM-2 spaced repetition algorithm, progress tracking per card |
| **Notes** | Rich note-taking with color coding, pin important notes, share with the community |
| **Study Timer** | Pomodoro timer with configurable intervals, study session logging, subject-specific tracking |
| **Progress Analytics** | Per-subject accuracy tracking, topic-level breakdowns, study streaks, weekly/all-time leaderboards |
| **Gamification** | Coin rewards system, achievements/badges, virtual shop with avatars & themes, experience levels |
| **Exam Tools** | Exam countdowns with date tracking, SBA (School-Based Assessment) templates by subject |
| **Content** | 9 subjects (7 CSEC + 2 CAPE), 120+ curated questions, detailed solution explanations |
| **UX** | Dark mode, mobile-first responsive design, smooth animations, data export |

## Subjects Covered

**CSEC:**
- Mathematics
- English A
- Biology
- Chemistry
- Physics
- History
- Geography

**CAPE:**
- Pure Mathematics Unit 1
- Caribbean Studies

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions)
- **Language:** TypeScript
- **Database:** SQLite + Prisma ORM
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, Framer Motion
- **State:** Zustand
- **Auth:** bcryptjs password hashing (local auth)
- **AI:** z-ai-web-dev-sdk for AI tutoring
- **Icons:** Lucide React

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cxc-ace.git
cd cxc-ace

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client, create database, and seed data
npm run setup

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```env
DATABASE_URL="file:./db/cxc.db"
```

## Project Structure

```
cxc-ace/
├── prisma/
│   ├── schema.prisma      # Database schema (17 tables)
│   └── seed.ts            # Seed data (120+ questions, 9 subjects, achievements)
├── src/
│   ├── app/
│   │   ├── page.tsx       # Main app entry (SPA with hash routing)
│   │   ├── layout.tsx     # Root layout with ThemeProvider
│   │   ├── globals.css    # Global styles
│   │   ├── api/           # API routes
│   │   │   ├── route.ts            # GET /api (subjects list)
│   │   │   ├── auth/route.ts       # POST register/login, GET session
│   │   │   ├── questions/route.ts  # Questions CRUD, bookmarks
│   │   │   ├── progress/route.ts   # Quiz submissions, stats, analytics
│   │   │   ├── flashcards/route.ts # Decks/cards CRUD, SM-2 reviews
│   │   │   ├── tutor/route.ts      # AI tutor chat
│   │   │   ├── notes/route.ts      # Notes CRUD, sharing
│   │   │   ├── study/route.ts      # Pomodoro session logging
│   │   │   ├── leaderboard/route.ts# Rankings
│   │   │   ├── exams/route.ts      # Exam countdown CRUD
│   │   │   ├── shop/route.ts       # Shop items, purchases
│   │   │   ├── sba/route.ts        # SBA templates
│   │   │   └── export/route.ts     # Data export (JSON)
│   │   ├── components/     # React components
│   │   │   ├── AuthScreen.tsx      # Login/Register UI
│   │   │   ├── HomeDashboard.tsx   # Home with stats & quick actions
│   │   │   ├── QuizViews.tsx       # Subject selection, config, quiz taking
│   │   │   ├── StudyViews.tsx      # AI Tutor, Notes, Timer, Flashcards tabs
│   │   │   ├── AITutor.tsx         # Chat-based AI tutor interface
│   │   │   ├── FlashcardsView.tsx  # Flashcard decks & review
│   │   │   ├── NotesView.tsx       # Notes editor & list
│   │   │   ├── ProgressViews.tsx   # Analytics, leaderboard, bookmarks
│   │   │   ├── SocialViews.tsx     # Shop view
│   │   │   └── ProfileViews.tsx    # Profile, exams, SBA, settings
│   │   └── lib/
│   │       ├── store.tsx   # Zustand store (types, state, utilities)
│   │       └── icons.ts    # Lucide icon re-exports
│   ├── lib/
│   │   └── db.ts           # Prisma client singleton
│   └── components/ui/      # shadcn/ui components
├── public/
│   ├── logo.svg
│   └── robots.txt
├── .env.example
├── .gitignore
├── LICENSE
├── CONTRIBUTING.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Database Schema

The app uses SQLite with 17 tables via Prisma ORM:

- **Users** — Authentication, roles (Student/Parent/Teacher), streaks, coins
- **Subjects & Topics** — 9 subjects with 50+ topics
- **Questions** — MCQ/essay with difficulty levels, explanations, bookmarks
- **Progress Tracking** — Per-question, per-topic, per-subject accuracy
- **Flashcards** — Decks, cards, SM-2 spaced repetition (ease, interval, repetitions)
- **Notes** — User notes with color coding, sharing, pinning
- **Study Sessions** — Pomodoro timer logs with subject/topic association
- **Achievements** — 18 unlockable badges across categories
- **Leaderboard** — Weekly score rankings
- **Shop** — Virtual items purchasable with coins
- **Exam Countdowns** — Upcoming exam date tracking
- **SBA Templates** — Subject-specific School-Based Assessment templates
- **Content Submissions** — User-submitted questions pending review

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run setup` | Generate Prisma client, push schema, seed data |
| `npm run db:seed` | Seed the database with sample data |
| `npm run db:push` | Push schema changes to database |
| `npm run db:reset` | Reset the database (destructive) |

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | List all subjects with topics and question counts |
| POST | `/api/auth` | Register or login |
| GET | `/api/auth?userId=xxx` | Get user session |
| GET/POST/DELETE | `/api/questions` | Questions CRUD, bookmarks, content submission |
| POST | `/api/progress` | Submit quiz answers, get stats and analytics |
| GET/POST/PUT/DELETE | `/api/flashcards` | Deck/card management, SM-2 spaced repetition |
| POST | `/api/tutor` | AI tutor chat completion |
| GET/POST/PUT/DELETE | `/api/notes` | Notes CRUD, community notes |
| POST | `/api/study` | Log study/Pomodoro sessions |
| GET | `/api/leaderboard` | Weekly and all-time rankings |
| GET/POST/DELETE | `/api/exams` | Exam countdown management |
| GET | `/api/shop` | Browse shop items |
| POST | `/api/shop` | Purchase items with coins |
| GET | `/api/sba` | Browse SBA templates |
| GET | `/api/export` | Export all user data as JSON |

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick contribution steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## Roadmap

- [ ] PWA support (service worker, offline mode)
- [ ] Push notifications for streak reminders & exam alerts
- [ ] Multi-language support (Spanish, French)
- [ ] Parent/Teacher dashboard
- [ ] Audio explanations (text-to-speech)
- [ ] Additional subjects (Information Technology, Principles of Accounts)
- [ ] Community question review system
- [ ] Performance optimizations (virtualization, code splitting)
- [ ] Accessibility improvements (ARIA, keyboard navigation)

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

Built for Caribbean students, by Caribbean students.
