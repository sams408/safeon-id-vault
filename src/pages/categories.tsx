
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/data-table";
import { Edit, Trash, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Category {
  id: string;
  name: string;
  product_count: number;
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Hardware",
    product_count: 24,
  },
  {
    id: "2",
    name: "Software",
    product_count: 36,
  },
  {
    id: "3",
    name: "Servicios",
    product_count: 18,
  },
  {
    id: "4",
    name: "Consultoría",
    product_count: 12,
  },
  {
    id: "5",
    name: "Mantenimiento",
    product_count: 8,
  },
];

const Categories = () => {
  const [categories] = useState<Category[]>(mockCategories);

  const handleAddCategory = () => {
    console.log("Add new category");
  };

  const columns: Column<Category>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Cantidad de productos",
      accessorKey: "product_count",
    },
    {
      header: "Acciones",
      accessorKey: "id",
      cell: (category) => (
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
        data={categories}
        title="Categorías"
        searchPlaceholder="Buscar categorías..."
        onAddNew={handleAddCategory}
      />
    </div>
  );
};

export default Categories;
