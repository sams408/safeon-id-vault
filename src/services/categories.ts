
import { supabase } from '@/integrations/supabase/client';

export interface Category {
  id: string;
  name: string;
  product_count?: number;
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories...');
    
    // Use a raw SQL query to get the categories since it's not in the TypeScript types yet
    const { data, error } = await supabase
      .rpc('get_categories')
      .select();

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    // For each category, count the number of products
    const categoriesWithCounts = await Promise.all(
      (data || []).map(async (category) => {
        const { count, error: countError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id);
        
        if (countError) {
          console.error('Error counting products:', countError);
        }

        return {
          ...category,
          product_count: count || 0
        };
      })
    );

    return categoriesWithCounts;
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    throw error;
  }
};

export const fetchCategoryById = async (id: string): Promise<Category | null> => {
  try {
    // Use a raw SQL query to get a specific category
    const { data, error } = await supabase
      .rpc('get_category_by_id', { category_id: id })
      .single();
    
    if (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
    
    if (!data) return null;
    
    return data;
  } catch (error) {
    console.error('Error in fetchCategoryById:', error);
    throw error;
  }
};

export const createCategory = async (category: Omit<Category, 'id' | 'product_count'>): Promise<Category> => {
  try {
    // Use a raw SQL query to insert a new category
    const { data, error } = await supabase
      .rpc('create_category', { category_name: category.name })
      .single();
    
    if (error) {
      console.error('Error creating category:', error);
      throw error;
    }
    
    return { ...data, product_count: 0 };
  } catch (error) {
    console.error('Error in createCategory:', error);
    throw error;
  }
};

export const updateCategory = async (id: string, category: Partial<Omit<Category, 'id' | 'product_count'>>): Promise<Category> => {
  try {
    // Use a raw SQL query to update a category
    const { data, error } = await supabase
      .rpc('update_category', { 
        category_id: id, 
        category_name: category.name 
      })
      .single();
    
    if (error) {
      console.error('Error updating category:', error);
      throw error;
    }

    // Get current product count
    const { count, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id);
    
    if (countError) {
      console.error('Error counting products:', countError);
    }
    
    return { ...data, product_count: count || 0 };
  } catch (error) {
    console.error('Error in updateCategory:', error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    // Use a raw SQL query to delete a category
    const { error } = await supabase
      .rpc('delete_category', { category_id: id });

    if (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    throw error;
  }
};
