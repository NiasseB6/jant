import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Site, getTransports, getServices, formatPrix, formatTemps } from "@/data/sites";
import { MapPin, Navigation, Clock, Route, Utensils, Hotel, Pill, Bath } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const serviceIcon = {
  Restaurant: Utensils,
  Hôtel: Hotel,
  Pharmacie: Pill,
  Toilettes: Bath,
};

type Props = {
  site: Site | null;
  onClose: () => void;
  userPos: [number, number] | null;
};

export const SiteDetailSheet = ({ site, onClose, userPos }: Props) => {
  const { t } = useTranslation();
  if (!site) return null;
  const transports = getTransports(site);
  const services = getServices(site);
  const grouped = services.reduce<Record<string, typeof services>>((acc, s) => {
    (acc[s.type] ||= []).push(s);
    return acc;
  }, {});

  const open = (mode: "navigation" | "voir") => {
    const origin = userPos ? `${userPos[0]},${userPos[1]}` : "";
    const base = `https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}${origin ? `&origin=${origin}` : ""}&travelmode=driving`;
    const url = mode === "navigation" ? `${base}&dir_action=navigate` : base;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[88vh] overflow-y-auto p-0">
        {/* Hero */}
        <div className="bg-gradient-sunset text-primary-foreground p-5 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 pattern-kente opacity-30" />
          <div className="relative">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-background/20 backdrop-blur flex items-center justify-center text-2xl shrink-0">
                {site.emoji}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-black leading-tight">{t(site.nom)}</h2>
                <p className="text-primary-foreground/85 text-xs">{t(site.sport)}</p>
                <p className="text-[11px] flex items-center gap-1 mt-1 text-primary-foreground/85">
                  <MapPin className="h-3 w-3" />{site.ville}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-background/15 backdrop-blur rounded-xl p-2.5 text-center">
                <Route className="h-4 w-4 mx-auto mb-1" />
                <p className="text-base font-black">{site.distanceKm} km</p>
                <p className="text-[10px] opacity-80">{t("yoonwi.distance")}</p>
              </div>
              <div className="bg-background/15 backdrop-blur rounded-xl p-2.5 text-center">
                <Clock className="h-4 w-4 mx-auto mb-1" />
                <p className="text-base font-black">{formatTemps(site.tempsMin)}</p>
                <p className="text-[10px] opacity-80">{t("yoonwi.eta")}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button
                onClick={() => open("voir")}
                variant="outline"
                className="flex-1 h-11 rounded-xl bg-background/10 backdrop-blur border-white/30 text-primary-foreground hover:bg-background/20"
              >
                <MapPin className="h-4 w-4 mr-1.5" />{t("yoonwi.goThere")}
              </Button>
              <Button
                onClick={() => open("navigation")}
                className="flex-1 h-11 rounded-xl bg-secondary text-secondary-foreground font-bold shadow-warm"
              >
                <Navigation className="h-4 w-4 mr-1.5" />{t("yoonwi.startNavigation")}
              </Button>
            </div>
          </div>
        </div>

        {/* Transports */}
        <section className="px-5 mt-5">
          <h3 className="text-xs uppercase tracking-wider font-bold text-primary mb-2">
            {t("yoonwi.howToGetThere")}
          </h3>
          <div className="space-y-2">
            {transports.map((tr) => (
              <div
                key={tr.id}
                className="bg-card rounded-2xl p-3 border border-border/50 shadow-soft flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-card border border-border/60 flex items-center justify-center text-2xl shrink-0">
                  {tr.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground">{t(tr.nom)}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{t(tr.note)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn(
                    "text-xs font-bold",
                    tr.prixFcfa === 0 ? "text-deep-green" : "text-primary"
                  )}>
                    {formatPrix(tr.prixFcfa)}
                  </p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 justify-end">
                    <Clock className="h-3 w-3" />{formatTemps(tr.tempsMin)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services à proximité */}
        <section className="px-5 mt-5 pb-6">
          <h3 className="text-xs uppercase tracking-wider font-bold text-primary mb-2">
            {t("yoonwi.nearbyServices")}
          </h3>
          <div className="space-y-3">
            {(Object.keys(grouped) as (keyof typeof serviceIcon)[]).map((type) => {
              const Icon = serviceIcon[type];
              return (
                <div key={type}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                      {t(`yoonwi.serviceType.${type}`)}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {grouped[type].map((s) => (
                      <div
                        key={s.id}
                        className="bg-muted/60 rounded-xl px-3 py-2 flex items-center justify-between"
                      >
                        <span className="text-sm text-foreground flex items-center gap-2">
                          <span>{s.emoji}</span>{s.nom}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-semibold">
                          {s.distanceM < 1000 ? `${s.distanceM} m` : `${(s.distanceM / 1000).toFixed(1)} km`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};
