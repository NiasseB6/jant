import { NavLink } from "react-router-dom";
import { Home, Trophy, Newspaper, Map, Landmark, Lock, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useGuest } from "@/contexts/GuestContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SideNav = () => {
  const { session, signOut, profile } = useAuth();
  const { exitGuest } = useGuest();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tabs = [
    { to: "/", label: t("app.nav.home"), icon: Home, requiresAuth: false },
    { to: "/jambaar", label: t("app.nav.jambaar"), icon: Trophy, requiresAuth: true },
    { to: "/xibaar", label: t("app.nav.xibaar"), icon: Newspaper, requiresAuth: false },
    { to: "/yoon-wi", label: t("app.nav.yoonwi"), icon: Map, requiresAuth: false },
    { to: "/cosaan", label: t("app.nav.cosaan"), icon: Landmark, requiresAuth: false },
  ];

  const handleSignOut = async () => {
    await signOut();
    exitGuest();
    navigate("/welcome", { replace: true });
  };

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 z-40 flex-col border-r border-border/50 bg-card/70 backdrop-blur-xl">
      <div className="px-6 py-6 border-b border-border/50">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
          JOJ Dakar 2026
        </p>
        <h1 className="text-2xl font-black bg-gradient-hero bg-clip-text text-transparent">
          JANT
        </h1>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {tabs.map(({ to, label, icon: Icon, requiresAuth }) => {
          const locked = requiresAuth && !session;
          return (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  isActive
                    ? "bg-gradient-hero text-primary-foreground shadow-warm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <Icon className="h-5 w-5" strokeWidth={2.2} />
              <span className="flex-1">{label}</span>
              {locked && <Lock className="h-3.5 w-3.5 opacity-70" />}
            </NavLink>
          );
        })}
      </nav>
      <div className="px-3 py-3 border-t border-border/50">
        {session ? (
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted transition"
          >
            <LogOut className="h-4 w-4" />
            <span className="flex-1 text-left truncate">{profile?.prenom || t("app.auth.signOut")}</span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth?mode=signin")}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/15 transition"
          >
            <LogIn className="h-4 w-4" />
            <span className="flex-1 text-left">{t("app.auth.signIn")}</span>
          </button>
        )}
        <p className="px-3 py-2 text-[10px] text-muted-foreground">© 2026 · Dalal ak Jàmm 🇸🇳</p>
      </div>
    </aside>
  );
};
