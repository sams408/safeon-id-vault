
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/data-table";
import { Edit, Trash, MoreHorizontal, Plus, LayoutList } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { fetchCategories, Category, deleteCategory } from "@/services/categories";
import { CategoryDialog } from "@/components/categories/CategoryDialog";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las categorías",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = () => {
    setDialogOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      toast({
        title: "Categoría eliminada",
        description: "La categoría se ha eliminado correctamente",
      });
      loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la categoría",
        variant: "destructive",
      });
    }
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
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => handleDeleteCategory(category.id)}
            >
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
        isLoading={isLoading}
        icon={LayoutList}
        addButtonIcon={<Plus className="mr-2" size={16} />}
        addButtonText="Nueva categoría"
      />
      
      <CategoryDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCategoryCreated={loadCategories}
      />
    </div>
  );
};

export default Categories;
