
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchProducts, fetchProductById, deleteProduct } from "@/services/products";
import { ProductsTable } from "@/components/products/ProductsTable";
import { ProductDialog } from "@/components/products/ProductDialog";
import { DeleteProductDialog } from "@/components/products/DeleteProductDialog";
import { ProductDetailsDialog } from "@/components/products/ProductDetailsDialog";
import { Product } from "@/services/products";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
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
    setIsEditMode(false);
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  const handleProductCreated = async () => {
    await loadProducts();
    setDialogOpen(false);
  };

  const handleViewProduct = async (id: string) => {
    try {
      const product = await fetchProductById(id);
      if (product) {
        setSelectedProduct(product);
        setDetailsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los detalles del ítem",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = async (id: string) => {
    try {
      console.log("Editing product with ID:", id);
      const product = await fetchProductById(id);
      if (product) {
        setSelectedProduct(product);
        setIsEditMode(true);
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Error fetching product for edit:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar el ítem para editar",
        variant: "destructive",
      });
    }
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
        onEdit={handleEditProduct}
        onView={handleViewProduct}
      />
      
      <ProductDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onProductCreated={handleProductCreated}
        onCancel={() => setDialogOpen(false)}
        product={selectedProduct}
        isEditMode={isEditMode}
      />

      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />

      <ProductDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
