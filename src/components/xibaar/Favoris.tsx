import { athletes, epreuvesXibaar } from "@/data/xibaar";
import { useFavoris } from "@/stores/favoris";
import { EpreuveCard } from "./EpreuveCard";
import { Star, Heart } from "lucide-react";

export const Favoris = () => {
  const { epreuves: epIds, athletes: atIds, toggleAthlete } = useFavoris();
  const favEpreuves = epreuvesXibaar.filter((e) => epIds.includes(e.id));
  const favAthletes = athletes.filter((a) => atIds.includes(a.id));

  if (favEpreuves.length === 0 && favAthletes.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-hero flex items-center justify-center shadow-warm mb-3">
          <Heart className="h-7 w-7 text-primary-foreground" />
        </div>
        <h3 className="font-bold text-foreground">Aucun favori pour l'instant</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Touchez l'étoile sur une épreuve ou un athlète pour les retrouver ici.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {favEpreuves.length > 0 && (
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            Épreuves suivies ({favEpreuves.length})
          </h3>
          <div className="space-y-3">
            {favEpreuves.map((e) => <EpreuveCard key={e.id} e={e} />)}
          </div>
        </section>
      )}

      {favAthletes.length > 0 && (
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            Athlètes suivis ({favAthletes.length})
          </h3>
          <div className="space-y-2.5">
            {favAthletes.map((a) => (
              <article key={a.id} className="bg-card rounded-2xl p-3 shadow-soft border border-border/50 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-sunset flex items-center justify-center text-xl font-black text-primary-foreground shrink-0">
                  {a.prenom.charAt(0)}{a.nom.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-sm truncate">{a.prenom} {a.nom} {a.drapeau}</h4>
                  <p className="text-xs text-muted-foreground truncate">{a.discipline}</p>
                </div>
                <button
                  onClick={() => toggleAthlete(a.id)}
                  className="p-1.5 rounded-full hover:bg-secondary/20"
                  aria-label="Retirer"
                >
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
