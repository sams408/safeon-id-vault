import { supabase } from '@/integrations/supabase/client';

export interface Category {
  id: string;
  name: string;
  product_count?: number;
}

export const fetchCategories = async (): Promise<Category[]> => {
  // First, fetch all categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*');

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
    throw categoriesError;
  }

  // Then, for each category, count the number of products
  const categoriesWithCount = await Promise.all(
    (categories || []).map(async (category) => {
      const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id);

      if (countError) {
        console.error('Error counting products for category:', countError);
        return { ...category, product_count: 0 };
      }

      return { ...category, product_count: count || 0 };
    })
  );

  return categoriesWithCount;
};

export const fetchCategoryById = async (id: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    throw error;
  }

  if (!data) return null;

  // Count products for this category
  const { count, error: countError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', id);

  if (countError) {
    console.error('Error counting products for category:', countError);
    return { ...data, product_count: 0 };
  }

  return { ...data, product_count: count || 0 };
};

export const createCategory = async (category: Omit<Category, 'id' | 'product_count'>): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();

  if (error) {
    console.error('Error creating category:', error);
    throw error;
  }

  return { ...data, product_count: 0 };
};

export const updateCategory = async (id: string, category: Partial<Omit<Category, 'id' | 'product_count'>>): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating category:', error);
    throw error;
  }

  // Get product count
  const { count, error: countError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', id);

  if (countError) {
    console.error('Error counting products for category:', countError);
    return { ...data, product_count: 0 };
  }

  return { ...data, product_count: count || 0 };
};

export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
