import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Internal Supabase client instance. NOT to be exported for UI usage directly.
// This enforces Vendor Isolation (Rule 1.1).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
