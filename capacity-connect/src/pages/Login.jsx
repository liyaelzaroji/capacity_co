import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ROLES = [
  { key: "trainee", label: "Trainee" },
  { key: "trainer", label: "Trainer" },
  { key: "admin", label: "Admin" },
];

export default function Login({ onLogin }) {
  const [params] = useSearchParams();
  const [role, setRole] = useState(params.get("role") || "trainee");
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(role, name || (role === "trainer" ? "Suresh Menon" : "Liya"));
    navigate(role === "admin" ? "/admin" : role === "trainer" ? "/trainer" : "/trainee");
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
            onClick={() => setRole(r.key)}
            className={`flex-1 rounded px-3 py-2 text-sm transition ${
              role === r.key ? "bg-ink text-mist" : "text-slate2 hover:text-ink"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        {mode === "signup" && (
          <Field label="Full name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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

        {mode === "signup" && role !== "admin" && (
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

      <p className="mt-6 text-center text-sm text-slate2">
        {mode === "login" ? "New here?" : "Already registered?"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="font-medium text-teal-deep underline underline-offset-2"
        >
          {mode === "login" ? "Create an account" : "Sign in instead"}
        </button>
      </p>
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
