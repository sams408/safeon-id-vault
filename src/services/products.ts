
import { supabase } from '@/lib/supabase';

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
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      clients(name),
      categories(name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  // Transform the data to match our interface
  return data ? data.map(product => ({
    ...product,
    client_name: product.clients?.name,
    category: product.categories?.name
  })) : [];
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      clients(name),
      categories(name)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    throw error;
  }

  return data ? {
    ...data,
    client_name: data.clients?.name,
    category: data.categories?.name
  } : null;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'client_name' | 'category'>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }

  return data;
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'created_at' | 'client_name' | 'category'>>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }

  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
