
import { Client } from "@/services/clients";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ClientViewDialogProps {
  client: Client | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientViewDialog({ client, open, onOpenChange }: ClientViewDialogProps) {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles del Cliente</DialogTitle>
          <DialogDescription>
            Información detallada del cliente
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Nombre:</div>
            <div className="col-span-3">{client.name}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Email:</div>
            <div className="col-span-3">{client.email}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Teléfono:</div>
            <div className="col-span-3">{client.phone}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Estado:</div>
            <div className="col-span-3">
              {client.status === "active" ? "Activo" : "Inactivo"}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Fecha de creación:</div>
            <div className="col-span-3">
              {new Date(client.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
