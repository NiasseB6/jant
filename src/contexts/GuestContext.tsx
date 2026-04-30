import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const KEY = "jant.guest";

type Ctx = {
  isGuest: boolean;
  hasChosen: boolean; // l'utilisateur a-t-il déjà fait un choix (auth ou invité) ?
  continueAsGuest: () => void;
  exitGuest: () => void;
};

const GuestContext = createContext<Ctx | undefined>(undefined);

export const GuestProvider = ({ children }: { children: ReactNode }) => {
  const [isGuest, setIsGuest] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "1") {
        setIsGuest(true);
        setHasChosen(true);
      }
    } catch (e) {
      void e;
    }
  }, []);

  const continueAsGuest = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch (e) {
      void e;
    }
    setIsGuest(true);
    setHasChosen(true);
  };

  const exitGuest = () => {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      void e;
    }
    setIsGuest(false);
  };

  return (
    <GuestContext.Provider value={{ isGuest, hasChosen, continueAsGuest, exitGuest }}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuest = () => {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error("useGuest must be used within GuestProvider");
  return ctx;
};
