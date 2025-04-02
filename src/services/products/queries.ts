
import { supabase } from '@/integrations/supabase/client';
import { Product, ProductRecord, mapProductRecord } from './types';

// Define common select query to reuse across query functions
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

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching products...');
    
    const { data, error } = await supabase
      .from('products')
      .select(productSelectQuery)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return (data as ProductRecord[] || []).map(mapProductRecord);
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
};

// Fetch single product by id
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(productSelectQuery)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    if (!data) return null;

    return mapProductRecord(data as ProductRecord);
  } catch (error) {
    console.error('Error in fetchProductById:', error);
    throw error;
  }
};
