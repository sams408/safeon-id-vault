
import { supabase } from '@/lib/supabase';

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
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      clients(name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

  // Transform the data to match our interface
  return data ? data.map(user => ({
    ...user,
    client_name: user.clients?.name
  })) : [];
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      clients(name)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    throw error;
  }

  return data ? {
    ...data,
    client_name: data.clients?.name
  } : null;
};

export const createUser = async (user: Omit<User, 'id' | 'created_at' | 'client_name'>): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return data;
};

export const updateUser = async (id: string, user: Partial<Omit<User, 'id' | 'created_at' | 'client_name'>>): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .update(user)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    throw error;
  }

  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
