import { Radio, Trophy, Megaphone, Flag } from "lucide-react";

type LiveItem = {
  id: string;
  time: string;
  type: "result" | "match" | "annonce" | "ceremonie";
  title: string;
  desc: string;
};

const items: LiveItem[] = [
  {
    id: "l1",
    time: "À l'instant",
    type: "result",
    title: "🥇 Mariama Faye remporte le 200m papillon",
    desc: "L'or pour le Sénégal en 2'08''34, nouveau record national U18 !",
  },
  {
    id: "l2",
    time: "il y a 12 min",
    type: "match",
    title: "Sénégal vs Brésil 3x3 — mi-temps",
    desc: "Lionceaux 11 - 9 Brésil. Une demi-finale haletante à Dakar Arena.",
  },
  {
    id: "l3",
    time: "il y a 38 min",
    type: "annonce",
    title: "Trafic : déviation Corniche Ouest",
    desc: "Marathon junior demain 06h30 — itinéraires alternatifs via TER conseillés.",
  },
  {
    id: "l4",
    time: "il y a 1 h",
    type: "ceremonie",
    title: "Cérémonie de remise des médailles - Lutte",
    desc: "Modou Sow honoré devant l'Arène Nationale comble.",
  },
  {
    id: "l5",
    time: "il y a 2 h",
    type: "result",
    title: "🥉 Aïssatou Ba en bronze - Taekwondo -55kg",
    desc: "Première médaille du taekwondo sénégalais aux JOJ.",
  },
];

const meta: Record<LiveItem["type"], { Icon: typeof Trophy; color: string; label: string }> = {
  result: { Icon: Trophy, color: "bg-gradient-hero text-primary-foreground", label: "Résultat" },
  match: { Icon: Flag, color: "bg-red-500 text-white", label: "Match" },
  annonce: { Icon: Megaphone, color: "bg-secondary text-secondary-foreground", label: "Info" },
  ceremonie: { Icon: Radio, color: "bg-deep-green/90 text-white", label: "Cérémonie" },
};

export const LiveTimeline = () => (
  <section className="px-5 mt-8 animate-fade-in">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <span className="relative flex">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute" />
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 relative" />
        </span>
        En direct
      </h2>
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Mise à jour live
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
                    {m.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold">{it.time}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground leading-snug">{it.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{it.desc}</p>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
