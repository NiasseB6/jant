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
    titre: "Thieboudienne",
    sousTitre: "Plat national",
    description:
      "Riz au poisson cuisiné dans une sauce tomate généreuse, légumes et épices. Inscrit au patrimoine de l'UNESCO.",
    image: thieboudienne,
    origine:
      "Né au XIXᵉ siècle à Saint-Louis, le thieboudienne — « riz au poisson » en wolof — est attribué à la cuisinière Penda Mbaye. Il s'est diffusé dans toute l'Afrique de l'Ouest depuis le port colonial.",
    importance:
      "Inscrit en 2021 au patrimoine culturel immatériel de l'UNESCO, c'est le plat de la téranga par excellence : on le partage à plusieurs autour d'un grand plat commun, signe d'hospitalité.",
    ingredients: [
      "1 kg de riz brisé parfumé",
      "800 g de poisson (thiof, mérou ou capitaine)",
      "Tomates fraîches & concentré",
      "Aubergine, carotte, manioc, chou, navet",
      "Oignons, ail, persil, piment",
      "Nététou (locust bean), poisson séché",
      "Huile d'arachide, sel",
    ],
    etapes: [
      "Préparer la farce (rof) : ail, persil, piment, oignon mixés et insérer dans le poisson.",
      "Faire revenir le poisson dans l'huile chaude puis le réserver.",
      "Faire un roux d'oignon et tomate, ajouter le concentré, le nététou et l'eau.",
      "Cuire les légumes dans la sauce, les retirer au fur et à mesure cuits.",
      "Verser le riz lavé dans la sauce restante, couvrir, cuire à feu doux 25 min.",
      "Servir le riz dressé en dôme, poisson au centre, légumes autour. Bon appétit !",
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
    titre: "Yassa Poulet",
    sousTitre: "Casamance",
    description:
      "Poulet mariné au citron et aux oignons confits, servi avec du riz blanc. Acidulé, parfumé, irrésistible.",
    image: yassa,
    origine:
      "Originaire de Casamance et popularisé par les Diolas, le yassa s'est imposé dans tout le Sénégal. Sa marinade citronnée le rend immédiatement reconnaissable.",
    importance:
      "Plat de fête servi lors des baptêmes, mariages et grandes retrouvailles familiales, le yassa symbolise le partage et la générosité de la table sénégalaise.",
    ingredients: [
      "1 poulet fermier découpé",
      "6 gros oignons émincés",
      "4 citrons jaunes (jus)",
      "Moutarde forte, ail, laurier",
      "Piment, poivre, cube de bouillon",
      "Huile d'arachide, riz blanc",
    ],
    etapes: [
      "Mariner le poulet 2 h minimum avec citron, moutarde, oignons, ail.",
      "Faire griller le poulet à la poêle ou au four jusqu'à coloration.",
      "Faire confire les oignons de la marinade dans l'huile, longtemps, à feu doux.",
      "Ajouter le poulet et un peu d'eau, mijoter 25 min.",
      "Servir avec du riz blanc bien chaud.",
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
    titre: "Maffé",
    sousTitre: "Sauce d'arachide",
    description:
      "Sauce onctueuse à la pâte d'arachide, viande mijotée et riz blanc. Riche, généreux, profondément sénégalais.",
    image: maffe,
    origine:
      "Le mafé puise ses racines dans la cuisine mandingue de l'Afrique de l'Ouest et s'est imposé comme un classique des tables sénégalaises, du Mali à la Casamance.",
    importance:
      "Le mafé est un plat traditionnel sénégalais à base de sauce onctueuse à la pâte d'arachide, généralement accompagné de viande (bœuf ou poulet) et de riz. Riche, savoureux et légèrement épicé, il incarne parfaitement la générosité et la convivialité de la cuisine sénégalaise.",
    ingredients: [
      "800 g de viande (bœuf ou poulet)",
      "300 g de pâte d'arachide pure",
      "Tomates fraîches & concentré",
      "Patate douce, carotte, manioc, chou",
      "Oignons, ail, piment, laurier",
      "Cube de bouillon, sel, poivre",
      "Riz blanc parfumé",
    ],
    etapes: [
      "Faire revenir la viande avec oignons, ail et concentré de tomate.",
      "Délayer la pâte d'arachide dans un peu d'eau chaude jusqu'à obtenir une crème lisse.",
      "Verser la sauce d'arachide sur la viande, ajouter de l'eau et laisser mijoter 30 min.",
      "Incorporer les légumes et poursuivre la cuisson à feu doux.",
      "Ajuster l'assaisonnement et servir bien chaud avec du riz blanc.",
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
    titre: "Thiakry",
    sousTitre: "Dessert au mil",
    description:
      "Couscous de mil rafraîchi au lait caillé sucré, parfumé à la vanille ou à la fleur d'oranger. Doux, crémeux, festif.",
    image: thiakry,
    origine:
      "Hérité des traditions agricoles sahéliennes, le thiakry — appelé « dégué » dans plusieurs pays voisins — est un dessert ancestral des peuples wolof, peul et sérère, façonné autour du mil cultivé depuis des millénaires.",
    importance:
      "Servi lors des baptêmes, mariages, ndogou du Ramadan et grandes retrouvailles, le thiakry est le dessert du partage par excellence : sa fraîcheur et sa douceur ponctuent les moments de joie collective.",
    ingredients: [
      "500 g de couscous de mil (sankhal)",
      "1 L de lait caillé bien frais",
      "200 ml de lait concentré sucré",
      "Sucre selon le goût",
      "Vanille, fleur d'oranger ou muscade",
      "Raisins secs (optionnel)",
    ],
    etapes: [
      "Cuire le couscous de mil à la vapeur pendant 20 min jusqu'à tendreté.",
      "Laisser refroidir complètement les grains et les égrainer à la fourchette.",
      "Mélanger le lait caillé, le lait concentré et le sucre dans un grand saladier.",
      "Incorporer le mil, la vanille ou la fleur d'oranger, bien remuer.",
      "Réserver au frais 1 h minimum et servir bien frais, parsemé de raisins.",
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
    titre: "Thiéré Mboum",
    sousTitre: "Couscous aux feuilles",
    description:
      "Couscous de mil servi avec une sauce généreuse de feuilles de chou vert, viande ou poisson. Authentique et nourrissant.",
    image: thiereMboum,
    origine:
      "Plat ancestral des terroirs wolof et sérère, le thiéré mboum — littéralement « couscous aux feuilles » — accompagne depuis toujours les repas de famille dans le bassin arachidier et la région de Kaolack.",
    importance:
      "Profondément ancré dans les traditions locales, le thiéré mboum réunit autour d'un même plat les générations. Il symbolise la cuisine paysanne sénégalaise, riche, équilibrée et profondément culturelle.",
    ingredients: [
      "500 g de couscous de mil (thiéré)",
      "1 botte de feuilles de chou vert (mboum)",
      "500 g de viande de bœuf ou poisson fumé",
      "Tomates, oignons, ail",
      "Nététou, piment, cube de bouillon",
      "Huile d'arachide, sel, poivre",
    ],
    etapes: [
      "Cuire le thiéré à la vapeur en plusieurs passages jusqu'à ce qu'il soit moelleux.",
      "Laver et émincer finement les feuilles de mboum.",
      "Faire revenir oignons, ail, tomates et viande, puis ajouter de l'eau.",
      "Incorporer les feuilles de mboum, le nététou et le piment, mijoter 30 min.",
      "Servir le thiéré bien chaud, nappé généreusement de sauce mboum.",
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
    titre: "Bissap",
    sousTitre: "Boisson nationale",
    description:
      "Infusion glacée de fleurs d'hibiscus, sucrée et parfumée à la menthe ou à la fleur d'oranger.",
    image: bissap,
    origine:
      "Cultivée depuis des siècles au Sahel, la fleur d'hibiscus (bissap) donne une boisson rouge profond, désaltérante, vendue à chaque coin de rue à Dakar.",
    importance:
      "Le bissap accompagne tous les moments de convivialité : ndogou du Ramadan, fêtes de famille, accueil des invités. C'est une boisson de la téranga.",
    ingredients: [
      "150 g de fleurs d'hibiscus séchées",
      "1,5 L d'eau",
      "Sucre selon le goût",
      "Menthe fraîche, fleur d'oranger ou vanille",
    ],
    etapes: [
      "Rincer rapidement les fleurs à l'eau froide.",
      "Porter l'eau à ébullition, ajouter les fleurs, laisser infuser 15 min hors du feu.",
      "Filtrer puis sucrer à chaud.",
      "Parfumer (menthe, fleur d'oranger), refroidir et servir très frais.",
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
    titre: "Île de Gorée",
    sousTitre: "Patrimoine UNESCO",
    description:
      "Ancien comptoir de la traite négrière, aujourd'hui haut lieu de mémoire et d'art, à 20 min de Dakar en chaloupe.",
    image: goree,
    histoire:
      "Île occupée successivement par les Portugais, Néerlandais, Anglais et Français du XVᵉ au XIXᵉ siècle, Gorée fut un des plus grands centres de la traite atlantique. La Maison des Esclaves et sa Porte du Voyage sans retour rappellent ce passé.",
    importance:
      "Classée au patrimoine mondial de l'UNESCO depuis 1978, Gorée est devenue un lieu de pèlerinage pour la diaspora africaine et un haut lieu d'art : galeries, ateliers de peintres, musées. L'île n'a ni voiture, ni bruit moteur.",
    distanceKm: 4,
    tempsTrajet: "20 min en chaloupe depuis l'embarcadère du Plateau",
    galerie: [goree, goree2, goree],
    coords: { lat: 14.6669, lng: -17.3984 },
    bonAsavoir: [
      "Chaloupe au départ du port de Dakar — toutes les heures",
      "Prévoir 1/2 journée minimum",
      "Visites guidées par les habitants disponibles sur place",
    ],
  },
  {
    id: "l2",
    titre: "Lac Rose (Retba)",
    sousTitre: "Merveille naturelle",
    description:
      "Lac aux eaux roses chargées en sel, exploité par les ramasseuses et ramasseurs au quotidien.",
    image: lacRose,
    histoire:
      "Le Lac Retba doit sa couleur rose à une micro-algue (Dunaliella salina) qui prospère dans ses eaux dix fois plus salées que la mer. Pendant 30 ans, le lac fut l'arrivée du légendaire Paris-Dakar.",
    importance:
      "Le sel y est extrait à la main par des centaines de ramasseurs Peuls et Wolofs, dans une scène devenue iconique. Site emblématique du tourisme sénégalais et symbole d'un savoir-faire ancestral.",
    distanceKm: 35,
    tempsTrajet: "45 min en voiture depuis Dakar",
    galerie: [lacRose, lacRose2, lacRose],
    coords: { lat: 14.8389, lng: -17.235 },
    bonAsavoir: [
      "Couleur la plus intense en saison sèche (novembre-juin)",
      "Tour du lac en 4×4 ou en quad",
      "Possibilité de baignade très flottante",
    ],
  },
  {
    id: "l3",
    titre: "Monument de la Renaissance",
    sousTitre: "Symbole africain",
    description:
      "Statue monumentale de 52 m dominant Dakar, hommage à l'Afrique nouvelle et à sa jeunesse.",
    image: renaissance,
    histoire:
      "Inauguré en 2010 sur les collines des Mamelles, ce bronze de 52 mètres est plus haut que la Statue de la Liberté. Il représente une famille africaine qui regarde vers l'avenir.",
    importance:
      "Symbole panafricain de la Renaissance africaine voulue par le président Wade, le monument abrite un musée et offre une vue imprenable sur Dakar et l'Atlantique.",
    distanceKm: 8,
    tempsTrajet: "20 min depuis le centre de Dakar",
    galerie: [renaissance, renaissance, renaissance],
    coords: { lat: 14.7239, lng: -17.4944 },
    bonAsavoir: [
      "Accès au sommet par ascenseur intérieur",
      "Magnifique au coucher de soleil",
      "Musée d'art africain à l'intérieur",
    ],
  },
  {
    id: "l4",
    titre: "Île de Dionewar",
    sousTitre: "Delta du Saloum",
    description:
      "Havre de paix entre mangroves, bolongs et plages sauvages, accessible en pirogue au cœur du delta.",
    image: dionewar,
    histoire:
      "Située dans le delta du Saloum classé au patrimoine mondial de l'UNESCO, Dionewar est habitée par des communautés sérères vivant depuis des siècles de la pêche, du sel et de la cueillette des huîtres dans les mangroves.",
    importance:
      "L'île de Dionewar, située dans le delta du Saloum classé au patrimoine mondial de l'UNESCO, est un véritable havre de paix entre mangroves, bolongs et plages sauvages. Accessible principalement en pirogue, elle offre une immersion authentique dans la nature sénégalaise, avec ses oiseaux, ses palmiers et ses eaux calmes. Idéale pour l'écotourisme, elle séduit par son atmosphère paisible et ses paysages préservés.",
    distanceKm: 150,
    tempsTrajet: "3 h en voiture jusqu'à Djifère + 30 min en pirogue",
    galerie: [dionewar, dionewar2, dionewar3],
    coords: { lat: 13.9167, lng: -16.75 },
    bonAsavoir: [
      "Accès en pirogue depuis Djifère ou Ndangane",
      "Hébergements en campements écologiques",
      "Idéal pour observation des oiseaux et balades en mangrove",
    ],
  },
  {
    id: "l5",
    titre: "Cap Skirring",
    sousTitre: "Joyau de la Casamance",
    description:
      "Plages de sable fin bordées de cocotiers, eaux calmes et atmosphère paisible au sud du Sénégal.",
    image: capSkirring,
    histoire:
      "Ancien village de pêcheurs diolas niché à la pointe sud-ouest de la Casamance, Cap Skirring s'est révélé au monde dans les années 1970 avec l'arrivée des premiers clubs de vacances. Sa nature préservée et l'accueil légendaire des Diolas en ont fait une destination mythique.",
    importance:
      "Destination balnéaire emblématique du sud du Sénégal, réputée pour ses plages de sable fin bordées de cocotiers, ses eaux calmes et son atmosphère paisible. Située en Casamance, elle offre un cadre idyllique entre nature luxuriante, culture locale et détente, idéale pour une évasion authentique.",
    distanceKm: 500,
    tempsTrajet: "1 h en avion depuis Dakar (vols quotidiens)",
    galerie: [capSkirring, capSkirring2, capSkirring],
    coords: { lat: 12.3956, lng: -16.7486 },
    bonAsavoir: [
      "Meilleure période : novembre à mai (saison sèche)",
      "Excursions en pirogue dans les bolongs",
      "Découverte des villages diolas et de la culture locale",
    ],
  },
  {
    id: "l6",
    titre: "Saly Portudal",
    sousTitre: "Petite Côte",
    description:
      "Station balnéaire incontournable, plages dorées, hôtels et activités nautiques à 1 h de Dakar.",
    image: saly,
    histoire:
      "Ancien comptoir portugais du XVᵉ siècle — d'où son nom Portudal — Saly est devenue dans les années 1980 la première station balnéaire d'Afrique de l'Ouest, attirant chaque année des milliers de visiteurs internationaux sur ses 7 km de plage.",
    importance:
      "Station balnéaire incontournable de la Petite Côte, Saly séduit par ses plages dorées, ses hôtels, ses restaurants et ses activités nautiques. Facilement accessible depuis Dakar, elle représente un parfait mélange entre détente, animation touristique et découverte culturelle.",
    distanceKm: 80,
    tempsTrajet: "1 h 15 en voiture depuis Dakar par l'autoroute",
    galerie: [saly, saly2, saly3],
    coords: { lat: 14.4422, lng: -17.0083 },
    bonAsavoir: [
      "Sports nautiques : jet-ski, surf, pêche au gros",
      "Vie nocturne animée : restaurants et clubs en bord de mer",
      "Excursions vers Joal-Fadiouth et la Réserve de Bandia",
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
    titre: "Tissus Wax & Vannerie",
    sousTitre: "Marché Soumbédioune",
    description:
      "Pagnes wax aux motifs éclatants et paniers tressés à la main, savoir-faire transmis de mère en fille.",
    image: wax,
    savoirFaire:
      "Le wax sénégalais est imprimé selon une technique de cire (batik) puis teinté à l'indigo et aux couleurs vives. Chaque motif raconte une histoire, un proverbe, une émotion.",
    histoire:
      "Hérité d'échanges entre l'Indonésie, les Pays-Bas et l'Afrique de l'Ouest au XIXᵉ siècle, le wax est devenu un marqueur identitaire fort. La vannerie en feuilles de rônier reste, elle, un savoir-faire 100% sahélien.",
    produits: [
      "Pagnes wax 6 yards",
      "Boubous & complets sur-mesure",
      "Paniers tressés à la main",
      "Sacs et accessoires en wax",
    ],
    galerie: [wax, vannerie, cultureVieLocale],
    artisans: [
      { nom: "Awa Diop", metier: "Couturière wax", ville: "Médina, Dakar", contact: "+221 77 123 45 67" },
      { nom: "Modou Fall", metier: "Vannier", ville: "Soumbédioune", contact: "+221 76 555 12 34" },
      { nom: "Aïssatou Ndiaye", metier: "Styliste", ville: "Sicap Baobab", contact: "@aissatoustyle" },
    ],
  },
  {
    id: "a2",
    titre: "Tambours Sabar",
    sousTitre: "Musique vivante",
    description:
      "Sculptés dans le bois et peints à la main, les sabars rythment les cérémonies et les soirées sénégalaises.",
    image: cultureDanse,
    savoirFaire:
      "Le sabar est sculpté dans un tronc de dimb ou de venn, évidé au feu puis tendu d'une peau de chèvre fixée par sept chevilles. Chaque taille produit un son différent.",
    histoire:
      "Tambour royal de la cour wolof, le sabar accompagne depuis des siècles les baptêmes, mariages et tannéber. La famille Mbaye Dieye Faye en a fait un instrument de scène internationale.",
    produits: [
      "Sabar Nder (le plus aigu)",
      "Sabar Mbalax",
      "Sabar Talmbat",
      "Cours de percussion débutant à confirmé",
    ],
    galerie: [cultureDanse, cultureMasques, cultureDrapeau],
    artisans: [
      { nom: "Pape Faye", metier: "Sculpteur de sabars", ville: "Pikine", contact: "+221 78 444 22 11" },
      { nom: "Doudou Ndiaye Mbengue", metier: "Maître percussionniste", ville: "Yoff", contact: "@doudoupercu" },
    ],
  },
  {
    id: "a3",
    titre: "Bijoux d'argent",
    sousTitre: "Saint-Louis",
    description:
      "Filigranes délicats hérités de la tradition wolof et peule, portés lors des grandes occasions.",
    image: bijoux,
    savoirFaire:
      "Le filigrane d'argent est obtenu en étirant à la main des fils d'argent fins comme des cheveux, puis en les soudant en motifs floraux. Patience, précision, virtuosité.",
    histoire:
      "Apporté par les artisans maures et perfectionné par les bijoutiers wolofs et peuls, le filigrane sénégalais est devenu emblème de Saint-Louis et de l'élégance des grandes dames.",
    produits: [
      "Boucles d'oreilles filigranes",
      "Colliers et pendentifs",
      "Bracelets ciselés",
      "Bagues sur mesure",
    ],
    galerie: [bijoux, bijoux, bijoux],
    artisans: [
      { nom: "Ibrahima Sow", metier: "Bijoutier filigrane", ville: "Saint-Louis", contact: "+221 77 888 99 00" },
      { nom: "Mariama Bâ", metier: "Créatrice de bijoux", ville: "Plateau, Dakar", contact: "@mariama.bijoux" },
    ],
  },
];
