import { Epreuve } from "@/data/xibaar";
import { useFavoris } from "@/stores/favoris";
import { Clock, MapPin, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const statutStyle: Record<string, string> = {
  "à venir": "bg-secondary/20 text-foreground",
  "en cours": "bg-primary text-primary-foreground animate-pulse",
  "terminé": "bg-muted text-muted-foreground",
};

const statutKeys: Record<string, string> = {
  "à venir": "upcoming",
  "en cours": "ongoing",
  "terminé": "finished",
};

export const EpreuveCard = ({ e }: { e: Epreuve }) => {
  const { t } = useTranslation();
  const { isEpreuve, toggleEpreuve } = useFavoris();
  const fav = isEpreuve(e.id);

  const getSportKey = (sport: string) => {
    const map: Record<string, string> = {
      "Athlétisme": "athletics",
      "Basketball": "basketball",
      "Lutte": "wrestling",
      "Natation": "swimming",
      "Taekwondo": "taekwondo",
      "Cyclisme": "cycling",
      "Football": "football",
      "Judo": "judo",
      "Beach Volley": "beachVolley",
    };
    return map[sport] || "all";
  };

  return (
    <Link to={`/xibaar/epreuve/${e.id}`} className="block">
      <article className="bg-gradient-card rounded-2xl p-4 shadow-soft border border-border/50 hover:shadow-warm hover:-translate-y-0.5 transition-all cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center text-2xl shadow-warm shrink-0">
            {e.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {t(`xibaar.sports.${getSportKey(e.sport)}`)}
                </p>
                <h3 className="font-bold text-foreground text-sm leading-tight truncate">
                  {t(`xibaar.epreuves.${e.id}.discipline`, { defaultValue: e.discipline })}
                </h3>
              </div>
              <button
                onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); toggleEpreuve(e.id); }}
                aria-label={t("xibaar.ui.favorites")}
                className="p-1.5 -mr-1 -mt-1 rounded-full hover:bg-secondary/20 transition"
              >
                <Star
                  className={cn("h-5 w-5 transition", fav ? "fill-secondary text-secondary" : "text-muted-foreground")}
                />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{e.heure}</span>
              <span className="flex items-center gap-1 truncate">
                <MapPin className="h-3 w-3" />
                {t(`xibaar.epreuves.${e.id}.lieu`, { defaultValue: e.lieu })}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className={cn("inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", statutStyle[e.statut])}>
                {t(`xibaar.status.${statutKeys[e.statut]}`)}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
