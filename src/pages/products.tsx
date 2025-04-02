
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/data-table";
import { Edit, Trash, Eye, MoreHorizontal, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { fetchProducts, Product, createProduct } from "@/services/products";
import { 
  Dialog,
  DialogTrigger 
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/products/ProductForm";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
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
  }, [toast]);

  const handleAddProduct = () => {
    setDialogOpen(true);
  };

  const handleProductCreated = async () => {
    await loadProducts();
    setDialogOpen(false);
  };

  const columns: Column<Product>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Descripción",
      accessorKey: "description",
      cell: (product) => (
        <div className="max-w-xs truncate">{product.description}</div>
      ),
    },
    {
      header: "Cliente",
      accessorKey: "client_name",
    },
    {
      header: "Categoría",
      accessorKey: "category",
      cell: (product) => (
        <Badge variant="outline">{product.category}</Badge>
      ),
    },
    {
      header: "Creado por",
      accessorKey: "created_by",
    },
    {
      header: "Creado el",
      accessorKey: "created_at",
      cell: (product) => new Date(product.created_at).toLocaleDateString(),
    },
    {
      header: "Acciones",
      accessorKey: "id",
      cell: (product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye size={16} className="mr-2" /> Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit size={16} className="mr-2" /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash size={16} className="mr-2" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={products}
        title="Ítems"
        searchPlaceholder="Buscar ítems..."
        onAddNew={handleAddProduct}
        isLoading={isLoading}
        icon={Package}
      />
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <ProductForm 
          onProductCreated={handleProductCreated} 
          onCancel={() => setDialogOpen(false)} 
        />
      </Dialog>
    </div>
  );
};

export default Products;
