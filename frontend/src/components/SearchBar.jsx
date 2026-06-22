import { Search, Navigation, X } from "lucide-react";

export default function SearchBar({
  city,
  setCity,
  onSearch,
  onLocationSearch,
  isGeoLoading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch();
  };

  const handleClear = () => {
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex items-center gap-3"
    >
      {/* Input wrapper */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none"
          style={{ color: "rgba(255,255,255,0.4)" }}>
          <Search size={18} />
        </span>

        <input
          id="city-search"
          type="text"
          placeholder="Search any city…"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl glass-input text-white text-sm font-medium"
          autoComplete="off"
          spellCheck="false"
        />

        {/* Clear button */}
        {city && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-3 flex items-center justify-center"
            style={{ color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search button */}
      <button
        id="search-btn"
        type="submit"
        disabled={!city.trim()}
        className="text-white font-semibold px-6 py-3.5 rounded-2xl flex items-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer"
        style={{
          background: city.trim()
            ? "linear-gradient(135deg, #0ea5e9, #6366f1)"
            : "rgba(255,255,255,0.06)",
          boxShadow: city.trim() ? "0 4px 20px rgba(14,165,233,0.3)" : "none",
          border: "1px solid rgba(255,255,255,0.1)",
          opacity: city.trim() ? 1 : 0.5,
        }}
      >
        Search
      </button>

      {/* GPS button */}
      <button
        id="gps-btn"
        type="button"
        onClick={onLocationSearch}
        disabled={isGeoLoading}
        title="Use my current location"
        aria-label="Use current location"
        className="glass-card p-3.5 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
        style={{ color: isGeoLoading ? "#38bdf8" : "rgba(255,255,255,0.7)" }}
      >
        <Navigation
          size={18}
          className={isGeoLoading ? "animate-spin" : ""}
        />
      </button>
    </form>
  );
}