import { Link } from "react-router-dom";
import { announcements, competencyMap } from "../data/mockData";

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-mist">
        <IsolineArt />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:pt-28">
          <p className="font-mono text-xs uppercase tracking-wider text-teal-bright">
            Ministry of Earth Sciences · India Meteorological Department
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.08] tracking-tight lg:text-6xl">
            Training the people who read the sky, the sea, and the ground.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist/75">
            Capacity Connect is where MoES trainers and trainees meet: verified
            credentials, subject-matched courses, and certificates anyone can
            check in three seconds.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/login?role=trainee"
              className="rounded-md bg-amber px-5 py-3 text-sm font-medium text-ink transition hover:bg-amber-soft"
            >
              Join as a trainee
            </Link>
            <Link
              to="/login?role=trainer"
              className="rounded-md border border-mist/25 px-5 py-3 text-sm font-medium text-mist transition hover:border-mist/60"
            >
              Apply as a trainer
            </Link>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-mist/15 pt-8">
            <Stat value="1,240" label="Trainees enrolled" />
            <Stat value="86" label="Verified trainers" />
            <Stat value="3-layer" label="Document verification" />
          </dl>
        </div>
      </section>

      {/* Program / features */}
      <section id="program" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl tracking-tight text-ink">
            One portal, three roles, no separate systems.
          </h2>
          <p className="mt-3 text-slate2">
            Most training platforms bolt trainee and trainer tools together.
            Capacity Connect was built role-first, so each dashboard only
            shows what that person actually needs to act on.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Trainee"
            copy="Enroll in subject-tagged courses, sit deadline-aware MCQs, and download QR-verifiable certificates the moment you pass."
            accent="teal"
          />
          <FeatureCard
            title="Trainer"
            copy="Upload your credentials, clear a two-step qualification check, then track trainee performance and build your credit balance."
            accent="amber"
          />
          <FeatureCard
            title="Admin"
            copy="Approve documents, watch the competency map for coverage gaps, and post announcements the moment they matter."
            accent="coral"
          />
        </div>
      </section>

      {/* Verification pipeline */}
      <section id="verification" className="border-y border-line bg-white/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl tracking-tight text-ink">
            Nobody gets waved through.
          </h2>
          <p className="mt-3 max-w-xl text-slate2">
            We don't claim real UIDAI integration — no training portal legally
            can. Instead, every credential clears three independent checks
            before a trainer is marked verified.
          </p>

          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            <PipelineStep
              n="1"
              title="Structural check"
              copy="Document format, ID checksum, and tamper signs — screened automatically, no external API."
            />
            <PipelineStep
              n="2"
              title="Cross-matched extraction"
              copy="Name and DOB pulled from each document are compared against each other. Mismatches get flagged, not rejected."
            />
            <PipelineStep
              n="3"
              title="Qualification test + human review"
              copy="Trainers sit a subject test before an admin makes the final call — self-reported experience never verifies itself."
            />
          </ol>
        </div>
      </section>

      {/* Competency snapshot */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl tracking-tight text-ink">
              Where the coverage gaps are, right now.
            </h2>
            <p className="mt-2 text-slate2">
              A live read of subject demand against trainer supply.
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink text-mist">
              <tr>
                <th className="px-5 py-3 font-medium">Subject</th>
                <th className="px-5 py-3 font-medium">Trainers</th>
                <th className="px-5 py-3 font-medium">Demand</th>
                <th className="px-5 py-3 font-medium">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {competencyMap.map((row, i) => (
                <tr key={row.subject} className={i % 2 ? "bg-mist" : "bg-white"}>
                  <td className="px-5 py-3.5 text-ink">{row.subject}</td>
                  <td className="px-5 py-3.5 font-mono text-slate2">{row.trainers}</td>
                  <td className="px-5 py-3.5 text-slate2">{row.demand}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        row.coverage === "Critical gap"
                          ? "bg-coral/10 text-coral"
                          : row.coverage === "Low"
                          ? "bg-amber/15 text-amber"
                          : "bg-teal/10 text-teal-deep"
                      }`}
                    >
                      {row.coverage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Announcements */}
      <section className="border-t border-line bg-ink text-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h3 className="font-display text-2xl">Latest from the program</h3>
          <ul className="mt-6 divide-y divide-mist/10">
            {announcements.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-4">
                <span className="text-mist/90">{a.title}</span>
                <span className="font-mono text-xs text-mist/50">{a.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate2">
        Capacity Connect — built for the MoES REACHOUT capacity-building
        scheme (RDESS, ITCOocean, DESK, KRCNet). Frontend prototype.
      </footer>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-3xl text-mist">{value}</div>
      <div className="mt-1 text-xs text-mist/60">{label}</div>
    </div>
  );
}

function FeatureCard({ title, copy, accent }) {
  const accentMap = {
    teal: "border-l-teal",
    amber: "border-l-amber",
    coral: "border-l-coral",
  };
  return (
    <div className={`rounded-md border border-line border-l-4 ${accentMap[accent]} bg-white p-6`}>
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-slate2">{copy}</p>
    </div>
  );
}

function PipelineStep({ n, title, copy }) {
  return (
    <li className="rounded-md border border-line bg-white p-6">
      <span className="font-mono text-xs text-teal-deep">Step {n}</span>
      <h4 className="mt-2 font-display text-lg text-ink">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-slate2">{copy}</p>
    </li>
  );
}

function IsolineArt() {
  // Concentric topographic-style rings — nods to weather/pressure maps
  // rather than a generic gradient blob.
  const rings = Array.from({ length: 9 }, (_, i) => 40 + i * 34);
  return (
    <svg
      className="pointer-events-none absolute -right-24 -top-24 opacity-40"
      width="560"
      height="560"
      viewBox="0 0 560 560"
      fill="none"
    >
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="280"
          cy="280"
          r={r}
          stroke={i % 3 === 0 ? "#E8A33D" : "#2F9AA6"}
          strokeOpacity={i % 3 === 0 ? 0.35 : 0.22}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
