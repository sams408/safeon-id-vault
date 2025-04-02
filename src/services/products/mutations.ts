
import { supabase } from '@/integrations/supabase/client';
import { Product, ProductRecord, mapProductRecord } from './types';

// Define common select query to reuse across mutation functions
const productSelectQuery = `
  id,
  name,
  description,
  client_id,
  category_id,
  category,
  created_by,
  created_at,
  clients (name)
`;

// Create a new product
export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'client_name'>): Promise<Product> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        description: product.description,
        client_id: product.client_id,
        category_id: product.category_id,
        category: product.category,
        created_by: product.created_by
      })
      .select(productSelectQuery)
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }

    return mapProductRecord(data as ProductRecord);
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'created_at' | 'client_name'>>): Promise<Product> => {
  try {
    const updateData: any = {};
    
    // Only include fields that are provided
    if (product.name !== undefined) updateData.name = product.name;
    if (product.description !== undefined) updateData.description = product.description;
    if (product.client_id !== undefined) updateData.client_id = product.client_id;
    if (product.category_id !== undefined) updateData.category_id = product.category_id;
    if (product.category !== undefined) updateData.category = product.category;
    if (product.created_by !== undefined) updateData.created_by = product.created_by;

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select(productSelectQuery)
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    return mapProductRecord(data as ProductRecord);
  } catch (error) {
    console.error('Error in updateProduct:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    throw error;
  }
};
