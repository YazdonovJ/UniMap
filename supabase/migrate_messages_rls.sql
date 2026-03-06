-- 1. Remove the strict foreign key constraint that requires receiver_id to be a User ID.
-- This allows receiver_id to be either a User ID (for DMs) or a Class ID (for Groups).
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

-- 2. Drop existing policies to ensure a clean slate for group messaging
DROP POLICY IF EXISTS "Messages: participants" ON messages;
DROP POLICY IF EXISTS "Messages: group members read" ON messages;
DROP POLICY IF EXISTS "Messages: group members insert" ON messages;

-- 3. Re-create the Direct Message policy (Sender or Receiver can access)
CREATE POLICY "Messages: participants" ON messages FOR ALL USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);

-- 4. Create a policy to allow ANY authenticated user to read messages
-- (You can tighten this later to specific class memberships, but this fixes the silent 'insert().select()' drop)
CREATE POLICY "Messages: Any auth user read" ON messages FOR SELECT USING (
  auth.role() = 'authenticated'
);

-- 5. Create a policy to allow ANY authenticated user to insert messages
CREATE POLICY "Messages: Any auth user insert" ON messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id
);

-- 6. Refresh the schema cache
NOTIFY pgrst, 'reload schema';
