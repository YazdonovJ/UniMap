-- Secure message RLS migration for DM + class group chats
-- Keeps group chat support while preventing global read/write exposure.

BEGIN;

-- Group chats use class IDs in receiver_id, so this FK must stay dropped.
ALTER TABLE public.messages DROP CONSTRAINT IF EXISTS messages_receiver_id_fkey;

-- Ensure RLS is enabled.
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Remove permissive/legacy policies.
DROP POLICY IF EXISTS "Allow all" ON public.messages;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.messages;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.messages;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.messages;
DROP POLICY IF EXISTS "Messages: participants" ON public.messages;
DROP POLICY IF EXISTS "Messages: group members read" ON public.messages;
DROP POLICY IF EXISTS "Messages: group members insert" ON public.messages;

-- Direct messages: sender + receiver can read.
CREATE POLICY "Messages: dm participants read"
ON public.messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = messages.receiver_id
      AND (auth.uid() = messages.sender_id OR auth.uid() = messages.receiver_id)
  )
);

-- Direct messages: sender can insert.
CREATE POLICY "Messages: dm sender insert"
ON public.messages
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id
  AND EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = messages.receiver_id
  )
);

-- Direct messages: both participants can update (e.g., mark as read).
CREATE POLICY "Messages: dm participants update"
ON public.messages
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = messages.receiver_id
      AND (auth.uid() = messages.sender_id OR auth.uid() = messages.receiver_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = messages.receiver_id
      AND (auth.uid() = messages.sender_id OR auth.uid() = messages.receiver_id)
  )
);

-- Direct messages: sender can delete their own rows.
CREATE POLICY "Messages: dm sender delete"
ON public.messages
FOR DELETE
USING (
  auth.uid() = sender_id
  AND EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = messages.receiver_id
  )
);

-- Class group messages: class members/teacher/admin/counselor can read.
CREATE POLICY "Messages: class members read"
ON public.messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.classes c
    WHERE c.id = messages.receiver_id
      AND (
        c.teacher_id = auth.uid()
        OR EXISTS (
          SELECT 1
          FROM public.class_enrollments ce
          WHERE ce.class_id = c.id
            AND ce.student_id = auth.uid()
            AND ce.status = 'active'
        )
        OR EXISTS (
          SELECT 1
          FROM public.profiles p
          WHERE p.id = auth.uid()
            AND p.role IN ('admin', 'counselor')
        )
      )
  )
);

-- Class group messages: class members/teacher/admin/counselor can send.
CREATE POLICY "Messages: class members insert"
ON public.messages
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id
  AND EXISTS (
    SELECT 1
    FROM public.classes c
    WHERE c.id = messages.receiver_id
      AND (
        c.teacher_id = auth.uid()
        OR EXISTS (
          SELECT 1
          FROM public.class_enrollments ce
          WHERE ce.class_id = c.id
            AND ce.student_id = auth.uid()
            AND ce.status = 'active'
        )
        OR EXISTS (
          SELECT 1
          FROM public.profiles p
          WHERE p.id = auth.uid()
            AND p.role IN ('admin', 'counselor')
        )
      )
  )
);

NOTIFY pgrst, 'reload schema';

COMMIT;
