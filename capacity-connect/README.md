# Capacity Connect — Frontend Prototype

A frontend-only React + Tailwind build of the Capacity Connect portal.
Everything is mock data (`src/data/mockData.js`, `src/data/qualificationTest.js`) —
there is no backend here. Wire it up against the API described in the build
guide when you're ready.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## What's in it

**Trainer signup wizard** (`/login?role=trainer`, then "Create an account")
walks through four steps: account details → work experience (add multiple
roles) → a 5-question subject skill test → a "submitted, pending admin
approval" screen showing the score. The application (name, subject, work
experience, skill score) lands directly in the admin's verification queue —
so you can demo it end to end in one browser tab: sign up as a trainer, take
the test, then sign out and sign in as **Admin** to see and approve that
exact application.

**Trainer dashboard** (sign in as Trainer — a pre-seeded, already-logged-in
demo trainer, Suresh Menon):
- **Work experience** — read-only view of what was entered at signup.
- **Verification** — the two-step check (resume/document extraction, then
  the qualification test) for an existing account, separate from the
  signup-time version above.
- **Trainee reviews** — the platform samples 3 trainees at random from this
  trainer's own student roster and asks for a detailed written review, not
  just stars. Two of the three have already submitted (dummy data); the
  third shows "awaiting response" so you can see both states.
- **Certifications & credits** — tier badge (Bronze/Silver/Gold), stars,
  "Top X%" tag, credit balance, progress to the next tier, and a ledger of
  how credits are earned.

**Trainee dashboard** — "Rate your trainers" now collects a star rating
*and* a written comment, sampled from trainers tied to courses the trainee
has actually taken.

**Admin dashboard**:
- **Verification queue** — each application shows the applicant's skill-test
  score front and center next to their claimed work experience, with
  Approve/Reject actions. Scores under 70% are flagged.
- **Competency map** — grouped by subject, showing trainer count, *average
  skill-test score* (not just headcount), and every trainer's individual
  score as a chip — so a subject with plenty of trainers but a weak bench
  still shows up correctly.

## Demo script

1. Landing page → **Apply as a trainer** → fill the account step → add a
   work-experience entry → take the 5-question test → see your score and
   the "pending approval" screen.
2. Sign out → sign in as **Admin** → **Verification queue** → find the
   application you just submitted → approve or reject it based on the score.
3. Sign in as **Trainer** (pre-seeded demo account) → walk through **Work
   experience**, **Verification**, **Trainee reviews**, and
   **Certifications & credits**.
4. Sign in as **Trainee** → **Rate your trainers** → leave a star rating and
   a written comment for one of the sampled trainers.

## Structure

```
src/
  components/    Navbar, Sidebar, StarRating, TierBadge, SkillTestForm
  data/          mock data + the qualification/skill test question bank
  pages/         Landing, Login (signup wizard), and the three dashboards
  App.jsx        routes + in-memory session + shared trainer-application queue
```

## Notes for wiring up the backend

- Swap `onLogin`/`onApply` in `App.jsx` for real API calls; store a JWT
  instead of `{ role, name }` in memory, and move `applications` state to
  the server.
- The skill-test bank in `src/data/qualificationTest.js` ships correct
  answers to the browser — fine for this demo, but grading and correct
  answers need to move server-side before this goes anywhere real.
- `mockData.js` mirrors the schema in the build guide closely enough that
  swapping in real API responses should mostly be a drop-in, including the
  new `workExperience`, `skillScore`, `trainerStudents`, and `reviews`
  shapes.
