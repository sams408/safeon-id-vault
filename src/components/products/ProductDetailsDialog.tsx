
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/services/products";
import { Badge } from "@/components/ui/badge";

interface ProductDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export const ProductDetailsDialog = ({
  open,
  onOpenChange,
  product,
}: ProductDetailsDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalles del ítem</DialogTitle>
          <DialogDescription>
            Información detallada del ítem seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Nombre:</div>
            <div className="col-span-3">{product.name}</div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Descripción:</div>
            <div className="col-span-3">{product.description}</div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Cliente:</div>
            <div className="col-span-3">{product.client_name}</div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Categoría:</div>
            <div className="col-span-3">
              <Badge variant="outline">{product.category}</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Creado por:</div>
            <div className="col-span-3">{product.created_by}</div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="font-medium text-right">Fecha de creación:</div>
            <div className="col-span-3">
              {new Date(product.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
