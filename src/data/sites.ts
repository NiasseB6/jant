import i18n from "i18next";

export type Site = {
  id: string;
  nom: string;
  ville: string;
  sport: string;
  emoji: string;
  lat: number;
  lng: number;
  distanceKm: number; // depuis Dakar centre
  tempsMin: number;
};

export const sites: Site[] = [
  { id: "s1", nom: "data.sites.s1.nom", ville: "Dakar", sport: "data.sites.s1.sport", emoji: "⚽", lat: 14.7456, lng: -17.4416, distanceKm: 6, tempsMin: 18 },
  { id: "s2", nom: "data.sites.s2.nom", ville: "Diamniadio", sport: "data.sites.s2.sport", emoji: "🏀", lat: 14.7167, lng: -17.1833, distanceKm: 32, tempsMin: 45 },
  { id: "s3", nom: "data.sites.s3.nom", ville: "Pikine", sport: "data.sites.s3.sport", emoji: "🤼", lat: 14.7553, lng: -17.3958, distanceKm: 12, tempsMin: 25 },
  { id: "s4", nom: "data.sites.s4.nom", ville: "Dakar", sport: "data.sites.s4.sport", emoji: "🏃", lat: 14.6922, lng: -17.4530, distanceKm: 3, tempsMin: 12 },
  { id: "s5", nom: "data.sites.s5.nom", ville: "Dakar", sport: "data.sites.s5.sport", emoji: "🏊", lat: 14.7000, lng: -17.4644, distanceKm: 4, tempsMin: 14 },
  { id: "s6", nom: "data.sites.s6.nom", ville: "Mbour", sport: "data.sites.s6.sport", emoji: "🏐", lat: 14.4458, lng: -17.0050, distanceKm: 80, tempsMin: 95 },
];

export type Transport = {
  id: string;
  nom: string;
  emoji: string;
  tempsMin: number;
  prixFcfa: number;
  note: string;
};

export const getTransports = (s: Site): Transport[] => [
  {
    id: "t-navette",
    nom: "data.transports.navette.nom",
    emoji: "🚐",
    tempsMin: Math.round(s.tempsMin * 0.85),
    prixFcfa: 0,
    note: "data.transports.navette.note",
  },
  {
    id: "t-ter",
    nom: "data.transports.ter.nom",
    emoji: "🚆",
    tempsMin: Math.round(s.tempsMin * 0.7),
    prixFcfa: 1500,
    note: "data.transports.ter.note",
  },
  {
    id: "t-brt",
    nom: "data.transports.brt.nom",
    emoji: "🚌",
    tempsMin: Math.round(s.tempsMin * 1.2),
    prixFcfa: 500,
    note: "data.transports.brt.note",
  },
  {
    id: "t-taxi",
    nom: "data.transports.taxi.nom",
    emoji: "🚕",
    tempsMin: s.tempsMin,
    prixFcfa: Math.max(2000, Math.round(s.distanceKm * 350 / 100) * 100),
    note: "data.transports.taxi.note",
  },
];

export type Service = {
  id: string;
  nom: string;
  type: "Restaurant" | "Hôtel" | "Pharmacie" | "Toilettes";
  distanceM: number;
  emoji: string;
};

export const getServices = (s: Site): Service[] => [
  { id: `${s.id}-r1`, nom: "Chez Loutcha", type: "Restaurant", distanceM: 180, emoji: "🍽️" },
  { id: `${s.id}-r2`, nom: "Le Lagon 1", type: "Restaurant", distanceM: 420, emoji: "🍽️" },
  { id: `${s.id}-h1`, nom: "Radisson Blu", type: "Hôtel", distanceM: 650, emoji: "🏨" },
  { id: `${s.id}-h2`, nom: "Pullman Téranga", type: "Hôtel", distanceM: 900, emoji: "🏨" },
  { id: `${s.id}-p1`, nom: "Pharmacie Guigon", type: "Pharmacie", distanceM: 240, emoji: "💊" },
  { id: `${s.id}-w1`, nom: "Sanitaires JOJ A", type: "Toilettes", distanceM: 60, emoji: "🚻" },
  { id: `${s.id}-w2`, nom: "Sanitaires JOJ B", type: "Toilettes", distanceM: 220, emoji: "🚻" },
];

export const formatPrix = (n: number) =>
  n === 0 ? i18n.t("data.common.gratuit") : new Intl.NumberFormat(i18n.language === "fr" ? "fr-FR" : "en-US").format(n) + " " + i18n.t("data.common.fcfa");

export const formatTemps = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}${i18n.t("data.common.hour")}${m.toString().padStart(2, "0")}` : `${m} ${i18n.t("data.common.min")}`;
};
