import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Syne } from "next/font/google";
import { ClassesClient } from "./classes-client";

const syne = Syne({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
    variable: "--font-classes-display",
});

export default async function ClassesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!profile || !["admin", "counselor"].includes(profile.role)) {
        redirect("/dashboard");
    }

    // Fetch classes owned by this teacher
    const { data: classes } = await supabase
        .from("classes")
        .select("*")
        .eq("teacher_id", user.id)
        .order("created_at", { ascending: false });

    // Fetch class-linked records
    const classIds = (classes || []).map(c => c.id);
    let enrollments: Array<{ id: string; class_id: string; student_id: string; status: string; enrolled_at: string }> = [];
    let assignments: Array<{
        id: string;
        class_id: string;
        title: string;
        description: string | null;
        type: string | null;
        max_points: number | null;
        due_date: string | null;
        created_at: string;
    }> = [];
    let announcements: Array<{
        id: string;
        class_id: string;
        title: string;
        content: string | null;
        priority: string | null;
        created_at: string;
    }> = [];

    if (classIds.length > 0) {
        const [enrollmentsRes, assignmentsRes, announcementsRes] = await Promise.all([
            supabase.from("class_enrollments").select("id, class_id, student_id, status, enrolled_at").in("class_id", classIds),
            supabase.from("assignments").select("id, class_id, title, description, type, max_points, due_date, created_at").in("class_id", classIds),
            supabase.from("class_announcements").select("id, class_id, title, content, priority, created_at").in("class_id", classIds),
        ]);

        enrollments = (enrollmentsRes.data || []) as typeof enrollments;
        assignments = (assignmentsRes.data || []) as typeof assignments;
        announcements = (announcementsRes.data || []) as typeof announcements;
    }

    // Fetch alumni visible to the current staff member for enrollment.
    let studentsQuery = supabase
        .from("profiles")
        .select("id, full_name, email, avatar_url")
        .eq("role", "alumni")
        .order("full_name");

    if (profile.role === "counselor") {
        if (!profile.cohort_id) {
            studentsQuery = studentsQuery.eq("id", "__none__");
        } else {
            studentsQuery = studentsQuery.eq("cohort_id", profile.cohort_id);
        }
    }

    const { data: cohortStudents } = await studentsQuery;

    const enrollmentCounts = enrollments
        .filter((record) => record.status === "active")
        .reduce((acc: Record<string, number>, record) => {
            acc[record.class_id] = (acc[record.class_id] || 0) + 1;
            return acc;
        }, {});

    const assignmentCounts = assignments.reduce((acc: Record<string, number>, record) => {
        acc[record.class_id] = (acc[record.class_id] || 0) + 1;
        return acc;
    }, {});

    const announcementCounts = announcements.reduce((acc: Record<string, number>, record) => {
        acc[record.class_id] = (acc[record.class_id] || 0) + 1;
        return acc;
    }, {});

    const nextDueByClass = assignments.reduce((acc: Record<string, { title: string; due_date: string | null }>, record) => {
        if (!record.due_date) return acc;
        const current = acc[record.class_id];
        if (!current || new Date(record.due_date).getTime() < new Date(current.due_date || "").getTime()) {
            acc[record.class_id] = { title: record.title, due_date: record.due_date };
        }
        return acc;
    }, {});

    const enrichedClasses = (classes || []).map(c => ({
        ...c,
        enrolled_count: enrollmentCounts[c.id] || 0,
        assignment_count: assignmentCounts[c.id] || 0,
        announcement_count: announcementCounts[c.id] || 0,
        next_due_title: nextDueByClass[c.id]?.title || null,
        next_due_date: nextDueByClass[c.id]?.due_date || null,
    }));

    return (
        <div className={syne.variable}>
            <ClassesClient
                classes={enrichedClasses}
                students={cohortStudents || []}
                enrollments={enrollments}
                assignments={assignments}
                announcements={announcements}
            />
        </div>
    );
}
