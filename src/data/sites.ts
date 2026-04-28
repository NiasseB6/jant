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
  { id: "s1", nom: "Stade Léopold S. Senghor", ville: "Dakar", sport: "Football, Cérémonies", emoji: "⚽", lat: 14.7456, lng: -17.4416, distanceKm: 6, tempsMin: 18 },
  { id: "s2", nom: "Dakar Arena", ville: "Diamniadio", sport: "Basketball, Judo", emoji: "🏀", lat: 14.7167, lng: -17.1833, distanceKm: 32, tempsMin: 45 },
  { id: "s3", nom: "Arène Nationale de Lutte", ville: "Pikine", sport: "Lutte Olympique", emoji: "🤼", lat: 14.7553, lng: -17.3958, distanceKm: 12, tempsMin: 25 },
  { id: "s4", nom: "Stade Iba Mar Diop", ville: "Dakar", sport: "Athlétisme", emoji: "🏃", lat: 14.6922, lng: -17.4530, distanceKm: 3, tempsMin: 12 },
  { id: "s5", nom: "Piscine Olympique", ville: "Dakar", sport: "Natation", emoji: "🏊", lat: 14.7000, lng: -17.4644, distanceKm: 4, tempsMin: 14 },
  { id: "s6", nom: "Site de Saly", ville: "Mbour", sport: "Beach Volley, Voile", emoji: "🏐", lat: 14.4458, lng: -17.0050, distanceKm: 80, tempsMin: 95 },
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
    nom: "Navette JOJ",
    emoji: "🚐",
    tempsMin: Math.round(s.tempsMin * 0.85),
    prixFcfa: 0,
    note: "Gratuit avec billet JOJ",
  },
  {
    id: "t-ter",
    nom: "TER + correspondance",
    emoji: "🚆",
    tempsMin: Math.round(s.tempsMin * 0.7),
    prixFcfa: 1500,
    note: "Disponible jusqu'à Diamniadio",
  },
  {
    id: "t-brt",
    nom: "BRT / Bus DDD",
    emoji: "🚌",
    tempsMin: Math.round(s.tempsMin * 1.2),
    prixFcfa: 500,
    note: "Climatisé, voie dédiée",
  },
  {
    id: "t-taxi",
    nom: "Taxi / VTC",
    emoji: "🚕",
    tempsMin: s.tempsMin,
    prixFcfa: Math.max(2000, Math.round(s.distanceKm * 350 / 100) * 100),
    note: "Direct, négociable",
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
  n === 0 ? "Gratuit" : new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export const formatTemps = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}h${m.toString().padStart(2, "0")}` : `${m} min`;
};
