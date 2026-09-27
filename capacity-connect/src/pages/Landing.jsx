import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { announcements, competencyMap } from "../data/mockData";

const FAQS = [
  {
    q: "Who can sign up as a trainee?",
    a: "Any MoES/IMD staff or affiliated researcher can register as a trainee — sign-up takes a couple of minutes and courses open immediately.",
  },
  {
    q: "How does trainer verification actually work?",
    a: "Two independent steps: a document/background extraction (flagged as self-reported until confirmed), then a subject skill test. Admins approve based on the test score, not the resume alone.",
  },
  {
    q: "What happens if a trainer fails the skill test?",
    a: "Their application is marked below the pass mark and stays with the admin for a decision — they can be asked to retake it before approval.",
  },
  {
    q: "Are certificates actually checkable?",
    a: "Every certificate ships a unique ID and a QR code that resolves to a verification page — no PDF-only certificates that anyone could edit.",
  },
];

export default function Landing() {
  return (
    <div className="bg-mist">
      {/* Hero */}
      <section className="relative overflow-hidden hairline-grid">
        <span className="plus-mark plus-mark-tl" />
        <span className="plus-mark plus-mark-tr" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:pt-24">
          <p className="reveal reveal-1 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-crimson">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
            </span>
            Live · Ministry of Earth Sciences · India Meteorological Department
          </p>

          <h1 className="reveal reveal-2 mt-6 font-display uppercase leading-[0.92] tracking-tight text-ink">
            <span className="block text-6xl lg:text-8xl">Train.</span>
            <span className="block text-6xl text-crimson lg:text-8xl">Verify.</span>
            <span className="block text-6xl lg:text-8xl">Certify.</span>
          </h1>

          <p className="reveal reveal-3 mt-6 max-w-xl font-body text-lg leading-relaxed text-slate2">
            Capacity Connect is where MoES trainers and trainees meet: verified
            credentials, subject-matched courses, and certificates anyone can
            check in three seconds.
          </p>

          <div className="reveal reveal-4 mt-9 flex flex-wrap gap-3">
            <Link
              to="/login?role=trainee"
              className="rounded-md bg-crimson px-5 py-3 text-sm font-medium text-mist transition hover:-translate-y-0.5 hover:bg-crimson-deep"
            >
              Join as a trainee
            </Link>
            <Link
              to="/login?role=trainer"
              className="rounded-md border border-ink/30 px-5 py-3 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-ink"
            >
              Apply as a trainer
            </Link>
          </div>

          <dl className="reveal reveal-5 mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-line pt-8">
            <Stat value={1240} suffix="" label="Trainees enrolled" />
            <Stat value={86} suffix="" label="Verified trainers" />
            <Stat value={2} suffix="-step" label="Trainer verification" />
          </dl>
        </div>
        <span className="plus-mark plus-mark-bl" />
        <span className="plus-mark plus-mark-br" />
      </section>

      {/* Ghost marquee */}
      <div className="overflow-hidden border-y border-ink/10 bg-ink py-3">
        <div className="marquee-track">
          <MarqueeText />
          <MarqueeText />
        </div>
      </div>

      {/* Program / features — dark section */}
      <section id="program" className="relative overflow-hidden bg-ink mesh-dots text-mist">
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-wider text-crimson">
            01 — Why Capacity Connect
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight lg:text-6xl">
            One portal.
            <br />
            <span className="text-crimson">Three roles.</span> No excuses.
          </h2>
          <p className="mt-5 max-w-lg text-mist/70">
            Most training platforms bolt trainee and trainer tools together.
            Capacity Connect was built role-first, so each dashboard only
            shows what that person actually needs to act on.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-mist/10 bg-mist/10 md:grid-cols-3">
            <FeatureCard
              n="01"
              title="Trainee"
              copy="Enroll in subject-tagged courses, sit deadline-aware MCQs, and download QR-verifiable certificates the moment you pass."
            />
            <FeatureCard
              n="02"
              title="Trainer"
              copy="Enter your work experience, clear a two-step qualification check, then track trainee performance and build your credit balance."
            />
            <FeatureCard
              n="03"
              title="Admin"
              copy="Approve on skill-test scores, watch the competency map for coverage gaps, and post announcements the moment they matter."
            />
          </div>
        </div>
      </section>

      {/* Verification pipeline — cream */}
      <section id="verification" className="relative overflow-hidden hairline-grid">
        <span className="plus-mark plus-mark-tl" />
        <span className="plus-mark plus-mark-tr" />
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-wider text-crimson">
            02 — Verification pipeline
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink lg:text-6xl">
            Nobody gets
            <br />
            <span className="text-crimson">waved through.</span>
          </h2>
          <p className="mt-5 max-w-xl text-slate2">
            We don't claim real UIDAI integration — no training portal legally
            can. Instead, every trainer clears two independent checks before
            they're marked verified.
          </p>

          <ol className="relative mt-14 border-l border-ink/15 pl-8">
            <PipelineStep
              n="01"
              title="Document & background extraction"
              copy="Resume, degree certificate and ID are parsed for name, qualification and prior experience — flagged as self-reported and unofficial from the start."
            />
            <PipelineStep
              n="02"
              title="Subject skill test"
              copy="A pass mark of 70% on a subject-specific test. This score is what the admin actually approves against, not the extracted resume."
            />
            <PipelineStep
              n="03"
              title="Admin sign-off"
              copy="An admin reviews the score alongside the documents and makes the final call — approve, reject, or ask for a retake."
              last
            />
          </ol>
        </div>
        <span className="plus-mark plus-mark-bl" />
        <span className="plus-mark plus-mark-br" />
      </section>

      {/* Competency snapshot — dark */}
      <section className="relative overflow-hidden bg-ink mesh-dots text-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-wider text-crimson">
            03 — Subject coverage
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight lg:text-6xl">
            Where the gaps
            <br />
            are, <span className="text-crimson">right now.</span>
          </h2>
          <p className="mt-5 max-w-xl text-mist/70">
            Built from trainers' own skill-test scores, not headcount alone —
            a subject can look "covered" and still have a weak bench.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {competencyMap.map((row) => (
              <div
                key={row.subject}
                className="rounded-md border border-mist/10 bg-mist/[0.04] p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-mist">{row.subject}</p>
                    <p className="text-sm text-mist/60">
                      {row.trainerCount} trainer{row.trainerCount > 1 ? "s" : ""} ·{" "}
                      {row.demand} demand
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-mist/70">
                      avg skill {row.avgSkill}%
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        row.coverage === "Critical gap"
                          ? "bg-crimson/20 text-crimson-soft"
                          : row.coverage === "Low" || row.coverage === "Weak bench"
                          ? "bg-amber/20 text-amber"
                          : "bg-teal/20 text-teal-bright"
                      }`}
                    >
                      {row.coverage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="border-y border-line bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-wider text-crimson">
            Latest
          </p>
          <h3 className="mt-2 font-display text-2xl uppercase text-ink">
            From the program
          </h3>
          <ul className="mt-6 divide-y divide-line">
            {announcements.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-4">
                <span className="text-ink">{a.title}</span>
                <span className="font-mono text-xs text-slate2">{a.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ — dark */}
      <section className="bg-ink text-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-wider text-crimson">
            04 — FAQ
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight lg:text-6xl">
            Frequently
            <br />
            <span className="text-crimson">asked.</span>
          </h2>
          <div className="mt-12 divide-y divide-mist/15 border-t border-mist/15">
            {FAQS.map((item, i) => (
              <FaqItem key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-ink text-mist">
        <div className="mx-auto max-w-7xl px-6 pb-10">
          <p className="font-display text-3xl uppercase tracking-tight lg:text-4xl">
            Capacity <span className="text-crimson">Connect</span>
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-mist/15 pt-6 text-sm text-mist/50">
            <span>
              Built for the MoES REACHOUT capacity-building scheme (RDESS,
              ITCOocean, DESK, KRCNet). Frontend prototype.
            </span>
            <span>© 2026 Capacity Connect</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MarqueeText() {
  const words = [
    "Physical Oceanography",
    "Numerical Weather Prediction",
    "Seismology",
    "Climate Data Analytics",
    "Ocean-Atmosphere Interaction",
    "Hydrology",
  ];
  return (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span
          key={w}
          className="mx-6 shrink-0 font-display text-3xl uppercase tracking-tight text-mist/15"
        >
          {w} <span className="text-crimson/30">·</span>
        </span>
      ))}
    </div>
  );
}

function Stat({ value, suffix = "", label }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let frame;
    function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div>
      <div className="font-display text-3xl tabular-nums text-ink">
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wide text-slate2">{label}</div>
    </div>
  );
}

function FeatureCard({ n, title, copy }) {
  return (
    <div className="bg-ink p-7">
      <span className="font-mono text-xs text-crimson">{n}</span>
      <h3 className="mt-3 font-display text-2xl uppercase text-mist">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-mist/60">{copy}</p>
    </div>
  );
}

function PipelineStep({ n, title, copy, last = false }) {
  return (
    <li className={`relative ${last ? "" : "pb-10"}`}>
      <span className="absolute -left-[41px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-crimson bg-mist font-mono text-[10px] text-crimson">
        {n}
      </span>
      <h4 className="font-display text-xl uppercase text-ink">{title}</h4>
      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-slate2">{copy}</p>
    </li>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-mist/15 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-medium text-mist">{q}</span>
        <span className="shrink-0 font-mono text-lg text-crimson">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/65">{a}</p>}
    </div>
  );
}
