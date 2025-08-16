import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fywrgsgdoqfluzhtvrrr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5d3Jnc2dkb3FmbHV6aHR2cnJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNjQ0NTQsImV4cCI6MjA3MDk0MDQ1NH0.8ypSNsb6_H24G1iyx5WlBj-zHEL8E3omFlXHMihV3hg'

export const supabase = createClient(supabaseUrl, supabaseKey)
