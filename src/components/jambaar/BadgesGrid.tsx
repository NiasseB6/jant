import { BADGES } from "@/stores/missions";
import { useJambaar } from "@/stores/jambaar";
import { Award, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const BadgesGrid = () => {
  const { t } = useTranslation();
  const points = useJambaar((s) => s.points);
  return (
    <section className="px-5 mt-6">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        {t("badges.title")}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {BADGES.map((b, i) => {
          const unlocked = points >= b.seuil;
          const pct = Math.min(100, Math.round((points / b.seuil) * 100));
          return (
            <div
              key={b.id}
              className={cn(
                "rounded-2xl p-3 border text-center transition-all animate-scale-in",
                unlocked
                  ? "bg-gradient-card border-secondary shadow-warm hover:scale-105"
                  : "bg-muted/50 border-border/50 opacity-70"
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={cn(
                "w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-1.5",
                unlocked
                  ? "bg-gradient-hero shadow-warm animate-pulse-glow"
                  : "bg-muted"
              )}>
                {unlocked ? b.emoji : <Lock className="h-4 w-4 text-muted-foreground" />}
              </div>
              <p className={cn("text-[11px] font-bold leading-tight", unlocked ? "text-foreground" : "text-muted-foreground")}>
                {b.titre}
              </p>
              {!unlocked && (
                <>
                  <p className="text-[9px] text-muted-foreground mt-0.5">{t("common.pointsShort", { count: b.seuil })}</p>
                  <div className="h-1 rounded-full bg-muted overflow-hidden mt-1">
                    <div className="h-full bg-primary/60" style={{ width: `${pct}%` }} />
                  </div>
                </>
              )}
              {unlocked && (
                <p className="text-[9px] text-deep-green font-bold mt-0.5 uppercase tracking-wider">{t("badges.unlocked")}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
