-- Fix: infinite recursion between classes and class_enrollments RLS policies.
-- Run this once in Supabase SQL Editor.

BEGIN;

CREATE OR REPLACE FUNCTION public.is_class_teacher(target_class_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.classes c
    WHERE c.id = target_class_id
      AND c.teacher_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_class_teacher(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_class_teacher(UUID) TO authenticated;

DROP POLICY IF EXISTS "Enrollments: teacher manages" ON public.class_enrollments;

CREATE POLICY "Enrollments: teacher manages"
ON public.class_enrollments
FOR ALL
USING (public.is_class_teacher(class_id))
WITH CHECK (public.is_class_teacher(class_id));

COMMIT;

