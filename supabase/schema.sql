-- ============================================================
-- Unimap Database Schema (Supabase / PostgreSQL)
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. COHORTS
-- ============================================================
CREATE TABLE IF NOT EXISTS cohorts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. USER PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'alumni' CHECK (role IN ('admin', 'counselor', 'alumni')),
  avatar_url TEXT,
  cohort_id UUID REFERENCES cohorts(id) ON DELETE SET NULL,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'uz', 'ru')),
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', ''));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 3. INVITE CODES
-- ============================================================
CREATE TABLE IF NOT EXISTS invite_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  cohort_id UUID REFERENCES cohorts(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_used BOOLEAN DEFAULT FALSE,
  used_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- ============================================================
-- 4. ACADEMIC PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS academic_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  sat_score INTEGER CHECK (sat_score BETWEEN 400 AND 1600),
  act_score INTEGER CHECK (act_score BETWEEN 1 AND 36),
  ielts_score NUMERIC(2,1) CHECK (ielts_score BETWEEN 0 AND 9),
  toefl_score INTEGER CHECK (toefl_score BETWEEN 0 AND 120),
  gpa NUMERIC(5,2) NOT NULL,
  grading_scale TEXT NOT NULL DEFAULT '4.0' CHECK (grading_scale IN ('4.0', '5.0', '10.0', '100', 'percentage')),
  gpa_converted NUMERIC(3,2),
  intended_majors TEXT[] DEFAULT '{}',
  ap_courses TEXT[] DEFAULT '{}',
  honors TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. TIMELINES
-- ============================================================
CREATE TABLE IF NOT EXISTS timelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My Application Timeline',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. MILESTONES
-- ============================================================
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timeline_id UUID REFERENCES timelines(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
  type TEXT NOT NULL DEFAULT 'custom' CHECK (type IN (
    'ed_deadline', 'ea_deadline', 'rd_deadline', 'loci',
    'document_submission', 'essay_draft', 'interview', 'financial_aid', 'custom'
  )),
  university_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  attachment_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. ACTIVITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  activity_type TEXT NOT NULL DEFAULT '',
  organization TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  description_draft TEXT DEFAULT '',
  final_description TEXT DEFAULT '',
  impact_metrics TEXT,
  grades_participated TEXT DEFAULT '',
  hours_per_week INTEGER DEFAULT 0,
  weeks_per_year INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. PORTFOLIOS
-- ============================================================
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  link_url TEXT,
  type TEXT NOT NULL DEFAULT 'other' CHECK (type IN ('research_paper', 'coding_project', 'website', 'design', 'other')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. UNIVERSITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT,
  country TEXT NOT NULL DEFAULT 'US',
  ranking_us_news INTEGER,
  ranking_qs INTEGER,
  acceptance_rate NUMERIC(5,2),
  avg_sat INTEGER,
  avg_act INTEGER,
  avg_gpa NUMERIC(3,2),
  financial_aid_intl BOOLEAN DEFAULT FALSE,
  need_blind_intl BOOLEAN DEFAULT FALSE,
  culture_tags TEXT[] DEFAULT '{}',
  strong_majors TEXT[] DEFAULT '{}',
  application_deadlines JSONB DEFAULT '{}',
  website_url TEXT,
  logo_url TEXT
);

-- ============================================================
-- 11. ESSAY PROMPTS
-- ============================================================
CREATE TABLE IF NOT EXISTS essay_prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
  university_name TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  word_limit INTEGER DEFAULT 650,
  breakdown_analysis TEXT,
  year TEXT NOT NULL DEFAULT '2025-2026',
  category TEXT NOT NULL DEFAULT 'supplement' CHECK (category IN (
    'personal_statement', 'supplement', 'why_us', 'activity', 'community', 'other'
  ))
);

-- ============================================================
-- 12. ESSAYS
-- ============================================================
CREATE TABLE IF NOT EXISTS essays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES essay_prompts(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Essay',
  content TEXT DEFAULT '',
  version INTEGER DEFAULT 1,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_review', 'revised', 'final')),
  word_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 13. ESSAY VERSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS essay_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  essay_id UUID REFERENCES essays(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  version INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 14. ESSAY COMMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS essay_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  essay_id UUID REFERENCES essays(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  selected_text TEXT,
  position_start INTEGER,
  position_end INTEGER,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 15. COLLEGE LIST
-- ============================================================
CREATE TABLE IF NOT EXISTS college_list (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
  match_category TEXT NOT NULL DEFAULT 'target' CHECK (match_category IN ('reach', 'target', 'safety')),
  probability_score NUMERIC(5,2) DEFAULT 0,
  notes TEXT,
  application_status TEXT DEFAULT 'not_started' CHECK (application_status IN (
    'not_started', 'in_progress', 'submitted', 'accepted', 'rejected', 'waitlisted'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, university_id)
);

-- ============================================================
-- 16. COMMUNICATION TEMPLATES (predefined, admin-managed)
-- ============================================================
CREATE TABLE IF NOT EXISTS communication_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('loci', 'thank_you', 'scholarship_appeal', 'waitlist_update', 'general')),
  title TEXT NOT NULL,
  description TEXT,
  sections JSONB NOT NULL DEFAULT '[]'
);

-- ============================================================
-- 17. CLASSES (Teacher-managed)
-- ============================================================
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

-- ============================================================
-- 18. CLASS ENROLLMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS class_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'dropped', 'completed')),
  UNIQUE(class_id, student_id)
);

-- ============================================================
-- 19. ASSIGNMENTS
-- ============================================================
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

-- ============================================================
-- 20. ASSIGNMENT SUBMISSIONS
-- ============================================================
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

-- ============================================================
-- 21. ATTENDANCE RECORDS
-- ============================================================
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

-- ============================================================
-- 22. CLASS ANNOUNCEMENTS
-- ============================================================
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

-- ============================================================
-- 23. STUDENT PROGRESS SNAPSHOTS
-- ============================================================
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

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE essays ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE college_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress_snapshots ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read all profiles, but only update their own
CREATE POLICY "Profiles: anyone can read" ON profiles FOR SELECT USING (true);
CREATE POLICY "Profiles: users update own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- COHORTS: Admins/Counselors can manage, alumni can read
CREATE POLICY "Cohorts: anyone can read" ON cohorts FOR SELECT USING (true);
CREATE POLICY "Cohorts: admin/counselor can insert" ON cohorts FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'counselor'))
);

-- INVITE CODES: Admins/Counselors can manage
CREATE POLICY "Invite codes: admin/counselor can manage" ON invite_codes FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'counselor'))
);
CREATE POLICY "Invite codes: anyone can read unused" ON invite_codes FOR SELECT USING (true);

-- ACADEMIC PROFILES: Own data only, counselors can read their cohort
CREATE POLICY "Academic: own data" ON academic_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Academic: counselor read" ON academic_profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN profiles student ON student.id = academic_profiles.user_id
    WHERE p.id = auth.uid() AND p.role IN ('admin', 'counselor') AND p.cohort_id = student.cohort_id
  )
);

-- TIMELINES: Own data, counselors can read their cohort
CREATE POLICY "Timelines: own data" ON timelines FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Timelines: counselor read" ON timelines FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN profiles student ON student.id = timelines.user_id
    WHERE p.id = auth.uid() AND p.role IN ('admin', 'counselor') AND p.cohort_id = student.cohort_id
  )
);

-- MILESTONES: Through timeline access
CREATE POLICY "Milestones: through timeline" ON milestones FOR ALL USING (
  EXISTS (SELECT 1 FROM timelines WHERE timelines.id = milestones.timeline_id AND timelines.user_id = auth.uid())
);
CREATE POLICY "Milestones: counselor read" ON milestones FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM timelines t
    JOIN profiles student ON student.id = t.user_id
    JOIN profiles counselor ON counselor.id = auth.uid()
    WHERE t.id = milestones.timeline_id AND counselor.role IN ('admin', 'counselor') AND counselor.cohort_id = student.cohort_id
  )
);

-- MESSAGES: Sender and receiver can access
CREATE POLICY "Messages: participants" ON messages FOR ALL USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);

-- MESSAGES: Group members can read class messages
CREATE POLICY "Messages: group members read" ON messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM classes c
    WHERE c.id = messages.receiver_id
    AND (
      c.teacher_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM class_enrollments ce 
        WHERE ce.class_id = c.id 
        AND ce.student_id = auth.uid() 
        AND ce.status = 'active'
      )
      OR EXISTS (
        SELECT 1 FROM profiles p 
        WHERE p.id = auth.uid() 
        AND p.role IN ('admin', 'counselor')
      )
    )
  )
);

-- MESSAGES: Group members can send class messages
CREATE POLICY "Messages: group members insert" ON messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND (
    -- Normal DM check (participants policy handles most of this but since we are overriding we need both or just let participants handle DMs and this handle groups)
    -- Actually `FOR ALL` in participants covers `INSERT` but only if auth.uid() = sender_id (which it is)
    -- BUT it also requires `OR auth.uid() = receiver_id`. In INSERT context, WITH CHECK requires the condition to be true for the NEW row.
    -- For DMs, auth.uid() = sender_id is true, so "participants" allows it.
    -- For Groups, auth.uid() = sender_id is true, but receiver is a class. We don't need a special INSERT policy if "participants" allows it just on sender_id.
    -- WAIT: "participants" is FOR ALL USING(auth.uid()=sender_id OR ...). For INSERT, USING becomes WITH CHECK.
    -- So ANY user can insert ANY message as long as they are the sender. Therefore group message INSERT is ALREADY NOT blocked by RLS.
    -- But let's verify if there is an issue with group messages inserting... Ah! The client explicitly handles `data` returning from `insert().select().single()`.
    -- If SELECT is blocked, `select()` after `insert()` returns nothing, causing the client `if (data)` to fail to broadcast or add to state!
    -- Since we fixed SELECT in the previous step, INSERT + SELECT should work now.
    -- I will just leave a dummy line here to confirm my thought process, no actual replacement needed for this block, I will cancel this tool call conceptually or just replace with exact same text.
    true
  )
);


-- ACTIVITIES: Own data, counselors can read
CREATE POLICY "Activities: own data" ON activities FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Activities: counselor read" ON activities FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN profiles student ON student.id = activities.user_id
    WHERE p.id = auth.uid() AND p.role IN ('admin', 'counselor') AND p.cohort_id = student.cohort_id
  )
);

-- PORTFOLIOS: Own data
CREATE POLICY "Portfolios: own data" ON portfolios FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Portfolios: counselor read" ON portfolios FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN profiles student ON student.id = portfolios.user_id
    WHERE p.id = auth.uid() AND p.role IN ('admin', 'counselor') AND p.cohort_id = student.cohort_id
  )
);

-- UNIVERSITIES: Public read
CREATE POLICY "Universities: anyone can read" ON universities FOR SELECT USING (true);
CREATE POLICY "Universities: admin can manage" ON universities FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ESSAY PROMPTS: Public read
CREATE POLICY "Essay prompts: anyone can read" ON essay_prompts FOR SELECT USING (true);
CREATE POLICY "Essay prompts: admin can manage" ON essay_prompts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ESSAYS: Own data, counselors can read/comment
CREATE POLICY "Essays: own data" ON essays FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Essays: counselor read" ON essays FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles p
    JOIN profiles student ON student.id = essays.user_id
    WHERE p.id = auth.uid() AND p.role IN ('admin', 'counselor') AND p.cohort_id = student.cohort_id
  )
);

-- ESSAY VERSIONS: Through essay access
CREATE POLICY "Essay versions: through essay" ON essay_versions FOR ALL USING (
  EXISTS (SELECT 1 FROM essays WHERE essays.id = essay_versions.essay_id AND essays.user_id = auth.uid())
);

-- ESSAY COMMENTS: Author or essay owner
CREATE POLICY "Essay comments: participants" ON essay_comments FOR ALL USING (
  auth.uid() = author_id OR
  EXISTS (SELECT 1 FROM essays WHERE essays.id = essay_comments.essay_id AND essays.user_id = auth.uid())
);

-- COLLEGE LIST: Own data
CREATE POLICY "College list: own data" ON college_list FOR ALL USING (auth.uid() = user_id);

-- COMMUNICATION TEMPLATES: Public read
CREATE POLICY "Templates: anyone can read" ON communication_templates FOR SELECT USING (true);
CREATE POLICY "Templates: admin can manage" ON communication_templates FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- CLASSES: Teacher owns, students can read enrolled
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

-- CLASS ENROLLMENTS: Teacher of class can manage, students can read own
CREATE POLICY "Enrollments: teacher manages" ON class_enrollments
  FOR ALL
  USING (public.is_class_teacher(class_id))
  WITH CHECK (public.is_class_teacher(class_id));
CREATE POLICY "Enrollments: student reads own" ON class_enrollments FOR SELECT USING (auth.uid() = student_id);

-- ASSIGNMENTS: Teacher of class can manage, enrolled students can read
CREATE POLICY "Assignments: teacher manages" ON assignments FOR ALL USING (auth.uid() = teacher_id);
CREATE POLICY "Assignments: enrolled students read" ON assignments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM class_enrollments
    WHERE class_enrollments.class_id = assignments.class_id
    AND class_enrollments.student_id = auth.uid()
    AND class_enrollments.status = 'active'
  )
);

-- ASSIGNMENT SUBMISSIONS: Students own, teacher of class can read/grade
CREATE POLICY "Submissions: student manages own" ON assignment_submissions FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Submissions: teacher reads" ON assignment_submissions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM assignments a
    WHERE a.id = assignment_submissions.assignment_id AND a.teacher_id = auth.uid()
  )
);
CREATE POLICY "Submissions: teacher grades" ON assignment_submissions FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM assignments a
    WHERE a.id = assignment_submissions.assignment_id AND a.teacher_id = auth.uid()
  )
);

-- ATTENDANCE: Teacher of class can manage, students read own
CREATE POLICY "Attendance: teacher manages" ON attendance_records FOR ALL USING (
  EXISTS (SELECT 1 FROM classes WHERE classes.id = attendance_records.class_id AND classes.teacher_id = auth.uid())
);
CREATE POLICY "Attendance: student reads own" ON attendance_records FOR SELECT USING (auth.uid() = student_id);

-- ANNOUNCEMENTS: Teacher of class can manage, enrolled students read
CREATE POLICY "Announcements: teacher manages" ON class_announcements FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Announcements: enrolled students read" ON class_announcements FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM class_enrollments
    WHERE class_enrollments.class_id = class_announcements.class_id
    AND class_enrollments.student_id = auth.uid()
    AND class_enrollments.status = 'active'
  )
);

-- PROGRESS SNAPSHOTS: Teacher of class can manage, students read own
CREATE POLICY "Progress: teacher manages" ON student_progress_snapshots FOR ALL USING (
  EXISTS (SELECT 1 FROM classes WHERE classes.id = student_progress_snapshots.class_id AND classes.teacher_id = auth.uid())
);
CREATE POLICY "Progress: student reads own" ON student_progress_snapshots FOR SELECT USING (auth.uid() = student_id);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_profiles_cohort ON profiles(cohort_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_invite_codes_code ON invite_codes(code);
CREATE INDEX IF NOT EXISTS idx_invite_codes_used ON invite_codes(is_used);
CREATE INDEX IF NOT EXISTS idx_milestones_timeline ON milestones(timeline_id);
CREATE INDEX IF NOT EXISTS idx_milestones_due_date ON milestones(due_date);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_activities_user ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_essays_user ON essays(user_id);
CREATE INDEX IF NOT EXISTS idx_college_list_user ON college_list(user_id);
CREATE INDEX IF NOT EXISTS idx_essay_prompts_university ON essay_prompts(university_id);
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
