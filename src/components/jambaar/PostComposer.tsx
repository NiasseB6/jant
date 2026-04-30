import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PenSquare, HandHeart, Sparkles, Megaphone } from "lucide-react";
import { useFeed } from "@/stores/feed";
import { useJambaar } from "@/stores/jambaar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type Tab = "aide" | "remerciement" | "communaute";

const tabs: { id: Tab; label: string; icon: typeof HandHeart; color: string }[] = [
  { id: "aide", label: "jambaar.tabs.helped", icon: HandHeart, color: "bg-deep-green/15 text-deep-green" },
  { id: "remerciement", label: "jambaar.tabs.thanks", icon: Sparkles, color: "bg-secondary/30 text-secondary-foreground" },
  { id: "communaute", label: "jambaar.tabs.share", icon: Megaphone, color: "bg-primary/15 text-primary" },
];

export const PostComposer = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("aide");
  const [texte, setTexte] = useState("");
  const [nom, setNom] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const addPost = useFeed((s) => s.addPost);
  const addPoints = useJambaar((s) => s.addPoints);
  const recordAidPost = useJambaar((s) => s.recordAidPost);

  const handleFile = (f: File | null) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(f);
  };

  const reset = () => { setTexte(""); setNom(""); setImageUrl(undefined); setTab("aide"); };

  const onSubmit = () => {
    if (!texte.trim()) {
      toast.error(t("jambaar.composer.writeBeforePublish"));
      return;
    }
    addPost({
      type: tab,
      texte: texte.trim(),
      image: imageUrl,
      beneficiaire: tab === "aide" ? (nom.trim() || undefined) : undefined,
      remercieA: tab === "remerciement" ? (nom.trim() || undefined) : undefined,
    });
    if (tab === "aide") {
      recordAidPost();
    }
    if (tab === "communaute") addPoints(10);
    toast.success(`${t("jambaar.sharePost")} 🌟`);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <button className="w-full bg-card rounded-2xl shadow-soft border border-border/50 p-3 flex items-center gap-3 hover:shadow-warm transition-shadow">
          <div className="w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center text-sm font-black text-primary-foreground shrink-0">
            S
          </div>
          <span className="flex-1 text-left text-sm text-muted-foreground">
            {t("jambaar.sharePlaceholder")}
          </span>
          <PenSquare className="h-4 w-4 text-primary" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("jambaar.newPost")}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2">
          {tabs.map((tabItem) => {
            const Icon = tabItem.icon;
            const active = tab === tabItem.id;
            return (
              <button
                key={tabItem.id}
                onClick={() => setTab(tabItem.id)}
                className={cn(
                  "rounded-xl py-2 px-2 text-xs font-bold flex flex-col items-center gap-1 border transition-all",
                  active ? "border-primary shadow-warm " + tabItem.color : "border-border/50 bg-muted/30 text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {t(tabItem.label)}
              </button>
            );
          })}
        </div>

        {(tab === "aide" || tab === "remerciement") && (
          <Input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder={tab === "aide" ? t("jambaar.composer.helpedWhoOptional") : t("jambaar.composer.thanksWho")}
          />
        )}

        <Textarea
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder={
            tab === "aide"
              ? t("jambaar.composer.helpStoryPlaceholder")
              : tab === "remerciement"
                ? t("jambaar.composer.thanksPlaceholder")
                : t("jambaar.composer.communityPlaceholder")
          }
          rows={4}
        />

        <label className="text-xs font-semibold text-muted-foreground cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          <span className="inline-block px-3 py-2 rounded-lg bg-muted hover:bg-muted/70 transition-colors">
            📷 {imageUrl ? t("jambaar.changePhoto") : t("jambaar.addPhoto")}
          </span>
        </label>
        {imageUrl && (
          <img src={imageUrl} alt={t("jambaar.composer.imagePreviewAlt")} className="w-full h-40 object-cover rounded-xl" />
        )}

        <DialogFooter>
          <Button onClick={onSubmit} className="w-full bg-gradient-hero text-primary-foreground">
            {t("jambaar.publish")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
