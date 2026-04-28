import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Experience } from "@/data/experiences";

export type ExperienceUser = Pick<
  Experience,
  "titre" | "categorie" | "dureeMin" | "prix" | "lieu" | "description"
> & { hote: string };

type State = {
  reservees: string[]; // ids
  proposees: (ExperienceUser & { id: string; createdAt: number })[];
  toggleReserver: (id: string) => boolean; // returns new state
  isReservee: (id: string) => boolean;
  proposer: (e: ExperienceUser) => void;
};

export const useExperiences = create<State>()(
  persist(
    (set, get) => ({
      reservees: [],
      proposees: [],
      toggleReserver: (id) => {
        const has = get().reservees.includes(id);
        set((s) => ({
          reservees: has ? s.reservees.filter((x) => x !== id) : [...s.reservees, id],
        }));
        return !has;
      },
      isReservee: (id) => get().reservees.includes(id),
      proposer: (e) =>
        set((s) => ({
          proposees: [{ ...e, id: `up-${Date.now()}`, createdAt: Date.now() }, ...s.proposees],
        })),
    }),
    { name: "jant-experiences" }
  )
);
