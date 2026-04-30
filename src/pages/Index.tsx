import { useNavigate } from "react-router-dom";
import { Countdown } from "@/components/Countdown";
import { useAuth, getNiveauLabel } from "@/contexts/AuthContext";
import { Flame, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useGuest } from "@/contexts/GuestContext";
import { useTranslation } from "react-i18next";
import monument from "@/assets/home-monument.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { session, profile, signOut } = useAuth();
  const { exitGuest } = useGuest();
  const { t } = useTranslation();

  const prenom = profile?.prenom || profile?.pseudo || session?.user?.email?.split("@")[0];

  const handleSignOut = async () => {
    await signOut();
    exitGuest();
    navigate("/", { replace: true });
  };

  return (
    <div className="animate-fade-in pb-8">
      {/* Hero JOJ Dakar 2026 */}
      <section className="relative mx-4 mt-4 h-[600px] sm:h-[640px] overflow-hidden rounded-3xl shadow-warm">
        {/* Image NETTE — pas de blur, pas de filtre */}
        <img
          src={monument}
          alt={t("index.heroImageAlt")}
          className="absolute inset-0 w-full h-full object-cover select-none"
          draggable={false}
        />

        {/* Overlay UNIQUEMENT sur le bas, opacité légère pour préserver l'image */}
        <div
          className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(20,10,0,0.78) 0%, rgba(20,10,0,0.55) 30%, rgba(255,107,0,0.18) 65%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Bouton profil / connexion en haut à droite */}
        <button
          onClick={() => navigate(session ? "/jambaar" : "/auth")}
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-bold hover:bg-white/25 transition animate-fade-in"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
        >
          {session ? (
            <>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[11px]">
                  {(prenom?.charAt(0) || "?").toUpperCase()}
                </span>
              )}
              <span className="max-w-[80px] truncate">{prenom}</span>
            </>
          ) : (
            <>
              <LogIn className="h-3.5 w-3.5" /> {t("home.login")}
            </>
          )}
        </button>

        <div className="relative h-full flex flex-col justify-end px-6 pb-8">
          <div className="space-y-3">
            <p
              className="text-[11px] uppercase tracking-[0.32em] text-white font-bold opacity-0 animate-[heroUp_0.7s_ease-out_0.05s_forwards]"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}
            >
              {t("index.headerKicker")}
            </p>

            <h1
              className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight opacity-0 animate-[heroUp_0.8s_ease-out_0.18s_forwards]"
              style={{
                textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4)",
                fontFamily: "'Poppins','Inter',system-ui,sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {t("index.title")}
            </h1>

            <p
              className="text-base sm:text-lg text-white/95 max-w-[92%] opacity-0 animate-[heroUp_0.8s_ease-out_0.36s_forwards]"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.65)" }}
            >
              {t("index.welcome")}{" "}
              <span className="font-black" style={{ color: "#FF6B00" }}>JANT</span>{" "}
              {t("index.welcomeSuffix")}
            </p>
          </div>

          <div className="mt-7 opacity-0 animate-[heroPop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.55s_forwards]">
            <Countdown />
            <p
              className="text-center text-[10px] text-white/85 mt-3 tracking-[0.22em] font-bold"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
            >
              {t("index.countdownLabel")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA profil si non connecté */}
      {!session && (
        <section className="px-5 mt-6 animate-fade-in">
          <button
            onClick={() => navigate("/auth")}
            className="w-full flex items-center justify-between gap-3 bg-card border border-border rounded-2xl p-4 shadow-soft hover:shadow-warm transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t("home.createProfile")}</p>
                <p className="text-xs text-muted-foreground">{t("home.profileSub")}</p>
              </div>
            </div>
            <span className="text-primary font-bold text-sm">→</span>
          </button>
        </section>
      )}

      {/* Mini résumé profil si connecté */}
      {session && profile && (
        <section className="px-5 mt-6 animate-fade-in">
          <div className="space-y-3">
            <button
              onClick={() => navigate("/jambaar")}
              className="w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-4 shadow-soft hover:shadow-warm transition-all text-left"
            >
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-lg font-black text-primary-foreground">
                  {(prenom?.charAt(0) || "?").toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-foreground truncate">{prenom}</p>
                <p className="text-[11px] text-muted-foreground">
                  {getNiveauLabel(profile.niveau)} · Niveau {profile.niveau}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-primary tabular-nums">{profile.score}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t("home.points")}</p>
              </div>
              <Flame className="h-5 w-5 text-primary" />
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition"
            >
              <LogOut className="h-4 w-4" />
              {t("home.logout")}
            </button>
          </div>
        </section>
      )}

      {/* Animations */}
      <style>{`
        @keyframes heroUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroPop {
          0%   { opacity: 0; transform: scale(0.92); }
          60%  { opacity: 1; transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Index;
