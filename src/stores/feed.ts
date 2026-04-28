import { create } from "zustand";
import { persist } from "zustand/middleware";
import feedRepas from "@/assets/jambaar/feed-repas.jpg";
import feedPirogue from "@/assets/jambaar/feed-pirogue.jpg";
import feedMonument from "@/assets/jambaar/feed-monument.jpg";
import feedPlage from "@/assets/jambaar/feed-plage.jpg";
import feedPiscine from "@/assets/jambaar/feed-piscine.jpg";
import feedChef from "@/assets/jambaar/feed-chef.jpg";
import feedLacRose from "@/assets/jambaar/feed-lacrose.jpg";
import feedTerrasse from "@/assets/jambaar/feed-terrasse.jpg";

export type PostType = "remerciement" | "aide" | "communaute";

export type Comment = {
  id: string;
  auteur: string;
  texte: string;
  createdAt: string;
};

export type Post = {
  id: string;
  type: PostType;
  auteur: string;
  auteurInitiale: string;
  niveau: "Talibé" | "Ndongo" | "Jambaar";
  texte: string;
  image?: string;
  // Pour aide / remerciement
  beneficiaire?: string; // nom de la personne qui doit confirmer (pour type "aide")
  remercieA?: string; // nom de l'aidant (pour type "remerciement")
  pointsGagnes?: number;
  confirmee?: boolean;
  likes: number;
  likedByMe: boolean;
  comments: Comment[];
  createdAt: string;
};

const now = () => new Date().toISOString();

const initialPosts: Post[] = [
  {
    id: "p1",
    type: "remerciement",
    auteur: "Awa Sarr",
    auteurInitiale: "A",
    niveau: "Talibé",
    texte: "Merci infiniment à Modou pour m'avoir accompagnée jusqu'au stade L. Senghor 🙏🏽 La téranga sénégalaise n'est pas un mythe !",
    remercieA: "Modou Sow",
    likes: 24,
    likedByMe: false,
    comments: [
      { id: "c1", auteur: "Fatou Diop", texte: "Trop beau 💛", createdAt: now() },
    ],
    createdAt: "il y a 10 min",
  },
  {
    id: "p2",
    type: "aide",
    auteur: "Toi (Codou)",
    auteurInitiale: "S",
    niveau: "Ndongo",
    texte: "J'ai aidé une famille à trouver l'entrée Nord de l'Arène Nationale. On a marché ensemble depuis Pikine 🚶🏽‍♂️",
    image: feedMonument,
    beneficiaire: "Mariama F.",
    pointsGagnes: 50,
    confirmee: false,
    likes: 8,
    likedByMe: false,
    comments: [],
    createdAt: "il y a 25 min",
  },
  {
    id: "p3",
    type: "communaute",
    auteur: "Cheikh Ndiaye",
    auteurInitiale: "C",
    niveau: "Ndongo",
    texte: "Rappel : pendant les JOJ, restons unis. Un sourire, une orientation, un verre d'eau — chaque geste compte 🇸🇳✨",
    image: feedPirogue,
    likes: 56,
    likedByMe: true,
    comments: [
      { id: "c2", auteur: "Aïssatou Ba", texte: "Bien dit 🙌", createdAt: now() },
      { id: "c3", auteur: "Ibrahima Diop", texte: "On est ensemble !", createdAt: now() },
    ],
    createdAt: "il y a 1 h",
  },
  {
    id: "p4",
    type: "aide",
    auteur: "Aïssatou Ba",
    auteurInitiale: "A",
    niveau: "Jambaar",
    texte: "Partage d'un thieboudienne avec des visiteurs maliens venus pour le basket 3x3 🍲 La table sénégalaise est ouverte à tous !",
    image: feedRepas,
    beneficiaire: "Visiteurs maliens",
    pointsGagnes: 80,
    confirmee: true,
    likes: 102,
    likedByMe: false,
    comments: [
      { id: "c4", auteur: "Modou Sow", texte: "Bravo grande sœur 👏🏽", createdAt: now() },
    ],
    createdAt: "il y a 2 h",
  },
  {
    id: "p5",
    type: "remerciement",
    auteur: "Ibrahima Diop",
    auteurInitiale: "I",
    niveau: "Ndongo",
    texte: "Merci à Aïssatou pour la traduction wolof-anglais avec les supporters anglais hier soir 💬✨",
    remercieA: "Aïssatou Ba",
    likes: 31,
    likedByMe: false,
    comments: [],
    createdAt: "il y a 3 h",
  },
  {
    id: "p6",
    type: "communaute",
    auteur: "Mame Diarra Niang",
    auteurInitiale: "M",
    niveau: "Jambaar",
    texte: "Sortie découverte avec les délégations à la plage de Pointe-Sarène 🏖️ Sable doré, eau turquoise — le Sénégal montre sa plus belle carte postale aux athlètes des JOJ !",
    image: feedPlage,
    likes: 87,
    likedByMe: false,
    comments: [
      { id: "c5", auteur: "Awa Sarr", texte: "Mashallah, c'est paradisiaque 🌴", createdAt: now() },
    ],
    createdAt: "il y a 4 h",
  },
  {
    id: "p7",
    type: "aide",
    auteur: "Ousmane Fall",
    auteurInitiale: "O",
    niveau: "Jambaar",
    texte: "Hébergement solidaire ouvert pour 3 jeunes athlètes de Guinée-Bissau 🏊 Piscine, chambres confortables et petit-déj sénégalais offerts pour toute la durée des JOJ !",
    image: feedPiscine,
    beneficiaire: "Délégation Guinée-Bissau",
    pointsGagnes: 120,
    confirmee: false,
    likes: 64,
    likedByMe: false,
    comments: [
      { id: "c6", auteur: "Cheikh Ndiaye", texte: "Vrai Jambaar 🦁", createdAt: now() },
    ],
    createdAt: "il y a 5 h",
  },
  {
    id: "p8",
    type: "remerciement",
    auteur: "Délégation Comité JOJ",
    auteurInitiale: "D",
    niveau: "Jambaar",
    texte: "Merci au Chef Fatou Ka du Pullman Téranga pour sa masterclass cuisine sénégalaise offerte aux jeunes volontaires 👨‍🍳 Thieboudienne, yassa, mafé — patrimoine partagé !",
    image: feedChef,
    remercieA: "Chef Fatou Ka",
    likes: 143,
    likedByMe: true,
    comments: [
      { id: "c7", auteur: "Aïssatou Ba", texte: "Une vraie ambassadrice 💛", createdAt: now() },
      { id: "c8", auteur: "Ibrahima Diop", texte: "Inscription pour la prochaine ?", createdAt: now() },
    ],
    createdAt: "il y a 6 h",
  },
  {
    id: "p9",
    type: "aide",
    auteur: "Moussa Diallo",
    auteurInitiale: "M",
    niveau: "Ndongo",
    texte: "Excursion guidée au Lac Rose avec un groupe de visiteurs européens 🌸 Explication du sel, balade en pirogue, photos souvenirs. La téranga en action !",
    image: feedLacRose,
    beneficiaire: "Visiteurs européens",
    pointsGagnes: 70,
    confirmee: true,
    likes: 92,
    likedByMe: false,
    comments: [
      { id: "c9", auteur: "Mame Diarra Niang", texte: "Le Lac Rose, toujours magique 💖", createdAt: now() },
    ],
    createdAt: "il y a 8 h",
  },
  {
    id: "p10",
    type: "communaute",
    auteur: "Pullman Téranga",
    auteurInitiale: "P",
    niveau: "Jambaar",
    texte: "Soirée d'accueil officielle des bénévoles JOJ ce soir sur notre rooftop 🌅 Vue sur l'océan, jus de bissap & dattes offerts. Venez nombreux célébrer l'esprit Jambaar !",
    image: feedTerrasse,
    likes: 178,
    likedByMe: false,
    comments: [
      { id: "c10", auteur: "Ousmane Fall", texte: "On sera là inshallah 🙌", createdAt: now() },
      { id: "c11", auteur: "Fatou Diop", texte: "Merci pour cette belle initiative 🌅", createdAt: now() },
    ],
    createdAt: "il y a 12 h",
  },
];

type FeedState = {
  posts: Post[];
  toggleLike: (id: string) => void;
  addComment: (id: string, texte: string) => void;
  confirmAide: (id: string) => { points: number; aidant: string } | null;
  addPost: (p: Pick<Post, "type" | "texte" | "image" | "beneficiaire" | "remercieA">) => void;
};

export const useFeed = create<FeedState>()(
  persist(
    (set, get) => ({
      posts: initialPosts,
      toggleLike: (id) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === id
              ? { ...p, likedByMe: !p.likedByMe, likes: p.likes + (p.likedByMe ? -1 : 1) }
              : p
          ),
        })),
      addComment: (id, texte) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === id
              ? {
                  ...p,
                  comments: [
                    ...p.comments,
                    { id: `c-${Date.now()}`, auteur: "Toi (Codou)", texte, createdAt: now() },
                  ],
                }
              : p
          ),
        })),
      confirmAide: (id) => {
        const post = get().posts.find((p) => p.id === id);
        if (!post || post.confirmee || post.type !== "aide") return null;
        set((s) => ({
          posts: s.posts.map((p) => (p.id === id ? { ...p, confirmee: true } : p)),
        }));
        return { points: post.pointsGagnes ?? 50, aidant: post.auteur };
      },
      addPost: (p) =>
        set((s) => ({
          posts: [
            {
              id: `p-${Date.now()}`,
              auteur: "Toi (Codou)",
              auteurInitiale: "S",
              niveau: "Ndongo",
              likes: 0,
              likedByMe: false,
              comments: [],
              createdAt: "à l'instant",
              pointsGagnes: p.type === "aide" ? 50 : undefined,
              confirmee: false,
              ...p,
            },
            ...s.posts,
          ],
        })),
    }),
    { name: "jant-feed-v3" }
  )
);
