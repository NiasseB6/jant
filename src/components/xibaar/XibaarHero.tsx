import { useEffect, useState } from "react";
import { Radio, Clock } from "lucide-react";
import xibaarImg from "@/assets/headers/xibaar.jpg";
import { useTranslation } from "react-i18next";

export const XibaarHero = () => {
  const { t, i18n } = useTranslation();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString(i18n.language.startsWith("fr") ? "fr-FR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Dakar",
  });

  return (
    <header className="relative px-5 pt-10 pb-12 rounded-b-[2.5rem] overflow-hidden text-white shadow-warm">
      {/* Background image with subtle Ken-Burns zoom */}
      <img
        src={xibaarImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover animate-[heroZoom_18s_ease-in-out_infinite_alternate]"
      />

      {/* Sénégal-inspired soft overlay (vert · jaune · rouge) */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(135deg, hsl(145 60% 22% / 0.55) 0%, hsl(42 100% 45% / 0.35) 50%, hsl(0 70% 45% / 0.55) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />
      <div className="absolute inset-0 pattern-kente opacity-15 mix-blend-overlay" />

      <div className="relative">
        {/* Live row */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] px-2.5 py-1 rounded-full bg-red-600 text-white shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {t("xibaar.hero.live")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
            <Clock className="h-3 w-3" />
            {t("xibaar.hero.clock", { time })}
          </span>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-3 border border-white/20 shadow-lg">
          <Radio className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-4xl font-black tracking-tight drop-shadow-lg">{t("xibaar.hero.title")}</h1>
        <p className="text-white/90 text-sm mt-1.5 drop-shadow-md max-w-md leading-relaxed">
          {t("xibaar.hero.subtitle")}
        </p>
      </div>

      <style>{`
        @keyframes heroZoom {
          0%   { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1%, -1%); }
        }
      `}</style>
    </header>
  );
};
