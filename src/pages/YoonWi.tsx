import { useState } from "react";
import { Map as MapIcon, Navigation, MapPin, Loader2, LocateFixed, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Site, sites, formatTemps } from "@/data/sites";
import { VenueMap } from "@/components/yoonwi/VenueMap";
import { SiteDetailSheet } from "@/components/yoonwi/SiteDetailSheet";
import { PageHeader } from "@/components/PageHeader";
import headerImg from "@/assets/headers/yoonwi.jpg";
import { TransportsSection } from "@/components/yoonwi/TransportsSection";
import { ServicesSection } from "@/components/yoonwi/ServicesSection";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const CITY_VALUES = ["ALL", "Dakar", "Pikine", "Diamniadio", "Mbour"] as const;

const YoonWi = () => {
  const { t } = useTranslation();
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [selected, setSelected] = useState<Site | null>(null);
  const [detail, setDetail] = useState<Site | null>(null);
  const [locating, setLocating] = useState(false);
  const [ville, setVille] = useState<(typeof CITY_VALUES)[number]>("ALL");

  const filtered = ville === "ALL" ? sites : sites.filter((s) => s.ville === ville);

  const locate = () => {
    if (!navigator.geolocation) {
      toast.error("Géolocalisation indisponible");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setUserPos([p.coords.latitude, p.coords.longitude]);
        setLocating(false);
        toast.success("Position trouvée");
      },
      () => {
        setLocating(false);
        toast.error("Impossible de récupérer votre position");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const itineraire = (s: Site) => {
    const origin = userPos ? `${userPos[0]},${userPos[1]}` : "";
    const url = `https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}${origin ? `&origin=${origin}` : ""}&travelmode=driving&dir_action=navigate`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="animate-fade-in pb-24 lg:pb-0">
      <PageHeader
        image={headerImg}
        icon={MapIcon}
        title={t("yoonwi.title")}
        subtitle={t("yoonwi.subtitle")}
        badge={t("yoonwi.badge")}
      >
        <Button
          onClick={locate}
          disabled={locating}
          size="sm"
          className="bg-white/15 backdrop-blur-md border border-white/30 hover:bg-white/25 text-white rounded-full"
        >
          {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
          <span className="ml-1.5 text-xs font-bold">{t("yoonwi.locateMe")}</span>
        </Button>
      </PageHeader>

      {/* Carte */}
      <section className="px-5 -mt-4">
        <div className="rounded-3xl overflow-hidden shadow-warm border-2 border-card h-[280px] bg-muted">
          <VenueMap
            userPos={userPos}
            selected={selected}
            sites={filtered}
            onSelect={(s) => {
              setSelected(s);
              setDetail(s);
            }}
          />
        </div>
        <div className="mt-2 px-1 flex flex-wrap items-center gap-2">
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Info className="h-3 w-3" />
            {t("yoonwi.mapHint")}
          </p>
          {selected && (
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-muted text-muted-foreground hover:text-foreground transition"
            >
              <X className="h-3 w-3" />
              {t("yoonwi.clearSelection")}
            </button>
          )}
        </div>
      </section>

      {/* Filtres villes */}
      <section className="px-5 mt-5">
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-5 px-5">
          {CITY_VALUES.map((v) => (
            <button
              key={v}
              onClick={() => setVille(v)}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition",
                ville === v
                  ? "bg-secondary text-secondary-foreground shadow-warm"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {v === "ALL" ? t("yoonwi.citiesAll") : v}
            </button>
          ))}
        </div>
      </section>

      {/* Liste sites */}
      <section className="px-5 mt-4">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          {t("yoonwi.sitesCount", { count: filtered.length })}
        </h2>
        <div className="space-y-3">
          {filtered.map((s) => {
            const isSel = selected?.id === s.id;
            return (
              <article
                key={s.id}
                className={cn(
                  "bg-gradient-card rounded-2xl p-4 shadow-soft border transition-all",
                  isSel ? "border-primary shadow-warm" : "border-border/50"
                )}
              >
                <button
                  onClick={() => { setSelected(s); setDetail(s); }}
                  className="flex items-start gap-3 w-full text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center text-2xl shadow-warm shrink-0">
                    {s.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm leading-tight">{s.nom}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.sport}</p>
                    <div className="flex items-center gap-3 text-[11px] mt-1">
                      <span className="text-primary font-semibold flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{s.ville}
                      </span>
                      <span className="text-muted-foreground">{s.distanceKm} km</span>
                      <span className="text-muted-foreground">{formatTemps(s.tempsMin)}</span>
                    </div>
                  </div>
                </button>
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => { setSelected(s); setDetail(s); }}
                    variant="outline"
                    className="flex-1 h-10 rounded-xl border-secondary text-foreground font-semibold text-xs"
                  >
                    {t("yoonwi.details")}
                  </Button>
                  <Button
                    onClick={() => itineraire(s)}
                    className="flex-1 h-10 rounded-xl bg-gradient-hero text-primary-foreground font-bold text-xs shadow-warm"
                  >
                    <Navigation className="h-3.5 w-3.5 mr-1.5" />
                    {t("yoonwi.start")}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Transports & Services */}
      <TransportsSection />
      <ServicesSection />

      <SiteDetailSheet site={detail} userPos={userPos} onClose={() => setDetail(null)} />
    </div>
  );
};

export default YoonWi;
