import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vgabxlabghiseznmnqpq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnYWJ4bGFiZ2hpc2V6bm1ucXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MjY0NzcsImV4cCI6MjA2OTUwMjQ3N30.QgxwgEy_1yTgUT1VSsSldLjB8Vl6A5alYYfmvtZLTnU'

export const supabase = createClient(supabaseUrl, supabaseKey)