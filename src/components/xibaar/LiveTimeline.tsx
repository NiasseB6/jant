import { Radio, Trophy, Megaphone, Flag } from "lucide-react";
import { useTranslation } from "react-i18next";

type LiveItem = {
  id: string;
  type: "result" | "match" | "annonce" | "ceremonie";
};

const items: LiveItem[] = [
  { id: "l1", type: "result" },
  { id: "l2", type: "match" },
  { id: "l3", type: "annonce" },
  { id: "l4", type: "ceremonie" },
  { id: "l5", type: "result" },
];

const meta: Record<LiveItem["type"], { Icon: typeof Trophy; color: string; key: string }> = {
  result: { Icon: Trophy, color: "bg-gradient-hero text-primary-foreground", key: "result" },
  match: { Icon: Flag, color: "bg-red-500 text-white", key: "match" },
  annonce: { Icon: Megaphone, color: "bg-secondary text-secondary-foreground", key: "annonce" },
  ceremonie: { Icon: Radio, color: "bg-deep-green/90 text-white", key: "ceremonie" },
};

export const LiveTimeline = () => {
  const { t } = useTranslation();
  
  return (
    <section className="px-5 mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="relative flex">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 relative" />
          </span>
          {t("xibaar.timeline.title")}
        </h2>
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {t("xibaar.timeline.update")}
        </span>
      </div>

      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-deep-green/40 rounded-full" />

        <div className="space-y-3">
          {items.map((it, i) => {
            const m = meta[it.type];
            const Icon = m.Icon;
            return (
              <div key={it.id} className="relative animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                {/* Dot */}
                <div className="absolute -left-[18px] top-3 w-3.5 h-3.5 rounded-full bg-card border-2 border-primary shadow-warm" />
                <article className="bg-card rounded-2xl p-3.5 shadow-soft border border-border/50 hover:shadow-warm hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${m.color}`}>
                      <Icon className="h-3 w-3" />
                      {t(`xibaar.timeline.types.${m.key}`)}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold">
                      {t(`xibaar.timeline.items.${it.id}.time`)}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">
                    {t(`xibaar.timeline.items.${it.id}.title`)}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {t(`xibaar.timeline.items.${it.id}.desc`)}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
