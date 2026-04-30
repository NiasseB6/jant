import { useParams, Navigate, Link } from "react-router-dom";
import { epreuvesXibaar, athletes, formatJour } from "@/data/xibaar";
import { DetailHeader } from "@/components/xibaar/DetailHeader";
import { useFavoris } from "@/stores/favoris";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Star, Users, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const statutStyle: Record<string, string> = {
  "à venir": "bg-secondary/20 text-secondary border-secondary/40",
  "en cours": "bg-primary text-primary-foreground animate-pulse border-primary",
  "terminé": "bg-muted text-muted-foreground border-border",
};

const EpreuveDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const e = epreuvesXibaar.find((x) => x.id === id);
  const { isEpreuve, toggleEpreuve } = useFavoris();
  if (!e) return <Navigate to="/xibaar" replace />;

  const fav = isEpreuve(e.id);
  const participants = (e.participants ?? []).map((aid) => athletes.find((a) => a.id === aid)).filter(Boolean);

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

  const statutKeys: Record<string, string> = {
    "à venir": "upcoming",
    "en cours": "ongoing",
    "terminé": "finished",
  };

  return (
    <div className="animate-fade-in pb-32">
      <DetailHeader 
        emoji={e.emoji} 
        badge={t("xibaar.ui.eventBadge")} 
        titre={t(`xibaar.epreuves.${e.id}.discipline`, { defaultValue: e.discipline })} 
        sousTitre={t(`xibaar.sports.${getSportKey(e.sport)}`)}
      >
        <div className="mt-2">
          <span className={cn("inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border", statutStyle[e.statut])}>
            {t(`xibaar.status.${statutKeys[e.statut]}`)}
          </span>
        </div>
      </DetailHeader>

      {/* Infos clés */}
      <section className="px-5 mt-5 grid grid-cols-3 gap-2.5">
        <div className="bg-card rounded-2xl p-3 shadow-soft border border-border/50">
          <Calendar className="h-4 w-4 text-primary mb-1" />
          <p className="text-[10px] text-muted-foreground uppercase">{t("xibaar.ui.date")}</p>
          <p className="text-xs font-bold text-foreground capitalize leading-tight">{formatJour(e.date, i18n.language)}</p>
        </div>
        <div className="bg-card rounded-2xl p-3 shadow-soft border border-border/50">
          <Clock className="h-4 w-4 text-primary mb-1" />
          <p className="text-[10px] text-muted-foreground uppercase">{t("xibaar.ui.time")}</p>
          <p className="text-xs font-bold text-foreground">{e.heure}</p>
        </div>
        <div className="bg-card rounded-2xl p-3 shadow-soft border border-border/50">
          <MapPin className="h-4 w-4 text-primary mb-1" />
          <p className="text-[10px] text-muted-foreground uppercase">{t("xibaar.ui.place")}</p>
          <p className="text-xs font-bold text-foreground leading-tight truncate">
            {t(`xibaar.epreuves.${e.id}.lieu`, { defaultValue: e.lieu })}
          </p>
        </div>
      </section>

      {/* Description */}
      {e.description && (
        <section className="px-5 mt-5">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-primary" />
            <h2 className="font-bold text-foreground">{t("xibaar.ui.aboutEvent")}</h2>
          </div>
          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(`xibaar.epreuves.${e.id}.description`, { defaultValue: e.description })}
            </p>
          </div>
        </section>
      )}

      {/* Participants */}
      <section className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("xibaar.ui.participants")}</h2>
          <span className="text-xs text-muted-foreground">({participants.length})</span>
        </div>
        {participants.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">{t("xibaar.ui.listSoon")}</p>
        ) : (
          <div className="space-y-2.5">
            {participants.map((a) => a && (
              <Link
                key={a.id}
                to={`/xibaar/athlete/${a.id}`}
                className="flex items-center gap-3 bg-card rounded-2xl p-3 shadow-soft border border-border/50 hover:shadow-warm transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-sunset flex items-center justify-center text-base font-black text-primary-foreground shrink-0">
                  {a.prenom.charAt(0)}{a.nom.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">
                    {a.prenom} {a.nom} <span className="text-base">{a.drapeau}</span>
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t(`xibaar.athletes.${a.id}.discipline`, { defaultValue: a.discipline })} · {a.age} {t("common.yearsOld")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Favoris */}
      <div className="fixed bottom-20 left-0 right-0 px-5 z-40 max-w-md mx-auto">
        <Button
          size="lg"
          onClick={() => {
            toggleEpreuve(e.id);
            toast.success(fav ? t("xibaar.ui.removedFavorites") : `${t("xibaar.ui.addedFavorites")} ⭐`);
          }}
          className={cn(
            "w-full h-12 rounded-full font-bold shadow-warm",
            fav ? "bg-card text-foreground border-2 border-secondary" : "bg-gradient-hero text-primary-foreground"
          )}
        >
          <Star className={cn("h-4 w-4 mr-2", fav && "fill-secondary text-secondary")} />
          {fav ? t("xibaar.ui.removeFavorites") : t("xibaar.ui.addFavorites")}
        </Button>
      </div>
    </div>
  );
};

export default EpreuveDetailPage;
