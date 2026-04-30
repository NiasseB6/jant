import { create } from "zustand";
import {
  Demande,
  getNiveau,
  initialClassement,
  initialDemandes,
  Classement,
} from "@/data/jambaar";
import { useMissions } from "@/stores/missions";
import { supabase } from "@/integrations/supabase/client";
import { niveauFromScore } from "@/contexts/AuthContext";

type State = {
  userName: string;
  points: number;
  helpedIds: string[];
  demandes: Demande[];
  classement: Classement[];
  userId: string | null;
  setUser: (info: { userId: string | null; userName: string; points: number }) => void;
  addPoints: (n: number) => void;
  helpRequest: (id: string) => boolean;
  addDemande: (d: Omit<Demande, "id" | "auteur" | "createdAt" | "distanceKm">) => void;
  recordAidPost: () => void;
};

const persistScore = async (userId: string | null, points: number) => {
  if (!userId) return;
  await supabase
    .from("profiles")
    .update({ score: points, niveau: niveauFromScore(points) })
    .eq("id", userId);
};

export const useJambaar = create<State>((set, get) => ({
  userName: "Codou Sarr",
  points: 420,
  helpedIds: [],
  demandes: initialDemandes,
  classement: initialClassement,
  userId: null,
  setUser: ({ userId, userName, points }) =>
    set((s) => {
      const classement = s.classement
        .map((c) => (c.nom.startsWith("Toi") ? { ...c, nom: `Toi (${userName})`, points, niveau: getNiveau(points) } : c))
        .sort((a, b) => b.points - a.points)
        .map((c, i) => ({ ...c, rang: i + 1 }));
      return { userId, userName, points, classement };
    }),
  addPoints: (n) =>
    set((s) => {
      const points = s.points + n;
      const classement = s.classement
        .map((c) =>
          c.nom.startsWith("Toi")
            ? { ...c, points, niveau: getNiveau(points) }
            : c
        )
        .sort((a, b) => b.points - a.points)
        .map((c, i) => ({ ...c, rang: i + 1 }));
      void persistScore(s.userId, points);
      return { points, classement };
    }),
  helpRequest: (id) => {
    const s = get();
    if (s.helpedIds.includes(id)) return false;

    const req = s.demandes.find(d => d.id === id);
    if (!req) return false;
    const auteur = req.auteur;

    const helpedCount = s.helpedIds.reduce((count, helpedId) => {
      const hd = s.demandes.find(d => d.id === helpedId);
      return hd && hd.auteur === auteur ? count + 1 : count;
    }, 0);

    if (helpedCount >= 3) {
      return false; // Already helped this person 3 times
    }

    set((state) => ({ helpedIds: [...state.helpedIds, id] }));
    get().addPoints(50);
    const ms = useMissions.getState();
    ms.addAide();
    const completed = ms.incrementer("m1");
    if (completed?.done) get().addPoints(completed.mission.recompense);
    
    return true;
  },
  addDemande: (d) =>
    set((s) => ({
      demandes: [
        {
          ...d,
          id: `u-${Date.now()}`,
          auteur: `${s.userName} (vous)`,
          distanceKm: 0,
          createdAt: "à l'instant",
        },
        ...s.demandes,
      ],
    })),
  recordAidPost: () => {
    set((s) => ({ helpedIds: [...s.helpedIds, `aid-${Date.now()}`] }));
    get().addPoints(25);
    const ms = useMissions.getState();
    ms.addAide();
  },
}));
