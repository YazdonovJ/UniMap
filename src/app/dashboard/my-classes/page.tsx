import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MyClassesClient } from "./my-classes-client";

export default async function MyClassesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    // Fetch enrolled classes for this student
    const { data: enrollments } = await supabase
        .from("class_enrollments")
        .select(`
            id, status, enrolled_at,
            class_id
        `)
        .eq("student_id", user.id)
        .eq("status", "active");

    // Fetch class details for enrolled classes
    const classIds = (enrollments || []).map(e => e.class_id);
    let classes: Record<string, unknown>[] = [];
    if (classIds.length > 0) {
        const { data } = await supabase
            .from("classes")
            .select("*")
            .in("id", classIds)
            .eq("is_active", true);
        classes = data || [];
    }

    // Fetch upcoming assignments
    const { data: assignments } = classIds.length > 0
        ? await supabase
            .from("assignments")
            .select("*")
            .in("class_id", classIds)
            .eq("published", true)
            .gte("due_date", new Date().toISOString())
            .order("due_date")
            .limit(10)
        : { data: [] };

    // Fetch student's submissions
    const assignmentIds = (assignments || []).map(a => (a as Record<string, unknown>).id as string);
    let submissions: Record<string, unknown>[] = [];
    if (assignmentIds.length > 0) {
        const { data } = await supabase
            .from("assignment_submissions")
            .select("*")
            .eq("student_id", user.id)
            .in("assignment_id", assignmentIds);
        submissions = data || [];
    }

    // Fetch announcements
    let announcements: Record<string, unknown>[] = [];
    if (classIds.length > 0) {
        const { data } = await supabase
            .from("class_announcements")
            .select("*")
            .in("class_id", classIds)
            .order("created_at", { ascending: false })
            .limit(5);
        announcements = data || [];
    }

    return (
        <MyClassesClient
            classes={classes}
            assignments={assignments || []}
            submissions={submissions}
            announcements={announcements}
        />
    );
}
