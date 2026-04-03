import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://ukbflmuelwzsffijwqcr.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJmYzhlYmRkLWRjZjgtNGZiYy04ZDcxLTZlNDIyNDAyNGE5ZSJ9.eyJwcm9qZWN0SWQiOiJ1a2JmbG11ZWx3enNmZmlqd3FjciIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc1MTk0NjAwLCJleHAiOjIwOTA1NTQ2MDAsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.RrhpWiGYXoOWfQ6_uP6q-usVz4tiGyOSgJcNKuXkuFU';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };