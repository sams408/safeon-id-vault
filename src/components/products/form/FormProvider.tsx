
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { createProduct, updateProduct, Product } from "@/services/products";
import { ProductFormData, defaultProductData } from "./types";
import { fetchCategories } from "@/services/categories";

interface FormProviderProps {
  children: (props: {
    newProduct: ProductFormData;
    isSubmitting: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleClientChange: (value: string) => void;
    handleCategoryChange: (categoryId: string) => Promise<void>;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
  }) => React.ReactNode;
  onProductCreated: () => Promise<void>;
  onCancel: () => void;
  initialProduct?: Product | null;
  isEditMode?: boolean;
}

export const FormProvider = ({ 
  children, 
  onProductCreated, 
  onCancel,
  initialProduct = null,
  isEditMode = false
}: FormProviderProps) => {
  const { toast } = useToast();
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
    <>
      {children({
        newProduct,
        isSubmitting,
        handleInputChange,
        handleClientChange,
        handleCategoryChange,
        handleSubmit,
      })}
    </>
  );
};
