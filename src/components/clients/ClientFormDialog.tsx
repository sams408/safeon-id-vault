
import { Client } from "@/services/clients";
import { ClientForm } from "@/components/clients/ClientForm";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

interface ClientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientCreated: () => Promise<void>;
  initialClient: Client | null;
  isEditMode: boolean;
}

export function ClientFormDialog({ 
  open, 
  onOpenChange, 
  onClientCreated, 
  initialClient, 
  isEditMode 
}: ClientFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <ClientForm 
          onClientCreated={onClientCreated}
          onCancel={() => onOpenChange(false)}
          initialClient={isEditMode ? initialClient : null}
          isEditMode={isEditMode}
        />
      </DialogContent>
    </Dialog>
  );
}
