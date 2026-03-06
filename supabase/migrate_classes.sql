-- ============================================================
-- MIGRATION: Add Teacher Class Tracking tables
-- Run this in Supabase SQL Editor (one-time)
-- ============================================================

-- 1. NEW TABLES
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cohort_id UUID REFERENCES cohorts(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  schedule JSONB DEFAULT '{}',
  max_capacity INTEGER DEFAULT 30,
  color TEXT DEFAULT '#6366f1',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS class_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'dropped', 'completed')),
  UNIQUE(class_id, student_id)
);

CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  type TEXT NOT NULL DEFAULT 'homework' CHECK (type IN ('homework', 'essay', 'project', 'quiz', 'exam', 'other')),
  max_points INTEGER NOT NULL DEFAULT 100,
  due_date TIMESTAMPTZ NOT NULL,
  published BOOLEAN DEFAULT TRUE,
  allow_late BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT DEFAULT '',
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'graded', 'returned', 'late')),
  grade NUMERIC(5,2),
  feedback TEXT,
  submitted_at TIMESTAMPTZ,
  graded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(assignment_id, student_id)
);

CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
  note TEXT,
  marked_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, student_id, date)
);

CREATE TABLE IF NOT EXISTS class_announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'info' CHECK (priority IN ('info', 'warning', 'urgent')),
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_progress_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  attendance_rate NUMERIC(5,2) DEFAULT 0,
  assignment_completion_rate NUMERIC(5,2) DEFAULT 0,
  average_grade NUMERIC(5,2) DEFAULT 0,
  overall_score NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, student_id, week_start)
);

-- 2. ENABLE RLS
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress_snapshots ENABLE ROW LEVEL SECURITY;

-- 3. RLS POLICIES
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

CREATE POLICY "Classes: teacher manages" ON classes FOR ALL USING (auth.uid() = teacher_id);
CREATE POLICY "Classes: enrolled students read" ON classes FOR SELECT USING (
  EXISTS (SELECT 1 FROM class_enrollments WHERE class_enrollments.class_id = classes.id AND class_enrollments.student_id = auth.uid() AND class_enrollments.status = 'active')
);
CREATE POLICY "Classes: admin read all" ON classes FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Enrollments: teacher manages" ON class_enrollments
  FOR ALL
  USING (public.is_class_teacher(class_id))
  WITH CHECK (public.is_class_teacher(class_id));
CREATE POLICY "Enrollments: student reads own" ON class_enrollments FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Assignments: teacher manages" ON assignments FOR ALL USING (auth.uid() = teacher_id);
CREATE POLICY "Assignments: enrolled students read" ON assignments FOR SELECT USING (
  EXISTS (SELECT 1 FROM class_enrollments WHERE class_enrollments.class_id = assignments.class_id AND class_enrollments.student_id = auth.uid() AND class_enrollments.status = 'active')
);

CREATE POLICY "Submissions: student manages own" ON assignment_submissions FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Submissions: teacher reads" ON assignment_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM assignments a WHERE a.id = assignment_submissions.assignment_id AND a.teacher_id = auth.uid())
);
CREATE POLICY "Submissions: teacher grades" ON assignment_submissions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM assignments a WHERE a.id = assignment_submissions.assignment_id AND a.teacher_id = auth.uid())
);

CREATE POLICY "Attendance: teacher manages" ON attendance_records FOR ALL USING (
  EXISTS (SELECT 1 FROM classes WHERE classes.id = attendance_records.class_id AND classes.teacher_id = auth.uid())
);
CREATE POLICY "Attendance: student reads own" ON attendance_records FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Announcements: teacher manages" ON class_announcements FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Announcements: enrolled students read" ON class_announcements FOR SELECT USING (
  EXISTS (SELECT 1 FROM class_enrollments WHERE class_enrollments.class_id = class_announcements.class_id AND class_enrollments.student_id = auth.uid() AND class_enrollments.status = 'active')
);

CREATE POLICY "Progress: teacher manages" ON student_progress_snapshots FOR ALL USING (
  EXISTS (SELECT 1 FROM classes WHERE classes.id = student_progress_snapshots.class_id AND classes.teacher_id = auth.uid())
);
CREATE POLICY "Progress: student reads own" ON student_progress_snapshots FOR SELECT USING (auth.uid() = student_id);

-- 4. INDEXES
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_active ON classes(is_active);
CREATE INDEX IF NOT EXISTS idx_enrollments_class ON class_enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON class_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_assignments_class ON assignments(class_id);
CREATE INDEX IF NOT EXISTS idx_assignments_due ON assignments(due_date);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_class ON attendance_records(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_announcements_class ON class_announcements(class_id);
CREATE INDEX IF NOT EXISTS idx_progress_class ON student_progress_snapshots(class_id);
CREATE INDEX IF NOT EXISTS idx_progress_student ON student_progress_snapshots(student_id);

-- 5. MAKE USER ADMIN
UPDATE profiles SET role = 'admin' WHERE email = 'jamo1iddingrozniy@gmail.com';
