
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { createProduct, updateProduct, Product } from "@/services/products";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Edit } from "lucide-react";
import { ClientSelect } from "@/components/users/ClientSelect";
import { CategorySelect } from "@/components/categories/CategorySelect";
import { DialogFooter } from "@/components/ui/dialog";
import { fetchCategories } from "@/services/categories";

type ProductFormData = {
  name: string;
  description: string;
  client_id: string;
  category_id: string;
  category: string;
  created_by: string;
};

interface ProductFormProps {
  onProductCreated: () => Promise<void>;
  onCancel: () => void;
  initialProduct?: Product | null;
  isEditMode?: boolean;
}

export const ProductForm = ({ 
  onProductCreated, 
  onCancel,
  initialProduct = null,
  isEditMode = false
}: ProductFormProps) => {
  const { toast } = useToast();
  const defaultProductData: ProductFormData = {
    name: "",
    description: "",
    client_id: "",
    category_id: "default",
    category: "Default",
    created_by: "admin",
  };

  const [newProduct, setNewProduct] = useState<ProductFormData>(defaultProductData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data with product if in edit mode
  useEffect(() => {
    if (isEditMode && initialProduct) {
      setNewProduct({
        name: initialProduct.name,
        description: initialProduct.description || "",
        client_id: initialProduct.client_id,
        category_id: initialProduct.category_id || "default",
        category: initialProduct.category || "Default",
        created_by: initialProduct.created_by,
      });
    } else {
      setNewProduct(defaultProductData);
    }
  }, [isEditMode, initialProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleClientChange = (value: string) => {
    setNewProduct(prev => ({ ...prev, client_id: value }));
  };

  const handleCategoryChange = async (categoryId: string) => {
    try {
      if (categoryId === "default") {
        setNewProduct(prev => ({ 
          ...prev, 
          category_id: categoryId,
          category: "Default" 
        }));
        return;
      }

      // Fetch categories to get the category name
      const categories = await fetchCategories();
      const selectedCategory = categories.find(cat => cat.id === categoryId);
      
      setNewProduct(prev => ({ 
        ...prev, 
        category_id: categoryId,
        category: selectedCategory ? selectedCategory.name : "Default" 
      }));
    } catch (error) {
      console.error("Error handling category change:", error);
      setNewProduct(prev => ({ 
        ...prev, 
        category_id: categoryId,
        category: "Unknown" 
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.client_id) {
      toast({
        title: "Error",
        description: "Por favor, complete todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode && initialProduct) {
        // Fixed: Pass the id as the first parameter for updateProduct
        await updateProduct(initialProduct.id, newProduct);
        toast({
          title: "Éxito",
          description: "Ítem actualizado correctamente",
        });
      } else {
        await createProduct(newProduct);
        toast({
          title: "Éxito",
          description: "Ítem creado correctamente",
        });
      }
      
      await onProductCreated();
      setNewProduct(defaultProductData);
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: isEditMode 
          ? "No se pudo actualizar el ítem" 
          : "No se pudo crear el ítem",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
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
        
        <ClientSelect 
          value={newProduct.client_id} 
          onValueChange={handleClientChange}
        />
        
        <CategorySelect 
          value={newProduct.category_id}
          onValueChange={handleCategoryChange}
        />
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="created_by" className="text-right">
            Creado por
          </Label>
          <Input
            id="created_by"
            name="created_by"
            value={newProduct.created_by}
            onChange={handleInputChange}
            className="col-span-3"
            required
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isEditMode ? (
            <>
              <Edit className="mr-2 h-4 w-4" /> Actualizar
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Guardar
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};
