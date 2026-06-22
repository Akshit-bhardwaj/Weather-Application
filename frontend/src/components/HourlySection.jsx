import { Droplets } from "lucide-react";

/* ── Skeleton ─────────────────────────────────────────── */
function HourlySkeleton() {
  return (
    <div className="flex gap-3 horizontal-scroll pb-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="skeleton rounded-2xl" style={{ width: 84, height: 130, flexShrink: 0 }} />
      ))}
    </div>
  );
}

/* ── Single hour card ─────────────────────────────────── */
function HourCard({ hour, isNow }) {
  const iconUrl = hour.weather.icon.startsWith("//")
    ? `https:${hour.weather.icon}`
    : hour.weather.icon;

  // Format "2026-06-22 14:00" → "2 PM"
  const timeStr = hour.time.split(" ")[1]; // "14:00"
  const [hh] = timeStr.split(":");
  const h = parseInt(hh, 10);
  const label = isNow ? "Now" : h === 0 ? "12 AM" : h < 12 ? `${h} AM` : h === 12 ? "12 PM" : `${h - 12} PM`;

  return (
    <div
      className="glass-card rounded-2xl flex flex-col items-center gap-2 py-4 px-3"
      style={{
        minWidth: 78,
        ...(isNow ? {
          background: "rgba(14,165,233,0.15)",
          borderColor: "rgba(14,165,233,0.35)",
        } : {}),
      }}
    >
      <span className="text-xs font-semibold"
        style={{ color: isNow ? "#38bdf8" : "rgba(255,255,255,0.5)" }}>
        {label}
      </span>
      <img src={iconUrl} alt={hour.weather.text} className="w-9 h-9 object-contain" />
      <span className="text-base font-bold text-white">
        {Math.round(hour.temperature)}°
      </span>
      {hour.chance_of_rain > 0 && (
        <span className="flex items-center gap-0.5 text-xs" style={{ color: "#60a5fa" }}>
          <Droplets size={10} />
          {hour.chance_of_rain}%
        </span>
      )}
    </div>
  );
}

/* ── Main component ───────────────────────────────────── */
export default function HourlySection({ hourly, loading }) {
  if (loading) {
    return (
      <section className="animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="skeleton rounded-lg" style={{ width: 160, height: 24 }} />
        </div>
        <HourlySkeleton />
      </section>
    );
  }

  if (!hourly) return null;

  // Find the current hour index
  const now = new Date();
  const currentHour = now.getHours();
  const nowIndex = hourly.hourly.findIndex((h) => {
    const hStr = h.time.split(" ")[1];
    return parseInt(hStr.split(":")[0], 10) === currentHour;
  });

  return (
    <section className="animate-slide-up">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-1 h-5 rounded-full inline-block"
            style={{ background: "linear-gradient(180deg,#a78bfa,#6366f1)" }} />
          Hourly Forecast
        </h2>
        <span className="text-xs font-medium px-3 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}>
          Today · 24h
        </span>
      </div>

      {/* Horizontal scroll */}
      <div className="horizontal-scroll flex gap-3 pb-2">
        {hourly.hourly.map((hour, index) => (
          <HourCard
            key={hour.time_epoch}
            hour={hour}
            isNow={index === nowIndex}
          />
        ))}
      </div>
    </section>
  );
}
