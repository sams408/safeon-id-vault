
import { Product } from "@/services/products";
import { DataTable, Column } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash, Eye, MoreHorizontal, Package } from "lucide-react";

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onAddNew: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

export const ProductsTable = ({ 
  products, 
  isLoading, 
  onAddNew, 
  onDelete,
  onEdit,
  onView
}: ProductsTableProps) => {
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
            <DropdownMenuItem onClick={() => onView(product.id)}>
              <Eye size={16} className="mr-2" /> Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(product.id)}>
              <Edit size={16} className="mr-2" /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => onDelete(product.id)}
            >
              <Trash size={16} className="mr-2" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={products}
      title="Ítems"
      searchPlaceholder="Buscar ítems..."
      onAddNew={onAddNew}
      isLoading={isLoading}
      icon={Package}
    />
  );
};
