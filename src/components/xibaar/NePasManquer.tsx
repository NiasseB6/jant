import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import { epreuvesXibaar, formatJour } from "@/data/xibaar";

export const NePasManquer = () => {
  // Pick the 4 most exciting upcoming events
  const ids = ["e8", "e4", "e1", "e12"];
  const events = ids
    .map((id) => epreuvesXibaar.find((e) => e.id === id))
    .filter(Boolean) as typeof epreuvesXibaar;

  return (
    <section className="mt-8 animate-fade-in">
      <div className="px-5 flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Star className="h-5 w-5 text-secondary fill-secondary" />
          À ne pas manquer
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Cette semaine
        </span>
      </div>

      <div className="-mx-5 px-5 overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-min">
          {events.map((e) => (
            <Link
              key={e.id}
              to={`/xibaar/epreuve/${e.id}`}
              className="group shrink-0 w-[260px] rounded-2xl overflow-hidden bg-card shadow-soft border border-border/50 hover:shadow-warm hover:-translate-y-0.5 transition-all"
            >
              <div className="relative h-32 bg-gradient-sunset flex items-center justify-center">
                <span className="text-6xl drop-shadow-lg">{e.emoji}</span>
                <span className="absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 text-foreground shadow-sm">
                  {e.sport}
                </span>
                <div className="absolute inset-0 pattern-kente opacity-25" />
              </div>
              <div className="p-3.5">
                <h3 className="font-bold text-sm text-foreground leading-tight line-clamp-2">
                  {e.discipline}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <Clock className="h-3 w-3" />
                    {e.heure}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{e.lieu}</span>
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 font-semibold">
                  {formatJour(e.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
