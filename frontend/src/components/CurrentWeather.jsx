import {
  Wind,
  Droplets,
  Eye,
  Compass,
  Sunrise,
  Sunset,
  Thermometer,
  Navigation,
} from "lucide-react";

/* ── Skeleton ─────────────────────────────────────────── */
function CurrentWeatherSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto grid md:grid-cols-3 gap-6 animate-fade-in">
      <div className="md:col-span-1 skeleton rounded-3xl" style={{ height: 260 }} />
      <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton rounded-2xl" style={{ height: 110 }} />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────── */
export default function CurrentWeather({ data, loading, error }) {
  if (loading) return <CurrentWeatherSkeleton />;

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto animate-fade-in">
        <div
          className="glass-card rounded-3xl p-8 flex flex-col items-center gap-3 text-center"
          style={{ borderColor: "rgba(248,113,113,0.25)" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: "rgba(248,113,113,0.12)" }}
          >
            ⚠️
          </div>
          <h3 className="text-lg font-semibold text-white">Could not load weather</h3>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const iconUrl = data.weather.icon.startsWith("//")
    ? `https:${data.weather.icon}`
    : data.weather.icon;

  const getWindDirection = (degree) => {
    const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return dirs[Math.round(((degree % 360) / 22.5)) % 16];
  };

  const lastUpdated = new Date(data.last_updated_epoch * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const statCards = [
    {
      label: "Feels Like",
      icon: <Thermometer size={18} />,
      value: <>{Math.round(data.feels_like)}<span className="text-base font-normal ml-0.5">°C</span></>,
      sub: data.feels_like > data.temperature ? "Warmer than actual" : "Cooler than actual",
    },
    {
      label: "Wind",
      icon: <Wind size={18} />,
      value: <>{data.wind.speed_kph}<span className="text-base font-normal ml-1">km/h</span></>,
      sub: (
        <span className="flex items-center gap-1">
          <Navigation size={10} style={{ transform: `rotate(${data.wind.degree}deg)`, color: "#38bdf8", fill: "#38bdf8" }} />
          {getWindDirection(data.wind.degree)} · {data.wind.degree}°
        </span>
      ),
    },
    {
      label: "Humidity",
      icon: <Droplets size={18} />,
      value: <>{data.humidity}<span className="text-base font-normal ml-0.5">%</span></>,
      sub: data.humidity < 40 ? "Dry air" : data.humidity > 70 ? "Humid air" : "Comfortable",
    },
    {
      label: "Visibility",
      icon: <Eye size={18} />,
      value: <>{data.visibility}<span className="text-base font-normal ml-1">km</span></>,
      sub: data.visibility >= 10 ? "Clear view" : "Reduced visibility",
    },
    {
      label: "Pressure",
      icon: <Compass size={18} />,
      value: <>{data.pressure}<span className="text-base font-normal ml-1">hPa</span></>,
      sub: data.pressure > 1013 ? "High pressure" : "Low pressure",
    },
    {
      label: "Sun Cycle",
      icon: <Sunrise size={18} />,
      value: null,
      custom: (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.55)" }}>
              <Sunrise size={11} style={{ color: "#fbbf24" }} /> Rise
            </span>
            <span className="font-bold text-white text-sm">{data.sun.sunrise}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.55)" }}>
              <Sunset size={11} style={{ color: "#f87171" }} /> Set
            </span>
            <span className="font-bold text-white text-sm">{data.sun.sunset}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto grid md:grid-cols-3 gap-6 animate-fade-in">

      {/* ── Primary card ── */}
      <div
        className="md:col-span-1 glass-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden"
        style={{ background: "rgba(14,165,233,0.1)", borderColor: "rgba(14,165,233,0.2)" }}
      >
        {/* Glow */}
        <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "rgba(56,189,248,0.12)", filter: "blur(40px)" }} />

        <div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
                {data.city}
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                {data.country}
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                {data.lat.toFixed(2)}°N, {data.lon.toFixed(2)}°E
              </p>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)" }}
            >
              {lastUpdated}
            </span>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <div>
              <span className="text-6xl font-extrabold text-white tracking-tighter leading-none">
                {Math.round(data.temperature)}°
              </span>
              <p className="text-base font-medium mt-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                {data.weather.text}
              </p>
            </div>
            <img
              src={iconUrl}
              alt={data.weather.text}
              className="w-20 h-20 object-contain"
              style={{ filter: "drop-shadow(0 4px 16px rgba(255,255,255,0.2))" }}
            />
          </div>
        </div>

        <div
          className="mt-6 pt-4 flex justify-between text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
        >
          <div className="flex items-center gap-1.5">
            <Thermometer size={14} style={{ color: "#f87171" }} />
            <span>H: <strong className="text-white">{Math.round(data.temp_max)}°</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Thermometer size={14} style={{ color: "#60a5fa" }} />
            <span>L: <strong className="text-white">{Math.round(data.temp_min)}°</strong></span>
          </div>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="glass-card rounded-2xl p-5 flex flex-col"
            style={card.label === "Sun Cycle" ? { gridColumn: "span 1" } : {}}>
            <div className="flex items-center justify-between" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span className="text-xs font-semibold uppercase tracking-wider">
                {card.label}
              </span>
              {card.icon}
            </div>

            {card.custom ?? (
              <div className="mt-4">
                <span className="text-xl font-bold text-white">
                  {card.value}
                </span>
                <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {card.sub}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}