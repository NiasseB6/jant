import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGuest } from "@/contexts/GuestContext";

/**
 * Redirige vers /welcome si l'utilisateur n'a fait aucun choix
 * (ni connecté, ni "continuer sans compte").
 */
export const RouteGate = ({ children }: { children: ReactNode }) => {
  const { session, loading } = useAuth();
  const { isGuest, hasChosen } = useGuest();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (loading) return;
    const isPublicRoute = pathname === "/" || pathname === "/auth";
    if (isPublicRoute) return;
    if (!session && !(hasChosen && isGuest)) {
      navigate("/", { replace: true });
    }
  }, [loading, session, hasChosen, isGuest, pathname, navigate]);

  return <>{children}</>;
};
