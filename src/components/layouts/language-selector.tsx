
import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/i18n/language-provider";
import { LanguageCode } from "@/i18n";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  
  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe size={20} />
          <span className="sr-only">{t("common.language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("en")}
          className={`cursor-pointer ${language === "en" ? "bg-accent text-accent-foreground" : ""}`}
        >
          {t("common.english")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("es")}
          className={`cursor-pointer ${language === "es" ? "bg-accent text-accent-foreground" : ""}`}
        >
          {t("common.spanish")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
