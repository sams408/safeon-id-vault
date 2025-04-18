
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
import { CategoryDeleteDialog } from "@/components/categories/CategoryDeleteDialog";
import { CategoryEditDialog } from "@/components/categories/CategoryEditDialog";
import { useLanguage } from "@/i18n/language-provider";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
      toast({
        title: t("categories.errorTitle"),
        description: t("categories.errorLoadingCategories"),
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

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setEditDialogOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCategory = async () => {
    if (!selectedCategory) return;
    await deleteCategory(selectedCategory.id);
    await loadCategories();
  };

  const columns: Column<Category>[] = [
    {
      header: t("categories.name"),
      accessorKey: "name",
      searchable: true,
    },
    {
      header: t("categories.productCount"),
      accessorKey: "product_count",
    },
    {
      header: t("categories.actions"),
      accessorKey: "id",
      cell: (item) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
              >
                <MoreHorizontal size={16} />
                <span className="sr-only">{t("categories.actions")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              side="right"
              className="w-[160px] bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 z-[100]" 
            >
              <DropdownMenuLabel>{t("categories.actions")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer flex items-center text-sm px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleEditCategory(item)}
              >
                <Edit size={16} className="mr-2 text-gray-500" /> {t("categories.edit")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer flex items-center text-sm px-2 py-1.5 text-red-600 hover:text-red-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleDeleteCategory(item)}
              >
                <Trash size={16} className="mr-2" /> {t("categories.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={categories}
        title={t("categories.title")}
        searchPlaceholder={t("categories.searchPlaceholder")}
        onAddNew={handleAddCategory}
        isLoading={isLoading}
        icon={LayoutList}
        addButtonIcon={<Plus className="mr-2" size={16} />}
        addButtonText={t("categories.addCategory")}
      />
      
      <CategoryDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCategoryCreated={loadCategories}
      />

      {selectedCategory && (
        <>
          <CategoryEditDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            category={selectedCategory}
            onCategoryUpdated={loadCategories}
          />

          <CategoryDeleteDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            categoryName={selectedCategory.name}
            onConfirm={confirmDeleteCategory}
          />
        </>
      )}
    </div>
  );
};

export default Categories;
