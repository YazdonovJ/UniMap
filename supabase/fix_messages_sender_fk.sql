-- Fix PostgREST relationship error "PGRST200"
-- Drop the existing foreign key linking to auth.users
ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS messages_sender_id_fkey;

-- Add a new foreign key linking directly to the public profiles table
-- This allows the frontend query `select("*, sender:profiles!sender_id(full_name)")` to automatically resolve
ALTER TABLE public.messages 
ADD CONSTRAINT messages_sender_id_fkey 
FOREIGN KEY (sender_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

-- Refresh cache for PostgREST API
NOTIFY pgrst, 'reload schema';
