import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TARGET = new Date("2026-10-31T00:00:00").getTime();

const calc = () => {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    jours: Math.floor(diff / 86400000),
    heures: Math.floor((diff / 3600000) % 24),
    min: Math.floor((diff / 60000) % 60),
    sec: Math.floor((diff / 1000) % 60),
  };
};

const Cell = ({ label, value }: { label: string; value: number | string }) => (
  <div className="flex flex-col items-center justify-center bg-black/55 rounded-2xl px-2 py-3 min-w-[68px] border border-white/15 shadow-lg">
    <span className="text-3xl font-black text-white tabular-nums leading-none">
      {typeof value === "number" ? value.toString().padStart(2, "0") : value}
    </span>
    <span className="text-[10px] uppercase tracking-[0.18em] text-white/75 mt-2 font-semibold">
      {label}
    </span>
  </div>
);

export const Countdown = () => {
  const { t: tr } = useTranslation();
  const [t, setT] = useState(calc());
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="flex gap-2 justify-center">
      <Cell label={tr("countdown.days")} value={t.jours} />
      <Cell label={tr("countdown.hours")} value={t.heures} />
      <Cell label={tr("countdown.minutes")} value={t.min} />
      <Cell label={tr("countdown.seconds")} value={t.sec} />
    </div>
  );
};
