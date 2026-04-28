import { Award, Sparkles, MapPin } from "lucide-react";
import { useJambaar } from "@/stores/jambaar";
import { getNiveau, getNextThreshold } from "@/data/jambaar";
import { useAuth } from "@/contexts/AuthContext";

const niveauStyle: Record<string, string> = {
  Talibé: "bg-muted text-foreground",
  Ndongo: "bg-secondary text-secondary-foreground",
  Jambaar: "bg-gradient-hero text-primary-foreground",
};

export const ProfileCard = () => {
  const { userName, points } = useJambaar();
  const { profile } = useAuth();
  const niveau = getNiveau(points);
  const next = getNextThreshold(points);
  const progress = niveau === "Jambaar" ? 100 : Math.min(100, Math.round((points / next) * 100));
  const initial = (profile?.prenom?.charAt(0) || userName.charAt(0)).toUpperCase();

  return (
    <section className="px-5 -mt-8">
      <div className="bg-gradient-card rounded-3xl p-5 shadow-warm border border-border/50 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-hero opacity-10" />
        <div className="flex items-center gap-4 relative">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-warm" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-sunset flex items-center justify-center text-2xl font-black text-primary-foreground shadow-warm">
              {initial}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {profile?.pays ? (<><MapPin className="h-3 w-3" />{profile.pays}</>) : "Bienvenue"}
            </p>
            <h2 className="text-xl font-black text-foreground truncate">{userName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${niveauStyle[niveau]}`}>
                <Award className="h-3 w-3 inline mr-1" />{niveau}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-primary tabular-nums">{points}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">points</p>
          </div>
        </div>

        <div className="mt-4 relative">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-secondary" />
              {niveau === "Jambaar" ? "Niveau maximum atteint" : `Vers ${niveau === "Talibé" ? "Ndongo" : "Jambaar"}`}
            </span>
            <span className="font-bold text-foreground">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-hero transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
