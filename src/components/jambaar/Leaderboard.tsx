import { Trophy, Crown, Medal } from "lucide-react";
import { useJambaar } from "@/stores/jambaar";
import { cn } from "@/lib/utils";

const rankColor = (r: number) => {
  if (r === 1) return "bg-gradient-hero text-primary-foreground";
  if (r === 2) return "bg-secondary text-secondary-foreground";
  if (r === 3) return "bg-terracotta text-primary-foreground";
  return "bg-muted text-foreground";
};

export const Leaderboard = () => {
  const classement = useJambaar((s) => s.classement);
  return (
    <section className="px-5 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">Classement Jambaar</h2>
      </div>
      <div className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden">
        {classement.slice(0, 8).map((c) => {
          const isMe = c.nom.startsWith("Toi");
          return (
            <div
              key={c.rang}
              className={cn(
                "flex items-center gap-3 px-4 py-3 border-b border-border/50 last:border-0 transition-colors",
                isMe && "bg-secondary/15"
              )}
            >
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0", rankColor(c.rang))}>
                {c.rang === 1 ? <Crown className="h-4 w-4" /> : c.rang <= 3 ? <Medal className="h-4 w-4" /> : c.rang}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("font-semibold text-sm truncate", isMe && "text-primary")}>{c.nom}</p>
                <p className="text-[11px] text-muted-foreground">{c.niveau}</p>
              </div>
              <span className="font-bold text-primary tabular-nums text-sm">{c.points} pts</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
