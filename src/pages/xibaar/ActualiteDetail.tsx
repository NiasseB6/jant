import { useParams, Navigate } from "react-router-dom";
import { actualites, actualiteContenus } from "@/data/xibaar";
import { DetailHeader } from "@/components/xibaar/DetailHeader";
import { Button } from "@/components/ui/button";
import { Share2, User } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ActualiteDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const n = actualites.find((x) => x.id === id);
  if (!n) return <Navigate to="/xibaar" replace />;

  const extra = actualiteContenus[n.id];

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: n.titre, text: n.extrait, url });
      } catch {/* dismissed */}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success(t("xibaar.copiedLink"));
    }
  };

  return (
    <div className="animate-fade-in pb-12">
      <DetailHeader image={n.image} badge={n.categorie.toUpperCase()} titre={n.titre} sousTitre={n.date} />

      {/* Auteur + share */}
      <section className="px-5 mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span className="font-semibold">{extra?.auteur ?? t("xibaar.authorFallback")}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={share}
          className="rounded-full text-xs h-8 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Share2 className="h-3.5 w-3.5 mr-1.5" />
          {t("xibaar.share")}
        </Button>
      </section>

      {/* Extrait */}
      <section className="px-5 mt-4">
        <p className="text-base text-foreground font-semibold leading-relaxed">{n.extrait}</p>
      </section>

      {/* Contenu */}
      <article className="px-5 mt-5 space-y-4">
        {(extra?.contenu ?? [n.extrait]).map((p, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
            {p}
          </p>
        ))}
      </article>

      {/* Footer */}
      <div className="px-5 mt-8">
        <div className="bg-gradient-card rounded-2xl p-5 border border-secondary/30 text-center">
          <p className="text-xs text-muted-foreground mb-1">{t("xibaar.publishedOn", { date: n.date })}</p>
          <p className="text-sm font-bold text-foreground">{t("xibaar.appTagline")}</p>
        </div>
      </div>
    </div>
  );
};

export default ActualiteDetailPage;
