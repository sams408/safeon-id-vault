
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProductForm } from "@/components/products/ProductForm";
import { Product } from "@/services/products";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductCreated: () => Promise<void>;
  onCancel: () => void;
  product?: Product | null;
  isEditMode?: boolean;
}

export const ProductDialog = ({ 
  open, 
  onOpenChange, 
  onProductCreated, 
  onCancel,
  product = null,
  isEditMode = false
}: ProductDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar ítem' : 'Nuevo ítem'}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? 'Actualiza la información del ítem seleccionado.' 
              : 'Completa la información para crear un nuevo ítem.'}
          </DialogDescription>
        </DialogHeader>
        <ProductForm 
          onProductCreated={onProductCreated} 
          onCancel={onCancel}
          initialProduct={product}
          isEditMode={isEditMode}
        />
      </DialogContent>
    </Dialog>
  );
};
