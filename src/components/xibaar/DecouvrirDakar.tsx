import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";
import ter from "@/assets/yoonwi/ter-dakar.jpg";
import resto from "@/assets/yoonwi/resto-pullman.jpg";
import hotel from "@/assets/yoonwi/hotel-radisson.jpg";
import { useTranslation } from "react-i18next";

const items = [
  { img: ter, labelKey: "app.nav.yoonwi", descKey: "xibaar.ui.discoverTransports" },
  { img: resto, labelKey: "cosaan.gastroTab", descKey: "xibaar.ui.discoverRestaurants" },
  { img: hotel, labelKey: "common.hotels", descKey: "xibaar.ui.discoverHotels" },
];

export const DecouvrirDakar = () => {
  const { t } = useTranslation();
  return (
  <section className="px-5 mt-8 animate-fade-in">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <Compass className="h-5 w-5 text-primary" />
        {t("xibaar.ui.discoverDakar")}
      </h2>
      <Link
        to="/yoon-wi"
        className="text-[11px] font-bold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
      >
        {t("common.seeAll")} <ArrowRight className="h-3 w-3" />
      </Link>
    </div>

    <div className="grid grid-cols-3 gap-2.5">
      {items.map((it) => (
        <Link
          key={it.labelKey}
          to="/yoon-wi"
          className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft border border-border/50 hover:shadow-warm transition-all"
        >
          <img
            src={it.img}
            alt={t(it.labelKey)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white">
            <h3 className="font-black text-xs leading-tight drop-shadow">{t(it.labelKey)}</h3>
            <p className="text-[9px] text-white/85 mt-0.5 line-clamp-1">{t(it.descKey)}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
  );
};
