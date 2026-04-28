import { useParams, Navigate } from "react-router-dom";
import { gastronomie } from "@/data/cosaan";
import { DetailHeader } from "@/components/cosaan/DetailHeader";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, GraduationCap, ChefHat, Utensils, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const PlatDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const plat = gastronomie.find((p) => p.id === id);
  if (!plat) return <Navigate to="/cosaan" replace />;

  return (
    <div className="animate-fade-in pb-8">
      <DetailHeader image={plat.image} titre={plat.titre} sousTitre={plat.sousTitre} badge={t("cosaan.gastronomyBadge")} />

      {/* Origine & Importance */}
      <section className="px-5 mt-6 space-y-4">
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="font-bold text-foreground">{t("cosaan.origin")}</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{plat.origine}</p>
        </div>
        <div className="bg-gradient-card rounded-2xl p-5 shadow-soft border border-secondary/30">
          <h2 className="font-bold text-foreground mb-2">{t("cosaan.culturalImportance")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{plat.importance}</p>
        </div>
      </section>

      {/* Ingrédients */}
      <section className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Utensils className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("cosaan.ingredients")}</h2>
        </div>
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
          <ul className="space-y-2">
            {plat.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recette */}
      <section className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <ChefHat className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("cosaan.recipeStepByStep")}</h2>
        </div>
        <ol className="space-y-3">
          {plat.etapes.map((step, i) => (
            <li
              key={i}
              className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 flex gap-3"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-hero text-primary-foreground font-bold flex items-center justify-center text-sm shadow-warm">
                {i + 1}
              </div>
              <p className="text-sm text-foreground leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Restaurants */}
      <section className="px-5 mt-8">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("cosaan.whereToEat")}</h2>
        </div>
        <div className="space-y-3">
          {plat.restaurants.map((r) => (
            <div
              key={r.nom}
              className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <h3 className="font-bold text-foreground text-sm truncate">{r.nom}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {r.lieu}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-secondary justify-end">
                  <Star className="h-3.5 w-3.5 fill-secondary" />
                  <span className="text-sm font-bold">{r.note}</span>
                </div>
                <p className="text-[11px] text-primary font-semibold">{r.prix}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Masterclass */}
      <section className="px-5 mt-8">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("cosaan.learnCooking")}</h2>
        </div>
        <div className="space-y-3">
          {plat.masterclasses.map((m) => (
            <div
              key={m.titre}
              className="bg-gradient-card rounded-2xl p-4 shadow-soft border border-border/50"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground text-sm">{m.titre}</h3>
                  <p className="text-xs text-muted-foreground">{t("cosaan.withHost", { name: m.hote })} · {m.lieu}</p>
                </div>
                <span className="shrink-0 text-sm font-black text-primary">
                  {m.prixFcfa.toLocaleString(i18n.language.startsWith("fr") ? "fr-FR" : "en-US")} F
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {m.dureeMin} min
                </span>
                <Button
                  size="sm"
                  className="bg-gradient-hero text-primary-foreground rounded-full h-8 px-4 text-xs"
                  onClick={() => toast.success(t("cosaan.registrationConfirmed", { title: m.titre }))}
                >
                  {t("cosaan.participate")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlatDetail;
