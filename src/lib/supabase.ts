
import { createClient } from '@supabase/supabase-js';

// Get environment variables for Supabase connection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

// Create and export Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15cXdjb2diYnpjcWp3Z2pteXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwODA4ODYsImV4cCI6MjAyNzY1Njg4Nn0.Nf0PsK58VpJSQ5qZd-YukvCGaCPkXb-UQwZ1l8L4cCQ'
);

// Add a simple test function to check connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('clients').select('count', { count: 'exact', head: true });
    if (error) throw error;
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
};
