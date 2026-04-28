import { useNavigate } from "react-router-dom";
import { Trophy, Lock, UserPlus, LogIn, Star, Medal, Flame } from "lucide-react";
import headerImg from "@/assets/headers/jambaar.jpg";

export const JambaarLocked = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <section className="relative mx-4 mt-4 h-56 overflow-hidden rounded-3xl shadow-warm">
        <img src={headerImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />
        <div className="relative h-full flex flex-col justify-end p-5">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-black uppercase tracking-wider mb-2">
            <Trophy className="h-3 w-3" /> Communauté
          </div>
          <h1 className="text-3xl font-black text-white">Jambaar</h1>
          <p className="text-sm text-white/85">Entraide, courage et téranga</p>
        </div>
      </section>

      <section className="mx-4 mt-5 bg-card border border-border rounded-3xl p-6 shadow-soft">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 mx-auto mb-4">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-center text-xl font-black text-foreground">
          Crée ton profil Jambaar
        </h2>
        <p className="text-center text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
          Rejoins la communauté pour gagner des points, débloquer des badges et apparaître dans le classement.
        </p>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { icon: Star, label: "Score & XP" },
            { icon: Medal, label: "Badges" },
            { icon: Flame, label: "Classement" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-muted/50">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-[11px] font-bold text-foreground text-center">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <button
            onClick={() => navigate("/auth?mode=signup")}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-full bg-primary text-primary-foreground font-bold shadow-warm hover:bg-primary/90 transition"
          >
            <UserPlus className="h-4 w-4" /> Créer mon profil
          </button>
          <button
            onClick={() => navigate("/auth?mode=signin")}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-full bg-muted text-foreground font-bold hover:bg-muted/70 transition"
          >
            <LogIn className="h-4 w-4" /> J'ai déjà un compte
          </button>
        </div>
      </section>
      <div className="h-10" />
    </div>
  );
};
