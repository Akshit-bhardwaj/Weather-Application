import ForecastCard from "./ForecastCard";

/* ── Skeleton ─────────────────────────────────────────── */
function ForecastSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="skeleton rounded-2xl" style={{ height: 180 }} />
      ))}
    </div>
  );
}

export default function ForecastSection({ forecast, loading }) {
  if (loading) {
    return (
      <section className="animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="skeleton rounded-lg" style={{ width: 140, height: 24 }} />
        </div>
        <ForecastSkeleton />
      </section>
    );
  }

  if (!forecast) return null;

  return (
    <section className="animate-slide-up">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-1 h-5 rounded-full inline-block"
            style={{ background: "linear-gradient(180deg,#38bdf8,#6366f1)" }} />
          7-Day Forecast
        </h2>
        <span className="text-xs font-medium px-3 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)" }}>
          {forecast.city}, {forecast.country}
        </span>
      </div>

      {/* Cards grid — 7 cards, responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.days.map((day) => (
          <ForecastCard key={day.date} day={day} />
        ))}
      </div>
    </section>
  );
}