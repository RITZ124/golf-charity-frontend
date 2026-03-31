import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fqaqqmzonwvzsithkwph.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxYXFxbXpvbnd2enNpdGhrd3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NDc0MDEsImV4cCI6MjA5MDQyMzQwMX0.tOBN_hesOQYB_TtpCDCNZRqZTamSBgF6zbxyJFgGvAQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;