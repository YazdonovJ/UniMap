-- 1. Remove strict foreign keys
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_receiver_id_fkey;

-- 2. Ditch Row Level Security ENTIRELY just to prove it's the culprit and restore chats
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- 3. In case RLS was required by a trigger, add a catch-all just in case
DROP POLICY IF EXISTS "Enable read access for all users" ON messages;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON messages;
DROP POLICY IF EXISTS "Enable update for users based on email" ON messages;

CREATE POLICY "Allow all" ON messages FOR ALL USING (true);

-- 4. Refresh cache
NOTIFY pgrst, 'reload schema';

-- End of script
