
import { supabase } from '@/integrations/supabase/client';

export interface Category {
  id: string;
  name: string;
  product_count?: number;
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories...');
    
    const { data, error } = await supabase
      .from('categories')
      .select('id, name');

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
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .eq('id', id)
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
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
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
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    throw error;
  }
};
