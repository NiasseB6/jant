import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const LanguageSwitcher = ({ className }: Props) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language.startsWith("fr") ? "fr" : "en";

  return (
    <div className={cn("inline-flex", className)}>
      <div className="flex items-center gap-1 rounded-full border border-white/35 bg-black/30 backdrop-blur-md p-1 text-white shadow-soft">
        <Languages className="h-3.5 w-3.5 ml-1" />
        <button
          type="button"
          aria-label={t("common.french")}
          onClick={() => i18n.changeLanguage("fr")}
          className={`px-2 py-1 text-[10px] font-bold rounded-full transition ${lang === "fr" ? "bg-white text-black" : "text-white/85 hover:text-white"}`}
        >
          FR
        </button>
        <button
          type="button"
          aria-label={t("common.english")}
          onClick={() => i18n.changeLanguage("en")}
          className={`px-2 py-1 text-[10px] font-bold rounded-full transition ${lang === "en" ? "bg-white text-black" : "text-white/85 hover:text-white"}`}
        >
          EN
        </button>
      </div>
    </div>
  );
};
