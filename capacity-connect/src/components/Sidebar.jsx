export default function Sidebar({ items, active, onSelect, footer }) {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-line pr-4 lg:block">
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
              active === item.key
                ? "bg-ink text-mist"
                : "text-slate2 hover:bg-ink/5 hover:text-ink"
            }`}
          >
            <span>{item.label}</span>
            {item.badge ? (
              <span
                className={`ml-2 rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                  active === item.key ? "bg-mist/20 text-mist" : "bg-amber/20 text-amber"
                }`}
              >
                {item.badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>
      {footer ? <div className="mt-6 border-t border-line pt-4">{footer}</div> : null}
    </aside>
  );
}
