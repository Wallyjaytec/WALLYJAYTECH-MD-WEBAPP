import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jmhpjxrllxilitznxeai.supabase.co"; 
const supabaseAnonKey = "sb_secret_E32ukEN0TbO5114g6Gn27g_hS33jbCy"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
