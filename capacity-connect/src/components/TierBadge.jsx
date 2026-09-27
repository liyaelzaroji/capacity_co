const TIER_STYLES = {
  Gold: "bg-amber/15 text-amber border-amber/40",
  Silver: "bg-slate2/10 text-slate2 border-slate2/30",
  Bronze: "bg-crimson/10 text-crimson border-crimson/30",
};

export default function TierBadge({ tier, topPercent, size = "md" }) {
  const sizeCls = size === "sm" ? "text-[11px] px-2 py-0.5" : "text-xs px-2.5 py-1";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center rounded-full border font-medium ${sizeCls} ${TIER_STYLES[tier] || TIER_STYLES.Bronze}`}
      >
        {tier}
      </span>
      {topPercent ? (
        <span className="text-[11px] font-mono text-slate2">Top {topPercent}%</span>
      ) : null}
    </span>
  );
}
