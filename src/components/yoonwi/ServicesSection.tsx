import { MapPin } from "lucide-react";
import restoPullman from "@/assets/yoonwi/resto-pullman.jpg";
import hotelPool from "@/assets/yoonwi/hotel-pool.jpg";
import hotelRadisson from "@/assets/yoonwi/hotel-radisson.jpg";
import pharmaGuigon from "@/assets/yoonwi/pharmacie-guigon.jpg";
import { useTranslation } from "react-i18next";

type Card = { id: string; nom: string; type: string; quartier: string; img: string };

const restaurants: Card[] = [
  { id: "r1", nom: "Pullman Téranga", type: "yoonwi.servicesItems.r1.type", quartier: "yoonwi.servicesItems.r1.quartier", img: restoPullman },
  { id: "r2", nom: "Le Lagon", type: "yoonwi.servicesItems.r2.type", quartier: "yoonwi.servicesItems.r2.quartier", img: hotelPool },
  { id: "r3", nom: "Radisson Blu", type: "yoonwi.servicesItems.r3.type", quartier: "yoonwi.servicesItems.r3.quartier", img: hotelRadisson },
];

const pharmacies: Card[] = [
  { id: "p1", nom: "Pharmacie Guigon", type: "yoonwi.servicesItems.p1.type", quartier: "yoonwi.servicesItems.p1.quartier", img: pharmaGuigon },
];

const hotels: Card[] = [
  { id: "h1", nom: "Radisson Blu Dakar", type: "yoonwi.servicesItems.h1.type", quartier: "yoonwi.servicesItems.h1.quartier", img: hotelRadisson },
  { id: "h2", nom: "Pullman Téranga", type: "yoonwi.servicesItems.h2.type", quartier: "yoonwi.servicesItems.h2.quartier", img: hotelPool },
];

const Carousel = ({ items }: { items: Card[] }) => {
  const { t } = useTranslation();
  return (
  <div className="-mx-5 px-5 overflow-x-auto pb-2">
    <div className="flex gap-3 min-w-min">
      {items.map((c) => (
        <article
          key={c.id}
          className="group shrink-0 w-[230px] rounded-2xl overflow-hidden bg-card shadow-soft border border-border/50 transition-all duration-300 hover:shadow-warm hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="relative h-32 overflow-hidden">
            <img
              src={c.img}
              alt={c.nom}
              loading="lazy"
              width={1024}
              height={640}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="p-3">
            <h4 className="font-bold text-sm text-foreground leading-tight line-clamp-1">
              {c.nom}
            </h4>
            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{t(c.type)}</p>
            <p className="text-[11px] text-primary font-semibold mt-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {t(c.quartier)}
            </p>
          </div>
        </article>
      ))}
    </div>
  </div>
  );
};

export const ServicesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="mt-8 animate-fade-in">
      <div className="px-5 mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="text-xl">🏪</span> {t("yoonwi.nearbyServices")}
        </h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {t("yoonwi.nearbyDesc")}
        </p>
      </div>

      <div className="px-5 mb-2 flex items-center gap-2">
        <span className="text-base">🍽️</span>
        <h3 className="font-bold text-sm text-foreground">{t("yoonwi.restaurants")}</h3>
      </div>
      <Carousel items={restaurants} />

      <div className="px-5 mt-5 mb-2 flex items-center gap-2">
        <span className="text-base">💊</span>
        <h3 className="font-bold text-sm text-foreground">{t("yoonwi.pharmacies")}</h3>
      </div>
      <Carousel items={pharmacies} />

      <div className="px-5 mt-5 mb-2 flex items-center gap-2">
        <span className="text-base">🏨</span>
        <h3 className="font-bold text-sm text-foreground">{t("yoonwi.hotels")}</h3>
      </div>
      <Carousel items={hotels} />
    </section>
  );
};
