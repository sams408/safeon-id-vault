
import { Database } from '@/integrations/supabase/types';

// Product type definition
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

// Type for the raw product data returned from Supabase
export type ProductRecord = Database['public']['Tables']['products']['Row'] & {
  clients?: { name: string } | null;
};

// Helper function to map product record to Product interface
export const mapProductRecord = (record: ProductRecord): Product => ({
  id: record.id,
  name: record.name,
  description: record.description || '',
  client_id: record.client_id,
  client_name: record.clients?.name,
  category_id: record.category_id || '',
  category: record.category || '',
  created_by: record.created_by,
  created_at: record.created_at
});
