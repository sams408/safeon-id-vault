
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createCategory } from "@/services/categories";
import { useLanguage } from "@/i18n/language-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryCreated: () => Promise<void>;
}

export function CategoryDialog({
  open,
  onOpenChange,
  onCategoryCreated,
}: CategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: t("categories.errorTitle"),
        description: t("categories.nameRequired"),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await createCategory({ name });
      
      toast({
        title: t("categories.createdSuccessfully"),
        description: t("categories.categoryCreatedDescription"),
      });
      
      setName("");
      onOpenChange(false);
      await onCategoryCreated();
    } catch (error) {
      console.error("Error creating category:", error);
      toast({
        title: t("categories.errorTitle"),
        description: t("categories.errorCreatingCategory"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("categories.addCategory")}</DialogTitle>
          <DialogDescription>
            {t("categories.addCategoryDescription")}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("categories.name")}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("categories.namePlaceholder")}
            />
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("categories.saving") : t("categories.create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
