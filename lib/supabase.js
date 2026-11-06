import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jmhpjxrllxilitznxeai.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptaHBqeHJsbHhpbGl0em54ZWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5MDM0NTMsImV4cCI6MjEwOTQ3OTQ1M30.eFBQ3vf4BBKSMPuWqM_WXP6mhdYySw17SVIXMqjwVbg"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
