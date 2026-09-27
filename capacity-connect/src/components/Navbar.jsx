import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ role, onLogout }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-mist/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="11.5" stroke="#1F6F78" strokeWidth="1.4" />
            <circle cx="13" cy="13" r="7.5" stroke="#1F6F78" strokeWidth="1.2" opacity="0.6" />
            <circle cx="13" cy="13" r="3.2" fill="#E8A33D" />
          </svg>
          <span className="font-display text-lg tracking-tight text-ink">
            Capacity Connect
          </span>
        </Link>

        {role ? (
          <nav className="flex items-center gap-5">
            <span className="hidden font-mono text-xs uppercase tracking-wide text-slate2 sm:inline">
              {role} account
            </span>
            <button
              onClick={() => {
                onLogout?.();
                navigate("/");
              }}
              className="rounded-md border border-line px-3.5 py-1.5 text-sm text-ink transition hover:border-teal hover:text-teal"
            >
              Sign out
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-6 text-sm">
            <a href="#program" className="text-slate2 hover:text-ink">Program</a>
            <a href="#verification" className="text-slate2 hover:text-ink">Verification</a>
            <Link
              to="/login"
              className="rounded-md bg-ink px-4 py-2 text-mist transition hover:bg-teal-deep"
            >
              Sign in
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
