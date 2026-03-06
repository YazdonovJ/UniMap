-- Fix for Group Chat Messages
-- By default, `receiver_id` was strictly constrained to `auth.users`. 
-- Since group chats use `class_id` as the receiver, we must remove this specific foreign key restriction.

DO $$ 
DECLARE 
    constraint_name text;
BEGIN
    SELECT tc.constraint_name INTO constraint_name
    FROM information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    WHERE tc.table_name = 'messages'
      AND kcu.column_name = 'receiver_id'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.constraint_name != 'messages_receiver_id_fkey'; -- If it's a specific name, but we just grab it

    -- If a constraint was found, drop it
    -- Note: Most standard Supabase foreign keys are named tablename_columnname_fkey
    IF constraint_name IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.messages DROP CONSTRAINT ' || constraint_name;
    ELSE
        -- Fallback if the strict naming is used
        BEGIN
            ALTER TABLE public.messages DROP CONSTRAINT messages_receiver_id_fkey;
        EXCEPTION WHEN undefined_object THEN
            -- Ignore if it doesn't exist
        END;
    END IF;
END $$;
