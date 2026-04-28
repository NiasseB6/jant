import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mission = {
  id: string;
  titre: string;
  description: string;
  emoji: string;
  recompense: number;
  objectif: number;
};

export const MISSIONS_DU_JOUR: Mission[] = [
  { id: "m1", titre: "Aider 3 personnes", description: "Réponds à 3 demandes d'entraide aujourd'hui", emoji: "🤝", recompense: 150, objectif: 3 },
  { id: "m2", titre: "Accompagner un touriste", description: "Guide un visiteur vers un site JOJ", emoji: "🧭", recompense: 100, objectif: 1 },
  { id: "m3", titre: "Traduire en wolof", description: "Aide à la traduction pour un visiteur", emoji: "💬", recompense: 80, objectif: 1 },
  { id: "m4", titre: "Partager la téranga", description: "Offre une attaya ou un repas à un visiteur", emoji: "🍵", recompense: 120, objectif: 1 },
];

export type Badge = {
  id: string;
  titre: string;
  description: string;
  emoji: string;
  seuil: number; // points required
};

export const BADGES: Badge[] = [
  { id: "b1", titre: "Premier Pas", description: "Première aide apportée", emoji: "🌱", seuil: 50 },
  { id: "b2", titre: "Cœur Généreux", description: "300 points d'entraide", emoji: "💖", seuil: 300 },
  { id: "b3", titre: "Ambassadeur JOJ", description: "600 points cumulés", emoji: "🎖️", seuil: 600 },
  { id: "b4", titre: "Héros de Dakar", description: "1000 points — légende vivante", emoji: "🦁", seuil: 1000 },
  { id: "b5", titre: "Gardien de la Téranga", description: "2000 points — référence absolue", emoji: "👑", seuil: 2000 },
];

type State = {
  date: string; // YYYY-MM-DD pour reset quotidien
  progres: Record<string, number>; // mission id -> progression
  termines: string[]; // mission ids
  totalAides: number;
  reset: () => void;
  incrementer: (missionId: string, by?: number) => { done: boolean; mission: Mission } | null;
  addAide: () => void;
};

const today = () => new Date().toISOString().slice(0, 10);

export const useMissions = create<State>()(
  persist(
    (set, get) => ({
      date: today(),
      progres: {},
      termines: [],
      totalAides: 0,
      reset: () => set({ date: today(), progres: {}, termines: [] }),
      incrementer: (missionId, by = 1) => {
        if (get().date !== today()) get().reset();
        const m = MISSIONS_DU_JOUR.find((x) => x.id === missionId);
        if (!m || get().termines.includes(missionId)) return null;
        const next = (get().progres[missionId] ?? 0) + by;
        const done = next >= m.objectif;
        set((s) => ({
          progres: { ...s.progres, [missionId]: Math.min(next, m.objectif) },
          termines: done ? [...s.termines, missionId] : s.termines,
        }));
        return done ? { done: true, mission: m } : null;
      },
      addAide: () => set((s) => ({ totalAides: s.totalAides + 1 })),
    }),
    { name: "jant-missions" }
  )
);
