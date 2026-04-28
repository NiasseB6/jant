import { useParams, Navigate } from "react-router-dom";
import { artisanat } from "@/data/cosaan";
import { DetailHeader } from "@/components/cosaan/DetailHeader";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Sparkles, BookOpen, Hammer } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ArtisanatDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const cat = artisanat.find((a) => a.id === id);
  if (!cat) return <Navigate to="/cosaan" replace />;

  return (
    <div className="animate-fade-in pb-8">
      <DetailHeader image={cat.image} titre={cat.titre} sousTitre={cat.sousTitre} badge={t("cosaan.craftBadge")} />

      {/* Galerie */}
      <section className="px-5 mt-6">
        <h2 className="font-bold text-foreground mb-3">{t("cosaan.productsCreations")}</h2>
        <div className="grid grid-cols-3 gap-2">
          {cat.galerie.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${cat.titre} ${i + 1}`}
              loading="lazy"
              className="w-full aspect-square object-cover rounded-xl shadow-soft"
            />
          ))}
        </div>
      </section>

      {/* Savoir-faire */}
      <section className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Hammer className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("cosaan.knowHow")}</h2>
        </div>
        <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">{cat.savoirFaire}</p>
        </div>
      </section>

      {/* Histoire */}
      <section className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("cosaan.history")}</h2>
        </div>
        <div className="bg-gradient-card rounded-2xl p-5 shadow-soft border border-secondary/30">
          <p className="text-sm text-muted-foreground leading-relaxed">{cat.histoire}</p>
        </div>
      </section>

      {/* Produits */}
      <section className="px-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-foreground">{t("cosaan.whatYouFind")}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {cat.produits.map((p) => (
            <span
              key={p}
              className="bg-card border border-border/50 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* Artisans */}
      <section className="px-5 mt-8">
        <h2 className="font-bold text-foreground mb-3">{t("cosaan.artisansMeet")}</h2>
        <div className="space-y-3">
          {cat.artisans.map((a) => (
            <div
              key={a.nom}
              className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 flex items-center gap-3"
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-hero text-primary-foreground font-black flex items-center justify-center text-base shadow-warm">
                {a.nom
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-foreground text-sm truncate">{a.nom}</h3>
                <p className="text-xs text-muted-foreground truncate">{a.metier}</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {a.ville}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 rounded-full text-xs h-8 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => toast.success(t("cosaan.contactShared", { contact: a.contact }))}
              >
                <Phone className="h-3 w-3 mr-1" />
                {t("cosaan.contact")}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArtisanatDetail;
