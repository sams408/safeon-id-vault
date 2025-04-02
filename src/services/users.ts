
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

export const fetchUsers = async (): Promise<User[]> => {
  try {
    console.log('Fetching users...');
    
    // Fetch users and join with clients to get client names
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        client_id,
        status,
        created_at,
        created_by,
        clients(name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    // Transform the data to match the User interface
    return (data || []).map(user => ({
      id: user.id,
      client_id: user.client_id,
      client_name: user.clients?.name,
      name: user.name,
      email: user.email,
      status: user.status as 'active' | 'inactive',
      created_at: user.created_at,
      created_by: user.created_by
    }));
  } catch (error) {
    console.error('Error in fetchUsers:', error);
    throw error;
  }
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        client_id,
        status,
        created_at,
        created_by,
        clients(name)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      throw error;
    }

    if (!data) return null;

    return {
      id: data.id,
      client_id: data.client_id,
      client_name: data.clients?.name,
      name: data.name,
      email: data.email,
      status: data.status as 'active' | 'inactive',
      created_at: data.created_at,
      created_by: data.created_by
    };
  } catch (error) {
    console.error('Error in fetchUserById:', error);
    throw error;
  }
};

export const createUser = async (user: Omit<User, 'id' | 'created_at' | 'client_name'>): Promise<User> => {
  try {
    console.log('Creating user with data:', user);
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name: user.name,
          email: user.email,
          client_id: user.client_id,
          status: user.status,
          created_by: user.created_by
        }
      ])
      .select(`
        id,
        name,
        email,
        client_id,
        status,
        created_at,
        created_by,
        clients(name)
      `)
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }

    console.log('User created successfully:', data);
    
    return {
      id: data.id,
      client_id: data.client_id,
      client_name: data.clients?.name,
      name: data.name,
      email: data.email,
      status: data.status as 'active' | 'inactive',
      created_at: data.created_at,
      created_by: data.created_by
    };
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

export const updateUser = async (id: string, user: Partial<Omit<User, 'id' | 'created_at' | 'client_name'>>): Promise<User> => {
  try {
    const updateData: any = {};
    if (user.name) updateData.name = user.name;
    if (user.email) updateData.email = user.email;
    if (user.client_id) updateData.client_id = user.client_id;
    if (user.status) updateData.status = user.status;
    if (user.created_by) updateData.created_by = user.created_by;

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select(`
        id,
        name,
        email,
        client_id,
        status,
        created_at,
        created_by,
        clients(name)
      `)
      .single();

    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }

    return {
      id: data.id,
      client_id: data.client_id,
      client_name: data.clients?.name,
      name: data.name,
      email: data.email,
      status: data.status as 'active' | 'inactive',
      created_at: data.created_at,
      created_by: data.created_by
    };
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('users')
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
