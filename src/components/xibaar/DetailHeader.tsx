import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  image?: string;
  emoji?: string;
  bgClass?: string;
  badge?: string;
  titre: string;
  sousTitre?: string;
  children?: ReactNode;
}

export const DetailHeader = ({ image, emoji, bgClass, badge, titre, sousTitre, children }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <header className="relative h-[280px] sm:h-[320px] overflow-hidden rounded-b-[2rem] shadow-warm">
      {image ? (
        <img src={image} alt={titre} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className={`absolute inset-0 ${bgClass ?? "bg-gradient-sunset"}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/85" />
      <div className="absolute inset-0 pattern-kente opacity-15 mix-blend-overlay" />

      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition"
        aria-label={t("common.back")}
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      {emoji && (
        <div className="absolute top-4 right-4 w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-3xl shadow-lg">
          {emoji}
        </div>
      )}

      <div className="absolute bottom-5 left-5 right-5 text-white">
        {badge && (
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-secondary mb-2 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded-full">
            {badge}
          </span>
        )}
        {sousTitre && (
          <p className="text-secondary text-[11px] font-bold uppercase tracking-wider drop-shadow">
            {sousTitre}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl font-black drop-shadow-lg leading-tight">{titre}</h1>
        {children}
      </div>
    </header>
  );
};
