import { useNavigate } from "react-router-dom";
import { HandHeart, PenSquare, Recycle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const actions = [
    { icon: HandHeart, label: t("homeActions.become"), sub: t("homeActions.helpSomeone"), to: "/jambaar", color: "bg-gradient-hero text-primary-foreground" },
    { icon: PenSquare, label: t("homeActions.publish"), sub: t("homeActions.feed"), to: "/jambaar", color: "bg-secondary text-secondary-foreground" },
    { icon: Recycle, label: t("homeActions.scanWaste"), sub: t("homeActions.recycling"), to: "/jambaar", color: "bg-deep-green/15 text-deep-green border border-deep-green/30" },
    { icon: MapPin, label: t("homeActions.collectPoint"), sub: t("homeActions.findNearYou"), to: "/yoon-wi", color: "bg-card border border-border text-foreground" },
  ];
  return (
    <section className="px-5 mt-6">
      <h2 className="text-lg font-bold mb-3">{t("homeActions.title")}</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a, i) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              onClick={() => navigate(a.to)}
              className={cn(
                "rounded-2xl p-4 text-left shadow-soft hover:shadow-warm hover:-translate-y-0.5 transition-all animate-scale-in",
                a.color
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Icon className="h-6 w-6 mb-2" />
              <p className="text-sm font-bold leading-tight">{a.label}</p>
              <p className="text-[11px] opacity-80 mt-0.5">{a.sub}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};
