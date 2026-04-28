import { useState } from "react";
import { Newspaper, Calendar, Users, Star } from "lucide-react";
import { Programme } from "@/components/xibaar/Programme";
import { Athletes } from "@/components/xibaar/Athletes";
import { Actualites } from "@/components/xibaar/Actualites";
import { Favoris } from "@/components/xibaar/Favoris";
import { XibaarHero } from "@/components/xibaar/XibaarHero";
import { UneCard } from "@/components/xibaar/UneCard";
import { LiveTimeline } from "@/components/xibaar/LiveTimeline";
import { NePasManquer } from "@/components/xibaar/NePasManquer";
import { DecouvrirDakar } from "@/components/xibaar/DecouvrirDakar";
import { cn } from "@/lib/utils";
import { useFavoris } from "@/stores/favoris";
import { useTranslation } from "react-i18next";

type TabKey = "programme" | "athletes" | "actus" | "favoris";

const Xibaar = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabKey>("programme");
  const favCount = useFavoris((s) => s.epreuves.length + s.athletes.length);

  const tabs: { key: TabKey; label: string; icon: typeof Calendar; badge?: number }[] = [
    { key: "programme", label: t("xibaar.programme"), icon: Calendar },
    { key: "athletes", label: t("xibaar.athletes"), icon: Users },
    { key: "actus", label: t("xibaar.news"), icon: Newspaper },
    { key: "favoris", label: t("xibaar.favorites"), icon: Star, badge: favCount || undefined },
  ];

  return (
    <div className="animate-fade-in">
      <XibaarHero />

      {/* Hub sections */}
      <UneCard />
      <LiveTimeline />
      <NePasManquer />

      {/* Tabs sticky */}
      <div className="px-5 mt-8 sticky top-0 z-30 bg-background/95 backdrop-blur-md py-2 -mx-1">
        <div className="bg-card rounded-2xl p-1.5 shadow-soft border border-border/50 grid grid-cols-4 gap-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = t.key === tab;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-semibold transition-all",
                  isActive
                    ? "bg-gradient-hero text-primary-foreground shadow-warm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                {t.badge ? (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center">
                    {t.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <section className="px-5 mt-4">
        {tab === "programme" && <Programme />}
        {tab === "athletes" && <Athletes />}
        {tab === "actus" && <Actualites />}
        {tab === "favoris" && <Favoris />}
      </section>

      {/* Cross-link Yoon-Wi */}
      <DecouvrirDakar />

      <div className="h-8" />
    </div>
  );
};

export default Xibaar;
