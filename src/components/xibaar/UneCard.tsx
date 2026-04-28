import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import { actualites } from "@/data/xibaar";

export const UneCard = () => {
  const une = actualites[0];
  return (
    <section className="px-5 mt-6 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          À la une
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          Top story
        </span>
      </div>

      <Link
        to={`/xibaar/actu/${une.id}`}
        className="group block relative h-64 rounded-3xl overflow-hidden shadow-warm border border-border/50"
      >
        <img
          src={une.image}
          alt={une.titre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-hero text-primary-foreground shadow-warm">
          🔥 {une.categorie}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="text-[11px] font-semibold text-secondary mb-1.5">{une.date}</p>
          <h3 className="text-xl font-black tracking-tight leading-tight drop-shadow-lg">
            {une.titre}
          </h3>
          <p className="text-xs text-white/90 leading-relaxed mt-2 line-clamp-2 drop-shadow">
            {une.extrait}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 group-hover:bg-white/25 transition">
            Lire l'article
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </section>
  );
};
