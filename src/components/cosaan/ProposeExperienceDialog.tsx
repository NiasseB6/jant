import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { CATEGORIES_EXP, CategorieExp } from "@/data/experiences";
import { useExperiences } from "@/stores/experiences";
import { useTranslation } from "react-i18next";

export const ProposeExperienceDialog = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [titre, setTitre] = useState("");
  const [hote, setHote] = useState("");
  const [categorie, setCategorie] = useState<string>("");
  const [description, setDescription] = useState("");
  const [dureeMin, setDureeMin] = useState("60");
  const [prix, setPrix] = useState("10000");
  const [lieu, setLieu] = useState("");
  const proposer = useExperiences((s) => s.proposer);

  const schema = z.object({
    titre: z.string().trim().min(5, t("cosaan.propose.validation.titleShort")).max(80),
    hote: z.string().trim().min(2, t("cosaan.propose.validation.hostName")).max(60),
    categorie: z.string().min(1, t("cosaan.propose.validation.categoryRequired")),
    description: z.string().trim().min(20, t("cosaan.propose.validation.descriptionMin")).max(500),
    dureeMin: z.coerce.number().int().min(15, t("cosaan.propose.validation.min15")).max(600),
    prix: z.coerce.number().int().min(0).max(500000),
    lieu: z.string().trim().min(2, t("cosaan.propose.validation.locationRequired")).max(80),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ titre, hote, categorie, description, dureeMin, prix, lieu });
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    proposer({
      titre: titre.trim(),
      hote: hote.trim(),
      categorie: categorie as CategorieExp,
      description: description.trim(),
      dureeMin: Number(dureeMin),
      prix: Number(prix),
      lieu: lieu.trim(),
    });
    toast.success(t("cosaan.propose.toasts.thanks"));
    setTitre(""); setHote(""); setCategorie(""); setDescription("");
    setDureeMin("60"); setPrix("10000"); setLieu("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-14 bg-gradient-hero text-primary-foreground font-bold rounded-2xl shadow-warm">
          <Sparkles className="mr-2 h-5 w-5" />
          {t("cosaan.propose.cta")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cosaan.propose.title")}</DialogTitle>
          <p className="text-xs text-muted-foreground">{t("cosaan.propose.subtitle")}</p>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1.5">
            <Label>{t("cosaan.propose.labels.title")}</Label>
            <Input maxLength={80} value={titre} onChange={(e) => setTitre(e.target.value)} placeholder={t("cosaan.propose.placeholders.title")} />
          </div>
          <div className="space-y-1.5">
            <Label>{t("cosaan.propose.labels.host")}</Label>
            <Input maxLength={60} value={hote} onChange={(e) => setHote(e.target.value)} placeholder={t("cosaan.propose.placeholders.host")} />
          </div>
          <div className="space-y-1.5">
            <Label>{t("cosaan.propose.labels.category")}</Label>
            <Select value={categorie} onValueChange={setCategorie}>
              <SelectTrigger><SelectValue placeholder={t("common.choose")} /></SelectTrigger>
              <SelectContent>
                {CATEGORIES_EXP.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t(`cosaan.experienceCategories.${c}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{t("cosaan.propose.labels.description")}</Label>
            <Textarea
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
              placeholder={t("cosaan.propose.placeholders.description")}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>{t("cosaan.propose.labels.durationMin")}</Label>
              <Input type="number" min={15} max={600} value={dureeMin} onChange={(e) => setDureeMin(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>{t("cosaan.propose.labels.priceFcfa")}</Label>
              <Input type="number" min={0} max={500000} step={500} value={prix} onChange={(e) => setPrix(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>{t("cosaan.propose.labels.location")}</Label>
            <Input maxLength={80} value={lieu} onChange={(e) => setLieu(e.target.value)} placeholder={t("cosaan.propose.placeholders.location")} />
          </div>
          <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-hero text-primary-foreground font-bold mt-2">
            {t("cosaan.propose.submit")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
