
import { supabase } from '@/integrations/supabase/client';

export interface Category {
  id: string;
  name: string;
  product_count?: number;
}

// Simple implementation until categories table is created
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    console.log('Fetching categories...');
    
    // Create mock categories based on clients
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*');

    if (error) {
      console.error('Error fetching data for categories:', error);
      throw error;
    }

    // Create a set of sample categories
    const sampleCategories: Category[] = [
      { id: '1', name: 'Technology', product_count: 0 },
      { id: '2', name: 'Healthcare', product_count: 0 },
      { id: '3', name: 'Education', product_count: 0 },
      { id: '4', name: 'Finance', product_count: 0 }
    ];

    // Distribute clients across categories to simulate product counts
    if (clients && clients.length > 0) {
      clients.forEach((client, index) => {
        const categoryIndex = index % sampleCategories.length;
        sampleCategories[categoryIndex].product_count = 
          (sampleCategories[categoryIndex].product_count || 0) + 1;
      });
    }

    return sampleCategories;
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    throw error;
  }
};

export const fetchCategoryById = async (id: string): Promise<Category | null> => {
  try {
    // Get mock categories
    const categories = await fetchCategories();
    
    // Find the requested category
    const category = categories.find(c => c.id === id);
    
    if (!category) return null;
    
    return category;
  } catch (error) {
    console.error('Error in fetchCategoryById:', error);
    throw error;
  }
};

export const createCategory = async (category: Omit<Category, 'id' | 'product_count'>): Promise<Category> => {
  try {
    // In a real implementation, we would insert into the categories table
    console.log('Creating mock category:', category.name);
    
    // Generate a random ID
    const id = Math.random().toString(36).substring(2, 9);
    
    // Return a mock category
    return {
      id,
      name: category.name,
      product_count: 0
    };
  } catch (error) {
    console.error('Error in createCategory:', error);
    throw error;
  }
};

export const updateCategory = async (id: string, category: Partial<Omit<Category, 'id' | 'product_count'>>): Promise<Category> => {
  try {
    // Get mock categories
    const categories = await fetchCategories();
    
    // Find the requested category
    const existingCategory = categories.find(c => c.id === id);
    
    if (!existingCategory) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    // Update category name if provided
    const updatedCategory = {
      ...existingCategory,
      name: category.name || existingCategory.name
    };
    
    console.log('Updated mock category:', updatedCategory);
    
    return updatedCategory;
  } catch (error) {
    console.error('Error in updateCategory:', error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    // In a real implementation, we would delete from the categories table
    console.log(`Simulating deletion of category with ID: ${id}`);
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    throw error;
  }
};
