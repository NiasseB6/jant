import { useState } from "react";
import { Link } from "react-router-dom";
import { Athlete, athletes, athleteExtras } from "@/data/xibaar";
import { useFavoris } from "@/stores/favoris";
import { Input } from "@/components/ui/input";
import { Search, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AthleteRow = ({ a }: { a: Athlete }) => {
  const { isAthlete, toggleAthlete } = useFavoris();
  const fav = isAthlete(a.id);
  const photo = athleteExtras[a.id]?.photo;
  return (
    <Link
      to={`/xibaar/athlete/${a.id}`}
      className="bg-card rounded-2xl p-3 shadow-soft border border-border/50 flex items-center gap-3 hover:shadow-warm transition"
    >
      {photo ? (
        <img
          src={photo}
          alt={`${a.prenom} ${a.nom}`}
          loading="lazy"
          className="w-12 h-12 rounded-2xl object-cover shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-2xl bg-gradient-sunset flex items-center justify-center text-xl font-black text-primary-foreground shrink-0">
          {a.prenom.charAt(0)}{a.nom.charAt(0)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-foreground text-sm truncate">
          {a.prenom} {a.nom} <span className="text-base">{a.drapeau}</span>
        </h3>
        <p className="text-xs text-muted-foreground truncate">{a.discipline}</p>
        <p className="text-[11px] text-primary font-semibold">{a.age} ans • {a.pays}</p>
      </div>
      <button
        onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); toggleAthlete(a.id); }}
        className="p-1.5 rounded-full hover:bg-secondary/20"
        aria-label="Favori"
      >
        <Star className={cn("h-5 w-5", fav ? "fill-secondary text-secondary" : "text-muted-foreground")} />
      </button>
      <ChevronRight className="h-4 w-4 text-muted-foreground -ml-1" />
    </Link>
  );
};

export const Athletes = () => {
  const [q, setQ] = useState("");
  const filtered = athletes.filter((a) => {
    const t = q.trim().toLowerCase();
    if (!t) return true;
    return `${a.prenom} ${a.nom} ${a.pays} ${a.discipline}`.toLowerCase().includes(t);
  });

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un athlète, un pays, un sport..."
          maxLength={60}
          className="pl-9 h-11 rounded-xl bg-card"
        />
      </div>
      <p className="text-xs text-muted-foreground">{filtered.length} athlètes</p>
      <div className="space-y-2.5">
        {filtered.map((a) => <AthleteRow key={a.id} a={a} />)}
      </div>
    </div>
  );
};
