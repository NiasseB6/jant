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
    titre: "Cours de Thiéboudienne en famille",
    image: expCuisine,
    hote: "Mame Diarra Ndiaye",
    hoteRole: "Cuisinière, Médina",
    categorie: "Cuisine",
    dureeMin: 180,
    prix: 15000,
    lieu: "Médina, Dakar",
    resume: "Préparez le plat national du Sénégal dans la cuisine d'une famille dakaroise.",
    description:
      "Mame Diarra vous accueille chez elle pour un cours intime autour du Thiéboudienne. Marché du matin ensemble, choix du poisson frais à Soumbédioune, puis cuisine au feu de bois en partageant histoires et secrets de famille. Le repas se déguste autour du grand bol commun, dans la pure tradition de la téranga.",
    apprentissages: [
      "Marchander au marché comme un local",
      "Préparer la sauce tomate aux légumes",
      "Réussir le riz cassé parfait",
      "Servir et manger autour du bol",
    ],
    galerie: [expCuisine, expVisite],
  },
  {
    id: "x2",
    titre: "Initiation au Yassa Poulet",
    image: expCuisine,
    hote: "Aminata Sarr",
    hoteRole: "Cheffe casamançaise",
    categorie: "Cuisine",
    dureeMin: 120,
    prix: 12000,
    lieu: "Ngor, Dakar",
    resume: "Découvrez les secrets du Yassa de Casamance, citronné et caramélisé.",
    description:
      "Aminata partage la recette transmise par sa grand-mère à Ziguinchor. Vous apprendrez la marinade longue, le confisage des oignons et la cuisson du poulet sur braise. Repas partagé sur la terrasse face à la mer.",
    apprentissages: ["La marinade au citron", "Caraméliser les oignons", "Cuisson au charbon", "Sauce d'accompagnement"],
    galerie: [expCuisine],
  },
  {
    id: "x3",
    titre: "Atelier Mafé sénégalais",
    image: expCuisine,
    hote: "Ndèye Fatou Ba",
    hoteRole: "Cuisinière à domicile",
    categorie: "Cuisine",
    dureeMin: 150,
    prix: 13000,
    lieu: "Sacré-Cœur, Dakar",
    resume: "Sauce d'arachide onctueuse, viande mijotée et légumes : le Mafé en 2h30.",
    description:
      "Ndèye Fatou vous transmet sa version familiale du Mafé : équilibre des arachides pilées, choix de la viande et longue cuisson à feu doux. Vous repartez avec la recette et de quoi ramener à la maison.",
    apprentissages: ["Piler les arachides", "Équilibrer la sauce", "Choisir la viande", "Servir en famille"],
    galerie: [expCuisine],
  },
  {
    id: "x4",
    titre: "Initiation à la danse Sabar",
    image: expDanse,
    hote: "Khadim Diop",
    hoteRole: "Danseur professionnel",
    categorie: "Danse",
    dureeMin: 90,
    prix: 8000,
    lieu: "Yoff, Dakar",
    resume: "Apprenez les pas du Sabar avec un danseur de la troupe nationale.",
    description:
      "Khadim, danseur depuis l'âge de 7 ans, vous initie aux rythmes endiablés du Sabar. Échauffement, pas de base, puis improvisation accompagnée de tambours live. Tenue confortable conseillée — l'énergie est garantie !",
    apprentissages: ["Lire les rythmes du sabar", "Pas de base ventilateur et farwujar", "Improviser sur le rythme", "L'esprit du cercle de danse"],
    galerie: [expDanse],
  },
  {
    id: "x5",
    titre: "Atelier bijoux d'argent filigrane",
    image: expBijoux,
    hote: "Pape Souleymane Sy",
    hoteRole: "Bijoutier, Saint-Louis",
    categorie: "Artisanat",
    dureeMin: 240,
    prix: 25000,
    lieu: "Médina, Dakar",
    resume: "Créez votre propre pendentif en argent avec un maître bijoutier.",
    description:
      "Pape Souleymane, 4ᵉ génération de bijoutiers de Saint-Louis, vous initie au filigrane. Vous fondez, étirez et tressez le fil d'argent pour repartir avec votre pendentif unique.",
    apprentissages: ["Fondre l'argent", "Étirer le fil", "Tressage filigrane", "Polissage final"],
    galerie: [expBijoux],
  },
  {
    id: "x6",
    titre: "Atelier teinture wax",
    image: expWax,
    hote: "Coumba Diallo",
    hoteRole: "Artisane textile",
    categorie: "Artisanat",
    dureeMin: 180,
    prix: 18000,
    lieu: "Rufisque",
    resume: "Teignez votre propre tissu wax aux motifs traditionnels.",
    description:
      "Dans son atelier coloré, Coumba vous fait découvrir les techniques de réserve à la cire et de bain de teinture indigo. Vous repartez avec un tissu de 2m de votre création.",
    apprentissages: ["Tracer les motifs à la cire", "Préparer le bain", "Teindre par étapes", "Fixer les couleurs"],
    galerie: [expWax],
  },
  {
    id: "x7",
    titre: "Visite guidée de la Médina",
    image: expVisite,
    hote: "Ibrahima Fall",
    hoteRole: "Guide local agréé",
    categorie: "Culture",
    dureeMin: 180,
    prix: 10000,
    lieu: "Médina, Dakar",
    resume: "Plongez dans le quotidien de la Médina avec un guide passionné.",
    description:
      "Ibrahima vous emmène hors des sentiers touristiques : marché Tilène, ateliers de tailleurs, échoppes des vendeurs de cola, mosquée Massalikoul Djinane. Pause thé attaya en chemin.",
    apprentissages: ["Histoire de la Médina", "Architecture coloniale et locale", "Vie de quartier", "Cérémonie du thé attaya"],
    galerie: [expVisite],
  },
  {
    id: "x8",
    titre: "Soirée contes sous le baobab",
    image: expGriot,
    hote: "El Hadji Mansour Mbaye",
    hoteRole: "Griot, gardien de la mémoire",
    categorie: "Storytelling",
    dureeMin: 120,
    prix: 9000,
    lieu: "Bandia, Mbour",
    resume: "Une soirée de contes traditionnels racontés par un griot, sous un baobab millénaire.",
    description:
      "À la tombée du jour, El Hadji Mansour partage les épopées de Soundiata, les contes du lièvre et de la hyène, et l'histoire des royaumes wolofs. Dîner traditionnel inclus autour du feu.",
    apprentissages: ["L'art oral du griot", "Épopées mandingues et wolofs", "Proverbes et sagesse", "Rôle du griot dans la société"],
    galerie: [expGriot],
  },
];

export const formatPrix = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export const formatDuree = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h && m) return `${h}h${m}`;
  if (h) return `${h}h`;
  return `${m} min`;
};
