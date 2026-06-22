import { CloudSun, MapPin, CalendarDays, Clock3 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white">
      <div className="max-w-7xl mx-auto px-6 min-h-[85vh] grid md:grid-cols-2 items-center gap-12">

        {/* Left Side */}
        <div>
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            🌎 Real Time Weather Updates
          </span>

          <h1 className="text-6xl font-bold mt-6 leading-tight">
            Live Weather
            <br />
            Forecast
          </h1>

          <p className="text-xl mt-6 text-white/90 max-w-xl">
            Get accurate current weather, hourly forecasts and
            7-day predictions for any city around the world.
          </p>

          {/* Search */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter city name..."
              className="flex-1 px-5 py-4 rounded-xl text-black outline-none shadow-lg"
            />

            <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-slate-100 transition">
              Search
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-10 max-w-lg">

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <Clock3 />
              <p className="mt-2 font-semibold">Hourly Forecast</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <CalendarDays />
              <p className="mt-2 font-semibold">7 Day Forecast</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <MapPin />
              <p className="mt-2 font-semibold">Location Based</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              🌡️
              <p className="mt-2 font-semibold">Real Time Data</p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <CloudSun
            size={280}
            className="drop-shadow-2xl animate-pulse"
          />
        </div>

      </div>
    </section>
  );
}