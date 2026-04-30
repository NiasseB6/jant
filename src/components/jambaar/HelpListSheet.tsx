import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Check, Clock, Tag } from "lucide-react";
import { useJambaar } from "@/stores/jambaar";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const HelpListSheet = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { demandes, helpedIds, helpRequest } = useJambaar();

  const onHelp = (id: string, auteur: string) => {
    helpRequest(id);
    toast.success(t("jambaar.helpList.toasts.helping", { name: auteur, points: 50 }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full h-14 border-2 border-secondary text-foreground font-bold text-base rounded-2xl bg-gradient-card hover:bg-secondary/10">
          <Heart className="mr-2 h-5 w-5 text-primary" />
          {t("jambaar.helpList.cta")}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl">{t("jambaar.helpList.title")}</SheetTitle>
          <p className="text-xs text-muted-foreground">{t("jambaar.helpList.count", { count: demandes.length })}</p>
        </SheetHeader>
        <div className="space-y-3 mt-4 pb-6">
          {demandes.map((d) => {
            const helped = helpedIds.includes(d.id);
            return (
              <article key={d.id} className="bg-gradient-card rounded-2xl p-4 shadow-soft border border-border/50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{d.auteur}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1"><Tag className="h-3 w-3 text-primary" />{d.categorie}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{d.createdAt}</span>
                    </div>
                  </div>
                  {d.distanceKm > 0 && (
                    <span className="text-[10px] font-bold bg-secondary/20 text-foreground px-2 py-1 rounded-full whitespace-nowrap">
                      {d.distanceKm} km
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/80 mb-2">{d.description}</p>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />{d.localisation}
                </div>
                <Button
                  onClick={() => onHelp(d.id, d.auteur)}
                  disabled={helped}
                  className={
                    helped
                      ? "w-full h-10 rounded-xl bg-deep-green text-primary-foreground font-bold"
                      : "w-full h-10 rounded-xl bg-gradient-hero text-primary-foreground font-bold shadow-warm"
                  }
                >
                  {helped ? (
                    <>
                      <Check className="mr-1.5 h-4 w-4" />
                      {t("jambaar.helpList.helping")}
                    </>
                  ) : (
                    t("jambaar.helpList.help")
                  )}
                </Button>
              </article>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
