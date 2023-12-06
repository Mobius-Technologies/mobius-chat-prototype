import { createClient } from "@supabase/supabase-js/dist/module";


const SUPABASE_URL = "https://rpqgqkjivwvtwxmbeoln.supabase.co"
export const supabase = createClient(SUPABASE_URL, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwcWdxa2ppdnd2dHd4bWJlb2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgwMTUyODAsImV4cCI6MjAwMzU5MTI4MH0.YCmEIlT4xOf8hvkT8ifNHr9KrZLvIN8bARZHmEBREFA");