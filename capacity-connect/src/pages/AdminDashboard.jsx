import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { competencyMap, trainers, announcements } from "../data/mockData.js";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "queue", label: "Verification queue" },
  { key: "competency", label: "Competency map" },
];

const queue = [
  { id: "u1", name: "Priya Nair", role: "Trainer", subject: "Hydrology", flagged: false },
  { id: "u2", name: "Karan Bose", role: "Trainee", subject: "—", flagged: false },
  { id: "u3", name: "Ilyas Ahmed", role: "Trainer", subject: "Seismology", flagged: true },
];

export default function AdminDashboard({ name }) {
  const [active, setActive] = useState("overview");
  const [decisions, setDecisions] = useState({});

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header>
        <p className="font-mono text-xs uppercase tracking-wide text-teal-deep">
          Admin dashboard
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink">Welcome back, {name}.</h1>
      </header>

      <div className="mt-8 flex gap-10">
        <Sidebar items={NAV} active={active} onSelect={setActive} />

        <div className="min-w-0 flex-1">
          {active === "overview" && <Overview />}
          {active === "queue" && (
            <Queue decisions={decisions} setDecisions={setDecisions} />
          )}
          {active === "competency" && <Competency />}
        </div>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Trainees" value="1,240" />
        <StatCard label="Verified trainers" value={trainers.length} />
        <StatCard label="Certificates issued" value="612" />
        <StatCard label="Pending review" value={queue.length} />
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

function Queue({ decisions, setDecisions }) {
  return (
    <div>
      <h2 className="font-display text-xl text-ink">Verification queue</h2>
      <div className="mt-4 flex flex-col divide-y divide-line rounded-md border border-line bg-white">
        {queue.map((u) => (
          <div key={u.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="font-medium text-ink">
                {u.name}{" "}
                {u.flagged && (
                  <span className="ml-1 rounded-full bg-coral/10 px-2 py-0.5 text-xs text-coral">
                    Name mismatch flagged
                  </span>
                )}
              </p>
              <p className="text-sm text-slate2">
                {u.role} · {u.subject}
              </p>
            </div>
            {decisions[u.id] ? (
              <span className="text-sm text-slate2">{decisions[u.id]}</span>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setDecisions((d) => ({ ...d, [u.id]: "Approved" }))}
                  className="rounded-md bg-teal px-3 py-1.5 text-sm text-mist hover:bg-teal-deep"
                >
                  Approve
                </button>
                <button
                  onClick={() => setDecisions((d) => ({ ...d, [u.id]: "Rejected" }))}
                  className="rounded-md border border-line px-3 py-1.5 text-sm text-ink hover:border-coral hover:text-coral"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Competency() {
  return (
    <div>
      <h2 className="font-display text-xl text-ink">Competency map</h2>
      <div className="mt-4 overflow-hidden rounded-md border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink text-mist">
            <tr>
              <th className="px-4 py-2.5 font-medium">Subject</th>
              <th className="px-4 py-2.5 font-medium">Trainers</th>
              <th className="px-4 py-2.5 font-medium">Demand</th>
              <th className="px-4 py-2.5 font-medium">Coverage</th>
            </tr>
          </thead>
          <tbody>
            {competencyMap.map((row, i) => (
              <tr key={row.subject} className={i % 2 ? "bg-mist" : "bg-white"}>
                <td className="px-4 py-3 text-ink">{row.subject}</td>
                <td className="px-4 py-3 font-mono text-slate2">{row.trainers}</td>
                <td className="px-4 py-3 text-slate2">{row.demand}</td>
                <td className="px-4 py-3 text-slate2">{row.coverage}</td>
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
