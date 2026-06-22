import { useState } from "react";
import { CloudSun } from "lucide-react";

import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import ForecastSection from "../components/ForecastSection";
import HourlySection from "../components/HourlySection";

import {
  getCurrentWeather,
  getForecast,
  getHourlyWeather,
  getWeatherByLocation,
} from "../api/weatherApi";

/* ── Welcome / empty state ───────────────────────────── */
function WelcomeState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 animate-fade-in">
      {/* Animated icon */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "rgba(14,165,233,0.15)", animationDuration: "2.5s" }} />
        <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}>
          <CloudSun size={44} style={{ color: "#38bdf8" }} />
        </div>
      </div>

      <div className="text-center max-w-sm">
        <h2 className="text-2xl font-bold text-white mb-2">
          Check the weather anywhere
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          Search for any city or use your current location
          to get live weather, hourly forecast, and 7-day outlook.
        </p>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {["🌡 Real-time data", "📍 GPS location", "🕐 Hourly forecast", "📅 7-day outlook"].map(f => (
          <span key={f} className="text-xs px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Home page ───────────────────────────────────────── */
export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourly, setHourly] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isGeoLoading, setIsGeoLoading] = useState(false);

  /* ── Fetch by city name ── */
  const searchWeather = async () => {
    const trimmed = city.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData, hourlyData] = await Promise.all([
        getCurrentWeather(trimmed),
        getForecast(trimmed, 7),
        getHourlyWeather(trimmed),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setHourly(hourlyData);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        (err?.response?.status === 400
          ? "City not found. Please check the spelling and try again."
          : "Unable to reach the weather service. Please try again.");
      setError(msg);
      setWeather(null);
      setForecast(null);
      setHourly(null);
    } finally {
      setLoading(false);
    }
  };

  /* ── Fetch by GPS ── */
  const handleLocationSearch = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsGeoLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          setLoading(true);
          const [weatherData, forecastData, hourlyData] = await Promise.all([
            getWeatherByLocation(coords.latitude, coords.longitude),
            getForecast(`${coords.latitude},${coords.longitude}`, 7),
            getHourlyWeather(`${coords.latitude},${coords.longitude}`),
          ]);

          setWeather(weatherData);
          setForecast(forecastData);
          setHourly(hourlyData);
          setCity(weatherData.city);
        } catch (err) {
          setError("Could not fetch weather for your location. Please try again.");
          setWeather(null);
          setForecast(null);
          setHourly(null);
        } finally {
          setLoading(false);
          setIsGeoLoading(false);
        }
      },
      (geoErr) => {
        setIsGeoLoading(false);
        if (geoErr.code === 1) {
          setError("Location access denied. Please allow location permissions and try again.");
        } else {
          setError("Unable to get your location. Please search by city name instead.");
        }
      }
    );
  };

  const hasResults = weather || forecast || hourly;

  return (
    <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">

      {/* Search bar */}
      <div className="mb-10">
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={searchWeather}
          onLocationSearch={handleLocationSearch}
          isGeoLoading={isGeoLoading}
        />

        {/* Inline error below search bar */}
        {error && !loading && (
          <div className="mt-4 max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-2xl"
              style={{
                background: "rgba(248,113,113,0.08)",
                border: "1px solid rgba(248,113,113,0.2)",
                color: "#fca5a5",
              }}>
              <span className="mt-0.5 shrink-0">⚠️</span>
              <p className="text-sm leading-snug">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Welcome state — shown before first search */}
      {!hasResults && !loading && !error && <WelcomeState />}

      {/* Results */}
      {(hasResults || loading) && (
        <div className="flex flex-col gap-8">
          {/* Current weather */}
          <CurrentWeather data={weather} loading={loading} error={null} />

          {/* Divider */}
          {!loading && <div className="section-divider" />}

          {/* Hourly forecast */}
          <HourlySection hourly={hourly} loading={loading} />

          {/* Divider */}
          {!loading && <div className="section-divider" />}

          {/* 7-day forecast */}
          <ForecastSection forecast={forecast} loading={loading} />
        </div>
      )}

    </main>
  );
}