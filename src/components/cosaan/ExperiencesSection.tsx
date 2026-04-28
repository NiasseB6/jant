import { useMemo, useState } from "react";
import { CATEGORIES_EXP, Experience, experiences, formatDuree, formatPrix } from "@/data/experiences";
import { ExperienceCard } from "./ExperienceCard";
import { ExperienceDetail } from "./ExperienceDetail";
import { ProposeExperienceDialog } from "./ProposeExperienceDialog";
import { useExperiences } from "@/stores/experiences";
import { cn } from "@/lib/utils";
import { Sparkles, Heart, MapPin, Clock } from "lucide-react";

export const ExperiencesSection = () => {
  const [cat, setCat] = useState<string>("Toutes");
  const [open, setOpen] = useState<Experience | null>(null);
  const proposees = useExperiences((s) => s.proposees);

  const filtered = useMemo(
    () => (cat === "Toutes" ? experiences : experiences.filter((e) => e.categorie === cat)),
    [cat]
  );

  const cats = ["Toutes", ...CATEGORIES_EXP];

  return (
    <div className="space-y-5">
      {/* Hero immersif */}
      <div className="relative bg-gradient-hero rounded-3xl p-5 text-primary-foreground shadow-warm overflow-hidden">
        <div className="absolute inset-0 pattern-kente opacity-30" />
        <div className="relative flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-background/20 backdrop-blur flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-black text-lg leading-tight">Expériences locales</h3>
            <p className="text-primary-foreground/85 text-xs mt-1">
              Vivez le Sénégal autrement, accompagné·e par des hôtes passionnés.
            </p>
          </div>
        </div>
      </div>

      {/* Filtres catégories */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-5 px-5">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition",
              cat === c
                ? "bg-secondary text-secondary-foreground shadow-warm"
                : "bg-muted text-muted-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-4">
        {filtered.map((e) => (
          <ExperienceCard key={e.id} exp={e} onOpen={() => setOpen(e)} />
        ))}
      </div>

      {/* Expériences proposées par la communauté */}
      {proposees.length > 0 && (
        <section>
          <h4 className="text-xs uppercase tracking-wider font-bold text-primary mb-2 flex items-center gap-1.5 mt-4">
            <Heart className="h-3.5 w-3.5 fill-primary" />
            Proposées par la communauté ({proposees.length})
          </h4>
          <div className="space-y-3">
            {proposees.map((p) => (
              <article key={p.id} className="bg-gradient-card rounded-2xl p-4 border border-border/50 border-l-4 border-l-secondary shadow-soft">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{p.categorie}</span>
                <h5 className="font-bold text-foreground mt-0.5">{p.titre}</h5>
                <p className="text-xs text-muted-foreground mt-1 mb-2 line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                  <span>par <strong className="text-foreground">{p.hote}</strong></span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDuree(p.dureeMin)}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.lieu}</span>
                  <span className="font-bold text-primary">{formatPrix(p.prix)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CTA proposer */}
      <div className="bg-gradient-card border-2 border-dashed border-primary/40 rounded-2xl p-5 text-center">
        <p className="text-sm text-foreground font-semibold mb-1">Vous êtes Sénégalais·e ?</p>
        <p className="text-xs text-muted-foreground mb-3">
          Partagez votre culture et générez un revenu en proposant votre propre activité.
        </p>
        <ProposeExperienceDialog />
      </div>

      <ExperienceDetail exp={open} onClose={() => setOpen(null)} />
    </div>
  );
};
