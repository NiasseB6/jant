import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHelping } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { CATEGORIES } from "@/data/jambaar";
import { useJambaar } from "@/stores/jambaar";
import { useTranslation } from "react-i18next";

export const AskHelpDialog = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [localisation, setLocalisation] = useState("");
  const addDemande = useJambaar((s) => s.addDemande);

  const schema = z.object({
    categorie: z.string().min(1, t("jambaar.askHelp.validation.chooseCategory")).max(50),
    description: z.string().trim().min(5, t("jambaar.askHelp.validation.describe")).max(300, t("jambaar.askHelp.validation.max300")),
    localisation: z.string().trim().min(2, t("jambaar.askHelp.validation.locationRequired")).max(80, t("jambaar.askHelp.validation.max80")),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ categorie, description, localisation });
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    addDemande({ categorie, description: description.trim(), localisation: localisation.trim() });
    toast.success(t("jambaar.askHelp.toasts.sent"));
    setCategorie(""); setDescription(""); setLocalisation("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-14 bg-gradient-hero text-primary-foreground font-bold text-base shadow-warm hover:opacity-95 rounded-2xl">
          <HandHelping className="mr-2 h-5 w-5" />
          {t("jambaar.askHelp.cta")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>{t("jambaar.askHelp.title")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>{t("jambaar.askHelp.categoryLabel")}</Label>
            <Select value={categorie} onValueChange={setCategorie}>
              <SelectTrigger><SelectValue placeholder={t("common.choose")} /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t(`jambaar.categories.${c}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{t("jambaar.askHelp.descriptionLabel")}</Label>
            <Textarea
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("jambaar.askHelp.descriptionPlaceholder")}
              className="resize-none"
              rows={3}
            />
          </div>
          <div className="space-y-1.5">
            <Label>{t("jambaar.askHelp.locationLabel")}</Label>
            <Input
              maxLength={80}
              value={localisation}
              onChange={(e) => setLocalisation(e.target.value)}
              placeholder={t("jambaar.askHelp.locationPlaceholder")}
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-hero text-primary-foreground rounded-xl h-12 font-bold">
            {t("jambaar.askHelp.submit")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
