
import { useState, useEffect } from "react";
import { fetchCategories, Category } from "@/services/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  label?: boolean;
}

export const CategorySelect = ({
  value,
  onValueChange,
  label = true,
}: CategorySelectProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      {label && (
        <Label htmlFor="category" className="text-right">
          Categoría
        </Label>
      )}
      <div className={label ? "col-span-3" : "col-span-4"}>
        <Select value={value} onValueChange={onValueChange} disabled={isLoading}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
