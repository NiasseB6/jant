import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useJambaar } from "@/stores/jambaar";

export type Profile = {
  id: string;
  prenom: string | null;
  nom: string | null;
  pseudo: string | null;
  pays: string | null;
  avatar_url: string | null;
  score: number;
  niveau: number;
  badges: string[];
};

type Ctx = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (patch: Partial<Profile>) => Promise<void>;
};

const AuthContext = createContext<Ctx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
    if (data) {
      const p = data as Profile;
      setProfile(p);
      const displayName = [p.prenom, p.nom].filter(Boolean).join(" ") || p.pseudo || "Joueur";
      useJambaar.getState().setUser({ userId: p.id, userName: displayName, points: p.score });
    }
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) {
        setTimeout(() => fetchProfile(s.user.id), 0);
      } else {
        setProfile(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) fetchProfile(s.user.id);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const value: Ctx = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    signOut: async () => {
      await supabase.auth.signOut();
    },
    refreshProfile: async () => {
      if (session?.user) await fetchProfile(session.user.id);
    },
    updateProfile: async (patch) => {
      if (!session?.user) return;
      const { data } = await supabase
        .from("profiles")
        .update(patch)
        .eq("id", session.user.id)
        .select()
        .maybeSingle();
      if (data) setProfile(data as Profile);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const getNiveauLabel = (niveau: number) => {
  if (niveau >= 5) return "Jambaar Légende";
  if (niveau >= 3) return "Jambaar";
  if (niveau >= 2) return "Ndongo";
  return "Talibé";
};

export const niveauFromScore = (score: number) => {
  if (score >= 2000) return 5;
  if (score >= 1000) return 4;
  if (score >= 500) return 3;
  if (score >= 200) return 2;
  return 1;
};
