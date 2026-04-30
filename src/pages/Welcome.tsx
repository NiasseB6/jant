import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGuest } from "@/contexts/GuestContext";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import monument from "@/assets/home-monument.jpg";
import logoJant from "@/assets/logo-jant.png";

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { session, loading } = useAuth();
  const { isGuest, hasChosen, continueAsGuest } = useGuest();

  useEffect(() => {
    if (loading) return;
    if (session) navigate("/home", { replace: true });
  }, [session, loading, navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <img
        src={monument}
        alt={t("welcome.heroImageAlt")}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(15,8,0,0.92) 0%, rgba(15,8,0,0.7) 45%, rgba(255,107,0,0.18) 80%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      <div className="relative min-h-screen flex flex-col px-6 py-10 max-w-md mx-auto">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-3 animate-fade-in">
          <img
            src={logoJant}
            alt="JANT"
            className="h-14 w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] select-none"
            draggable={false}
          />
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/80 font-bold">{t("welcome.headerKicker")}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end pb-2">
          <p
            className="text-[11px] uppercase tracking-[0.32em] text-white/90 font-bold mb-3"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}
          >
            {t("welcome.kicker")}
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight"
            style={{
              fontFamily: "'Poppins','Inter',system-ui,sans-serif",
              textShadow: "0 2px 8px rgba(0,0,0,0.65)",
              letterSpacing: "-0.02em",
            }}
          >
            {t("welcome.title")} <span style={{ color: "#FF6B00" }}>{t("welcome.titleAccent")}</span>.
          </h2>
          <p className="text-sm text-white/85 mt-3 max-w-[90%]" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
            {t("welcome.description")}
          </p>

          <div className="mt-8 space-y-3 animate-fade-in">
            <button
              onClick={() => navigate("/auth?mode=signup")}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground font-bold shadow-warm hover:bg-primary/90 transition"
            >
              <UserPlus className="h-4 w-4" /> {t("welcome.createAccount")}
            </button>
            <button
              onClick={() => navigate("/auth?mode=signin")}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/40 text-white font-bold hover:bg-white/25 transition"
            >
              <LogIn className="h-4 w-4" /> {t("welcome.login")}
            </button>
            <button
              onClick={() => { continueAsGuest(); navigate("/home", { replace: true }); }}
              className="w-full flex items-center justify-center gap-2 h-11 text-white/85 text-sm font-semibold hover:text-white transition"
            >
              {t("welcome.continueGuest")} <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="text-center text-[11px] text-white/60 mt-6">
            {t("welcome.guestNote")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
