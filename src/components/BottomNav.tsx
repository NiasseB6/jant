import { NavLink } from "react-router-dom";
import { Home, Trophy, Newspaper, Map, Landmark, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export const BottomNav = () => {
  const { session } = useAuth();
  const { t } = useTranslation();
  const tabs = [
    { to: "/", label: t("app.nav.home"), icon: Home, requiresAuth: false },
    { to: "/jambaar", label: t("app.nav.jambaar"), icon: Trophy, requiresAuth: true },
    { to: "/xibaar", label: t("app.nav.xibaar"), icon: Newspaper, requiresAuth: false },
    { to: "/yoon-wi", label: t("app.nav.yoonwi"), icon: Map, requiresAuth: false },
    { to: "/cosaan", label: t("app.nav.cosaan"), icon: Landmark, requiresAuth: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-xl backdrop-saturate-150 border-t border-white/40 shadow-soft lg:hidden">
      <div className="max-w-md sm:max-w-2xl mx-auto grid grid-cols-5">
        {tabs.map(({ to, label, icon: Icon, requiresAuth }) => {
          const locked = requiresAuth && !session;
          return (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 px-1 transition-all relative",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      "p-1.5 rounded-xl transition-all relative",
                      isActive && "bg-gradient-hero shadow-warm scale-110"
                    )}
                  >
                    <Icon
                      className={cn("h-5 w-5", isActive && "text-primary-foreground")}
                      strokeWidth={2.2}
                    />
                    {locked && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-foreground/80 flex items-center justify-center">
                        <Lock className="h-2 w-2 text-background" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
