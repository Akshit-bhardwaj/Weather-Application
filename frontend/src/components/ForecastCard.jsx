import { Droplets, Wind } from "lucide-react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(dateStr) {
  // dateStr = "2026-06-22"
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((date - today) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return SHORT_DAYS[date.getDay()];
}

function formatFullDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ForecastCard({ day }) {
  const iconUrl = day.weather.icon.startsWith("//")
    ? `https:${day.weather.icon}`
    : day.weather.icon;

  const dayLabel = formatDate(day.date);
  const fullDate = formatFullDate(day.date);

  const isToday = dayLabel === "Today";

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col items-center gap-3 relative overflow-hidden transition-all duration-200"
      style={isToday ? {
        background: "rgba(14,165,233,0.12)",
        borderColor: "rgba(14,165,233,0.3)",
      } : {}}
    >
      {/* Day name */}
      <div className="text-center">
        <p className="text-sm font-bold" style={{ color: isToday ? "#38bdf8" : "rgba(255,255,255,0.9)" }}>
          {dayLabel}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          {fullDate}
        </p>
      </div>

      {/* Weather icon */}
      <img
        src={iconUrl}
        alt={day.weather.text}
        className="w-12 h-12 object-contain"
        style={{ filter: "drop-shadow(0 2px 8px rgba(255,255,255,0.15))" }}
      />

      {/* Condition */}
      <p className="text-xs text-center font-medium leading-tight"
        style={{ color: "rgba(255,255,255,0.65)" }}>
        {day.weather.text}
      </p>

      {/* Temps */}
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-bold text-white">
          {Math.round(day.temp_max)}°
        </span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          {Math.round(day.temp_min)}°
        </span>
      </div>

      {/* Rain + wind */}
      <div className="flex items-center justify-between w-full"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "0.5rem" }}>
        <span className="flex items-center gap-1 text-xs" style={{ color: "#60a5fa" }}>
          <Droplets size={11} />
          {day.chance_of_rain}%
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          <Wind size={11} />
          {Math.round(day.wind_speed)}
        </span>
      </div>
    </div>
  );
}