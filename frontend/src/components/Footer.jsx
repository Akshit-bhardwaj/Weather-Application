import { CloudSun } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Branding */}
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl"
              style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }}>
              <CloudSun size={16} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">
              Weather<span className="gradient-text">Vista</span>
            </span>
          </div>

          {/* Stack info */}
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
            Built with React · FastAPI · WeatherAPI.com
          </p>

          {/* Copyright */}
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2026 Akshit Bhardwaj
          </p>
        </div>
      </div>
    </footer>
  );
}