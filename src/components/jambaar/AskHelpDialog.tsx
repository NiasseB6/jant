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

const schema = z.object({
  categorie: z.string().min(1, "Choisissez une catégorie").max(50),
  description: z.string().trim().min(5, "Décrivez en quelques mots").max(300, "Max 300 caractères"),
  localisation: z.string().trim().min(2, "Lieu requis").max(80, "Max 80 caractères"),
});

export const AskHelpDialog = () => {
  const [open, setOpen] = useState(false);
  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [localisation, setLocalisation] = useState("");
  const addDemande = useJambaar((s) => s.addDemande);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ categorie, description, localisation });
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    addDemande({ categorie, description: description.trim(), localisation: localisation.trim() });
    toast.success("Demande envoyée — la communauté est prévenue 🙌");
    setCategorie(""); setDescription(""); setLocalisation("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-14 bg-gradient-hero text-primary-foreground font-bold text-base shadow-warm hover:opacity-95 rounded-2xl">
          <HandHelping className="mr-2 h-5 w-5" />
          Demander de l'aide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>Nouvelle demande</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Catégorie</Label>
            <Select value={categorie} onValueChange={setCategorie}>
              <SelectTrigger><SelectValue placeholder="Choisir..." /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              maxLength={300}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Expliquez brièvement ce dont vous avez besoin..."
              className="resize-none"
              rows={3}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Localisation</Label>
            <Input
              maxLength={80}
              value={localisation}
              onChange={(e) => setLocalisation(e.target.value)}
              placeholder="Ex : Stade L. Senghor"
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-hero text-primary-foreground rounded-xl h-12 font-bold">
            Envoyer la demande
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
