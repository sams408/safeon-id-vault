
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchProducts, deleteProduct } from "@/services/products";
import { ProductsTable } from "@/components/products/ProductsTable";
import { ProductDialog } from "@/components/products/ProductDialog";
import { DeleteProductDialog } from "@/components/products/DeleteProductDialog";
import { Product } from "@/services/products";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { toast } = useToast();

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los ítems",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = () => {
    setDialogOpen(true);
  };

  const handleProductCreated = async () => {
    await loadProducts();
    setDialogOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedProductId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProductId) return;

    try {
      await deleteProduct(selectedProductId);
      toast({
        title: "Éxito",
        description: "Ítem eliminado correctamente",
      });
      await loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el ítem",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedProductId(null);
    }
  };

  return (
    <div className="space-y-6">
      <ProductsTable 
        products={products}
        isLoading={isLoading}
        onAddNew={handleAddProduct}
        onDelete={handleDeleteClick}
      />
      
      <ProductDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onProductCreated={handleProductCreated}
        onCancel={() => setDialogOpen(false)}
      />

      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Products;
