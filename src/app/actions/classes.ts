"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ActorRole = "admin" | "counselor" | "alumni";
type AttendanceStatus = "present" | "absent" | "late" | "excused";
type AnnouncementPriority = "info" | "warning" | "urgent";
type AssignmentType = "homework" | "essay" | "project" | "quiz" | "exam" | "other";

type ActorContext =
    | {
        userId: string;
        role: ActorRole;
        cohortId: string | null;
    }
    | null;

async function getActorContext() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { supabase, actor: null as ActorContext };

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, cohort_id")
        .eq("id", user.id)
        .single();

    if (!profile) return { supabase, actor: null as ActorContext };
    return {
        supabase,
        actor: {
            userId: user.id,
            role: profile.role as ActorRole,
            cohortId: profile.cohort_id ?? null,
        } as ActorContext,
    };
}

async function ensureClassAccess(classId: string, actor: Exclude<ActorContext, null>, supabase: Awaited<ReturnType<typeof createClient>>) {
    const { data: classRow, error } = await supabase
        .from("classes")
        .select("id, teacher_id, max_capacity")
        .eq("id", classId)
        .single();

    if (error || !classRow) return { error: "Class not found" };
    if (actor.role !== "admin" && classRow.teacher_id !== actor.userId) {
        return { error: "Forbidden" };
    }
    return { classRow };
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CLASS_COLOR_REGEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
const ASSIGNMENT_TYPES = new Set<AssignmentType>(["homework", "essay", "project", "quiz", "exam", "other"]);
const ANNOUNCEMENT_PRIORITIES = new Set<AnnouncementPriority>(["info", "warning", "urgent"]);
const ATTENDANCE_STATUSES = new Set<AttendanceStatus>(["present", "absent", "late", "excused"]);

function asTrimmedString(value: unknown, maxLength: number) {
    if (typeof value !== "string") return "";
    return value.trim().slice(0, maxLength);
}

function asBoolean(value: unknown) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value.toLowerCase() === "true";
    if (typeof value === "number") return value === 1;
    return false;
}

function asSafeColor(value: unknown) {
    const color = asTrimmedString(value, 7);
    return CLASS_COLOR_REGEX.test(color) ? color : "#6366f1";
}

function asSafeSchedule(value: unknown) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const normalized: Record<string, string> = {};
    for (const [key, rawVal] of Object.entries(value)) {
        if (typeof rawVal !== "string") continue;
        const safeKey = asTrimmedString(key, 40);
        const safeVal = asTrimmedString(rawVal, 200);
        if (!safeKey || !safeVal) continue;
        normalized[safeKey] = safeVal;
    }
    return normalized;
}

function asSafeDateTime(value: unknown) {
    if (typeof value !== "string") return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toISOString();
}

function asSafeHttpUrl(value: unknown) {
    if (typeof value !== "string") return { url: null as string | null, error: null as string | null };
    const trimmed = value.trim();
    if (!trimmed) return { url: null as string | null, error: null as string | null };
    try {
        const parsed = new URL(trimmed);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
            return { url: null as string | null, error: "File URL must use http or https." };
        }
        return { url: parsed.toString(), error: null as string | null };
    } catch {
        return { url: null as string | null, error: "Invalid file URL." };
    }
}

function buildClassUpdatePayload(updates: Record<string, unknown>) {
    const payload: Record<string, unknown> = {};

    if ("name" in updates) {
        const name = asTrimmedString(updates.name, 120);
        if (!name) return { error: "Class name is required." };
        payload.name = name;
    }

    if ("subject" in updates) payload.subject = asTrimmedString(updates.subject, 120);
    if ("description" in updates) payload.description = asTrimmedString(updates.description, 2000);
    if ("schedule" in updates) payload.schedule = asSafeSchedule(updates.schedule);

    if ("max_capacity" in updates) {
        payload.max_capacity = Math.min(500, Math.max(1, Math.floor(Number(updates.max_capacity) || 1)));
    }

    if ("color" in updates) payload.color = asSafeColor(updates.color);
    if ("is_active" in updates) payload.is_active = asBoolean(updates.is_active);

    if (Object.keys(payload).length === 0) {
        return { error: "No valid class fields provided for update." };
    }

    return { payload };
}

// ──────────────────────────────────────────
// CLASS CRUD
// ──────────────────────────────────────────

export async function createClass(formData: {
    name: string;
    subject: string;
    description: string;
    schedule: Record<string, string>;
    max_capacity: number;
    color: string;
}) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };
    if (!["admin", "counselor"].includes(actor.role)) return { error: "Forbidden" };

    const safeName = asTrimmedString(formData.name, 120);
    if (!safeName) return { error: "Class name is required." };
    const safeCapacity = Math.min(500, Math.max(1, Math.floor(Number(formData.max_capacity) || 1)));

    const insertPayload: Record<string, unknown> = {
        teacher_id: actor.userId,
        name: safeName,
        subject: asTrimmedString(formData.subject, 120),
        description: asTrimmedString(formData.description, 2000),
        schedule: asSafeSchedule(formData.schedule),
        max_capacity: safeCapacity,
        color: asSafeColor(formData.color),
    };

    if (actor.role === "counselor" && actor.cohortId) {
        insertPayload.cohort_id = actor.cohortId;
    }

    const { data: createdClass, error } = await supabase
        .from("classes")
        .insert(insertPayload)
        .select("*")
        .single();

    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true, class: createdClass };
}

export async function updateClass(classId: string, updates: Record<string, unknown>) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };
    if (!classId || !UUID_REGEX.test(classId)) return { error: "Invalid class id." };
    if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
        return { error: "Invalid update payload." };
    }

    const access = await ensureClassAccess(classId, actor, supabase);
    if ("error" in access) return access;

    const safeUpdate = buildClassUpdatePayload(updates);
    if ("error" in safeUpdate) return safeUpdate;

    const { error } = await supabase
        .from("classes")
        .update({ ...safeUpdate.payload, updated_at: new Date().toISOString() })
        .eq("id", classId);
    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true };
}

export async function deleteClass(classId: string) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };

    const access = await ensureClassAccess(classId, actor, supabase);
    if ("error" in access) return access;

    const { error } = await supabase.from("classes").delete().eq("id", classId);
    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true };
}

// ──────────────────────────────────────────
// ENROLLMENT
// ──────────────────────────────────────────

export async function enrollStudent(classId: string, studentId: string) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };
    if (!["admin", "counselor"].includes(actor.role)) return { error: "Forbidden" };

    const access = await ensureClassAccess(classId, actor, supabase);
    if ("error" in access) return access;
    const maxCapacity = Math.max(1, Number(access.classRow.max_capacity) || 1);

    const { data: student, error: studentError } = await supabase
        .from("profiles")
        .select("id, role, cohort_id")
        .eq("id", studentId)
        .single();

    if (studentError || !student || student.role !== "alumni") {
        return { error: "Invalid student selection." };
    }
    if (actor.role === "counselor" && actor.cohortId && student.cohort_id !== actor.cohortId) {
        return { error: "You can only enroll students from your own cohort." };
    }

    const { data: existingEnrollment } = await supabase
        .from("class_enrollments")
        .select("id, status")
        .eq("class_id", classId)
        .eq("student_id", studentId)
        .maybeSingle();

    if (existingEnrollment?.status === "active") {
        return { success: true };
    }

    const { count: activeCount } = await supabase
        .from("class_enrollments")
        .select("id", { count: "exact", head: true })
        .eq("class_id", classId)
        .eq("status", "active");

    if ((activeCount || 0) >= maxCapacity) {
        return { error: "Class is already at maximum capacity." };
    }

    const { data: enrollment, error } = await supabase
        .from("class_enrollments")
        .upsert(
            {
                class_id: classId,
                student_id: studentId,
                status: "active",
                enrolled_at: new Date().toISOString(),
            },
            { onConflict: "class_id,student_id" }
        )
        .select("id, class_id, student_id, status, enrolled_at")
        .single();
    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true, enrollment };
}

export async function removeStudent(classId: string, studentId: string) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };

    const access = await ensureClassAccess(classId, actor, supabase);
    if ("error" in access) return access;

    const { data: activeEnrollment } = await supabase
        .from("class_enrollments")
        .select("id")
        .eq("class_id", classId)
        .eq("student_id", studentId)
        .eq("status", "active")
        .maybeSingle();

    if (!activeEnrollment) {
        return { success: true };
    }

    const { error } = await supabase.from("class_enrollments")
        .update({ status: "dropped" })
        .eq("class_id", classId)
        .eq("student_id", studentId);
    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true };
}

// ──────────────────────────────────────────
// ASSIGNMENTS
// ──────────────────────────────────────────

export async function createAssignment(formData: {
    class_id: string;
    title: string;
    description: string;
    type: string;
    max_points: number;
    due_date: string;
    allow_late: boolean;
}) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };
    if (!["admin", "counselor"].includes(actor.role)) return { error: "Forbidden" };

    const access = await ensureClassAccess(formData.class_id, actor, supabase);
    if ("error" in access) return access;

    const safeTitle = asTrimmedString(formData.title, 180);
    if (!safeTitle) return { error: "Assignment title is required." };

    const safeType = asTrimmedString(formData.type, 24).toLowerCase() as AssignmentType;
    if (!ASSIGNMENT_TYPES.has(safeType)) {
        return { error: "Invalid assignment type." };
    }

    const safeDueDate = asSafeDateTime(formData.due_date);
    if (!safeDueDate) return { error: "Invalid assignment due date." };

    const safeMaxPoints = Math.min(1000, Math.max(1, Math.floor(Number(formData.max_points) || 100)));

    const { error } = await supabase.from("assignments").insert({
        class_id: formData.class_id,
        title: safeTitle,
        description: asTrimmedString(formData.description, 4000),
        type: safeType,
        max_points: safeMaxPoints,
        due_date: safeDueDate,
        allow_late: asBoolean(formData.allow_late),
        teacher_id: actor.userId,
    });
    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true };
}

export async function gradeSubmission(submissionId: string, grade: number, feedback: string) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };
    if (!["admin", "counselor"].includes(actor.role)) return { error: "Forbidden" };

    const { data: submission, error: submissionError } = await supabase
        .from("assignment_submissions")
        .select("id, assignment_id")
        .eq("id", submissionId)
        .single();
    if (submissionError || !submission) return { error: "Submission not found." };

    const { data: assignment, error: assignmentError } = await supabase
        .from("assignments")
        .select("id, class_id, teacher_id")
        .eq("id", submission.assignment_id)
        .single();
    if (assignmentError || !assignment) return { error: "Assignment not found." };
    if (actor.role !== "admin" && assignment.teacher_id !== actor.userId) {
        return { error: "Forbidden" };
    }

    const safeGrade = Math.max(0, Math.min(1000, Math.round(grade)));
    const { error } = await supabase.from("assignment_submissions").update({
        grade: safeGrade,
        feedback,
        status: "graded",
        graded_at: new Date().toISOString(),
    }).eq("id", submissionId);
    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true };
}

export async function submitAssignment(assignmentId: string, content: string, fileUrl?: string) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };
    if (actor.role !== "alumni") return { error: "Forbidden" };

    const { data: assignment, error: assignmentError } = await supabase
        .from("assignments")
        .select("id, class_id, due_date, allow_late")
        .eq("id", assignmentId)
        .single();
    if (assignmentError || !assignment) return { error: "Assignment not found." };

    const { data: enrollment } = await supabase
        .from("class_enrollments")
        .select("id")
        .eq("class_id", assignment.class_id)
        .eq("student_id", actor.userId)
        .eq("status", "active")
        .maybeSingle();
    if (!enrollment) return { error: "You are not enrolled in this class." };

    if (!assignment.allow_late && assignment.due_date && new Date(assignment.due_date) < new Date()) {
        return { error: "Late submissions are not allowed for this assignment." };
    }

    const safeContent = asTrimmedString(content, 25000);
    const safeFile = asSafeHttpUrl(fileUrl);
    if (safeFile.error) return { error: safeFile.error };
    if (!safeContent && !safeFile.url) {
        return { error: "Submission content or file URL is required." };
    }

    const { error } = await supabase.from("assignment_submissions").upsert({
        assignment_id: assignmentId,
        student_id: actor.userId,
        content: safeContent,
        file_url: safeFile.url,
        status: "submitted",
        submitted_at: new Date().toISOString(),
    }, { onConflict: "assignment_id,student_id" });
    if (error) return { error: error.message };
    revalidatePath("/dashboard/my-classes");
    return { success: true };
}

// ──────────────────────────────────────────
// ATTENDANCE
// ──────────────────────────────────────────

export async function markAttendance(classId: string, date: string, records: { student_id: string; status: string; note?: string }[]) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };
    if (!["admin", "counselor"].includes(actor.role)) return { error: "Forbidden" };

    const access = await ensureClassAccess(classId, actor, supabase);
    if ("error" in access) return access;

    const safeDate = asTrimmedString(date, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(safeDate)) {
        return { error: "Invalid attendance date." };
    }

    if (!Array.isArray(records) || records.length === 0) {
        return { error: "Attendance records are required." };
    }
    if (records.length > 500) {
        return { error: "Too many attendance records in one request." };
    }

    const rows = records
        .filter((record) => typeof record?.student_id === "string" && UUID_REGEX.test(record.student_id))
        .map((record) => {
            const normalizedStatus = asTrimmedString(record.status, 20).toLowerCase() as AttendanceStatus;
            return {
                class_id: classId,
                student_id: record.student_id,
                date: safeDate,
                status: ATTENDANCE_STATUSES.has(normalizedStatus) ? normalizedStatus : "absent",
                note: asTrimmedString(record.note, 1000) || null,
                marked_by: actor.userId,
            };
        });

    if (rows.length === 0) {
        return { error: "No valid attendance records were provided." };
    }

    const { error } = await supabase.from("attendance_records").upsert(rows, {
        onConflict: "class_id,student_id,date",
    });
    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true };
}

// ──────────────────────────────────────────
// ANNOUNCEMENTS
// ──────────────────────────────────────────

export async function createAnnouncement(formData: {
    class_id: string;
    title: string;
    content: string;
    priority: string;
}) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };
    if (!["admin", "counselor"].includes(actor.role)) return { error: "Forbidden" };

    const access = await ensureClassAccess(formData.class_id, actor, supabase);
    if ("error" in access) return access;

    const safeTitle = asTrimmedString(formData.title, 180);
    const safeContent = asTrimmedString(formData.content, 5000);
    if (!safeTitle || !safeContent) {
        return { error: "Announcement title and content are required." };
    }
    const safePriority = asTrimmedString(formData.priority, 20).toLowerCase() as AnnouncementPriority;
    if (!ANNOUNCEMENT_PRIORITIES.has(safePriority)) {
        return { error: "Invalid announcement priority." };
    }

    const { error } = await supabase.from("class_announcements").insert({
        class_id: formData.class_id,
        title: safeTitle,
        content: safeContent,
        priority: safePriority,
        author_id: actor.userId,
    });
    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true };
}

export async function deleteAnnouncement(announcementId: string) {
    const { supabase, actor } = await getActorContext();
    if (!actor) return { error: "Not authenticated" };
    if (!["admin", "counselor"].includes(actor.role)) return { error: "Forbidden" };

    const { data: announcement, error: announcementError } = await supabase
        .from("class_announcements")
        .select("id, class_id, author_id")
        .eq("id", announcementId)
        .single();
    if (announcementError || !announcement) return { error: "Announcement not found." };

    const access = await ensureClassAccess(announcement.class_id, actor, supabase);
    if ("error" in access) {
        // Author can still delete own announcement.
        if (announcement.author_id !== actor.userId && actor.role !== "admin") return access;
    }

    const { error } = await supabase.from("class_announcements").delete().eq("id", announcementId);
    if (error) return { error: error.message };
    revalidatePath("/dashboard/classes");
    return { success: true };
}
