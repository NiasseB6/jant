import { useMemo, useState } from "react";
import { epreuvesXibaar, formatJour, SPORTS } from "@/data/xibaar";
import { EpreuveCard } from "./EpreuveCard";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Programme = () => {
  const { t, i18n } = useTranslation();
  const dates = useMemo(
    () => Array.from(new Set(epreuvesXibaar.map((e) => e.date))).sort(),
    []
  );
  const [date, setDate] = useState(dates[0]);
  const [sport, setSport] = useState("Tous");

  const filtered = epreuvesXibaar.filter(
    (e) => e.date === date && (sport === "Tous" || e.sport === sport)
  );

  return (
    <div className="space-y-4">
      {/* Calendrier horizontal */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-none">
        {dates.map((d) => {
          const isActive = d === date;
          const dt = new Date(d + "T00:00:00");
          return (
            <button
              key={d}
              onClick={() => setDate(d)}
              className={cn(
                "shrink-0 flex flex-col items-center px-4 py-2.5 rounded-2xl border-2 transition-all min-w-[68px]",
                isActive
                  ? "bg-gradient-hero text-primary-foreground border-transparent shadow-warm"
                  : "bg-card text-foreground border-border/60"
              )}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                {dt.toLocaleDateString(i18n.language.startsWith("fr") ? "fr-FR" : "en-US", { weekday: "short" })}
              </span>
              <span className="text-xl font-black leading-none mt-0.5">{dt.getDate()}</span>
              <span className="text-[10px] opacity-80 mt-0.5">
                {dt.toLocaleDateString(i18n.language.startsWith("fr") ? "fr-FR" : "en-US", { month: "short" })}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filtre sport */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-primary shrink-0" />
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-none">
          {SPORTS.map((s) => (
            <button
              key={s}
              onClick={() => setSport(s)}
              className={cn(
                "shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition",
                sport === s
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {t("xibaar.eventsCount", { count: filtered.length })} • {formatJour(date, i18n.language)}
      </p>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">{t("xibaar.noEvents")}</p>
        ) : (
          filtered.map((e) => <EpreuveCard key={e.id} e={e} />)
        )}
      </div>
    </div>
  );
};
