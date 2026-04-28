import { useState } from "react";
import { Landmark, UtensilsCrossed, MapPinned, Palette, Sparkles } from "lucide-react";
import { artisanat, gastronomie, lieux, Fiche } from "@/data/cosaan";
import { FicheCard } from "@/components/cosaan/FicheCard";
import { ExperiencesSection } from "@/components/cosaan/ExperiencesSection";
import { PageHeader } from "@/components/PageHeader";
import headerImg from "@/assets/headers/cosaan.jpg";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type TabKey = "experiences" | "gastro" | "lieux" | "artisanat";

const tabs: { key: TabKey; label: string; icon: typeof UtensilsCrossed; data?: Fiche[] }[] = [
  { key: "experiences", label: "Expériences", icon: Sparkles },
  { key: "gastro", label: "Gastronomie", icon: UtensilsCrossed, data: gastronomie },
  { key: "lieux", label: "Lieux", icon: MapPinned, data: lieux },
  { key: "artisanat", label: "Artisanat", icon: Palette, data: artisanat },
];

const Cosaan = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<TabKey>("experiences");
  const current = tabs.find((tab) => tab.key === active)!;
  const translatedTabs = tabs.map((tab) => ({
    ...tab,
    label:
      tab.key === "experiences"
        ? t("cosaan.experiences")
        : tab.key === "gastro"
          ? t("cosaan.gastronomy")
          : tab.key === "lieux"
            ? t("cosaan.places")
            : t("cosaan.craft"),
  }));

  return (
    <div className="animate-fade-in">
      <PageHeader
        image={headerImg}
        icon={Landmark}
        title="Cosaan"
        subtitle={t("cosaan.subtitle")}
        badge={t("cosaan.badge")}
      />

      {/* Tabs */}
      <div className="px-5 mt-5">
        <div className="bg-card rounded-2xl p-1.5 shadow-soft border border-border/50 grid grid-cols-4 gap-1">
          {translatedTabs.map((t) => {
            const Icon = t.icon;
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 rounded-xl text-[10px] font-semibold transition-all",
                  isActive
                    ? "bg-gradient-hero text-primary-foreground shadow-warm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu */}
      <section className="px-5 mt-5 space-y-4">
        {active === "experiences" ? (
          <ExperiencesSection />
        ) : (
          current.data!.map((f) => {
            const prefix =
              active === "gastro" ? "plat" : active === "lieux" ? "lieu" : "artisanat";
            return <FicheCard key={f.id} fiche={f} to={`/cosaan/${prefix}/${f.id}`} />;
          })
        )}
      </section>

      <div className="h-6" />
    </div>
  );
};

export default Cosaan;
