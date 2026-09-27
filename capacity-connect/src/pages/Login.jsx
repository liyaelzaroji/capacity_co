import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SkillTestForm from "../components/SkillTestForm.jsx";

const ROLES = [
  { key: "trainee", label: "Trainee" },
  { key: "trainer", label: "Trainer" },
  { key: "admin", label: "Admin" },
];

const emptyExperience = () => ({ role: "", org: "", years: "", description: "" });

export default function Login({ onLogin, onApply }) {
  const [params] = useSearchParams();
  const [role, setRole] = useState(params.get("role") || "trainee");
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const navigate = useNavigate();

  // Trainer signup is a wizard: account -> work experience -> skill test -> done
  const [step, setStep] = useState("account");
  const [account, setAccount] = useState({ name: "", email: "", subject: "" });
  const [experience, setExperience] = useState([emptyExperience()]);
  const [testScore, setTestScore] = useState(null);

  const isTrainerSignup = mode === "signup" && role === "trainer";

  function resetWizard() {
    setStep("account");
    setAccount({ name: "", email: "", subject: "" });
    setExperience([emptyExperience()]);
    setTestScore(null);
  }

  function switchMode(next) {
    setMode(next);
    resetWizard();
  }

  function switchRole(r) {
    setRole(r);
    resetWizard();
  }

  function handleSimpleSubmit(e) {
    e.preventDefault();
    const name = account.name || (role === "trainee" ? "Liya" : "Admin User");
    onLogin(role, name);
    navigate(role === "admin" ? "/admin" : "/trainee");
  }

  function handleAccountStep(e) {
    e.preventDefault();
    setStep("experience");
  }

  function handleExperienceStep(e) {
    e.preventDefault();
    setStep("test");
  }

  function handleTestSubmit(score) {
    setTestScore(score);
    onApply({
      id: `app-${Date.now()}`,
      name: account.name,
      email: account.email,
      subject: account.subject,
      workExperience: experience.filter((x) => x.role || x.org),
      skillScore: score,
      docStatus: "flagged",
      submittedAt: "Just now",
    });
    setStep("done");
  }

  function updateExperience(i, field, value) {
    setExperience((rows) => rows.map((r, ri) => (ri === i ? { ...r, [field]: value } : r)));
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-teal-deep">
        Capacity Connect
      </p>
      <h1 className="mt-2 font-display text-3xl tracking-tight text-ink">
        {mode === "login" ? "Sign in to continue" : "Create your account"}
      </h1>

      <div className="mt-6 flex rounded-md border border-line bg-white p-1">
        {ROLES.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => switchRole(r.key)}
            className={`flex-1 rounded px-3 py-2 text-sm transition ${
              role === r.key ? "bg-ink text-mist" : "text-slate2 hover:text-ink"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {isTrainerSignup && (
        <WizardProgress
          step={step}
          steps={["account", "experience", "test", "done"]}
          labels={["Account", "Experience", "Skill test", "Submitted"]}
        />
      )}

      {/* Non-trainer, or login mode: the simple one-shot form */}
      {!isTrainerSignup && (
        <form onSubmit={handleSimpleSubmit} className="mt-6 flex flex-col gap-4">
          {mode === "signup" && (
            <Field label="Full name">
              <input
                value={account.name}
                onChange={(e) => setAccount((a) => ({ ...a, name: e.target.value }))}
                placeholder="As on your ID"
                className="input"
                required
              />
            </Field>
          )}
          <Field label="Email">
            <input type="email" placeholder="you@example.gov.in" className="input" required />
          </Field>
          <Field label="Password">
            <input type="password" placeholder="••••••••" className="input" required />
          </Field>

          {mode === "signup" && role === "trainee" && (
            <p className="rounded-md bg-amber/10 px-3.5 py-3 text-xs leading-relaxed text-ink">
              After signup you'll be asked to upload ID and qualification
              documents. Your account stays in{" "}
              <span className="font-medium">pending verification</span> until
              an admin approves it.
            </p>
          )}

          <button
            type="submit"
            className="mt-2 rounded-md bg-teal px-4 py-3 text-sm font-medium text-mist transition hover:bg-teal-deep"
          >
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      )}

      {/* Trainer signup wizard */}
      {isTrainerSignup && step === "account" && (
        <form onSubmit={handleAccountStep} className="mt-6 flex flex-col gap-4">
          <Field label="Full name">
            <input
              value={account.name}
              onChange={(e) => setAccount((a) => ({ ...a, name: e.target.value }))}
              placeholder="As on your ID"
              className="input"
              required
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={account.email}
              onChange={(e) => setAccount((a) => ({ ...a, email: e.target.value }))}
              placeholder="you@example.gov.in"
              className="input"
              required
            />
          </Field>
          <Field label="Password">
            <input type="password" placeholder="••••••••" className="input" required />
          </Field>
          <Field label="Subject you'll train in">
            <input
              value={account.subject}
              onChange={(e) => setAccount((a) => ({ ...a, subject: e.target.value }))}
              placeholder="e.g. Numerical Weather Prediction"
              className="input"
              required
            />
          </Field>
          <button
            type="submit"
            className="mt-2 rounded-md bg-teal px-4 py-3 text-sm font-medium text-mist transition hover:bg-teal-deep"
          >
            Continue to work experience
          </button>
        </form>
      )}

      {isTrainerSignup && step === "experience" && (
        <form onSubmit={handleExperienceStep} className="mt-6 flex flex-col gap-5">
          <p className="text-sm text-slate2">
            Tell us where you've worked in this field. This becomes your
            profile's background summary — the admin cross-checks it against
            your skill-test score before approving you.
          </p>
          {experience.map((row, i) => (
            <div key={i} className="rounded-md border border-line bg-white p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Role / title">
                  <input
                    value={row.role}
                    onChange={(e) => updateExperience(i, "role", e.target.value)}
                    placeholder="Forecast Officer"
                    className="input"
                    required
                  />
                </Field>
                <Field label="Organization">
                  <input
                    value={row.org}
                    onChange={(e) => updateExperience(i, "org", e.target.value)}
                    placeholder="IMD Field Station, Kochi"
                    className="input"
                    required
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field label="Years of experience">
                  <input
                    type="number"
                    min="0"
                    value={row.years}
                    onChange={(e) => updateExperience(i, "years", e.target.value)}
                    placeholder="5"
                    className="input"
                    required
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field label="What did you do there?">
                  <textarea
                    value={row.description}
                    onChange={(e) => updateExperience(i, "description", e.target.value)}
                    placeholder="Brief description"
                    className="input min-h-20"
                    required
                  />
                </Field>
              </div>
              {experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => setExperience((rows) => rows.filter((_, ri) => ri !== i))}
                  className="mt-2 text-xs text-coral"
                >
                  Remove this entry
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setExperience((rows) => [...rows, emptyExperience()])}
            className="rounded-md border border-dashed border-line py-2 text-sm text-slate2 hover:border-teal hover:text-teal-deep"
          >
            + Add another role
          </button>
          <button
            type="submit"
            className="mt-1 rounded-md bg-teal px-4 py-3 text-sm font-medium text-mist transition hover:bg-teal-deep"
          >
            Continue to skill test
          </button>
        </form>
      )}

      {isTrainerSignup && step === "test" && (
        <div className="mt-6">
          <SkillTestForm onSubmit={handleTestSubmit} />
        </div>
      )}

      {isTrainerSignup && step === "done" && (
        <div className="mt-6 rounded-md border border-line bg-white p-6 text-center">
          <p className="font-display text-2xl text-ink">Application submitted</p>
          <p className="mt-2 text-sm text-slate2">
            Skill-test score:{" "}
            <span className="font-mono font-medium text-ink">{testScore}%</span>
          </p>
          <p className="mt-3 text-sm text-slate2">
            An admin will review your work experience, documents, and score
            before approving your account. You'll be notified by email.
          </p>
          <button
            onClick={() => switchMode("login")}
            className="mt-5 rounded-md bg-ink px-4 py-2.5 text-sm text-mist hover:bg-teal-deep"
          >
            Back to sign in
          </button>
        </div>
      )}

      {step !== "done" && (
        <p className="mt-6 text-center text-sm text-slate2">
          {mode === "login" ? "New here?" : "Already registered?"}{" "}
          <button
            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            className="font-medium text-teal-deep underline underline-offset-2"
          >
            {mode === "login" ? "Create an account" : "Sign in instead"}
          </button>
        </p>
      )}
    </div>
  );
}

function WizardProgress({ step, steps, labels }) {
  const idx = steps.indexOf(step);
  return (
    <div className="mt-5 flex items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-1 items-center gap-1.5">
          <div
            className={`h-1.5 flex-1 rounded-full ${
              i <= idx ? "bg-teal" : "bg-line"
            }`}
          />
        </div>
      ))}
      <span className="ml-2 shrink-0 font-mono text-[11px] text-slate2">
        {labels[idx]}
      </span>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-slate2">{label}</span>
      {children}
    </label>
  );
}
