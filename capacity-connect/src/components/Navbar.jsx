import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ role, onLogout }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-mist/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="11.5" stroke="#B3261E" strokeWidth="1.4" />
            <circle cx="13" cy="13" r="7.5" stroke="#B3261E" strokeWidth="1.2" opacity="0.6" />
            <circle cx="13" cy="13" r="3.2" fill="#B3261E" />
          </svg>
          <span className="font-body text-sm font-semibold uppercase tracking-wider text-ink">
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
              className="rounded-md border border-line px-3.5 py-1.5 text-sm text-ink transition hover:border-crimson hover:text-crimson"
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
              className="rounded-md border border-crimson px-4 py-2 font-medium text-crimson transition hover:bg-crimson hover:text-mist"
            >
              Sign in →
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
