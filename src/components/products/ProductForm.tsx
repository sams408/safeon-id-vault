
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createProduct } from "@/services/products";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { ClientSelect } from "@/components/users/ClientSelect";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProductFormData = {
  name: string;
  description: string;
  client_id: string;
  category_id: string;
  category: string;
  created_by: string;
};

type ProductFormProps = {
  onProductCreated: () => Promise<void>;
  onCancel: () => void;
};

export const ProductForm = ({ onProductCreated, onCancel }: ProductFormProps) => {
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    name: "",
    description: "",
    client_id: "",
    category_id: "default",
    category: "Default", 
    created_by: "admin", // Default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleClientChange = (value: string) => {
    setNewProduct(prev => ({ ...prev, client_id: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!newProduct.name || !newProduct.client_id) {
      toast({
        title: "Error",
        description: "Por favor complete los campos requeridos",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log("Sending product data:", newProduct);
      
      await createProduct(newProduct);
      
      // Show success notification
      toast({
        title: "Éxito",
        description: "Ítem creado correctamente",
      });
      
      // Reload the product list to show the new product
      await onProductCreated();
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "No se pudo crear el ítem",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Crear nuevo ítem</DialogTitle>
        <DialogDescription>
          Complete el formulario para crear un nuevo ítem
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <ClientSelect 
            value={newProduct.client_id} 
            onValueChange={handleClientChange}
          />
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="col-span-3"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="col-span-3"
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Guardar
              </span>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
