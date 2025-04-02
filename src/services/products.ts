
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  client_id: string;
  client_name?: string;
  category_id: string;
  category?: string;
  created_by: string;
  created_at: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products...');
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        client_id,
        category_id,
        category,
        created_by,
        created_at,
        clients (name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      client_id: item.client_id,
      client_name: item.clients?.name,
      category_id: item.category_id,
      category: item.category,
      created_by: item.created_by,
      created_at: item.created_at
    }));
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        client_id,
        category_id,
        category,
        created_by,
        created_at,
        clients (name)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      client_id: data.client_id,
      client_name: data.clients?.name,
      category_id: data.category_id,
      category: data.category,
      created_by: data.created_by,
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error in fetchProductById:', error);
    throw error;
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'client_name'>): Promise<Product> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        description: product.description,
        client_id: product.client_id,
        category_id: product.category_id,
        category: product.category,
        created_by: product.created_by
      }])
      .select(`
        id,
        name,
        description,
        client_id,
        category_id,
        category,
        created_by,
        created_at,
        clients (name)
      `)
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      client_id: data.client_id,
      client_name: data.clients?.name,
      category_id: data.category_id,
      category: data.category,
      created_by: data.created_by,
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'created_at' | 'client_name'>>): Promise<Product> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: product.name,
        description: product.description,
        client_id: product.client_id,
        category_id: product.category_id,
        category: product.category,
        created_by: product.created_by
      })
      .eq('id', id)
      .select(`
        id,
        name,
        description,
        client_id,
        category_id,
        category,
        created_by,
        created_at,
        clients (name)
      `)
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      client_id: data.client_id,
      client_name: data.clients?.name,
      category_id: data.category_id,
      category: data.category,
      created_by: data.created_by,
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error in updateProduct:', error);
    throw error;
  }
};

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
