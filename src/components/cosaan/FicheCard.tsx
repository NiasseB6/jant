import { Fiche } from "@/data/cosaan";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  fiche: Fiche;
  to?: string;
}

export const FicheCard = ({ fiche, to }: Props) => {
  const { t } = useTranslation();
  const content = (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-soft border border-border/50 hover:shadow-warm hover:-translate-y-0.5 transition-all cursor-pointer">
      <div className="relative h-40 overflow-hidden">
        <img
          src={fiche.image}
          alt={t(fiche.titre)}
          loading="lazy"
          width={768}
          height={512}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-wider text-secondary drop-shadow">
          {t(fiche.sousTitre)}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-foreground">{t(fiche.titre)}</h3>
          {to && <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 group-hover:translate-x-1 transition-transform" />}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{t(fiche.description)}</p>
      </div>
    </article>
  );
  return to ? <Link to={to}>{content}</Link> : content;
};
