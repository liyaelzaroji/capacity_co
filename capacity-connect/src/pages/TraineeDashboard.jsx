import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import StarRating from "../components/StarRating.jsx";
import TierBadge from "../components/TierBadge.jsx";
import { trainers, traineeCourses, certificates } from "../data/mockData.js";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "courses", label: "My courses" },
  { key: "rate", label: "Rate your trainers" },
  { key: "certificates", label: "Certificates" },
];

export default function TraineeDashboard({ name }) {
  const [active, setActive] = useState("overview");

  // The platform periodically samples 3–5 trainees per trainer and asks
  // them to rate that trainer. This simulates "this trainee was picked"
  // by drawing from trainers tied to courses this trainee has actually
  // taken, capped to a random 3–5.
  const [selectedForRating] = useState(() => pickRandom(trainers, rand(3, 5)));
  const [rated, setRated] = useState({});

  const pendingCount = selectedForRating.filter((t) => !rated[t.id]).length;

  const navWithBadge = NAV.map((n) =>
    n.key === "rate" && pendingCount ? { ...n, badge: pendingCount } : n
  );

  const completedCourses = traineeCourses.filter((c) => c.status === "Completed").length;
  const avgScore = Math.round(
    traineeCourses.filter((c) => c.score).reduce((s, c) => s + c.score, 0) /
      Math.max(1, traineeCourses.filter((c) => c.score).length)
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header>
        <p className="font-mono text-xs uppercase tracking-wide text-teal-deep">
          Trainee dashboard
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink">Welcome back, {name}.</h1>
      </header>

      <div className="mt-8 flex gap-10">
        <Sidebar items={navWithBadge} active={active} onSelect={setActive} />

        <div className="min-w-0 flex-1">
          {active === "overview" && (
            <Overview
              completedCourses={completedCourses}
              avgScore={avgScore}
              certCount={certificates.length}
              pendingCount={pendingCount}
              onGoRate={() => setActive("rate")}
            />
          )}
          {active === "courses" && <Courses />}
          {active === "rate" && (
            <RateTrainers
              selected={selectedForRating}
              rated={rated}
              onRate={(id, stars) => setRated((r) => ({ ...r, [id]: stars }))}
            />
          )}
          {active === "certificates" && <Certificates />}
        </div>
      </div>
    </div>
  );
}

function Overview({ completedCourses, avgScore, certCount, pendingCount, onGoRate }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Courses completed" value={completedCourses} />
        <StatCard label="Average assessment score" value={`${avgScore || "—"}%`} />
        <StatCard label="Certificates earned" value={certCount} />
      </div>

      {pendingCount > 0 && (
        <div className="mt-6 flex items-center justify-between rounded-md border border-amber/40 bg-amber/10 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-ink">
              You've been selected to rate {pendingCount} trainer{pendingCount > 1 ? "s" : ""}
            </p>
            <p className="mt-0.5 text-sm text-slate2">
              Takes under a minute — your input feeds directly into their
              competency score.
            </p>
          </div>
          <button
            onClick={onGoRate}
            className="shrink-0 rounded-md bg-ink px-4 py-2 text-sm text-mist hover:bg-teal-deep"
          >
            Rate now
          </button>
        </div>
      )}

      <h2 className="mt-10 font-display text-xl text-ink">Continue learning</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {traineeCourses
          .filter((c) => c.status !== "Completed")
          .map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
      </div>
    </div>
  );
}

function Courses() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {traineeCourses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
}

function CourseCard({ course }) {
  const trainer = trainers.find((t) => t.id === course.trainerId);
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-snug text-ink">{course.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            course.status === "Completed"
              ? "bg-teal/10 text-teal-deep"
              : "bg-amber/15 text-amber"
          }`}
        >
          {course.status}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-slate2">with {trainer?.name}</p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-teal"
          style={{ width: `${course.progress}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-xs text-slate2">
        <span>{course.progress}% complete</span>
        {course.score ? <span>Score: {course.score}%</span> : null}
      </div>
    </div>
  );
}

function RateTrainers({ selected, rated, onRate }) {
  return (
    <div>
      <h2 className="font-display text-xl text-ink">Rate your trainers</h2>
      <p className="mt-1.5 max-w-lg text-sm text-slate2">
        The platform randomly samples a handful of trainees per trainer each
        cycle — you were one of them. Ratings are anonymous to the trainer.
      </p>

      <div className="mt-6 flex flex-col divide-y divide-line rounded-md border border-line bg-white">
        {selected.map((t) => (
          <div key={t.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="font-medium text-ink">{t.name}</p>
              <p className="text-sm text-slate2">{t.subject}</p>
            </div>
            {rated[t.id] ? (
              <div className="flex items-center gap-2 text-sm text-teal-deep">
                <StarRating value={rated[t.id]} />
                <span>Thanks for the feedback</span>
              </div>
            ) : (
              <StarRating interactive value={0} onChange={(n) => onRate(t.id, n)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Certificates() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {certificates.map((c) => (
        <div key={c.id} className="rounded-md border border-line bg-white p-5">
          <div className="flex items-start justify-between">
            <h3 className="font-display text-lg text-ink">{c.course}</h3>
            <TierBadge tier={c.tier} topPercent={c.topPercent} size="sm" />
          </div>
          <div className="mt-2">
            <StarRating value={c.stars} size={14} />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="font-mono text-xs text-slate2">{c.id}</span>
            <span className="text-xs text-slate2">Issued {c.issued}</span>
          </div>
          <button className="mt-4 w-full rounded-md border border-line py-2 text-sm text-ink hover:border-teal hover:text-teal-deep">
            Download PDF
          </button>
        </div>
      ))}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <p className="font-display text-3xl text-ink">{value}</p>
      <p className="mt-1 text-sm text-slate2">{label}</p>
    </div>
  );
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr, n) {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}
