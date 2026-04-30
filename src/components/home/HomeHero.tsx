import { useJambaar } from "@/stores/jambaar";
import { useMissions } from "@/stores/missions";
import { getNiveau, getNextThreshold } from "@/data/jambaar";
import { Flame, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export const HomeHero = () => {
  const { t } = useTranslation();
  const { userName, points } = useJambaar();
  const helpedIds = useJambaar((s) => s.helpedIds);
  const totalAides = useMissions((s) => s.totalAides);
  const aides = totalAides + helpedIds.length;
  const prenom = userName.split(" ")[0];
  const niveau = getNiveau(points);
  const next = getNextThreshold(points);
  const progress = niveau === "Jambaar" ? 100 : Math.min(100, Math.round((points / next) * 100));

  return (
    <header className="relative px-5 pt-10 pb-16 rounded-b-[2.5rem] shadow-warm overflow-hidden bg-gradient-hero text-primary-foreground">
      <div className="absolute inset-0 pattern-kente opacity-15 mix-blend-overlay" />
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-secondary/30 blur-3xl animate-pulse-glow" />
      <div className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black border border-white/30 shadow-warm">
          {prenom.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs opacity-90 tracking-wider uppercase">{t("homeHero.hello")}</p>
          <h1 className="text-2xl font-black truncate drop-shadow">{prenom}</h1>
          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-md text-[11px] font-bold border border-white/30">
            <Flame className="h-3 w-3" /> {t("homeHero.active")}
          </span>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black tabular-nums drop-shadow">{points}</p>
          <p className="text-[10px] uppercase tracking-wider opacity-90">{t("home.points")}</p>
        </div>
      </div>

      <div className="relative mt-5 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-1 font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            {t("homeHero.levelLine", { level: niveau, count: aides })}
          </span>
          <span className="font-bold tabular-nums">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/25 overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] mt-2 opacity-95 italic">
          {aides > 0 ? t("homeHero.helpedThisWeek", { count: aides }) : t("homeHero.firstAction")}
        </p>
      </div>
    </header>
  );
};
