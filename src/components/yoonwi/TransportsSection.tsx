import { Train, Bus, Car, ArrowRight } from "lucide-react";
import ter from "@/assets/yoonwi/ter-dakar.jpg";
import demdikk from "@/assets/yoonwi/bus-demdikk.jpg";
import brt from "@/assets/yoonwi/bus-brt.jpg";
import taxi from "@/assets/yoonwi/taxi-dakar.jpg";
import { useTranslation } from "react-i18next";

type T = {
  id: string;
  title: string;
  desc: string;
  tag: string;
  img: string;
  Icon: typeof Train;
  accent: string; // tailwind gradient overlay
};

const transports: T[] = [
  {
    id: "ter",
    title: "TER",
    desc: "yoonwi.transportsItems.ter.desc",
    tag: "yoonwi.transportsItems.ter.tag",
    img: ter,
    Icon: Train,
    accent: "from-emerald-900/80 via-emerald-900/30 to-transparent",
  },
  {
    id: "ddd",
    title: "Dakar Dem Dikk",
    desc: "yoonwi.transportsItems.ddd.desc",
    tag: "yoonwi.transportsItems.ddd.tag",
    img: demdikk,
    Icon: Bus,
    accent: "from-amber-900/80 via-amber-900/30 to-transparent",
  },
  {
    id: "brt",
    title: "BRT",
    desc: "yoonwi.transportsItems.brt.desc",
    tag: "yoonwi.transportsItems.brt.tag",
    img: brt,
    Icon: Bus,
    accent: "from-rose-900/80 via-rose-900/30 to-transparent",
  },
  {
    id: "taxi",
    title: "Taxis Dakar",
    desc: "yoonwi.transportsItems.taxi.desc",
    tag: "yoonwi.transportsItems.taxi.tag",
    img: taxi,
    Icon: Car,
    accent: "from-yellow-900/80 via-yellow-900/30 to-transparent",
  },
];

export const TransportsSection = () => {
  const { t } = useTranslation();
  return (
    <section className="px-5 mt-8 animate-fade-in">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="text-xl">🚍</span> {t("yoonwi.transports")}
        </h2>
        <span className="text-[11px] text-muted-foreground font-medium">
          {t("yoonwi.options", { count: transports.length })}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {transports.map(({ id, title, desc, tag, img, Icon, accent }) => (
          <article
            key={id}
            className="group relative overflow-hidden rounded-2xl shadow-soft border border-border/50 bg-card cursor-pointer transition-all duration-300 hover:shadow-warm hover:-translate-y-0.5"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={img}
                alt={title}
                loading="lazy"
                width={1024}
                height={640}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${accent}`} />
              <div className="absolute top-2.5 right-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-foreground shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t(tag)}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <h3 className="font-black text-base tracking-tight drop-shadow">{title}</h3>
                </div>
                <p className="text-[11px] text-white/90 leading-snug line-clamp-2 drop-shadow">
                  {t(desc)}
                </p>
              </div>
            </div>
            <button className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-primary hover:bg-muted/50 transition">
              {t("yoonwi.seeRoutes")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};
