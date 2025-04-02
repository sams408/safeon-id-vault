
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

// Simple implementation using only the 'clients' table until other tables are created
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products...');
    
    // Temporarily use clients table
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    // Transform clients into the Product structure as a temporary solution
    return (data || []).map(client => ({
      id: client.id,
      name: `Product for ${client.name}`,
      description: `A sample product for ${client.name}`,
      client_id: client.id,
      client_name: client.name,
      category_id: 'sample-category',
      category: 'Sample Category',
      created_by: 'system',
      created_at: client.created_at
    }));
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    // Temporarily use the clients table
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    if (!data) return null;

    // Map client data to Product structure
    return {
      id: data.id,
      name: `Product for ${data.name}`,
      description: `A sample product for ${data.name}`,
      client_id: data.id,
      client_name: data.name,
      category_id: 'sample-category',
      category: 'Sample Category',
      created_by: 'system',
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error in fetchProductById:', error);
    throw error;
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'client_name' | 'category'>): Promise<Product> => {
  try {
    // For now, we'll create a client instead with product data
    const clientData = {
      name: product.name,
      email: `product-${Date.now()}@example.com`, // Required field for clients
      phone: '',  // Required field for clients
      status: 'active'
    };

    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }

    // Return product structure
    return {
      id: data.id,
      name: product.name,
      description: product.description,
      client_id: product.client_id,
      client_name: data.name,
      category_id: product.category_id,
      category: 'Sample Category',
      created_by: product.created_by,
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'created_at' | 'client_name' | 'category'>>): Promise<Product> => {
  try {
    // For now, just update the client with product-relevant data
    const clientData: any = {};
    if (product.name) clientData.name = product.name;

    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    // Return updated product structure
    return {
      id: data.id,
      name: product.name || `Product for ${data.name}`,
      description: product.description || `A sample product for ${data.name}`,
      client_id: product.client_id || data.id,
      client_name: data.name,
      category_id: product.category_id || 'sample-category',
      category: 'Sample Category',
      created_by: product.created_by || 'system',
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error in updateProduct:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    // For demo purposes, we won't actually delete anything
    console.log(`Simulating deletion of product with ID: ${id}`);
    
    // In a real implementation, we would do:
    // const { error } = await supabase
    //   .from('products')
    //   .delete()
    //   .eq('id', id);
    //
    // if (error) {
    //   console.error('Error deleting product:', error);
    //   throw error;
    // }
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    throw error;
  }
};
