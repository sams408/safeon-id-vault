// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://upunkawpjnogczopdewz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwdW5rYXdwam5vZ2N6b3BkZXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTkyNDAsImV4cCI6MjA1OTE5NTI0MH0.G2BJe3LNvNmjhPUe2_6pZbFa9wx2QBkfkPSEzOgmNNY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);