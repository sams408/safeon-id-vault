
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteUser } from "@/services/users";

interface UserDeleteDialogProps {
  userId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUserDeleted: () => Promise<void>;
}

export const UserDeleteDialog = ({
  userId,
  isOpen,
  onOpenChange,
  onUserDeleted
}: UserDeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setIsDeleting(false);
    }
  }, [isOpen]);

  const handleDeleteConfirm = async () => {
    if (!userId) return;
    
    try {
      setIsDeleting(true);
      await deleteUser(userId);
      toast({
        title: "Éxito",
        description: "Usuario eliminado correctamente",
      });
      await onUserDeleted();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario",
        variant: "destructive",
      });
    } finally {
      onOpenChange(false);
      // Delay resetting the deleting state to avoid UI jank during dialog close animation
      setTimeout(() => {
        setIsDeleting(false);
      }, 300);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas eliminar este usuario? 
          Esta acción no se puede deshacer.
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-end gap-3 pt-4">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isDeleting}
        >
          Cancelar
        </Button>
        <Button
          variant="destructive"
          onClick={handleDeleteConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? "Eliminando..." : "Eliminar"}
        </Button>
      </div>
    </DialogContent>
  );
};
