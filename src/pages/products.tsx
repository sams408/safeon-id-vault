
import { useState } from "react";
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

interface Product {
  id: string;
  name: string;
  description: string;
  client_name: string;
  category: string;
  created_by: string;
  created_at: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Producto A",
    description: "Descripción del producto A",
    client_name: "Empresa ABC",
    category: "Hardware",
    created_by: "Admin",
    created_at: "2023-06-10",
  },
  {
    id: "2",
    name: "Producto B",
    description: "Descripción del producto B",
    client_name: "Corporación XYZ",
    category: "Software",
    created_by: "Admin",
    created_at: "2023-07-15",
  },
  {
    id: "3",
    name: "Producto C",
    description: "Descripción del producto C",
    client_name: "Industrias 123",
    category: "Servicios",
    created_by: "Admin",
    created_at: "2023-04-05",
  },
  {
    id: "4",
    name: "Producto D",
    description: "Descripción del producto D",
    client_name: "Grupo Tecnológico",
    category: "Hardware",
    created_by: "Admin",
    created_at: "2023-08-20",
  },
  {
    id: "5",
    name: "Producto E",
    description: "Descripción del producto E",
    client_name: "Servicios Integrales",
    category: "Software",
    created_by: "Admin",
    created_at: "2023-05-12",
  },
];

const Products = () => {
  const [products] = useState<Product[]>(mockProducts);

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
      />
    </div>
  );
};

export default Products;
