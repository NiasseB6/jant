import i18n from "i18next";
import expCuisine from "@/assets/cosaan/exp-cuisine.jpg";
import expDanse from "@/assets/cosaan/exp-danse.jpg";
import expBijoux from "@/assets/cosaan/exp-bijoux.jpg";
import expVisite from "@/assets/cosaan/exp-visite.jpg";
import expGriot from "@/assets/cosaan/exp-griot.jpg";
import expWax from "@/assets/cosaan/exp-wax.jpg";

export type CategorieExp = "Cuisine" | "Danse" | "Artisanat" | "Culture" | "Storytelling";

export type Experience = {
  id: string;
  titre: string;
  image: string;
  hote: string;
  hoteRole: string;
  categorie: CategorieExp;
  dureeMin: number;
  prix: number; // FCFA
  lieu: string;
  resume: string;
  description: string;
  apprentissages: string[];
  galerie: string[];
};

export const CATEGORIES_EXP: CategorieExp[] = ["Cuisine", "Danse", "Artisanat", "Culture", "Storytelling"];

export const experiences: Experience[] = [
  {
    id: "x1",
    titre: "data.experiences.x1.titre",
    image: expCuisine,
    hote: "Mame Diarra Ndiaye",
    hoteRole: "Cuisinière, Médina",
    categorie: "Cuisine",
    dureeMin: 180,
    prix: 15000,
    lieu: "Médina, Dakar",
    resume: "data.experiences.x1.resume",
    description: "data.experiences.x1.description",
    apprentissages: [
      "data.experiences.x1.learn.0",
      "data.experiences.x1.learn.1",
      "data.experiences.x1.learn.2",
      "data.experiences.x1.learn.3",
    ],
    galerie: [expCuisine, expVisite],
  },
  {
    id: "x2",
    titre: "data.experiences.x2.titre",
    image: expCuisine,
    hote: "Aminata Sarr",
    hoteRole: "Cheffe casamançaise",
    categorie: "Cuisine",
    dureeMin: 120,
    prix: 12000,
    lieu: "Ngor, Dakar",
    resume: "data.experiences.x2.resume",
    description: "data.experiences.x2.description",
    apprentissages: [
      "data.experiences.x2.learn.0",
      "data.experiences.x2.learn.1",
      "data.experiences.x2.learn.2",
      "data.experiences.x2.learn.3",
    ],
    galerie: [expCuisine],
  },
  {
    id: "x3",
    titre: "data.experiences.x3.titre",
    image: expCuisine,
    hote: "Ndèye Fatou Ba",
    hoteRole: "Cuisinière à domicile",
    categorie: "Cuisine",
    dureeMin: 150,
    prix: 13000,
    lieu: "Sacré-Cœur, Dakar",
    resume: "data.experiences.x3.resume",
    description: "data.experiences.x3.description",
    apprentissages: [
      "data.experiences.x3.learn.0",
      "data.experiences.x3.learn.1",
      "data.experiences.x3.learn.2",
      "data.experiences.x3.learn.3",
    ],
    galerie: [expCuisine],
  },
  {
    id: "x4",
    titre: "data.experiences.x4.titre",
    image: expDanse,
    hote: "Khadim Diop",
    hoteRole: "Danseur professionnel",
    categorie: "Danse",
    dureeMin: 90,
    prix: 8000,
    lieu: "Yoff, Dakar",
    resume: "data.experiences.x4.resume",
    description: "data.experiences.x4.description",
    apprentissages: [
      "data.experiences.x4.learn.0",
      "data.experiences.x4.learn.1",
      "data.experiences.x4.learn.2",
      "data.experiences.x4.learn.3",
    ],
    galerie: [expDanse],
  },
  {
    id: "x5",
    titre: "data.experiences.x5.titre",
    image: expBijoux,
    hote: "Pape Souleymane Sy",
    hoteRole: "Bijoutier, Saint-Louis",
    categorie: "Artisanat",
    dureeMin: 240,
    prix: 25000,
    lieu: "Médina, Dakar",
    resume: "data.experiences.x5.resume",
    description: "data.experiences.x5.description",
    apprentissages: [
      "data.experiences.x5.learn.0",
      "data.experiences.x5.learn.1",
      "data.experiences.x5.learn.2",
      "data.experiences.x5.learn.3",
    ],
    galerie: [expBijoux],
  },
  {
    id: "x6",
    titre: "data.experiences.x6.titre",
    image: expWax,
    hote: "Coumba Diallo",
    hoteRole: "Artisane textile",
    categorie: "Artisanat",
    dureeMin: 180,
    prix: 18000,
    lieu: "Rufisque",
    resume: "data.experiences.x6.resume",
    description: "data.experiences.x6.description",
    apprentissages: [
      "data.experiences.x6.learn.0",
      "data.experiences.x6.learn.1",
      "data.experiences.x6.learn.2",
      "data.experiences.x6.learn.3",
    ],
    galerie: [expWax],
  },
  {
    id: "x7",
    titre: "data.experiences.x7.titre",
    image: expVisite,
    hote: "Ibrahima Fall",
    hoteRole: "Guide local agréé",
    categorie: "Culture",
    dureeMin: 180,
    prix: 10000,
    lieu: "Médina, Dakar",
    resume: "data.experiences.x7.resume",
    description: "data.experiences.x7.description",
    apprentissages: [
      "data.experiences.x7.learn.0",
      "data.experiences.x7.learn.1",
      "data.experiences.x7.learn.2",
      "data.experiences.x7.learn.3",
    ],
    galerie: [expVisite],
  },
  {
    id: "x8",
    titre: "data.experiences.x8.titre",
    image: expGriot,
    hote: "El Hadji Mansour Mbaye",
    hoteRole: "Griot, gardien de la mémoire",
    categorie: "Storytelling",
    dureeMin: 120,
    prix: 9000,
    lieu: "Bandia, Mbour",
    resume: "data.experiences.x8.resume",
    description: "data.experiences.x8.description",
    apprentissages: [
      "data.experiences.x8.learn.0",
      "data.experiences.x8.learn.1",
      "data.experiences.x8.learn.2",
      "data.experiences.x8.learn.3",
    ],
    galerie: [expGriot],
  },
];

export const formatPrix = (n: number) =>
  new Intl.NumberFormat(i18n.language === "fr" ? "fr-FR" : "en-US").format(n) + " " + i18n.t("data.common.fcfa");

export const formatDuree = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h && m) return `${h}${i18n.t("data.common.hour")}${m}`;
  if (h) return `${h}${i18n.t("data.common.hour")}`;
  return `${m} ${i18n.t("data.common.min")}`;
};
