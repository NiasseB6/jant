import { useJambaar } from "@/stores/jambaar";
import { useNavigate } from "react-router-dom";
import { Trophy, Crown, Medal, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const rankColor = (r: number) => {
  if (r === 1) return "bg-gradient-hero text-primary-foreground";
  if (r === 2) return "bg-secondary text-secondary-foreground";
  if (r === 3) return "bg-terracotta text-primary-foreground";
  return "bg-muted text-foreground";
};

export const HomeLeaderboard = () => {
  const classement = useJambaar((s) => s.classement);
  const navigate = useNavigate();
  const top = classement.slice(0, 3);
  const me = classement.find((c) => c.nom.startsWith("Toi"));

  return (
    <section className="px-5 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" /> Classement JAMBAAR
        </h2>
        <button onClick={() => navigate("/jambaar")} className="text-xs font-semibold text-primary flex items-center gap-0.5">
          Voir tout <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden">
        {top.map((c) => (
          <div key={c.rang} className="flex items-center gap-3 px-4 py-3 border-b border-border/50 last:border-0">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0", rankColor(c.rang))}>
              {c.rang === 1 ? <Crown className="h-4 w-4" /> : <Medal className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{c.nom}</p>
              <p className="text-[11px] text-muted-foreground">{c.niveau}</p>
            </div>
            <span className="font-bold text-primary tabular-nums text-sm">{c.points} pts</span>
          </div>
        ))}
        {me && (
          <div className="flex items-center gap-3 px-4 py-3 bg-secondary/15 border-t-2 border-primary/30">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">
              {me.rang}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-primary truncate">{me.nom}</p>
              <p className="text-[11px] text-muted-foreground">Continue, plus que {Math.max(0, top[2].points - me.points + 1)} pts pour entrer dans le top 3 🚀</p>
            </div>
            <span className="font-bold text-primary tabular-nums text-sm">{me.points} pts</span>
          </div>
        )}
      </div>
    </section>
  );
};
