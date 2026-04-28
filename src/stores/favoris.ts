import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavState = {
  epreuves: string[];
  athletes: string[];
  toggleEpreuve: (id: string) => void;
  toggleAthlete: (id: string) => void;
  isEpreuve: (id: string) => boolean;
  isAthlete: (id: string) => boolean;
};

export const useFavoris = create<FavState>()(
  persist(
    (set, get) => ({
      epreuves: [],
      athletes: [],
      toggleEpreuve: (id) =>
        set((s) => ({
          epreuves: s.epreuves.includes(id)
            ? s.epreuves.filter((x) => x !== id)
            : [...s.epreuves, id],
        })),
      toggleAthlete: (id) =>
        set((s) => ({
          athletes: s.athletes.includes(id)
            ? s.athletes.filter((x) => x !== id)
            : [...s.athletes, id],
        })),
      isEpreuve: (id) => get().epreuves.includes(id),
      isAthlete: (id) => get().athletes.includes(id),
    }),
    { name: "jant-favoris" }
  )
);
