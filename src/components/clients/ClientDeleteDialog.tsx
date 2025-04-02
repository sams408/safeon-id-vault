
import { Client } from "@/services/clients";
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
  if (!client) return null;
  
  return (
    <AlertDialog 
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el cliente
            &quot;{client.name}&quot; y todos sus datos asociados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
