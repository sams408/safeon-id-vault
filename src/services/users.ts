
import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  client_id: string;
  client_name?: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  created_at: string;
  created_by: string;
}

// Simple implementation using only the 'clients' table until other tables are created
export const fetchUsers = async (): Promise<User[]> => {
  try {
    console.log('Fetching users...');
    
    // Temporarily use the existing clients table
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    // Transform clients into the User structure as a temporary solution
    return (data || []).map(client => ({
      id: client.id,
      client_id: client.id,  // Using same id for now
      client_name: client.name,
      name: client.name,
      email: client.email,
      status: client.status as 'active' | 'inactive',
      created_at: client.created_at,
      created_by: 'system' // Default value
    }));
  } catch (error) {
    console.error('Error in fetchUsers:', error);
    throw error;
  }
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    // Temporarily use the clients table
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      throw error;
    }

    if (!data) return null;

    // Map client data to User structure
    return {
      id: data.id,
      client_id: data.id,
      client_name: data.name,
      name: data.name,
      email: data.email,
      status: data.status as 'active' | 'inactive',
      created_at: data.created_at,
      created_by: 'system'
    };
  } catch (error) {
    console.error('Error in fetchUserById:', error);
    throw error;
  }
};

export const createUser = async (user: Omit<User, 'id' | 'created_at' | 'client_name'>): Promise<User> => {
  try {
    // For now, we'll create a client instead
    const clientData = {
      name: user.name,
      email: user.email,
      phone: '',  // Required field for clients
      status: user.status
    };

    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }

    // Map client data to User structure
    return {
      id: data.id,
      client_id: user.client_id,
      name: data.name,
      email: data.email,
      status: data.status as 'active' | 'inactive',
      created_at: data.created_at,
      created_by: user.created_by
    };
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

export const updateUser = async (id: string, user: Partial<Omit<User, 'id' | 'created_at' | 'client_name'>>): Promise<User> => {
  try {
    // For now, just update the client
    const clientData: any = {};
    if (user.name) clientData.name = user.name;
    if (user.email) clientData.email = user.email;
    if (user.status) clientData.status = user.status;

    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }

    // Map client data to User structure
    return {
      id: data.id,
      client_id: user.client_id || data.id,
      name: data.name,
      email: data.email,
      status: data.status as 'active' | 'inactive',
      created_at: data.created_at,
      created_by: user.created_by || 'system'
    };
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    // For now, delete the client
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
};
