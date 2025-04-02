
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
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
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="bg-card p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Confirmar eliminación</h2>
          <p className="mb-6">
            ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end gap-3">
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
        </div>
      </div>
    </Dialog>
  );
};
