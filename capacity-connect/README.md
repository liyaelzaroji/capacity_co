# Capacity Connect — Frontend Prototype

A frontend-only React + Tailwind build of the Capacity Connect portal, with
the three additions layered on top of the base guide:

1. **Random trainer-rating sampling** — the trainee dashboard simulates the
   platform picking 3–5 trainers for the logged-in trainee to rate
   (`src/pages/TraineeDashboard.jsx`, see `RateTrainers`).
2. **Trainer two-step verification** — resume/credential upload produces an
   "extracted background" panel (clearly labeled as self-reported and
   possibly biased), which only becomes official once the trainer passes a
   subject qualification test (`src/pages/TrainerDashboard.jsx`, see
   `Verification`).
3. **Certifications & credits** — trainer tiers (Bronze/Silver/Gold), star
   ratings, "Top X%" tags, and a credit balance with a ledger of how credits
   are earned (`src/pages/TrainerDashboard.jsx`, see `Certifications`;
   trainee-side badges live in `TraineeDashboard.jsx`, see `Certificates`).

Everything is mock data in `src/data/mockData.js` and
`src/data/qualificationTest.js` — there is no backend here. Wire it up
against the API described in the build guide when you're ready (Phase 1
onward).

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Try the three features

- Go to **Sign in → Trainee tab → Sign in**, then open **Rate your
  trainers** in the sidebar.
- Go to **Sign in → Trainer tab → Sign in**, then open **Verification** —
  upload the resume (mock button), read the extracted panel, then click
  **Start test** and answer the 5 questions to see Step 1 and Step 2 both
  clear.
- From the same Trainer session, open **Certifications & credits** to see
  the tier badge, stars, "Top X%" tag, and credit ledger.

## Structure

```
src/
  components/    Navbar, Sidebar, StarRating, TierBadge — shared UI
  data/          mock data + the qualification test bank
  pages/         Landing, Login, and the three role dashboards
  App.jsx        routes + a simple in-memory session (no real auth)
```

## Notes for wiring up the backend

- Swap `onLogin` in `App.jsx` for a real API call, and store a JWT instead
  of just `{ role, name }` in memory.
- The qualification test bank in `src/data/qualificationTest.js` ships
  correct answers to the browser — that's fine for this demo, but per the
  build guide's own rule, grading and correct answers must move to the
  backend before this goes anywhere real.
- `mockData.js` mirrors the schema in the build guide (Part 4) closely
  enough that swapping in real API responses should mostly be a drop-in.
