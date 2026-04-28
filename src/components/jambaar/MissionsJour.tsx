import { Target, Check, Gift } from "lucide-react";
import { MISSIONS_DU_JOUR, useMissions } from "@/stores/missions";
import { cn } from "@/lib/utils";

export const MissionsJour = () => {
  const { progres, termines, date, reset } = useMissions();
  const today = new Date().toISOString().slice(0, 10);
  if (date !== today) reset();

  const completed = termines.length;

  return (
    <section className="px-5 mt-6">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Missions du jour
          </h2>
          <p className="text-xs text-muted-foreground">
            {completed}/{MISSIONS_DU_JOUR.length} accomplies
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-bold text-secondary bg-secondary/15 px-2 py-1 rounded-full">
          Reset à minuit
        </span>
      </div>

      <div className="space-y-2.5">
        {MISSIONS_DU_JOUR.map((m) => {
          const done = termines.includes(m.id);
          const progress = progres[m.id] ?? 0;
          const pct = Math.min(100, Math.round((progress / m.objectif) * 100));
          return (
            <article
              key={m.id}
              className={cn(
                "rounded-2xl p-3 border shadow-soft transition-all animate-fade-in",
                done
                  ? "bg-deep-green/10 border-deep-green/40"
                  : "bg-gradient-card border-border/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 transition",
                  done ? "bg-deep-green text-primary-foreground" : "bg-gradient-hero shadow-warm"
                )}>
                  {done ? <Check className="h-5 w-5" /> : <span>{m.emoji}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground leading-tight">{m.titre}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{m.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs font-black text-primary">
                    <Gift className="h-3 w-3" />+{m.recompense}
                  </span>
                  <p className="text-[10px] text-muted-foreground tabular-nums">
                    {progress}/{m.objectif}
                  </p>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-2.5">
                <div
                  className={cn(
                    "h-full transition-all duration-700",
                    done ? "bg-deep-green" : "bg-gradient-hero"
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
