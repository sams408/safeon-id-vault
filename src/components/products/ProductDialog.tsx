
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductForm } from "@/components/products/ProductForm";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductCreated: () => Promise<void>;
  onCancel: () => void;
}

export const ProductDialog = ({ 
  open, 
  onOpenChange, 
  onProductCreated, 
  onCancel 
}: ProductDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <ProductForm 
          onProductCreated={onProductCreated} 
          onCancel={onCancel} 
        />
      </DialogContent>
    </Dialog>
  );
};
