
import { Client } from "@/services/clients";
import { useLanguage } from "@/i18n/language-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ClientDeleteDialogProps {
  client: Client | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
}

export function ClientDeleteDialog({ 
  client, 
  open, 
  onOpenChange, 
  onConfirm 
}: ClientDeleteDialogProps) {
  const { t } = useLanguage();
  const [isDeleting, setIsDeleting] = useState(false);
  
  if (!client) return null;
  
  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm();
    } finally {
      setIsDeleting(false);
      onOpenChange(false);
    }
  };
  
  return (
    <AlertDialog 
      open={open}
      onOpenChange={(newOpen) => {
        if (!isDeleting) {
          onOpenChange(newOpen);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("clients.deleteConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("clients.deleteConfirmDescription", { name: client.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t("common.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? t("common.deleting") : t("common.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
