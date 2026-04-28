import { useParams, Navigate, Link } from "react-router-dom";
import { athletes, athleteExtras, epreuvesXibaar, formatJour } from "@/data/xibaar";
import { DetailHeader } from "@/components/xibaar/DetailHeader";
import { useFavoris } from "@/stores/favoris";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Star, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const AthleteDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const a = athletes.find((x) => x.id === id);
  const { isAthlete, toggleAthlete } = useFavoris();
  if (!a) return <Navigate to="/xibaar" replace />;

  const extras = athleteExtras[a.id];
  const fav = isAthlete(a.id);
  const prochaines = a.prochaines.map((eid) => epreuvesXibaar.find((e) => e.id === eid)).filter(Boolean);

  return (
    <div className="animate-fade-in pb-32">
      <DetailHeader image={extras?.photo} badge={t("xibaar.athleteBadge")} titre={`${a.prenom} ${a.nom}`} sousTitre={`${a.drapeau} ${a.pays}`}>
        <p className="text-white/90 text-sm mt-1 drop-shadow">
          {a.discipline} · {a.age} {t("xibaar.yearsOld")}
        </p>
      </DetailHeader>

      {/* Bio */}
      <section className="px-5 mt-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("xibaar.biography")}</h2>
        </div>
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">{a.bio}</p>
        </div>
      </section>

      {/* Parcours */}
      {extras?.parcours && (
        <section className="px-5 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-primary" />
            <h2 className="font-bold text-foreground">{t("xibaar.journey")}</h2>
          </div>
          <div className="relative pl-5 space-y-3 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-secondary/40">
            {extras.parcours.map((p, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[18px] top-1.5 w-3 h-3 rounded-full bg-gradient-hero shadow-warm border-2 border-background" />
                <div className="bg-card rounded-xl p-3 shadow-soft border border-border/50">
                  <p className="text-xs font-black text-primary tabular-nums">{p.annee}</p>
                  <p className="text-sm text-foreground">{p.etape}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Performances */}
      <section className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("xibaar.trophies")}</h2>
        </div>
        <div className="space-y-2">
          {a.performances.map((p, i) => (
            <div key={i} className="bg-gradient-card rounded-xl p-3 shadow-soft border border-secondary/30 flex items-center gap-3">
              <span className="shrink-0 text-xs font-black text-primary tabular-nums bg-card rounded-lg px-2 py-1 border border-border/50">{p.annee}</span>
              <span className="text-sm text-foreground font-medium">🏆 {p.titre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Prochaines épreuves */}
      <section className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("xibaar.upcomingEvents")}</h2>
        </div>
        <div className="space-y-2.5">
          {prochaines.map((e) => e && (
            <Link
              key={e.id}
              to={`/xibaar/epreuve/${e.id}`}
              className="block bg-card rounded-2xl p-4 shadow-soft border border-border/50 hover:shadow-warm transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-hero flex items-center justify-center text-xl shadow-warm shrink-0">
                  {e.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-foreground truncate">{e.discipline}</p>
                  <p className="text-[11px] text-muted-foreground capitalize">
                    {formatJour(e.date, i18n.language)} · {e.heure} · {e.lieu}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-5 z-40 max-w-md mx-auto">
        <Button
          size="lg"
          onClick={() => {
            toggleAthlete(a.id);
            toast.success(fav ? t("xibaar.removedFavorites") : `Tu suis ${a.prenom} ${a.nom} ⭐`);
          }}
          className={cn(
            "w-full h-12 rounded-full font-bold shadow-warm",
            fav ? "bg-card text-foreground border-2 border-secondary" : "bg-gradient-hero text-primary-foreground"
          )}
        >
          <Star className={cn("h-4 w-4 mr-2", fav && "fill-secondary text-secondary")} />
          {fav ? t("xibaar.unfollow") : t("xibaar.followAthlete")}
        </Button>
      </div>
    </div>
  );
};

export default AthleteDetailPage;
