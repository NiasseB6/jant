import { actualites } from "@/data/xibaar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Actualites = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      {actualites.map((n) => (
        <Link to={`/xibaar/actu/${n.id}`} key={n.id} className="block">
          <article className="group bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50 hover:shadow-warm hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className="relative h-40 overflow-hidden bg-muted">
              <img
                src={n.image}
                alt={n.titre}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-gradient-hero text-primary-foreground shadow-warm">
                {n.categorie}
              </span>
              <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-secondary drop-shadow">{n.date}</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-foreground mb-1">{n.titre}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{n.extrait}</p>
              <p className="text-[11px] font-semibold text-primary mt-2">{t("xibaar.readArticle")} →</p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};
