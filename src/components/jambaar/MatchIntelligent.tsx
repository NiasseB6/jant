import { useMemo } from "react";
import { Sparkles, Zap, MapPin, Languages } from "lucide-react";
import { useJambaar } from "@/stores/jambaar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const langueParCategorie: Record<string, string> = {
  Traduction: "Wolof / Anglais",
  Transport: "Français",
  Orientation: "Français / Anglais",
  "Premiers secours": "Français",
  Hébergement: "Français",
  Restauration: "Wolof",
};

export const MatchIntelligent = () => {
  const { demandes, helpedIds, helpRequest } = useJambaar();

  const suggestions = useMemo(() => {
    return demandes
      .filter((d) => !helpedIds.includes(d.id) && !d.auteur.includes("(vous)"))
      .map((d) => {
        let score = 100 - d.distanceKm * 10;
        if (d.categorie === "Traduction") score += 15;
        if (d.categorie === "Premiers secours") score += 25;
        return { ...d, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [demandes, helpedIds]);

  if (suggestions.length === 0) return null;

  const onHelp = (id: string, auteur: string) => {
    helpRequest(id);
    toast.success(`Tu aides ${auteur} (+50 pts) 🙌`);
  };

  return (
    <section className="px-5 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-hero flex items-center justify-center shadow-warm animate-pulse-glow">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-bold leading-tight">Personnes à aider près de toi</h2>
          <p className="text-[11px] text-muted-foreground">Suggestions intelligentes pour toi</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {suggestions.map((s, i) => (
          <article
            key={s.id}
            className="bg-gradient-card rounded-2xl p-3 border border-border/50 shadow-soft animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                {s.auteur.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-sm text-foreground truncate">{s.auteur}</p>
                  <span className="text-[9px] font-bold bg-secondary/20 text-foreground px-1.5 rounded-full">
                    {s.categorie}
                  </span>
                </div>
                <p className="text-xs text-foreground/80 line-clamp-1 mt-0.5">{s.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1 flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{s.distanceKm} km</span>
                  <span className="flex items-center gap-1">
                    <Languages className="h-3 w-3" />
                    {langueParCategorie[s.categorie] ?? "Français"}
                  </span>
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <Sparkles className="h-3 w-3" />Match {Math.round(s.score)}%
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => onHelp(s.id, s.auteur)}
              className="w-full h-9 mt-2.5 rounded-xl bg-gradient-hero text-primary-foreground font-bold text-xs shadow-warm hover:scale-[1.02] transition-transform"
            >
              J'aide
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
};
