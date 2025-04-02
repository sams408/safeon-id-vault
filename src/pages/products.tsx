
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/data-table";
import { Edit, Trash, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { fetchProducts, Product } from "@/services/products";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [toast]);

  const handleAddProduct = () => {
    console.log("Add new product");
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
        title="Productos"
        searchPlaceholder="Buscar productos..."
        onAddNew={handleAddProduct}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Products;
