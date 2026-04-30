import { Experience, formatDuree, formatPrix } from "@/data/experiences";
import { Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const catColor: Record<string, string> = {
  Cuisine: "bg-primary text-primary-foreground",
  Danse: "bg-terracotta text-primary-foreground",
  Artisanat: "bg-secondary text-secondary-foreground",
  Culture: "bg-deep-green text-primary-foreground",
  Storytelling: "bg-foreground text-background",
};

export const ExperienceCard = ({ exp, onOpen }: { exp: Experience; onOpen: () => void }) => {
  const { t } = useTranslation();
  return (
    <article className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50 hover:shadow-warm hover:-translate-y-0.5 transition-all">
      <div className="relative h-44 overflow-hidden">
        <img
          src={exp.image}
          alt={t(exp.titre)}
          loading="lazy"
          width={768}
          height={512}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${catColor[exp.categorie]}`}>
          {t(`cosaan.experienceCategories.${exp.categorie}`)}
        </span>
        <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
          <h3 className="font-bold text-base leading-tight drop-shadow">{t(exp.titre)}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-sunset flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
            {exp.hote.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-foreground truncate">{exp.hote}</p>
            <p className="text-[11px] text-muted-foreground truncate">{exp.hoteRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3 flex-wrap">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDuree(exp.dureeMin)}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{exp.lieu}</span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{t("cosaan.smallGroup")}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-base font-black text-primary leading-none">{formatPrix(exp.prix)}</p>
            <p className="text-[10px] text-muted-foreground">{t("cosaan.perPerson")}</p>
          </div>
          <Button
            onClick={onOpen}
            className="h-10 rounded-xl bg-gradient-hero text-primary-foreground font-bold text-xs shadow-warm px-5"
          >
            {t("cosaan.participate")}
          </Button>
        </div>
      </div>
    </article>
  );
};
