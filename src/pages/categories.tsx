
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
import { useLanguage } from "@/i18n/language-provider";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const handleEditCategory = (category: Category, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Edit clicked for:", category.name);
    // Implementation for editing will go here
  };

  const handleDeleteCategory = (category: Category, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="focus:ring-0 focus:ring-offset-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] bg-background">
              <DropdownMenuLabel>{t("categories.actions")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={(e) => handleEditCategory(item, e)}
                className="cursor-pointer"
              >
                <Edit size={16} className="mr-2" /> {t("categories.edit")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive cursor-pointer"
                onClick={(e) => handleDeleteCategory(item, e)}
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
        <CategoryDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          categoryName={selectedCategory.name}
          onConfirm={confirmDeleteCategory}
        />
      )}
    </div>
  );
};

export default Categories;
