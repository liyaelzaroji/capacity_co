import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import TierBadge from "../components/TierBadge.jsx";
import StarRating from "../components/StarRating.jsx";
import {
  trainers,
  verificationSteps as initialSteps,
  trainerStudents,
  reviews as allReviews,
} from "../data/mockData.js";
import { questions, gradeAnswers } from "../data/qualificationTest.js";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "experience", label: "Work experience" },
  { key: "verification", label: "Verification" },
  { key: "reviews", label: "Trainee reviews" },
  { key: "certifications", label: "Certifications & credits" },
  { key: "trainees", label: "Trainee performance" },
];

const me = trainers[1]; // Suresh Menon — mid-tier, mid-verification, good demo case

export default function TrainerDashboard({ name }) {
  const [active, setActive] = useState("overview");
  const [steps, setSteps] = useState(initialSteps);
  const overallStatus = deriveStatus(steps);

  // The platform periodically samples 3 trainees from THIS trainer's own
  // roster and asks them to leave a detailed review. Picked once per
  // session so it stays stable while you click around the dashboard.
  const roster = trainerStudents[me.id] || [];
  const [sampledReviewers] = useState(() => pickRandom(roster, Math.min(3, roster.length)));
  const reviewsForMe = allReviews.filter((r) => r.trainerId === me.id);
  const pendingReviews = sampledReviewers.filter(
    (s) => !reviewsForMe.some((r) => r.traineeName === s.name)
  ).length;

  const navWithBadge = NAV.map((n) => {
    if (n.key === "verification" && overallStatus !== "Verified") return { ...n, badge: "!" };
    if (n.key === "reviews" && pendingReviews) return { ...n, badge: pendingReviews };
    return n;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-crimson">
            Trainer dashboard
          </p>
          <h1 className="mt-1 font-display text-3xl text-ink">Welcome back, {name}.</h1>
        </div>
        <StatusPill status={overallStatus} />
      </header>

      <div className="mt-8 flex gap-10">
        <Sidebar items={navWithBadge} active={active} onSelect={setActive} />

        <div className="min-w-0 flex-1">
          {active === "overview" && <Overview steps={steps} />}
          {active === "experience" && <WorkExperience />}
          {active === "verification" && (
            <Verification steps={steps} setSteps={setSteps} />
          )}
          {active === "reviews" && (
            <Reviews sampled={sampledReviewers} reviews={reviewsForMe} />
          )}
          {active === "certifications" && <Certifications />}
          {active === "trainees" && <TraineePerformance />}
        </div>
      </div>
    </div>
  );
}

function deriveStatus(steps) {
  if (steps.documentReview.status === "cleared" && steps.qualificationTest.status === "passed") {
    return "Verified";
  }
  if (steps.qualificationTest.status === "failed") return "Needs re-test";
  return "Pending verification";
}

function StatusPill({ status }) {
  const styles =
    status === "Verified"
      ? "bg-teal/10 text-teal-deep border-teal/30"
      : status === "Needs re-test"
      ? "bg-crimson/10 text-crimson border-crimson/30"
      : "bg-amber/15 text-amber border-amber/40";
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function Overview({ steps }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Students taught" value={me.students} />
        <StatCard label="Courses completed" value={me.coursesCompleted} />
        <StatCard label="Average rating" value={me.avgRating.toFixed(1)} />
        <StatCard label="Credits" value={me.credits.toLocaleString()} />
      </div>

      {deriveStatus(steps) !== "Verified" && (
        <div className="mt-6 rounded-md border border-amber/40 bg-amber/10 px-5 py-4 text-sm text-ink">
          Your account is not fully verified yet — trainees won't see your
          courses in search until both verification steps clear.
        </div>
      )}

      <h2 className="mt-10 font-display text-xl text-ink">Your standing</h2>
      <div className="mt-4 flex items-center gap-4 rounded-md border border-line bg-white p-5">
        <TierBadge tier={me.tier} topPercent={me.topPercent} />
        <StarRating value={me.avgRating} />
        <span className="font-mono text-xs text-slate2">
          {me.avgRating.toFixed(1)} / 5 across {me.students} trainees
        </span>
      </div>
    </div>
  );
}

function WorkExperience() {
  return (
    <div>
      <h2 className="font-display text-xl text-ink">Work experience</h2>
      <p className="mt-1.5 max-w-lg text-sm text-slate2">
        What you entered at signup. This is what the admin cross-checks
        against your skill-test score — keep it accurate.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        {me.workExperience.map((w, i) => (
          <div key={i} className="rounded-md border border-line bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-lg text-ink">{w.role}</p>
              <span className="font-mono text-xs text-slate2">{w.years} yrs</span>
            </div>
            <p className="text-sm text-slate2">{w.org}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{w.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Verification({ steps, setSteps }) {
  const [uploaded, setUploaded] = useState(true); // demo starts post-upload
  const [testOpen, setTestOpen] = useState(false);
  const doc = steps.documentReview;
  const test = steps.qualificationTest;

  function handleUpload() {
    setUploaded(true);
  }

  function handleTestSubmit(answers) {
    const score = gradeAnswers(answers);
    const passed = score >= test.passScore;
    setSteps((s) => ({
      ...s,
      qualificationTest: {
        ...s.qualificationTest,
        status: passed ? "passed" : "failed",
        score,
        attempts: s.qualificationTest.attempts + 1,
      },
      documentReview: passed
        ? { ...s.documentReview, status: "cleared" }
        : s.documentReview,
    }));
    setTestOpen(false);
  }

  return (
    <div>
      <h2 className="font-display text-xl text-ink">Two-step verification</h2>
      <p className="mt-1.5 max-w-lg text-sm text-slate2">
        We don't take a resume's word for it. Step 1 extracts what you
        claim; Step 2 tests whether you actually know the subject. Admin
        approval in the queue is based on this score, not your resume alone.
      </p>

      {/* Step 1 */}
      <div className="mt-6 rounded-md border border-line bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-ink">
            Step 1 — Resume &amp; document review
          </h3>
          <StepStatus status={uploaded ? doc.status : "not_started"} />
        </div>

        {!uploaded ? (
          <button
            onClick={handleUpload}
            className="mt-4 rounded-md border border-dashed border-line px-4 py-3 text-sm text-slate2 hover:border-teal hover:text-teal-deep"
          >
            Upload resume, degree certificate & ID (PDF/JPG)
          </button>
        ) : (
          <>
            <div className="mt-4 rounded-md bg-amber/10 px-4 py-3 text-xs leading-relaxed text-ink">
              This summary is extracted from what you submitted — it's
              self-reported and may be biased in your favor. It stays
              unofficial until Step 2 confirms you independently.
            </div>
            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <Detail label="Name" value={doc.extracted.name} />
              <Detail label="Qualification" value={doc.extracted.qualification} />
              <Detail label="Experience" value={doc.extracted.experience} />
              <Detail label="Prior training" value={doc.extracted.priorTraining} />
            </dl>
          </>
        )}
      </div>

      {/* Step 2 */}
      <div className="mt-4 rounded-md border border-line bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-ink">
            Step 2 — Subject qualification test
          </h3>
          <StepStatus status={test.status} />
        </div>
        <p className="mt-2 text-sm text-slate2">
          {questions.length} questions on {me.subject}. Pass mark:{" "}
          {test.passScore}%.
        </p>

        {test.status === "passed" || test.status === "failed" ? (
          <p className="mt-3 text-sm">
            Last score:{" "}
            <span className="font-mono font-medium text-ink">{test.score}%</span>{" "}
            {test.status === "passed" ? (
              <span className="text-teal-deep">— passed</span>
            ) : (
              <span className="text-crimson">— below pass mark, try again</span>
            )}
          </p>
        ) : null}

        {!uploaded ? (
          <p className="mt-4 text-sm text-slate2">Complete Step 1 first.</p>
        ) : test.status !== "passed" ? (
          <button
            onClick={() => setTestOpen(true)}
            className="mt-4 rounded-md bg-ink px-4 py-2 text-sm text-mist hover:bg-crimson-deep"
          >
            {test.attempts > 0 ? "Retake test" : "Start test"}
          </button>
        ) : null}
      </div>

      {testOpen && <QualificationTest onClose={() => setTestOpen(false)} onSubmit={handleTestSubmit} />}
    </div>
  );
}

function StepStatus({ status }) {
  const map = {
    not_started: { text: "Not started", cls: "bg-line text-slate2" },
    flagged: { text: "Extracted — unofficial", cls: "bg-amber/15 text-amber" },
    cleared: { text: "Cleared", cls: "bg-teal/10 text-teal-deep" },
    in_progress: { text: "In progress", cls: "bg-amber/15 text-amber" },
    passed: { text: "Passed", cls: "bg-teal/10 text-teal-deep" },
    failed: { text: "Below pass mark", cls: "bg-crimson/10 text-crimson" },
  };
  const s = map[status] || map.not_started;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s.cls}`}>{s.text}</span>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate2">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}

function QualificationTest({ onClose, onSubmit }) {
  const [answers, setAnswers] = useState({});
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4">
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-md bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-ink">Qualification test</h3>
          <button onClick={onClose} className="text-slate2 hover:text-ink" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {questions.map((q, i) => (
            <fieldset key={q.id}>
              <legend className="text-sm font-medium text-ink">
                {i + 1}. {q.prompt}
              </legend>
              <div className="mt-2 flex flex-col gap-1.5">
                {q.options.map((opt, oi) => (
                  <label
                    key={oi}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-line px-3 py-2 text-sm has-[:checked]:border-teal has-[:checked]:bg-teal/5"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === oi}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        <button
          disabled={!allAnswered}
          onClick={() => onSubmit(answers)}
          className="mt-6 w-full rounded-md bg-ink py-3 text-sm text-mist disabled:opacity-40"
        >
          Submit answers
        </button>
      </div>
    </div>
  );
}

function Reviews({ sampled, reviews }) {
  return (
    <div>
      <h2 className="font-display text-xl text-ink">Trainee reviews</h2>
      <p className="mt-1.5 max-w-lg text-sm text-slate2">
        The platform randomly picks {sampled.length} trainees from your own
        roster each cycle and asks them for a detailed review, not just a
        star rating.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {sampled.map((student) => {
          const review = reviews.find((r) => r.traineeName === student.name);
          return (
            <div key={student.id} className="rounded-md border border-line bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="font-medium text-ink">{student.name}</p>
                {review ? (
                  <StarRating value={review.stars} size={15} />
                ) : (
                  <span className="rounded-full bg-line px-2.5 py-0.5 text-xs text-slate2">
                    Awaiting response
                  </span>
                )}
              </div>
              {review ? (
                <>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink">
                    &quot;{review.comment}&quot;
                  </p>
                  <p className="mt-2 font-mono text-xs text-slate2">
                    Submitted {review.submittedAt}
                  </p>
                </>
              ) : (
                <p className="mt-2.5 text-sm text-slate2">
                  This trainee was sampled but hasn't submitted a review yet.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Certifications() {
  const nextTierAt = 2500;
  const progress = Math.min(100, Math.round((me.credits / nextTierAt) * 100));

  return (
    <div>
      <h2 className="font-display text-xl text-ink">Your certification level</h2>

      <div className="mt-5 rounded-md border border-line bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TierBadge tier={me.tier} topPercent={me.topPercent} />
            <StarRating value={me.avgRating} />
          </div>
          <div className="text-right">
            <p className="font-display text-2xl text-ink">{me.credits.toLocaleString()}</p>
            <p className="text-xs text-slate2">credits</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-amber" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1.5 font-mono text-xs text-slate2">
            {me.credits} / {nextTierAt} credits to Gold
          </p>
        </div>
      </div>

      <h3 className="mt-8 font-display text-lg text-ink">How credits are earned</h3>
      <ul className="mt-3 divide-y divide-line rounded-md border border-line bg-white">
        <CreditRow label="Course completed by a trainee" value="+15 / trainee" />
        <CreditRow label="5-star rating received" value="+10" />
        <CreditRow label="Assessment pass rate above 80% for a course" value="+40" />
        <CreditRow label="Ranked in subject's top 5% for the quarter" value="+150" />
      </ul>
    </div>
  );
}

function CreditRow({ label, value }) {
  return (
    <li className="flex items-center justify-between px-5 py-3 text-sm">
      <span className="text-ink">{label}</span>
      <span className="font-mono text-slate2">{value}</span>
    </li>
  );
}

function TraineePerformance() {
  const rows = [
    { name: "Liya K.", course: "Reading NWP Model Output", progress: 64, score: null },
    { name: "Arjun S.", course: "Reading NWP Model Output", progress: 100, score: 82 },
    { name: "Devika N.", course: "Reading NWP Model Output", progress: 45, score: null },
  ];
  return (
    <div>
      <h2 className="font-display text-xl text-ink">Trainee performance</h2>
      <div className="mt-4 overflow-hidden rounded-md border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink text-mist">
            <tr>
              <th className="px-4 py-2.5 font-medium">Trainee</th>
              <th className="px-4 py-2.5 font-medium">Course</th>
              <th className="px-4 py-2.5 font-medium">Progress</th>
              <th className="px-4 py-2.5 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className={i % 2 ? "bg-mist" : "bg-white"}>
                <td className="px-4 py-3 text-ink">{r.name}</td>
                <td className="px-4 py-3 text-slate2">{r.course}</td>
                <td className="px-4 py-3 font-mono text-slate2">{r.progress}%</td>
                <td className="px-4 py-3 font-mono text-slate2">{r.score ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

function pickRandom(arr, n) {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}
