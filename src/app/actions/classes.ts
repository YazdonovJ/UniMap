"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ActorRole = "admin" | "counselor" | "alumni";

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

    const safeName = formData.name?.trim();
    if (!safeName) return { error: "Class name is required." };
    const safeCapacity = Math.min(500, Math.max(1, Math.floor(Number(formData.max_capacity) || 1)));

    const insertPayload: Record<string, unknown> = {
        teacher_id: actor.userId,
        name: safeName,
        subject: formData.subject?.trim() || "",
        description: formData.description?.trim() || "",
        schedule: formData.schedule,
        max_capacity: safeCapacity,
        color: formData.color,
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

    const access = await ensureClassAccess(classId, actor, supabase);
    if ("error" in access) return access;

    const { error } = await supabase
        .from("classes")
        .update({ ...updates, updated_at: new Date().toISOString() })
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

    const { error } = await supabase.from("assignments").insert({
        ...formData,
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

    const { error } = await supabase.from("assignment_submissions").upsert({
        assignment_id: assignmentId,
        student_id: actor.userId,
        content,
        file_url: fileUrl,
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

    const allowedStatuses = new Set(["present", "absent", "late", "excused"]);

    const rows = records.map(r => ({
        class_id: classId,
        student_id: r.student_id,
        date,
        status: allowedStatuses.has(r.status) ? r.status : "absent",
        note: r.note || null,
        marked_by: actor.userId,
    }));

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

    const { error } = await supabase.from("class_announcements").insert({
        ...formData,
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
