import thieboudienne from "@/assets/cosaan/thieboudienne.jpg";
import yassa from "@/assets/cosaan/yassa.webp";
import bissap from "@/assets/cosaan/bissap.webp";
import goree from "@/assets/cosaan/goree.jpg";
import goree2 from "@/assets/cosaan/goree-2.jpg";
import lacRose from "@/assets/cosaan/lac-rose.jpg";
import lacRose2 from "@/assets/cosaan/lac-rose-2.jpg";
import renaissance from "@/assets/cosaan/renaissance.jpg";
import wax from "@/assets/cosaan/wax.jpg";
import vannerie from "@/assets/cosaan/vannerie.webp";

import bijoux from "@/assets/cosaan/bijoux.jpg";
import maffe from "@/assets/cosaan/maffe.webp";
import dionewar from "@/assets/cosaan/dionewar.jpg";
import dionewar2 from "@/assets/cosaan/dionewar-2.jpg";
import dionewar3 from "@/assets/cosaan/dionewar-3.jpg";
import cultureDrapeau from "@/assets/cosaan/culture-drapeau.jpg";
import cultureMasques from "@/assets/cosaan/culture-masques.jpg";
import cultureDanse from "@/assets/cosaan/culture-danse.jpg";
import cultureVieLocale from "@/assets/cosaan/culture-vie-locale.jpg";
import thiakry from "@/assets/cosaan/thiakry.jpg";
import thiereMboum from "@/assets/cosaan/thiere-mboum.jpg";
import capSkirring from "@/assets/cosaan/cap-skirring.jpg";
import capSkirring2 from "@/assets/cosaan/cap-skirring-2.jpg";
import saly from "@/assets/cosaan/saly.jpg";
import saly2 from "@/assets/cosaan/saly-2.webp";
import saly3 from "@/assets/cosaan/saly-3.jpg";

export type Fiche = {
  id: string;
  titre: string;
  sousTitre: string;
  description: string;
  image: string;
};

// ============== GASTRONOMIE ==============
export type Restaurant = {
  nom: string;
  lieu: string;
  note: number; // /5
  prix: string; // ex "5 000 FCFA"
};

export type Masterclass = {
  hote: string;
  titre: string;
  dureeMin: number;
  prixFcfa: number;
  lieu: string;
};

export type PlatDetail = Fiche & {
  origine: string;
  importance: string;
  ingredients: string[];
  etapes: string[];
  restaurants: Restaurant[];
  masterclasses: Masterclass[];
};

export const gastronomie: PlatDetail[] = [
  {
    id: "g1",
    titre: "data.gastronomy.g1.titre",
    sousTitre: "data.gastronomy.g1.sousTitre",
    description: "data.gastronomy.g1.description",
    image: thieboudienne,
    origine: "data.gastronomy.g1.origine",
    importance: "data.gastronomy.g1.importance",
    ingredients: [
      "data.gastronomy.g1.ingredients.0",
      "data.gastronomy.g1.ingredients.1",
      "data.gastronomy.g1.ingredients.2",
      "data.gastronomy.g1.ingredients.3",
      "data.gastronomy.g1.ingredients.4",
      "data.gastronomy.g1.ingredients.5",
      "data.gastronomy.g1.ingredients.6",
    ],
    etapes: [
      "data.gastronomy.g1.etapes.0",
      "data.gastronomy.g1.etapes.1",
      "data.gastronomy.g1.etapes.2",
      "data.gastronomy.g1.etapes.3",
      "data.gastronomy.g1.etapes.4",
      "data.gastronomy.g1.etapes.5",
    ],
    restaurants: [
      { nom: "Chez Loutcha", lieu: "Plateau, Dakar", note: 4.7, prix: "5 500 FCFA" },
      { nom: "Le Lagon 1", lieu: "Corniche Est", note: 4.5, prix: "8 000 FCFA" },
      { nom: "Restaurant La Calebasse", lieu: "Almadies", note: 4.6, prix: "6 500 FCFA" },
      { nom: "Chez Fatou Saint-Louis", lieu: "Saint-Louis", note: 4.9, prix: "4 500 FCFA" },
    ],
    masterclasses: [
      { hote: "Mame Diarra", titre: "Le vrai thieb à la saint-louisienne", dureeMin: 180, prixFcfa: 15000, lieu: "Médina, Dakar" },
      { hote: "Chef Pierre Thiam", titre: "Thiéboudienne moderne", dureeMin: 240, prixFcfa: 35000, lieu: "Almadies" },
    ],
  },
  {
    id: "g2",
    titre: "data.gastronomy.g2.titre",
    sousTitre: "data.gastronomy.g2.sousTitre",
    description: "data.gastronomy.g2.description",
    image: yassa,
    origine: "data.gastronomy.g2.origine",
    importance: "data.gastronomy.g2.importance",
    ingredients: [
      "data.gastronomy.g2.ingredients.0",
      "data.gastronomy.g2.ingredients.1",
      "data.gastronomy.g2.ingredients.2",
      "data.gastronomy.g2.ingredients.3",
      "data.gastronomy.g2.ingredients.4",
      "data.gastronomy.g2.ingredients.5",
    ],
    etapes: [
      "data.gastronomy.g2.etapes.0",
      "data.gastronomy.g2.etapes.1",
      "data.gastronomy.g2.etapes.2",
      "data.gastronomy.g2.etapes.3",
      "data.gastronomy.g2.etapes.4",
    ],
    restaurants: [
      { nom: "Chez Aida", lieu: "Sicap Liberté", note: 4.8, prix: "4 000 FCFA" },
      { nom: "Le Djoloff", lieu: "Mermoz", note: 4.4, prix: "5 500 FCFA" },
      { nom: "La Fourchette", lieu: "Plateau", note: 4.5, prix: "7 000 FCFA" },
    ],
    masterclasses: [
      { hote: "Tata Bineta", titre: "Yassa traditionnel diola", dureeMin: 150, prixFcfa: 12000, lieu: "Yoff" },
    ],
  },
  {
    id: "g4",
    titre: "data.gastronomy.g4.titre",
    sousTitre: "data.gastronomy.g4.sousTitre",
    description: "data.gastronomy.g4.description",
    image: maffe,
    origine: "data.gastronomy.g4.origine",
    importance: "data.gastronomy.g4.importance",
    ingredients: [
      "data.gastronomy.g4.ingredients.0",
      "data.gastronomy.g4.ingredients.1",
      "data.gastronomy.g4.ingredients.2",
      "data.gastronomy.g4.ingredients.3",
      "data.gastronomy.g4.ingredients.4",
      "data.gastronomy.g4.ingredients.5",
      "data.gastronomy.g4.ingredients.6",
    ],
    etapes: [
      "data.gastronomy.g4.etapes.0",
      "data.gastronomy.g4.etapes.1",
      "data.gastronomy.g4.etapes.2",
      "data.gastronomy.g4.etapes.3",
      "data.gastronomy.g4.etapes.4",
    ],
    restaurants: [
      { nom: "Chez Marie", lieu: "Mermoz, Dakar", note: 4.7, prix: "4 500 FCFA" },
      { nom: "La Téranga", lieu: "Plateau", note: 4.5, prix: "6 000 FCFA" },
      { nom: "Keur Yacine", lieu: "Sicap", note: 4.6, prix: "3 800 FCFA" },
    ],
    masterclasses: [
      { hote: "Yaye Khady", titre: "Mafé authentique à la pâte d'arachide", dureeMin: 150, prixFcfa: 12000, lieu: "Médina, Dakar" },
    ],
  },
  {
    id: "g5",
    titre: "data.gastronomy.g5.titre",
    sousTitre: "data.gastronomy.g5.sousTitre",
    description: "data.gastronomy.g5.description",
    image: thiakry,
    origine: "data.gastronomy.g5.origine",
    importance: "data.gastronomy.g5.importance",
    ingredients: [
      "data.gastronomy.g5.ingredients.0",
      "data.gastronomy.g5.ingredients.1",
      "data.gastronomy.g5.ingredients.2",
      "data.gastronomy.g5.ingredients.3",
      "data.gastronomy.g5.ingredients.4",
      "data.gastronomy.g5.ingredients.5",
    ],
    etapes: [
      "data.gastronomy.g5.etapes.0",
      "data.gastronomy.g5.etapes.1",
      "data.gastronomy.g5.etapes.2",
      "data.gastronomy.g5.etapes.3",
      "data.gastronomy.g5.etapes.4",
    ],
    restaurants: [
      { nom: "Chez Yaye Fatou", lieu: "Médina, Dakar", note: 4.8, prix: "1 500 FCFA" },
      { nom: "Layu Bissap", lieu: "Ngor", note: 4.5, prix: "2 000 FCFA" },
      { nom: "Marché HLM", lieu: "Dakar", note: 4.4, prix: "1 000 FCFA" },
    ],
    masterclasses: [
      { hote: "Awa Sow", titre: "Desserts traditionnels au mil", dureeMin: 120, prixFcfa: 9000, lieu: "Médina" },
    ],
  },
  {
    id: "g6",
    titre: "data.gastronomy.g6.titre",
    sousTitre: "data.gastronomy.g6.sousTitre",
    description: "data.gastronomy.g6.description",
    image: thiereMboum,
    origine: "data.gastronomy.g6.origine",
    importance: "data.gastronomy.g6.importance",
    ingredients: [
      "data.gastronomy.g6.ingredients.0",
      "data.gastronomy.g6.ingredients.1",
      "data.gastronomy.g6.ingredients.2",
      "data.gastronomy.g6.ingredients.3",
      "data.gastronomy.g6.ingredients.4",
      "data.gastronomy.g6.ingredients.5",
    ],
    etapes: [
      "data.gastronomy.g6.etapes.0",
      "data.gastronomy.g6.etapes.1",
      "data.gastronomy.g6.etapes.2",
      "data.gastronomy.g6.etapes.3",
      "data.gastronomy.g6.etapes.4",
    ],
    restaurants: [
      { nom: "Chez Adja Kaolack", lieu: "Kaolack", note: 4.9, prix: "3 500 FCFA" },
      { nom: "Keur Yacine", lieu: "Sicap, Dakar", note: 4.6, prix: "4 000 FCFA" },
      { nom: "Le Terroir", lieu: "Mermoz", note: 4.5, prix: "5 500 FCFA" },
    ],
    masterclasses: [
      { hote: "Tata Coumba", titre: "Cuisine paysanne du bassin arachidier", dureeMin: 180, prixFcfa: 14000, lieu: "Kaolack" },
    ],
  },
  {
    id: "g3",
    titre: "data.gastronomy.g3.titre",
    sousTitre: "data.gastronomy.g3.sousTitre",
    description: "data.gastronomy.g3.description",
    image: bissap,
    origine: "data.gastronomy.g3.origine",
    importance: "data.gastronomy.g3.importance",
    ingredients: [
      "data.gastronomy.g3.ingredients.0",
      "data.gastronomy.g3.ingredients.1",
      "data.gastronomy.g3.ingredients.2",
      "data.gastronomy.g3.ingredients.3",
    ],
    etapes: [
      "data.gastronomy.g3.etapes.0",
      "data.gastronomy.g3.etapes.1",
      "data.gastronomy.g3.etapes.2",
      "data.gastronomy.g3.etapes.3",
    ],
    restaurants: [
      { nom: "Layu Bissap", lieu: "Ngor", note: 4.6, prix: "1 000 FCFA" },
      { nom: "Marché Kermel", lieu: "Plateau", note: 4.3, prix: "500 FCFA" },
    ],
    masterclasses: [
      { hote: "Awa Sow", titre: "Boissons artisanales du Sénégal", dureeMin: 90, prixFcfa: 7000, lieu: "Médina" },
    ],
  },
];

// ============== LIEUX ==============
export type LieuDetail = Fiche & {
  histoire: string;
  importance: string;
  distanceKm: number;
  tempsTrajet: string;
  galerie: string[];
  coords: { lat: number; lng: number };
  bonAsavoir: string[];
};

export const lieux: LieuDetail[] = [
  {
    id: "l1",
    titre: "data.places.l1.titre",
    sousTitre: "data.places.l1.sousTitre",
    description: "data.places.l1.description",
    image: goree,
    histoire: "data.places.l1.histoire",
    importance: "data.places.l1.importance",
    distanceKm: 4,
    tempsTrajet: "data.places.l1.tempsTrajet",
    galerie: [goree, goree2, goree],
    coords: { lat: 14.6669, lng: -17.3984 },
    bonAsavoir: [
      "data.places.l1.bonAsavoir.0",
      "data.places.l1.bonAsavoir.1",
      "data.places.l1.bonAsavoir.2",
    ],
  },
  {
    id: "l2",
    titre: "data.places.l2.titre",
    sousTitre: "data.places.l2.sousTitre",
    description: "data.places.l2.description",
    image: lacRose,
    histoire: "data.places.l2.histoire",
    importance: "data.places.l2.importance",
    distanceKm: 35,
    tempsTrajet: "data.places.l2.tempsTrajet",
    galerie: [lacRose, lacRose2, lacRose],
    coords: { lat: 14.8389, lng: -17.235 },
    bonAsavoir: [
      "data.places.l2.bonAsavoir.0",
      "data.places.l2.bonAsavoir.1",
      "data.places.l2.bonAsavoir.2",
    ],
  },
  {
    id: "l3",
    titre: "data.places.l3.titre",
    sousTitre: "data.places.l3.sousTitre",
    description: "data.places.l3.description",
    image: renaissance,
    histoire: "data.places.l3.histoire",
    importance: "data.places.l3.importance",
    distanceKm: 8,
    tempsTrajet: "data.places.l3.tempsTrajet",
    galerie: [renaissance, renaissance, renaissance],
    coords: { lat: 14.7239, lng: -17.4944 },
    bonAsavoir: [
      "data.places.l3.bonAsavoir.0",
      "data.places.l3.bonAsavoir.1",
      "data.places.l3.bonAsavoir.2",
    ],
  },
  {
    id: "l4",
    titre: "data.places.l4.titre",
    sousTitre: "data.places.l4.sousTitre",
    description: "data.places.l4.description",
    image: dionewar,
    histoire: "data.places.l4.histoire",
    importance: "data.places.l4.importance",
    distanceKm: 150,
    tempsTrajet: "data.places.l4.tempsTrajet",
    galerie: [dionewar, dionewar2, dionewar3],
    coords: { lat: 13.9167, lng: -16.75 },
    bonAsavoir: [
      "data.places.l4.bonAsavoir.0",
      "data.places.l4.bonAsavoir.1",
      "data.places.l4.bonAsavoir.2",
    ],
  },
  {
    id: "l5",
    titre: "data.places.l5.titre",
    sousTitre: "data.places.l5.sousTitre",
    description: "data.places.l5.description",
    image: capSkirring,
    histoire: "data.places.l5.histoire",
    importance: "data.places.l5.importance",
    distanceKm: 500,
    tempsTrajet: "data.places.l5.tempsTrajet",
    galerie: [capSkirring, capSkirring2, capSkirring],
    coords: { lat: 12.3956, lng: -16.7486 },
    bonAsavoir: [
      "data.places.l5.bonAsavoir.0",
      "data.places.l5.bonAsavoir.1",
      "data.places.l5.bonAsavoir.2",
    ],
  },
  {
    id: "l6",
    titre: "data.places.l6.titre",
    sousTitre: "data.places.l6.sousTitre",
    description: "data.places.l6.description",
    image: saly,
    histoire: "data.places.l6.histoire",
    importance: "data.places.l6.importance",
    distanceKm: 80,
    tempsTrajet: "data.places.l6.tempsTrajet",
    galerie: [saly, saly2, saly3],
    coords: { lat: 14.4422, lng: -17.0083 },
    bonAsavoir: [
      "data.places.l6.bonAsavoir.0",
      "data.places.l6.bonAsavoir.1",
      "data.places.l6.bonAsavoir.2",
    ],
  },
];

// ============== ARTISANAT ==============
export type Artisan = {
  nom: string;
  metier: string;
  ville: string;
  contact: string;
};

export type ArtisanatDetail = Fiche & {
  savoirFaire: string;
  histoire: string;
  produits: string[];
  galerie: string[];
  artisans: Artisan[];
};

export const artisanat: ArtisanatDetail[] = [
  {
    id: "a1",
    titre: "data.crafts.a1.titre",
    sousTitre: "data.crafts.a1.sousTitre",
    description: "data.crafts.a1.description",
    image: wax,
    savoirFaire: "data.crafts.a1.savoirFaire",
    histoire: "data.crafts.a1.histoire",
    produits: [
      "data.crafts.a1.produits.0",
      "data.crafts.a1.produits.1",
      "data.crafts.a1.produits.2",
      "data.crafts.a1.produits.3",
    ],
    galerie: [wax, vannerie, cultureVieLocale],
    artisans: [
      { nom: "Awa Diop", metier: "data.crafts.a1.metiers.couturiere", ville: "Médina, Dakar", contact: "+221 77 123 45 67" },
      { nom: "Modou Fall", metier: "data.crafts.a1.metiers.vannier", ville: "Soumbédioune", contact: "+221 76 555 12 34" },
      { nom: "Aïssatou Ndiaye", metier: "data.crafts.a1.metiers.styliste", ville: "Sicap Baobab", contact: "@aissatoustyle" },
    ],
  },
  {
    id: "a2",
    titre: "data.crafts.a2.titre",
    sousTitre: "data.crafts.a2.sousTitre",
    description: "data.crafts.a2.description",
    image: cultureDanse,
    savoirFaire: "data.crafts.a2.savoirFaire",
    histoire: "data.crafts.a2.histoire",
    produits: [
      "data.crafts.a2.produits.0",
      "data.crafts.a2.produits.1",
      "data.crafts.a2.produits.2",
      "data.crafts.a2.produits.3",
    ],
    galerie: [cultureDanse, cultureMasques, cultureDrapeau],
    artisans: [
      { nom: "Pape Faye", metier: "data.crafts.a2.metiers.sculpteur", ville: "Pikine", contact: "+221 78 444 22 11" },
      { nom: "Doudou Ndiaye Mbengue", metier: "data.crafts.a2.metiers.maitre", ville: "Yoff", contact: "@doudoupercu" },
    ],
  },
  {
    id: "a3",
    titre: "data.crafts.a3.titre",
    sousTitre: "data.crafts.a3.sousTitre",
    description: "data.crafts.a3.description",
    image: bijoux,
    savoirFaire: "data.crafts.a3.savoirFaire",
    histoire: "data.crafts.a3.histoire",
    produits: [
      "data.crafts.a3.produits.0",
      "data.crafts.a3.produits.1",
      "data.crafts.a3.produits.2",
      "data.crafts.a3.produits.3",
    ],
    galerie: [bijoux, bijoux, bijoux],
    artisans: [
      { nom: "Ibrahima Sow", metier: "data.crafts.a3.metiers.bijoutier", ville: "Saint-Louis", contact: "+221 77 888 99 00" },
      { nom: "Mariama Bâ", metier: "data.crafts.a3.metiers.creatrice", ville: "Plateau, Dakar", contact: "@mariama.bijoux" },
    ],
  },
];
