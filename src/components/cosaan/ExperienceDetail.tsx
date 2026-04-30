import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Experience, formatDuree, formatPrix } from "@/data/experiences";
import { Clock, MapPin, Check, Sparkles, BookOpen, Heart } from "lucide-react";
import { useExperiences } from "@/stores/experiences";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const ExperienceDetail = ({
  exp,
  onClose,
}: {
  exp: Experience | null;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const isReservee = useExperiences((s) => s.isReservee);
  const toggle = useExperiences((s) => s.toggleReserver);
  if (!exp) return null;
  const reserved = isReservee(exp.id);

  const reserver = () => {
    const now = toggle(exp.id);
    toast.success(now ? `${t("cosaan.reserved")} : ${t(exp.titre)} 🎉` : t("cosaan.reservationCancelled"));
  };

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[92vh] overflow-y-auto p-0">
        <div className="relative h-56 -mt-2">
          <img src={exp.image} alt={t(exp.titre)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <div className="px-5 -mt-12 relative pb-6">
          <SheetHeader className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
              {t(`cosaan.experienceCategories.${exp.categorie}`)}
            </span>
            <SheetTitle className="text-2xl leading-tight">{t(exp.titre)}</SheetTitle>
          </SheetHeader>

          <div className="flex items-center gap-3 mt-3 bg-card rounded-2xl p-3 shadow-soft border border-border/50">
            <div className="w-12 h-12 rounded-full bg-gradient-sunset flex items-center justify-center text-primary-foreground font-bold shrink-0">
              {exp.hote.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">{exp.hote}</p>
              <p className="text-xs text-muted-foreground">{exp.hoteRole}</p>
            </div>
            <Heart className="h-5 w-5 text-primary fill-primary/20" />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-muted rounded-xl p-2.5 text-center">
              <Clock className="h-4 w-4 mx-auto text-primary mb-1" />
              <p className="text-xs font-bold">{formatDuree(exp.dureeMin)}</p>
              <p className="text-[10px] text-muted-foreground">{t("cosaan.duration")}</p>
            </div>
            <div className="bg-muted rounded-xl p-2.5 text-center">
              <MapPin className="h-4 w-4 mx-auto text-primary mb-1" />
              <p className="text-xs font-bold truncate">{exp.lieu}</p>
              <p className="text-[10px] text-muted-foreground">{t("cosaan.location")}</p>
            </div>
            <div className="bg-gradient-hero rounded-xl p-2.5 text-center text-primary-foreground">
              <Sparkles className="h-4 w-4 mx-auto mb-1" />
              <p className="text-xs font-black">{formatPrix(exp.prix)}</p>
              <p className="text-[10px] opacity-90">{t("cosaan.perPersShort")}</p>
            </div>
          </div>

          <section className="mt-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-primary mb-2 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />{t("cosaan.description")}
            </h4>
            <p className="text-sm text-foreground/85 leading-relaxed">{t(exp.description)}</p>
          </section>

          <section className="mt-5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-primary mb-2">
              {t("cosaan.whatYouLearn")}
            </h4>
            <ul className="space-y-2">
              {exp.apprentissages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/85">{t(a)}</span>
                </li>
              ))}
            </ul>
          </section>

          {exp.galerie.length > 1 && (
            <section className="mt-5">
              <h4 className="text-xs uppercase tracking-wider font-bold text-primary mb-2">{t("cosaan.gallery")}</h4>
              <div className="flex gap-2 overflow-x-auto -mx-5 px-5">
                {exp.galerie.map((g, i) => (
                  <img key={i} src={g} alt="" loading="lazy" className="h-24 rounded-xl object-cover shrink-0" />
                ))}
              </div>
            </section>
          )}

          <div className="sticky bottom-0 -mx-5 mt-6 px-5 py-3 bg-background/95 backdrop-blur-md border-t border-border">
            <Button
              onClick={reserver}
              className={
                reserved
                  ? "w-full h-13 rounded-2xl bg-deep-green text-primary-foreground font-bold text-base"
                  : "w-full h-13 rounded-2xl bg-gradient-hero text-primary-foreground font-bold text-base shadow-warm"
              }
            >
              {reserved ? <><Check className="h-5 w-5 mr-2" />{t("cosaan.reserved")}</> : t("cosaan.reserve")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
