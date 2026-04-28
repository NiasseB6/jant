import { Heart, Users, Sparkles, TrendingUp } from "lucide-react";
import { useJambaar } from "@/stores/jambaar";
import { useMissions } from "@/stores/missions";

export const ImpactSocial = () => {
  const points = useJambaar((s) => s.points);
  const helpedIds = useJambaar((s) => s.helpedIds);
  const totalAides = useMissions((s) => s.totalAides);
  const aides = totalAides + helpedIds.length;
  const minutesOffertes = aides * 12;

  return (
    <section className="px-5 mt-6">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        Ton impact
      </h2>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gradient-card rounded-2xl p-3 text-center border border-border/50 shadow-soft animate-scale-in">
          <Users className="h-5 w-5 mx-auto text-primary mb-1" />
          <p className="text-xl font-black text-foreground tabular-nums">{aides}</p>
          <p className="text-[10px] text-muted-foreground leading-tight">personnes<br />aidées</p>
        </div>
        <div className="bg-gradient-card rounded-2xl p-3 text-center border border-border/50 shadow-soft animate-scale-in">
          <Heart className="h-5 w-5 mx-auto text-primary mb-1 fill-primary/20" />
          <p className="text-xl font-black text-foreground tabular-nums">{minutesOffertes}</p>
          <p className="text-[10px] text-muted-foreground leading-tight">minutes<br />offertes</p>
        </div>
        <div className="bg-gradient-hero rounded-2xl p-3 text-center text-primary-foreground shadow-warm animate-scale-in">
          <Sparkles className="h-5 w-5 mx-auto mb-1" />
          <p className="text-xl font-black tabular-nums">{points}</p>
          <p className="text-[10px] opacity-90 leading-tight">points<br />Téranga</p>
        </div>
      </div>
      {aides > 0 && (
        <p className="text-center text-xs text-muted-foreground mt-3 italic animate-fade-in">
          « Tu as déjà aidé {aides} personne{aides > 1 ? "s" : ""} — la téranga vit grâce à toi 🇸🇳 »
        </p>
      )}
    </section>
  );
};
