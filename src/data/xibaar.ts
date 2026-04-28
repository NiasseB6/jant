export type Statut = "à venir" | "en cours" | "terminé";

export type Epreuve = {
  id: string;
  sport: string;
  emoji: string;
  discipline: string;
  date: string; // YYYY-MM-DD
  heure: string;
  lieu: string;
  statut: Statut;
  description?: string;
  participants?: string[]; // athlete ids
};

export type Athlete = {
  id: string;
  prenom: string;
  nom: string;
  pays: string;
  drapeau: string; // emoji flag
  discipline: string;
  age: number;
  bio: string;
  performances: { annee: number; titre: string }[];
  prochaines: string[]; // epreuve ids
  photo?: string;
  parcours?: { annee: number; etape: string }[];
};

export type Actualite = {
  id: string;
  titre: string;
  date: string;
  extrait: string;
  image: string;
  categorie: string;
  contenu?: string[]; // paragraphes
  auteur?: string;
};

export const SPORTS = [
  "Tous",
  "Athlétisme",
  "Basketball",
  "Lutte",
  "Natation",
  "Taekwondo",
  "Cyclisme",
  "Football",
  "Judo",
  "Beach Volley",
];

export const epreuvesXibaar: Epreuve[] = [
  { id: "e1", sport: "Athlétisme", emoji: "🏃", discipline: "100m hommes - finale", date: "2026-11-01", heure: "18:30", lieu: "Stade Iba Mar Diop", statut: "à venir",
    description: "La finale reine du sprint masculin. Huit jeunes athlètes s'élancent pour 10 secondes d'intensité absolue. Le Sénégal espère une médaille à domicile.",
    participants: ["a1"] },
  { id: "e2", sport: "Athlétisme", emoji: "🏃", discipline: "Saut en longueur F", date: "2026-11-01", heure: "16:00", lieu: "Stade Iba Mar Diop", statut: "en cours",
    description: "Concours de saut en longueur féminin. Six tentatives par athlète, la meilleure performance compte. Awa Sarr part favorite à domicile.",
    participants: ["a11"] },
  { id: "e3", sport: "Natation", emoji: "🏊", discipline: "200m papillon", date: "2026-11-01", heure: "10:30", lieu: "Piscine Olympique", statut: "terminé",
    description: "L'épreuve la plus exigeante du papillon. Quatre longueurs de bassin pour départager les meilleures nageuses U18 mondiales.",
    participants: ["a5"] },
  { id: "e4", sport: "Basketball", emoji: "🏀", discipline: "Sénégal vs Brésil 3x3", date: "2026-11-02", heure: "20:00", lieu: "Dakar Arena", statut: "à venir",
    description: "Demi-finale explosive du tournoi 3x3. Les Lionceaux affrontent l'auriverde dans une Dakar Arena annoncée comble.",
    participants: ["a4", "a7"] },
  { id: "e5", sport: "Lutte", emoji: "🤼", discipline: "Lutte libre -65kg", date: "2026-11-02", heure: "17:00", lieu: "Arène Nationale", statut: "à venir",
    description: "La lutte est une institution au Sénégal. Cette finale -65kg réunit l'élite mondiale juniors dans l'arène mythique de Pikine.",
    participants: ["a2"] },
  { id: "e6", sport: "Taekwondo", emoji: "🥋", discipline: "Combats -55kg F", date: "2026-11-02", heure: "14:00", lieu: "Dakar Arena", statut: "à venir",
    description: "Tableau final du taekwondo féminin -55kg. Trois rounds de deux minutes pour décrocher l'or.",
    participants: ["a3"] },
  { id: "e7", sport: "Cyclisme", emoji: "🚴", discipline: "Course en ligne", date: "2026-11-03", heure: "09:00", lieu: "Diamniadio", statut: "à venir",
    description: "120 km de route entre Diamniadio et Lac Rose. Une course tactique sur un parcours vallonné.",
    participants: ["a9"] },
  { id: "e8", sport: "Football", emoji: "⚽", discipline: "Sénégal vs Argentine", date: "2026-11-03", heure: "19:00", lieu: "Stade L. Senghor", statut: "à venir",
    description: "Choc des titans U17 ! Les Lionceaux face aux champions du monde en titre devant 60 000 supporters.",
    participants: ["a6"] },
  { id: "e9", sport: "Judo", emoji: "🥷", discipline: "Quart de finale -60kg", date: "2026-11-04", heure: "11:00", lieu: "Dakar Arena", statut: "à venir",
    description: "Quart de finale de la catégorie reine du judo masculin -60kg. Ippon, waza-ari, yuko : la stratégie est reine.",
    participants: ["a8"] },
  { id: "e10", sport: "Beach Volley", emoji: "🏐", discipline: "Phase de poules", date: "2026-11-04", heure: "15:00", lieu: "Site de Saly", statut: "à venir",
    description: "Phase de poules sur le sable de Saly. Ambiance balnéaire et niveau international au rendez-vous.",
    participants: ["a10"] },
  { id: "e11", sport: "Natation", emoji: "🏊", discipline: "Relais 4x100 mixte", date: "2026-11-05", heure: "19:30", lieu: "Piscine Olympique", statut: "à venir",
    description: "Relais 4x100m 4 nages mixte : deux femmes, deux hommes. L'épreuve spectacle de la natation moderne.",
    participants: ["a5"] },
  { id: "e12", sport: "Athlétisme", emoji: "🏃", discipline: "Marathon junior", date: "2026-11-06", heure: "06:30", lieu: "Corniche Ouest", statut: "à venir",
    description: "42,195 km le long de la Corniche au lever du jour. Une épreuve mythique pour clôturer les Jeux.",
    participants: ["a12"] },
];

export const athletes: Athlete[] = [
  {
    id: "a1", prenom: "Fatou", nom: "Diop", pays: "Sénégal", drapeau: "🇸🇳",
    discipline: "Athlétisme - Sprint", age: 17,
    bio: "Espoir du sprint sénégalais, médaillée d'or aux championnats d'Afrique juniors. Fierté de Pikine.",
    performances: [{ annee: 2025, titre: "Or 100m - CAA Juniors" }, { annee: 2024, titre: "Argent 200m - Jeux Africains" }],
    prochaines: ["e1"],
  },
  {
    id: "a2", prenom: "Modou", nom: "Sow", pays: "Sénégal", drapeau: "🇸🇳",
    discipline: "Lutte libre", age: 18,
    bio: "Issu d'une lignée de lutteurs, il représente le renouveau de la lutte olympique sénégalaise.",
    performances: [{ annee: 2025, titre: "Or -65kg - CAN Lutte" }],
    prochaines: ["e5"],
  },
  {
    id: "a3", prenom: "Aïssatou", nom: "Ba", pays: "Sénégal", drapeau: "🇸🇳",
    discipline: "Taekwondo", age: 16,
    bio: "Ceinture noire à 14 ans, championne nationale en titre dans la catégorie -55kg.",
    performances: [{ annee: 2025, titre: "Or -55kg - Open de Dakar" }],
    prochaines: ["e6"],
  },
  {
    id: "a4", prenom: "Cheikh", nom: "Ndiaye", pays: "Sénégal", drapeau: "🇸🇳",
    discipline: "Basketball 3x3", age: 17,
    bio: "Capitaine de l'équipe nationale juniors, formé à la SEED Academy de Thiès.",
    performances: [{ annee: 2025, titre: "Bronze - AfroBasket U18" }],
    prochaines: ["e4"],
  },
  {
    id: "a5", prenom: "Mariama", nom: "Faye", pays: "Sénégal", drapeau: "🇸🇳",
    discipline: "Natation", age: 16,
    bio: "Recordwoman nationale du 200m papillon, en stage à Marseille.",
    performances: [{ annee: 2025, titre: "Record SN 200m papillon" }],
    prochaines: ["e11"],
  },
  {
    id: "a6", prenom: "Kwame", nom: "Mensah", pays: "Ghana", drapeau: "🇬🇭",
    discipline: "Football", age: 17,
    bio: "Attaquant prometteur, formé à la WAFA, déjà courtisé par des clubs européens.",
    performances: [{ annee: 2025, titre: "Meilleur buteur - WAFU U17" }],
    prochaines: ["e8"],
  },
  {
    id: "a7", prenom: "Lucas", nom: "Silva", pays: "Brésil", drapeau: "🇧🇷",
    discipline: "Basketball 3x3", age: 18,
    bio: "Meneur de jeu brésilien, finaliste mondial U17.",
    performances: [{ annee: 2024, titre: "Argent - Coupe du Monde 3x3 U17" }],
    prochaines: ["e4"],
  },
  {
    id: "a8", prenom: "Yuki", nom: "Tanaka", pays: "Japon", drapeau: "🇯🇵",
    discipline: "Judo", age: 17,
    bio: "Combattante technique, championne d'Asie -60kg.",
    performances: [{ annee: 2025, titre: "Or -60kg - Asia Junior" }],
    prochaines: ["e9"],
  },
  {
    id: "a9", prenom: "Amine", nom: "El Karoui", pays: "Maroc", drapeau: "🇲🇦",
    discipline: "Cyclisme", age: 18,
    bio: "Champion d'Afrique du Nord en course en ligne juniors.",
    performances: [{ annee: 2025, titre: "Or - Tour du Maghreb U18" }],
    prochaines: ["e7"],
  },
  {
    id: "a10", prenom: "Sofia", nom: "Rossi", pays: "Italie", drapeau: "🇮🇹",
    discipline: "Beach Volley", age: 17,
    bio: "Vice-championne d'Europe juniors avec sa partenaire Giulia.",
    performances: [{ annee: 2025, titre: "Argent - Euro Beach U18" }],
    prochaines: ["e10"],
  },
  {
    id: "a11", prenom: "Awa", nom: "Sarr", pays: "Sénégal", drapeau: "🇸🇳",
    discipline: "Athlétisme - Saut", age: 17,
    bio: "Spécialiste du saut en longueur, espoir de médaille à domicile.",
    performances: [{ annee: 2025, titre: "Or - CAA Juniors longueur" }],
    prochaines: ["e2"],
  },
  {
    id: "a12", prenom: "Ibrahima", nom: "Diop", pays: "Sénégal", drapeau: "🇸🇳",
    discipline: "Marathon", age: 18,
    bio: "Coureur de fond originaire de Fatick, entraîné à l'INSEPS.",
    performances: [{ annee: 2025, titre: "Or semi-marathon Dakar" }],
    prochaines: ["e12"],
  },
];

export const actualites: Actualite[] = [
  {
    id: "n1", titre: "Dakar prête à accueillir le monde", date: "23 avr. 2026",
    extrait: "À 6 mois de l'ouverture, la capitale sénégalaise finalise ses infrastructures et accueille déjà les premières délégations.",
    image: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=800&auto=format&fit=crop",
    categorie: "Organisation",
  },
  {
    id: "n2", titre: "La flamme allumée à Olympie", date: "20 avr. 2026",
    extrait: "Cérémonie historique en Grèce avant le grand voyage de la flamme vers Dakar.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop",
    categorie: "Événement",
  },
  {
    id: "n3", titre: "Volontaires : 5 000 inscrits", date: "18 avr. 2026",
    extrait: "Les inscriptions battent des records, la jeunesse sénégalaise répond présent.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop",
    categorie: "Communauté",
  },
  {
    id: "n4", titre: "Fatou Diop favorite du 100m", date: "15 avr. 2026",
    extrait: "La sprinteuse sénégalaise enchaîne les chronos prometteurs à 6 mois des Jeux.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop",
    categorie: "Athlètes",
  },
  {
    id: "n5", titre: "Dakar Arena inaugure ses gradins", date: "10 avr. 2026",
    extrait: "Le site emblématique de Diamniadio passe avec succès son test de capacité.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop",
    categorie: "Sites",
  },
  {
    id: "n6", titre: "Programme culturel dévoilé", date: "5 avr. 2026",
    extrait: "Concerts, expositions et défilés rythmeront les Jeux à travers tout le pays.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
    categorie: "Culture",
  },
];

export const formatJour = (iso: string, lang = "fr"): string => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(lang.startsWith("fr") ? "fr-FR" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

// ============== Enrichissements ==============
export const athleteExtras: Record<string, { photo: string; parcours: { annee: number; etape: string }[] }> = {
  a1: { photo: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=900&auto=format&fit=crop", parcours: [
    { annee: 2020, etape: "Détectée à l'école d'athlétisme de Pikine" },
    { annee: 2022, etape: "Intègre l'INSEPS de Dakar" },
    { annee: 2024, etape: "Première sélection en équipe nationale" },
    { annee: 2026, etape: "Sélection JOJ Dakar" },
  ]},
  a2: { photo: "https://images.unsplash.com/photo-1583500178690-f2c7c9c1d2bb?w=900&auto=format&fit=crop", parcours: [
    { annee: 2018, etape: "Premiers combats à l'écurie de son oncle" },
    { annee: 2023, etape: "Champion du Sénégal cadets" },
    { annee: 2026, etape: "Sélectionné JOJ" },
  ]},
  a3: { photo: "https://images.unsplash.com/photo-1549476464-37392f717541?w=900&auto=format&fit=crop", parcours: [
    { annee: 2019, etape: "Débute le taekwondo à 9 ans" },
    { annee: 2024, etape: "Ceinture noire 1ᵉʳ dan" },
    { annee: 2026, etape: "Sélectionnée JOJ" },
  ]},
  a4: { photo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&auto=format&fit=crop", parcours: [
    { annee: 2021, etape: "Recruté par la SEED Academy" },
    { annee: 2025, etape: "Capitaine U18 Sénégal" },
    { annee: 2026, etape: "Sélection JOJ Dakar" },
  ]},
  a5: { photo: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&auto=format&fit=crop", parcours: [
    { annee: 2020, etape: "Club nautique de Dakar" },
    { annee: 2024, etape: "Stage au Cercle des Nageurs de Marseille" },
    { annee: 2026, etape: "Recordwoman nationale" },
  ]},
  a6: { photo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&auto=format&fit=crop", parcours: [
    { annee: 2022, etape: "Académie WAFA, Ghana" },
    { annee: 2025, etape: "Meilleur buteur WAFU U17" },
  ]},
  a7: { photo: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=900&auto=format&fit=crop", parcours: [
    { annee: 2023, etape: "Sélection NBA Academy Latin America" },
    { annee: 2024, etape: "Argent Coupe du Monde 3x3 U17" },
  ]},
  a8: { photo: "https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=900&auto=format&fit=crop", parcours: [
    { annee: 2018, etape: "Débute au Kodokan de Tokyo" },
    { annee: 2025, etape: "Or Asia Junior" },
  ]},
  a9: { photo: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&auto=format&fit=crop", parcours: [
    { annee: 2022, etape: "Champion Maroc cadets" },
    { annee: 2025, etape: "Or Tour du Maghreb U18" },
  ]},
  a10: { photo: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=900&auto=format&fit=crop", parcours: [
    { annee: 2023, etape: "Centre fédéral italien beach" },
    { annee: 2025, etape: "Argent Euro Beach U18" },
  ]},
  a11: { photo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&auto=format&fit=crop", parcours: [
    { annee: 2021, etape: "Détectée au lycée de Thiès" },
    { annee: 2025, etape: "Or saut en longueur CAA Juniors" },
  ]},
  a12: { photo: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=900&auto=format&fit=crop", parcours: [
    { annee: 2020, etape: "Premiers semis à Fatick" },
    { annee: 2025, etape: "Or semi-marathon de Dakar" },
  ]},
};

export const actualiteContenus: Record<string, { auteur: string; contenu: string[] }> = {
  n1: { auteur: "Aminata Sall — JANT Rédaction", contenu: [
    "À six mois de la cérémonie d'ouverture, Dakar entre dans la dernière ligne droite. Le Comité d'Organisation a confirmé hier que 95% des infrastructures sont opérationnelles, dont la rénovation du stade Iba Mar Diop et l'extension de la Dakar Arena.",
    "Les premières délégations techniques sont déjà sur place pour valider les sites de compétition. Le Sénégal mise sur une organisation à dimension humaine, en faisant des Jeux un grand moment de fierté panafricaine.",
    "« Nous voulons que chaque athlète, chaque visiteur reparte avec la téranga dans le cœur », a déclaré Mamadou Diagna Ndiaye, président du COJOJ.",
  ]},
  n2: { auteur: "Reuters — Olympie", contenu: [
    "La flamme olympique a été allumée ce matin sur le site antique d'Olympie, en Grèce. Une cérémonie sobre et solennelle, en présence du président du CIO et d'une délégation sénégalaise.",
    "Le relais traversera ensuite plusieurs villes africaines avant d'arriver à Dakar le 30 octobre 2026. Plus de 1 200 relayeurs porteront la flamme à travers le continent.",
  ]},
  n3: { auteur: "JANT Communauté", contenu: [
    "Le programme des volontaires JOJ Dakar 2026 dépasse toutes les attentes : 5 047 inscrits en moins d'un mois. La majorité a entre 16 et 25 ans.",
    "Les volontaires seront déployés sur l'accueil, la traduction, l'organisation des sites et l'accompagnement des délégations. Une formation accélérée démarre dès juin.",
    "Inscriptions toujours ouvertes sur jant.app/volontaires.",
  ]},
  n4: { auteur: "Mor Faye — Sport Reporter", contenu: [
    "À 17 ans, Fatou Diop continue d'impressionner. La sprinteuse de Pikine a couru le 100m en 11''18 lors du dernier meeting de Rabat, record personnel et meilleur temps africain U18 de la saison.",
    "Sa préparation se poursuit entre Dakar et Berlin, où elle s'entraîne avec le coach Tobias Gehrke. Objectif : la finale, et pourquoi pas, le podium à domicile.",
  ]},
  n5: { auteur: "JANT Sites", contenu: [
    "La Dakar Arena a passé avec succès son test de pleine capacité hier soir, lors d'un match amical de basketball devant 15 000 spectateurs.",
    "Tous les flux d'évacuation, sonorisation et restauration ont été validés. Le site accueillera le basketball 3x3, le judo et le taekwondo en novembre.",
  ]},
  n6: { auteur: "JANT Culture", contenu: [
    "Le programme culturel des JOJ Dakar 2026 a été dévoilé : 18 concerts, 12 expositions et 4 grands défilés à travers tout le pays.",
    "Youssou N'Dour, Baaba Maal et Wally Seck sont annoncés. La programmation met aussi en lumière les jeunes artistes : slam, hip-hop sénégalais, danse contemporaine.",
    "Toutes les manifestations seront gratuites pour les détenteurs du pass JOJ.",
  ]},
};
