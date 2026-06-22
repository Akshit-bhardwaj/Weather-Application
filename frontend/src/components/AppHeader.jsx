import { CloudSun } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full" style={{
      background: "rgba(11,15,25,0.8)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)"
    }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl" style={{
            background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
            boxShadow: "0 0 20px rgba(14,165,233,0.35)"
          }}>
            <CloudSun size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Weather<span className="gradient-text">Vista</span>
          </span>
        </div>

        {/* Badge */}
        <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(14,165,233,0.12)",
            border: "1px solid rgba(14,165,233,0.25)",
            color: "#38bdf8"
          }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Live Weather Data
        </span>
      </div>
    </header>
  );
}
