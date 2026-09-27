import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { competencyMap, trainers, announcements } from "../data/mockData.js";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "queue", label: "Verification queue" },
  { key: "competency", label: "Competency map" },
];

export default function AdminDashboard({ name, applications, onDecision }) {
  const [active, setActive] = useState("overview");
  const pendingCount = applications.filter((a) => !a.status).length;
  const navWithBadge = NAV.map((n) =>
    n.key === "queue" && pendingCount ? { ...n, badge: pendingCount } : n
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header>
        <p className="font-mono text-xs uppercase tracking-wide text-crimson">
          Admin dashboard
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink">Welcome back, {name}.</h1>
      </header>

      <div className="mt-8 flex gap-10">
        <Sidebar items={navWithBadge} active={active} onSelect={setActive} />

        <div className="min-w-0 flex-1">
          {active === "overview" && <Overview pendingCount={pendingCount} />}
          {active === "queue" && (
            <Queue applications={applications} onDecision={onDecision} />
          )}
          {active === "competency" && <Competency />}
        </div>
      </div>
    </div>
  );
}

function Overview({ pendingCount }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Trainees" value="1,240" />
        <StatCard label="Verified trainers" value={trainers.length} />
        <StatCard label="Certificates issued" value="612" />
        <StatCard label="Pending review" value={pendingCount} />
      </div>

      <h2 className="mt-10 font-display text-xl text-ink">Recent announcements</h2>
      <ul className="mt-4 divide-y divide-line rounded-md border border-line bg-white">
        {announcements.map((a) => (
          <li key={a.id} className="flex items-center justify-between px-5 py-3.5 text-sm">
            <span className="text-ink">{a.title}</span>
            <span className="font-mono text-xs text-slate2">{a.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Queue({ applications, onDecision }) {
  return (
    <div>
      <h2 className="font-display text-xl text-ink">Trainer verification queue</h2>
      <p className="mt-1.5 max-w-lg text-sm text-slate2">
        Each applicant's own skill-test score sits next to their claimed
        experience — approve on the score, not the resume.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        {applications.length === 0 && (
          <p className="rounded-md border border-line bg-white p-5 text-sm text-slate2">
            Nothing waiting for review.
          </p>
        )}
        {applications.map((a) => (
          <ApplicationCard key={a.id} app={a} onDecision={onDecision} />
        ))}
      </div>
    </div>
  );
}

function ApplicationCard({ app, onDecision }) {
  const passed = app.skillScore >= 70;
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium text-ink">
            {app.name || "Unnamed applicant"}{" "}
            {app.docStatus === "flagged" && (
              <span className="ml-1 rounded-full bg-crimson/10 px-2 py-0.5 text-xs text-crimson">
                Document mismatch flagged
              </span>
            )}
          </p>
          <p className="text-sm text-slate2">
            {app.subject} · applied {app.submittedAt}
          </p>
        </div>
        <div className="text-right">
          <p
            className={`font-mono text-2xl ${passed ? "text-teal-deep" : "text-crimson"}`}
          >
            {app.skillScore}%
          </p>
          <p className="text-xs text-slate2">skill-test score</p>
        </div>
      </div>

      {app.workExperience?.length > 0 && (
        <div className="mt-3 rounded-md bg-mist px-4 py-3">
          {app.workExperience.map((w, i) => (
            <p key={i} className="text-sm text-slate2">
              <span className="text-ink">{w.role}</span> at {w.org} — {w.years} yr
              {w.years == 1 ? "" : "s"}
              {w.description ? `. ${w.description}` : ""}
            </p>
          ))}
        </div>
      )}

      {app.status ? (
        <p className="mt-4 text-sm font-medium text-slate2">{app.status}</p>
      ) : (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onDecision(app.id, "Approved")}
            className="rounded-md bg-teal px-3.5 py-1.5 text-sm text-mist hover:bg-teal-deep"
          >
            Approve
          </button>
          <button
            onClick={() => onDecision(app.id, "Rejected")}
            className="rounded-md border border-line px-3.5 py-1.5 text-sm text-ink hover:border-crimson hover:text-crimson"
          >
            Reject
          </button>
          {!passed && (
            <span className="ml-1 self-center text-xs text-crimson">
              Below 70% pass mark
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function Competency() {
  return (
    <div>
      <h2 className="font-display text-xl text-ink">Competency map</h2>
      <p className="mt-1.5 max-w-lg text-sm text-slate2">
        Built from trainers' own skill-test scores, not headcount alone —
        a subject can look "covered" and still have a weak bench.
      </p>
      <div className="mt-5 flex flex-col gap-4">
        {competencyMap.map((row) => (
          <div key={row.subject} className="rounded-md border border-line bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-ink">{row.subject}</p>
                <p className="text-sm text-slate2">
                  {row.trainerCount} trainer{row.trainerCount > 1 ? "s" : ""} ·{" "}
                  {row.demand} demand
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-slate2">
                  avg skill {row.avgSkill}%
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    row.coverage === "Critical gap"
                      ? "bg-crimson/10 text-crimson"
                      : row.coverage === "Low" || row.coverage === "Weak bench"
                      ? "bg-amber/15 text-amber"
                      : "bg-teal/10 text-teal-deep"
                  }`}
                >
                  {row.coverage}
                </span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {row.trainers.map((t) => (
                <span
                  key={t.name}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-slate2"
                >
                  {t.name} · {t.skillScore}%
                </span>
              ))}
            </div>
          </div>
        ))}
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
