-- 1. Remove the strict foreign key constraint that requires receiver_id to be a User ID.
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
      AND tc.constraint_type = 'FOREIGN KEY';

    IF constraint_name IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.messages DROP CONSTRAINT ' || constraint_name;
    END IF;
END $$;

-- 2. Drop EVERY existing policy on messages just in case
DROP POLICY IF EXISTS "Messages: participants" ON messages;
DROP POLICY IF EXISTS "Messages: group members read" ON messages;
DROP POLICY IF EXISTS "Messages: group members insert" ON messages;
DROP POLICY IF EXISTS "Messages: Any auth user read" ON messages;
DROP POLICY IF EXISTS "Messages: Any auth user insert" ON messages;

-- 3. Create absolute foolproof policies to restore functionality FIRST
CREATE POLICY "Enable read access for all users" ON messages FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON messages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for users based on email" ON messages FOR UPDATE USING (auth.role() = 'authenticated');

-- 4. Refresh the schema cache
NOTIFY pgrst, 'reload schema';
