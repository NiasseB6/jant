import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useGuest } from "@/contexts/GuestContext";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Flame, Mail, Lock, User as UserIcon, Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Auth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const { session, loading } = useAuth();
  const { exitGuest } = useGuest();
  const initialMode = params.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [busy, setBusy] = useState(false);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);

  const signUpSchema = z.object({
    prenom: z.string().trim().min(1, t("auth.validation.firstNameRequired")).max(60),
    nom: z.string().trim().min(1, t("auth.validation.lastNameRequired")).max(60),
    pays: z.string().trim().min(2, t("auth.validation.countryRequired")).max(60),
    email: z.string().trim().email(t("auth.validation.invalidEmail")).max(255),
    password: z.string().min(6, t("auth.validation.passwordMin")).max(72),
  });

  const signInSchema = z.object({
    email: z.string().trim().email(t("auth.validation.invalidEmail")),
    password: z.string().min(6, t("auth.validation.passwordMin")),
  });

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    pays: t("auth.defaultCountry"),
    email: "",
    password: "",
  });

  const fileToCompressedDataUrl = (file: File, maxSize = 512, quality = 0.82): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
          const width = Math.max(1, Math.round(img.width * ratio));
          const height = Math.max(1, Math.round(img.height * ratio));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error(t("auth.imageErrors.noCanvas")));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => reject(new Error(t("auth.imageErrors.invalidImage")));
        img.src = String(reader.result);
      };
      reader.onerror = () => reject(new Error(t("auth.imageErrors.readFailed")));
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    if (!loading && session) {
      exitGuest();

    }
  }, [loading, session, navigate, exitGuest]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const parsed = signUpSchema.safeParse(form);
        if (!parsed.success) {
          toast({ title: t("auth.toasts.checkInfoTitle"), description: parsed.error.issues[0].message, variant: "destructive" });
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            data: {
              prenom: parsed.data.prenom,
              nom: parsed.data.nom,
              pays: parsed.data.pays,
              pseudo: parsed.data.prenom,
              avatar_url: avatarDataUrl,
            },
          },
        });
        if (error) throw error;
        toast({ title: t("auth.toasts.welcomeTitle"), description: t("auth.toasts.accountCreated") });
        // Delay navigation to allow the session to be established before routing to Jambaar
        setTimeout(() => navigate("/jambaar", { replace: true }), 500);
      } else {
        const parsed = signInSchema.safeParse(form);
        if (!parsed.success) {
          toast({ title: t("auth.toasts.checkInfoTitle"), description: parsed.error.issues[0].message, variant: "destructive" });
          return;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }

    } catch (err: unknown) {
      const description =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : t("common.tryAgain");
      toast({ title: t("common.error"), description, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast({ title: t("auth.toasts.googleTitle"), description: String(result.error.message ?? result.error), variant: "destructive" });
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate("/jambaar", { replace: true });
  };

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAvatarDataUrl(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast({ title: t("auth.toasts.invalidFormatTitle"), description: t("auth.toasts.chooseImage"), variant: "destructive" });
      e.target.value = "";
      return;
    }
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setAvatarDataUrl(dataUrl);
    } catch (err: unknown) {
      const description =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : t("auth.toasts.imageProcessFailed");
      toast({ title: t("auth.toasts.imageErrorTitle"), description, variant: "destructive" });
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-ambient flex flex-col items-center justify-center p-4 gap-4">
      <div className="w-full max-w-md flex justify-end">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md bg-card rounded-3xl shadow-warm border border-border/50 p-6 sm:p-8 animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-6">
          <img 
            src="/apple-touch-icon.png.png" 
            alt="JANT Logo" 
            className="w-10 h-10 object-contain" 
          />
          <h1 className="text-2xl font-black tracking-tight">
            <span className="text-primary">JANT</span>
          </h1>
        </div>

        <div className="flex bg-muted rounded-full p-1 mb-6">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${
              mode === "signin" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"
            }`}
          >
            {t("auth.signinTab")}
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${
              mode === "signup" ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"
            }`}
          >
            {t("auth.signupTab")}
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "signup" && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("auth.firstName")}
                    className="pl-9"
                    value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    maxLength={60}
                  />
                </div>
                <Input
                  placeholder={t("auth.lastName")}
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  maxLength={60}
                />
              </div>
              <div className="relative">
                <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("auth.country")}
                  className="pl-9"
                  value={form.pays}
                  onChange={(e) => setForm({ ...form, pays: e.target.value })}
                  maxLength={60}
                />
              </div>
              <div className="rounded-2xl border border-border/60 p-3 bg-muted/30">
                <p className="text-xs font-semibold mb-2">{t("auth.avatarOptional")}</p>
                <div className="flex items-center gap-3">
                  {avatarDataUrl ? (
                    <img src={avatarDataUrl} alt={t("auth.avatarPreviewAlt")} className="w-12 h-12 rounded-full object-cover border border-border" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                      ?
                    </div>
                  )}
                  <Input type="file" accept="image/*" onChange={onAvatarChange} className="h-10" />
                </div>
              </div>
            </>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder={t("auth.email")}
              className="pl-9"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
              maxLength={255}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder={t("auth.password")}
              className="pl-9"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              maxLength={72}
            />
          </div>

          <Button type="submit" disabled={busy} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full h-11">
            {busy ? "..." : mode === "signup" ? t("auth.createAccount") : t("auth.signIn")}
          </Button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("common.or")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onGoogle}
          disabled={busy}
          className="w-full rounded-full h-11 font-semibold gap-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
            <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.95l3.66-2.84Z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
          </svg>
          {t("auth.continueWithGoogle")}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-5">
          <Link to="/" className="hover:text-foreground">{t("auth.backHome")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
