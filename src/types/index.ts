// ============================================================
// Unimap – Core TypeScript Types
// ============================================================

// ---- Roles ----
export type UserRole = "admin" | "counselor" | "alumni";

// ---- Users & Auth ----
export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    role: UserRole;
    avatar_url?: string;
    cohort_id?: string;
    preferred_language: "en" | "uz" | "ru";
    onboarding_complete: boolean;
    created_at: string;
    updated_at: string;
}

// ---- Invite Codes ----
export interface InviteCode {
    id: string;
    code: string;
    cohort_id: string;
    created_by: string;
    is_used: boolean;
    used_by?: string;
    created_at: string;
    expires_at?: string;
}

// ---- Academic Profile ----
export interface AcademicProfile {
    id: string;
    user_id: string;
    sat_score?: number;
    act_score?: number;
    ielts_score?: number;
    toefl_score?: number;
    gpa: number;
    grading_scale: "4.0" | "5.0" | "10.0" | "100" | "percentage";
    gpa_converted?: number; // Converted to 4.0 scale
    intended_majors: string[];
    ap_courses?: string[];
    honors?: string[];
    created_at: string;
    updated_at: string;
}

// ---- Cohorts ----
export interface Cohort {
    id: string;
    name: string;
    description?: string;
    created_by: string;
    created_at: string;
}

// ---- Timelines & Milestones ----
export type MilestoneStatus = "pending" | "in_progress" | "completed" | "overdue";
export type MilestoneType =
    | "ed_deadline"
    | "ea_deadline"
    | "rd_deadline"
    | "loci"
    | "document_submission"
    | "essay_draft"
    | "interview"
    | "financial_aid"
    | "custom";

export interface Milestone {
    id: string;
    timeline_id: string;
    title: string;
    description?: string;
    due_date: string;
    status: MilestoneStatus;
    type: MilestoneType;
    university_id?: string;
    created_at: string;
    updated_at: string;
}

export interface Timeline {
    id: string;
    user_id: string;
    name: string;
    milestones?: Milestone[];
    created_at: string;
}

// ---- Messages ----
export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    is_read: boolean;
    attachment_url?: string;
    created_at: string;
}

export interface Conversation {
    id: string;
    participant_ids: string[];
    last_message?: Message;
    unread_count: number;
}

// ---- Activities & Portfolio ----
export interface Activity {
    id: string;
    user_id: string;
    position: number;
    activity_type: string;
    organization: string;
    title: string;
    description_draft: string;
    final_description: string;
    impact_metrics?: string;
    grades_participated: string;
    hours_per_week: number;
    weeks_per_year: number;
    created_at: string;
    updated_at: string;
}

export interface PortfolioItem {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    file_url?: string;
    link_url?: string;
    type: "research_paper" | "coding_project" | "website" | "design" | "other";
    created_at: string;
    reflection?: string;
    skills?: string[];
    status?: "completed" | "in_progress" | "planning";
    aligned_major?: string;
    start_date?: string;
    collaborators?: string;
    impact_metrics?: {
        users?: number;
        raised?: number;
        hours?: number;
        mentored?: number;
        awards?: number;
    };
}

// ---- Essays ----
export interface EssayPrompt {
    id: string;
    university_id: string;
    university_name: string;
    prompt_text: string;
    word_limit: number;
    breakdown_analysis?: string;
    year: string;
    category: "personal_statement" | "supplement" | "why_us" | "activity" | "community" | "other";
}

export interface Essay {
    id: string;
    user_id: string;
    prompt_id?: string;
    title: string;
    content: string;
    version: number;
    status: "draft" | "in_review" | "revised" | "final";
    word_count: number;
    created_at: string;
    updated_at: string;
}

export interface EssayVersion {
    id: string;
    essay_id: string;
    content: string;
    version: number;
    created_at: string;
}

export interface EssayComment {
    id: string;
    essay_id: string;
    author_id: string;
    author_name?: string;
    comment: string;
    selected_text?: string;
    position_start?: number;
    position_end?: number;
    resolved: boolean;
    created_at: string;
}

// ---- Universities & College Matching ----
export type MatchCategory = "reach" | "target" | "safety";

export interface University {
    id: string;
    name: string;
    location: string;
    country: string;
    ranking_us_news?: number;
    ranking_qs?: number;
    acceptance_rate: number;
    avg_sat?: number;
    avg_act?: number;
    avg_gpa?: number;
    financial_aid_intl: boolean;
    need_blind_intl: boolean;
    culture_tags: string[];
    strong_majors: string[];
    application_deadlines?: Record<string, string>;
    website_url?: string;
    logo_url?: string;
    region: "USA" | "Europe" | "Middle East" | "Asia";
}

export interface CollegeListEntry {
    id: string;
    user_id: string;
    university_id: string;
    university?: University;
    match_category: MatchCategory;
    probability_score: number;
    notes?: string;
    application_status: "not_started" | "in_progress" | "submitted" | "accepted" | "rejected" | "waitlisted";
    created_at: string;
}


// ---- Classes & Teacher Tracking ----
export interface Class {
    id: string;
    teacher_id: string;
    cohort_id?: string;
    name: string;
    subject: string;
    description: string;
    schedule: Record<string, string>;
    max_capacity: number;
    color: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    // Computed/joined fields
    enrolled_count?: number;
    avg_grade?: number;
    attendance_rate?: number;
}

export type EnrollmentStatus = "active" | "dropped" | "completed";

export interface ClassEnrollment {
    id: string;
    class_id: string;
    student_id: string;
    enrolled_at: string;
    status: EnrollmentStatus;
    // Joined
    student?: UserProfile;
}

export type AssignmentType = "homework" | "essay" | "project" | "quiz" | "exam" | "other";

export interface Assignment {
    id: string;
    class_id: string;
    teacher_id: string;
    title: string;
    description: string;
    type: AssignmentType;
    max_points: number;
    due_date: string;
    published: boolean;
    allow_late: boolean;
    created_at: string;
    updated_at: string;
    // Computed
    submissions_count?: number;
    graded_count?: number;
    avg_score?: number;
}

export type SubmissionStatus = "pending" | "submitted" | "graded" | "returned" | "late";

export interface AssignmentSubmission {
    id: string;
    assignment_id: string;
    student_id: string;
    content: string;
    file_url?: string;
    status: SubmissionStatus;
    grade?: number;
    feedback?: string;
    submitted_at?: string;
    graded_at?: string;
    created_at: string;
    // Joined
    student?: UserProfile;
    assignment?: Assignment;
}

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface AttendanceRecord {
    id: string;
    class_id: string;
    student_id: string;
    date: string;
    status: AttendanceStatus;
    note?: string;
    marked_by?: string;
    created_at: string;
    // Joined
    student?: UserProfile;
}

export type AnnouncementPriority = "info" | "warning" | "urgent";

export interface ClassAnnouncement {
    id: string;
    class_id: string;
    author_id: string;
    title: string;
    content: string;
    priority: AnnouncementPriority;
    pinned: boolean;
    created_at: string;
}

export interface StudentProgressSnapshot {
    id: string;
    class_id: string;
    student_id: string;
    week_start: string;
    attendance_rate: number;
    assignment_completion_rate: number;
    average_grade: number;
    overall_score: number;
    created_at: string;
}
