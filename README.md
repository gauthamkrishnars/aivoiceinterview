# VoicePrep

AI voice interview practice. You talk, the AI responds, you get scored.

## Quick start

```bash
npm install
cp .env.example .env    # fill in your DATABASE_URL
npx prisma generate
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Only `DATABASE_URL` is required. Everything else is optional.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Postgres connection string (`postgresql://user:pass@host:5432/db`) |
| `NEXTAUTH_SECRET` | No | Random string for session signing |
| `VAPI_API_KEY` | No | For Vapi voice integration (not wired yet) |
| `OPENAI_API_KEY` | No | For OpenAI integration (not wired yet) |

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Set `DATABASE_URL` in Vercel → Settings → Environment Variables (Production)
4. Deploy. The build script runs `prisma generate` and `prisma db push` automatically.

## Database

Uses Prisma with Postgres. Schema is in `prisma/schema.prisma`.

Models:
- **User** — email/password auth + guest sessions
- **Interview** — role, tech stack, question bank (JSON)
- **Session** — transcript, feedback, scores

## Project structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── auth/          # Login, signup, guest
│   ├── create/        # Interview creation wizard
│   ├── dashboard/     # Session history
│   ├── feedback/      # Post-interview results
│   └── interview/     # Voice interview session
├── components/
│   ├── layout/        # Navbar, Footer
│   └── ui/            # Button, Card, Modal, etc.
├── lib/
│   ├── auth.ts        # Password hashing, user CRUD
│   └── prisma.ts      # Prisma client singleton
└── types/             # TypeScript interfaces
```

## How it works

1. Create an account or continue as guest
2. Pick your role, experience level, and tech stack
3. Answer questions using your mic (browser Speech API)
4. Get scored on communication, technical depth, and confidence
5. Review your transcript and practice exercises

## Tech stack

- Next.js 14 (App Router)
- Prisma + Postgres
- Tailwind CSS
- Browser Web Speech API (no external voice service needed)
