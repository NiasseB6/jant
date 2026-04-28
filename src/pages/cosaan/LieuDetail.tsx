import { useParams, Navigate } from "react-router-dom";
import { lieux } from "@/data/cosaan";
import { DetailHeader } from "@/components/cosaan/DetailHeader";
import { Button } from "@/components/ui/button";
import { Navigation, Clock, Route, Info, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

const LieuDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const lieu = lieux.find((l) => l.id === id);
  if (!lieu) return <Navigate to="/cosaan" replace />;

  const goThere = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lieu.coords.lat},${lieu.coords.lng}&travelmode=driving`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="animate-fade-in pb-32">
      <DetailHeader image={lieu.image} titre={lieu.titre} sousTitre={lieu.sousTitre} badge={t("cosaan.placeBadge")} />

      {/* Stats */}
      <section className="px-5 mt-5 grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-4 shadow-soft border border-border/50">
          <Route className="h-4 w-4 text-primary mb-1" />
          <p className="text-[11px] text-muted-foreground">{t("cosaan.distance")}</p>
          <p className="font-black text-foreground">{lieu.distanceKm} km</p>
          <p className="text-[10px] text-muted-foreground">{t("cosaan.distanceFromDakar")}</p>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-soft border border-border/50">
          <Clock className="h-4 w-4 text-primary mb-1" />
          <p className="text-[11px] text-muted-foreground">{t("cosaan.trip")}</p>
          <p className="font-bold text-foreground text-sm leading-tight">{lieu.tempsTrajet}</p>
        </div>
      </section>

      {/* Galerie */}
      <section className="px-5 mt-6">
        <h2 className="font-bold text-foreground mb-3">{t("cosaan.gallery")}</h2>
        <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-2">
          {lieu.galerie.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${lieu.titre} ${i + 1}`}
              loading="lazy"
              className="shrink-0 w-64 h-44 object-cover rounded-2xl shadow-soft"
            />
          ))}
        </div>
      </section>

      {/* Histoire */}
      <section className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("cosaan.history")}</h2>
        </div>
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">{lieu.histoire}</p>
        </div>
      </section>

      {/* Importance */}
      <section className="px-5 mt-4">
        <div className="bg-gradient-card rounded-2xl p-5 shadow-soft border border-secondary/30">
          <h2 className="font-bold text-foreground mb-2">{t("cosaan.culturalImportance")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{lieu.importance}</p>
        </div>
      </section>

      {/* Bon à savoir */}
      <section className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("cosaan.goodToKnow")}</h2>
        </div>
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50 space-y-2">
          {lieu.bonAsavoir.map((b, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA fixe */}
      <div className="fixed bottom-20 left-0 right-0 px-5 z-40 max-w-md mx-auto">
        <Button
          onClick={goThere}
          size="lg"
          className="w-full bg-gradient-hero text-primary-foreground rounded-full shadow-warm h-12 font-bold"
        >
          <Navigation className="h-4 w-4 mr-2" />
          {t("cosaan.goThere")}
        </Button>
      </div>
    </div>
  );
};

export default LieuDetail;
