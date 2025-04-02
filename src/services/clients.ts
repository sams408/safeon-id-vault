
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export const fetchClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }

  return data || [];
};

export const fetchClientById = async (id: string): Promise<Client | null> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching client:', error);
    throw error;
  }

  return data;
};

export const createClient = async (client: Omit<Client, 'id' | 'created_at'>): Promise<Client> => {
  console.log('Creating client with data:', client);
  
  const { data, error } = await supabase
    .from('clients')
    .insert([client])
    .select()
    .single();

  if (error) {
    console.error('Error creating client:', error);
    throw error;
  }

  console.log('Client created successfully:', data);
  return data;
};

export const updateClient = async (id: string, client: Partial<Omit<Client, 'id' | 'created_at'>>): Promise<Client> => {
  const { data, error } = await supabase
    .from('clients')
    .update(client)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating client:', error);
    throw error;
  }

  return data;
};

export const deleteClient = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};
