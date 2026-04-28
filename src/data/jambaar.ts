export type Niveau = "Talibé" | "Ndongo" | "Jambaar";

export type Demande = {
  id: string;
  auteur: string;
  categorie: string;
  description: string;
  localisation: string;
  distanceKm: number;
  createdAt: string;
};

export type Classement = {
  rang: number;
  nom: string;
  points: number;
  niveau: Niveau;
};

export const CATEGORIES = [
  "Transport",
  "Traduction",
  "Orientation",
  "Premiers secours",
  "Hébergement",
  "Restauration",
  "Autre",
];

export const getNiveau = (points: number): Niveau => {
  if (points >= 1000) return "Jambaar";
  if (points >= 300) return "Ndongo";
  return "Talibé";
};

export const getNextThreshold = (points: number): number => {
  if (points >= 1000) return 1000;
  if (points >= 300) return 1000;
  return 300;
};

export const initialDemandes: Demande[] = [
  {
    id: "d1",
    auteur: "Awa S.",
    categorie: "Traduction",
    description: "Besoin d'aide en wolof pour des visiteurs anglophones près du stade.",
    localisation: "Stade L. Senghor",
    distanceKm: 0.8,
    createdAt: "il y a 5 min",
  },
  {
    id: "d2",
    auteur: "Ibrahima D.",
    categorie: "Transport",
    description: "Cherche un covoiturage vers Diamniadio pour la finale de basket 3x3.",
    localisation: "Plateau, Dakar",
    distanceKm: 1.4,
    createdAt: "il y a 12 min",
  },
  {
    id: "d3",
    auteur: "Mariama F.",
    categorie: "Orientation",
    description: "Perdue, je cherche l'entrée Nord de l'Arène Nationale.",
    localisation: "Pikine",
    distanceKm: 2.1,
    createdAt: "il y a 20 min",
  },
  {
    id: "d4",
    auteur: "Cheikh N.",
    categorie: "Premiers secours",
    description: "Petit malaise, besoin d'eau et d'un point ombragé rapidement.",
    localisation: "Corniche Ouest",
    distanceKm: 3.0,
    createdAt: "il y a 28 min",
  },
];

export const initialClassement: Classement[] = [
  { rang: 1, nom: "Aïssatou Ba", points: 1840, niveau: "Jambaar" },
  { rang: 2, nom: "Modou Sow", points: 1320, niveau: "Jambaar" },
  { rang: 3, nom: "Fatou Diop", points: 1110, niveau: "Jambaar" },
  { rang: 4, nom: "Cheikh Ndiaye", points: 720, niveau: "Ndongo" },
  { rang: 5, nom: "Mariama Faye", points: 540, niveau: "Ndongo" },
  { rang: 6, nom: "Ibrahima Diop", points: 410, niveau: "Ndongo" },
  { rang: 7, nom: "Toi (Codou)", points: 420, niveau: "Ndongo" },
  { rang: 8, nom: "Awa Sarr", points: 240, niveau: "Talibé" },
];
